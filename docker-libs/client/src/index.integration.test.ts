import { expect, onTestFinished, test } from "vitest";

import { constructDockerClient } from "@/index";

test("constructDockerClient should create a client that can reach the Docker Engine API via /_ping", async () => {
  const dockerClient = constructDockerClient();

  onTestFinished(async () => {
    await dockerClient.close();
  });

  const response = await dockerClient.request({
    path: "/_ping",
    method: "GET",
  });

  expect(response.statusCode).toBe(200);

  const body = await response.body.text();
  expect(body).toBe("OK");
});
