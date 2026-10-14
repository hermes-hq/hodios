---
schema: 1
id: build-vm-image-with-packer
kind: prompt
title: Build a VM image with Packer
description: Writes a Packer template that bakes a hardened, versioned VM image with repeatable provisioning, tests, cleanup and a scheduled rebuild pipeline for security patches.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre]
stack: [aws, gcp, azure]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [code, config]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [packer, golden-image, immutable-infrastructure, image-pipeline]
pairs_with:
  prompts: [write-ansible-playbook, harden-linux-server, write-cloud-init-script]
args:
  - name: image
    description: What the image must contain (base OS, packages, agents, the app or runtime), and where it will run.
    type: text
    required: true
  - name: targets
    description: Builders and regions, e.g. "AWS AMI in eu-west-1 and us-east-1", "GCP image", "Azure shared image gallery".
    type: text
    required: true
  - name: provisioner
    description: How to configure the image.
    type: enum
    enum: [shell, ansible]
    default: shell
output_contract:
  format: markdown
  sections: [Assumptions, Template, Provisioning, Tests, Pipeline, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A baked image turns minutes of boot-time setup into seconds and makes every instance identical, but only if the build is repeatable. Common failures: the base image is "latest" from a marketplace search with no owner filter, so a lookalike image can be picked; packages are installed unpinned so two builds differ; secrets used during the build end up in the image or shell history; machine identity (SSH host keys, `/etc/machine-id`, cloud-init state, logs) is baked in so every instance looks like the same machine; and nobody rebuilds, so images go months without security patches. Current Packer uses HCL2 templates with a `required_plugins` block and `packer init`; JSON templates are legacy. Per-instance configuration (hostnames, secrets, environment) belongs in cloud-init at boot, not in the image.
</context>

<task>
Write a Packer build for this image:
{{image}}
Targets: {{targets}}
Provisioning with: {{provisioner}}

1. If a repository is available, read existing Packer templates, provisioning scripts or Ansible roles and reuse them.
2. Template (HCL2): `packer { required_plugins { ... } }` with pinned plugin versions, variables for region, base image filter, version and instance size, and a source per target. Select the base image by owner plus name filter with `most_recent`, never by a hard-coded ID or an unfiltered search.
3. Provisioning: update packages, install pinned versions, install agents (logs, metrics, security) disabled from starting until configured at boot if they need per-instance identity, apply hardening from a named baseline, and keep build-time secrets out of the image (pass via environment, remove after use).
4. Cleanup at the end: remove SSH host keys, truncate `/etc/machine-id`, clean cloud-init state and logs, package caches and shell history, so each instance initialises fresh.
5. Tests: a post-provision check (shell assertions or a Goss or InSpec spec) that required packages and versions are present, services are enabled, and nothing listens unexpectedly. The build fails if it fails.
6. Output: image name with version and timestamp, tags or labels for source commit, base image ID and build date, sharing to other accounts or projects only if asked, and a manifest post-processor so the pipeline knows the new image ID.
7. Pipeline: build on change and on a weekly schedule for patches, validate (`packer fmt -check`, `packer validate`), publish, and deregister images older than a retention count.
</task>

<constraints>
- No credentials, keys or tokens in the template or scripts; cloud credentials come from the build environment.
- Do not run `packer build` (it creates billable resources); you may run `packer fmt` and `packer validate` if Packer is installed.
- Only use builder and plugin arguments that exist; mark any you are unsure of.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Template
The `.pkr.hcl` files as fenced blocks with paths.
## Provisioning
Scripts or playbook, with the cleanup step.
## Tests
The test spec and how it runs in the build.
## Pipeline
The CI job: triggers, steps, retention.
## Verify
Commands run and results, or "not run" with the commands.
</output_format>
