import type { ApiErrorResponse } from './types';

export class ApiRequestError extends Error implements ApiErrorResponse {
  statusCode = 500;
  message = '';

  private constructor(public payload: Record<string, unknown>) {
    super();

    const message = payload['message'];
    const statusCode = payload['status'];

    this.statusCode = typeof statusCode === 'number' ? statusCode : 500;
    this.message = typeof message === 'string' ? message : 'Unknown Error';
  }

  public static create = (payload: unknown): ApiRequestError => {
    const apiRequestErrorPayload =
      typeof payload === 'object' && payload !== null ? payload : {};

    return new ApiRequestError(
      apiRequestErrorPayload as Record<string, unknown>,
    );
  };
}
