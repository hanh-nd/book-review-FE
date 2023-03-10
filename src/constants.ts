export const PageName = {
    LOGIN_PAGE: 'LOGIN_PAGE',
    REGISTER_PAGE: 'REGISTER_PAGE',
    HOME_PAGE: 'HOME_PAGE',
    BOOK_DETAIL_PAGE: 'BOOK_DETAIL_PAGE',
    PROFILE_PAGE: 'PROFILE_PAGE',
    CREATE_BOOK_PAGE: 'CREATE_BOOK_PAGE',
    UPDATE_BOOK_PAGE: 'UPDATE_BOOK_PAGE',
    REVIEW_DETAIL_PAGE: 'REVIEW_DETAIL_PAGE',
    ADMIN_BOOK_LIST_PAGE: 'ADMIN_BOOK_LIST_PAGE',
    ADMIN_REPORT_LIST_PAGE: 'ADMIN_REPORT_LIST_PAGE',
    CHAT_LIST_PAGE: 'CHAT_LIST_PAGE',
    CHAT_DETAIL_PAGE: 'CHAT_DETAIL_PAGE',
};

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_LEVEL = 411,
    GROUP_MAX_QUANTITY = 412,
    AWS_ERROR = 413,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum ReportType {
    REVIEW = 'Review',
    COMMENT = 'Comment',
}

export enum NotificationModule {
    REVIEW = 'Review',
    COMMENT = 'Comment',
}

export enum NotificationAction {
    LIKE = 'Like',
    COMMENT = 'Comment',
}

export enum SocketEvent {
    USER_LIKE = 'USER_LIKE',
    USER_COMMENT = 'USER_COMMENT',

    USER_NOTIFICATION = 'USER_NOTIFICATION',

    USER_CHAT = 'USER_CHAT',
    USER_MESSAGE = 'USER_MESSAGE',
}
