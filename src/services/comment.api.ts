import type {
    IBodyResponse, IComment,
    ICommentListTree, ICommonGetListResponse,
    ICreateCommentBody,
    IGetCommentListQuery, IReportCommentBody, IUpdateCommentBody
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class CommentService extends ApiService {
    createComment(body: ICreateCommentBody): Promise<IBodyResponse<IComment>> {
        return this.client.post(`${this.baseUrl}/comments`, body);
    }

    getCommentList(
        params: IGetCommentListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<ICommentListTree>>> {
        return this.client.get(`${this.baseUrl}/comments`, {
            params,
        });
    }

    reactToComment(commentId: string): Promise<IBodyResponse<IComment>> {
        return this.client.patch(`${this.baseUrl}/comments/${commentId}/react`);
    }

    updateComment(
        commentId: string,
        body: IUpdateCommentBody
    ): Promise<IBodyResponse<IComment>> {
        return this.client.patch(`${this.baseUrl}/comments/${commentId}`, body);
    }

    deleteComment(commentId: string): Promise<IBodyResponse<any>> {
        return this.client.delete(`${this.baseUrl}/comments/${commentId}`);
    }


    reportComment(
        commentId: string,
        body: IReportCommentBody,
    ): Promise<IBodyResponse<any>> {
        return this.client.post(
            `${this.baseUrl}/comments/${commentId}/report`,
            body
        );
    }
}

export const commentService = new CommentService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
