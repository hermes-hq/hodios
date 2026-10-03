---
schema: 1
id: estimate-annual-tax-bill
kind: prompt
title: Estimate an annual income tax bill
description: Estimates a year's income tax bill from the user's income sources and the rates or bands they supply, showing every step from gross income to balance due or refund and what to verify.
category: taxes
version: 1.0.1
status: incubating
stage: [plan]
role: [individual, consultant, founder]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [income-tax, tax-estimate, tax-bands, worked-example]
pairs_with:
  prompts: [explain-marginal-tax-rates, check-tax-withholding, plan-estimated-tax-payments]
  personas: [tax-educator]
args:
  - name: income_sources
    description: Each income source for the year with gross amounts (salary, self-employed profit, rent, interest, dividends, capital gains, pensions), tax already withheld or paid, and deductions or allowances you expect to claim.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you are tax resident, plus filing status if your country has one.
    type: string
    required: true
  - name: tax_rates
    description: The tax bands, rates, allowances and contribution rates to use, copied from the tax authority's site for the year. Optional, but strongly recommended; without them, figures you are unsure of are marked as placeholders.
    type: text
output_contract:
  format: markdown
  sections: [The estimate, Step-by-step working, Tax already paid, Balance due or refund, Rates used and where they came from, What to verify, What could change the number]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "States whether bands apply to total income or to income after the allowance, so the allowance is never counted twice."}
---
<context>
You produce a transparent estimate of a year's income tax, the kind someone can check line by line against the official calculation later. The value is in the working, not the final number: which income is taxed together and which separately, which allowances come off first, which bands each slice falls into, and what was already paid. Rates and bands change every year, so rates the user supplies always beat your memory.

Country: {{country}}
</context>

<task>
Income sources:

<income_sources>
{{income_sources}}
</income_sources>

{{#tax_rates}}Rates and bands to use (these take priority over anything you recall):

<tax_rates>
{{tax_rates}}
</tax_rates>{{/tax_rates}}

1. List each income source with its gross amount and type. Note any type that is usually taxed separately or at different rates in {{country}} (for example dividends, capital gains or interest), and any that is often exempt.
2. Apply deductions and allowances in the order the system usually applies them, and arrive at taxable income for each type. If the order or eligibility is uncertain, say so.
3. Before applying bands, decide whether they are expressed on total income (the allowance acts as a 0% band, for example "20% on 12,001 to 50,000") or on taxable income after the allowance (for example "20% on the first 37,700"), and state which reading you used. Applying after-allowance bands to total income, or subtracting the allowance and then using total-income bands, counts the allowance twice or not at all; if the wording allows both readings, show the one you chose and ask. Then apply the rates band by band, showing the amount in each band and the tax on it. Use the supplied rates; if none were supplied, use rates you are confident about for {{country}} and label each one with its year, or write "placeholder, replace with the official rate" where you are not confident.
4. Apply credits, then add other income-linked charges that usually apply (social contributions on self-employed profit, local or regional income tax, surcharges), each as its own line.
5. Subtract tax already withheld or paid in advance to reach the balance due or refund.
6. Check the arithmetic by re-adding the band totals and state the effective and marginal rates.
7. List what to verify and what could change the result.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present the result as an estimate, never as the official liability. Say that the tax authority's calculation or a preparer will settle it.
- Do not invent rates. Every rate in the working must be either user-supplied, labelled with the year you believe it applies to, or marked as a placeholder.
- If you do not know the country's system well enough to order the steps, say "I don't know" for that part and show the general method with placeholders.
- Do not recommend tax-saving actions; you may list items the user could ask an adviser about.
- Show money to the nearest whole unit and keep the working in a table so it can be checked.
{{> output/uncertainty}}
</constraints>

<output_format>
## The estimate
One line: estimated total tax for the year, balance due or refund, and the confidence level.

## Step-by-step working
Table: step | income type | amount | rate | tax. Then effective and marginal rates.

## Tax already paid
Table: source | amount.

## Balance due or refund
One or two lines.

## Rates used and where they came from
Table: rate or band | value | source (supplied, recalled with year, placeholder).

## What to verify
Checklist.

## What could change the number
Bullets.
</output_format>
