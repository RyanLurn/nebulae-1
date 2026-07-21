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
