import type {
    IComment,
    IGetCommentListQuery,
    ICommentListTree,
} from '@/interfaces';
import { commentService } from '@/services/comment.api';

export interface ICommentState {
    commentList: ICommentListTree[];
    commentListCount: number;
    commentListQuery: IGetCommentListQuery;
    selectedComment: IComment | null;
}
const state = (): ICommentState => ({
    commentList: [],
    commentListCount: 0,
    commentListQuery: {
        page: 1,
        limit: 10,
    },
    selectedComment: null,
});

const getters = {
    commentList: (state: ICommentState) => state.commentList,
    commentListCount: (state: ICommentState) => state.commentListCount,
    commentListQuery: (state: ICommentState) => state.commentListQuery,
    selectedComment: (state: ICommentState) => state.selectedComment,
};

const actions = {
    async getCommentList({
        commit,
        state,
    }: {
        commit: any;
        state: ICommentState;
    }) {
        const response = await commentService.getCommentList(
            state.commentListQuery
        );
        if (response?.success) {
            commit('SET_COMMENT_LIST', response?.data?.items);
            commit('SET_COMMENT_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_COMMENT_LIST', []);
            commit('SET_COMMENT_LIST_COUNT', 0);
        }
    },

    async reactToComment(
        { commit, state }: { commit: any; state: ICommentState },
        id: string
    ) {
        const response = await commentService.reactToComment(id);
    },

    async setCommentListQuery(
        { commit, state }: { commit: any; state: ICommentState },
        query: IGetCommentListQuery
    ) {
        commit('SET_COMMENT_LIST_QUERY', query);
    },
};

const mutations = {
    SET_COMMENT_LIST(state: ICommentState, commentList: ICommentListTree[]) {
        state.commentList = commentList;
    },
    SET_COMMENT_LIST_COUNT(state: ICommentState, commentListCount: number) {
        state.commentListCount = commentListCount;
    },
    SET_COMMENT_LIST_QUERY(state: ICommentState, query: IGetCommentListQuery) {
        state.commentListQuery = query;
    },
    SET_SELECTED_COMMENT(state: ICommentState, comment: IComment) {
        state.selectedComment = comment;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
