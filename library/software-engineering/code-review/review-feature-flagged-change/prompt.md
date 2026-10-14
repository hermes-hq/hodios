---
schema: 1
id: review-feature-flagged-change
kind: prompt
title: Review a feature-flagged change
description: Reviews code shipped behind a feature flag for new-path leaks when the flag is off, unsafe defaults, inconsistent evaluation, data the old path cannot read after rollback, and cleanup.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, frontend-engineer, backend-engineer]
requires: [none]
inputs: [diff, file]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [feature-flags, dark-launch, kill-switch, progressive-delivery, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [add-feature-flag, remove-stale-feature-flags, review-config-only-change]
args:
  - name: diff
    description: The code change that adds or uses the flag, with file paths.
    type: text
    required: true
  - name: rollout_plan
    description: How the flag will be rolled out (internal users, percentage, tenants), how it is evaluated (server, client, cached), and who can flip it.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Flag-off safety, Findings, Rollout and rollback, Cleanup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A flag is only a safety net if turning it off really restores the old behaviour. In practice the new path leaks: a schema migration or data format change ships unconditionally, a refactor of shared code changes the old path too, a new background job or event consumer runs regardless of the flag, or data written while the flag was on cannot be read by the old code after turning it off. Other common problems: the flag is checked in some places and not others (the UI hides a button but the API still accepts the call), different requests for the same user get different answers because the flag is evaluated with a different key or cached inconsistently, the default when the flag service is unreachable turns the feature on, and nobody owns removing the flag.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#rollout_plan}}
<rollout_plan>
{{rollout_plan}}
</rollout_plan>
{{/rollout_plan}}

1. Find every flag check in the diff and every code path, job, endpoint, migration and event the new feature touches. List the touched parts that are not behind the flag.
2. Flag-off safety: with the flag off, is behaviour identical to before the PR? Look at shared code changed unconditionally, migrations, new consumers or scheduled jobs, and changed defaults.
3. Flip safety: if the flag goes on then off, can the old path read data the new path wrote (new enum values, new columns, new message formats)? If not, what is the plan?
4. Consistency: is the flag evaluated with a stable key (user, tenant) so one user sees one variant, are client and server checks aligned, is the evaluation cached in a way that delays a kill switch?
5. Defaults and failure: what happens when the flag service is unreachable or the flag is missing; the default should be the old, safe path.
6. Tests: are both flag states tested, and are flag combinations with other active flags considered?
7. Cleanup: is there an owner, an expiry or ticket, and is the code shaped so the old path can be deleted cleanly?
8. Rate findings: high (flag off does not restore old behaviour, unsafe default, data unreadable after rollback), medium, low.
</task>

<constraints>
- Cite `path:line` for each finding and say which flag state it affects.
- Do not ask for a flag around trivial changes; review the flag that exists.
- Do not invent the flag system's behaviour; if evaluation or caching is not shown, ask.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Flag-off safety
Table: touched part, behind flag (yes or no), effect with flag off.
## Findings
Numbered: severity, `path:line`, flag state, problem, fix.
## Rollout and rollback
Bullets: what to watch during rollout and whether turning it off is truly a rollback.
## Cleanup
Owner, expiry and what deleting the old path involves.
</output_format>
