import type {
    ICreateReviewBody,
    IGetReviewListQuery,
    IReview,
} from '@/interfaces';
import { reviewService } from '@/services/review.api';

export interface IReviewState {
    reviewList: IReview[];
    reviewListCount: number;
    reviewListQuery: IGetReviewListQuery;
    selectedReview: IReview | {};
}
const state = (): IReviewState => ({
    reviewList: [],
    reviewListCount: 0,
    reviewListQuery: {
        page: 1,
        limit: 10,
    },
    selectedReview: {},
});

const getters = {
    reviewList: (state: IReviewState) => state.reviewList,
    reviewListCount: (state: IReviewState) => state.reviewListCount,
    reviewListQuery: (state: IReviewState) => state.reviewListQuery,
    selectedReview: (state: IReviewState) => state.selectedReview,
};

const actions = {
    async createReview(
        { commit, state }: { commit: any; state: IReviewState },
        body: ICreateReviewBody
    ) {
        const response = await reviewService.createReview(body);
        if (response?.success) {
            commit('SET_SELECTED_REVIEW', response?.data || {});
        } else {
            commit('SET_SELECTED_REVIEW', {});
        }
    },

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
            commit('SET_SELECTED_REVIEW', response?.data || {});
        } else {
            commit('SET_SELECTED_REVIEW', {});
        }
    },

    async reactToReview(
        { commit, state }: { commit: any; state: IReviewState },
        id: string
    ) {
        const response = await reviewService.reactToReview(id);
    },
};

const mutations = {
    SET_REVIEW_LIST(state: IReviewState, reviewList: IReview[]) {
        state.reviewList = reviewList;
    },
    SET_REVIEW_LIST_COUNT(state: IReviewState, reviewListCount: number) {
        state.reviewListCount = reviewListCount;
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
