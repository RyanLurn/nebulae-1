import { z } from "zod";

import type { ContainerName } from "@/types";

import { CONTAINER_NAME_FORMAT, CONTAINER_NAME_REGEX } from "@/constants";

export const ContainerNameSchema = z
  .stringFormat(CONTAINER_NAME_FORMAT, CONTAINER_NAME_REGEX)
  .transform((value) => value as ContainerName);
