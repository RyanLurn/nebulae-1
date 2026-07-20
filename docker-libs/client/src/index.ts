import { Client } from "undici";

import {
  DEFAULT_DOCKER_ENGINE_API_SOCKET_PATH,
  DEFAULT_DOCKER_ENGINE_API_URL,
  DEFAULT_DOCKER_ENGINE_API_VERSION,
} from "@/constant";

export function constructDockerClient(
  url:
    | string
    | URL = `${DEFAULT_DOCKER_ENGINE_API_URL}/${DEFAULT_DOCKER_ENGINE_API_VERSION}`,
  options: Client.Options = {
    socketPath: DEFAULT_DOCKER_ENGINE_API_SOCKET_PATH,
  },
) {
  const dockerClient = new Client(url, options);
  return dockerClient;
}

export {
  DEFAULT_DOCKER_ENGINE_API_SOCKET_PATH,
  DEFAULT_DOCKER_ENGINE_API_URL,
  DEFAULT_DOCKER_ENGINE_API_VERSION,
};
