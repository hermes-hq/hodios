---
schema: 1
id: content-reset-track
kind: workflow
title: Content strategy reset track
description: Resets a stalled or scattered content effort in gated steps, from an audit of what worked to audience and goal, pillars and channels to keep or drop, a sized cadence and a four-week plan.
category: content-strategy
version: 1.0.0
status: incubating
stage: [review, plan, build]
role: [content-creator, founder, marketer, manager]
subject: [nonprofit]
requires: [none]
inputs: [text, dataset, notes]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-audit, refocus, channel-pruning, cadence, starter-plan, burnout]
pairs_with:
  prompts: [audit-content-library, define-content-pillars, plan-content-calendar, build-content-measurement-plan, cost-out-content-plan]
  personas: [content-strategist]
args:
  - name: current_content
    description: What you publish now and have published in the last 3 to 6 months - channels, formats, frequency, rough numbers, what you think worked and what felt like a chore. Paste exports or notes.
    type: text
    required: true
  - name: goals
    description: What the content is for (enquiries, sales, donations, members, sign-ups, reputation), who it is meant to reach, and why you want to reset now.
    type: text
    required: true
  - name: weekly_hours
    description: Hours per week you or the team can realistically give content after the reset.
    type: number
    default: 5
steps:
  - {id: audit, file: steps/01-audit.md, stage: review, gate: approve, artifact: "content-reset/01-audit.md"}
  - {id: focus, file: steps/02-audience-and-goal.md, stage: plan, gate: approve, artifact: "content-reset/02-audience-and-goal.md"}
  - {id: choose, file: steps/03-pillars-and-channels.md, stage: plan, gate: approve, artifact: "content-reset/03-pillars-and-channels.md"}
  - {id: rhythm, file: steps/04-cadence-and-measures.md, stage: plan, gate: approve, artifact: "content-reset/04-cadence-and-measures.md"}
  - {id: starter, file: steps/05-four-week-plan.md, stage: build, gate: none, artifact: "content-reset/05-four-week-plan.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Resets a content effort that has stalled, sprawled across too many channels or lost its point. It looks honestly at what exists, agrees one audience and goal, keeps fewer pillars and channels, sets a rhythm that fits real hours, and ends with four weeks of concrete pieces. Each step writes one artifact and waits for approval.

<current_content>
{{current_content}}
</current_content>

<goals>
{{goals}}
</goals>

Weekly hours available: {{weekly_hours}}

Rules for every step:
- Use only the numbers and facts given. Ask for missing essentials (which channels bring results, hours, the goal) and mark gaps as [X]; never invent analytics, benchmarks or audience facts.
- Fewer, better: every step should remove something as well as add something.
- Judge content against the goal, not against vanity metrics; compare like with like (same platform, similar age of post).
- Respect real capacity, including rest; a smaller plan kept for a year beats an ambitious one dropped in a month.
- No engagement bait, bought followers or undisclosed sponsorship.
- End each artifact with open questions.
