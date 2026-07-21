import type { HttpErrorResponseStatusCode } from "@repo/http";

import type { DockerErrorResponseBody } from "@/schemas";

export interface DockerErrorCause<
  StatusCode extends HttpErrorResponseStatusCode,
> extends DockerErrorResponseBody {
  statusCode: StatusCode;
  statusText: string;
}
