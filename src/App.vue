<template>
    <div class="app">
        <Header />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { RouterView, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import localStorageAuthService from './common/auth-storage';
import { showSuccessNotificationFunction } from './common/helpers';
import { NotificationAction, NotificationModule, PageName } from './constants';
import type { IComment, IStore } from './interfaces';
import { SocketIO } from './plugins/socket.io';

const router = useRouter();
const store = useStore<IStore>();
const loginUser = localStorageAuthService.getLoginUser();
store.dispatch('auth/setLoginUser', loginUser);

const accessToken = localStorageAuthService.getAccessToken();
if (accessToken) {
    SocketIO.connect(accessToken);
    SocketIO.onUserNotification(async (payload) => {
        const { senderId, module, action, targetId, createdAt } = payload;
        showSuccessNotificationFunction(
            `${senderId.username} vừa ${
                action === NotificationAction.COMMENT ? 'bình luận' : 'thích'
            } ${
                module === NotificationModule.REVIEW ? 'bài viết' : 'bình luận'
            } của bạn.`,
            'Thông báo',
            () => {
                router.push({
                    name: PageName.REVIEW_DETAIL_PAGE,
                    params: {
                        id:
                            module === NotificationModule.REVIEW
                                ? targetId._id
                                : (targetId as IComment).reviewId,
                    },
                });
            }
        );
    });
}
</script>

<style scoped>
.app {
    background-color: white;
}
</style>
