<template>
    <div class="book-list-wrapper">
        <div class="book-item" v-for="book in bookList" :key="book._id">
            <BookItem :book="book" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBook } from '@/interfaces';
import BookItem from './BookItem.vue';

const props = defineProps<{
    bookList: IBook[];
}>();
</script>

<style lang="scss" scoped>
.book-list-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    .book-item {
        width: 100%;
    }
}
</style>
