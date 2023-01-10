import type {
    IBodyResponse,
    ICommonGetListResponse,
    ICreateReviewBody,
    IGetReviewListQuery,
    IReportReviewBody,
    IReview,
    IUpdateReviewBody,
} from '@/interfaces';
import axiosInstance from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';

class ReviewService extends ApiService {
    createReview(body: ICreateReviewBody): Promise<IBodyResponse<IReview>> {
        return this.client.post(`${this.baseUrl}/reviews`, body);
    }

    getReviewList(
        params: IGetReviewListQuery
    ): Promise<IBodyResponse<ICommonGetListResponse<IReview>>> {
        return this.client.get(`${this.baseUrl}/reviews`, {
            params,
        });
    }

    getReviewDetail(reviewId: string): Promise<IBodyResponse<IReview>> {
        return this.client.get(`${this.baseUrl}/reviews/${reviewId}`);
    }

    reactToReview(reviewId: string): Promise<IBodyResponse<IReview>> {
        return this.client.patch(`${this.baseUrl}/reviews/${reviewId}/react`);
    }

    updateReview(
        reviewId: string,
        body: IUpdateReviewBody
    ): Promise<IBodyResponse<IReview>> {
        return this.client.patch(`${this.baseUrl}/reviews/${reviewId}`, body);
    }

    deleteReview(reviewId: string): Promise<IBodyResponse<any>> {
        return this.client.delete(`${this.baseUrl}/reviews/${reviewId}`);
    }

    reportReview(
        reviewId: string,
        body: IReportReviewBody
    ): Promise<IBodyResponse<any>> {
        return this.client.post(
            `${this.baseUrl}/reviews/${reviewId}/report`,
            body
        );
    }
}

export const reviewService = new ReviewService(
    {
        baseUrl: import.meta.env.VITE_BASE_URL,
    },
    axiosInstance
);
