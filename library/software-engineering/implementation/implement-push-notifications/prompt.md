---
schema: 1
id: implement-push-notifications
kind: prompt
title: Implement push notifications
description: Implements mobile push notifications end to end, from token registration and server sending through APNs or FCM to payload design, permission timing, tap routing and delivery debugging.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build, verify]
role: [mobile-engineer, backend-engineer]
stack: [ios, android, react-native, flutter]
requires: [none]
inputs: [text, spec]
output: [code, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [push-notifications, apns, fcm, device-tokens, permissions]
pairs_with:
  personas: [mobile-engineer]
  prompts: [implement-mobile-deep-links, implement-background-job]
args:
  - name: platform
    description: The app's platform or cross-platform framework.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
  - name: backend_stack
    description: The server that sends notifications, for example "Node.js with Postgres", "Django", "Firebase Cloud Functions". Add what triggers a notification and expected volume if known.
    type: string
    default: not given - examples use plain HTTP calls to APNs and FCM
  - name: use_cases
    description: The notifications you need, for example "new chat message, order shipped, weekly digest", and whether any must be silent data updates.
    type: text
    default: not given
output_contract:
  format: markdown
  sections: [Assumptions, Architecture, Token lifecycle, Payloads, Client code, Server code, Permission and opt-in, Debugging checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is adding push to a {{platform}} app. Sending backend: {{backend_stack}}. Push breaks in ways that are invisible in development: tokens rotate and stale ones are never removed; the server keeps sending to uninstalled apps; the iOS sandbox and production APNs environments are mixed up; the permission prompt is shown on first launch and denied forever (iOS shows it once); Android 13+ needs the runtime POST_NOTIFICATIONS permission and notification channels decide sound and importance; silent or data-only messages are throttled or dropped when the app is force-quit or the device is in low-power states; and a tap opens the app's home screen instead of the content. Experts treat push as a delivery hint, never the only copy of important data.
</context>

<task>
<use_cases>
{{use_cases}}
</use_cases>

1. If the use cases are "not given" or too vague to design payloads, ask for them (each notification, what a tap should open, which must be silent data updates) and still deliver the parts that do not depend on them: Architecture, Token lifecycle, Client code for registration and tap routing, Permission and opt-in, and the Debugging checklist. Mark Payloads and the send triggers in Server code as pending. Otherwise state assumptions.
2. Choose the architecture: APNs directly for iOS with token-based (.p8) auth, FCM HTTP v1 for Android (and optionally iOS via FCM), or a provider; justify. Never use the deprecated FCM legacy API.
3. Design the token lifecycle: register after login, send token, platform, app version, locale and environment to the server; upsert on every launch and on refresh callbacks; one user may have many devices; delete on logout; remove tokens when APNs returns 410 (Unregistered) or 400 BadDeviceToken from the matching environment, or FCM returns UNREGISTERED; treat FCM INVALID_ARGUMENT as a bad token only when the error details name the token, since it also signals a malformed payload.
4. Design payloads per use case: visible alert versus data-only, collapse or thread identifiers, priority, TTL or expiration, badge handling, a small deep-link route plus an id (fetch details on open instead of putting private data in the payload), localisation, and Android channel ids. Keep within size limits (4 KB).
5. Write the client code for {{platform}}: capability setup, permission request after a clear in-app explanation at a moment of value (not first launch), foreground presentation, tap handling that routes to the right screen whether the app was killed, backgrounded or open, and channel creation on Android.
6. Write the server code: a send function with auth, retries with backoff on 429 and 5xx, no retry on permanent token errors, batching for fan-out, idempotency so a retry does not double-notify, and user preferences and quiet hours checked before sending.
7. Give a debugging checklist ordered from most to least common cause.
</task>

<constraints>
- Do not put secrets, personal or health data in payloads; they can appear on lock screens and in provider logs.
- Do not invent SDK method names; state the SDK and library versions assumed.
- Respect user consent: marketing notifications need an explicit opt-in separate from transactional ones where local law requires it; say to check the rules for the user's markets.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Architecture
A short diagram in text and the provider choice.
## Token lifecycle
Table: Event | Client action | Server action.
## Payloads
One JSON example per use case with a note on each field.
## Client code
Files with names.
## Server code
Files with names.
## Permission and opt-in
When and how to ask, and the settings screen.
## Debugging checklist
Numbered, most common first.
</output_format>
