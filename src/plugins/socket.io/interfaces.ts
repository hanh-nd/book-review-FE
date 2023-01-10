import type { NotificationAction, NotificationModule } from './../../constants';
import type { IComment, IReview, IUser } from './../../interfaces';

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
