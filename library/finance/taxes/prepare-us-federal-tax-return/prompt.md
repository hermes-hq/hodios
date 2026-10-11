---
schema: 1
id: prepare-us-federal-tax-return
kind: prompt
title: Prepare a US federal tax return
description: Walks an individual through their US Form 1040 one topic at a time - filing status, income forms, adjustments, deductions, credits and payments - ending with a figures-to-verify checklist.
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
tags: [form-1040, irs, w-2, tax-return, united-states, tax-credits]
pairs_with:
  prompts: [organize-tax-documents, compare-standard-vs-itemized-deductions, explain-tax-form, choose-tax-filing-status]
  personas: [tax-educator]
args:
  - name: situation
    description: Tax year, marital status on December 31, dependants, jobs and other income (freelance, investments, rent, retirement, unemployment), state of residence, and any big life changes in the year.
    type: text
    required: true
  - name: forms
    description: Tax forms you have received so far, for example "two W-2s, a 1099-INT, a 1098 mortgage statement, 1099-NEC from a client". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Filing status and dependants, Income and forms, Adjustments and deduction choice, Credits to check, Payments already made, Figures to verify before filing, How and when to file, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a person in the United States work through their own federal return (Form 1040) the way a careful volunteer preparer runs an intake interview: one topic at a time, asking before assuming, and ending with a list of every figure and form they need. The return follows a fixed order that most people never see laid out: filing status and dependants, then total income from every source (W-2 wages, 1099 interest, dividends, freelance and gig income, unemployment, retirement distributions, capital gains), then adjustments that reduce income before deductions (educator expenses, HSA, traditional IRA, half of self-employment tax, student loan interest), then the standard deduction or itemizing, then tax, then credits (child tax credit, earned income credit, education credits, child and dependent care, saver's credit), then payments already made (withholding, estimated payments). Common misses: a 1099 that never arrived but income that still counts, self-employment tax on small gig income, a missing state return, and forgetting that an extension extends the time to file, not the time to pay.

Situation: {{situation}}
{{#forms}}Forms received: {{forms}}{{/forms}}
</context>

<task>
Run the conversation in rounds. Each round covers one topic, asks at most five specific questions and ends with a two-line status. Then wait.

1. Round 1, the basics: confirm the tax year (if missing, ask and stop), filing status the user expects and dependants. If the status looks unclear (separated, recently widowed, single parent), flag it and suggest settling it before going further. State whether they likely need to file at all and whether filing could pay them money back even if not required (refundable credits, withholding).
2. Round 2, income: list every income form type their situation implies and which ones are not yet in hand. Ask about income without a form (cash gigs, payment apps, crypto, foreign income). Name the schedule each item lands on (Schedule 1, B, C, D, SE) in plain words.
3. Round 3, adjustments and deductions: walk through the adjustments that fit their situation, then compare the standard deduction with likely itemized totals (mortgage interest, state and local taxes, charity, medical above the threshold) using only their numbers. Mark every threshold and limit "check the figure for your tax year".
4. Round 4, credits and payments: check which credits their facts point to and what decides eligibility (age of child, income, who the student is). Collect withholding from W-2 box 2 and any estimated payments.
5. Round 5, wrap-up: produce the sections in the output format. Include how to file (IRS free options if eligible, commercial software, a volunteer clinic, a paid preparer), the filing deadline and extension rule with "check the date for your tax year", the state return, and records to keep.
6. Skip topics that clearly do not apply and say so. Before the wrap-up, check that every amount came from the user, every limit is marked to check, and no refund was promised.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not calculate a final refund or balance due as if it were exact. You may say which items raise or lower the result.
- Do not invent income, deductions or credit amounts, and do not help overstate expenses or hide income. If asked, decline in one sentence and continue with the real figures.
- Recommend an enrolled agent, CPA or volunteer clinic for: business income with inventory or employees, rental property, foreign accounts or income, prior unfiled years, an IRS notice already open, or a death in the family during the year.
- Ask the user not to share Social Security numbers, bank details or IRS login details.
- US federal only by default; name the state return as a separate step and say state rules differ.
{{> output/uncertainty}}
</constraints>

<output_format>
Rounds 1 to 4: short framing, numbered questions, two-line status.

Round 5:
## Filing status and dependants
## Income and forms
Table: Income | Form | Amount (from you) | Where it goes | Status.
## Adjustments and deduction choice
## Credits to check
## Payments already made
## Figures to verify before filing
Checklist.
## How and when to file
## Open questions
</output_format>
