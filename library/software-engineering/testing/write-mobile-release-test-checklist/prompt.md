---
schema: 1
id: write-mobile-release-test-checklist
kind: prompt
title: Write a mobile release test checklist
description: Writes a pre-release test checklist for an iOS or Android app covering upgrades, permissions, interruptions, offline use, device variety and store requirements.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [mobile-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [text, ticket]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [mobile-testing, release-checklist, app-store, upgrade-testing]
pairs_with:
  prompts: [plan-device-and-browser-matrix, test-app-under-bad-network, write-native-ui-tests]
  personas: [test-engineer]
args:
  - name: app
    description: What the app does, platforms (iOS, Android, both), framework (native, React Native, Flutter), and what is in this release.
    type: text
    required: true
  - name: risk_areas
    description: Features with past production issues, new permissions or SDKs, backend or schema changes, and minimum OS versions supported.
    type: text
  - name: time_available
    description: How much manual testing time there is before submission.
    type: string
output_contract:
  format: markdown
  sections: [Release-specific checks, Upgrade and data, Permissions and privacy, Interruptions and lifecycle, Network and offline, Devices and OS, Store submission, Post-release]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A mobile release cannot be rolled back like a web deploy: users keep old versions for months, store review adds days to a hotfix, and a crash on launch after an update hits every user who auto-updates. The defects that escape are rarely in the new feature's happy path. They come from upgrading over an older version with existing local data and logged-in sessions, permission prompts denied or revoked, the app being backgrounded or killed mid-flow (calls, notifications, low memory, process death on Android), poor or no connectivity, small screens, large text and dark mode, the oldest supported OS, and store requirements such as privacy declarations, required SDK targets and account deletion. A useful checklist is specific to this release's changes and risks, and ordered so the most important checks happen if time runs short.
</context>

<task>
Write a release test checklist for:
{{app}}
{{#risk_areas}}

Risk areas: {{risk_areas}}
{{/risk_areas}}
{{#time_available}}

Time available: {{time_available}}
{{/time_available}}

1. Start with release-specific checks derived from what changed: the new or changed flows, their edge states (empty, error, loading, long content), and anything touching data models, authentication, payments or push notifications.
2. Upgrade and data: install the previous store version, use it to create data and stay signed in, then upgrade to the release build. Check migrations of local storage, preserved sessions, settings and cached content, and a fresh install. Include a forced-update or minimum-version path if the app has one.
3. Permissions and privacy: first-run prompts, denial, later revocation in system settings, limited or approximate grants where the OS offers them, and that the app explains and recovers. Check that new data collection or SDKs are reflected in the store privacy declarations.
4. Interruptions and lifecycle: background and resume mid-flow, incoming call or notification, screen rotation where supported, low memory or process death (Android "don't keep activities"), and returning from a deep link or push into the right screen.
5. Network and offline: offline at launch, connection lost mid-request, slow network, retries without duplicate submissions, and behaviour when the backend returns errors.
6. Devices and OS: the oldest and newest supported OS, a small and a large screen, tablet if supported, large text or font scaling, dark mode, a screen reader pass on the changed flows, and right-to-left if localised.
7. Store submission: version and build numbers, release notes, screenshots if UI changed, target SDK or minimum OS rules, privacy and account deletion requirements, and review notes with a demo account if sign-in is needed.
8. Post-release: phased rollout settings, crash and ANR monitoring thresholds that pause the rollout, and who watches the first hours.
9. Mark each item P1 (must do), P2 or P3, and if time is limited, say which P1 items fit.
</task>

<constraints>
- Tailor the list to the stated release; do not pad with checks irrelevant to its platforms or features.
- Do not state current store policy details as fact unless given; phrase them as checks against the current store guidelines.
- Do not invent supported OS versions or device names; use the ones given or placeholders.
</constraints>

<output_format>
One section per heading in the output contract, each a checklist of "- [ ] P1 ..." items with the expected result in a few words. End with a short "If time runs short" list under Post-release.
</output_format>
