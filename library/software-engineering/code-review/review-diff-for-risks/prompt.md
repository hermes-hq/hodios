---
schema: 1
id: review-diff-for-risks
kind: prompt
title: Review a diff for shipping risks
description: Assesses what can go wrong when a change reaches production, such as broken contracts, unsafe migrations, rollout order and rollback, and proposes mitigations. Use before deploying a risky change.
category: code-review
version: 1.0.0
status: incubating
stage: [review, ship]
role: [software-engineer, backend-engineer, tech-lead, sre]
stack: []
requires: [repo-read]
inputs: [diff]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deployment, rollback, backward-compatibility, database-migration]
pairs_with:
  prompts: [review-pull-request]
  personas: [code-reviewer]
args:
  - name: diff
    description: Unified diff, PR URL or branch name to assess.
    type: text
    required: true
  - name: deployment
    description: How this change ships, for example "continuous deploy to 40 pods behind a load balancer", "mobile app release" or "npm library".
    type: text
output_contract:
  format: markdown
  sections: [Risk level, Risks, Rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A change can be correct line by line and still cause an outage. Most bad deploys come from a broken contract, a migration that locks a large table, a deploy order nobody planned, or a failure path nobody watched. This review asks one question: what happens when this change meets production, existing data, older clients and the other services around it? It is not a style review and not a full correctness pass.
</context>

<task>
Assess the risk of shipping {{diff}}. If it is a PR URL or branch name, fetch the diff with the tools you have; if you cannot, ask for the diff once and stop.
{{#deployment}}How it ships: {{deployment}}
{{/deployment}}
1. Read the whole diff, then state in one sentence what behaviour changes.
2. Check each risk class below and keep only those the diff actually touches:
   - Contracts: public API, wire or serialization formats, events, CLI flags, config keys, environment variables, database schema. Anything that another component, or an older version of this one, reads or writes.
   - Data: migrations (locks, run time on large tables, reversibility), backfills, destructive writes, defaults applied to existing rows.
   - Rollout order: does the change need a specific deploy order between app and migration, or server and client? What breaks while old and new versions run side by side?
   - Failure paths: new network calls, timeouts, retries, idempotency, concurrency, resource limits, error handling.
   - Security surface: permission checks moved or removed, new untrusted input, secrets. Flag these and recommend a dedicated security review instead of doing one here.
   - Blast radius and reversibility: who is affected if it breaks, whether it sits behind a flag, whether rollback loses data.
   - Observability: will anyone know the new path is failing? Logs, metrics, alerts.
3. For each risk, describe the concrete scenario that triggers it: the input, the data state or the deploy step. Drop any risk you cannot tie to a line in the diff.
4. Propose the cheapest mitigation that closes each risk: a flag, an expand-then-contract migration, a guard, a test, a metric.
</task>

<constraints>
- Every risk cites `path:line` from the diff.
- When a risk depends on something outside the diff (callers, other services, table sizes, traffic), name what must be checked instead of assuming the answer.
- Do not comment on style, naming or formatting.
- If the diff is empty or unreadable, say so and stop. Do not invent a change to review.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk level
`low`, `medium` or `high`, then one sentence saying why.
## Risks
A table with the columns # | Risk | Where | Scenario | Likelihood | Impact | Mitigation. Highest risk first, at most 8 rows. Write "None found" when there are none.
## Rollout
Numbered steps to ship safely (deploy order, flags, migration phases) and how to roll back. Two lines are enough for a low-risk change.
## Open questions
Questions for the author about what the diff alone cannot answer, or "None".
</output_format>
