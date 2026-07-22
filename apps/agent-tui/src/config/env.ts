import { NodeEnvSchema } from "@repo/node-env";
import { z } from "zod";

const EnvSchema = z.object({
  ...NodeEnvSchema.shape,
});

export const env = EnvSchema.parse(process.env);
