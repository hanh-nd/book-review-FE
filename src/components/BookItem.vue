<template>
    <div class="book-item-wrapper" @click="getDetail">
        <div class="top-section">
            <div class="book-cover">
                <img :src="book?.imageUrl" />
            </div>
        </div>
        <div class="bottom-section">
            <div class="title">{{ book.name }}</div>
            <div class="meta-data">
                {{ book?.author }} - {{ book?.publisher }}
                {{ book?.publicationYear }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IBook } from '@/interfaces';
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
