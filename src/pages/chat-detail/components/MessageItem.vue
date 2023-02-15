<template>
    <div class="message-item-wrapper">
        <div class="message-name">
            {{ message.sender?.[0]?.username }}
        </div>
        <div class="message-content">
            {{ message.content }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMessage } from '@/interfaces';

const props = defineProps<{
    message: IMessage;
}>();
</script>

<style lang="scss" scoped>
.message-item-wrapper {
    display: flex;
    flex-direction: column;

    .message-name {
        font-weight: 700;
    }
}
</style>
