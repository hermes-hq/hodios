---
schema: 1
id: write-management-response-to-audit
kind: prompt
title: Write management responses to audit findings
description: Writes management responses to internal or external audit findings, with agreement or a reasoned disagreement, root cause, a specific action, an owner and a realistic date for each finding.
category: business-writing
version: 1.0.0
status: incubating
stage: [review, plan]
role: [manager, operations-manager, executive, consultant]
requires: [none]
inputs: [document, notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [audit-response, management-action-plan, audit-findings, corrective-action, governance]
pairs_with:
  prompts: [write-internal-audit-report, write-a3-report, answer-farm-audit-findings]
args:
  - name: findings
    description: The audit findings as written by the auditor, with their ratings and recommendations. Paste the text.
    type: text
    required: true
  - name: management_view
    description: What you know about each finding, such as whether you agree, causes, what is already being fixed, constraints, who could own the action and realistic dates.
    type: text
    required: true
  - name: audit_type
    description: Which kind of audit, for example internal audit, external financial audit, ISO certification audit or regulator inspection. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Management responses, Risks in these responses, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Management responses become commitments that the audit committee and auditors will track, so they must be specific enough to verify and realistic enough to meet. Experienced heads of internal audit see the same weak responses: "Agreed, we will review the process" (no action), dates that slip because nobody checked capacity, owners who are committees instead of named roles, actions that fix the instance but not the cause, and defensive disagreements without evidence. Strong responses state agreement plainly, address the root cause, define a specific action and the evidence of completion the auditor can test, name one accountable owner, and set a date in proportion to the finding's rating. Disagreement is legitimate when supported by facts or a deliberate risk acceptance, which should be stated as such and escalated to whoever can accept that risk.
</context>

<task>
Write management responses{{#audit_type}} for this {{audit_type}}{{/audit_type}}.

<findings>
{{findings}}
</findings>

<management_view>
{{management_view}}
</management_view>

1. If no findings are given, ask for them in one short message and stop.
2. For each finding, keep its number, title and rating as the auditor wrote them.
3. Response position: agreed, partially agreed, or not agreed. For partial or not agreed, state the facts or the risk acceptance basis from the management view; if the management view gives no basis, recommend agreeing or gathering evidence, and say so under Risks.
4. Root cause from management's perspective, if known, in one or two sentences.
5. Action: specific steps that address the cause, not only the instance. Include interim mitigation for high-rated findings if the full fix will take time.
6. Owner: one accountable role (name only if given). Date: from the management view, or `[NEEDED: date]`; flag any date that looks unrealistic for the scope or too long for the rating.
7. Evidence of completion the auditor could test.
8. Summarise across findings: common causes, any actions that fix several findings, and capacity concerns.
</task>

<constraints>
- Use only facts given. Never invent completed work, dates, owners or evidence.
- No vague verbs ("review", "consider", "enhance") without a concrete output.
- Do not argue with a finding without a factual basis from the management view.
- Do not commit the organisation to more than the management view supports; mark proposed actions as proposed.
</constraints>

<output_format>
## Management responses
One block per finding: Finding (number, title, rating); Response (position); Root cause; Action; Owner; Target date; Evidence of completion. Then a summary table (Finding · Position · Owner · Date).
## Risks in these responses
Responses likely to be challenged, dates likely to slip, and risk acceptances that need sign-off.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
