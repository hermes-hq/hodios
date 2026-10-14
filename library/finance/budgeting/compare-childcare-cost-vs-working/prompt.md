---
schema: 1
id: compare-childcare-cost-vs-working
kind: prompt
title: Compare childcare cost with working
description: Works out what a household really keeps from a parent working after childcare, commuting, tax and lost support, across hours options and each year until school.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [childcare-costs, return-to-work, household-income, career-break]
pairs_with:
  prompts: [choose-childcare, plan-parental-leave-finances, plan-switch-to-part-time-finances]
  personas: [personal-finance-coach]
args:
  - name: household
    description: Each parent's gross and take-home pay at current hours, the hours options being considered (full-time, part-time days, not working), commuting and work costs, and pension contributions with any employer match.
    type: text
    required: true
  - name: childcare
    description: Children's ages, childcare quotes (per hour, day or month), any free or funded hours, and when each child starts school.
    type: text
    required: true
  - name: country
    description: Country (and region if relevant), so tax, childcare support and benefits can be framed correctly.
    type: string
    required: true
  - name: currency
    description: Currency code or symbol for amounts. Optional; inferred from the input if missing.
    type: string
output_contract:
  format: markdown
  sections: [Net gain by option this year, Year by year until school, What the numbers leave out, Support to check, Questions for the decision, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents answer "is it worth working once childcare is paid?" with real numbers. The common mistakes are predictable. Childcare is set against only the lower earner's pay, when it is a household cost enabling both to work. Gross pay is used instead of take-home, or tax is ignored on the extra hours. Commuting, work clothes and lunches are left out. Support is missed: tax-free childcare schemes, childcare tax credits or deductions, employer childcare benefits, and funded or free hours that start at certain ages. And the decision is judged on this year alone, when childcare costs usually fall sharply as children reach funded-hours age and start school, while the earnings, pension contributions, employer match and career progression of staying in work continue for decades. Means-tested support can also fall as income rises, so a parent may keep much less of each extra unit earned than their tax rate suggests.

Country: {{country}}
{{#currency}}Currency: {{currency}}{{/currency}}
</context>

<task>
Household:

<household>
{{household}}
</household>

Childcare:

<childcare>
{{childcare}}
</childcare>

1. For each hours option, calculate this year's monthly net gain from working: extra take-home pay, minus childcare after any funded hours and support the person has stated, minus commuting and work costs. Where take-home for a new hours option is not given, estimate it only if you can do so reliably for {{country}}; otherwise show the gross change, explain why net will be lower, mark it "approximate" and point to the official tax calculator.
2. Add the hidden gains: pension contributions and employer match kept, and other employment benefits. Show them separately from cash.
3. Project year by year until the youngest child starts school, using the ages given: childcare cost falling as funded hours or school start, and pay held flat unless the person gave a raise expectation. Show the cumulative net gain by option.
4. Explain what the numbers leave out: career progression and re-entry difficulty after a long break, pension gaps, entitlement to contributory benefits that depend on work record, wellbeing and family preferences. Present these as factors, not as a verdict.
5. List support to check in {{country}}: childcare subsidies or funded hours, tax-free childcare accounts or childcare tax credits, employer schemes, and how means-tested benefits could change with each option. Name schemes only when confident and mark them "verify".
6. End with questions that help the family decide, and say the decision is theirs.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax rates, benefit amounts or childcare prices. Use the person's figures, and label any estimate.
- Treat childcare as a household cost. If you also show it against one parent's pay, label that view as one way of looking at it.
- Do not tell the family which option to choose or which parent should work; show the trade-offs neutrally.
- Show arithmetic for every monthly and cumulative figure.
- If one option would leave the household unable to cover essentials, say so plainly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Net gain by option this year
Table: option | extra take-home | childcare after support | work costs | net cash gain per month | pension and benefits kept.

## Year by year until school
Table: year | child ages | childcare cost | net gain per option | cumulative net gain per option.

## What the numbers leave out
Bullets.

## Support to check
Bullets, each marked "verify", with who to ask.

## Questions for the decision
Up to six questions.

## Assumptions
Bullets.
</output_format>
