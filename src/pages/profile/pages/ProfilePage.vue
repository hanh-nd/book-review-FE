<template>
    <div class="detail">
        <div class="header">Chi tiết người dùng</div>
        <div class="detail">
            <div>Tên người dùng: {{ userDetail?.username }}</div>
            <div>
                Ngày tham gia: {{ dayjs(userDetail?.createdAt).fmDDMMYYYY() }}
            </div>
        </div>
        <div class="action">
            <ElButton @click="openChat(userDetail?._id)">Nhắn tin</ElButton>
        </div>
    </div>

    <div class="book-shelf">
        <div class="header">
            Giá sách: {{ userDetail?.bookShelf?.length }} sách
        </div>
        <div class="book-list">
            <BookList :book-list="userDetail?.bookShelf || []" />
        </div>
    </div>
</template>

<script setup lang="ts">
import BookList from '@/components/BookList.vue';
import type { IStore } from '@/interfaces';
import dayjs from '@/plugins/dayjs';
import { SocketIO } from '@/plugins/socket.io';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore<IStore>();
const route = useRoute();

const userDetail = computed(() => store.state.users.userDetail);

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch('users/getUserDetail', newId);
    },
    {
        immediate: true,
    }
);

const openChat = (receiverId: string | undefined) => {
    if (!receiverId) return;
    SocketIO.emitUserChat(receiverId, Date.now().toString());
};
</script>

<style lang="scss" scoped></style>
