import type {
    IGetReportListQuery, IReport
} from '@/interfaces';
import { reportService } from '@/services/report.api';

export interface IReportState {
    reportList: IReport[];
    reportListCount: number;
    reportListQuery: IGetReportListQuery;
}
const state = (): IReportState => ({
    reportList: [],
    reportListCount: 0,
    reportListQuery: {
        page: 1,
        limit: 100,
        resolved: false,
    },
});

const getters = {
    reportList: (state: IReportState) => state.reportList,
    reportListCount: (state: IReportState) => state.reportListCount,
    reportListQuery: (state: IReportState) => state.reportListQuery,
};

const actions = {
    async getReportList({
        commit,
        state,
    }: {
        commit: any;
        state: IReportState;
    }) {
        const response = await reportService.getReportList(
            state.reportListQuery
        );
        if (response?.success) {
            commit('SET_REPORT_LIST', response?.data?.items);
            commit('SET_REPORT_LIST_COUNT', response?.data?.totalItems || 0);
        } else {
            commit('SET_REPORT_LIST', []);
            commit('SET_REPORT_LIST_COUNT', 0);
        }
    },

    setReportListQuery(
        {
            commit,
            state,
        }: {
            commit: any;
            state: IReportState;
        },
        query: IGetReportListQuery
    ) {
        commit('SET_REPORT_LIST_QUERY', {
            ...state.reportListQuery,
            ...query,
        });
    },
};

const mutations = {
    SET_REPORT_LIST(state: IReportState, reportList: IReport[]) {
        state.reportList = reportList;
    },
    SET_REPORT_LIST_COUNT(state: IReportState, reportListCount: number) {
        state.reportListCount = reportListCount;
    },
    SET_REPORT_LIST_QUERY(
        state: IReportState,
        reportListQuery: IGetReportListQuery
    ) {
        state.reportListQuery = reportListQuery;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
