<template>
    <Header />
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import localStorageAuthService from './common/auth-storage';
import { useStore } from 'vuex';
import type { IStore } from './interfaces';
import { userService } from './services/user.api';

const store = useStore<IStore>();
const loginUser = localStorageAuthService.getLoginUser();
store.dispatch('auth/setLoginUser', loginUser);
if (loginUser?._id) {
    const response = await userService.getUserDetail(loginUser?._id);
    if (response?.success) {
        store.dispatch('auth/setLoginUser', response?.data);
    }
}
</script>

<style scoped></style>
