import type { IBook, ICreateBookBody, IGetListQuery } from '@/interfaces';
import { bookService } from '@/services/book.api';

export interface IDialogState {
    isShowCreateReviewDialog: boolean;
}
const state = (): IDialogState => ({
    isShowCreateReviewDialog: false,
});

const getters = {
    isShowCreateReviewDialog: (state: IDialogState) =>
        state.isShowCreateReviewDialog,
};

const actions = {
    setIsShowCreateReviewDialog(
        { commit, state }: { commit: any; state: IDialogState },
        isShowCreateReviewDialog: boolean
    ) {
        commit('SET_IS_SHOW_CREATE_REVIEW_DIALOG', isShowCreateReviewDialog);
    },
};

const mutations = {
    SET_IS_SHOW_CREATE_REVIEW_DIALOG(
        state: IDialogState,
        isShowCreateReviewDialog: boolean
    ) {
        state.isShowCreateReviewDialog = isShowCreateReviewDialog;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
