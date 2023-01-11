<template>
    <div class="report-item-wrapper">
        <div class="header">
            <span>{{ `${report.reporter?.[0].username} đã báo cáo ` }}</span>
            <span class="highlight" @click="navigateTo">{{
                report.type === ReportType.COMMENT ? 'bình luận ' : 'bài viết '
            }}</span>
            <span>{{
                `sau vào lúc ${dayjs(
                    report.createdAt
                ).fmHHmmDDMMYYYY()} vì lý do: ${report.description}`
            }}</span>
        </div>
        <div class="content">
            {{ report.target?.[0]?.content }}
        </div>
        <div class="action">
            <ElButton @click="onRemoveTarget">Xóa</ElButton>
            <ElButton @click="onIgnoreTarget">Bỏ qua</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName, ReportType } from '@/constants';
import type { IComment, IReport, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import router from '@/plugins/router';
import { commentService } from '@/services/comment.api';
import { reportService } from '@/services/report.api';
import { reviewService } from '@/services/review.api';
import { useStore } from 'vuex';

const props = defineProps<{
    report: IReport;
}>();

const store = useStore<IStore>();

const onRemoveTarget = async () => {
    if (props.report.type === ReportType.REVIEW) {
        await reviewService.deleteReview(props.report.targetId);
    } else if (props.report.type === ReportType.COMMENT) {
        await commentService.deleteComment(props.report.targetId);
    }
    await onIgnoreTarget();
};

const onIgnoreTarget = async () => {
    await reportService.updateReport(props.report._id, {
        resolved: true,
    });
    store.dispatch('reports/getReportList');
};

const navigateTo = () => {
    router.push({
        name: PageName.REVIEW_DETAIL_PAGE,
        params: {
            id: props.report.type === ReportType.REVIEW ? props.report.targetId : (props.report.target?.[0] as IComment).reviewId
        }
    })
}
</script>

<style lang="scss" scoped>
.highlight {
    color: red;
    cursor: pointer;
}
</style>
