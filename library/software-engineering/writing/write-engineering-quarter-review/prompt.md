---
schema: 1
id: write-engineering-quarter-review
kind: prompt
title: Write an engineering quarter review
description: Writes an engineering team's quarterly review for leadership, with outcomes against goals, what shipped and why it mattered, reliability, team health, tech debt, next-quarter bets and asks.
category: writing
version: 1.0.0
status: incubating
stage: [review, plan]
role: [engineering-manager, tech-lead, manager]
stack: []
requires: [none]
inputs: [notes, dataset, text]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [quarterly-review, engineering-metrics, team-health, tech-debt, stakeholder-update]
pairs_with:
  prompts: [explain-tech-to-executives, write-technical-roadmap, write-okr-progress-report]
args:
  - name: notes
    description: The quarter's raw material - goals or OKRs set at the start, what shipped, metrics (deploys, lead time, incidents, SLOs, adoption), tech debt work, team changes, on-call load, what slipped and why, plans for next quarter.
    type: text
    required: true
  - name: audience
    description: engineering for peers and the wider engineering org, leadership for directors and executives, cross-functional for product, design and business partners.
    type: enum
    enum: [engineering, leadership, cross-functional]
    default: leadership
  - name: quarter
    description: The period and team, for example "Q3 2026, Payments Platform team".
    type: string
    default: this quarter
output_contract:
  format: markdown
  sections: [Summary, Outcomes against goals, What shipped and why it matters, Reliability and operations, Team and tech health, Next quarter, Asks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quarterly review is how an engineering team earns trust and resources. It goes wrong in familiar ways: a changelog of tickets instead of outcomes, vanity metrics without baselines, slipped goals buried or spun, platform and debt work described in terms leaders cannot value, and no clear ask, so nothing changes. Leaders reading it want to know: did we get what we planned, what did it change for users or the business, is the system healthy, is the team healthy, and what do you need from me. This review covers {{quarter}} for a {{audience}} audience.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Summary: three to five sentences, bottom line first, including the most important miss if there is one.
2. Outcomes against goals: each goal set at the start of the quarter with its result as met, partly met or missed, the number against the target and baseline, and one line on why. Do not drop goals that were missed or abandoned; say so and why.
3. What shipped: group work into three to six themes; for each, the user or business effect (with the metric if given) rather than a ticket list. Translate platform and debt work into effects (deploy time cut from 40 to 12 minutes, so fixes reach users the same day).
4. Reliability and operations: SLO attainment, incidents by severity with one line on the main one and its follow-ups, on-call load and trend. Use only numbers given.
5. Team and tech health: headcount changes, hiring, attrition risk only at the level appropriate for the audience, tech debt paid and added, risks building up (single points of knowledge, unsupported dependencies).
6. Next quarter: two to four bets with the expected outcome and how it will be measured, plus what you will not do.
7. Asks: specific decisions, people, budget or help from other teams, each with the date it is needed and the impact if not.
8. Adapt to the audience: leadership gets business effects and asks first, about 600 words; engineering can include technical detail and metrics definitions; cross-functional emphasises user-facing changes and dependencies.
</task>

<constraints>
- Use only facts and numbers from the notes. Mark missing baselines or targets as [X] rather than presenting a number without context.
- Be candid about misses without blame; name causes as conditions (scope grew, dependency late), never individuals.
- Do not disclose personal matters (health, performance issues of named people) even if they are in the notes; describe capacity impact only.
- Keep to the claims the data supports; label estimates as estimates.
</constraints>

<output_format>
## Summary
Three to five sentences.
## Outcomes against goals
Table: goal, target, result, status (met, partly, missed), why.
## What shipped and why it matters
Three to six themed bullets, each effect first.
## Reliability and operations
Short table of metrics (metric, this quarter, last quarter, target) then two to four bullets.
## Team and tech health
Bullets.
## Next quarter
Table: bet, expected outcome, measure. Then "Not doing" bullets.
## Asks
Numbered: ask, from whom, by when, impact if not.
</output_format>
