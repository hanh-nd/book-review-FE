<template>
    <div class="admin-book-page-wrapper">
        <div class="create-book-button">
            <ElButton @click="createBook">Tạo sách mới</ElButton>
        </div>
        <AdminBookList :book-list="bookList" />
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IBook, IStore } from '@/interfaces';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import AdminBookList from '../../components/books/AdminBookList.vue';

const store = useStore<IStore>();
const router = useRouter();
const bookList = computed<IBook[]>(() => {
    return store.state.books.bookList;
});

const loadData = () => {
    store.dispatch('books/getBookList');
};

const createBook = () => {
    router.push({
        name: PageName.CREATE_BOOK_PAGE,
    });
};
loadData();
</script>

<style lang="scss" scoped>
.admin-book-page-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
