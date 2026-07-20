import { BaseError } from "@repo/error";

import type { DockerErrorResponseBody } from "@/schemas";

export class DockerServerError extends BaseError<
  "DOCKER_SERVER_ERROR",
  DockerErrorResponseBody
> {
  readonly name = "DockerServerError";
  readonly code = "DOCKER_SERVER_ERROR";
}
