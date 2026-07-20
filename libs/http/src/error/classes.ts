import { BaseError } from "@repo/error";

import type { HttpRequestMethod } from "@/constants/request-method-record";
import type { HttpErrorCodeRecord } from "@/error/record";

import { HTTP_ERROR_RECORD } from "@/error/record";

export abstract class HttpError<
  Key extends keyof HttpErrorCodeRecord,
> extends BaseError<HttpErrorCodeRecord[Key]["code"]> {
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract override readonly code: HttpErrorCodeRecord[Key]["code"];
  abstract readonly statusCode: HttpErrorCodeRecord[Key]["statusCode"];
  abstract readonly statusText: HttpErrorCodeRecord[Key]["statusText"];
  readonly url: string;
  readonly method: HttpRequestMethod;

  constructor({
    message,
    url,
    method,
    cause,
  }: {
    message: string;
    url: string;
    method: HttpRequestMethod;
    cause: unknown;
  }) {
    super({ message, cause });
    this.url = url;
    this.method = method;
  }
}

export class HttpBadRequestError extends HttpError<"BAD_REQUEST"> {
  readonly name = "HttpBadRequestError";
  readonly code = HTTP_ERROR_RECORD.BAD_REQUEST.code;
  readonly statusCode = HTTP_ERROR_RECORD.BAD_REQUEST.statusCode;
  readonly statusText = HTTP_ERROR_RECORD.BAD_REQUEST.statusText;
}

export class HttpInternalServerError extends HttpError<"INTERNAL_SERVER_ERROR"> {
  readonly name = "HttpInternalServerError";
  readonly code = HTTP_ERROR_RECORD.INTERNAL_SERVER_ERROR.code;
  readonly statusCode = HTTP_ERROR_RECORD.INTERNAL_SERVER_ERROR.statusCode;
  readonly statusText = HTTP_ERROR_RECORD.INTERNAL_SERVER_ERROR.statusText;
}
