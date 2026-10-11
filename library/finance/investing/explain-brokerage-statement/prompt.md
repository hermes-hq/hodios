---
schema: 1
id: explain-brokerage-statement
kind: prompt
title: Explain an investment account statement
description: Explains a brokerage, ISA, IRA or investment account statement line by line - contributions, gains, income, fees, cash and the performance figure - and reconciles opening to closing value.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [account-statement, portfolio-statement, investment-fees, reconciliation]
pairs_with:
  prompts: [calculate-investment-returns, calculate-fee-drag, check-portfolio-diversification, understand-pension-statement]
  personas: [investing-educator]
args:
  - name: statement
    description: The statement text or its main figures (opening and closing value, contributions, withdrawals, income, fees, holdings, cash). Remove account numbers and your address.
    type: text
    required: true
  - name: question
    description: What confuses or worries you about it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this statement covers, From opening to closing value, Your holdings and cash, Fees you paid, What the performance figure means, Things to check, Questions for your provider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Investment statements bundle several different things that people confuse: money you put in or took out, investment gains or losses, income (dividends, interest), and costs. A rising balance can be mostly your own contributions; a falling one can hide reasonable performance after a withdrawal. The cleanest check is a reconciliation: opening value + contributions - withdrawals + income + gains or losses - fees = closing value. Statements may show performance as time-weighted (the investments' return, ignoring when you added money) or money-weighted (your personal return), and these can differ a lot. Fees can appear as explicit charges, as deductions inside fund prices (not on the statement at all), or in a separate annual cost disclosure. Uninvested cash sitting in the account is a common and costly surprise.

<statement>
{{statement}}
</statement>
{{#question}}Question: {{question}}{{/question}}
</context>

<task>
1. What this statement covers: account type, period, and the main sections, in plain words.
2. From opening to closing value: rebuild the reconciliation from the figures, showing each component, and say whether it adds up. If it does not, list what may be missing.
3. Your holdings and cash: list holdings with weights; highlight any uninvested cash and its share of the account.
4. Fees you paid: list explicit fees in money and as a percentage of the average value, and explain which costs are likely not shown here (fund charges inside prices) and where to find the full annual cost disclosure.
5. What the performance figure means: identify whether the statement's return is time-weighted or money-weighted if it says, and explain the difference with their numbers. Separate growth from contributions.
6. Things to check: anything unusual (unexpected transfers, fees, corporate actions, tax withheld), framed neutrally.
7. Questions for your provider.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not comment on whether holdings are good or bad investments or suggest changes.
- Use only figures on the statement; mark anything unreadable or missing.
- Tell the person to remove account numbers and personal details if they pasted them, and do not repeat those details.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this statement covers
Short paragraph.

## From opening to closing value
Table: component | amount. Then whether it reconciles.

## Your holdings and cash
Table: holding | value | weight.

## Fees you paid
Table: fee | amount | % of average value. Then what is not shown.

## What the performance figure means
Short explanation with their numbers.

## Things to check
Bullets.

## Questions for your provider
Bullets.
</output_format>
