import { ElNotification } from 'element-plus';
import localStorageAuthService from './auth-storage';

export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function showSuccessNotificationFunction(
    message: string,
    title?: string
): void {
    ElNotification({
        type: 'success',
        title: title || 'Thành công',
        message: message,
    });
}

export function showErrorNotificationFunction(
    message: string,
    title?: string
): void {
    ElNotification({
        type: 'error',
        title: title || 'Thất bại',
        message: message,
    });
}

export function isUserLiked(likeIds: string[]) {
    const userId = localStorageAuthService.getLoginUser()?._id;
    if (!userId) return false;
    return likeIds.includes(userId);
}
