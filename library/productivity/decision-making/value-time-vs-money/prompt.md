---
schema: 1
id: value-time-vs-money
kind: prompt
title: Decide whether to pay to save time
description: Decides whether to pay for convenience - a cleaner, delivery, taxis, childcare hours, outsourcing a task - by putting a value on your time and what you would do with the hours saved.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text, preferences]
output: [table, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [time-value, convenience, outsourcing-chores, hourly-value, household]
pairs_with:
  prompts: [decide-rent-borrow-or-buy, run-cost-benefit-analysis, prune-commitments]
args:
  - name: options
    description: The time-saving services or purchases you are considering, with prices and how much time each would save (for example "cleaner 2 hours a week at 18 per hour").
    type: text
    required: true
  - name: situation
    description: Your take-home pay or monthly budget, how stretched your time is, what you would do with the saved hours, and which tasks you dislike or enjoy.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your time value, Each option in numbers, What the saved time would buy, Ranking, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide when paying to save time is worth it. The common shortcut, "pay for it if it costs less than your hourly wage", is misleading: most people cannot turn saved hours into extra pay, so the real value of an hour depends on what they would actually do with it (rest, time with children, a side project, sleep) and how scarce their free time is. Research on happiness suggests buying time away from disliked chores can improve wellbeing more than spending the same money on things, but only when the budget can carry it without new money stress. Other factors: the real time saved after booking, briefing and checking the work; whether the task is one the person dislikes or secretly enjoys; quality differences; and the fixed versus flexible nature of the cost (a weekly cleaner is a standing commitment, a one-off delivery is not). Services also scale: one disliked chore outsourced well often beats several half-measures.

Options:
<options>
{{options}}
</options>

Situation:
<situation>
{{situation}}
</situation>
</context>

<task>
1. Estimate the person's time value two ways: their after-tax hourly pay as an upper reference, and a personal value based on how scarce their free time is and what they would do with it. State both, marked as estimates.
2. For each option, compute the monthly cost, the net hours saved after booking and supervision, and the cost per hour saved.
3. Describe what the saved time would buy for this person (rest, family, work, health) and how much they dislike the task, from their own words.
4. Rank the options by value: cost per hour saved, weighted by how disliked the task is and how much the saved time matters.
5. Recommend what to buy, what not to, and a trial period (for example one month) with a check: did the saved hours actually go where intended?
6. If the budget is tight, say so plainly and suggest cheaper ways to save the same time (batching, simplifying the task, sharing it, swapping with a friend).
</task>

<constraints>
- Do not assume the person can earn more with saved time unless they said so.
- Use their figures; mark any assumed prices or times as estimates.
- Do not moralise about paying for help or doing chores yourself.
- If spending would push them into debt or below essential costs, recommend against it regardless of the time value.
</constraints>

<output_format>
## Your time value
Two estimates with their basis.

## Each option in numbers
Table: Option | Monthly cost | Net hours saved | Cost per hour saved.

## What the saved time would buy
Short paragraph.

## Ranking
Numbered list with one-line reasons.

## Recommendation
What to buy, what to skip, the trial and the check.
</output_format>
