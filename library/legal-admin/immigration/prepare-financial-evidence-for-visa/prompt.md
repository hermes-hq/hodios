---
schema: 1
id: prepare-financial-evidence-for-visa
kind: prompt
title: Prepare financial evidence for a visa
description: Checks bank statements, income and sponsor documents against a visa's stated financial requirement, flagging unexplained deposits, holding-period and source-of-funds gaps before filing.
category: immigration
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [individual, student, parent, job-seeker]
subject: [law]
requires: [none]
inputs: [text, dataset, document]
output: [table, checklist, report, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [proof-of-funds, financial-requirement, bank-statements, source-of-funds, sponsor-income]
pairs_with:
  prompts: [prepare-visa-application, write-visitor-invitation-letter, document-genuine-relationship, write-student-visa-study-plan]
args:
  - name: requirement
    description: The financial requirement as stated by the official guidance (amount, currency, whose funds count, how long funds must be held, which documents are accepted, how recent they must be). Copy it rather than paraphrasing.
    type: text
    required: true
  - name: finances
    description: A summary of the funds and income you will rely on, such as monthly balances, large deposits and their source, salary, the sponsor's relationship and income, loans or scholarships. Use amounts and dates only, no account numbers.
    type: text
    required: true
  - name: visa
    description: The country and visa. Optional if it is clear from the requirement.
    type: string
output_contract:
  format: markdown
  sections: [Requirement as given, Your funds against it, Red flags, Documents to provide, Explanations to include, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Financial evidence is one of the commonest reasons for refusal, and usually for technical reasons rather than lack of money. Typical problems: funds below the threshold on even one day of a required holding period, a large recent deposit with no explained source (officers read it as borrowed "funds parking"), statements older than the accepted window, funds in a sponsor's name without proof of the relationship and consent, income from self-employment or cash work without tax records, currency conversion at the wrong rate, or a mismatch between the amounts in the forms and the statements. Experts compare the evidence with the exact wording of the requirement, explain every large deposit with a document, and choose which funds to rely on rather than showing everything.

{{#visa}}Visa: {{visa}}{{/visa}}

<requirement>
{{requirement}}
</requirement>

<finances>
{{finances}}
</finances>
</context>

<task>
1. Requirement as given: restate the requirement as a checklist (amount, currency, whose funds, holding period, accepted documents, recency). If anything is ambiguous, say so and ask. Do not add requirements from memory; mark anything you think may also apply as "check whether this applies".
2. Your funds against it: for each source, the amount, whether it counts under the requirement as given, the holding period met or not (show the lowest balance in the period if data allows), and the total counted against the threshold. Convert currencies only with a rate the user supplies or mark [RATE], and note that the official guidance may say which rate to use.
3. Red flags: unexplained or recent large deposits, short holding periods, third-party funds without consent or relationship evidence, inconsistent amounts across documents, cash income without records, loans counted as savings.
4. Documents to provide: for each source, the documents that usually prove it (statements, letters from the bank, payslips, tax returns, sponsor declaration, proof of relationship, loan or scholarship letters), each to confirm against the accepted list.
5. Explanations to include: short factual notes for deposits or unusual items, each tied to a document.
6. Questions for an adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest borrowing money to park in an account to pass a check, altering statements, or hiding the source of funds. Decline and explain that officers look for this and it can lead to refusal for deception.
- Do not state thresholds, holding periods or accepted documents from memory as fact; use the requirement given.
- Show all arithmetic.
- Keep account numbers and identifiers out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirement as given
Checklist.
## Your funds against it
Table: Source | Amount | Counts? | Holding period met? | Counted toward threshold.
Then the total against the threshold.
## Red flags
## Documents to provide
## Explanations to include
## Questions for an adviser
</output_format>
