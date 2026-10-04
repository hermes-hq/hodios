---
schema: 1
id: cost-out-content-plan
kind: prompt
title: Cost out a content plan
description: Costs a content plan in hours and money per piece and per month, from scripting and editing to tools and freelancers, against available time and budget, then shows what to cut or batch to fit.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, founder, marketer, manager]
subject: [nonprofit]
requires: [none]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [time-budget, content-costs, batching, capacity-planning, resourcing, trade-offs]
pairs_with:
  prompts: [plan-content-calendar, plan-content-repurposing-system, write-content-plan-one-pager]
  personas: [content-strategist]
args:
  - name: content_plan
    description: The plan you want to cost - formats, how many per week or month, channels, who does what, and any freelancers or tools you use or want.
    type: text
    required: true
  - name: available_hours
    description: Total hours per month you (or the team) can give content.
    type: number
    required: true
  - name: budget
    description: Money available per month for tools, freelancers, ads or props, with currency, for example "150 EUR", "none".
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Cost per piece, Monthly total, Gap, Options to fit, Recommended plan, Assumptions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn an ambitious content plan into one that fits the time and money actually available. Plans fail when nobody adds up the hours: a "simple" weekly video is often 4 to 10 hours once planning, filming, editing, thumbnails, captions, publishing and replying are counted, and small teams forget the hidden tasks (approvals, file hunting, community replies, reporting). A useful costing breaks each format into stages, uses the person's own times where known and clearly labelled estimates where not, adds a buffer, and then compares options: cut volume, cut formats, batch production, repurpose one core piece, simplify production quality, or pay for help.

Available hours per month: {{available_hours}}
Budget per month: {{budget}}
</context>

<task>
<content_plan>
{{content_plan}}
</content_plan>

1. For each format, list the stages (idea and research, scripting or writing, shooting or recording, editing, design and thumbnails, captions and alt text, approvals, publishing, community replies, measuring) with hours per piece. Use the user's times where given; otherwise give a cautious range and mark it as an estimate.
2. Add money per piece and per month: tools and subscriptions, freelancers (hours times a rate they confirm), stock or music licences, props, ads.
3. Monthly total: hours and money, plus a 15 to 20% buffer for overruns and admin.
4. Gap: totals against {{available_hours}} hours and the budget.
5. Options to fit, each with hours and money saved: reduce frequency, drop or pause a format, batch (for example film four videos in one session), repurpose one long piece into several short ones, simplify production (fewer edits, templates), use freelancers for specific stages, or reuse evergreen pieces.
6. Recommended plan that fits within available hours with the buffer, and what it gives up compared with the original.
</task>

<constraints>
- Never state freelancer rates or tool prices as fact; ask the user for them or show the formula with [rate] placeholders.
- Totals must add up; show the arithmetic.
- Protect quality on the format that drives the main goal; cut elsewhere first.
- If the plan has no volumes or the available hours are missing, ask for them and stop.
</constraints>

<output_format>
## Cost per piece
Table: format | stage | hours per piece | money per piece | source (your figure or estimate).

## Monthly total
Table: format | pieces per month | hours | money; totals row, buffer row, grand total.

## Gap
Two lines: hours over or under, money over or under.

## Options to fit
Table: option | hours saved | money saved or added | what you lose.

## Recommended plan
Bullets of the fitted plan, then its monthly totals.

## Assumptions to check
Bullets.
</output_format>
