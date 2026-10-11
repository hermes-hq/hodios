---
schema: 1
id: plan-sales-rep-coaching
kind: prompt
title: Plan coaching for one sales rep
description: Diagnoses one rep's performance from activity and conversion numbers, finds the stage where deals break, and plans four weeks of focused coaching with a measure of progress.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder, executive]
requires: [none]
inputs: [dataset, notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-coaching, rep-development, sales-management, conversion-rates, one-to-one]
pairs_with:
  prompts: [analyze-sales-rep-performance, score-discovery-call, plan-new-rep-ramp]
  personas: [sales-coach]
args:
  - name: rep_numbers
    description: The rep's numbers for a recent period, ideally beside the team average - activities (calls, emails, meetings), meetings booked, conversion at each stage, win rate, average deal size, cycle length, discounting, and quota attainment.
    type: text
    required: true
  - name: observations
    description: What you have seen or heard - call recordings, deal reviews, how they plan their week, feedback from buyers or peers, tenure and territory, and what the rep says is hard. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Evidence, Coaching focus, Four-week plan, Measures, First conversation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a sales manager coach one rep. Managers often coach on everything at once ("do more calls, better discovery, close harder") and on the outcome (missed quota) rather than its cause. Sales coaching works best when it finds the one stage where this rep's numbers break compared with peers in similar territories, works out whether the cause is activity (not enough at the top), skill (conversion drops at a stage), deal selection (chasing poor-fit deals) or will and circumstances, and then practises one skill at a time with real deals and call reviews, measured by a leading indicator that moves within weeks. A rep's numbers must be read against their territory, tenure and deal mix; a low win rate in a harder territory is not the same problem as a low win rate in an easy one. This prompt is for coaching one person; for comparing the whole team, run a team-wide rep analysis first.
</context>

<task>
<rep_numbers>
{{rep_numbers}}
</rep_numbers>

{{#observations}}<observations>
{{observations}}
</observations>{{/observations}}

1. **Diagnosis:** compare the rep's numbers with the team or benchmarks given, stage by stage, and find where the gap starts. Classify the most likely cause (activity, skill at a named stage, deal selection, or circumstances) and note any alternative explanations (territory, tenure, small numbers).
2. **Evidence:** list the numbers and observations behind the diagnosis, and what is missing that would confirm it (for example, listening to three discovery calls).
3. **Coaching focus:** one primary skill or behaviour to work on, at most one secondary, and what good looks like in concrete, observable terms.
4. **Four-week plan:** week by week, what the manager and rep do (call reviews, role-plays on real upcoming deals, joint calls, deal planning), how long each takes, and what the rep practises on live deals.
5. **Measures:** one leading indicator for the focus skill (for example, share of discovery calls with a confirmed pain and next step) and its target after four weeks, plus the lagging result to watch later.
6. **First conversation:** how to open the coaching conversation so the rep sees it as support: share the data, ask for their view first, agree the focus together.
</task>

<constraints>
- Base the diagnosis on the numbers and observations given; label hunches as hypotheses to check.
- Coach one or two things, not a list of ten.
- Keep this developmental: do not draft warnings, performance improvement plans or dismissal steps. If the user asks for those, say they are an HR process and should involve HR.
- If the numbers include no comparison to peers or a benchmark, say the diagnosis is weaker and ask for team averages, while still giving a provisional read.
</constraints>

<output_format>
## Diagnosis
Short paragraph: where the gap starts, likely cause, alternatives.

## Evidence
Table: Metric or observation | Rep | Team or benchmark | What it suggests.

## Coaching focus
Primary focus, optional secondary, and what good looks like.

## Four-week plan
Table: Week | Manager does | Rep does | Time.

## Measures
Leading indicator with target, and the lagging result.

## First conversation
Suggested opening and three questions to ask the rep.
</output_format>
