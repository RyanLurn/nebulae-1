import { isAbsolute } from "node:path";
import { z } from "zod";

import type { AbsolutePath } from "@/types";

export const AbsolutePathSchema = z
  .string("An absolute path must be a string.")
  .min(1, "An absolute path cannot be empty.")
  .refine(
    (value) => isAbsolute(value),
    "Expected an absolute path, received a relative one.",
  );

export const AbsolutePathBrandedSchema = AbsolutePathSchema.transform(
  (value) => value as AbsolutePath,
);
