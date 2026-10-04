---
schema: 1
id: implement-mobile-background-tasks
kind: prompt
title: Implement mobile background tasks
description: Implements background work on iOS and Android within OS limits, choosing scheduled, expedited or foreground work, with constraints, retries and tests for when the OS kills or delays it.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [mobile-engineer]
stack: [ios, android]
requires: [none]
inputs: [text, file]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [background-work, workmanager, bgtaskscheduler, foreground-service, battery]
pairs_with:
  personas: [mobile-engineer]
  prompts: [implement-offline-sync, implement-push-notifications]
args:
  - name: task_description
    description: What must run in the background, how often or on what trigger, how long it takes, how urgent it is, whether the user started it, and what happens if it runs late. Paste existing code if any.
    type: text
    required: true
  - name: platform
    description: Which platforms to cover.
    type: enum
    enum: [ios, android, both]
    required: true
output_contract:
  format: markdown
  sections: [Requirements, Mechanism choice, Code, Failure handling, Test plan, What the user will notice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user needs background work on {{platform}}. Mobile operating systems decide when background code runs, not the app: iOS gives `BGAppRefreshTask` around 30 seconds at times it chooses based on usage, `BGProcessingTask` longer windows usually when charging and idle, background `URLSession` for transfers that continue while suspended, and `beginBackgroundTask` only a short grace period after leaving the foreground; force-quit apps get no background refresh. Android's WorkManager handles deferrable guaranteed work with constraints and backoff, periodic work has a 15-minute minimum, expedited work is quota-limited, Doze and App Standby buckets delay jobs, foreground services need a visible notification, a declared type and since Android 14 a matching permission, and some manufacturers kill background apps aggressively. Exact timing promises are the most common mistake; the second is work that is not idempotent and corrupts data when the OS stops it mid-way.
</context>

<task>
<task_description>
{{task_description}}
</task_description>

1. Turn the description into requirements: trigger, latency tolerance, duration, network and charging needs, user-initiated or not, data that must not be lost. If latency tolerance or duration is missing, ask; they decide the mechanism.
2. Choose the mechanism per platform from a decision table: push-triggered work, periodic refresh, long processing, transfers, user-visible long-running work (foreground service on Android, Live Activity or background transfer on iOS), or "do it when the app next opens". Say plainly when a requirement cannot be met by the OS (for example "every 5 minutes in the background on iOS") and offer the closest honest design, such as server-side work plus a push.
3. Write the code: registration and scheduling (Info.plist identifiers and `BGTaskScheduler`, WorkManager `WorkRequest` with constraints, unique work names and `ExistingWorkPolicy`), the work itself split into small idempotent steps with checkpoints, expiration and `onStopped` handling that saves progress, and rescheduling.
4. Handle failure: retries with exponential backoff, a maximum attempt count, results surfaced to the user when it matters, and logging that survives process death.
5. Write a test plan with the forcing tools: `e -l objc -- (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@"id"]` in the debugger for iOS, `adb shell cmd jobscheduler run`, WorkManager test helpers, `adb shell dumpsys deviceidle force-idle` for Doze, killing the process mid-task, airplane mode, low battery, and one aggressive-OEM device.
6. Say what the user will notice: notifications, battery settings prompts, delays.
</task>

<constraints>
- Never promise exact background timing; state the realistic range.
- Do not ask users to disable battery optimisation unless the core feature truly needs it, and explain store policy limits on requesting that exemption.
- Do not invent APIs; state OS and library versions assumed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Table: Requirement | Value | Source (given or assumed).
## Mechanism choice
Table: Platform | Mechanism | Why | Limits.
## Code
Files with names per platform.
## Failure handling
Bullets.
## Test plan
Numbered steps with commands and expected result.
## What the user will notice
Bullets in plain language.
</output_format>
