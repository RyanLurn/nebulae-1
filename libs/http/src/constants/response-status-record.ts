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
  HttpSuccessfulResponseStatusRecord[keyof HttpSuccessfulResponseStatusRecord]["code"];
export type HttpSuccessfulResponseStatusText =
  HttpSuccessfulResponseStatusRecord[keyof HttpSuccessfulResponseStatusRecord]["text"];

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
  HttpClientErrorResponseStatusRecord[keyof HttpClientErrorResponseStatusRecord]["code"];
export type HttpClientErrorResponseStatusText =
  HttpClientErrorResponseStatusRecord[keyof HttpClientErrorResponseStatusRecord]["text"];

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
  HttpServerErrorResponseStatusRecord[keyof HttpServerErrorResponseStatusRecord]["code"];
export type HttpServerErrorResponseStatusText =
  HttpServerErrorResponseStatusRecord[keyof HttpServerErrorResponseStatusRecord]["text"];

export const HTTP_ERROR_RESPONSE_STATUS_RECORD = {
  ...HTTP_CLIENT_ERROR_RESPONSE_STATUS_RECORD,
  ...HTTP_SERVER_ERROR_RESPONSE_STATUS_RECORD,
} as const;
export type HttpErrorResponseStatusRecord =
  typeof HTTP_ERROR_RESPONSE_STATUS_RECORD;
export type HttpErrorResponseStatusCode =
  HttpErrorResponseStatusRecord[keyof HttpErrorResponseStatusRecord]["code"];
export type HttpErrorResponseStatusText =
  HttpErrorResponseStatusRecord[keyof HttpErrorResponseStatusRecord]["text"];

export const HTTP_RESPONSE_STATUS_RECORD = {
  ...HTTP_SUCCESSFUL_RESPONSE_STATUS_RECORD,
  ...HTTP_ERROR_RESPONSE_STATUS_RECORD,
} as const;
export type HttpResponseStatusRecord = typeof HTTP_RESPONSE_STATUS_RECORD;
export type HttpResponseStatusCode =
  HttpResponseStatusRecord[keyof HttpResponseStatusRecord]["code"];
export type HttpResponseStatusText =
  HttpResponseStatusRecord[keyof HttpResponseStatusRecord]["text"];
