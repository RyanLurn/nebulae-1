import type { HttpResponseStatusRecord } from "@repo/http";

import { BaseError } from "@repo/error";

import type { DockerErrorResponseBody } from "@/schemas";

export interface DockerBadParameterErrorCause extends DockerErrorResponseBody {
  statusCode: HttpResponseStatusRecord["BAD_REQUEST"]["code"];
  statusText: string;
}

export class DockerBadParameterError extends BaseError<
  "DOCKER_BAD_PARAMETER_ERROR",
  DockerBadParameterErrorCause
> {
  readonly name = "DockerBadParameterError";
  readonly code = "DOCKER_BAD_PARAMETER_ERROR";
}

export interface DockerServerErrorCause extends DockerErrorResponseBody {
  statusCode: HttpResponseStatusRecord["INTERNAL_SERVER_ERROR"]["code"];
  statusText: string;
}

export class DockerServerError extends BaseError<
  "DOCKER_SERVER_ERROR",
  DockerServerErrorCause
> {
  readonly name = "DockerServerError";
  readonly code = "DOCKER_SERVER_ERROR";
}
