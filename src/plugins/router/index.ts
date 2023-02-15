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
            path: '/reviews/:id',
            name: PageName.REVIEW_DETAIL_PAGE,
            component: () =>
                import('@/pages/review-detail/pages/ReviewDetailPage.vue'),
        },
        {
            path: '/admin/books',
            name: PageName.ADMIN_BOOK_LIST_PAGE,
            component: () =>
                import('@/pages/admin/pages/books/AdminBookListPage.vue'),
        },
        {
            path: '/admin/books/create',
            name: PageName.CREATE_BOOK_PAGE,
            component: () =>
                import('@/pages/admin/pages/books/CreateBookPage.vue'),
        },
        {
            path: '/admin/books/:id/update',
            name: PageName.UPDATE_BOOK_PAGE,
            component: () =>
                import('@/pages/admin/pages/books/UpdateBookPage.vue'),
        },
        {
            path: '/admin/reports',
            name: PageName.ADMIN_REPORT_LIST_PAGE,
            component: () =>
                import('@/pages/admin/pages/reports/ReportListPage.vue'),
        },
        {
            path: '/chat',
            name: PageName.CHAT_LIST_PAGE,
            component: () => import('@/pages/chat/pages/ChatPage.vue'),
        },
        {
            path: '/chat/:id',
            name: PageName.CHAT_DETAIL_PAGE,
            component: () =>
                import('@/pages/chat-detail/pages/ChatDetailPage.vue'),
        },
    ],
});

export default router;
