import type {
    IBodyResponse,
    IBook,
    ICommonGetListResponse,
    ICreateBookBody,
    IGetListQuery,
    IUpdateBookBody,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class BookService extends ApiService {
    createBook(body: ICreateBookBody): Promise<IBodyResponse<IBook>> {
        return this.client.post(`${this.baseUrl}/books`, body);
    }

    getBookList(
        params: IGetListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IBook>>> {
        return this.client.get(`${this.baseUrl}/books`, {
            params,
        });
    }

    getBookDetail(bookId: string): Promise<IBodyResponse<IBook>> {
        return this.client.get(`${this.baseUrl}/books/${bookId}`);
    }

    updateBook(
        bookId: string,
        body: IUpdateBookBody
    ): Promise<IBodyResponse<IBook>> {
        return this.client.patch(`${this.baseUrl}/books/${bookId}`, body);
    }

    deleteBook(bookId: string): Promise<IBodyResponse<any>> {
        return this.client.delete(`${this.baseUrl}/books/${bookId}`);
    }
}

export const bookService = new BookService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
