<template>
    <div class="comment-item-wrapper">
        <div class="author-section">
            <div>
                <span
                    @click="viewAuthorProfile(comment?.author?.[0]?._id)"
                    class="author-name"
                    >{{ comment?.author?.[0]?.username }}</span
                >
                bình luận lúc: {{ dayjs(comment?.createdAt).fmHHmmDDMMYYYY() }}
            </div>

            <div class="manage-button-groups">
                <ElButton @click="updateComment" v-if="isCommentAuthor"
                    >Chỉnh sửa</ElButton
                >
                <ElButton
                    @click="deleteComment(comment?._id)"
                    v-if="isCommentAuthor"
                    >Xóa</ElButton
                >
                <ElButton @click="reportComment(comment?._id)"
                    >Báo cáo</ElButton
                >
            </div>
        </div>
        <div class="comment-section">
            <div class="update" v-if="isShowUpdateInput">
                <UpdateCommentBox
                    :content="comment?.content"
                    :comment-id="comment?._id"
                    @on-updated="onUpdatedReview"
                />
            </div>
            <div class="content" style="white-space: pre" v-else>
                {{ comment?.content }}
            </div>
        </div>

        <div class="react-section">
            {{ numberOfLikes }} lượt thích
            <ElButton @click="reactToComment(comment?._id)">{{
                isLike ? 'Bỏ thích' : 'Thích'
            }}</ElButton>
            <ElButton @click="showReplyBox">Trả lời</ElButton>
            <CreateReplyBox
                :review-id="comment.reviewId"
                :parent-id="comment._id"
                :author-id="comment.authorId"
                v-show="isShowReplyBox"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    isAuthor,
    isUserLiked,
    showErrorNotificationFunction,
    showRequireLoginFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { NotificationModule, PageName } from '@/constants';
import type { IComment, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { SocketIO } from '@/plugins/socket.io';
import { commentService } from '@/services/comment.api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CreateReplyBox from './CreateReplyBox.vue';
import UpdateCommentBox from './UpdateCommentBox.vue';
const props = defineProps<{
    comment: IComment;
}>();

const router = useRouter();
const store = useStore<IStore>();

const isShowReplyBox = ref(false);
const isShowUpdateInput = ref(false);

const isLike = computed(() => isUserLiked(props.comment.likeIds || []));
const numberOfLikes = computed(() => props.comment.likeIds?.length);
const isCommentAuthor = computed(() => isAuthor(props.comment.author?.[0]._id));

const viewAuthorProfile = (id: string) => {
    router.push({
        name: PageName.PROFILE_PAGE,
        params: {
            id,
        },
    });
};

const showReplyBox = () => {
    isShowReplyBox.value = !isShowReplyBox.value;
};

const reactToComment = async (id: string) => {
    if (!showRequireLoginFunction()) return;

    if (!isLike) {
        SocketIO.emitUserLike(
            props.comment.authorId,
            props.comment._id,
            NotificationModule.COMMENT
        );
    }

    await commentService.reactToComment(id);
    store.dispatch('comments/getCommentList');
};

const updateComment = () => {
    isShowUpdateInput.value = !isShowUpdateInput.value;
};

const onUpdatedReview = () => {
    isShowUpdateInput.value = false;
};

const deleteComment = async (id: string) => {
    if (!showRequireLoginFunction()) return;

    const response = await commentService.deleteComment(id);
    if (response?.success) {
        showSuccessNotificationFunction('Xóa bình luận thành công');
        store.dispatch('comments/getCommentList');
    } else {
        showErrorNotificationFunction('Xóa bình luận thất bại');
    }
};

const reportComment = (id: string) => {
    store.dispatch('dialogs/setIsShowReportCommentDialog', true);
    store.dispatch('dialogs/setToReportCommentId', id);
};
</script>

<style lang="scss" scoped>
.comment-item-wrapper {
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
