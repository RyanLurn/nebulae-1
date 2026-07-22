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
    "shared-size": z.boolean().default(false),
    digests: z.boolean().default(false),
    manifests: z.boolean().default(false),
    identity: z.boolean().default(false),
  })
  .partial()
  .refine((value) => {
    if (value.identity === true && value.manifests !== true) {
      return false;
    }
    return true;
  });
export type ListImagesEndpointQueryParams = z.infer<
  typeof ListImagesEndpointQueryParamsSchema
>;

export const OCIPlatformSchema = z.object({
  architecture: z.string().min(1),
  os: z.string().min(1),
  "os.version": z.string().min(1).optional(),
  "os.features": z.array(z.string().min(1)).optional(),
  variant: z.string().min(1).optional(),
});
export type OCIPlatform = z.infer<typeof OCIPlatformSchema>;

export const OCIDescriptorSchema = z.object({
  mediaType: z.string().min(1),
  digest: z.string().min(1),
  size: z.int().positive(),
  urls: z.union([z.array(z.url()), z.null()]),
  annotations: z.union([z.record(z.string(), z.string()), z.null()]),
  data: z.union([z.base64(), z.null()]),
});
export type OCIDescriptor = z.infer<typeof OCIDescriptorSchema>;

export const ImageManifestSummarySchema = z.object({
  ID: z.string().min(1),
});
export type ImageManifestSummary = z.infer<typeof ImageManifestSummarySchema>;

export const ListImagesEndpointResponseBodySchema = z.object({
  Id: z.string().min(1),
  ParentId: z.string(),
  RepoTags: z.array(z.string()),
  RepoDigests: z.array(z.string()),
  Created: z.int().positive(),
  Size: z.int().positive(),
  SharedSize: z.union([z.int().nonnegative(), z.literal(-1)]),
  Labels: z.record(z.string(), z.string()),
  Containers: z.union([z.int().nonnegative(), z.literal(-1)]),
});
export type ListImagesEndpointResponseBody = z.infer<
  typeof ListImagesEndpointResponseBodySchema
>;
