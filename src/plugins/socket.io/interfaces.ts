import type { NotificationAction, NotificationModule } from './../../constants';
import type { IChat, IComment, IReview, IUser } from './../../interfaces';

export interface IUserNotificationPayload {
    _id: string;
    targetId: IReview | IComment;
    module: NotificationModule;
    action: NotificationAction;
    senderId: IUser;
    receiverId: IUser;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserChatPayload {
    _id: string;
    memberIds: string[];
    members: IUser[];
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMessagePayload {
    _id: string;
    senderId: string;
    senders: IUser[];
    receiverId: string;
    receivers: IUser[];
    chatId: string;
    chats: IChat[];
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
