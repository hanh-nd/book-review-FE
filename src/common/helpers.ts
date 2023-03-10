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
    title?: string,
    onClick?: () => void
): void {
    ElNotification({
        type: 'success',
        title: title || 'Thành công',
        message: message,
        onClick: onClick,
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

export function showRequireLoginFunction(): boolean {
    const userId = localStorageAuthService.getLoginUser()?._id;
    if (userId) return true;

    showErrorNotificationFunction(
        'Bạn phải đăng nhập để thực hiện chức năng này'
    );
    return false;
}

export function isUserLiked(likeIds: string[]) {
    const userId = localStorageAuthService.getLoginUser()?._id;
    if (!userId) return false;
    return likeIds.includes(userId);
}

export function isAuthor(authorId: string) {
    const userId = localStorageAuthService.getLoginUser()?._id;
    if (!userId) return false;
    return authorId === userId;
}
