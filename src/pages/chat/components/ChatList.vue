<template>
    <div class="chat-list-wrapper">
        <div class="chat-item" v-for="chat in chatList" :key="chat._id">
            <ChatItem :chat="chat" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IChat } from '@/interfaces';
import ChatItem from './ChatItem.vue';

const props = defineProps<{
    chatList: IChat[];
}>();
</script>

<style lang="scss" scoped>
.chat-list-wrapper {
    display: flex;
    flex-direction: column;

    .chat-item {
        width: 100%;
    }
}
</style>
