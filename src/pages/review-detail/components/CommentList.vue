<template>
    <div class="comment-list-wrapper">
        <div
            class="comment-item"
            v-for="comment in commentList"
            :key="comment._id"
        >
            <CommentItem :comment="comment" />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IComment } from '@/interfaces';
import CommentItem from './CommentItem.vue';

defineProps<{
    commentList: IComment[];
}>();
</script>

<style lang="scss" scoped></style>
