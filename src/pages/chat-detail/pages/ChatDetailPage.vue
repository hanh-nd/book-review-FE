<template>
    <div class="chat-page-wrapper">
        <div class="message-list">
            <MessageList :message-list="messageList" />
        </div>
        <div class="input">
            <CreateMessageBox :chat-id="chatId" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMessage, IStore } from '@/interfaces';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import CreateMessageBox from '../components/CreateMessageBox.vue';
import MessageList from '../components/MessageList.vue';

const route = useRoute();
const store = useStore<IStore>();

const chatId = computed(() => route.params.id as string);
const messageList = computed<IMessage[]>(() => {
    return store.state.chats.messageList;
});

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch('chats/getMessageList', newId);
    },
    {
        immediate: true,
    }
);
</script>

<style scoped></style>
