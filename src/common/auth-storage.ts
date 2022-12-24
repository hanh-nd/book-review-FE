import type { IUser } from '@/interfaces';
import { isEmpty } from 'lodash';
import { storage } from './local-storage';

export const enum AUTH_SERVICE_KEY {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    LOGIN_USER = 'LOGIN_USER',
}
class LocalStorageAuthService {
    setAccessToken(value: string): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, value);
    }

    getAccessToken(): string {
        return storage.getLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN);
    }

    setLoginUser(user: IUser): void {
        storage.setLocalStorage(
            AUTH_SERVICE_KEY.LOGIN_USER,
            JSON.stringify(user || '')
        );
    }

    getLoginUser(): IUser | null {
        return storage.getObjectFromKey<IUser>(AUTH_SERVICE_KEY.LOGIN_USER);
    }

    resetAccessToken(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.ACCESS_TOKEN, '');
    }

    resetLoginUser(): void {
        storage.setLocalStorage(AUTH_SERVICE_KEY.LOGIN_USER, '');
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetLoginUser();
    }
}

const localStorageAuthService = new LocalStorageAuthService();
export default localStorageAuthService;
