<template>
    <div class="create-comment-box">
        <ElInput
            name="content"
            v-model="content"
            placeholder="Enter comment"
            :rows="3"
            type="textarea"
        />
        <ElButton @click="onSubmit">Submit</ElButton>
    </div>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import type { IStore } from '@/interfaces';
import { commentService } from '@/services/comment.api';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';

const props = defineProps<{
    commentId: string;
    content: string;
}>();

const emit = defineEmits<{
    (e: 'on-updated'): void;
}>();

const store = useStore<IStore>();

const initialValues = {
    content: props.content,
};

const { handleSubmit } = useForm({
    initialValues,
});

const onSubmit = handleSubmit(async (values) => {
    const response = await commentService.updateComment(
        props.commentId,
        values
    );
    if (response?.success) {
        showSuccessNotificationFunction('Comment updated');
        emit('on-updated');
        store.dispatch('comments/getCommentList');
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
</script>

<style lang="scss" scoped></style>
