---
schema: 1
id: design-device-ota-updates
kind: prompt
title: Design over-the-air device updates
description: Designs over-the-air updates for a device fleet with A/B or swap partitions, signed images, staged cohort rollout, rollback on failed health checks, power and bandwidth limits and status tracking.
category: devops
version: 1.0.0
status: incubating
stage: [design, ship]
role: [embedded-engineer, devops-engineer, architect]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ota-updates, iot-fleet, ab-partitions, secure-boot, staged-rollout, rollback]
pairs_with:
  prompts: [build-firmware-ci-pipeline, design-deployment-strategy, plan-disaster-recovery]
args:
  - name: device_description
    description: The device - MCU or SoC, flash and RAM, storage layout, bootloader, OS (bare metal, RTOS, embedded Linux), connectivity (Wi-Fi, cellular, LoRa, BLE via phone), power source, where devices are installed and who can reach them physically, and what happens to users if a device bricks.
    type: text
    required: true
  - name: fleet_size
    description: Number of devices now and expected, and how they are grouped (customers, regions, hardware revisions).
    type: string
output_contract:
  format: markdown
  sections: [Constraints, Update mechanism, Image security, Rollout plan, Rollback and recovery, Device-side rules, Fleet status, Test plan, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the update path for devices that are hard or expensive to touch. The non-negotiable goal is that no update can brick a device or let an attacker install their own firmware. Fleets get bricked by updates that write over the only bootable image, by power loss mid-write, by an image that boots but cannot reach the server to get the next fix, and by pushing to 100% at once. They get compromised by unsigned images, missing anti-rollback, and update servers trusted without pinning.

{{#fleet_size}}Fleet: {{fleet_size}}{{/fleet_size}}
</context>

<task>
<device_description>
{{device_description}}
</device_description>

1. Constraints: flash available for a second image, RAM for download buffering, connectivity cost and duty cycle, battery or power-loss risk, physical recovery options (USB, debug port, technician visit), and regulatory or customer approval needs. State which constraint drives the design.
2. Update mechanism, with the trade-off for this device:
   - A/B (dual bank) slots: write the inactive slot, switch on reboot, fall back automatically; costs double the image space.
   - Bootloader swap with a scratch area (for example MCUboot swap or overwrite modes) when flash is tight.
   - Delta updates to cut bandwidth, at the cost of needing the exact base version and more device-side work.
   - On embedded Linux, a proven A/B updater (for example RAUC, SWUpdate or Mender) rather than a home-made one.
3. Image security: images signed in a protected build job with keys in an HSM or KMS; signature and hash verified by the bootloader before boot, not only by the application; a monotonic security counter for anti-rollback; transport over TLS with the server authenticated; a plan for key rotation and for a compromised key. Encrypt images only if the firmware itself is confidential.
4. Rollout plan: cohorts (internal devices, a canary of about 1%, then 5%, 25%, 50%, 100%) chosen across hardware revisions, regions and connectivity types; wait times between stages long enough to see failures (at least one full usage cycle); gates on numeric health thresholds; and a halt switch.
5. Rollback and recovery: the new image must confirm itself (mark-good) only after a health check passes, including reaching the update server; otherwise the bootloader reverts after a reboot count or watchdog. Define the health check, the timeout, and what the device reports. Plan for a bad image that passes the check (server-side halt, a fixed version that rolls forward).
6. Device-side rules: download in the background with resume, verify before switching, install only above a battery threshold or on mains, respect user or customer maintenance windows, randomise check-in times to avoid a thundering herd, and back off on failure.
7. Fleet status: per device current version, target version, state (pending, downloading, verifying, installed, confirmed, rolled back, failed) and last error; per cohort success and rollback rates; alerts when rollback rate crosses the gate.
8. Test plan: power-cut during every phase, corrupted and wrongly signed images, downgrade attempts, full flash, no connectivity after update, and a long soak on real hardware.
</task>

<constraints>
- Use only the hardware facts given; if flash size, bootloader or power source is missing, ask, because it changes the mechanism.
- Never propose a design that writes over the only bootable image without a recovery path; say so if the hardware cannot fit two images and offer the safest alternative.
- Name tools as options, not endorsements, and say to check their licences and support for the chip.
- Note where regulations or contracts may require approval for updates (medical, automotive, utilities) and say to check them.
</constraints>

<output_format>
## Constraints
Bullets, with the driving constraint first.
## Update mechanism
Chosen mechanism, flash layout table (region | size | purpose) and why.
## Image security
Bullets.
## Rollout plan
Table: stage | cohort | size | wait | gate to proceed.
## Rollback and recovery
State diagram in text or Mermaid, then bullets.
## Device-side rules
Bullets.
## Fleet status
Fields, states and alerts.
## Test plan
Checklist.
## Open questions
Bullets, or "None".
</output_format>
