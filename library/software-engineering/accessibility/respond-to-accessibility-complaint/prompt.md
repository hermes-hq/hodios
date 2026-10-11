---
schema: 1
id: respond-to-accessibility-complaint
kind: prompt
title: Turn an accessibility complaint into a verified fix plan
description: Turns a user's accessibility complaint or a formal demand into a verified list of issues, a remediation plan with priorities and a factual draft reply for review, without legal positions.
category: accessibility
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [frontend-engineer, engineering-manager, product-manager, support-agent]
requires: [repo-read]
inputs: [message, document, repo, text]
output: [report, plan, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [complaint-handling, remediation-plan, demand-letter, user-reports, triage]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [write-accessibility-bug-report, prioritize-accessibility-findings, write-accessibility-statement, write-screen-reader-test-plan]
args:
  - name: complaint
    description: The complaint, support ticket, email or letter text, with personal details removed or minimised.
    type: text
    required: true
  - name: context
    description: The product and pages or flows mentioned, the codebase or any audit results, and who will send the reply (support, product, legal).
    type: text
output_contract:
  format: markdown
  sections: [What is being reported, Verification steps and findings, Remediation plan, Draft reply for review, Escalation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An accessibility complaint is usually the most valuable bug report a team will get: a real person describing where they were blocked. The engineering job is to turn it into specific, reproducible issues, verify each one, fix what blocks people first and give the person a way to complete their task now. Complaints arrive in two forms. A user message ("I can't check out with my screen reader") needs quick reproduction with the same assistive technology where possible, a workaround (phone order, an alternative form, assisted completion), and a reply within days. A formal demand letter or regulator notice usually lists WCAG criteria and pages, sometimes from automated scans with false positives, and comes with legal risk: the reply is a legal matter and must go through counsel, while engineering supplies accurate findings and a credible plan. In both cases, replies should acknowledge the barrier, avoid arguing about the person's experience, avoid promises of dates the team cannot meet and never claim full conformance.
</context>

<task>
Turn this complaint into a verified issue list and plan.

<complaint>
{{complaint}}
</complaint>
{{#context}}
<context_notes>
{{context}}
</context_notes>
{{/context}}

1. Say whether this reads as a user report or a formal legal demand. If it looks like a legal demand, state at the top that the reply and any position on liability must be handled by legal counsel, and that the rest of this output is technical input for them.
2. Extract each reported barrier: page or flow, what the person was trying to do, assistive technology or setting mentioned, and the WCAG criterion it likely maps to. Mark which are specific and which are vague.
3. For each barrier, write verification steps (keyboard, the named assistive technology, zoom, scanner) and, where the codebase is available, inspect the relevant code. Record each as confirmed, not reproduced (with what was tried), or needs the person's details.
4. Check for related issues in the same components, since a barrier in one form field usually repeats across forms.
5. Propose an immediate workaround so the person can complete their task now, and a remediation plan ordered by whether people are blocked, with design-system fixes first and a retest step.
6. Draft a short, factual reply for review: thank them, restate the barrier in plain words, say what is being done and the workaround, invite more detail with specific questions, and give a contact. No legal statements, no conformance claims, no dates unless the user supplies them.
7. List escalation notes: who must review the reply, records to keep (what was reported, when, what was done), and whether the accessibility statement needs updating.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give legal advice, assess liability, or suggest settlement or litigation positions.
- Do not dismiss reported barriers because a scanner passes.
- Do not include or repeat more personal data than needed to fix the issue.
- Read-only: inspect code and propose fixes; do not change code in this run.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What is being reported
Table: barrier | page or flow | assistive technology | likely WCAG criterion | specific or vague.

## Verification steps and findings
Per barrier: steps, result (confirmed, not reproduced, needs details), evidence.

## Remediation plan
Immediate workaround, then numbered fixes by priority.

## Draft reply for review
The message text, marked as a draft.

## Escalation notes
Bullets.
</output_format>
