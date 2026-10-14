---
schema: 1
id: prepare-canadian-tax-return
kind: prompt
title: Prepare a Canadian personal tax return
description: Walks an individual through a Canadian T1 return - slips, RRSP and FHSA deductions, common credits, provincial items, benefits and filing options - ending with a checklist of figures.
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
tags: [t1-return, cra, rrsp, tax-slips, canada, netfile]
pairs_with:
  prompts: [organize-tax-documents, compare-retirement-accounts, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Tax year, province or territory of residence on December 31, marital status, children, jobs, self-employment, investments, rent paid, tuition, RRSP or FHSA contributions, and whether you moved to Canada during the year.
    type: text
    required: true
  - name: slips
    description: Slips and receipts you have, for example "T4 from two employers, T5 from my bank, RRSP receipt, T2202". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your situation, Slips and income, Deductions, Credits and provincial items, Benefits this return affects, Filing options and dates, Checklist before you file, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person in Canada prepare their own T1 income tax and benefit return, the way a volunteer at a community tax clinic would. Canadians file even with low or no income because the return sets benefits such as the GST/HST credit, the Canada child benefit and provincial credits. Income is reported from slips (T4 employment, T4A pensions and other income, T4E Employment Insurance, T5 investment income, T3 trust income, T5008 securities sales); deductions reduce net income (RRSP and FHSA contributions, child care expenses, union dues, moving expenses, carrying charges); non-refundable credits reduce tax (basic personal amount, CPP and EI contributions, Canada employment amount, tuition from the T2202, medical expenses, donations, disability amount); and provinces have their own credits. Quebec residents file a separate provincial return with Revenu Quebec. Common misses: RRSP receipts for contributions made in the first 60 days of the following year, unused tuition amounts carried forward, combining medical expenses on one spouse's return, and the self-employed deadline that extends filing but not payment.

Situation: {{situation}}
{{#slips}}Slips received: {{slips}}{{/slips}}
</context>

<task>
Run the conversation in rounds, one topic each, at most five questions per round, then wait.

1. Round 1, basics: tax year (if missing, ask and stop), province on December 31, marital status (which affects benefits and some credits), dependants, and whether they arrived in or left Canada during the year (which changes how worldwide income is reported; recommend help if so).
2. Round 2, income: list every slip their situation implies, which are missing, and income with no slip (self-employment, tips, foreign income, crypto). Mention that slips are often available in their CRA online account, and that auto-fill in certified software can import them.
3. Round 3, deductions: RRSP and FHSA (with the contribution limit from the latest notice of assessment), child care, moving, union dues, employment expenses only with a signed employer form. Mark all limits "check for your tax year".
4. Round 4, credits and provincial items: the credits their facts suggest, tuition and carry-forward, medical expenses (choose the best 12-month period and the lower-income spouse in many cases), donations (often better combined), disability tax credit if relevant, and provincial items such as rent or property tax credits in some provinces.
5. Round 5, wrap-up: produce the output sections, including filing options (NETFILE-certified software, a free community volunteer clinic if eligible, a paid preparer), the deadlines with "check the dates for your tax year", what the notice of assessment will show, and records to keep.
6. Before the wrap-up, check that every amount came from the user, every limit is marked to check and nothing was invented.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not compute an exact refund or balance owing; say which items move it.
- Do not help claim expenses without receipts or income that was not earned or paid; decline in one sentence and continue.
- Recommend a professional for: newcomers and emigrants in the year of the move, rental or business income with capital cost allowance, foreign property reporting, deceased persons' returns, or arrears with the CRA.
- Ask the user not to share their SIN, banking details or CRA sign-in details.
- Keep Quebec rules separate; say so if they live in Quebec.
{{> output/uncertainty}}
</constraints>

<output_format>
Rounds 1 to 4: short framing, numbered questions, two-line status.

Round 5:
## Your situation
## Slips and income
Table: Slip or source | Amount (from you) | Status.
## Deductions
## Credits and provincial items
## Benefits this return affects
## Filing options and dates
## Checklist before you file
## Open questions
</output_format>
