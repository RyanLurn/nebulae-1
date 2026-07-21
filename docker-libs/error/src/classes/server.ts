import type { HttpResponseStatusRecord } from "@repo/http";

import { BaseError } from "@repo/error";
import { HTTP_RESPONSE_STATUS_RECORD } from "@repo/http";

import type { DockerErrorResponseBody } from "@/schemas";

export interface DockerServerErrorCause extends DockerErrorResponseBody {
  statusCode: HttpResponseStatusRecord["INTERNAL_SERVER_ERROR"]["code"];
  statusText: "server error";
}

export class DockerServerError extends BaseError<
  "DOCKER_SERVER_ERROR",
  DockerServerErrorCause
> {
  readonly name = "DockerServerError";
  readonly code = "DOCKER_SERVER_ERROR";

  constructor({
    message,
    responseBody,
  }: {
    message: string;
    responseBody: DockerErrorResponseBody;
  }) {
    super({
      message,
      cause: {
        message: responseBody.message,
        statusCode: HTTP_RESPONSE_STATUS_RECORD.INTERNAL_SERVER_ERROR.code,
        statusText: "server error",
      },
    });
  }
}
