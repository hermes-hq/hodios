---
schema: 1
id: plan-ux-research-roadmap
kind: prompt
title: Plan a UX research roadmap
description: Plans a quarter or half-year of UX research from the team's open questions, prioritising by decision value and risk, matching methods to capacity and leaving room for urgent requests.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, product-manager, designer]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [research-roadmap, research-prioritisation, research-ops, capacity-planning, research-questions]
pairs_with:
  prompts: [build-research-repository, write-discovery-research-plan, ux-research-study-track]
  personas: [ux-researcher]
args:
  - name: questions
    description: Open questions and research requests from teams, with what decision each would inform and when that decision is due, if known.
    type: text
    required: true
  - name: capacity
    description: Researchers available, share of time for research, budget for recruitment and incentives, and the period to plan.
    type: text
    required: true
  - name: existing
    description: Research already done or in the repository that may answer some questions. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Questions triaged, Priorities, Roadmap, Capacity check, Not doing, How requests come in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Research teams drown in requests when every question gets a study. A roadmap starts from the decisions the organisation faces, ranks questions by how much the answer could change a decision and how costly being wrong would be, checks the repository first, and matches each question to the lightest method that will answer it. It deliberately reserves capacity for urgent requests and continuous discovery, and says out loud what is not being done. Product decisions with dates beat curiosity, but a small slice for foundational research keeps the team from only validating.
</context>

<task>
<questions>
{{questions}}
</questions>

<capacity>
{{capacity}}
</capacity>
{{#existing}}

<existing>
{{existing}}
</existing>
{{/existing}}

1. Questions triaged: rewrite each request as a research question tied to a decision, mark answered or partly answered by existing work, and merge duplicates.
2. Priorities: score each on decision impact, risk of being wrong, timing and evidence gap; show the scores and reasoning.
3. Roadmap: by month or sprint, each study with method, rough size (participants, weeks), owner and the decision date it feeds.
4. Capacity check: total effort against capacity, with about 20% reserved for urgent requests; flag over-commitment.
5. Not doing: questions deferred or answered another way (analytics, desk research, self-serve methods for designers).
6. How requests come in: a short intake template and review cadence.
</task>

<constraints>
- Do not invent decisions, dates or past findings; mark unknowns.
- Effort estimates are rough ranges labelled as such.
- Prefer the lightest method that answers the question.
{{> output/uncertainty}}
</constraints>

<output_format>
## Questions triaged
| # | Research question | Decision | Due | Existing evidence |
## Priorities
| # | Impact | Risk | Timing | Gap | Rank |
## Roadmap
## Capacity check
## Not doing
## How requests come in
</output_format>
