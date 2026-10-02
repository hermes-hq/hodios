---
schema: 1
id: compare-retirement-accounts
kind: prompt
title: Compare retirement account types
description: Explains a country's retirement and tax-advantaged account types, their tax treatment, limits, access rules and trade-offs, without recommending any product or provider.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pension, tax-advantaged-accounts, employer-match, financial-literacy]
pairs_with:
  prompts: [plan-retirement-scenarios, explain-tax-on-investments, explain-investment-concept]
  personas: [investing-educator]
args:
  - name: country
    description: Country whose accounts to explain, for example United States (401k, IRA, Roth), United Kingdom (workplace pension, SIPP, ISA, Lifetime ISA), Germany, Canada (RRSP, TFSA) or Brazil (PGBL, VGBL).
    type: string
    required: true
  - name: situation
    description: Optional context that changes which rules matter - employed or self-employed, employer scheme and match, rough income band, age, when you may need the money, and accounts you already have.
    type: text
output_contract:
  format: markdown
  sections: [The account types, How the tax works, Rules that catch people out, What decides the choice, Questions for an adviser, Check before acting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain retirement and tax-advantaged savings accounts for one country, so a saver understands what each account is for and what trade-offs they are choosing between. Almost every system can be understood through the same five questions: when is the money taxed (on the way in, while it grows, on the way out), who adds money (employee, employer, government top-ups), how much can go in each year, when and how can it come out (and what it costs to take it early), and what can it be invested in. Getting these right matters more than any product choice, and the most expensive mistakes are structural: missing free employer money, breaching a limit, or locking away money that will be needed sooner.

Country: {{country}}
</context>

<task>
{{#situation}}
Saver's situation:

<situation>
{{situation}}
</situation>

{{/situation}}
1. List the main retirement and tax-advantaged account types available to individuals in {{country}}: state or mandatory schemes in one line, then workplace schemes, personal pension accounts and general tax-advantaged savings or investment wrappers. Use the local names.
2. For each, explain the five mechanics: tax treatment in, during and out (for example deductible contributions taxed on withdrawal versus after-tax contributions withdrawn tax-free); contributions from employers or the government; annual limits; access age, early-withdrawal penalties and exceptions; and what it can hold.
3. Give limits, ages and rates only if you are confident, always with the tax year they apply to, and mark them "verify: these change". If you are not confident about a figure, say so and name where it is published (tax authority or pension regulator).
4. Explain the trade-offs that usually decide between them: tax rate now versus expected tax rate in retirement, employer matching, flexibility and access, investment choice and fees, and treatment on death or divorce where it is a common concern.
5. If a situation was given, explain which rules and trade-offs matter most for it and why, without telling the person which account to use or how much to put in. You may describe the order of consideration people commonly discuss (for example, not leaving an employer match unclaimed), framed as education.
6. List questions for a regulated financial adviser or the scheme provider, and the items to verify on official sources before acting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend, rank or name any provider, platform, fund or product, and do not tell the person which account to open or how much to contribute.
- Never invent account types, limits, ages or tax rates. A confident wrong number is worse than "check this figure for the current tax year at the tax authority".
- If you know of recent or announced rule changes, mention them as something to confirm, not as settled fact.
- Cross-border situations (living in one country, working or holding accounts in another, planning to move) change the answer; flag them and suggest a cross-border adviser.
- Keep the jargon local but define each term once in plain words.
{{> output/uncertainty}}
</constraints>

<output_format>
## The account types
Table: account | who can use it | tax in | tax during | tax out | annual limit (tax year, verify) | access age and early-access cost | employer or government top-up.

## How the tax works
Two or three short paragraphs with one small worked example in round, hypothetical numbers comparing tax relief on the way in with tax-free growth and withdrawal.

## Rules that catch people out
Bullets.

## What decides the choice
Bullets: each trade-off and, if a situation was given, how it applies.

## Questions for an adviser
Bullets.

## Check before acting
Bullets: each figure or rule to verify, and where.
</output_format>
