export class BaseResponse<T> {
    status?: Number;
    message: string;
    query?: string[];
    data?: T | null;
}