import type { IUser } from '@/interfaces';

export interface IAuthState {
    loginUser: IUser | null;
}
const state = (): IAuthState => ({
    loginUser: null,
});

const getters = {
    loginUser: (state: IAuthState) => state.loginUser,
};

const actions = {
    setLoginUser({ commit }: { commit: any }, loginUser: IUser | null) {
        commit('SET_LOGIN_USER', loginUser);
    },
};

const mutations = {
    SET_LOGIN_USER(state: IAuthState, loginUser: IUser | null) {
        state.loginUser = loginUser;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
