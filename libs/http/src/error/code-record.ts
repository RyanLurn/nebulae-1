import { HTTP_RESPONSE_STATUS_RECORD } from "@/constants/response-status-record";

export const HTTP_ERROR_CODE_RECORD = {
  BAD_REQUEST: {
    code: "HTTP_BAD_REQUEST_ERROR",
    statusCode: HTTP_RESPONSE_STATUS_RECORD.BAD_REQUEST.code,
    statusText: HTTP_RESPONSE_STATUS_RECORD.BAD_REQUEST.text,
  },
  INTERNAL_SERVER_ERROR: {
    code: "HTTP_INTERNAL_SERVER_ERROR",
    statusCode: HTTP_RESPONSE_STATUS_RECORD.BAD_REQUEST.code,
    statusText: HTTP_RESPONSE_STATUS_RECORD.BAD_REQUEST.text,
  },
} as const;

export type HttpErrorCodeRecord = typeof HTTP_ERROR_CODE_RECORD;

export type HttpErrorCode =
  HttpErrorCodeRecord[keyof HttpErrorCodeRecord]["code"];
