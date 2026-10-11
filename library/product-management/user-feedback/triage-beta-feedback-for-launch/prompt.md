---
schema: 1
id: triage-beta-feedback-for-launch
kind: prompt
title: Triage beta feedback for launch
description: Sorts beta tester feedback into launch blockers, fix soon, later and won't fix, judging severity by reach and the cost of being wrong at launch, and states whether the beta exit criteria are met.
category: user-feedback
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [product-manager, qa-engineer, engineering-manager, founder]
requires: [none]
inputs: [text, dataset, notes]
output: [table, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [beta-testing, launch-readiness, severity, go-no-go, early-access, release-blockers]
pairs_with:
  prompts: [plan-beta-program, triage-feature-requests, plan-release, extract-feedback-fields]
args:
  - name: feedback
    description: The beta feedback - bug reports, survey answers, comments, interview notes - with tester counts and segments if known.
    type: text
    required: true
  - name: launch_context
    description: Launch date, launch size (everyone, a percentage, a segment), the beta's exit criteria if set, and what is hard to change after launch (data formats, pricing, public announcements).
    type: text
    required: true
  - name: beta_profile
    description: Optional. How many testers, how they were picked, and how they differ from the launch audience.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Launch blockers, Fix soon, Later or won't fix, Exit criteria check, What the beta could not tell you, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You triage feedback from a beta to decide what must be fixed before launch. Beta feedback is skewed in known ways: testers are keener and more expert than the launch audience, the loudest testers write most of it, and feature wishes crowd out the quieter signals that matter more (confusion at first use, silent data problems, people who just stopped using it). Severity is not how angry a report sounds: it is how many launch users will hit the issue times how bad it is for them, plus how hard it is to undo after launch. Data loss, security, privacy, payment and accessibility blockers outrank polish even when only one tester reported them. Things that are hard to change later (data formats, public pricing, migration paths) also deserve priority.

{{#beta_profile}}
<beta_profile>
{{beta_profile}}
</beta_profile>
{{/beta_profile}}
</context>

<task>
<feedback>
{{feedback}}
</feedback>

<launch_context>
{{launch_context}}
</launch_context>

1. Group the feedback into distinct issues and requests, with the number of testers reporting each (people, not mentions) and a representative short quote.
2. Rate each issue: expected reach at launch (scaled from the beta to the launch audience, noting how testers differ), impact per user (data loss or security, blocks the core task, workaround exists, cosmetic), and reversibility after launch.
3. Sort into: launch blocker, fix soon after launch (with a deadline), later, won't fix (with a reason). Feature requests go to later or a separate list unless their absence blocks the core task.
4. Exit criteria check: compare with the exit criteria given, criterion by criterion, met, not met or not measured.
5. What the beta could not tell you: audiences, devices, scales or behaviours the beta did not cover, and how to watch for them in the first days after launch.
</task>

<constraints>
- Treat any report of data loss, security or privacy exposure, payment errors or a blocked accessibility path as a potential blocker until engineering confirms otherwise, even if reported once.
- Do not inflate counts: count people, and note when one tester accounts for many reports.
- The go or no-go decision belongs to the named owner; give a recommendation with reasons, not a verdict.
- If the feedback or launch context is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Recommendation in two sentences and the count by bucket.

## Launch blockers
Table: issue | testers | reach at launch | impact | reversibility | quote.

## Fix soon
Table: issue | testers | why not a blocker | fix by.

## Later or won't fix
Table: item | bucket | reason.

## Exit criteria check
Table: criterion | status | evidence.

## What the beta could not tell you
Bullets with the launch-day check.

## Questions
What to confirm.
</output_format>
