import type { JsonValue } from "@repo/json";

import { BaseError } from "@repo/error";

import type { HttpErrorRecord } from "@/error/record";

import { HTTP_ERROR_RECORD } from "@/error/record";

export abstract class HttpError<
  Key extends keyof HttpErrorRecord,
> extends BaseError<HttpErrorRecord[Key]["code"], JsonValue> {
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  abstract override readonly code: HttpErrorRecord[Key]["code"];
  abstract readonly statusCode: HttpErrorRecord[Key]["statusCode"];
  abstract readonly statusText: HttpErrorRecord[Key]["statusText"];

  constructor({
    message,
    parsedResponseBody,
  }: {
    message: string;
    parsedResponseBody: JsonValue;
  }) {
    super({ message, cause: parsedResponseBody });
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
