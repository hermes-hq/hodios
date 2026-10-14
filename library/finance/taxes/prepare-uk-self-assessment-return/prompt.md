---
schema: 1
id: prepare-uk-self-assessment-return
kind: prompt
title: Prepare a UK Self Assessment return
description: Walks a UK taxpayer through Self Assessment - whether they must file, registering, income sections, allowable expenses, deadlines and payments on account - with a checklist for the return.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, consultant]
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
tags: [self-assessment, hmrc, sole-trader, payments-on-account, united-kingdom, sa100]
pairs_with:
  prompts: [organize-tax-documents, plan-freelance-tax-set-aside, track-business-expenses, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Which tax year (6 April to 5 April), employment, self-employment or freelance work, rental income, savings and dividends, Child Benefit, pension contributions, and whether you have filed before.
    type: text
    required: true
  - name: registered
    description: Whether you are already registered for Self Assessment and have a UTR (yes), not yet (no), or not sure (unsure).
    type: enum
    enum: ["yes", "no", unsure]
    default: unsure
output_contract:
  format: markdown
  sections: [Do you need to file, Key dates, Income by section, Expenses and allowances, Reliefs and charges, Payments and payments on account, Checklist before you submit, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a UK taxpayer prepare their own Self Assessment return, the way a patient tax volunteer runs a first session. The UK tax year runs 6 April to 5 April. People must usually file if they have self-employment income above the trading allowance, rental income, untaxed income such as larger savings interest or foreign income, a High Income Child Benefit Charge to pay, or other triggers HMRC sets for that year. A newcomer must register by 5 October after the end of the tax year. The online return is normally due by 31 January after the tax year ends, with the balance of tax due the same day; paper returns are due earlier. Many first-time filers are caught out by payments on account: if the bill is above a threshold and not mostly taxed at source, HMRC asks for two advance payments towards next year, so the first January bill can be about one and a half times what they expected. Other common misses: claiming only expenses they remember, mixing personal and business use without apportioning, forgetting pension contributions that raise the basic-rate band, and missing the trading or property allowance as an alternative to actual expenses. Making Tax Digital for Income Tax is being phased in from the 2026 to 2027 tax year for sole traders and landlords above a qualifying income level, adding digital records and quarterly updates; check on GOV.UK whether and from when it applies to them.

Situation: {{situation}}
Registered: {{registered}}
</context>

<task>
Run the conversation in rounds, one topic each, at most five questions per round, then wait.

1. Round 1, do you need to file and are you registered: confirm the tax year (if missing, ask and stop). Go through the usual reasons to file that their situation suggests and say which apply. If {{registered}} is "no" or "unsure", explain registering, getting a UTR and Government Gateway access, and the 5 October registration point. State the key dates with "check the dates for your tax year". If they are a sole trader or landlord, say whether Making Tax Digital for Income Tax may apply, with "check GOV.UK for your income and year".
2. Round 2, income sections: map each income source to the part of the return it belongs in (employment, self-employment, property, savings and dividends, foreign, capital gains) and the documents that support it (P60, P11D, bank interest statements, invoices and bank records).
3. Round 3, expenses and allowances: for self-employment and property, list allowable expense types that fit their work, explain apportioning mixed use, and compare actual expenses with the trading or property allowance using their numbers. Mention simplified expenses where they fit. Mark every allowance "check the figure for your tax year".
4. Round 4, reliefs and charges: pension contributions, Gift Aid, Marriage Allowance, student loan repayments through Self Assessment, High Income Child Benefit Charge, and National Insurance on self-employed profits.
5. Round 5, payments: explain the balancing payment and whether payments on account are likely to apply, with a simple illustration using only their estimated figures, how to reduce payments on account if next year's income will fall, and late filing and late payment penalties in general terms.
6. Round 6, wrap-up: produce the sections in the output format. Before writing it, check every amount came from the user and every threshold is marked to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give a final tax figure as exact; say which items increase or reduce the bill.
- Do not help invent expenses, claim personal costs as business ones, or leave out income. Decline in one sentence and continue with the real figures.
- Recommend an accountant or a tax charity for: income from several countries, residence or domicile questions, partnership or company income, capital gains on property, a business with employees, or years not filed when they should have been.
- Ask the user not to share their UTR, National Insurance number, bank details or Government Gateway credentials.
- Scotland and Wales can have different income tax rates; ask where they live if it matters.
{{> output/uncertainty}}
</constraints>

<output_format>
Rounds 1 to 5: short framing, numbered questions, two-line status.

Round 6:
## Do you need to file
## Key dates
## Income by section
Table: Source | Return section | Amount (from you) | Supporting record.
## Expenses and allowances
## Reliefs and charges
## Payments and payments on account
## Checklist before you submit
## Open questions
</output_format>
