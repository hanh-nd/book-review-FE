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

        <div class="create-comment">
            Bình luận
            <ElInput
                placeholder="Enter your comment"
                :rows="2"
                type="textarea"
            />
        </div>
        <div class="comment-list">
            <CommentList :comment-list="[]" />
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
const route = useRoute();
const store = useStore<IStore>();

const reviewDetail = computed(() => store.state.reviews.selectedReview);

watch(
    () => route.params.id,
    (id) => {
        store.dispatch('reviews/getReviewDetail', id);
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
