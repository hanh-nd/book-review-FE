<template>
    <div class="review-detail-page">
        <div class="header">
            <div class="left-section">
                <div class="book-cover">
                    <img :src="reviewDetail?.book?.[0]?.imageUrl" />
                </div>
            </div>
            <div class="right-section">
                <div class="book-name">
                    <span>{{ reviewDetail?.book?.[0]?.name }}</span>
                </div>
                <div class="review-header">
                    <span class="reviewer-name">{{
                        reviewDetail?.author?.[0]?.username
                    }}</span>
                    review lúc
                    {{ dayjs(reviewDetail?.createdAt).fmHHmmDDMMYYYY() }}
                </div>
                <div class="review-content">
                    <span>{{ reviewDetail?.content }}</span>
                </div>
            </div>
        </div>

        Bình luận: Tổng số {{ commentListCount }} bình luân

        <div class="create-comment">
            <CreateCommentBox :review-id="reviewId" />
        </div>
        <div class="comment-list">
            <CommentList :comment-list="commentList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import CommentList from '../components/CommentList.vue';
import CreateCommentBox from '../components/CreateCommentBox.vue';
const route = useRoute();
const store = useStore<IStore>();

const reviewId = computed(() => route.params.id as string);
const reviewDetail = computed(() => store.state.reviews.selectedReview);
const commentList = computed(() => store.state.comments.commentList);
const commentListCount = computed(() => store.state.comments.commentListCount);

watch(
    () => route.params.id,
    async (id) => {
        store.dispatch('reviews/getReviewDetail', id);
        await store.dispatch('comments/setCommentListQuery', {
            page: 1,
            limit: 10,
            reviewId: id,
        });
        store.dispatch('comments/getCommentList');
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss" scoped>
.review-detail-page {
    .header {
        display: flex;
        flex-direction: row;
        gap: 24px;

        .left-section {
            .book-cover {
                img {
                    width: 100%;
                    height: 300px;
                }
            }
        }

        .right-section {
            .book-name {
                font-weight: 700;
                font-size: 20px;
            }

            .reviewer-name {
                font-weight: 700;
            }
        }
    }
}
</style>
