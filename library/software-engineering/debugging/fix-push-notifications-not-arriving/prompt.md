---
schema: 1
id: fix-push-notifications-not-arriving
kind: prompt
title: Fix push notifications that do not arrive
description: Finds why push notifications do not arrive on iOS or Android, checking device tokens, APNs keys and environments, FCM payloads, permissions and OS delivery limits.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [mobile-engineer, backend-engineer]
stack: [ios, android]
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [report, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [apns, fcm, notifications, device-tokens]
pairs_with:
  prompts: [implement-push-notifications, debug-mobile-crash]
args:
  - name: symptom
    description: "What happens: no notifications at all, only on one platform, only in production or TestFlight, only when the app is in the foreground or killed, or only for some users."
    type: text
    required: true
  - name: evidence
    description: "The send code or provider (FCM, APNs directly, OneSignal, Expo push), the payload sent, provider responses or error codes, and app-side registration code. Redact keys and tokens."
    type: text
output_contract:
  format: markdown
  sections: [Where delivery stops, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mobile engineer who debugs push by checking each hop of the pipeline in order: the user grants permission, the app registers and gets a device token, the token reaches your backend, the backend sends to APNs or FCM with valid credentials, the provider accepts it, the OS delivers it, and the app displays or handles it. Common breaks:
- iOS environments: development builds get sandbox tokens, TestFlight and App Store builds get production tokens; sending to the wrong APNs environment fails with `BadDeviceToken`. Push capability and the `aps-environment` entitlement must be present. A `.p8` key works for both environments; `.p12` certificates expire.
- iOS payloads: background or silent pushes need `content-available: 1`, `apns-push-type: background` and priority 5, and are throttled heavily; the system does not deliver them to apps the user force-quit. `apns-topic` must be the bundle id.
- Android 13+ needs the runtime `POST_NOTIFICATIONS` permission; notifications need a channel created before display (Android 8+); FCM "notification" messages are shown by the system only when the app is in the background, while "data" messages always go to the app's handler, which must display them. Battery optimisation and manufacturer power managers delay or drop messages; normal-priority messages wait for maintenance windows.
- Tokens: tokens change (reinstall, restore, token refresh callbacks), so the backend must update and stop using old ones; FCM `UNREGISTERED` or APNs `410 Unregistered` means remove the token. Storing a token per user instead of per device loses all but one device.
- Foreground: iOS does not show banners for a foreground app unless the delegate's `willPresent` returns presentation options; Android shows nothing for foreground "notification" messages unless the app builds one.
- Credentials: an FCM server key from the legacy API (shut down) instead of HTTP v1 with a service account; a wrong Firebase project; APNs key id or team id mismatched.
</context>

<task>
Find why these push notifications do not arrive.

Symptom:
{{symptom}}
{{#evidence}}

Evidence:
{{evidence}}
{{/evidence}}

1. Read the app's registration and handling code for each platform and the backend send code. Note the provider, API version and payload shape.
2. Walk the hops in order and mark each as confirmed, failing, or unknown from the evidence. For unknown hops, say exactly how to test that hop alone (send one message to one known token with the provider's API or console, check the provider response, check the device's notification settings).
3. Name the cause for the first failing hop, using provider error codes when you have them.
4. Fix it: entitlement or environment, payload fields and headers, the Android permission request and channel, foreground presentation handling, token refresh and cleanup logic, or migrating to the current FCM HTTP v1 API.
5. Give a verification matrix: each platform, in foreground, background and killed states, on a build of the same type as production (TestFlight or release).
</task>

<constraints>
- Never ask for or print APNs keys, service account JSON or full device tokens; ask for redacted values or error codes.
- Do not promise guaranteed delivery; both platforms deliver on a best-effort basis and throttle background messages.
- Do not send test notifications to real users' tokens; use a test device.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where delivery stops
Which hop fails: permission, token registration, token storage, send request, provider to device, or display on the device.
## Cause
The cause in one paragraph, with the evidence.
## Fix
The code, payload or configuration change for each platform affected.
## Verification
The test that proves delivery: a single send to a known token in each app state, with the provider response.
</output_format>
