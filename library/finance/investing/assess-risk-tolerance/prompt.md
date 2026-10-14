---
schema: 1
id: assess-risk-tolerance
kind: prompt
title: Work out your investment risk tolerance
description: Takes someone through questions on risk tolerance, risk capacity and the risk their goals need, with money examples of falls, and shows where the three disagree before they choose an investment mix.
category: investing
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [questions, report, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [risk-tolerance, risk-capacity, risk-profile, loss-aversion]
pairs_with:
  prompts: [write-investment-policy-statement, explain-investment-concept, make-sense-of-market-drop, choose-financial-advisor]
  personas: [investing-educator]
args:
  - name: situation
    description: Age or life stage, goals with amounts and dates, income stability, emergency fund, debts, and roughly how much you would invest.
    type: text
    required: true
  - name: past_experience
    description: Any past investing experience, especially how you reacted to a fall. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Three kinds of risk, Your answers, What a fall looks like in money, Where they disagree, What this means for choosing a mix, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Advisers separate three ideas that online questionnaires blur together. **Risk tolerance** is psychological: how much fall someone can live with without losing sleep or selling. **Risk capacity** is financial: how much loss they can absorb without their life or goals being harmed, which depends on time horizon, income security, emergency savings and other assets. **Risk required** is how much risk the goals actually need: a modest goal may be reachable with little risk; an ambitious one may need more than the person is comfortable with. Good decisions come from noticing when these disagree: a young person with high capacity but low tolerance; a retiree with high tolerance but low capacity. People also overestimate their tolerance in calm markets; questions phrased in money ("your 50,000 is now 35,000") reveal more than percentages, and past behaviour in a real fall is the best evidence.

<situation>
{{situation}}
</situation>
{{#past_experience}}Past experience: {{past_experience}}{{/past_experience}}
</context>

<task>
1. Three kinds of risk: explain tolerance, capacity and required risk in a few sentences each.
2. Your answers: ask eight to ten questions one block at a time (tolerance questions phrased in money using their amount, capacity questions on horizon, income, buffer and other assets, and a goals question). Wait for answers before scoring. If the person asks for everything in one go, ask all questions in one message and wait.
3. What a fall looks like in money: after answers, show their amount after falls of 10%, 20%, 35% and 50% and roughly how long recoveries have taken historically in broad terms, with the caveat that history does not guarantee the future.
4. Where they disagree: rate each kind of risk as low, medium or high with the reasons from their answers, and name any conflict.
5. What this means for choosing a mix: explain in general how the three usually combine (the lower of tolerance and capacity tends to set the limit; if required risk is higher, the goal, timeline or savings rate may need to change), and show two or three illustrative share-bond mixes with their historical worst-year falls in broad ranges, labelled as education, not a recommendation.
6. Questions for an adviser or for writing an investment policy statement.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not assign a specific portfolio or product. Illustrative mixes must be labelled as examples.
- Historical figures are broad ranges; do not state precise numbers you are not confident of.
- If the situation shows no emergency fund or expensive debt, point out that these usually come before taking investment risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## Three kinds of risk
Short explanation.

## Your answers
Numbered questions (first turn), then a summary of answers.

## What a fall looks like in money
Table: fall | value of your amount.

## Where they disagree
Table: kind of risk | rating | why.

## What this means for choosing a mix
Paragraph plus an illustrative table.

## Questions for an adviser
Bullets.
</output_format>
