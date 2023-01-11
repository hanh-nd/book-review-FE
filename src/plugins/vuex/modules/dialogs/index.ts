export interface IDialogState {
    isShowCreateReviewDialog: boolean;
    isShowReportCommentDialog: boolean;
    isShowReportReviewDialog: boolean;
    toReportCommentId: string;
    toReportReviewId: string;
}
const state = (): IDialogState => ({
    isShowCreateReviewDialog: false,
    isShowReportCommentDialog: false,
    isShowReportReviewDialog: false,
    toReportCommentId: '',
    toReportReviewId: '',
});

const getters = {
    isShowCreateReviewDialog: (state: IDialogState) =>
        state.isShowCreateReviewDialog,
    isShowReportCommentDialog: (state: IDialogState) =>
        state.isShowReportCommentDialog,
    isShowReportReviewDialog: (state: IDialogState) =>
        state.isShowReportReviewDialog,
    toReportCommentId: (state: IDialogState) => state.toReportCommentId,
    toReportReviewId: (state: IDialogState) => state.toReportReviewId,
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
    setIsShowReportReviewDialog(
        { commit, state }: { commit: any; state: IDialogState },
        isShowReportReviewDialog: boolean
    ) {
        commit('SET_IS_SHOW_REPORT_REVIEW_DIALOG', isShowReportReviewDialog);
    },
    setToReportReviewId(
        { commit, state }: { commit: any; state: IDialogState },
        toReportReviewId: boolean
    ) {
        commit('SET_TO_REPORT_REVIEW_ID', toReportReviewId);
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
    SET_TO_REPORT_COMMENT_ID(state: IDialogState, toReportCommentId: string) {
        state.toReportCommentId = toReportCommentId;
    },
    SET_IS_SHOW_REPORT_REVIEW_DIALOG(
        state: IDialogState,
        isShowReportReviewDialog: boolean
    ) {
        state.isShowReportReviewDialog = isShowReportReviewDialog;
    },
    SET_TO_REPORT_REVIEW_ID(state: IDialogState, toReportReviewId: string) {
        state.toReportReviewId = toReportReviewId;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
