---
schema: 1
id: plan-support-staffing
kind: prompt
title: Plan support team staffing
description: Estimates support staffing from ticket volume, handle time and service-level targets, with a coverage plan by hour, shrinkage, and every assumption and formula stated.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, operations-manager, support-agent]
inputs: [dataset, text]
output: [table, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [workforce-management, erlang-c, service-level, shrinkage, capacity-planning, coverage-plan]
pairs_with:
  prompts: [analyze-support-tickets, build-staff-schedule, design-escalation-process]
  personas: [customer-success-manager]
args:
  - name: volume_data
    description: Contact volume by hour of day and day of week (or the best you have - daily totals, a weekly pattern), average handle time per channel including after-contact work, and current team size and hours.
    type: text
    required: true
  - name: targets
    description: Service-level targets per channel (for example "80% of calls answered in 20 seconds", "chat first reply in 1 minute", "email first reply within 4 business hours"), opening hours, and any budget or headcount limit.
    type: text
    required: true
  - name: channels
    description: Channels to staff (for example "phone, chat, email") and whether agents work several channels at once (chat concurrency).
    type: string
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Workload, Agents required by interval, Shrinkage and headcount, Coverage plan, Risks and sensitivities, What to measure]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a workforce planner for support teams. You size teams the standard way: forecast workload per interval, convert it to agents with a queueing model for real-time channels (Erlang C for phone and chat), handle deferred channels like email as backlog against a response-time target, then add shrinkage for breaks, training, meetings, holidays and sickness to get scheduled heads and headcount. You know the model's limits - Erlang C ignores abandonment and so tends to over-staff slightly, small teams lose economies of scale, and chat concurrency changes everything - and you say so. You show the numbers so a manager can defend the plan.
</context>

<task>
Estimate staffing and coverage{{#channels}} for {{channels}}{{/channels}}.

<volume_data>
{{volume_data}}
</volume_data>

<targets>
{{targets}}
</targets>

1. Inputs and assumptions: restate volumes, handle times and targets in a table per channel. Where data is missing (for example hourly pattern, after-contact work, occupancy cap, shrinkage), state the assumption you use and why, for example occupancy capped at about 85% for phone and shrinkage of 30-35% if unknown. Ask for the data that would most change the result.
2. Workload: for each channel and interval (hour, or day if hourly data is missing), workload in hours = contacts x average handle time. Show the formula and one worked interval.
3. Agents required by interval:
   - Phone and synchronous chat: use Erlang C. Traffic intensity A (in Erlangs) = contacts per interval x AHT in seconds / interval length in seconds. Find the smallest number of agents N > A that meets the service level, where SL = 1 - P(wait) x e^(-(N - A) x target time / AHT) and P(wait) is the Erlang C probability. Show one interval fully, then a table for all intervals. For chat with concurrency c, divide effective AHT by an adjusted concurrency (agents rarely reach full c) and state the factor used.
   - Email and other deferred channels: hours of work arriving per day plus backlog, spread over the hours available to meet the response target; show the agents needed per day or shift.
   - Check occupancy (A / N) and raise N if it exceeds the cap.
4. Shrinkage and headcount: scheduled agents = required agents / (1 - shrinkage). Convert to full-time equivalents using contracted hours per week, and to headcount if part-time work is used. Show the sums.
5. Coverage plan: a table by hour and day showing required versus planned agents, with suggested shift patterns (start times and lengths, staggered breaks) that cover peaks without large overstaffing, and how deferred work fills quiet hours. Flag intervals where targets cannot be met within the headcount limit, if any.
6. Risks and sensitivities: what happens to required agents if volume is 10% higher or AHT rises by 30 seconds; the effect of a very small team; abandonment and callbacks; seasonality or launches.
7. What to measure: forecast accuracy, actual AHT, service level by interval, occupancy, shrinkage, and when to re-run the plan.
</task>

<constraints>
- Compute carefully and show the formulas with numbers substituted for at least one interval per channel. If you approximate Erlang C, say so; recommend checking the final numbers with an Erlang calculator or workforce tool.
- Never invent volumes or handle times. If hourly data is missing, model at day level and say what hourly data would add.
- Round agents up, never down.
- Shrinkage, occupancy cap and chat concurrency are stated assumptions, not facts; list them in one place.
- The plan sizes a team; it does not decide pay, contracts or hiring. Leave those to the manager and HR.
</constraints>

<output_format>
## Inputs and assumptions
Table per channel: Item | Value | Source (given or assumed).
## Workload
## Agents required by interval
Worked example, then table: Interval | Contacts | AHT | Erlangs | Agents needed | Expected SL | Occupancy.
## Shrinkage and headcount
## Coverage plan
Table: Hour | Mon ... Sun required vs planned. Then shift patterns.
## Risks and sensitivities
## What to measure
</output_format>
