---
schema: 1
id: write-cloud-init-script
kind: prompt
title: Write cloud-init user data for a VM
description: Writes cloud-init user data that bootstraps a fresh VM with users, packages, files, secrets fetched at boot, services and a completion signal, safe to run again on reboot.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, backend-engineer]
stack: [bash]
requires: [none]
inputs: [spec]
output: [config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cloud-init, user-data, vm-bootstrap, first-boot]
pairs_with:
  prompts: [build-vm-image-with-packer, write-systemd-service, harden-linux-server]
args:
  - name: setup
    description: "What a new VM must have when boot finishes, such as users and SSH keys (public keys only), packages, config files, the app and how it runs, and where secrets come from."
    type: text
    required: true
  - name: platform
    description: Cloud or hypervisor and the OS image, e.g. "AWS EC2 Ubuntu 24.04", "Hetzner Debian 12", "Proxmox with NoCloud".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, User data, Secrets at boot, Debugging, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
cloud-init runs once per instance by default, so most modules (`users`, `packages`, `write_files`, `runcmd`) do not run again on reboot; scripts in `bootcmd` and the per-boot directory do. That surprises people in both directions: setup they expected on every boot does not happen, and a `runcmd` that is not idempotent breaks when an image is rebuilt from a configured instance. User data is readable from inside the instance through the metadata service by any process, and often by anyone with read access to the instance configuration in the cloud console, so it must never contain secrets; fetch them at boot with the instance's identity. The file must start with `#cloud-config` and be valid YAML; otherwise cloud-init does not apply it as cloud-config and only leaves a warning in its log. Size limits apply (16 KB of raw user data on EC2, before base64 encoding; cloud-init accepts gzip-compressed user data when it is close). `cloud-init status --wait` and `/var/log/cloud-init-output.log` are how you know it worked.
</context>

<task>
Write cloud-init user data for {{platform}} that does this:
{{setup}}

1. If anything that changes the result is unknown (the OS family, which affects package names and service tools; where the app artifact comes from), ask up to 3 questions and stop. Otherwise default and record it.
2. Write a `#cloud-config` document using native modules before `runcmd`: `users` with public SSH keys and sudo rules, `package_update`, `packages` with versions pinned where it matters, `write_files` for config (with owner and permissions), and `runcmd` only for steps no module covers.
3. Secrets: fetch at boot using the instance identity (cloud secret manager or parameter store via instance role or managed identity), write to a root-only file, and never echo them to logs.
4. Make every `runcmd` step idempotent and fail loudly (`set -euo pipefail` in scripts, checks before creating things). Put anything that must run on every boot in a systemd unit or `bootcmd`, and say which.
5. Start the app as a systemd service rather than a background process from `runcmd`.
6. Signal completion: a final step that writes a marker file or calls the platform's signal mechanism, and a health check the user can run.
7. Keep it under the platform's user data size limit; if it is large, move scripts into the image or fetch them from a private artifact store.
</task>

<constraints>
- No passwords, private keys, tokens or secrets anywhere in the user data.
- Never disable SSH host key checking, the firewall or security updates to make setup easier.
- Use only cloud-init modules and keys that exist; mark any you are unsure of for the target distribution.
- Valid YAML: check indentation and quoting of shell commands containing colons.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## User data
One fenced `yaml` block beginning with `#cloud-config`.
## Secrets at boot
How secrets are fetched, and the identity permission required.
## Debugging
The commands and log files to check if boot setup fails (`cloud-init status --long`, `cloud-init schema --system`, the output log).
## Checklist
Checkboxes to confirm on a fresh instance and after a reboot.
</output_format>
