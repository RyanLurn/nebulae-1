import { z } from "zod";

export const DockerErrorResponseBodySchema = z.object({
  message: z.string(),
});
export type DockerErrorResponseBody = z.infer<
  typeof DockerErrorResponseBodySchema
>;
