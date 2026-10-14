---
schema: 1
id: define-product-qualified-lead
kind: prompt
title: Define product-qualified leads
description: Defines product-qualified lead criteria from usage and firmographic data, tests them against past conversions for precision and coverage, and sets the handoff rules to sales.
category: product-metrics
version: 1.0.0
status: incubating
stage: [design, plan]
role: [product-manager, founder, sales-rep, data-analyst]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-qualified-lead, product-led-sales, lead-scoring, conversion-signals, sales-handoff, backtesting]
pairs_with:
  prompts: [convert-trial-users-with-sales, define-activation-metric, analyze-free-to-paid-conversion, define-account-level-metrics]
args:
  - name: motion
    description: Free plan or trial, what sales sells (upgrade, enterprise plan, seats), deal sizes, and how many accounts sales can work per week.
    type: text
    required: true
  - name: data
    description: Past accounts that converted to paid or enterprise and ones that did not, with usage signals (active users, key actions, invites, integrations, limits hit) and firmographics (company size, industry, domain type). Counts or a table description.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What a PQL should predict, Candidate signals, PQL definition, Backtest, Handoff rules, Review cadence, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define product-qualified leads for product-led companies. A PQL is an account (not usually a single user) whose product usage shows it has found value and fits the customers sales can win. The definition must predict an outcome that matters for sales, such as conversion to a paid plan above a size, within a window; otherwise it predicts nothing. It needs both fit (company size, business email domain, industry) and usage (team spread, depth of key actions, limits hit, admin or billing page visits); usage alone flags hobbyists, fit alone flags big companies that never used the product. The threshold is set by sales capacity: a definition that flags 2,000 accounts a week for a team that can call 100 is useless. It must be backtested on past accounts for precision (share of PQLs that converted) and coverage (share of all conversions that were PQLs), and checked against self-serve conversion so sales does not chase accounts that would have bought anyway.
</context>

<task>
<motion>
{{motion}}
</motion>

<data>
{{data}}
</data>

1. What a PQL should predict: the outcome and window.
2. Candidate signals: list fit and usage signals from the data with conversion rates for accounts with and without each, and whether the signal occurs early enough to act on.
3. PQL definition: a simple rule set or points score (fit gate plus usage threshold) that a sales team can understand, and the expected weekly volume.
4. Backtest: precision, coverage and lift over base rate on past accounts, with the arithmetic, and two alternative thresholds showing the trade-off.
5. Handoff rules: when an account becomes a PQL, who gets it, what context goes with it (which signals fired), response time, and how sales outreach should help the user rather than interrupt them. Note accounts that convert well self-serve and should be left alone or only offered help.
6. Review cadence: monthly check of precision and coverage, and a holdout of PQLs not contacted to measure sales' real lift.
</task>

<constraints>
- Use only the data given; if converted and non-converted accounts are not both available, say the definition cannot be backtested and ask.
- Do not invent conversion rates or weights.
- Fit signals must not use protected characteristics or personal data beyond what is needed.
- Respect consent and contact rules for outreach; say they depend on jurisdiction.
{{> output/uncertainty}}
</constraints>

<output_format>
## What a PQL should predict
One sentence.

## Candidate signals
Table: signal | type | conversion with | conversion without | timing.

## PQL definition
Rule set or score, plus expected weekly volume.

## Backtest
Table: threshold | PQLs | precision | coverage | lift.

## Handoff rules
Bullets.

## Review cadence
Bullets.

## Questions
What to confirm.
</output_format>
