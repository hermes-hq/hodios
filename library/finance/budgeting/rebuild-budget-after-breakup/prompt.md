---
schema: 1
id: rebuild-budget-after-breakup
kind: prompt
title: Rebuild your budget after a breakup
description: Rebuilds a household budget for one income after a separation, covering new single-household costs, child costs and support, what to protect and what to cut first.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [separation, single-income, household-costs, life-change]
pairs_with:
  prompts: [plan-separation-finances, split-joint-debts-after-breakup, build-tight-budget]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Your own take-home pay, any child support or maintenance paid or received (or expected), benefits, and anything still shared with your ex-partner for now.
    type: text
    required: true
  - name: costs
    description: Your housing costs now or after the move, bills, debts (including joint ones), children's costs, and costs you used to share.
    type: text
    required: true
  - name: stage
    description: Where things stand - still living together, recently moved out, or settled. Optional; helps separate an interim budget from a long-term one.
    type: string
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Where you stand, New budget, Costs that change after separating, What to protect and what to cut first, Things to separate or update, Support to check, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone rebuild their budget after a relationship ends, often while stressed and tired. One household becoming two does not halve costs: rent or mortgage, energy standing charges, internet, insurance and many subscriptions are per household, so each person usually pays much more than half of what they paid before. Some things change in their favour: single-occupier discounts on local property taxes in some places, benefits or credits that may now apply as a single person or single parent, and child support or maintenance. Until a financial settlement is reached, many people need an interim budget and a separate long-term one. Joint debts and joint accounts remain shared responsibilities until formally changed, so stopping payments on them damages both credit records.

{{#stage}}Stage: {{stage}}{{/stage}}
{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Costs:

<costs>
{{costs}}
</costs>

1. Show where the person stands: monthly take-home including support, monthly costs on their own, and the surplus or gap, with arithmetic. If support is expected but not yet paid, show the budget both with and without it.
2. Build the new budget by priority: housing, energy and water, local taxes, food, children's essentials, transport to work, minimum debt payments including joint debts, then everything else. Separate an interim budget from the long-term one if the situation is not settled.
3. List costs that change after separating: costs that are now theirs alone, costs that may drop (single-occupier discounts, a smaller home, fewer subscriptions), and new costs (setting up a home, travel for shared parenting, two sets of children's things).
4. What to protect and what to cut first: protect housing, priority bills and minimum payments; cut in order of least pain for most money; avoid big irreversible decisions (selling the home, cashing in pensions) until advice is taken.
5. Things to separate or update: joint accounts and cards, direct debits, insurance policies and named drivers, beneficiaries, passwords and shared online accounts, addresses, and joint debts. Say to agree changes in writing where possible.
6. Support to check: benefits or credits as a single person or single parent, child support or maintenance arrangements, local tax discounts, and free advice services on money, debt and family law. Name schemes only if confident, marked "verify".
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not give legal advice on how assets, homes, pensions or children's time should be divided; point to a family lawyer, mediator or legal advice service for that.
- Never suggest stopping payments on joint debts or moving shared money without agreement or advice.
- Use only figures given; label estimates.
- If the person mentions abuse, threats or financial control, put safety first: say that domestic abuse support services and the police can help, and that a separate bank account the other person cannot see may be needed.
- Keep the tone calm and practical; acknowledge it is a hard time without dwelling on it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you stand
Three lines with arithmetic, plus the with-and-without-support view if relevant.

## New budget
Table: priority | item | monthly amount | notes. Total and surplus or gap.

## Costs that change after separating
Bullets grouped as now yours alone, may drop, new.

## What to protect and what to cut first
Two short lists.

## Things to separate or update
Checklist.

## Support to check
Bullets with who to ask, schemes marked "verify".

## Questions
Bullets.
</output_format>
