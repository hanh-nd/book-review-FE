import type {
    IBodyResponse,
    ICommonGetListResponse,
    IGetReportListQuery,
    IReport,
    IUpdateReportBody,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class ReportService extends ApiService {
    getReportList(
        params: IGetReportListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IReport>>> {
        return this.client.get(`${this.baseUrl}/reports`, {
            params,
        });
    }

    updateReport(
        reportId: string,
        body: IUpdateReportBody
    ): Promise<IBodyResponse<IReport>> {
        return this.client.patch(`${this.baseUrl}/reports/${reportId}`, body);
    }
}

export const reportService = new ReportService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
