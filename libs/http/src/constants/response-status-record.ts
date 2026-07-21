import type { ValueOf } from "@repo/types";

export const HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD = {
  OK: {
    code: 200,
    text: "OK",
  },
  CREATED: {
    code: 201,
    text: "Created",
  },
  NO_CONTENT: {
    code: 204,
    text: "No Content",
  },
} as const;
export type HttpSuccessfulResponseStatusRecord =
  typeof HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD;
export type HttpSuccessfulResponseStatusCode =
  ValueOf<HttpSuccessfulResponseStatusRecord>["code"];
export type HttpSuccessfulResponseStatusText =
  ValueOf<HttpSuccessfulResponseStatusRecord>["text"];

export const HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD = {
  BAD_REQUEST: {
    code: 400,
    text: "Bad Request",
  },
  UNAUTHORIZED: {
    code: 401,
    text: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    text: "Forbidden",
  },
  NOT_FOUND: {
    code: 404,
    text: "Not Found",
  },
  CONFLICT: {
    code: 409,
    text: "Conflict",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    text: "Too Many Requests",
  },
} as const;
export type HttpClientErrorResponseStatusRecord =
  typeof HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD;
export type HttpClientErrorResponseStatusCode =
  ValueOf<HttpClientErrorResponseStatusRecord>["code"];
export type HttpClientErrorResponseStatusText =
  ValueOf<HttpClientErrorResponseStatusRecord>["text"];

export const HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD = {
  INTERNAL_SERVER_ERROR: {
    code: 500,
    text: "Internal Server Error",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    text: "Service Unavailable",
  },
} as const;
export type HttpServerErrorResponseStatusRecord =
  typeof HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD;
export type HttpServerErrorResponseStatusCode =
  ValueOf<HttpServerErrorResponseStatusRecord>["code"];
export type HttpServerErrorResponseStatusText =
  ValueOf<HttpServerErrorResponseStatusRecord>["text"];

export const HTTP_ERROR_RESPONSE_STATUS_RECORD = {
  ...HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD,
  ...HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD,
} as const;
export type HttpErrorResponseStatusRecord =
  typeof HTTP_ERROR_RESPONSE_STATUS_RECORD;
export type HttpErrorResponseStatusCode =
  ValueOf<HttpErrorResponseStatusRecord>["code"];
export type HttpErrorResponseStatusText =
  ValueOf<HttpErrorResponseStatusRecord>["text"];

export const HTTP_RESPONSE_STATUS_RECORD = {
  ...HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD,
  ...HTTP_ERROR_RESPONSE_STATUS_RECORD,
} as const;
export type HttpResponseStatusRecord = typeof HTTP_RESPONSE_STATUS_RECORD;
export type HttpResponseStatusCode = ValueOf<HttpResponseStatusRecord>["code"];
export type HttpResponseStatusText = ValueOf<HttpResponseStatusRecord>["text"];
