import { HTTP_RESPONSE_STATUS_RECORD } from "@/constants/response-status-record";

export const HTTP_ERROR_CODE_RECORD = {
  BAD_REQUEST_ERROR: {
    code: "BAD_REQUEST_ERROR",
    status: HTTP_RESPONSE_STATUS_RECORD.BAD_REQUEST,
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    status: HTTP_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR,
  },
} as const;

export type HttpErrorCodeRecord = typeof HTTP_ERROR_CODE_RECORD;

export type HttpErrorCode =
  HttpErrorCodeRecord[keyof HttpErrorCodeRecord]["code"];
