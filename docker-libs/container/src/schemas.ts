import { z } from "zod";

import type { ContainerName } from "@/types";

import { CONTAINER_NAME_REGEX } from "@/constants";

export const ContainerNameSchema = z
  .string()
  .regex(CONTAINER_NAME_REGEX)
  .transform((value) => value as ContainerName);
