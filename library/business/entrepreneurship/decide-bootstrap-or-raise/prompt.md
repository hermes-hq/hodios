---
schema: 1
id: decide-bootstrap-or-raise
kind: prompt
title: Decide whether to bootstrap or raise
description: Decides whether to bootstrap or raise outside money for your startup, from capital needs, market timing, the growth you want, control and personal risk, with the conditions that would flip the answer.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
advice_risk: [financial]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [bootstrapping, venture-capital, angel-investment, founder-control, capital-needs]
pairs_with:
  prompts: [choose-funding-instrument, size-fundraising-round, model-unit-economics, write-business-plan]
  personas: [startup-mentor, venture-capitalist]
args:
  - name: business
    description: What the business does, its stage (idea, first customers, revenue and growth figures), its market, and how it makes money.
    type: text
    required: true
  - name: goals
    description: What you want from the business (size, timeline, control, lifestyle, a sale one day), how much risk you can take personally, and money you or your network could put in.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Capital need, Fit with outside investors, Comparison, Recommendation, What would change it, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders decide whether to take outside money at all, before they pick an instrument or start pitching. Venture investors need a chance of a very large outcome and a sale or listing within roughly a decade; most good businesses do not fit that, and taking venture money commits the founder to that path. Bootstrapping keeps control and options but limits speed. The real questions are: how much money must be spent before the business can fund itself; is there a race (network effects, land-grab, regulatory window) where being slower loses; what does the founder want the company to become; and what can customers fund through pre-payments, deposits or early revenue. Middle routes exist: angels, grants, revenue-based finance, loans, customer funding, a small friends-and-family round.

<business>
{{business}}
</business>

<goals>
{{goals}}
</goals>
</context>

<task>
1. Capital need: estimate what must be spent before the business funds itself - product build, inventory, regulatory approval, sales team - and whether customers could fund part of it. Show the reasoning and mark assumptions.
2. Fit with outside investors: judge honestly whether the business could interest venture investors (market size path, growth rate, defensibility, exit routes) or angels, and say what is missing.
3. Compare options side by side: bootstrap, customer-funded, angels or friends and family, venture, and debt or other non-dilutive money. For each: speed, control, dilution, personal risk, obligations it creates and fit with the founder's goals.
4. Recommend one path, or a sequence (for example bootstrap to a revenue milestone, then decide), with the reasoning.
5. List the conditions that would flip the recommendation, such as a competitor raising, a capital-heavy step, or traction reaching a level.
6. Next steps for the chosen path, in order, for the next 60 days.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent valuations, round sizes, investor names or market sizes. Speak about what investors typically look for as general patterns, and say they vary by market and country.
- Name the personal risks plainly: personal guarantees on loans, using savings, money from family, and investor expectations.
- Do not recommend raising money from friends or family without spelling out the chance of losing it and the need for clear written terms.
- Refer the choice of legal instrument and tax treatment to a lawyer and accountant.
</constraints>

<output_format>
## Capital need
## Fit with outside investors
## Comparison
Table: Option | Speed | Control | Dilution | Personal risk | Fit with your goals.
## Recommendation
## What would change it
Bullets.
## Next steps
Numbered, next 60 days.
</output_format>
