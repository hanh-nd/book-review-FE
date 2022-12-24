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
        <ElButton @click="onSubmit">Update</ElButton>
    </div>
</template>

<script setup lang="ts">
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/common/helpers';
import { PageName } from '@/constants';
import type { IBook, IStore } from '@/interfaces';
import { bookService } from '@/services/book.api';
import { useField, useForm } from 'vee-validate';
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore<IStore>();

const initialValues = {
    name: '',
    imageUrl: '',
    describe: '',
    author: '',
    publisher: '',
    publicationYear: 0,
};

const { handleSubmit, setValues } = useForm({
    initialValues,
});

const setFormData = (data: IBook) => {
    const { name, imageUrl, describe, author, publisher, publicationYear } =
        data;
    setValues({ name, imageUrl, describe, author, publisher, publicationYear });
};

const bookDetail = computed(() => store.state.books.selectedBook);

const onSubmit = handleSubmit(async (values) => {
    const response = await bookService.updateBook(
        bookDetail.value?._id!,
        values
    );
    if (response?.success) {
        showSuccessNotificationFunction('Book updated');
        router.push({
            name: PageName.BOOK_DETAIL_PAGE,
            params: {
                id: bookDetail.value?._id,
            },
        });
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

watch(
    () => route.params.id,
    async (newId) => {
        store.dispatch('books/getBookDetail', newId);
    },
    {
        immediate: true,
    }
);

watch(
    () => bookDetail.value,
    async (newBook) => {
        if (newBook) setFormData(newBook);
    },
    {
        immediate: true,
    }
);
</script>

<style lang="scss" scoped></style>
