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

const store = useStore<IStore>();
const loginUser = localStorageAuthService.getLoginUser();
store.dispatch('auth/setLoginUser', loginUser);
</script>

<style scoped></style>
