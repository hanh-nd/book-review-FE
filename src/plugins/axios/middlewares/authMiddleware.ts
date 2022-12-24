import type { AxiosRequestConfig } from 'axios';
import { HttpMiddleware } from './httpMiddleware';

export default class AuthMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        config.headers = {
            ...config.headers,
        };

        return config;
    }
}
