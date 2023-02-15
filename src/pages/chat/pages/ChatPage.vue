<template>
    <div class="chat-page-wrapper">
        <ChatList :chat-list="chatList" />
    </div>
</template>

<script setup lang="ts">
import type { IChat, IStore } from '@/interfaces';
import { computed } from 'vue';
import { useStore } from 'vuex';
import ChatList from '../components/ChatList.vue';

const store = useStore<IStore>();

const chatList = computed<IChat[]>(() => {
    return store.state.chats.chatList;
});

const loadData = () => {
    store.dispatch('chats/getChatList');
};

loadData();
</script>

<style scoped></style>
