<template>
    <div class="main-header">
        <div class="logo" @click="goHome">Book Review</div>
        <div class="account">
            <div v-if="isLoggedIn">
                <span @click="navigateProfilePage" class="username">
                    {{ loginUser?.username }}
                </span>
                <ElButton @click="onLogout">Đăng xuất</ElButton>
            </div>
            <div v-else>
                <ElButton @click="navigateLoginPage">Đăng nhập</ElButton>
                <ElButton @click="navigateRegisterPage">Đăng ký</ElButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import localStorageAuthService from '@/common/auth-storage';
import { PageName } from '@/constants';
import type { IStore, IUser } from '@/interfaces';
import { ElButton } from 'element-plus';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore<IStore>();

const goHome = () => {
    router.push({
        name: PageName.HOME_PAGE,
    });
};

const navigateLoginPage = () => {
    router.push({
        name: PageName.LOGIN_PAGE,
    });
};

const navigateRegisterPage = () => {
    router.push({
        name: PageName.REGISTER_PAGE,
    });
};

const navigateProfilePage = () => {
    router.push({
        name: PageName.PROFILE_PAGE,
        params: {
            id: loginUser.value?._id,
        },
    });
};

const onLogout = () => {
    localStorageAuthService.resetAll();
    store.dispatch('auth/setLoginUser', null);
};
const loginUser = computed<IUser | null>(() => {
    return store.state.auth.loginUser;
});

const isLoggedIn = computed<boolean>(() => {
    return !!loginUser.value;
});
</script>

<style lang="scss" scoped>
.main-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    .logo {
        font-size: 36px;
        font-weight: 700;
        cursor: pointer;
    }

    .account {
        .username {
            cursor: pointer;
        }
    }
}
</style>
