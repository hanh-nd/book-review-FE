<template>
    <ElDialog :model-value="isShowDialog" title="Báo cáo bài viết">
        <ElInput
            name="description"
            v-model="description"
            placeholder="Điền lý do"
            :rows="3"
            type="textarea"
        />
        <ElButton @click="onSubmit">Submit</ElButton>
    </ElDialog>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showRequireLoginFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import type { IStore } from '@/interfaces';
import { reviewService } from '@/services/review.api';
import { ElDialog } from 'element-plus';
import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore<IStore>();
const isShowDialog = computed(
    () => store.state.dialogs.isShowReportReviewDialog
);
const toReportReviewId = computed(() => store.state.dialogs.toReportReviewId);
const initialValues = {
    description: '',
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

    const response = await reviewService.reportReview(
        toReportReviewId.value,
        values
    );
    if (response?.success) {
        showSuccessNotificationFunction('Reported');
        clearFormData();
        store.dispatch('dialogs/setIsShowReportReviewDialog', false);
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: description } = useField<string>('description');
</script>

<style lang="scss"></style>
