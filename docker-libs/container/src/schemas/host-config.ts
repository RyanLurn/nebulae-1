import { AbsolutePathSchema } from "@repo/node-path";
import { z } from "zod";

import { MountSchema } from "@/schemas/mount";

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
      z.string(),
      z.templateLiteral([",", z.string()]).optional(),
      z.templateLiteral([",", z.string()]).optional(),
      z.templateLiteral([",", z.string()]).optional(),
    ])
    .optional(),
]);
export type VolumeBinding = z.infer<typeof VolumeBindingSchema>;

export const PortBindingSchema = z.array(
  z.object({
    HostIp: z
      .union([z.ipv4(), z.ipv6()])
      .describe("Host IP address that the container's port is mapped to."),
    HostPort: z
      .string()
      .min(1)
      .describe("Host port number that the container's port is mapped to."),
  }),
);
export type PortBinding = z.infer<typeof PortBindingSchema>;

export const PortMapSchema = z
  .record(
    z.templateLiteral([z.string(), "/", z.string()]),
    z.union([PortBindingSchema, z.null()]),
  )
  .describe(
    "PortMap describes the mapping of container ports to host ports, using the container's port-number and protocol as key in the format `<port>/<protocol>`, for example, `80/udp`. If a container's port is mapped for multiple protocols, separate entries are added to the mapping table.",
  );
export type PortMap = z.infer<typeof PortMapSchema>;

export const RestartPolicySchema = z
  .discriminatedUnion("Name", [
    z.object({
      Name: z.union([
        z.literal("").describe("Empty string means not to restart"),
        z.literal("no").describe("Do not automatically restart"),
        z.literal("always").describe("Always restart"),
        z
          .literal("unless-stopped")
          .describe(
            "Restart always except when the user has manually stopped the container",
          ),
      ]),
    }),
    z.object({
      Name: z
        .literal("on-failure")
        .describe("Restart only when the container exit code is non-zero"),
      MaximumRetryCount: z
        .int()
        .describe("The number of times to retry before giving up."),
    }),
  ])
  .default({ Name: "" })
  .describe(
    "The behavior to apply when the container exits. The default is not to restart. An ever increasing delay (double the previous delay, starting at 100ms) is added before each restart to prevent flooding the server.",
  );
export type RestartPolicy = z.infer<typeof RestartPolicySchema>;

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
      .array(VolumeBindingSchema)
      .describe("A list of volume bindings for this container."),
    ContainerIDFile: z
      .string()
      .min(1)
      .describe("Path to a file where the container ID is written"),
    LogConfig: z
      .object({
        Type: z
          .enum([
            "local",
            "json-file",
            "syslog",
            "journald",
            "gelf",
            "fluentd",
            "awslogs",
            "splunk",
            "etwlogs",
            "none",
          ])
          .describe(
            'Name of the logging driver used for the container or "none" if logging is disabled.',
          ),
        Config: z
          .record(z.string(), z.string())
          .describe(
            "Driver-specific configuration options for the logging driver.",
          ),
      })
      .describe("The logging configuration for this container"),
    NetworkMode: z
      .string()
      .min(1)
      .describe(
        "Network mode to use for this container. Supported standard values are: `bridge`, `host`, `none`, and `container:<name|id>`. Any other value is taken as a custom network's name to which this container should connect to.",
      ),
    PortBindings: PortMapSchema,
    RestartPolicy: RestartPolicySchema,
    AutoRemove: z
      .boolean()
      .describe(
        "Automatically remove the container when the container's process exits. This has no effect if `RestartPolicy` is set.",
      ),
    VolumeDriver: z
      .string()
      .min(1)
      .describe("Driver that this container uses to mount volumes."),
    VolumesFrom: z
      .array(
        z.templateLiteral([
          z.string(),
          z.templateLiteral([":", z.enum(["ro", "rw"])]).optional(),
        ]),
      )
      .describe(
        "A list of volumes to inherit from another container, specified in the form `<container name>[:<ro|rw>]`.",
      ),
    Mounts: z
      .array(MountSchema)
      .describe("Specification for mounts to be added to the container."),
    ConsoleSize: z
      .union([
        z.tuple([z.int().nonnegative(), z.int().nonnegative()]),
        z.null(),
      ])
      .describe("Initial console size, as an [height, width] array."),
    Annotations: z
      .record(z.string(), z.string())
      .describe(
        "Arbitrary non-identifying metadata attached to container and provided to the runtime when the container is started.",
      ),
    CapAdd: z
      .array(z.string().min(1))
      .describe(
        "A list of kernel capabilities to add to the container. Conflicts with option 'Capabilities'.",
      ),
    CapDrop: z
      .array(z.string().min(1))
      .describe(
        "A list of kernel capabilities to drop from the container. Conflicts with option 'Capabilities'.",
      ),
    CgroupnsMode: z
      .union([
        z
          .literal("private")
          .describe("the container runs in its own private cgroup namespace"),
        z.literal("host").describe("use the host system's cgroup namespace"),
      ])
      .describe(
        'cgroup namespace mode for the container. If not specified, the daemon default is used, which can either be `"private"` or `"host"`, depending on daemon version, kernel support and configuration.',
      ),
    Dns: z
      .array(z.union([z.ipv4(), z.ipv6()]))
      .describe("A list of DNS servers for the container to use."),
    DnsOptions: z.array(z.string().min(1)).describe("A list of DNS options."),
    DnsSearch: z
      .array(z.string().min(1))
      .describe("A list of DNS search domains."),
    ExtraHosts: z
      .array(
        z.templateLiteral([z.hostname(), ":", z.union([z.ipv4(), z.ipv6()])]),
      )
      .describe(
        'A list of hostnames/IP mappings to add to the container\'s `/etc/hosts` file. Specified in the form `["hostname:IP"]`.',
      ),
    GroupAdd: z
      .array(z.string().min(1))
      .describe(
        "A list of additional groups that the container process will run as.",
      ),
    IpcMode: z
      .union([
        z
          .literal("none")
          .describe("own private IPC namespace, with /dev/shm not mounted"),
        z.literal("private").describe("own private IPC namespace"),
        z
          .literal("shareable")
          .describe(
            "own private IPC namespace, with a possibility to share it with other containers",
          ),
        z
          .templateLiteral([z.string().min(1), ":", z.string().min(1)])
          .describe("join another (shareable) container's IPC namespace"),
        z.literal("host").describe("use the host system's IPC namespace"),
      ])
      .describe(
        'IPC sharing mode for the container. If not specified, daemon default is used, which can either be `"private"` or `"shareable"`, depending on daemon version and configuration.',
      ),
    Cgroup: z.string().min(1).describe("Cgroup to use for the container."),
    Links: z
      .array(z.templateLiteral([z.string().min(1), ":", z.string().min(1)]))
      .describe(
        "A list of links for the container in the form `container_name:alias`.",
      ),
  })
  .partial()
  .describe(
    "Container configuration that depends on the host we are running on",
  );
export type HostConfig = z.infer<typeof HostConfigSchema>;
