import { ElNotification } from 'element-plus';

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
