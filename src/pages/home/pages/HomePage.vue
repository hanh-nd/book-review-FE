<template>
    <div class="home-page-wrapper">
        <Banner />
        <BookList :book-list="bookList" />
    </div>
</template>

<script setup lang="ts">
import BookList from '@/components/BookList.vue';
import type { IBook, IStore } from '@/interfaces';
import { computed } from 'vue';
import { useStore } from 'vuex';
import Banner from '../components/Banner.vue';

const store = useStore<IStore>();

const bookList = computed<IBook[]>(() => {
    return store.state.books.bookList;
});

const loadData = () => {
    store.dispatch('books/getBookList');
};

loadData();
</script>

<style lang="scss" scoped>
.home-page-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
