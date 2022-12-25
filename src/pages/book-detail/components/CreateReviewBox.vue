<template>
    <div class="create-review-box">
        Viết review:
        <ElInput
            name="content"
            v-model="content"
            placeholder="Enter review"
            :rows="3"
            type="textarea"
        />
        <ElInput name="bookId" v-model="bookId" hidden />
        <ElButton @click="onSubmit">Submit</ElButton>
    </div>
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

const props = defineProps<{
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
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
const { value: bookId } = useField<string>('bookId');
</script>

<style lang="scss" scoped></style>
