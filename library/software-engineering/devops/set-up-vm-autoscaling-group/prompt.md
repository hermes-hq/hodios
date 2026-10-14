---
schema: 1
id: set-up-vm-autoscaling-group
kind: prompt
title: Set up a VM autoscaling group
description: Sets up an autoscaling group of VMs with a launch template, baked image or startup script, load balancer health checks, scaling policies and instance refresh for rolling updates.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre]
stack: [aws, gcp, azure, terraform]
requires: [repo-read, file-write]
inputs: [config, text]
output: [config, table]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [autoscaling-group, launch-template, instance-refresh, scaling-policy, immutable-infrastructure]
pairs_with:
  prompts: [configure-load-balancer, write-terraform-module, harden-linux-server]
args:
  - name: workload
    description: What runs on the VMs (app, port, startup time, state on disk), the cloud, traffic pattern and how servers are built and updated today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Config, Scaling, Updates, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An autoscaling group only works if any instance can be destroyed at any moment. Groups fail when the VMs still hold state (uploads on local disk, sessions in memory, cron jobs that must run once), when instances are configured by hand after launch, or when the startup script downloads and builds everything so scale-out takes ten minutes and fails when a package mirror is down. The usual design: a baked image (built with Packer or the cloud's image builder) plus a short startup script that only fetches configuration; health checks from the load balancer, not just "the VM is running", with a grace period that covers startup; target-tracking policies on a metric that reflects load; and updates by instance refresh or rolling replacement with a minimum healthy percentage, never by logging in and patching. The equivalents are Auto Scaling groups on AWS, managed instance groups on GCP and VM scale sets on Azure.
</context>

<task>
Set up a VM autoscaling group for:
<workload>
{{workload}}
</workload>

1. Read the existing infrastructure code and server setup scripts. List any state on the instances (local files, in-memory sessions, scheduled jobs) and propose where each goes (object storage, a shared cache, a single scheduler) before scaling out. If a blocker cannot move, say so and stop.
2. Image: bake the runtime and app into an image, or keep a minimal base plus a short startup script; justify the choice by startup time. Pin the image in the launch template.
3. Launch template or instance template: instance type, image, instance profile or service account with least privilege, security group allowing traffic only from the load balancer, no public IP, metadata service hardened (IMDSv2 on AWS), and the startup script with configuration from a secret or parameter store.
4. Group: spread across at least two zones, min, desired and max capacity, load balancer health checks with a grace period above the measured startup time.
5. Scaling: target tracking on CPU, request count per target or a queue depth metric, with warm-up and cooldown; scheduled scaling for known peaks if given.
6. Updates: instance refresh or rolling replacement with minimum healthy percentage and warm-up, triggered by a new launch template version; describe rollback to the previous version.
7. Write the infrastructure code in the tool already in use and validate it if available.
</task>

<constraints>
- Do not scale out a workload that keeps state on local disk or in memory without moving that state first.
- Do not give instances broad IAM permissions or public IPs.
- Do not invent resource arguments; say when unsure and use placeholders.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Image strategy, state moved off instances, zones and health checks.

## Config
Infrastructure files with paths and contents.

## Scaling
A table: policy, metric, target, min and max, warm-up.

## Updates
How a new version rolls out and how to roll back.

## Verify
Validation results and tests to run (terminate an instance, load test scale-out).

## Follow-ups
State still to move, image pipeline, alarms and cost limits. "None" if empty.
</output_format>
