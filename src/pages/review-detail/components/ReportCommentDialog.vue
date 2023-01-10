<template>
    <ElDialog :model-value="isShowDialog" title="Báo cáo bình luận">
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
    () => store.state.dialogs.isShowReportCommentDialog
);
const toReportCommentId = computed(() => store.state.dialogs.toReportCommentId);
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
        toReportCommentId.value,
        values
    );
    if (response?.success) {
        showSuccessNotificationFunction('Reported');
        clearFormData();
        store.dispatch('dialogs/setIsShowReportCommentDialog', false);
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: description } = useField<string>('description');
</script>

<style lang="scss"></style>
