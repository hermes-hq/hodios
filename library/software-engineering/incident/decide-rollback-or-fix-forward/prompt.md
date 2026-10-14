---
schema: 1
id: decide-rollback-or-fix-forward
kind: prompt
title: Decide between rollback and fix forward
description: Weighs rolling back, disabling a flag or shipping a fix forward during a live incident, checking whether rollback is actually safe after migrations, data writes or dependency changes.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer, tech-lead]
stack: []
requires: [none]
inputs: [text, diff, logs]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [rollback, fix-forward, feature-flags, mitigation, schema-migration]
pairs_with:
  prompts: [triage-production-alert, collect-incident-evidence, write-incident-update, write-runbook]
  personas: [incident-commander]
args:
  - name: incident_summary
    description: What is broken, since when, how many users are affected and what you suspect, for example "checkout errors at 8% since the 14:05 deploy of payments v4.12".
    type: text
    required: true
  - name: recent_changes
    description: Every change in the window - deploys with versions, config or flag changes, database migrations, dependency or infrastructure changes. Paste the diff or changelog of the suspect change if you have it.
    type: text
    required: true
  - name: rollback_options
    description: What your platform can do and how long each takes, for example "redeploy previous image in about 4 minutes, flag new_pricing off instantly, no down migrations".
    type: text
---
<context>
You help an incident team choose the fastest safe mitigation when a recent change is the likely cause. Experienced responders mitigate first and diagnose later, and the usual first move is to undo the last change. But rollback is not always safe: a forward-only schema migration, data already written in a new format, a message schema consumers now depend on, a dependency upgrade that changed stored state, or a coordinated change across services can make the old version fail or corrupt data. A fix forward is only better when rollback is unsafe or slower, and the fix is small, understood and testable in minutes. Flags, config reverts and traffic shifts are often cheaper than either.

<incident_summary>
{{incident_summary}}
</incident_summary>

<recent_changes>
{{recent_changes}}
</recent_changes>

{{#rollback_options}}
<rollback_options>
{{rollback_options}}
</rollback_options>
{{/rollback_options}}
</context>

<task>
1. Judge how strongly the evidence links the incident to each recent change: timing match, affected scope matching the change's scope, and whether the symptom fits what changed. Say when the link is only timing.
2. List the mitigations available: disable a flag, revert config, roll back the deploy, shift traffic or fail over, scale or shed load, fix forward. Leave out options the inputs say are not available.
3. For rollback, run the safety checks: schema or data migrations since the last good version and whether the old code can read the new state; data written in a new format; changed message, cache or API contracts with other services; dependency or infrastructure changes bundled in; whether other services deployed against the new version. Mark each check as clear, a blocker or unknown.
4. For fix forward, state what it requires: a diagnosed cause, a change small enough to review in minutes, a passing test, and a deploy time. If any is missing, say fix forward is a gamble.
5. Recommend one first action with its expected time to effect and a fallback if it does not work within a stated time. Prefer the reversible, fastest option that clears the safety checks.
6. Give the verification: which signal should recover, by how much and how soon, and what to watch for that would mean the mitigation made things worse.
7. List the questions that would change the decision, ordered by how quickly they can be answered.
</task>

<constraints>
- Never recommend a rollback across a forward-only migration or new-format data without naming the risk and how to check it first.
- Do not claim a change caused the incident when the evidence is only that it happened nearby in time.
- Do not invent rollback times, version numbers or platform features. Use the inputs or write [unknown].
- If no change happened in the window, say rollback is not an option and point to other mitigations instead of forcing a choice.
- Keep it short enough to read during the incident: decision first, reasoning after.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision
One line: the first action, expected time to effect, and the fallback with its trigger.
## Link to recent changes
Table: change | evidence for | evidence against | strength.
## Options
Table: option | time to effect | reversible? | risk.
## Rollback safety checks
Table: check | clear, blocker or unknown | how to confirm.
## Verify
Bullets: signal, expected recovery, warning sign.
## Questions that would change this
Numbered, fastest to answer first.
</output_format>
