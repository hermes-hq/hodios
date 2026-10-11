---
schema: 1
id: check-contractor-tax-status
kind: prompt
title: Check employee or contractor status
description: Applies the factors that decide whether a worker is an employee or a contractor for tax to a real engagement, shows which way it leans and drafts questions for an adviser.
category: taxes
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder, manager]
requires: [none]
inputs: [text, document]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employment-status, misclassification, self-employment, contractors]
pairs_with:
  prompts: [plan-first-hire, review-contractor-agreement, plan-freelance-tax-set-aside]
  personas: [tax-educator]
args:
  - name: engagement
    description: How the work actually runs - who sets hours and methods, where it happens, whose equipment, whether you can send someone else, how you are paid, how long it lasts, other clients, and what the contract says. Remove names.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) whose tax rules apply.
    type: string
    required: true
  - name: perspective
    description: Whether you are the worker or the business engaging the worker.
    type: enum
    enum: [worker, hirer]
    default: worker
output_contract:
  format: markdown
  sections: [Factors applied, Which way it leans, What changes if it is misclassified, Ways the arrangement could change, Questions for an adviser, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone test whether a working arrangement looks like employment or genuine self-employment for tax purposes. The label in the contract does not decide it; authorities look at how the work really happens. Common factors across countries: control (who decides how, when and where the work is done); personal service and the right to send a substitute; mutuality of obligation (is work offered and accepted continuously); integration into the business (company email, line manager, appraisals, team rotas); financial risk (own equipment, fixed-price jobs, fixing mistakes at own cost, chance of profit or loss); working for several clients and marketing to the public; and length and exclusivity. Some places use a multi-factor balance, others a stricter test that presumes employment unless conditions are met, and the tests for tax, social contributions and employment rights can differ. Misclassification can mean back taxes, contributions, interest and penalties, mostly for the business, and lost rights and benefits for the worker.

Country: {{country}}
Perspective: {{perspective}}
</context>

<task>
The engagement:

<engagement>
{{engagement}}
</engagement>

1. Apply each factor to the facts given: what the facts show, whether it points to employment or self-employment, and how strong the signal is. Where a fact is missing, say what would change the answer.
2. Say which way the arrangement leans overall and how firmly, without giving a ruling. Name the official test or tool used in {{country}} if you are confident of it, marked "verify".
3. Explain what changes if the arrangement is misclassified, from the stated perspective: who is liable for tax and contributions, likely look-back exposure, interest and penalties in general terms, and the worker's rights and benefits.
4. Ways the arrangement could change, if the facts genuinely change: the practical differences that matter (control, substitution, equipment, payment by project, other clients). Say clearly that changing paperwork without changing how the work happens does not change status.
5. Questions for an adviser or the tax authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a definitive status ruling; status depends on all the facts and the authority's tests. Recommend an employment or tax adviser for borderline or high-value cases.
- Never invent tests, thresholds, penalties or tool names. Mark country-specific points "verify".
- Do not help disguise employment as self-employment, for example by drafting sham substitution clauses that will never be used.
- Treat both perspectives fairly; note where the worker and business interests differ.
{{> output/uncertainty}}
</constraints>

<output_format>
## Factors applied
Table: factor | what the facts show | points to | strength.

## Which way it leans
Two or three sentences.

## What changes if it is misclassified
Bullets from the stated perspective, plus a line on the other side.

## Ways the arrangement could change
Bullets.

## Questions for an adviser
Up to six questions.

## Points to verify
Bullets with where to check each.
</output_format>
