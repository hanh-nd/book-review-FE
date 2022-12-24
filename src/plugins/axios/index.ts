import HttpMiddlewareService from './service';
import axios, { type AxiosRequestConfig } from 'axios';
import AuthMiddleware from './middlewares/authMiddleware';
import CommonMiddleware from './middlewares/commonMiddleware';

const options: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_URL,
    responseType: 'json',
};

const axiosInstance = axios.create(options);

const axiosService = new HttpMiddlewareService(axiosInstance);
axiosService.register([new AuthMiddleware(), new CommonMiddleware()]);

export default axiosInstance;
