<template>
    <div class="book-detail-page-wrapper">
        <div class="book-detail">
            <div class="left-section">
                <div class="book-cover">
                    <img :src="bookDetail?.imageUrl" />
                </div>
            </div>
            <div class="right-section">
                <div class="content">Tiêu đề: {{ bookDetail?.name }}</div>
                <div class="content">Tác giả: {{ bookDetail?.author }}</div>
                <div class="content">
                    Nhà xuất bản: {{ bookDetail?.publisher }}
                </div>
                <div class="content">
                    Năm xuất bản: {{ bookDetail?.publicationYear }}
                </div>
            </div>
        </div>
        <div class="book-action">
            <ElButton @click="navigateToUpdateBookPage" v-if="true"
                >Thêm vào tủ sách</ElButton
            >
            <ElButton @click="navigateToUpdateBookPage">Cập nhật</ElButton>
            <ElButton @click="navigateToUpdateBookPage">Viết review</ElButton>
            <ElButton @click="navigateToUpdateBookPage">Xem review</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IStore } from '@/interfaces';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore<IStore>();

const bookDetail = computed(() => store.state.books.selectedBook);
const loginUser = computed(() => store.state.auth.loginUser);

const navigateToUpdateBookPage = () => {
    router.push({
        name: PageName.UPDATE_BOOK_PAGE,
        params: {
            id: bookDetail.value?._id,
        },
    });
};

// const isBookInBookShelf = computed(() => {
//     return !!loginUser.value?.bookShelf.find(
//         (book) => book._id === bookDetail.value?._id
//     );
// });

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch('books/getBookDetail', newId);
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss" scoped>
.book-detail-page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 48px;
    .book-detail {
        display: flex;
        flex-direction: row;
        gap: 24px;

        .left-section {
            .book-cover {
                img {
                    width: 100%;
                    height: 500px;
                }
            }
        }

        .right-section {
            .content {
                font-size: 18px;
                font-weight: 500;
            }

            :deep(.el-rate__item) {
                margin-top: 48px;
                width: 40px;
                height: 40px;
                svg {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }

    .recommended-book-section {
        .category {
            font-size: 24px;
            font-weight: 700;

            &.red {
                color: red;
            }
        }
    }
}
</style>
