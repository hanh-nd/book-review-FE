import type { IGetReviewListQuery, IReview } from '@/interfaces';
import { reviewService } from '@/services/review.api';

export interface IReviewState {
    reviewList: IReview[];
    reviewListCount: number;
    reviewListQuery: IGetReviewListQuery;
    selectedReview: IReview | null;
}
const state = (): IReviewState => ({
    reviewList: [],
    reviewListCount: 0,
    reviewListQuery: {
        page: 1,
        limit: 10,
    },
    selectedReview: null,
});

const getters = {
    reviewList: (state: IReviewState) => state.reviewList,
    reviewListCount: (state: IReviewState) => state.reviewListCount,
    reviewListQuery: (state: IReviewState) => state.reviewListQuery,
    selectedReview: (state: IReviewState) => state.selectedReview,
};

const actions = {
    async getReviewList({
        commit,
        state,
    }: {
        commit: any;
        state: IReviewState;
    }) {
        const response = await reviewService.getReviewList(
            state.reviewListQuery
        );
        if (response?.success) {
            commit('SET_REVIEW_LIST', response?.data?.items);
            commit('SET_REVIEW_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_REVIEW_LIST', []);
            commit('SET_REVIEW_LIST_COUNT', 0);
        }
    },

    async getReviewDetail(
        { commit, state }: { commit: any; state: IReviewState },
        id: string
    ) {
        const response = await reviewService.getReviewDetail(id);
        if (response?.success) {
            commit('SET_SELECTED_REVIEW', response?.data || null);
        } else {
            commit('SET_SELECTED_REVIEW', null);
        }
    },

    async reactToReview(
        { commit, state }: { commit: any; state: IReviewState },
        id: string
    ) {
        const response = await reviewService.reactToReview(id);
    },

    async setReviewListQuery(
        { commit, state }: { commit: any; state: IReviewState },
        query: IGetReviewListQuery
    ) {
        commit('SET_REVIEW_LIST_QUERY', query);
    },
};

const mutations = {
    SET_REVIEW_LIST(state: IReviewState, reviewList: IReview[]) {
        state.reviewList = reviewList;
    },
    SET_REVIEW_LIST_COUNT(state: IReviewState, reviewListCount: number) {
        state.reviewListCount = reviewListCount;
    },
    SET_REVIEW_LIST_QUERY(state: IReviewState, query: IGetReviewListQuery) {
        state.reviewListQuery = query;
    },
    SET_SELECTED_REVIEW(state: IReviewState, review: IReview) {
        state.selectedReview = review;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
