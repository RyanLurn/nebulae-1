import { BaseError } from "@repo/error";

import type { DockerErrorCause } from "@/types";

export class DockerBadParameterError extends BaseError<
  "DOCKER_BAD_PARAMETER_ERROR",
  DockerErrorCause<400>
> {
  readonly name = "DockerBadParameterError";
  readonly code = "DOCKER_BAD_PARAMETER_ERROR";
}

export class DockerServerError extends BaseError<
  "DOCKER_SERVER_ERROR",
  DockerErrorCause<500>
> {
  readonly name = "DockerServerError";
  readonly code = "DOCKER_SERVER_ERROR";
}
