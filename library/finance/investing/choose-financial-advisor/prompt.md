---
schema: 1
id: choose-financial-advisor
kind: prompt
title: Choose a financial adviser
description: Prepares someone to choose a financial adviser - the kind of help needed, fee models compared in money, fiduciary questions, credentials and registers to verify, conflicts and red flags.
category: investing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [checklist, questions, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [financial-adviser, fiduciary, advisory-fees, due-diligence, conflicts-of-interest]
pairs_with:
  prompts: [spot-investment-scam, plan-windfall, plan-retirement-scenarios, write-investment-policy-statement]
  personas: [investing-educator]
args:
  - name: needs
    description: What you want help with (a one-off plan, retirement, a windfall, ongoing investment management, pensions, tax), rough amounts involved, and any adviser or offer you are already considering.
    type: text
    required: true
  - name: country
    description: Country where you live, since adviser regulation, titles and registers differ. Optional; general guidance is given without it.
    type: string
output_contract:
  format: markdown
  sections: [What kind of help you need, Fee models in money, Credentials and registers to verify, Questions to ask, Red flags, How to decide, After you hire]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare people to hire a financial adviser well. The most expensive mistakes are not picking a "bad" adviser in the abstract, but paying ongoing fees for help that was needed once, not understanding how the adviser is paid and therefore what they are nudged to sell, assuming a title means a legal duty to act in the client's interest when it may not, and never checking the official register. A good choice starts with defining the job, then compares cost in actual money over years, then tests duties, conflicts and competence.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Needs:

<needs>
{{needs}}
</needs>

1. What kind of help you need: classify the job as a one-off plan or review, project advice (pension consolidation, a windfall, retirement income), ongoing investment management, or specialist help (tax, estate, debt). Say which kinds of professional typically do each (financial planner, investment manager, tax adviser, debt adviser, lawyer) and whether ongoing fees fit this job.
2. Fee models in money: explain commission, percentage of assets per year, flat or fixed project fee, hourly, and retainer or subscription. Using the amounts given (or a round labelled example such as 300,000 invested), compute what each would cost per year and over 10 years, and show how a 1% annual fee compounds against a lower one with a stated hypothetical return. Note what each model incentivises.
3. Credentials and registers to verify: explain the difference between a duty to act in the client's best interest (often called fiduciary) and a weaker suitability standard, and that it depends on the country and the role the adviser is acting in. List widely recognised credentials (for example CFP or Chartered Financial Planner) as signs of training, not of honesty. Name the official register or regulator to check in their country if you are confident of it, otherwise say "search for your country's financial regulator's public register" and what to look for: authorisation, permissions, disciplinary history, and whether the firm is independent or restricted to certain products.
4. Questions to ask: 12-15 questions grouped under duty and independence, how they are paid (ask for all fees in writing as a money amount), service and process, investment approach, conflicts, and what happens if they leave or the firm closes.
5. Red flags specific to their situation and in general: guaranteed returns, pressure to decide fast, reluctance to put fees in writing, custody of your money in their own name, products only from their own company, advice to move pensions with valuable guarantees without a clear explanation, not on the register.
6. How to decide: a simple scorecard to compare two or three candidates.
7. After you hire: what to receive in writing, how to review the relationship yearly, and how to complain to the firm and then the ombudsman or regulator.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend or name specific advisers, firms, platforms or products.
- Do not state a country's regulator, register, title protection or fee rule as fact unless confident it is current; mark uncertain items "verify".
- Show the fee arithmetic and label every assumption. Returns used in examples are hypothetical.
- If the needs mention someone already pressing them to transfer money, a guaranteed return, or an adviser who contacted them unsolicited, lead with a scam warning and how to verify before anything else.
{{> output/uncertainty}}
</constraints>

<output_format>
## What kind of help you need
Two or three sentences and the professional type.

## Fee models in money
Table: model | how it works | cost per year | cost over 10 years | incentive. Then the fee-drag illustration.

## Credentials and registers to verify
Bullets.

## Questions to ask
Grouped numbered questions.

## Red flags
Bullets.

## How to decide
Scorecard table: criterion | weight | candidate A | candidate B.

## After you hire
Checklist.
</output_format>
