---
schema: 1
id: write-content-plan-one-pager
kind: prompt
title: Write a content strategy one-pager
description: Writes a one-page content strategy for a manager, board or client covering goal, audience, three pillars, channels, resources, success measures and what will not be done. Written to win approval.
category: content-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, content-creator, consultant, manager]
subject: [nonprofit]
requires: [none]
inputs: [notes, text]
output: [docs, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [strategy-summary, stakeholder-buy-in, budget-request, board-paper, client-proposal]
pairs_with:
  prompts: [define-content-pillars, plan-content-calendar, build-content-measurement-plan]
  personas: [content-strategist]
args:
  - name: strategy_notes
    description: Your strategy notes in any form - goals, audience, pillars, channels, cadence, team and budget, what you want approved, and any history (what was tried before).
    type: text
    required: true
  - name: reader
    description: Who will read it - your manager, a board or trustees, or a client.
    type: enum
    enum: [manager, board, client]
    default: manager
output_contract:
  format: markdown
  sections: [The ask, Why this matters, Who it is for, What we will publish, Resources needed, How we will know it works, What we will not do, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a content lead's working notes into a one-page strategy that a decision-maker can approve in five minutes. The content team's version is full of formats, hooks and calendars; the reader's questions are different: what is this for, what will it cost, what do I need to decide, how will we know it worked, and what could go wrong. One-pagers fail when they bury the ask at the bottom, promise outcomes that cannot be measured, or hide the resource gap so the plan quietly fails later. A good one names the decision in the first line, links content to an organisational goal the reader already cares about, shows the trade-offs (including what will stop), and asks for exactly what is needed.

Reader: {{reader}}
- manager: practical, focuses on time, priorities and what drops.
- board: strategic and accountable, focuses on mission or business goal, risk, reputation and cost; avoid jargon and platform detail.
- client: commercial, focuses on business results, deliverables, timeline, their approvals and fees.
</context>

<task>
<strategy_notes>
{{strategy_notes}}
</strategy_notes>

1. Identify the decision needed (approve, fund, staff, or choose between options) and put it first.
2. Tie the content goal to an organisational goal named in the notes (sales, enquiries, donations, volunteers, members, policy influence). If none is named, ask.
3. Describe the audience in one or two sentences a non-specialist understands.
4. State three pillars as plain topics with one example piece each, channels and cadence in one line each.
5. Resources: people hours, money (tools, freelancers, ads) and anything needed from the reader (approvals, access, spokespeople). Show the gap between what exists and what is needed.
6. Success measures: two or three outcome metrics with a baseline or [X] and a review date; no vanity metrics.
7. What we will not do: channels, formats or requests that are deliberately excluded, so expectations are clear.
8. Risks: the two or three that matter to this reader and the mitigation for each.
</task>

<constraints>
- One page: about 350 to 450 words total. Cut detail before cutting the ask, the resources or the measures.
- Use only facts and figures from the notes. Missing costs, baselines or dates become [X] and are listed in a short line after the one-pager.
- Plain language; no unexplained acronyms or platform jargon, especially for a board.
- Do not overpromise: phrase expected results as targets with assumptions.
</constraints>

<output_format>
A title line, then these headings, each with two to four short lines or bullets:

## The ask
## Why this matters
## Who it is for
## What we will publish
## Resources needed
## How we will know it works
## What we will not do
## Risks

Then one line starting "To confirm:" listing any [X] placeholders.
</output_format>
