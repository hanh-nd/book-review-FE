import { PageName } from '@/constants';
import HomePage from '@/pages/home/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: PageName.LOGIN_PAGE,
            component: () => import('@/pages/auth/pages/LoginPage.vue'),
        },
        {
            path: '/register',
            name: PageName.REGISTER_PAGE,
            component: () => import('@/pages/auth/pages/RegisterPage.vue'),
        },
        {
            path: '/',
            name: PageName.HOME_PAGE,
            component: HomePage,
        },
        {
            path: '/books/:id',
            name: PageName.BOOK_DETAIL_PAGE,
            component: () =>
                import('@/pages/book-detail/pages/BookDetailPage.vue'),
        },
        {
            path: '/profile/:id',
            name: PageName.PROFILE_PAGE,
            component: () => import('@/pages/profile/pages/ProfilePage.vue'),
        },
        {
            path: '/books/create',
            name: PageName.CREATE_BOOK_PAGE,
            component: () =>
                import('@/pages/book-manage/pages/CreateBookPage.vue'),
        },
        {
            path: '/books/:id/update',
            name: PageName.UPDATE_BOOK_PAGE,
            component: () =>
                import('@/pages/book-manage/pages/UpdateBookPage.vue'),
        },
        {
            path: '/books/:id/review',
            name: PageName.REVIEW_LIST_PAGE,
            component: () =>
                import('@/pages/review-list/pages/ReviewListPage.vue'),
        },
    ],
});

export default router;
