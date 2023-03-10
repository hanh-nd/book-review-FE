<template>
    <div class="create-comment-box">
        Viết bình luận:
        <ElInput
            name="content"
            v-model="content"
            placeholder="Enter comment"
            :rows="3"
            type="textarea"
        />
        <ElInput name="reviewId" v-model="reviewId" hidden />
        <ElButton @click="onSubmit">Submit</ElButton>
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
    authorId: string;
}>();

const store = useStore<IStore>();

const initialValues = {
    content: '',
    reviewId: props.reviewId,
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
            props.reviewId,
            NotificationModule.REVIEW
        );
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
const { value: reviewId } = useField<string>('reviewId');
</script>

<style lang="scss" scoped></style>
