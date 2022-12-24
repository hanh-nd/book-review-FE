import type { IBook, ICreateBookBody, IGetListQuery } from '@/interfaces';
import { bookService } from '@/services/book.api';

export interface IBookState {
    bookList: IBook[];
    bookListCount: number;
    bookListQuery: IGetListQuery;
    selectedBook: IBook | null;
}
const state = (): IBookState => ({
    bookList: [],
    bookListCount: 0,
    bookListQuery: {
        page: 1,
        limit: 10,
    },
    selectedBook: null,
});

const getters = {
    bookList: (state: IBookState) => state.bookList,
    bookListCount: (state: IBookState) => state.bookListCount,
    bookListQuery: (state: IBookState) => state.bookListQuery,
    selectedBook: (state: IBookState) => state.selectedBook,
};

const actions = {
    async getBookDetail(
        { commit, state }: { commit: any; state: IBookState },
        id: string
    ) {
        const response = await bookService.getBookDetail(id);
        if (response?.success) {
            commit('SET_SELECTED_BOOK', response?.data || {});
        } else {
            commit('SET_SELECTED_BOOK', {});
        }
    },

    async getBookList({ commit, state }: { commit: any; state: IBookState }) {
        const response = await bookService.getBookList(state.bookListQuery);
        if (response?.success) {
            commit('SET_BOOK_LIST', response?.data?.items);
            commit('SET_BOOK_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_BOOK_LIST', []);
            commit('SET_BOOK_LIST_COUNT', 0);
        }
    },
};

const mutations = {
    SET_BOOK_LIST(state: IBookState, bookList: IBook[]) {
        state.bookList = bookList;
    },
    SET_BOOK_LIST_COUNT(state: IBookState, bookListCount: number) {
        state.bookListCount = bookListCount;
    },
    SET_SELECTED_BOOK(state: IBookState, book: IBook) {
        state.selectedBook = book;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
