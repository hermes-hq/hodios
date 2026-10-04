---
schema: 1
id: review-mobile-app-change
kind: prompt
title: Review a mobile app change
description: Reviews an iOS, Android, React Native or Flutter diff for main-thread work, lifecycle bugs, permissions, offline behaviour and compatibility with app versions already in the field. Use on mobile PRs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [mobile-engineer]
stack: []
requires: [none]
inputs: [diff]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [app-lifecycle, offline-first, backward-compatibility, app-store-release, permissions]
pairs_with:
  prompts: [review-pull-request, debug-mobile-crash, review-mobile-app-security]
  personas: [mobile-engineer]
args:
  - name: diff
    description: The diff, plus any related API or schema change on the server side if the PR depends on one.
    type: text
    required: true
  - name: platform
    description: The app platform or cross-platform framework.
    type: enum
    enum: [ios, android, react-native, flutter]
    default: ios
  - name: min_os
    description: Minimum supported OS versions, for example "iOS 16, Android API 26". Leave empty if unknown.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Verdict, Findings, Release risks, Device test checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review a mobile change for the risks web reviewers miss. A shipped binary cannot be hot-fixed: a bad build sits in users' hands until store review approves the next one and they update, and old versions keep calling your API for months or years. Phones also kill and restore processes, rotate, lose network in lifts, deny permissions and run on old OS versions with less memory. Platform: {{platform}}. Minimum OS: {{min_os}} (if empty, ask for it in the Verdict line only if an API in the diff depends on it, and review under a stated assumption).
</context>

<task>
<diff>
{{diff}}
</diff>

Check the diff against each area, using {{platform}} terms:
1. **Main thread.** Network, disk, database, JSON parsing of large payloads, image decoding or crypto on the UI thread; UI updated from a background thread. Name the API (for example `Dispatchers.Main` vs `IO`, `@MainActor`, isolates, the JS thread in React Native).
2. **Lifecycle and configuration.** State lost on rotation, dark mode or locale change, or process death; work tied to a screen that keeps running after it is gone (leaked observers, listeners, coroutines, tasks); background execution limits; restoring a deep link or notification into the right screen.
3. **Permissions and privacy.** Permission requested in context, denied and "don't ask again" paths handled, purpose strings or manifest entries present, new data collection that needs store privacy disclosure updates.
4. **Network and offline.** Timeouts, retries with backoff, no infinite spinners, cached or queued behaviour offline, idempotent retries for writes, large downloads on cellular.
5. **Compatibility in the field.** New API calls guarded by availability checks for the minimum OS; API or payload changes that break older app versions still installed; new required fields; enum values old clients cannot parse; local database or preferences migrations that are forward-only and tested from the oldest supported schema; feature flags or a remote kill switch for risky features.
6. **Resources.** Memory spikes with large images or lists, battery-heavy polling or location, app size growth from new assets or dependencies.
7. **UX platform basics.** Dynamic type or font scaling, safe areas and notches, back navigation (Android back, iOS swipe), screen reader labels on new controls.
8. **Tests.** Unit tests for logic, UI or snapshot tests for new screens, and a migration test for any stored data change.
</task>

<constraints>
- Each finding cites `path:line`, the user-visible failure (crash, ANR, frozen UI, lost data, wrong screen) and a fix in the platform's idiom.
- At most 10 findings, ranked by severity; crashes, data loss and changes that cannot be rolled back come first.
- Do not flag style or architecture preferences unless they cause one of the failures above.
- Do not invent store policies or OS behaviour; if a rule depends on the current store guidelines or OS version, say what to check.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, with the main risk.
## Findings
Numbered. Each: severity, `path:line`, area, the failure and when it happens, the fix.
## Release risks
Bullets: what cannot be fixed after release (API contracts, migrations, persisted formats), what needs a feature flag or staged rollout, and the server-side compatibility needed for old versions.
## Device test checklist
Checkboxes for the manual checks this change needs: oldest supported OS, low-end device, rotation or process death, airplane mode, permission denied, large text, screen reader.
</output_format>
