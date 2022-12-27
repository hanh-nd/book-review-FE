<template>
    <div class="update-review-box">
        <ElInput
            name="content"
            v-model="content"
            placeholder="Enter review"
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
import { reviewService } from '@/services/review.api';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';

const props = defineProps<{
    reviewId: string;
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
    const response = await reviewService.updateReview(props.reviewId, values);
    if (response?.success) {
        showSuccessNotificationFunction('Review updated');
        store.dispatch('reviews/getReviewList');
        emit('on-updated');
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: content } = useField<string>('content');
</script>

<style lang="scss" scoped></style>
