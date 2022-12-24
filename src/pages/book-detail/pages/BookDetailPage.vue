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
            <ElButton @click="addToBookShelf" v-if="!isBookInBookShelf"
                >Thêm vào tủ sách</ElButton
            >
            <ElButton @click="removeToBookShelf" v-if="isBookInBookShelf"
                >Xóa khỏi tủ sách</ElButton
            >

            <ElButton @click="navigateToUpdateBookPage">Cập nhật</ElButton>
            <ElButton @click="navigateToUpdateBookPage">Viết review</ElButton>
            <ElButton @click="navigateToReviewListPage">Xem review</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { PageName } from '@/constants';
import type { IBook, IStore } from '@/interfaces';
import { userService } from '@/services/user.api';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore<IStore>();

const bookDetail = computed<IBook>(() => store.state.books.selectedBook!);

const navigateToUpdateBookPage = () => {
    router.push({
        name: PageName.UPDATE_BOOK_PAGE,
        params: {
            id: bookDetail.value?._id,
        },
    });
};

const navigateToReviewListPage = () => {
    router.push({
        name: PageName.REVIEW_LIST_PAGE,
        params: {
            id: bookDetail.value?._id,
        },
    });
};

const addToBookShelf = async () => {
    const response = await userService.addToBookShelf({
        bookId: bookDetail.value._id,
    });
    if (response?.success) {
        showSuccessNotificationFunction('Added to book shelf');
        store.dispatch('auth/setLoginUser', response.data);
    } else {
        showErrorNotificationFunction('An error occurred');
    }
};

const removeToBookShelf = async () => {
    const response = await userService.addToBookShelf({
        bookId: bookDetail.value._id,
    });
    if (response?.success) {
        showSuccessNotificationFunction('Removed to book shelf');
        console.log('ec', response.data);

        store.dispatch('auth/setLoginUser', response.data);
    } else {
        showErrorNotificationFunction('An error occurred');
    }
};

const isBookInBookShelf = computed(() => {
    return store.state.auth.loginUser?.bookShelfIds?.some(
        (id) => id === bookDetail.value?._id
    );
});
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
