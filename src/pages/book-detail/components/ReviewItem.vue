<template>
    <div class="review-item-wrapper">
        <div class="author-section">
            <div>
                <span
                    @click="viewAuthorProfile(review?.author[0]?._id)"
                    class="author-name"
                    >{{ review?.author[0]?.username }}</span
                >
                đánh giá lúc: {{ dayjs(review?.updatedAt).fmHHmmDDMMYYYY() }}
            </div>

            <div class="see-detail">
                <ElButton @click="navigateToDetailPage(review?._id)"
                    >Xem review</ElButton
                >
            </div>
        </div>
        <div class="review-section">
            {{ review?.content }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IReview } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { useRouter } from 'vue-router';
defineProps<{
    review: IReview;
}>();

const router = useRouter();

const viewAuthorProfile = (id: string) => {
    router.push({
        name: PageName.PROFILE_PAGE,
        params: {
            id,
        },
    });
};

const navigateToDetailPage = (id: string) => {
    router.push({
        name: PageName.REVIEW_DETAIL_PAGE,
        params: {
            id,
        },
    });
};
</script>

<style lang="scss" scoped>
.review-item-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 0px;

    .author-section {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 24px;
    }
    .author-name {
        font-weight: 700;
        cursor: pointer;
    }
}
</style>
