<template>
    <div class="review-list-wrapper">
        <div class="review-item" v-for="review in reviewList" :key="review._id">
            <ReviewItem :review="review" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IReview } from '@/interfaces';
import ReviewItem from './ReviewItem.vue';

defineProps<{
    reviewList: IReview[];
}>();
</script>

<style lang="scss" scoped></style>
