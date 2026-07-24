import { z } from "zod";

const MountSharedSchema = z.object({
  Target: z.string().min(1).describe("Container path."),
  ReadOnly: z
    .boolean()
    .optional()
    .describe("Whether the mount should be read-only."),
  Consistency: z
    .enum(["default", "consistent", "cached", "delegated"])
    .optional()
    .describe(
      "The consistency requirement for the mount: `default`, `consistent`, `cached`, or `delegated`.",
    ),
});

const MountSourceSchema = z
  .string()
  .min(1)
  .describe("Mount source (e.g. a volume name, a host path).");

export const BindMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z
    .literal("bind")
    .describe("Mounts a file or directory from the host into the container."),
  Source: MountSourceSchema,
  BindOptions: z
    .object({
      Propagation: z
        .enum(["private", "rprivate", "shared", "rshared", "slave", "rslave"])
        .describe(
          "A propagation mode with the value `[r]private`, `[r]shared`, or `[r]slave`.",
        ),
      NonRecursive: z
        .boolean()
        .default(false)
        .describe("Disable recursive bind mount."),
      CreateMountpoint: z
        .boolean()
        .default(false)
        .describe("Create mount point on host if missing"),
      ReadOnlyNonRecursive: z
        .boolean()
        .describe(
          "Make the mount non-recursively read-only, but still leave the mount recursive (unless NonRecursive is set to `true` in conjunction). Added in v1.44, before that version all read-only mounts were non-recursive by default. To match the previous behaviour this will default to `true` for clients on versions prior to v1.44.",
        ),
      ReadOnlyForceRecursive: z
        .boolean()
        .default(false)
        .describe(
          "Raise an error if the mount cannot be made recursively read-only.",
        ),
    })
    .partial()
    .optional()
    .describe("Optional configuration for the `bind` type."),
});
export type BindMount = z.infer<typeof BindMountSchema>;

export const ClusterMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z.literal("cluster").describe("a Swarm cluster volume"),
  Source: MountSourceSchema,
});
export type ClusterMount = z.infer<typeof ClusterMountSchema>;

export const ImageMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z.literal("image").describe("Mounts an image."),
  Source: MountSourceSchema,
  ImageOptions: z
    .object({
      Subpath: z
        .string()
        .min(1)
        .describe(
          "Source path inside the image. Must be relative without any back traversals.",
        ),
    })
    .optional()
    .describe("Optional configuration for the `image` type."),
});
export type ImageMount = z.infer<typeof ImageMountSchema>;

export const NpipeMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z
    .literal("npipe")
    .describe("Mounts a named pipe from the host into the container."),
  Source: MountSourceSchema,
});
export type NpipeMount = z.infer<typeof NpipeMountSchema>;

export const TmpfsMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z.literal("tmpfs").describe("Create a tmpfs with the given options."),
  TmpfsOptions: z
    .object({
      SizeBytes: z.int64().describe("The size for the tmpfs mount in bytes."),
      Mode: z
        .int()
        .describe(
          "The permission mode for the tmpfs mount in an integer. The value must not be in octal format (e.g. 755) but rather the decimal representation of the octal value (e.g. 493).",
        ),
      Options: z
        .array(
          z.union([z.tuple([z.string()]), z.tuple([z.string(), z.string()])]),
        )
        .describe(
          "The options to be passed to the tmpfs mount. An array of arrays. Flag options should be provided as 1-length arrays. Other types should be provided as as 2-length arrays, where the first item is the key and the second the value.",
        ),
    })
    .partial()
    .optional()
    .describe("Optional configuration for the `tmpfs` type."),
});
export type TmpfsMount = z.infer<typeof TmpfsMountSchema>;

export const VolumeMountSchema = z.object({
  ...MountSharedSchema.shape,
  Type: z
    .literal("volume")
    .describe(
      "Creates a volume with the given name and options (or uses a pre-existing volume with the same name and options). These are not removed when the container is removed.",
    ),
  Source: MountSourceSchema,
  VolumeOptions: z
    .object({
      NoCopy: z
        .boolean()
        .default(false)
        .describe("Populate volume with data from the target."),
      Labels: z
        .record(z.string(), z.string())
        .describe("User-defined key/value metadata."),
      DriverConfig: z
        .object({
          Name: z
            .string()
            .min(1)
            .describe("Name of the driver to use to create the volume."),
          Options: z
            .record(z.string(), z.string())
            .describe("key/value map of driver specific options."),
        })
        .describe("Map of driver specific options"),
      Subpath: z
        .string()
        .min(1)
        .describe(
          "Source path inside the volume. Must be relative without any back traversals.",
        ),
    })
    .partial()
    .optional()
    .describe("Optional configuration for the `volume` type."),
});
export type VolumeMount = z.infer<typeof VolumeMountSchema>;

export const MountSchema = z.discriminatedUnion("Type", [
  BindMountSchema,
  ClusterMountSchema,
  ImageMountSchema,
  NpipeMountSchema,
  TmpfsMountSchema,
  VolumeMountSchema,
]);
export type Mount = z.infer<typeof MountSchema>;
