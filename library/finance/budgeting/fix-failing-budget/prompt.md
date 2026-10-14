---
schema: 1
id: fix-failing-budget
kind: prompt
title: Fix a budget that keeps failing
description: Diagnoses why someone's budgets keep collapsing after a few weeks, from unrealistic numbers to missing categories and too much tracking, and redesigns a simpler one that can last.
category: budgeting
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [report, plan, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [budget-failure, money-habits, budgeting-method, behaviour-change]
pairs_with:
  prompts: [build-monthly-budget, review-budget-vs-actual, set-up-sinking-funds, curb-impulse-spending]
  personas: [personal-finance-coach]
args:
  - name: what_happened
    description: The budgets you have tried, how you tracked them (app, spreadsheet, envelopes), and when and how they fell apart.
    type: text
    required: true
  - name: money_picture
    description: Rough take-home income and main costs, and whether income is fixed or varies. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is going wrong, The simpler budget, Rules that stop the usual collapse, The weekly ten minutes, Signs it is working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Budgets rarely fail because people lack willpower. They fail for repeatable reasons: numbers set at an aspirational level rather than from real spending; no line for irregular costs (car, gifts, annual subscriptions), so every "surprise" breaks the month; too many categories to track; tracking every coffee until the person burns out; no money for fun, so one splurge feels like total failure; a payday mismatch where bills land before income; and an all-or-nothing reaction where one bad week means abandoning the whole thing. The fix is usually fewer categories, realistic numbers, a buffer, automation for the fixed parts and a short weekly check instead of constant tracking.

<what_happened>
{{what_happened}}
</what_happened>
{{#money_picture}}Money picture: {{money_picture}}{{/money_picture}}
</context>

<task>
1. Diagnose: go through the common failure causes above and say which ones fit what they described, quoting their own words as evidence. Rank the two or three that matter most. If the story fits none, say so and ask the question that would tell.
2. Design a simpler budget: suggest a method that suits them (for example a "fixed costs + savings automated, one spending pot" set-up, a short zero-based list, or envelopes for two or three problem categories), with no more than about eight categories. If a money picture is given, fill in rough figures based on it and show they balance; otherwise give the template.
3. Rules that stop the usual collapse: a fun or "no questions asked" line, an irregular-costs or buffer line, what to do after an overspend week (move money from another line, do not quit), and how to handle payday timing.
4. The weekly ten minutes: a short routine with the three or four things to check and nothing more.
5. Signs it is working after one and three months that are not "perfect adherence".
</task>

<constraints>
{{> guardrails/professional-limits}}
- No shaming, no "just spend less". Tie every suggestion to a cause you identified.
- Do not recommend specific apps or banks by name; describe the kind of tool instead.
- Do not invent their income or costs. Mark assumed figures.
- If the real problem is that income does not cover essentials, say so plainly and point to a survival budget and free money advice instead of tweaking the method.
{{> output/uncertainty}}
</constraints>

<output_format>
## What is going wrong
Ranked list: cause, evidence from what they said.

## The simpler budget
Method, then a short table: category | amount or rule.

## Rules that stop the usual collapse
Bullets.

## The weekly ten minutes
Numbered steps.

## Signs it is working
Bullets for one month and three months.
</output_format>
