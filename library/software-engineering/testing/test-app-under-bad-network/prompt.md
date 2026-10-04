---
schema: 1
id: test-app-under-bad-network
kind: prompt
title: Test an app under bad network conditions
description: Designs and automates tests for slow, lossy, captive-portal and offline networks, covering timeouts, retries, offline queues, duplicate submissions and what users see in each state.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [mobile-engineer, frontend-engineer, qa-engineer]
requires: [none]
inputs: [file, text]
output: [checklist, tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [network-conditions, offline-mode, retries, timeouts, fault-injection, connectivity]
pairs_with:
  prompts: [implement-offline-sync, write-native-ui-tests, debug-network-request]
  personas: [mobile-engineer]
args:
  - name: app_description
    description: The app's key flows (especially ones that write data or take payment), how it calls the network (client library, timeouts, retry settings), any offline support, and relevant code excerpts.
    type: text
    required: true
  - name: platform
    description: Where the app runs, which decides the network shaping tools.
    type: enum
    enum: [web, ios, android, cross-platform]
    default: web
output_contract:
  format: markdown
  sections: [Network profiles, Risky flows, Test checklist, Automation, Findings to check in code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's app ({{platform}}) is used on trains, in basements, on congested mobile networks and behind hotel Wi-Fi login pages, but is tested on office Wi-Fi. The bugs that appear are predictable: spinners that never end because there is no timeout; retries of non-idempotent requests that create duplicate orders or payments; double taps while a slow request is in flight; an offline queue that replays in the wrong order or never; captive portals returning a 200 HTML page the app tries to parse as JSON; stale data shown as current; and errors that blame the user ("Something went wrong") with no way to retry.
</context>

<task>
<app>
{{app_description}}
</app>

1. Define network profiles with numbers: offline; high latency (about 500-800 ms round trip); slow 3G-like (roughly 400 kbps down, 400 ms latency); lossy (5-10% packet loss); flapping (connection drops for 5-30 s every minute); captive portal (all requests answered with an HTML login page or redirect); DNS failure; and server slow (responses delayed 10-30 s). Say which tool applies each on {{platform}}: browser DevTools throttling and request blocking, Network Link Conditioner on iOS and macOS, the Android emulator's network settings, a proxy such as Charles, mitmproxy or Toxiproxy for loss and latency injection, and airplane mode on a real device.
2. Rank the app's flows by harm if the network fails mid-request: payments and orders first, then other writes, then reads.
3. For each risky flow and profile, list what to check:
   - Timeouts exist and fit the action (connect and read timeouts, not infinite).
   - Retries: only for idempotent requests or with an idempotency key; exponential backoff with jitter; a cap.
   - Duplicate submission: the button disables or the request is deduplicated; the server rejects a repeated idempotency key.
   - Offline: queued writes persist across app restart, replay in order, and resolve conflicts as designed; the user can see what is pending.
   - What the user sees: loading state within 100-300 ms, a clear offline or slow message, a retry action, no lost form input, and stale data labelled as such.
   - Recovery: when the network returns, the app resumes without a restart and without duplicates.
   - Captive portal and non-JSON responses do not crash or log users out.
4. Automate the highest-value checks: stub or proxy-based tests that inject delay, drop and errors at the network layer (for example route interception in a browser test tool, a fault-injecting proxy in CI, or an injected HTTP client in unit tests), with timeouts and retry counts asserted. Keep real-device manual checks for radio-level behaviour.
5. From the code given, list specific places that look risky (missing timeout, retry on POST, no idempotency key) as findings to verify.

If the description does not say which flows write data or how requests are made, ask for those and stop.
</task>

<constraints>
- Test against test environments and test accounts; never run fault injection against production or real payments.
- Do not invent the app's behaviour; label assumptions [ASSUMED].
- Findings from code are hypotheses until a test confirms them; say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Network profiles
Table: profile | parameters | tool on this platform.
## Risky flows
Ranked list with the harm if interrupted.
## Test checklist
Table: flow | profile | check | expected behaviour | manual or automated.
## Automation
Code or config for the top automated checks.
## Findings to check in code
Bullets with file or function, the risk and the test that would confirm it.
</output_format>
