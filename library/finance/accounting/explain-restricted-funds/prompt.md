---
schema: 1
id: explain-restricted-funds
kind: prompt
title: Explain restricted funds
description: Explains restricted, unrestricted, designated and endowment funds for a nonprofit, how to track and report them, and how to avoid misusing grant money, applied to the user's own grants.
category: accounting
version: 1.0.0
status: incubating
stage: [learn, operate]
role: [executive, operations-manager, founder]
requires: [none]
inputs: [text, document]
output: [explanation, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
subject: [nonprofit]
tags: [charity-accounting, restricted-funds, grant-management, fund-accounting]
pairs_with:
  prompts: [explain-accounting-concept, set-up-chart-of-accounts, prepare-month-end-close]
args:
  - name: organisation_type
    description: The kind of organisation and where it is registered, for example a registered charity in England, a US 501(c)(3), a community group or a social enterprise. Optional.
    type: string
  - name: grants
    description: The grants or donations you hold, with any conditions in the grant letters (purpose, time period, matching, reporting, return of unspent funds). Optional; without it, the explanation uses a worked example.
    type: text
output_contract:
  format: markdown
  sections: [The four kinds of funds, Your grants, Tracking setup, Shared costs, Monthly routine, Reporting, Red lines, Questions for your accountant or auditor]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain fund accounting to a nonprofit treasurer, director or new finance person who needs to get it right without an accounting degree. The core idea is simple: money given for a specific purpose or period must be spent on that purpose, tracked separately, and reported. The mistakes are common and serious: using a restricted grant to cover payroll during a cash squeeze, charging the same cost to two funders, letting shared costs land wherever is convenient, or treating board-designated reserves as if a donor had restricted them. These can mean repaying funders, qualified audit opinions or regulatory action.

Terms differ by framework: for example, US nonprofit accounting speaks of net assets with and without donor restrictions, while UK charity accounting speaks of restricted, unrestricted and endowment funds. Use the terms for the user's framework when you know it.

{{#organisation_type}}Organisation: {{organisation_type}}{{/organisation_type}}
</context>

<task>
{{#grants}}Grants and donations:

<grants>
{{grants}}
</grants>{{/grants}}

1. Explain the four kinds in plain language with one example each: unrestricted, designated (set aside by the board, still unrestricted and reversible), restricted (by purpose, time or both), and endowment (capital kept, sometimes only the income spent).
2. Classify each of the user's grants, or a worked example if none were given, quoting the condition that decides it. Mark any ambiguous wording as a question for the funder.
3. Describe the tracking setup: a fund or class code on every transaction, a grant register (funder, amount, purpose, period, spent to date, remaining, reporting dates), and budget versus actual per grant.
4. Explain how to allocate shared costs (rent, finance staff, insurance) fairly: a documented, consistent method such as time records, floor area or headcount, applied every month, and what funders usually allow for overheads (verify in each grant letter).
5. Give a monthly routine and explain when restricted money is released (purpose fulfilled or period passed).
6. Cover reporting: what funders usually want, and how the annual accounts show funds.
7. List the red lines: spending outside purpose or period, borrowing between funds without approval and disclosure, double charging, and what to do if a line has been crossed (tell the funder early, restore the fund, record the decision).
8. End with questions for an accountant or auditor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Grant terms decide: say that the grant letter or agreement overrides any general rule here, and that unclear wording is a question for the funder.
- Mark framework- or country-specific rules "verify" unless you are confident they are current.
- If the user describes having already used restricted money for something else, explain the steps to put it right and recommend talking to the funder and an accountant; do not suggest hiding or reclassifying it after the fact.
- Keep explanations short and concrete; one example per concept.
{{> output/uncertainty}}
</constraints>

<output_format>
## The four kinds of funds
Table: kind | who sets the restriction | can it change | example.

## Your grants
Table: grant | kind | deciding condition | period | question for the funder.

## Tracking setup
Checklist, then the grant register columns.

## Shared costs
Short explanation and an example allocation.

## Monthly routine
Checklist.

## Reporting
Bullets.

## Red lines
Bullets, then the fix-it steps.

## Questions for your accountant or auditor
Numbered.
</output_format>
