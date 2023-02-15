<template>
    <div class="create-message-box">
        <ElInput
            name="content"
            v-model="content"
            placeholder="Enter message"
            :rows="3"
            type="textarea"
        />
        <ElInput name="chatId" v-model="chatId" hidden />
        <ElButton @click="onSubmit">Submit</ElButton>
    </div>
</template>

<script setup lang="ts">
import { showRequireLoginFunction } from '@/common/helpers';
import type { IStore } from '@/interfaces';
import { SocketIO } from '@/plugins/socket.io';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';

const props = defineProps<{
    chatId: string;
}>();

const store = useStore<IStore>();

const initialValues = {
    content: '',
    chatId: props.chatId,
};

const { resetForm, handleSubmit } = useForm({
    initialValues,
});

const clearFormData = () => {
    resetForm({
        values: {
            ...initialValues,
        },
    });
};

const onSubmit = handleSubmit(async (values) => {
    if (!showRequireLoginFunction()) return;
    const { chatId, content } = values;
    SocketIO.emitUserMessage(chatId, content);
});

const { value: content } = useField<string>('content');
const { value: chatId } = useField<string>('chatId');
</script>

<style lang="scss" scoped></style>
