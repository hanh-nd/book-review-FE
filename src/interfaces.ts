import type { AxiosResponse } from 'axios';
import type { HttpStatus } from './constants';
import type { IAuthState } from './plugins/vuex/modules/auth';
import type { IBookState } from './plugins/vuex/modules/books';
import type { ICommentState } from './plugins/vuex/modules/comments';
import type { IDialogState } from './plugins/vuex/modules/dialogs';
import type { IReviewState } from './plugins/vuex/modules/reviews';
import type { IUserState } from './plugins/vuex/modules/users';

export interface IBodyResponse<T> extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: HttpStatus;
    message: string;
    data: T;
    error?: { key: string; message: string; errorCode: HttpStatus };
}

export interface ICommonGetListResponse<T> {
    items: T[];
    totalItems: number;
}

export interface IGetListQuery {
    page?: number;
    limit?: number;
    keyword?: string;
}

export interface IStore {
    auth: IAuthState;
    books: IBookState;
    reviews: IReviewState;
    users: IUserState;
    dialogs: IDialogState;
    comments: ICommentState;
}

export interface IBook {
    _id: string;
    name: string;
    imageUrl: string;
    describe?: string;
    author?: string;
    publisher?: string;
    publicationYear?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IUser {
    _id: string;
    username: string;
    bookShelf: IBook[];
    bookShelfIds: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IReview {
    _id: string;
    content: string;
    author: IUser[];
    book: IBook[];
    likes: IUser[];
    likeIds: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IComment {
    _id: string;
    content: string;
    author: IUser[];
    authorId: string;
    review: IReview[];
    reviewId: string;
    likeIds: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IAuthBody {
    username: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IGetReviewListQuery extends IGetListQuery {
    bookId?: string;
}

export interface ICreateBookBody {
    name: string;
    imageUrl?: string;
    describe?: string;
    author?: string;
    publisher?: string;
    publicationYear?: number;
}

export interface IUpdateBookBody {
    name?: string;
    imageUrl?: string;
    describe?: string;
    author?: string;
    publisher?: string;
    publicationYear?: number;
}

export interface ICreateReviewBody {
    bookId: string;
    content: string;
}

export interface IUpdateReviewBody {
    content: string;
}

export interface IReportReviewBody {
    description: string;
}


export interface IUpdateUserBody {
    password: string;
}

export interface IAddToBookShelfBody {
    bookId: string;
}

export interface IGetCommentListQuery extends IGetListQuery {
    reviewId?: string;
}

export interface ICreateCommentBody {
    content: string;
    reviewId: string;
}

export interface IUpdateCommentBody {
    content: string;
}

export interface ICommentListTree extends IComment {
    children: ICommentListTree[];
}
