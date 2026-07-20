import type { Client } from "undici";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

export async function buildDockerImage(
  dockerClient: Client,
  buildContextTar: Buffer,
) {
  try {
    const { statusCode, statusText } = await dockerClient.request({
      path: "/build",
      method: "POST",
      query: {
        version: "2",
      },
      body: buildContextTar,
    });

    if (statusCode === 200) {
      return ok(null);
    }

    return err(
      new UnexpectedError({
        action: "build Docker image",
        cause: statusText,
      }),
    );
  } catch (error) {
    return err(
      new UnexpectedError({
        action: "build Docker image",
        cause: error,
      }),
    );
  }
}
