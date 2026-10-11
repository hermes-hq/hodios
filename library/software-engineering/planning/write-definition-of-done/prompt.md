---
schema: 1
id: write-definition-of-done
kind: prompt
title: Write a definition of done
description: Writes a team's definition of ready and definition of done as short checkable lists fitted to their stack and release process, with who checks each item and how to change it.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, qa-engineer, software-engineer]
stack: []
requires: [none]
inputs: [text, notes]
output: [checklist, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [definition-of-done, definition-of-ready, working-agreement, quality-gates]
pairs_with:
  prompts: [plan-sprint, refine-backlog-ticket, design-kanban-workflow]
args:
  - name: team_context
    description: The team, what it ships (web app, API, mobile, library), how code reaches production, and what already gets checked automatically in CI.
    type: text
    required: true
  - name: recent_problems
    description: Things that went wrong because work was called done too early, for example missing migrations, no docs, broken analytics.
    type: text
output_contract:
  format: markdown
  sections: [Definition of ready, Definition of done, Who checks what, Exceptions, How to change it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A definition of done is a team's shared list of what must be true before any item counts as finished. Most fail by being either aspirational (twenty items nobody checks) or vague ("tested", "documented"). Good ones are short, every line is checkable by someone other than the author, and each line exists because skipping it once hurt. Items already enforced by CI should be named as such, not checked by hand. A definition of ready is its mirror at the start: the minimum an item needs before the team pulls it, so work does not stall on unanswered questions. It must stay light, or it becomes a gate that blocks collaboration.
</context>

<task>
<team_context>
{{team_context}}
</team_context>
{{#recent_problems}}
<recent_problems>
{{recent_problems}}
</recent_problems>
{{/recent_problems}}

1. Write a definition of ready of four to seven items: problem and outcome clear, acceptance criteria, known dependencies, size small enough for the team's cadence, open questions answered or a spike planned.
2. Write a definition of done of six to ten items covering code reviewed and merged, tests at the right level, CI green, deployed to the agreed environment, monitoring or analytics where relevant, docs or changelog, feature flag state, and acceptance checked by the right person. Turn each recent problem into a line that would have caught it.
3. Mark each item as automated (CI enforces it) or manual, and name the role that checks manual ones.
4. Define the allowed exceptions (spikes, hotfixes, experiments) and what still applies to them.
5. Say how the team reviews and changes the list, for example at retrospectives, and how to remove lines that no longer earn their place.
</task>

<constraints>
- Every line must be checkable as yes or no; rewrite vague words like "tested" into what was tested and where.
- Do not include practices the team's stack or process clearly does not have; ask instead.
- Keep the definition of done to ten lines or fewer.
- Do not invent tools or CI checks that were not mentioned; mark them as suggestions.
</constraints>

<output_format>
## Definition of ready
Checklist.
## Definition of done
Checklist, each line tagged [automated] or [manual: role].
## Who checks what
Short table: item | checker | when.
## Exceptions
Bullets.
## How to change it
Two or three bullets.
</output_format>
