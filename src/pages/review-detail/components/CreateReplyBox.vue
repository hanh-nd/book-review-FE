<template>
    <div class="create-reply-box">
        <div class="header">Trả lời:</div>
        <div class="create-content">
            <ElInput
                name="content"
                v-model="content"
                placeholder="Enter comment"
                :rows="1"
                type="textarea"
            />
            <ElInput name="reviewId" v-model="reviewId" v-show="false" />
            <ElInput name="parentId" v-model="parentId" v-show="false" />
            <ElButton @click="onSubmit">Submit</ElButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showRequireLoginFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { NotificationModule } from '@/constants';
import type { IStore } from '@/interfaces';
import { SocketIO } from '@/plugins/socket.io';
import { commentService } from '@/services/comment.api';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';

const props = defineProps<{
    reviewId: string;
    parentId: string;
    authorId: string;
}>();

const store = useStore<IStore>();

const initialValues = {
    content: '',
    reviewId: props.reviewId,
    parentId: props.parentId,
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

    const response = await commentService.createComment(values);
    if (response?.success) {
        showSuccessNotificationFunction('Comment created');
        clearFormData();
        store.dispatch('comments/getCommentList');

        SocketIO.emitUserComment(
            props.authorId,
            props.parentId,
            NotificationModule.COMMENT
        );
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
const { value: reviewId } = useField<string>('reviewId');
const { value: parentId } = useField<string>('parentId');
</script>

<style lang="scss" scoped>
.create-reply-box {
    display: flex;
    flex-direction: column;

    .create-content {
        display: flex;
        flex-direction: row;
    }
}
</style>
