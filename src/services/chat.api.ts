import type {
    IBodyResponse,
    IChat,
    ICommonGetListResponse,
    IGetChatListQuery,
    IGetMessageListQuery,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class ChatService extends ApiService {
    getChatList(
        params: IGetChatListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IChat>>> {
        return this.client.get(`${this.baseUrl}/chats`, {
            params,
        });
    }

    getChatDetail(
        id: string
    ): Promise<IBodyResponse<ICommonGetListResponse<IChat>>> {
        return this.client.get(`${this.baseUrl}/chats/${id}`);
    }

    getMessageList(
        chatId: string,
        params: IGetMessageListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IChat>>> {
        return this.client.get(`${this.baseUrl}/chats/${chatId}/messages`, {
            params,
        });
    }
}

export const chatService = new ChatService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
