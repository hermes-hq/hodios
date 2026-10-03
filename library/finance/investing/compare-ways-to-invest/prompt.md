---
schema: 1
id: compare-ways-to-invest
kind: prompt
title: Compare ways to invest
description: Compares do-it-yourself investment platforms, robo-advisers and human advisers on cost in money, control, support and suitability, with the questions that decide between them.
category: investing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [robo-adviser, diy-investing, financial-adviser, investment-fees, platform-fees]
pairs_with:
  prompts: [choose-financial-advisor, prepare-financial-adviser-meeting, explain-investment-concept, compare-retirement-accounts]
  personas: [investing-educator]
args:
  - name: amount_range
    description: Roughly how much you would invest to start and per month (for example 15,000 now plus 300 a month). Optional; a labelled example is used without it.
    type: string
  - name: experience
    description: What you have done with investing before and how confident you feel, including how you reacted to past market falls if you have been through one. Optional.
    type: text
  - name: preferences
    description: What matters to you - lowest cost, not having to think about it, wanting someone to talk to, tax or pension complexity, ethical preferences, your country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The short answer, The three routes compared, Cost in money, Who each route tends to suit, Questions that decide it, Before you sign up anywhere]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
There are three broad ways to invest: do it yourself on a platform or broker, use a robo-adviser that builds and rebalances a portfolio from a questionnaire, or pay a human adviser (ongoing, one-off, or a hybrid that pairs an app with occasional advice). The right route depends less on returns, which nobody can promise, and more on cost over decades, how much the person wants to decide themselves, how complex their situation is (pensions, tax, property, business, inheritance), and how they behave when markets fall. Fees compound just like returns, so a percentage that sounds small becomes a large amount of money over 20 years.

{{#amount_range}}Amount: {{amount_range}}{{/amount_range}}
{{#experience}}Experience: {{experience}}{{/experience}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. If no details are given, ask for amount, experience and what matters most (up to three questions) and give the comparison on a labelled example meanwhile.
2. Compare the three routes (plus a hybrid if relevant) on: what you get, who chooses the investments, typical cost structure, minimums, support during a market fall, help with tax and pensions, and how much time it takes.
3. Cost in money: for the person's amount (or an example such as 20,000 plus 300 a month), compute illustrative yearly cost and the 20-year cost of each route under labelled assumptions - for example DIY with low-cost index funds about 0.2-0.5% all-in, robo-adviser about 0.5-1.0% all-in, ongoing human advice about 1.5-2.0% all-in including fund costs, and a one-off advice fee as a flat amount. Use the same hypothetical gross return (say 5% a year) for every route and show the difference in ending value. State that the ranges vary by country and provider and must be checked against real quotes.
4. Who each route tends to suit: describe situations, not this person's choice - for example DIY for people who want control and will not panic-sell; robo for people who want automation at low cost; human advice for complex situations, large or life-changing sums, or people who value behavioural coaching. Relate this to what they told you.
5. Questions that decide it: 6-8 questions the person can answer themselves (Will I rebalance? What did I do the last time markets fell 20%? Do I need tax or pension planning beyond picking funds?).
6. Before you sign up anywhere: check regulation and the official register, investor compensation or custody protection, all fees in money, what happens to assets if the firm fails, how to leave and the exit fees.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never name platforms, robo-advisers, brokers, advisers or funds, and never say which route this person should pick. Lay out the trade-offs and let them decide.
- All costs and returns are labelled illustrations. Show the compounding formula once.
- Do not promise that any route earns more; the only near-certain difference is cost.
- If the amount is small relative to likely advice fees, say plainly that ongoing advice may cost more than it is worth at that size and mention free or low-cost guidance services that may exist in their country.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Three sentences on what decides it for someone in their position.

## The three routes compared
Table: | DIY | robo-adviser | human adviser | with rows for each dimension.

## Cost in money
Table: route | assumed all-in cost | cost in year 1 | ending value after 20 years | difference versus cheapest. Then the formula.

## Who each route tends to suit
Short paragraphs.

## Questions that decide it
Numbered.

## Before you sign up anywhere
Checklist.
</output_format>
