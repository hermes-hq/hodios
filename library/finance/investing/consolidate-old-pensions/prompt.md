---
schema: 1
id: consolidate-old-pensions
kind: prompt
title: Check before combining old pensions or retirement accounts
description: Lists what to check before moving old workplace pensions or retirement accounts into one - guarantees and protected benefits you could lose, exit fees, transfer routes and scam signs.
category: investing
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pension-transfer, rollover, defined-benefit, exit-fees, pension-scams]
pairs_with:
  prompts: [compare-retirement-accounts, calculate-fee-drag, spot-investment-scam]
  personas: [investing-educator]
args:
  - name: pots
    description: Each old pension or retirement account - type if known (defined benefit or final salary, defined contribution, personal pension, 401(k), IRA), provider, value, fees, and any features mentioned in its paperwork.
    type: text
    required: true
  - name: country
    description: The country (and state, if relevant) whose rules apply, and where you live now.
    type: string
    required: true
  - name: reason
    description: Why you want to combine them, such as simpler admin, lower fees or better funds. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your pots at a glance, Stop and check first, Per-pot checklist, Fees in money, Transfer routes and timing, Scam warning signs, Questions to ask each provider]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Combining old pensions makes admin easier and can cut fees, but some transfers destroy value that cannot be got back. The big ones: giving up a defined benefit (final salary) pension's guaranteed, often inflation-linked income, which many countries treat as a decision that needs regulated advice above a threshold; losing guaranteed annuity rates, protected tax-free cash above the usual level, or a protected early retirement age written into older contracts; exit penalties or market value reductions on older with-profits or insurance-based plans; loyalty bonuses that vanish; and, for US accounts, features of the employer plan that an IRA lacks (penalty-free withdrawals after leaving work at 55 under some plans, different creditor protection, the pro-rata rule that can complicate a later backdoor Roth, special treatment of employer stock). Indirect rollovers can trigger withholding and a strict deadline, so direct transfers are usually safer. A transfer can also leave the money out of the market for days or weeks. Pension transfer scams target exactly this decision, promising early access or high returns. A good old workplace plan with low institutional fees can be worth keeping.

Pots:
<pots>
{{pots}}
</pots>

Country: {{country}}
{{#reason}}Reason for combining: {{reason}}{{/reason}}
</context>

<task>
1. Table of their pots: type, value, fees as stated, and anything in the description that signals a guarantee or special feature. Mark "unknown" where they have not said.
2. Stop and check first: name any pot that looks like a defined benefit scheme, has guarantees, or might need regulated advice before transfer in their country, and say why it should be handled separately.
3. Per-pot checklist: for each, what to ask or look for in the paperwork (guaranteed annuity rate, protected tax-free cash, protected retirement age, exit fee, market value reduction, loyalty bonus, death benefits, fund range, early-access features, employer stock).
4. Fees in money: if fees were given, the yearly cost of each pot and of a typical consolidated set-up at an assumed fee they supply or a range labelled as illustrative.
5. Transfer routes and timing: direct versus indirect transfer, in-specie versus cash transfer, the out-of-market risk, and what paperwork the receiving provider usually needs, labelled as country-dependent.
6. Scam warning signs: cold calls, early-access promises, overseas or unusual investments, pressure, couriered documents.
7. Questions for each provider and, where relevant, which kind of regulated adviser to see.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them to transfer or not. Your job is to make sure nothing valuable is given up by accident.
- Never state thresholds, fees, ages or legal requirements for their country as fact unless they supplied them; name them as "check the current rule" and say which authority or provider confirms it.
- If a pot may be a defined benefit pension, say clearly that transferring it out is usually irreversible and is a decision for specialist regulated advice, wherever that applies.
- Do not name or recommend receiving providers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your pots at a glance
Table: pot | type | value | fees | possible special features.

## Stop and check first
Bullets, or "none spotted from what you gave" with what that depends on.

## Per-pot checklist
A short checklist per pot.

## Fees in money
Table with working, or what is needed to calculate it.

## Transfer routes and timing
Bullets.

## Scam warning signs
Bullets.

## Questions to ask each provider
Bullets.
</output_format>
