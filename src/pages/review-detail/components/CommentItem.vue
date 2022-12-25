<template>
    <div class="comment-item-wrapper">Comment Item</div>
</template>
<script setup lang="ts">
import type { IComment } from '@/interfaces';

defineProps<{
    comment: IComment;
}>();
</script>

<style lang="scss" scoped></style>
