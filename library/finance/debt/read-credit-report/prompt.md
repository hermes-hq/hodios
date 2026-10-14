---
schema: 1
id: read-credit-report
kind: prompt
title: Read and check your credit report
description: Walks through your credit report section by section - personal details, accounts, payment status codes, searches and public records - explaining each part and flagging what to check or dispute.
category: debt
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [credit-file, payment-status, hard-search, identity-fraud, report-check]
pairs_with:
  prompts: [dispute-credit-report-error, improve-credit-score, prepare-mortgage-application]
args:
  - name: report
    description: Your credit report or the parts you want explained, pasted as text. Remove or mask account numbers, full date of birth and identity numbers before pasting.
    type: text
    required: true
  - name: concerns
    description: Anything that worries you or you do not recognise, and why you pulled the report (for example a refused application or an upcoming mortgage).
    type: text
  - name: country
    description: Country, because report formats, status codes and how long items stay vary.
    type: string
output_contract:
  format: markdown
  sections: [What this report is, Section by section, Items to check, Possible errors or fraud, What helps and what hurts, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain a credit report in plain language and help the person spot what needs checking. Reports from different bureaus and countries look different, but most contain the same parts: personal details and addresses, linked people (financial associates in some countries), accounts with limits or balances and a month-by-month payment history, status codes (up to date, late by 30, 60 or 90 days, arrangement, default, settled, charged off), searches or inquiries (hard ones made for applications, soft ones visible only to the person), and public records such as court judgments or insolvency. People commonly misread several things: a score shown by a free service is a guide made by that service, not what lenders use; a report is not the same at every bureau, so an item can appear on one and not another; a settled or partially settled debt still shows; a closed account can stay for years; old addresses and an ex-partner still linked can affect applications; and unfamiliar accounts or hard searches can be a sign of identity fraud. How long items stay varies by country and item type.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Report:

<report>
{{report}}
</report>
{{#concerns}}

Concerns:

<concerns>
{{concerns}}
</concerns>
{{/concerns}}

1. Say what kind of report this appears to be (bureau or service, full report or summary) and what it does and does not show. If the paste contains unmasked account numbers or identity numbers, remind them to mask these in future.
2. Go through it section by section, explaining what each part and each status code means for the entries they gave.
3. List items to check, in a table: each account or entry, what it says, whether it looks right based on what they told you, and what to check against their own records (balances, dates opened and closed, payment status, addresses, linked people).
4. Flag possible errors or fraud: accounts or searches they do not recognise, wrong late markers, debts shown twice (original lender and collector both showing a balance), items older than local time limits, and wrong links to other people. For suspected fraud, give the first steps (contact the lender, the bureau, and a fraud report route in their country) without inventing names of agencies.
5. Explain which items help and which hurt their creditworthiness in general terms, and how long each typically stays, marked as typical and to confirm locally.
6. Next steps: check the other bureaus, what to dispute and with whom, and what to watch over the next few months.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not guess what a lender will decide or predict an exact score.
- Do not invent the meaning of a code or abbreviation you are not sure of; say it is unclear and how to find out (the bureau's key or help pages).
- Never suggest disputing accurate negative information as if it were wrong, or using credit repair firms that promise to remove accurate items.
- Do not repeat full personal identifiers back in the answer.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this report is
Two or three sentences.

## Section by section
Short subsections in the report's order.

## Items to check
Table: entry | what it says | looks right? | check against.

## Possible errors or fraud
Bullets with first steps.

## What helps and what hurts
Two short lists.

## Next steps
Checklist.
</output_format>
