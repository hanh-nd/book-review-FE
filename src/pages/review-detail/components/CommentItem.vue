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
                <ElButton @click="updateComment">Chỉnh sửa</ElButton>
                <ElButton @click="deleteComment(comment?._id)">Xóa</ElButton>
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
            <ElButton @click="reactToReview(comment?._id)">{{
                isLike ? 'Bỏ thích' : 'Thích'
            }}</ElButton>
            <ElButton @click="showReplyBox">Trả lời</ElButton>
            <CreateReplyBox
                :review-id="comment.reviewId"
                :parent-id="comment._id"
                v-show="isShowReplyBox"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    isUserLiked,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { PageName } from '@/constants';
import type { IComment, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
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

const reactToReview = async (id: string) => {
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
    const response = await commentService.deleteComment(id);
    if (response?.success) {
        showSuccessNotificationFunction('Xóa bình luận thành công');
        store.dispatch('comments/getCommentList');
    } else {
        showErrorNotificationFunction('Xóa bình luận thất bại');
    }
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
