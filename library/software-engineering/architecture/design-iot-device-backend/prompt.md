---
schema: 1
id: design-iot-device-backend
kind: prompt
title: Design an IoT device backend
description: Designs a backend for connected devices with provisioning, MQTT or HTTP ingestion, device shadow state, commands, firmware status and fleet-scale operations.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, embedded-engineer, architect]
requires: [none]
inputs: [spec, text]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iot, mqtt, device-provisioning, telemetry, device-shadow, fleet-management]
pairs_with:
  personas: [software-architect, embedded-engineer]
  prompts: [design-device-ota-updates, design-event-driven-system]
args:
  - name: devices
    description: What the devices are, how they connect (Wi-Fi, cellular, gateway, BLE via phone), power constraints, how often they report and what commands they accept.
    type: text
    required: true
  - name: scale
    description: Fleet size now and in two years, messages per device per hour and payload size.
    type: text
  - name: constraints
    description: Cloud provider or managed IoT services allowed, data retention, compliance, connectivity costs.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Architecture, Identity and provisioning, Telemetry ingestion, Device state and commands, Fleet operations, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A device backend is mostly about identity, unreliable connectivity and scale of many small messages. Each device needs its own credential (per-device certificate or key provisioned at the factory or on first boot), never a shared secret baked into firmware, because one extracted secret then compromises the fleet. MQTT suits always-connected devices with small payloads and server-to-device commands; HTTP is fine for devices that wake, report and sleep. Devices go offline for hours, so commands are expressed as desired state ("target temperature 21") stored server side and reconciled when the device reports, rather than fire-and-forget calls; this is the device shadow or twin pattern. Telemetry is time series: append-heavy, queried by device and time range, and usually downsampled for long retention. Device clocks drift, so store both device and server timestamps. Fleet-wide events such as a broker restart cause reconnect storms unless devices use jittered backoff. Cellular data costs money per byte, which shapes payload format and reporting intervals. Firmware updates are their own design and should be linked, not reinvented.
</context>

<task>
<devices>
{{devices}}
</devices>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. Estimate message rate and data volume per day and per month from the fleet size and reporting interval. Label assumptions.
2. Choose MQTT, HTTP or a mix per device class, and a managed IoT service or self-run broker, from connectivity, power and team capacity.
3. Design identity and provisioning: per-device credentials, how they are created and installed, claiming a device to a user or customer account, and revocation.
4. Design topics or endpoints with the device id derived from the authenticated identity, not the payload, and access rules so a device can only publish and subscribe to its own topics.
5. Design telemetry: payload format, batching when offline, server and device timestamps, time-series storage, downsampling and retention.
6. Design state and commands: reported and desired state, versioning to resolve conflicts, command expiry, acknowledgement and retry.
7. Design fleet operations: last-seen tracking and offline alerts, firmware version inventory, rate limits per device, jittered reconnect, and a kill switch for a misbehaving firmware version.
</task>

<constraints>
- Never use one shared credential across devices.
- Authorise by device identity on the server; never trust a device id inside the payload.
- Do not quote managed service limits or prices as facts; say what to check.
- Personal or location data from consumer devices needs a retention decision; flag it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Managed IoT platform, self-run broker or HTTP, in at most five lines.
## Architecture
A Mermaid diagram from device to storage, apps and back, then one line per component.
## Identity and provisioning
Per-device credentials, factory and first-boot flow, revocation.
## Telemetry ingestion
Protocol, topics or endpoints, QoS, batching, storage for time series.
## Device state and commands
Reported versus desired state, command delivery to offline devices, acknowledgements.
## Fleet operations
Monitoring, last-seen alerts, firmware version tracking, throttling and reconnect storms.
## Risks
Bullets.
</output_format>
