import { HttpStatus } from '@/constants';
import type { IBodyResponse } from '@/interfaces';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMiddleware } from './httpMiddleware';

export default class CommonMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        Object.assign(config, {
            headers: {
                ...config.headers,
                // 'X-Timezone': momentTimezone().format('Z'),
                // 'X-Timezone-Name': momentTimezone.tz.guess(),
                'Content-Type': 'application/json',
            },
        });
        return config;
    }

    onResponse(response: AxiosResponse): AxiosResponse {
        if (typeof response?.data === 'string')
            response.data = JSON.parse(response.data);
        response.data = {
            ...response?.data,
            success: true,
        };
        return response.data;
    }

    onResponseError(error: AxiosError): IBodyResponse<unknown> {
        if (error.response) {
            if (
                typeof error?.response?.data === 'string' &&
                this.isParsable(error?.response?.data)
            ) {
                error.response.data = JSON.parse(error.response.data);
            }
            error.response.data = {
                ...(error?.response?.data || {}),
                success: false,
            };
            return error.response.data as IBodyResponse<unknown>;
        } else if (error.request) {
            error.request.data = {
                ...(error?.request?.data || {}),
                success: false,
                isRequestError: true,
                message: error.message,
            };
            return error.request?.data;
        }
        return {
            ...error,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusText: 'An error occurred',
            headers: {},
            success: false,
            message: 'An error occurred',
            data: undefined,
            code: HttpStatus.INTERNAL_SERVER_ERROR,
        } as IBodyResponse<unknown>;
    }

    isParsable(obj: string) {
        try {
            JSON.parse(obj);
            return true;
        } catch (e) {
            return false;
        }
    }
}
