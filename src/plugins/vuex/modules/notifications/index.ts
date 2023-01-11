import type { IGetNotificationListQuery, INotification } from '@/interfaces';
import { notificationService } from '@/services/notification.api';

export interface INotificationState {
    notificationList: INotification[];
    notificationListCount: number;
    notificationListQuery: IGetNotificationListQuery;
}
const state = (): INotificationState => ({
    notificationList: [],
    notificationListCount: 0,
    notificationListQuery: {
        page: 1,
        limit: 100,
        receiverId: '',
    },
});

const getters = {
    notificationList: (state: INotificationState) => state.notificationList,
    notificationListCount: (state: INotificationState) =>
        state.notificationListCount,
    notificationListQuery: (state: INotificationState) =>
        state.notificationListQuery,
};

const actions = {
    async getNotificationList({
        commit,
        state,
    }: {
        commit: any;
        state: INotificationState;
    }) {
        const response = await notificationService.getNotificationList(
            state.notificationListQuery
        );
        if (response?.success) {
            commit('SET_NOTIFICATION_LIST', response?.data?.items);
            commit(
                'SET_NOTIFICATION_LIST_COUNT',
                response?.data?.totalItems || 0
            );
        } else {
            commit('SET_NOTIFICATION_LIST', []);
            commit('SET_NOTIFICATION_LIST_COUNT', 0);
        }
    },

    setNotificationListQuery(
        {
            commit,
            state,
        }: {
            commit: any;
            state: INotificationState;
        },
        query: IGetNotificationListQuery
    ) {
        commit('SET_NOTIFICATION_LIST_QUERY', {
            ...state.notificationListQuery,
            ...query,
        });
    },
};

const mutations = {
    SET_NOTIFICATION_LIST(
        state: INotificationState,
        notificationList: INotification[]
    ) {
        state.notificationList = notificationList;
    },
    SET_NOTIFICATION_LIST_COUNT(
        state: INotificationState,
        notificationListCount: number
    ) {
        state.notificationListCount = notificationListCount;
    },
    SET_NOTIFICATION_LIST_QUERY(
        state: INotificationState,
        notificationListQuery: IGetNotificationListQuery
    ) {
        state.notificationListQuery = notificationListQuery;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
