<template>
    <div class="book-item-wrapper">
        <div class="book-detail" @click="getDetail">
            <div class="top-section">
                <div class="book-cover">
                    <img :src="book?.imageUrl" />
                </div>
            </div>
            <div class="bottom-section">
                <div class="title">{{ book?.name }}</div>
                <div class="meta-data">
                    {{ book?.author }} - {{ book?.publisher }}
                    {{ book?.publicationYear }}
                </div>
            </div>
        </div>
        <div class="manage-groups">
            <ElButton @click="onUpdateBook(book?._id)">Chỉnh sửa</ElButton>
            <ElButton @click="removeBook(book?._id)">Xóa</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IBook } from '@/interfaces';
import { bookService } from '@/services/book.api';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    book: IBook;
}>();

const getDetail = () => {
    router.push({
        name: PageName.BOOK_DETAIL_PAGE,
        params: {
            id: props.book._id,
        },
    });
};

const onUpdateBook = (id: string) => {
    router.push({
        name: PageName.UPDATE_BOOK_PAGE,
        params: {
            id,
        },
    });
};

const removeBook = async (id: string) => {
    await bookService.deleteBook(id);
};
</script>

<style lang="scss" scoped>
.book-item-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    cursor: pointer;

    .top-section {
        display: flex;
        flex-direction: row;
        .book-cover {
            img {
                width: 100%;
                height: 300px;
            }
        }
    }

    .bottom-section {
        display: flex;
        flex-direction: column;

        .title {
            font-weight: 700;
        }
    }
}
</style>
