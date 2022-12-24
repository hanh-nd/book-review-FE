<template>
    <div class="review-list-page-wrapper">
        Bạn đang xem review sách:
        <div class="review-book">
            <BookItem :book="reviewBook" />
        </div>
        Review: Tổng số {{ reviewListCount }} review
        <ElButton @click="openCreateViewDialog">Viết review</ElButton>
        <div class="review-list">
            <ReviewList :review-list="reviewList" />
        </div>
        <CreateReviewDialog
            :book-id="bookId"
            :is-visible="isShowCreateReviewDialog"
            @on-close="closeCreateReviewDialog"
        />
    </div>
</template>

<script setup lang="ts">
import BookItem from '@/components/BookItem.vue';
import CreateReviewDialog from '@/components/CreateReviewDialog.vue';
import type { IBook, IStore } from '@/interfaces';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ReviewList from '../components/ReviewList.vue';

const route = useRoute();
const store = useStore<IStore>();

const reviewBook = computed(() => store.state.books.selectedBook as IBook);
const reviewList = computed(() => store.state.reviews.reviewList);
const reviewListCount = computed(() => store.state.reviews.reviewListCount);

const bookId = computed(() => route.params.id as string);

const isShowCreateReviewDialog = ref(false);

const openCreateViewDialog = () => {
    isShowCreateReviewDialog.value = true;
};
const closeCreateReviewDialog = () => {
    isShowCreateReviewDialog.value = false;
};

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch('books/getBookDetail', newId);
        store.dispatch('reviews/setReviewListQuery', {
            page: 1,
            limit: 10,
            bookId: newId,
        });
        store.dispatch('reviews/getReviewList');
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss" scoped>
.review-list-page-wrapper {
    .review-book {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .review-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>
