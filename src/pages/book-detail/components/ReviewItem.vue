<template>
    <div class="review-item-wrapper">
        <div class="author-section">
            <div>
                <span
                    @click="viewAuthorProfile(review?.author[0]?._id)"
                    class="author-name"
                    >{{ review?.author[0]?.username }}</span
                >
                đánh giá lúc: {{ dayjs(review?.createdAt).fmHHmmDDMMYYYY() }}
            </div>

            <div class="see-detail">
                <ElButton @click="navigateToDetailPage(review?._id)"
                    >Xem review</ElButton
                >
            </div>

            <div class="manage-button-groups" v-if="isReviewAuthor">
                <ElButton @click="updateReview">Chỉnh sửa</ElButton>
                <ElButton @click="deleteReview(review?._id)">Xóa</ElButton>
            </div>
        </div>
        <div class="review-section">
            <div class="update" v-if="isShowUpdateInput">
                <UpdateReviewBox
                    :content="review?.content"
                    :review-id="review?._id"
                    @on-updated="onUpdatedReview"
                />
            </div>
            <div class="content" style="white-space: pre" v-else>
                {{ review?.content }}
            </div>
        </div>
        <div class="react-section">
            {{ numberOfLikes }} lượt thích
            <ElButton @click="reactToReview(review?._id)">{{
                isLike ? 'Bỏ thích' : 'Thích'
            }}</ElButton>
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
import type { IReview, IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { SocketIO } from '@/plugins/socket.io';
import { reviewService } from '@/services/review.api';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UpdateReviewBox from './UpdateReviewBox.vue';
const props = defineProps<{
    review: IReview;
}>();

const router = useRouter();
const store = useStore<IStore>();

const isShowUpdateInput = ref(false);

const isLike = computed(() => isUserLiked(props.review.likeIds));
const numberOfLikes = computed(() => props.review.likeIds.length);
const isReviewAuthor = computed(() =>
    isAuthor(props.review.author?.[0]?._id || '')
);

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

const reactToReview = async (id: string) => {
    if (!showRequireLoginFunction()) return;

    if (!isLike) {
        SocketIO.emitUserLike(
            props.review.author[0]._id,
            props.review._id,
            NotificationModule.REVIEW
        );
    }

    await reviewService.reactToReview(id);
    store.dispatch('reviews/getReviewList');
};

const updateReview = () => {
    isShowUpdateInput.value = !isShowUpdateInput.value;
};

const onUpdatedReview = () => {
    isShowUpdateInput.value = false;
};

const deleteReview = async (id: string) => {
    if (!showRequireLoginFunction()) return;

    const response = await reviewService.deleteReview(id);
    if (response?.success) {
        showSuccessNotificationFunction('Xóa đánh giá thành công');
        store.dispatch('reviews/getReviewList');
    } else {
        showErrorNotificationFunction('Xóa đánh giá thất bại');
    }
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
