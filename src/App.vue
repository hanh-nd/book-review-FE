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
import { notificationService } from './services/notification.api';

const router = useRouter();
const store = useStore<IStore>();
const loginUser = localStorageAuthService.getLoginUser();
store.dispatch('auth/setLoginUser', loginUser);

const accessToken = localStorageAuthService.getAccessToken();
if (accessToken) {
    store
        .dispatch('notifications/setNotificationListQuery', {
            receiverId: loginUser?._id,
        })
        .then(() => {
            store.dispatch('notifications/getNotificationList');
        });
    SocketIO.connect(accessToken);
    SocketIO.onUserNotification(async (payload) => {
        store.dispatch('notifications/getNotificationList');

        const { _id, senderId, module, action, targetId, createdAt } = payload;
        showSuccessNotificationFunction(
            `${senderId.username} vừa ${
                action === NotificationAction.COMMENT ? 'bình luận' : 'thích'
            } ${
                module === NotificationModule.REVIEW ? 'bài viết' : 'bình luận'
            } của bạn.`,
            'Thông báo',
            () => {
                notificationService.updateNotification(_id, {
                    isRead: true,
                });
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
