---
schema: 1
id: turn-design-doc-into-tickets
kind: prompt
title: Turn a design doc into tickets
description: Turns an approved technical design doc into tracker-ready tickets with titles, descriptions, acceptance checks, dependencies, labels and a suggested order.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [document, spec, repo]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [design-doc, ticket-writing, work-breakdown, tracker-import, dependencies, vertical-slices]
pairs_with:
  prompts: [break-down-epic, write-implementation-plan, size-backlog-items]
args:
  - name: design_doc
    description: The approved design doc, or its relevant sections (goals, proposed design, data model, API, rollout, open questions).
    type: text
    required: true
  - name: conventions
    description: Your tracker and conventions, for example Jira or Linear, issue types, labels, components, a ticket template, and the maximum size of a ticket.
    type: text
  - name: format
    description: How to return the tickets.
    type: enum
    enum: [markdown, csv]
    default: markdown
output_contract:
  format: markdown
  sections: [Gaps in the doc, Tickets, Order and dependencies, Not ticketed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A design doc describes the end state; tickets have to describe a safe path to it. Teams that ticket a doc section by section get layer tickets ("build the database", "build the API") that cannot be tested or shipped alone, forget the work around the design (migrations and backfills, feature flags, metrics and alerts, docs, cleanup of the old path), and hide the doc's open questions inside tickets where nobody resolves them. Good tickets are small enough to review in a day or two, each leaves the system working, each has acceptance checks a reviewer can verify, and dependencies are explicit so work can run in parallel.
</context>

<task>
<design_doc>
{{design_doc}}
</design_doc>
{{#conventions}}Tracker conventions: {{conventions}}{{/conventions}}
Return the tickets as {{format}}.

1. Read the whole doc first. List anything that blocks ticketing: open questions, contradictions, decisions not made. Turn each into a spike or decision ticket rather than guessing.
2. If you can read the repository, check where the change lands (modules, existing patterns, migrations folder) and use real paths in the tickets; otherwise say the paths are to be confirmed.
3. Break the design into tickets of no more than about two days each, preferring thin vertical slices behind a flag over horizontal layers. Include the supporting work: schema migration and backfill, flag creation and removal, observability, load or security checks named in the doc, documentation, rollout steps, and removal of the old code path.
4. For each ticket give: title (imperative, under 80 characters), description with the why and a link to the doc section, acceptance checks (testable bullets), dependencies (ticket numbers), labels or components, and a size (S, M, L).
5. Order the tickets into a sequence with parallel tracks, and mark the first ticket that delivers something demonstrable.
6. For CSV, use columns Summary, Description, Issue Type, Labels, Depends On, Size, with acceptance checks inside Description, and quote fields that contain commas or line breaks.
</task>

<constraints>
- Do not add scope the doc does not contain; put suggestions under Not ticketed.
- No ticket without acceptance checks.
- Do not invent file paths, endpoints or field names that are not in the doc or the code.
{{> output/uncertainty}}
</constraints>

<output_format>
## Gaps in the doc
Bullets, each with the spike or decision ticket created for it.
## Tickets
The tickets in the chosen format (in markdown, one block per ticket).
## Order and dependencies
Numbered sequence with parallel tracks.
## Not ticketed
Suggestions outside the doc's scope.
</output_format>
