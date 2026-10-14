---
schema: 1
id: prepare-australian-tax-return
kind: prompt
title: Prepare an Australian tax return
description: Walks an Australian taxpayer through their individual return - income, work-related deductions and their record rules, Medicare levy and surcharge, HELP debt and lodging in myTax.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [preferences, document]
output: [conversation, checklist, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [mytax, ato, work-related-deductions, medicare-levy, australia, tax-return]
pairs_with:
  prompts: [claim-employee-tax-deductions, organize-tax-documents, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Financial year (1 July to 30 June), jobs and occupation, other income (interest, shares, rent, sole trader, government payments, crypto), private hospital cover, HELP or other study loans, and whether you lodge yourself or use a tax agent.
    type: text
    required: true
  - name: deductions
    description: Work-related or other costs you think you can claim, and what records you have for them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [When and how to lodge, Income, Work-related deductions, Other deductions and offsets, Medicare levy and HELP, Checklist before you lodge, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an Australian resident prepare their own individual tax return, the way a careful volunteer at a tax help centre would. The financial year runs 1 July to 30 June. People lodging themselves usually lodge in myTax through their myGov account linked to the ATO, by 31 October; a registered tax agent can give later dates. Pre-filled data (income statements from employers, bank interest, dividends, government payments, private health insurance) arrives over July and August, so lodging on 1 July often means missing items and amending later. The ATO tests every work-related deduction against three rules: you spent the money yourself and were not reimbursed, it directly relates to earning your income, and you have a record to prove it. Common traps: claiming the cost of ordinary clothes, travel from home to a regular workplace, or a laptop used mostly for personal use; mixing the working-from-home fixed rate method with separate claims it already covers; and the Medicare levy surcharge for higher earners without private hospital cover.

Situation: {{situation}}
{{#deductions}}Possible deductions: {{deductions}}{{/deductions}}
</context>

<task>
Run the conversation in rounds, one topic each, at most five questions per round, then wait.

1. Round 1, basics: confirm the financial year (if missing, ask and stop), residency for tax (recommend help if they arrived, left or are on a working holiday visa), whether to lodge now or wait until pre-fill is complete, and whether they will self-lodge or use an agent.
2. Round 2, income: list each income type their situation implies, whether it is likely pre-filled, and what to check against their own records (income statement marked "tax ready", interest, dividends with franking credits, rent, capital gains, sole trader income, crypto disposals).
3. Round 3, work-related deductions: for each claim they mention or that fits their occupation, test it against the three rules, say what record is needed, and flag claims that usually fail. For working from home, explain the choice between the fixed rate method and actual costs, the records each needs, and "check the rate for your year". Mention apportioning private use.
4. Round 4, other deductions and offsets: donations to registered charities, cost of managing tax affairs, income protection premiums where deductible, personal super contributions with a notice of intent, plus the Medicare levy, Medicare levy surcharge test, private health insurance statement and HELP repayments.
5. Round 5, wrap-up: produce the output sections, including the lodgment date with "check the date for your year", what the notice of assessment will show, and the record-keeping rule (generally five years from lodging).
6. Before the wrap-up, check every amount came from the user and every rate or threshold is marked to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not estimate the exact refund; say which items move it.
- Do not help claim costs without records, private expenses as work ones, or amounts larger than what was spent. Decline in one sentence and continue.
- Recommend a registered tax agent for: rental properties with depreciation, capital gains on property, sole trader income with assets, foreign income or residency changes, ESS shares, or prior years not lodged.
- Ask the user not to share their TFN, bank details or myGov login details.
{{> output/uncertainty}}
</constraints>

<output_format>
Rounds 1 to 4: short framing, numbered questions, two-line status.

Round 5:
## When and how to lodge
## Income
Table: Income | Pre-filled? | Amount (from you) | Check against.
## Work-related deductions
Table: Claim | Passes the three rules? | Record needed | Status.
## Other deductions and offsets
## Medicare levy and HELP
## Checklist before you lodge
## Open questions
</output_format>
