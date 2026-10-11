---
schema: 1
id: set-goals-for-direct-report
kind: prompt
title: Set goals for a direct report
description: Drafts three to five goals for one direct report that tie to team priorities, are measurable, fit their level and stretch them without setting them up to fail.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [individual-goals, smart-goals, development-goals, alignment, performance-cycle]
pairs_with:
  prompts: [plan-one-on-one, write-performance-review, set-okrs]
  personas: [leadership-coach]
args:
  - name: report
    description: The person's role and level (initials only), how long they have been in it, their strengths, what they want to grow in, and how their last period went.
    type: text
    required: true
  - name: team_priorities
    description: The team's priorities or OKRs for the period, and what the person's work is expected to contribute to them.
    type: text
    required: true
  - name: period
    description: The goal period, for example "next 6 months" or "the 2027 review year". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Starting point, Draft goals, Stretch check, Agreeing them, Check-in plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced people manager who helps other managers set individual goals that actually get used. Most individual goals fail in predictable ways: they restate the job description ("deliver projects on time"), they are activities rather than outcomes ("attend training"), they have no baseline or measure, there are too many of them, they depend on things the person does not control, or they are so ambitious that missing them is guaranteed and the review becomes a punishment. Good goals are few (three to five), tied to what the team needs, written as an observable result with a measure and a date, matched to the person's level, and include at least one development goal that is about growth, not output. Goals the person helped shape are owned; goals handed down are tolerated.

<report>
{{report}}
</report>
<team_priorities>
{{team_priorities}}
</team_priorities>
{{#period}}Period: {{period}}{{/period}}
</context>

<task>
1. Starting point: summarise in three or four lines what this person's role must deliver for the team in the period, where they are strong, and the one or two growth areas most worth investing in. Note anything missing that you would need to write good goals, marked [X].
2. Draft goals: write three to five goals. At least two delivery goals linked to a named team priority, and one development goal linked to their growth area. For each: the goal as an outcome, the measure (with baseline if known, otherwise [baseline X]), the target date, which team priority it supports, and what is in versus out of their control.
3. Stretch check: rate each goal as safe, stretching or unrealistic for their level and tenure, and adjust any that are unrealistic. Flag goals that depend on other teams and say how to handle that dependency in the review (for example judge the part they own).
4. Agreeing them: questions to ask the person so they shape the goals (what they would add, what feels unclear, what support they need), and what is negotiable versus fixed.
5. Check-in plan: when to revisit progress (for example monthly in one-on-ones, a mid-point review), what would trigger changing a goal, and how to record changes so the review is fair.
</task>

<constraints>
- Use only the facts given. Do not invent metrics, baselines or numbers; mark them [X].
- No activity-only goals ("complete course X") unless paired with what the person will be able to do as a result.
- No more than five goals. If the input suggests more, say what to drop or fold in.
- Goals must be about work and growth, never personal life, health or attitude labels.
</constraints>

<output_format>
## Starting point
## Draft goals
Table: Goal | Measure | By when | Team priority | In their control?
## Stretch check
## Agreeing them
## Check-in plan
</output_format>
