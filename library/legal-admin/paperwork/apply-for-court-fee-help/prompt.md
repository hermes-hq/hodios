---
schema: 1
id: apply-for-court-fee-help
kind: prompt
title: Apply for court fee help
description: Checks whether you may get court or tribunal fees reduced or waived because of low income or benefits, and prepares the application, evidence and timing so the case is not delayed.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [court-fees, fee-waiver, fee-remission, legal-costs, low-income]
pairs_with:
  prompts: [prepare-small-claims-case, find-free-legal-help, prepare-to-self-represent]
args:
  - name: case
    description: The kind of court or tribunal case (small claim, divorce, eviction defence, employment tribunal, appeal) and what fee you face, and any deadline for filing.
    type: text
    required: true
  - name: finances
    description: Household income, any benefits received, savings, and dependants. Approximate figures are fine.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region where the case is.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Likely position, Application, Evidence, Timing and deadlines, If refused, Confirm with the court]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many court systems reduce or waive fees for people on low incomes or certain benefits: a fee remission or help-with-fees scheme in some countries, a fee waiver or in forma pauperis application in US courts, and legal aid that covers fees in others. Tests usually look at household income, savings above a threshold and sometimes the number of dependants; receiving a means-tested benefit often qualifies automatically. Applications go wrong on timing more than on eligibility: a limitation period or appeal deadline keeps running while a fee application is processed unless the claim is filed with the fee application, and some schemes allow a refund of fees paid recently. Partners' income is often counted. False statements are taken seriously and can be checked against tax and benefit records.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Case:
<case>
{{case}}
</case>

Finances:
<finances>
{{finances}}
</finances>

1. Likely position: the kind of fee help that typically exists in {{jurisdiction}} for this case type, which test applies (benefit route, income and savings test), and a cautious indication of whether the person may qualify fully, partly or not, all marked verify. Do not give a definite answer.
2. Application: the typical form or route, whether it is filed with the claim or before, who in the household's finances must be included, and how to answer questions accurately.
3. Evidence: benefit award letters, payslips, bank statements, dependants' details, and what period they must cover, marked verify.
4. Timing and deadlines: how to protect any limitation or appeal deadline while the fee application is decided, and whether a refund of recently paid fees can be claimed.
5. If refused: how to ask for reconsideration or appeal the decision, and other sources of help (legal aid, law clinics, unions, legal expenses insurance).
6. Confirm with the court: questions to ask the court office or official site.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state thresholds, amounts or eligibility as fact; mark them verify on the official court site.
- Never suggest leaving out a partner's income, savings or other information the form asks for; explain that false statements can lead to penalties.
- If a deadline is close, put protecting it first and suggest urgent free legal help.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely position
Short paragraph, marked verify.

## Application
Numbered steps.

## Evidence
Checklist.

## Timing and deadlines
Bullets.

## If refused
Bullets.

## Confirm with the court
Numbered questions.
</output_format>
