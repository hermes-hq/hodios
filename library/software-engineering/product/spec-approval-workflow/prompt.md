---
schema: 1
id: spec-approval-workflow
kind: prompt
title: Specify an approval workflow
description: Specifies a multi-step approval process in a product, with approval rules and thresholds, approver selection, delegation and absence, escalation, rejection and resubmission, and edits after approval.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [approvals, routing-rules, delegation, requirements]
pairs_with:
  prompts: [spec-record-status-lifecycle, spec-roles-and-permissions, implement-state-machine]
args:
  - name: process_description
    description: What gets approved (purchase requests, leave, content, discounts...), by whom today, and the rules people follow.
    type: text
    required: true
  - name: context
    description: Organisation shapes the product must support, approval policies customers configure, audit needs.
    type: text
output_contract:
  format: markdown
  sections: [Approval rules, Routing, Actions per step, Exceptions, Notifications and audit, Worked examples, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Approval features fail on the organisational reality around the happy path. The manager is on leave, the approver left the company, the request was edited after approval, the requester is also the approver, the amount sits exactly on a threshold, two approvers must both agree or any one is enough, or the org chart changed while a request was pending. Customers also need audit evidence: who approved which version, when, and on what basis. A good approval spec fixes the rule model (thresholds, sequential or parallel steps, all or any), how approvers are chosen and re-chosen, separation of duties, what each action does at each step, timeouts and escalation, and what happens when an approved request changes.
</context>

<task>
<process>
{{process_description}}
</process>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Write the approval rules: what triggers approval, thresholds with inclusive or exclusive boundaries, sequential or parallel steps, all-of or any-of, and whether customers can configure rules and within what limits.
2. Specify routing: how each approver is determined (named person, role, manager chain, budget owner), the snapshot moment (at submit or at each step), what happens when an approver is missing, deactivated or changes role, and separation of duties (no self-approval, requester not in the chain).
3. Specify the actions per step for requester and approver: approve, reject with reason, request changes, delegate, withdraw, comment; and what each does to the request and to earlier approvals.
4. Specify exceptions: absence and delegation, timeouts and escalation, edits after partial or full approval (which changes reset approvals), urgent overrides, and bulk approval.
5. Specify notifications and audit: who is notified at each event, reminders, and the audit record (who, when, which version, reason).
6. Give worked examples with concrete people and amounts, including a threshold boundary, an absent approver and an edit after approval.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not invent a customer's internal policy amounts or legal signing authority; use placeholders or the user's numbers.
- Every approval must be tied to the exact version approved; edits never silently keep old approvals for changed content.
- Self-approval must be explicitly allowed or blocked, never left open.
- If the process description lacks who approves, ask before designing routing.
</constraints>

<output_format>
## Approval rules
Numbered rules, including boundary handling.
## Routing
Bullets.
## Actions per step
Table: action, who, effect on request, effect on prior approvals.
## Exceptions
Table: exception, behaviour.
## Notifications and audit
Bullets.
## Worked examples
Numbered scenarios with expected outcome.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
