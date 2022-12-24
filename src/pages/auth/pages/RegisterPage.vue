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
        <ElButton @click="onSubmit">Register</ElButton>
    </div>
</template>

<script setup lang="ts">
import localStorageAuthService from '@/common/auth-storage';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { PageName } from '@/constants';
import type { IStore } from '@/interfaces';
import { authService } from '@/services/auth.api';
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
    const response = await authService.register(values);
    if (response?.success) {
        localStorageAuthService.setAccessToken(response.data.accessToken);
        localStorageAuthService.setLoginUser(response.data.user);
        store.dispatch('auth/setLoginUser', response.data.user);
        showSuccessNotificationFunction('Đăng ký thành công');
        router.push({
            name: PageName.HOME_PAGE,
        });
        clearFormData();
    } else {
        showErrorNotificationFunction(
            'Đăng ký thất bại',
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
