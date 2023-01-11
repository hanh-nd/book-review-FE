import type {
    IBodyResponse,
    IBook,
    ICommonGetListResponse,
    IGetNotificationListQuery,
    INotification,
    IUpdateNotificationBody,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class NotificationService extends ApiService {
    getNotificationList(
        params: IGetNotificationListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<INotification>>> {
        return this.client.get(`${this.baseUrl}/notifications`, {
            params,
        });
    }

    updateNotification(
        notificationId: string,
        body: IUpdateNotificationBody
    ): Promise<IBodyResponse<IBook>> {
        return this.client.patch(
            `${this.baseUrl}/notifications/${notificationId}`,
            body
        );
    }
}

export const notificationService = new NotificationService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
