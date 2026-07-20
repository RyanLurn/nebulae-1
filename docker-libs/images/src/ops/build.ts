import type { Client } from "undici";

export async function buildDockerImage(
  dockerClient: Client,
  buildContextTar: Buffer,
) {
  const response = await dockerClient.request({
    path: "/build",
    method: "POST",
    query: {
      version: "2",
    },
    body: buildContextTar,
  });
  return response;
}
