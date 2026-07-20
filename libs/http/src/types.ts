import type { HTTP_REQUEST_METHODS } from "@/constants/request-methods";
import type { HTTP_RESPONSE_STATUSES } from "@/constants/response-statuses";

export type HttpRequestMethods = typeof HTTP_REQUEST_METHODS;
export type HttpRequestMethod = keyof HttpRequestMethods;

export type HttpResponseStatuses = typeof HTTP_RESPONSE_STATUSES;
export type HttpResponseStatusCode =
  HttpResponseStatuses[keyof HttpResponseStatuses]["code"];
export type HttpResponseStatusText =
  HttpResponseStatuses[keyof HttpResponseStatuses]["text"];
