import type { IUserState } from './plugins/vuex/modules/users';
import type { IReviewState } from './plugins/vuex/modules/reviews';
import type { IBookState } from './plugins/vuex/modules/books';
import type { IAuthState } from './plugins/vuex/modules/auth';
import type { AxiosResponse } from 'axios';
import type { HttpStatus } from './constants';

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
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IComment {
    _id: string;
    content: string;
    author: IUser;
    review: IReview;
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

export interface IUpdateUserBody {
    password: string;
}

export interface IAddToBookShelfBody {
    bookId: string;
}
