import { SocketEvent, type NotificationModule } from '@/constants';
import { io, type Socket } from 'socket.io-client';
import type { IUserNotificationPayload } from './interfaces';

export class SocketIO {
    static socket: Socket;

    static connect(accessToken: string) {
        SocketIO.socket = io(import.meta.env.VITE_BASE_URL, {
            reconnectionDelayMax: 10000,
            extraHeaders: {
                token: accessToken,
            },
        });
    }

    static onUserNotification(
        callback: (payload: IUserNotificationPayload) => void
    ) {
        SocketIO.socket.on(SocketEvent.USER_NOTIFICATION, (payload) => {
            callback(payload);
        });
    }

    static emitUserLike(
        authorId: string,
        targetId: string,
        module: NotificationModule
    ) {
        SocketIO.socket.emit(SocketEvent.USER_LIKE, {
            authorId,
            targetId,
            module,
        });
    }

    static emitUserComment(
        authorId: string,
        targetId: string,
        module: NotificationModule
    ) {
        SocketIO.socket.emit(SocketEvent.USER_COMMENT, {
            authorId,
            targetId,
            module,
        });
    }
}
