<template>
    <div class="chat-item-wrapper" @click="getDetail">
        <div class="chat-name">
            {{
                (chat?.members || [])
                    .map((member) => member?.username || '')
                    .join(', ')
            }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { PageName } from '@/constants';
import type { IChat } from '@/interfaces';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    chat: IChat;
}>();

const getDetail = () => {
    console.log('in here');
    router.push({
        name: PageName.CHAT_DETAIL_PAGE,
        params: {
            id: props.chat._id,
        },
    });
};
</script>

<style lang="scss" scoped>
.chat-item-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    cursor: pointer;

    .chat-name {
        font-weight: 700;
        font-size: 18;
    }
}
</style>
