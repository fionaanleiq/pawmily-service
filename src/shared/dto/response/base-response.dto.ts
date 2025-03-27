export class BaseResponse<T> {
    status?: Number;
    message: string;
    count?: Number;
    query?: string[];
    data?: T | null;
}