---
schema: 1
id: set-working-hours-limits
kind: prompt
title: Set limits on working hours
description: Sets a firm end to your workday and keeps it - finds why work spills into evenings, fixes the daytime causes, sets device and message rules, and drafts how to tell your manager and colleagues.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [work-life-balance, overwork, evenings, stop-time, availability, sustainable-pace]
pairs_with:
  prompts: [design-shutdown-ritual, set-boundary, protect-deep-work-blocks]
args:
  - name: pattern
    description: When you work now, how often it spills into evenings or weekends, and what you are doing then (for example "answering Slack at 22:00", "finishing slides on Sunday").
    type: text
    required: true
  - name: target
    description: The hours you want to keep (for example "stop at 18:00, no weekend work").
    type: string
    required: true
  - name: work_context
    description: Your role, time zones you work across, on-call or contractual duties, and how your manager and team behave about after-hours messages. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why the day overflows, Daytime fixes, The stop line, Telling people, Exceptions, First two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone stop work spilling into evenings and weekends. A stop time on its own rarely holds, because the overflow usually starts during the day: meetings eat the hours for real work, so the real work moves to the evening; a few late replies teach colleagues to expect more; tasks have no defined "enough" so they expand; and the phone keeps work one tap away. Sustainable limits combine daytime fixes (protecting work hours, cutting or shortening meetings, scoping tasks), a visible stop line with a short shutdown, device and message settings, a clear message to colleagues about when you reply, and a small defined set of exceptions so the rule does not collapse at the first real emergency.

Current pattern:
<pattern>
{{pattern}}
</pattern>

Target: {{target}}
{{#work_context}}Work context: {{work_context}}{{/work_context}}
</context>

<task>
1. Name the specific causes of overflow from the pattern (for example "meetings 10:00-16:00 push deep work to evenings", "replying late trains colleagues").
2. Give daytime fixes for each cause: what to protect, shorten, decline or scope, so the work fits inside the target hours. If it clearly cannot fit, say so and point to a workload conversation.
3. Define the stop line: the time, a ten-minute shutdown (capture loose ends, set tomorrow's first task), and phone and laptop settings described in general terms (scheduled do-not-disturb, removing work apps from the home screen, a separate work profile).
4. Draft how to tell people: a short note to the manager framing the change around reliability and quality, and a line for colleagues about reply times and how to reach you for real urgency.
5. Define exceptions: what counts (on-call, launches, a named few deadlines), how often is acceptable, and how to take the time back.
6. Plan the first two weeks: one thing to track and what to do when the line is crossed.
</task>

<constraints>
- Respect contractual duties, on-call rotas and time-zone overlap the user mentions; design around them rather than ignoring them.
- Do not encourage the user to simply ignore their manager; suggest agreeing the change, and if the job truly demands more hours than the target, say so honestly and treat it as a workload or job-fit question.
- Do not state employment law about working hours; if the user asks, say rules differ by country and contract.
- If the user describes exhaustion, low mood or health effects, suggest talking to a doctor or support service alongside the plan.
</constraints>

<output_format>
## Why the day overflows
Bullets: cause and evidence from the pattern.

## Daytime fixes
Table: Cause | Fix | Who must agree.

## The stop line
Time, shutdown steps, device settings.

## Telling people
Message to manager, line for colleagues.

## Exceptions
Bullets.

## First two weeks
Tracking and what to do when it slips.
</output_format>
