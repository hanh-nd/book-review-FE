import type { IAuthBody, IAuthResponse, IBodyResponse } from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class AuthService extends ApiService {
    login(body: IAuthBody): Promise<IBodyResponse<IAuthResponse>> {
        return this.client.post(`${this.baseUrl}/login`, body);
    }

    register(body: IAuthBody): Promise<IBodyResponse<IAuthResponse>> {
        return this.client.post(`${this.baseUrl}/register`, body);
    }
}

export const authService = new AuthService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
