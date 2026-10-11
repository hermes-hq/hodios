---
schema: 1
id: upgrade-android-target-sdk
kind: prompt
title: Raise an Android app's target SDK level
description: Raises an Android app's targetSdk to meet Google Play's yearly requirement, handling permission, notification, foreground service, intent, alarm and edge-to-edge behaviour changes.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer]
stack: [android]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [target-sdk, play-store-requirement, runtime-permissions, foreground-services, behavior-changes]
pairs_with:
  prompts: [upgrade-major-dependency, localize-android-string-resources]
  personas: [kotlin-android-engineer]
args:
  - name: project
    description: Current and target targetSdk, minSdk, features used (notifications, background work, foreground services, alarms, media access, broadcast receivers), and key dependencies.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Target change, Behaviour changes that apply, Changes made, Test plan, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Google Play requires new apps and updates to target an API level close to the latest Android release, with a yearly deadline; after it, updates are blocked. Raising `targetSdk` opts the app into every behaviour change for each level crossed, and these changes do not show at compile time. Examples by level: components with intent filters must declare `android:exported` and `PendingIntent` must state mutability (12); notifications need the `POST_NOTIFICATIONS` runtime permission and media access moved to granular permissions (13); foreground services must declare a type with its permission, context-registered receivers must state exported or not, and exact alarms are no longer granted by default (14); edge-to-edge display is enforced, so content can draw under system bars (15); and later levels change orientation and resizing behaviour on large screens and predictive back. `compileSdk` must be at least the target, and libraries such as WorkManager, Firebase and AndroidX may need upgrades to behave correctly. Developer options include compatibility toggles that turn single changes on and off, which isolates which change broke a flow.
</context>

<task>
Project: {{project}}

1. Read the Gradle files, manifest(s) including merged library manifests, and code for receivers, services, alarms, notifications, permissions and media access.
2. For each API level crossed, read the official behaviour-changes page for apps targeting that level and list only the changes that touch this app, with file locations.
3. Raise `compileSdk` first and update dependencies that need it; build. Then raise `targetSdk`.
4. Fix each applicable change: manifest attributes, runtime permission requests with rationale and denial handling, foreground service types, receiver flags, alarm fallbacks when exact alarms are denied, window insets for edge-to-edge.
5. Test on an emulator or device at the target level and at `minSdk`, using compatibility toggles to isolate failures. Cover first launch, permission denial, background work, notifications and deep links.
6. Summarise anything needing a Play Console declaration (foreground service types, exact alarm use, sensitive permissions).
</task>

<constraints>
- Do not request permissions the app did not need before; follow the least-permission path for each change.
- Do not list behaviour changes that do not apply to this app as work items.
- Do not state Play deadlines or policy details as current without telling the user to confirm them in the Play Console.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Target change
Current and new targetSdk and compileSdk, and the Play deadline context.
## Behaviour changes that apply
Table: Android version | change | where this app is affected | fix.
## Changes made
Manifest, code and dependency changes with files touched.
## Test plan
Devices and OS versions, compatibility toggles used, and flows tested with results.
## Remaining risks
Bullets, or "None".
</output_format>
