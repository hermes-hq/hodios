---
schema: 1
id: plan-post-launch-first-30-days
kind: prompt
title: Plan the first 30 days after a launch
description: Plans the month after a launch with daily then weekly monitoring, a feedback triage cadence, protected quick-fix capacity, follow-up communications and a day-30 decision on what comes next.
category: product-launch
version: 1.0.0
status: incubating
stage: [operate, learn]
role: [product-manager, engineering-manager, marketer, founder]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [post-launch, feedback-triage, hypercare, launch-follow-up, iteration]
pairs_with:
  prompts: [review-launch-results, plan-feature-adoption-push, plan-launch-retrospective, write-known-issues-page]
args:
  - name: launch
    description: What launched, when, to whom, the success metrics and targets, the channels used, and team capacity for fixes.
    type: text
    required: true
  - name: early_signals
    description: Anything already known - early numbers, bugs, support themes, reviews, sales feedback. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Operating rhythm, What to watch, Feedback triage, Fix capacity, Follow-up communications, Day-30 decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who runs the month after a launch. Most launches lose momentum in week two: the team moves to the next project, early bugs linger, feedback piles up unread, and the follow-up communications that would turn first-week curiosity into habit never go out. The first 30 days need a lighter operating rhythm than launch day but a real one: an owner, a short daily check that becomes weekly, a feedback triage that turns noise into a ranked list, capacity protected for quick fixes, communications timed to what users need next, and a decision at day 30 rather than drift.

Launch: {{launch}}
{{#early_signals}}Early signals: {{early_signals}}{{/early_signals}}
</context>

<task>
1. Set the operating rhythm: a named owner role, a 15-minute daily check in week one, twice-weekly in weeks two and three, weekly in week four; who attends and what each check decides.
2. List what to watch: adoption and activation against target, the outcome metric, guardrails (errors, performance, support volume, refunds or cancellations), and qualitative sources (support tickets, reviews, sales and success notes, social mentions). For each, the source, cadence and a threshold that triggers action. Use placeholders where no baseline exists.
3. Design feedback triage: one intake place, tagging by theme and severity, a weekly ranked list (frequency times impact), and the rule for what gets fixed now, what goes to the backlog, and what gets a "not planned" reply. Include closing the loop with users who reported issues.
4. Protect fix capacity: how much of the team's time to reserve for quick fixes in weeks one to four, the criteria for a fix to qualify, and when to stop.
5. Plan follow-up communications: tips or how-to content at week one, a "you asked, we fixed" update at week two or three, nudges to users who tried it once, an internal update to the company with early results, and updates to known issues.
6. Define the day-30 decision: invest more, iterate, keep as is, or roll back, with the evidence that would point to each, and what the review meeting needs.
7. If early signals are given, apply them: what they suggest and what to do this week.
</task>

<constraints>
- Do not invent baselines or targets; use the ones given or mark them [set target].
- Keep the rhythm proportionate to the launch size; a small feature gets a lighter version.
- Separate first-week noise (novelty, learning curve) from real problems before reacting.
- Owners are roles, not names.
</constraints>

<output_format>
## Operating rhythm
Table: week | check cadence | attendees | decides.

## What to watch
Table: signal | source | cadence | trigger | action.

## Feedback triage
Numbered process.

## Fix capacity
Bullets.

## Follow-up communications
Table: when | audience | channel | message.

## Day-30 decision
Table: option | evidence pointing to it. Then the review agenda.
</output_format>
