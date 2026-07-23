import type { Result } from "@repo/result";
import type Docker from "dockerode";

import { UnexpectedError } from "@repo/error";
import { err, ok } from "@repo/result";

export interface SandboxDockerContainerHostConfig {
  capAdd?: string[];
  networkMode?: string;
  memory?: number;
  memorySwap?: number;
  nanoCpus?: number;
  pidsLimit?: number;
  ulimits?: Docker.Ulimit[];
  tmpfs?: Record<string, string>;
}

export async function sandboxDockerContainerCreate({
  dockerClient,
  containerName,
  containerImage,
  containerEnv,
  containerLabels,
  containerHostConfig,
}: {
  dockerClient: Docker;
  containerName: string;
  containerImage: string;
  containerEnv?: `${string}=${string}`[];
  containerLabels?: Record<string, string>;
  containerHostConfig?: SandboxDockerContainerHostConfig;
}): Promise<Result<Docker.Container, UnexpectedError>> {
  try {
    const sandboxContainer = await dockerClient.createContainer({
      AttachStdout: false,
      AttachStderr: false,
      name: containerName,
      Image: containerImage,
      Env: containerEnv,
      Labels: containerLabels,
      HostConfig: {
        Privileged: false,
        CapDrop: ["ALL"],
        SecurityOpt: ["no-new-privileges"],
        ReadonlyRootfs: true,
        AutoRemove: true,
        CapAdd: containerHostConfig?.capAdd,
        NetworkMode: containerHostConfig?.networkMode ?? "none",
        Memory: containerHostConfig?.memory ?? 512 * 1024 * 1024,
        MemorySwap: containerHostConfig?.memorySwap ?? 512 * 1024 * 1024,
        NanoCpus: containerHostConfig?.nanoCpus ?? 1_000_000_000,
        PidsLimit: containerHostConfig?.pidsLimit ?? 128,
        Ulimits: containerHostConfig?.ulimits,
        Mounts: [
          {
            Type: "bind",
            Source: "/host/path/to/workspace",
            Target: "/workspace",
            ReadOnly: false,
          },
          {
            Type: "tmpfs",
            Target: "/tmp",
            Source: "/tmp",
            TmpfsOptions: { SizeBytes: 64 * 1024 * 1024, Mode: 493 },
          },
        ],
        Tmpfs: containerHostConfig?.tmpfs,
      },
    });
    return ok(sandboxContainer);
  } catch (error) {
    return err(
      new UnexpectedError({
        action: `create a sandbox Docker container named ${containerName}`,
        cause: error,
      }),
    );
  }
}
