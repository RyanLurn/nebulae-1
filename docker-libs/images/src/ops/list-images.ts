import { z } from "zod";

export const ListImagesEndpointFiltersQueryParamSchema = z
  .object({
    before: z.array(z.string()),
    dangling: z.array(z.union([z.literal("true"), z.literal("false")])),
    label: z.array(z.string()),
    reference: z.array(z.string()),
    since: z.array(z.string()),
  })
  .partial();
export type ListImagesEndpointFiltersQueryParam = z.infer<
  typeof ListImagesEndpointFiltersQueryParamSchema
>;

export const ListImagesEndpointQueryParamsSchema = z
  .object({
    all: z.boolean().default(false),
    filters: ListImagesEndpointFiltersQueryParamSchema,
  })
  .partial();
export type ListImagesEndpointQueryParams = z.infer<
  typeof ListImagesEndpointQueryParamsSchema
>;
