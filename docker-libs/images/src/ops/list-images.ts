import { z } from "zod";

export const ListImagesEndpointQueryParamsSchema = z.object({
  all: z.boolean().default(false).optional(),
});
export type ListImagesEndpointQueryParams = z.infer<
  typeof ListImagesEndpointQueryParamsSchema
>;
