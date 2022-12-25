<template>
    <div class="comment-item-wrapper">
        <div class="author-section">
            <div>
                <span
                    @click="viewAuthorProfile(comment?.author[0]?._id)"
                    class="author-name"
                    >{{ comment?.author[0]?.username }}</span
                >
                bình luận lúc: {{ dayjs(comment?.updatedAt).fmHHmmDDMMYYYY() }}
            </div>
        </div>
        <div class="comment-section">
            {{ comment?.content }}
        </div>

        <div class="react-section">
            {{ numberOfLikes }} lượt thích
            <ElButton @click="reactToReview(comment?._id)">{{
                isLike ? 'Bỏ thích' : 'Thích'
            }}</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { isUserLiked } from '@/common/helpers';
import { PageName } from '@/constants';
import type { IComment, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { commentService } from '@/services/comment.api';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const props = defineProps<{
    comment: IComment;
}>();

const router = useRouter();
const store = useStore<IStore>();

const viewAuthorProfile = (id: string) => {
    router.push({
        name: PageName.PROFILE_PAGE,
        params: {
            id,
        },
    });
};

const reactToReview = async (id: string) => {
    await commentService.reactToComment(id);
    store.dispatch('comments/getCommentList');
};

const isLike = computed(() => isUserLiked(props.comment.likeIds));
const numberOfLikes = computed(() => props.comment.likeIds.length);
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
