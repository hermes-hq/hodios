---
schema: 1
id: plan-design-system-roadmap
kind: prompt
title: Plan a design system roadmap
description: Turns a design system backlog of requests, bugs and debt into a prioritised quarterly roadmap scored on adoption impact, reach and effort, with what is deliberately not being done.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan]
role: [designer, product-manager, tech-lead, frontend-engineer]
requires: [none]
inputs: [notes, ticket, dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quarterly-planning, backlog-scoring, capacity-planning, adoption, support-load]
pairs_with:
  prompts: [measure-design-system-adoption, triage-component-request, build-design-system-business-case]
  personas: [design-systems-lead]
args:
  - name: backlog
    description: The backlog items (requests, bugs, accessibility defects, debt, new components, documentation), with any data on who asked and how many products are affected.
    type: text
    required: true
  - name: capacity
    description: The team's capacity for the period, e.g. "1 designer and 2 engineers for one quarter, about 30% lost to support".
    type: string
    required: true
  - name: context
    description: Optional. Company goals for the period, adoption data, product launches the system must support, and commitments already made.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Themes, Prioritised backlog, Roadmap, Not now, Dependencies, Measures, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design system teams are usually small and serve many teams, so a roadmap is mostly about what not to do. The work splits into support and maintenance (bugs, questions, upgrades), which never goes away, and investment (new components, foundations, tooling). Experienced leads reserve capacity for support before planning anything, weigh each item by how many products and screens it reaches, fix widely used accessibility defects and adoption blockers before building new components, sequence foundations before the components that depend on them, and publish a "not now" list with reasons so requesters stop waiting in silence. Commitments beyond the next quarter are directions, not dates.
</context>

<task>
Build the roadmap.

<backlog>
{{backlog}}
</backlog>

Capacity: {{capacity}}.
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Capacity split.** Reserve a share for support and maintenance based on the context (state the share and why), and show what is left for planned work.
2. **Themes.** Group the backlog into 3 to 5 themes linked to the goals in the context (for example adoption blockers, accessibility, foundations for dark mode, tooling).
3. **Score.** For every item: reach (products or screens affected), severity or value, alignment with goals, effort (S, M, L with a rough size), and dependencies. Say where a score is a guess.
4. **Prioritise.** Rank by value over effort, then apply rules: widely used accessibility defects and adoption blockers first, foundations before dependent components, commitments already made honoured or explicitly renegotiated.
5. **Roadmap.** What fits in the period, by month or sprint, within the remaining capacity. Show the total effort against capacity.
6. **Not now.** Everything that did not fit, with a one-line reason each and what would bring it forward.
7. **Dependencies.** Items that need other teams (product launches, platform upgrades, brand decisions) and the risk if they slip.
8. **Measures.** Two to four measures that show the roadmap worked, tied to adoption or quality, not to the count of components shipped.
9. If the backlog exceeds capacity by a large factor, say so plainly and do not squeeze it in.
</task>

<constraints>
- Do not invent reach data, team names or dates beyond the period; mark estimates.
- Total planned effort must not exceed the stated capacity after the support reservation.
- Do not use the number of components shipped as a success measure.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Prioritised backlog as a table (Item, Theme, Reach, Value, Effort, Score, Decision). Roadmap as a table by month or sprint. End with Open questions.
</output_format>
