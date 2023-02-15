<template>
    <div class="message-list-wrapper">
        <div
            class="message-item"
            v-for="message in messageList"
            :key="message._id"
        >
            <MessageItem :message="message" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMessage } from '@/interfaces';
import MessageItem from './MessageItem.vue';

const props = defineProps<{
    messageList: IMessage[];
}>();
</script>

<style lang="scss" scoped>
.message-list-wrapper {
    display: flex;
    flex-direction: column;

    .message-item {
        width: 100%;
    }
}
</style>
