import type {
    IAddToBookShelfBody,
    IBodyResponse,
    ICommonGetListResponse,
    IGetListQuery,
    IUpdateUserBody,
    IUser,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class UserService extends ApiService {
    getUserList(
        params: IGetListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IUser>>> {
        return this.client.get(`${this.baseUrl}/users`, {
            params,
        });
    }

    getUserDetail(userId: string): Promise<IBodyResponse<IUser>> {
        return this.client.get(`${this.baseUrl}/users/${userId}`);
    }

    updateUser(body: IUpdateUserBody): Promise<IBodyResponse<IUser>> {
        return this.client.patch(`${this.baseUrl}/users/update`, body);
    }

    addToBookShelf(body: IAddToBookShelfBody): Promise<IBodyResponse<IUser>> {
        return this.client.patch(
            `${this.baseUrl}/users/add-to-book-shelf`,
            body
        );
    }
}

export const userService = new UserService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
