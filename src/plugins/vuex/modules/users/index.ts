import type { IUser } from '@/interfaces';
import { userService } from '@/services/user.api';

export interface IUserState {
    userDetail: IUser | null;
}

const state = (): IUserState => ({
    userDetail: null,
});

const getters = {
    userDetail: (state: IUserState) => state.userDetail,
};

const actions = {
    async getUserDetail({ commit }: any, id: string) {
        const response = await userService.getUserDetail(id);
        if (response?.success) {
            commit('SET_USER_DETAIL', response?.data || null);
        } else {
            commit('SET_USER_DETAIL', null);
        }
    },
};

const mutations = {
    SET_USER_DETAIL(state: IUserState, userDetail: IUser) {
        state.userDetail = userDetail;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
