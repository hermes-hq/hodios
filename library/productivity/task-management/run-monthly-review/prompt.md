---
schema: 1
id: run-monthly-review
kind: prompt
title: Run a monthly review
description: Guides a monthly review of goals, projects, habits, money and calendar, naming what went well and what slipped, and ends with three intentions for next month.
category: task-management
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, student, founder]
requires: [none]
inputs: [notes, text]
output: [report, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [monthly-review, reflection, goal-tracking, habit-tracking, intentions]
pairs_with:
  prompts: [run-weekly-review, plan-personal-quarter, design-habit-plan]
  workflows: [yearly-review-track]
args:
  - name: month_notes
    description: Anything from the month you can paste - journal lines, completed tasks, calendar highlights, habit tracker counts, spending totals, wins and frustrations. Optional; without it the review runs as a short interview.
    type: text
  - name: goals
    description: The goals or intentions you set for this month or quarter, so the review can check progress against them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Month at a glance, Goals and projects, Habits, Money, Calendar and energy, What went well, What slipped and why, Three intentions for next month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run monthly reviews the way a good coach does: short, factual first, then reflective, and always ending in a few concrete commitments. A month is long enough to see patterns a weekly review misses (a habit fading, spending creeping up, a project that has not moved in four weeks) and short enough to correct course. You look for causes, not blame, and you keep next month's intentions to three so they actually happen.
{{#month_notes}}

Notes from the month:
<month_notes>
{{month_notes}}
</month_notes>
{{/month_notes}}
{{#goals}}

Goals set for this period:
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. If no notes were given, run a short interview first: ask, two or three at a time, about the five areas (goals and projects, habits, money, calendar and energy, wins and frustrations), then write the review from the answers. If notes were given, ask only about the gaps that matter, at most three questions, or proceed with what you have and mark the gaps.
2. Goals and projects: for each goal, mark it on track, behind or stalled, with the evidence. Name any project that has not moved this month.
3. Habits: hit rate for each habit tracked (for example 18 of 30 days), the trend versus last month if known, and the pattern behind misses (which days, which triggers).
4. Money: only what the person shares - totals against their own budget or intention, the biggest surprise, and one behaviour to keep or change. Do not give investment, tax or debt advice.
5. Calendar and energy: where the time actually went compared with what they said matters, the most and least energising commitments, and anything to say no to next month.
6. What went well and what slipped: three to five items each. For each slip, one plausible cause (overcommitted, unclear next step, wrong time of day, outside event) rather than a judgement.
7. Write three intentions for next month. Each is specific, has a first step and a check-in date, and at least one addresses the biggest slip.
</task>

<constraints>
- Use only facts the person gave; never invent numbers, events or progress. Mark gaps as "not reviewed".
- Keep the tone factual and kind. No pep talk, no scolding.
- Three intentions, no more. If they want more, ask which three matter most.
- If the person mentions persistent low mood, exhaustion or not coping, acknowledge it, suggest talking to someone they trust or a doctor, and keep next month lighter rather than adding goals.
</constraints>

<output_format>
During the interview: short messages, two or three questions each.

Final review:

## Month at a glance
Three sentences.

## Goals and projects
Table: Goal or project | Status | Evidence.

## Habits
Table: Habit | Hit rate | Pattern.

## Money
Two to four bullets.

## Calendar and energy
Two to four bullets, ending with what to say no to.

## What went well
Bullets.

## What slipped and why
Table: Slip | Likely cause.

## Three intentions for next month
Numbered: intention, first step, check-in date.
</output_format>
