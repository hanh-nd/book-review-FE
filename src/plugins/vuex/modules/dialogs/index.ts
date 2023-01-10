export interface IDialogState {
    isShowCreateReviewDialog: boolean;
    isShowReportCommentDialog: boolean;
    toReportCommentId: string;
}
const state = (): IDialogState => ({
    isShowCreateReviewDialog: false,
    isShowReportCommentDialog: false,
    toReportCommentId: '',
});

const getters = {
    isShowCreateReviewDialog: (state: IDialogState) =>
        state.isShowCreateReviewDialog,
    isShowReportCommentDialog: (state: IDialogState) =>
        state.isShowReportCommentDialog,
    toReportCommentId: (state: IDialogState) => state.toReportCommentId,
};

const actions = {
    setIsShowCreateReviewDialog(
        { commit, state }: { commit: any; state: IDialogState },
        isShowCreateReviewDialog: boolean
    ) {
        commit('SET_IS_SHOW_CREATE_REVIEW_DIALOG', isShowCreateReviewDialog);
    },
    setIsShowReportCommentDialog(
        { commit, state }: { commit: any; state: IDialogState },
        isShowReportCommentDialog: boolean
    ) {
        commit('SET_IS_SHOW_REPORT_COMMENT_DIALOG', isShowReportCommentDialog);
    },
    setToReportCommentId(
        { commit, state }: { commit: any; state: IDialogState },
        toReportCommentId: boolean
    ) {
        commit('SET_TO_REPORT_COMMENT_ID', toReportCommentId);
    },
};

const mutations = {
    SET_IS_SHOW_CREATE_REVIEW_DIALOG(
        state: IDialogState,
        isShowCreateReviewDialog: boolean
    ) {
        state.isShowCreateReviewDialog = isShowCreateReviewDialog;
    },
    SET_IS_SHOW_REPORT_COMMENT_DIALOG(
        state: IDialogState,
        isShowReportCommentDialog: boolean
    ) {
        state.isShowReportCommentDialog = isShowReportCommentDialog;
    },
    SET_TO_REPORT_COMMENT_ID(
        state: IDialogState,
        toReportCommentId: string
    ) {
        state.toReportCommentId = toReportCommentId;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
