---
schema: 1
id: triage-mobile-crash-spike
kind: prompt
title: Triage a mobile crash spike
description: Triages a crash-rate spike after a mobile release, isolating affected versions, devices and OS, server or flag causes, and deciding whether to halt rollout, kill-switch a feature or hotfix.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [mobile-engineer, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [stack-trace, logs, text]
output: [report, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crash-free-rate, staged-rollout, kill-switch, hotfix, app-store-release]
pairs_with:
  prompts: [debug-mobile-crash, write-incident-update, triage-production-alert]
  workflows: [mobile-app-release-track]
args:
  - name: crash_data
    description: What the crash reporter shows - crash-free users or sessions before and after, top crash groups with counts and stack excerpts, breakdown by app version, OS version, device and country, and the rollout percentage. Paste screenshots as text or rough notes.
    type: text
    required: true
  - name: release_notes
    description: What changed in the release and around it - client changes, feature flags flipped, backend deploys, config or remote-config changes, third-party SDK updates.
    type: text
  - name: platform
    description: Which store builds are affected.
    type: enum
    enum: [ios, android, both]
    default: both
output_contract:
  format: markdown
  sections: [Verdict, Blast radius, Likely cause, Decision, Next checks, User and team messages, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A crash spike after a mobile release is a race against the rollout: every hour on a bad build reaches more users, and unlike a server you cannot roll a phone back. The levers are, from fastest to slowest: turn off a feature flag or remote config, fix or roll back a server change, halt or pause the staged rollout, and ship a hotfix through store review. Teams lose time by debugging the stack trace first, by blaming the new build when a backend or flag change hit every version, and by halting a rollout that was not the cause while the real one keeps going.

Platform: {{platform}}
</context>

<task>
<crash_data>
{{crash_data}}
</crash_data>
{{#release_notes}}
<release_notes>
{{release_notes}}
</release_notes>
{{/release_notes}}

1. Size it: crash-free users before and after, absolute users affected per day, and whether it crosses the team's threshold (if none is given, treat a drop of more than 0.5 points in crash-free users, or any crash on launch or checkout, as urgent).
2. Separate by version: is the spike only on the new build, or on older builds too? Old builds crashing at the same time points to the server, a remote config, a flag or a third-party service, not the client release.
3. Narrow the blast radius by OS version, device model, manufacturer, locale, app state (launch, background, specific screen) and country. Note whether the share in the new build matches its rollout percentage.
4. Read the top crash groups: crash type (exception, native signal, out-of-memory, watchdog or ANR), the first app frame, and which change in the release notes touches it.
5. Rank hypotheses with the evidence for and against each.
6. Decide, with the reason and the condition that would change the decision:
   - flip the flag or remote config off if the crash is behind one;
   - roll back or fix the server change if old builds crash too;
   - halt or pause the staged rollout if it is the new build and not flag-gated;
   - expedite a hotfix if users already on the build stay broken (halting does not help them); state that store review time is not guaranteed.
7. List the next three checks that would confirm the cause fastest.
8. Draft a short internal update and, if users are visibly affected, a user-facing note for support or in-app messaging.
</task>

<constraints>
- Use only the numbers given and show the arithmetic. If rollout percentage, version breakdown or the before rate is missing, ask for it in Open questions and say how it changes the decision.
- Do not promise store review times or claim a rollback is possible on the client.
- Never suggest disabling crash reporting or swallowing exceptions to improve the numbers.
- Keep user-facing text free of blame and of technical detail; no promised fix dates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Two lines: severity and the one action to take now.
## Blast radius
Table: dimension | affected values | share of crashes | note.
## Likely cause
Ranked hypotheses with evidence for and against.
## Decision
Lever chosen, reason, and what would change it.
## Next checks
Three numbered checks.
## User and team messages
Internal update, then a user-facing note if needed.
## Open questions
Bullets, or "None".
</output_format>
