import { BaseError } from "@repo/error";

import type { HttpRequestMethod } from "@/constants/request-method-record";
import type { HttpErrorCodeRecord } from "@/error/code-record";

export abstract class HttpError<
  Key extends keyof HttpErrorCodeRecord,
> extends BaseError<HttpErrorCodeRecord[Key]["code"]> {
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract override readonly code: HttpErrorCodeRecord[Key]["code"];
  readonly url: string;
  readonly method: HttpRequestMethod;
  readonly statusCode: HttpErrorCodeRecord[Key]["statusCode"];
  readonly statusText: HttpErrorCodeRecord[Key]["statusText"];

  constructor({
    message,
    url,
    method,
    statusCode,
    statusText,
    cause,
  }: {
    message?: string;
    url: string;
    method: HttpRequestMethod;
    statusCode: HttpErrorCodeRecord[Key]["statusCode"];
    statusText: HttpErrorCodeRecord[Key]["statusText"];
    cause: unknown;
  }) {
    super({ message: message ?? statusText, cause });
    this.url = url;
    this.method = method;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}
