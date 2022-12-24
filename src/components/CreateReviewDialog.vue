<template>
    <ElDialog :model-value="isVisible" @close="onCloseDialog">
        <ElInput name="content" v-model="content" placeholder="Enter review" />
        <ElInput name="bookId" v-model="bookId" hidden />
        <ElButton @click="onSubmit">Submit</ElButton>
    </ElDialog>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import type { IStore } from '@/interfaces';
import { reviewService } from '@/services/review.api';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';
const emit = defineEmits<{
    (e: 'on-close'): void;
}>();
const props = defineProps<{
    isVisible: boolean;
    bookId: string;
}>();

const store = useStore<IStore>();

const initialValues = {
    content: '',
    bookId: props.bookId,
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
    const response = await reviewService.createReview(values);
    if (response?.success) {
        showSuccessNotificationFunction('Review created');
        clearFormData();
        store.dispatch('reviews/getReviewList');
        onCloseDialog();
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
const { value: bookId } = useField<string>('bookId');

const onCloseDialog = () => {
    emit('on-close');
};
</script>

<style lang="scss" scoped></style>
