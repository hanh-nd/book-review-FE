<template>
    <div class="auth-wrapper">
        <ElInput
            name="username"
            v-model="username"
            placeholder="Enter your username"
        />
        <ElInput
            name="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            show-password
        />
        <ElButton @click="onSubmit">Login</ElButton>
    </div>
</template>

<script setup lang="ts">
import localStorageAuthService from '@/common/auth-storage';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { NotificationAction, NotificationModule, PageName } from '@/constants';
import type { IComment, IStore } from '@/interfaces';
import { SocketIO } from '@/plugins/socket.io';
import { authService } from '@/services/auth.api';
import { notificationService } from '@/services/notification.api';
import { useField, useForm } from 'vee-validate';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore<IStore>();

const initialValues = {
    username: '',
    password: '',
};

const { resetForm, handleSubmit } = useForm({
    initialValues,
});

const clearFormData = () => {
    resetForm({
        values: {
            ...initialValues,
        },
    });
};

const onSubmit = handleSubmit(async (values) => {
    const response = await authService.login(values);
    if (response?.success) {
        localStorageAuthService.setAccessToken(response.data.accessToken);
        localStorageAuthService.setLoginUser(response.data.user);
        store.dispatch('auth/setLoginUser', response.data.user);
        showSuccessNotificationFunction('Đăng nhập thành công');
        SocketIO.connect(response.data.accessToken);
        router.push({
            name: PageName.HOME_PAGE,
        });
        clearFormData();

        await store.dispatch('notifications/setNotificationListQuery', {
            receiverId: response.data.user._id,
        });
        store.dispatch('notifications/getNotificationList');
        SocketIO.onUserNotification(async (payload) => {
            const { _id, senderId, module, action, targetId, createdAt } =
                payload;
            showSuccessNotificationFunction(
                `${senderId.username} vừa ${
                    action === NotificationAction.COMMENT
                        ? 'bình luận'
                        : 'thích'
                } ${
                    module === NotificationModule.REVIEW
                        ? 'bài viết'
                        : 'bình luận'
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
    } else {
        showErrorNotificationFunction(
            'Đăng nhập thất bại',
            response?.error?.message
        );
    }
});

const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

onMounted(() => {
    const loginUser = store.state.auth.loginUser;
    if (loginUser) {
        router.push({
            name: PageName.HOME_PAGE,
        });
    }
});
</script>

<style lang="scss" scoped></style>
