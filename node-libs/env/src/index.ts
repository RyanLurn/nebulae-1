import { z } from "zod";

export const NodeEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "staging", "production"]),
});
