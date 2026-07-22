import { AbsolutePathSchema } from "@repo/node-path";
import { z } from "zod";

export const ThrottleDeviceSchema = z.object({
  Path: z.string(),
  Rate: z.int64().nonnegative(),
});
export type ThrottleDevice = z.infer<typeof ThrottleDeviceSchema>;

export const ThrottleDeviceArraySchema = z.array(ThrottleDeviceSchema);
export type ThrottleDeviceArray = z.infer<typeof ThrottleDeviceArraySchema>;

export const DeviceMappingSchema = z.object({
  PathOnHost: z.string(),
  PathInContainer: z.string(),
  CgroupPermissions: z.string(),
});
export type DeviceMapping = z.infer<typeof DeviceMappingSchema>;

export const DeviceRequestSchema = z
  .object({
    Driver: z
      .string()
      .describe(
        "The name of the device driver to use for this request. Note that if this is specified the capabilities are ignored when selecting a device driver.",
      ),
    Count: z.int(),
    DeviceIDs: z.array(z.string()),
    Capabilities: z
      .array(z.string())
      .describe(
        "A list of capabilities; an OR list of AND lists of capabilities. Note that if a driver is specified the capabilities have no effect on selecting a driver as the driver name is used directly. Note that if no driver is specified the capabilities are used to select a driver with the required capabilities.",
      ),
    Options: z
      .record(z.string(), z.string())
      .describe(
        "Driver-specific options, specified as a key/value pairs. These options are passed directly to the driver.",
      ),
  })
  .partial();
export type DeviceRequest = z.infer<typeof DeviceRequestSchema>;

export const VolumeBindingSchema = z.templateLiteral([
  AbsolutePathSchema,
  ":",
  AbsolutePathSchema,
  z
    .templateLiteral([
      ":",
      z.string().superRefine((value, ctx) => {
        const options = value.split(",");
        if (options.length === 0) {
          ctx.addIssue({
            code: "invalid_format",
            format: "volume-binding-options",
            message: "options cannot be empty",
          });
          return;
        }
        if (options.length > 4) {
          ctx.addIssue({
            code: "invalid_format",
            format: "volume-binding-options",
            message: "there can only be 4 options at most",
          });
        }
      }),
    ])
    .optional(),
]);
export type VolumeBinding = z.infer<typeof VolumeBindingSchema>;

export const HostConfigSchema = z
  .object({
    CpuShares: z
      .int()
      .describe(
        "An integer value representing this container's relative CPU weight versus other containers.",
      ),
    Memory: z.int64().default(BigInt(0)).describe("Memory limit in bytes."),
    CgroupParent: z
      .string()
      .min(1)
      .describe(
        "Path to cgroups under which the container's cgroup is created. If the path is not absolute, the path is considered to be relative to the cgroups path of the init process. Cgroups are created if they do not already exist.",
      ),
    BlkioWeight: z
      .int()
      .min(0)
      .max(1000)
      .describe("Block IO weight (relative weight)."),
    BlkioWeightDevice: z.array(
      z
        .object({
          Path: z.string(),
          Weight: z.int().nonnegative(),
        })
        .describe(
          'Block IO weight (relative device weight) in the form: `[{"Path": "device_path", "Weight": weight}]`',
        ),
    ),
    BlkioDeviceReadBps: ThrottleDeviceArraySchema.describe(
      'Limit read rate (bytes per second) from a device, in the form: `[{"Path": "device_path", "Rate": rate}]`',
    ),
    BlkioDeviceWriteBps: ThrottleDeviceArraySchema.describe(
      'Limit write rate (bytes per second) from a device, in the form: `[{"Path": "device_path", "Rate": rate}]`',
    ),
    BlkioDeviceReadIOps: ThrottleDeviceArraySchema.describe(
      'Limit read rate (IO per second) from a device, in the form: `[{"Path": "device_path", "Rate": rate}]`',
    ),
    BlkioDeviceWriteIOps: ThrottleDeviceArraySchema.describe(
      'Limit write rate (IO per second) from a device, in the form: `[{"Path": "device_path", "Rate": rate}]`',
    ),
    CpuPeriod: z
      .int64()
      .describe("The length of a CPU period in microseconds."),
    CpuQuota: z
      .int64()
      .describe(
        "Microseconds of CPU time that the container can get in a CPU period.",
      ),
    CpuRealtimePeriod: z
      .int64()
      .describe(
        "The length of a CPU real-time period in microseconds. Set to 0 to allocate no time allocated to real-time tasks.",
      ),
    CpuRealtimeRuntime: z
      .int64()
      .describe(
        "The length of a CPU real-time runtime in microseconds. Set to 0 to allocate no time allocated to real-time tasks.",
      ),
    CpusetCpus: z
      .string()
      .describe("CPUs in which to allow execution (e.g., `0-3`, `0,1`)."),
    CpusetMems: z
      .string()
      .describe(
        "Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on NUMA systems.",
      ),
    Devices: z
      .array(DeviceMappingSchema)
      .describe("A list of devices to add to the container."),
    DeviceCgroupRules: z
      .array(z.string())
      .describe("a list of cgroup rules to apply to the container"),
    DeviceRequests: z
      .array(DeviceRequestSchema)
      .describe("A list of requests for devices to be sent to device drivers."),
    MemoryReservation: z.int64().describe("Memory soft limit in bytes."),
    MemorySwap: z
      .int64()
      .describe(
        "Total memory limit (memory + swap). Set as `-1` to enable unlimited swap.",
      ),
    MemorySwappiness: z
      .int64()
      .min(BigInt(0))
      .max(BigInt(100))
      .describe(
        "Tune a container's memory swappiness behavior. Accepts an integer between 0 and 100.",
      ),
    NanoCpus: z.int64().describe("CPU quota in units of 10-9 CPUs."),
    OomKillDisable: z
      .boolean()
      .describe("Disable OOM Killer for the container."),
    Init: z
      .union([z.boolean(), z.null()])
      .describe(
        "Run an init inside the container that forwards signals and reaps processes. This field is omitted if empty, and the default (as configured on the daemon) is used.",
      ),
    PidsLimit: z
      .union([z.int64(), z.null()])
      .describe(
        "Tune a container's PIDs limit. Set `0` or `-1` for unlimited, or `null` to not change.",
      ),
    Ulimits: z
      .array(
        z
          .object({
            Name: z.string().describe("Name of ulimit"),
            Soft: z.int().describe("Soft limit"),
            Hard: z.int().describe("Hard limit"),
          })
          .partial(),
      )
      .describe(
        'A list of resource limits to set in the container. For example: `{"Name": "nofile", "Soft": 1024, "Hard": 2048}`',
      ),
    CpuCount: z
      .int64()
      .describe(
        "The number of usable CPUs (Windows only). On Windows Server containers, the processor resource controls are mutually exclusive. The order of precedence is `CPUCount` first, then `CPUShares`, and `CPUPercent` last.",
      ),
    CpuPercent: z
      .int64()
      .describe(
        "The usable percentage of the available CPUs (Windows only). On Windows Server containers, the processor resource controls are mutually exclusive. The order of precedence is `CPUCount` first, then `CPUShares`, and `CPUPercent` last.",
      ),
    IOMaximumIOps: z
      .int64()
      .describe("Maximum IOps for the container system drive (Windows only)"),
    IOMaximumBandwidth: z
      .int64()
      .describe(
        "Maximum IO in bytes per second for the container system drive (Windows only).",
      ),
    Binds: z
      .array(z.string())
      .describe("A list of volume bindings for this container."),
  })
  .partial()
  .describe(
    "Container configuration that depends on the host we are running on",
  );
export type HostConfig = z.infer<typeof HostConfigSchema>;
