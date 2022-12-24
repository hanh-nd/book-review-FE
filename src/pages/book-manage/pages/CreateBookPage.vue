<template>
    <div class="auth-wrapper">
        <ElInput name="name" v-model="name" placeholder="Enter book name" />
        <ElInput
            name="imageUrl"
            v-model="imageUrl"
            placeholder="Enter book cover url"
        />
        <ElInput
            name="describe"
            v-model="describe"
            placeholder="Enter book description"
        />
        <ElInput
            name="author"
            v-model="author"
            placeholder="Enter book author"
        />
        <ElInput
            name="publisher"
            v-model="publisher"
            placeholder="Enter book publisher"
        />
        <ElInput
            name="publicationYear"
            v-model="publicationYear"
            placeholder="Enter book publication year"
        />
        <ElButton @click="onSubmit">Create</ElButton>
    </div>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { bookService } from '@/services/book.api';
import { useField, useForm } from 'vee-validate';

const initialValues = {
    name: '',
    imageUrl: '',
    describe: '',
    author: '',
    publisher: '',
    publicationYear: 0,
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
    const response = await bookService.createBook(values);
    if (response?.success) {
        showSuccessNotificationFunction('Book created');
        clearFormData();
    } else {
        showErrorNotificationFunction('An error occurred ');
    }
});

const { value: name } = useField<string>('name');
const { value: imageUrl } = useField<string>('imageUrl');
const { value: describe } = useField<string>('describe');
const { value: author } = useField<string>('author');
const { value: publisher } = useField<string>('publisher');
const { value: publicationYear } = useField<number>('publicationYear');
</script>

<style lang="scss" scoped></style>
