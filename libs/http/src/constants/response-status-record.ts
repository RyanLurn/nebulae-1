export const HTTP_RESPONSE_STATUS_RECORD = {
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
  INTERNAL_SERVER_ERROR: {
    code: 500,
    text: "Internal Server Error",
  },
} as const;

export type HttpResponseStatusRecord = typeof HTTP_RESPONSE_STATUS_RECORD;

export type HttpResponseStatusCode =
  HttpResponseStatusRecord[keyof HttpResponseStatusRecord]["code"];

export type HttpResponseStatusText =
  HttpResponseStatusRecord[keyof HttpResponseStatusRecord]["text"];
