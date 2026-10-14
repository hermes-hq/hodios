---
schema: 1
id: review-state-transition-logic
kind: prompt
title: Review status transition logic in a diff
description: Reviews code that changes record statuses for illegal transitions, missing guards, races between concurrent updates and side effects that run twice or never.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
requires: [none]
inputs: [diff, spec]
output: [report, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [state-machines, workflow-status, race-conditions, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [implement-state-machine, review-diff-for-concurrency-bugs]
args:
  - name: diff
    description: The change, with file paths, including every place that writes the status field if you can find them.
    type: text
    required: true
  - name: rules
    description: The intended lifecycle, for example "draft -> submitted -> approved or rejected; only approved can be paid; paid is final".
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Transition table, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most business records have a lifecycle (orders, invoices, tickets, subscriptions, applications) even when the code has no state machine, just `status = "shipped"` scattered across handlers. The bugs are predictable: a transition allowed from a state it should not be (refund a cancelled order, approve a draft); a guard checked in the UI but not the API; two requests racing so an order is both cancelled and shipped because each read "paid" and wrote its own status; a side effect (email, charge, stock release) tied to the request instead of the transition, so a retry sends it twice; a new status added to the enum but not to every switch, so it falls through to a default branch; terminal states that can be left; and status changes with no timestamp or actor, so nobody can tell what happened. The fix is usually a conditional update (`UPDATE ... SET status='shipped' WHERE id=? AND status='paid'`) or a version check, with effects triggered only when the update actually changed a row.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. Find every place the change (and, if you can read the repository, the rest of the codebase) writes the status field. Build the transition table actually implemented: from state, to state, trigger, guard, side effects.
2. Compare with the intended lifecycle. If no rules were given, infer them from names and code, state your inference, and ask the author to confirm.
3. Check legality: transitions missing a from-state guard, guards only in the client, terminal states that can be left, states that can never be reached or left.
4. Check concurrency: read-check-write sequences that two requests or a request and a job can interleave; whether the write is conditional on the expected current state or a version.
5. Check side effects: are they tied to a successful transition (row actually changed), inside or after the commit, idempotent on retry; do any fire on a no-op transition.
6. Check completeness: new statuses handled in every switch, filter, report and UI mapping; default branches that silently accept unknown states.
7. Check history: whether transitions record when, who and why where the domain needs an audit trail.
8. For each finding, give the sequence that reaches the bad state and the fix.
</task>

<constraints>
- Every finding includes a concrete sequence (which request, in which state, in which order) and the resulting bad state.
- Do not invent business rules; when the intended lifecycle is unclear, ask.
- Prefer conditional updates or the codebase's existing state machine helper over adding a new library.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Transition table
Table: from, to, trigger, guard, side effects, matches rules (yes/no/unknown). Optionally a Mermaid state diagram.
## Findings
Numbered: severity, `path:line`, sequence, bad state, fix.
## Tests to add
Bullets: illegal transition, concurrent transition and retry tests.
</output_format>
