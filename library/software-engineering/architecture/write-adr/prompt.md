---
schema: 1
id: write-adr
kind: prompt
title: Write an architecture decision record
description: Writes an architecture decision record that states one decision, the forces behind it, the options weighed and the honest consequences. Use when a significant technical choice is made or proposed.
category: architecture
version: 1.0.0
status: experimental
stage: [design]
role: [architect, tech-lead, software-engineer]
stack: []
requires: [none]
inputs: [notes, text, document]
output: [adr]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [decision-record, trade-offs, madr]
pairs_with:
  personas: [software-architect]
  prompts: [compare-design-options]
args:
  - name: decision
    description: The decision taken or proposed, or the question to decide, in a sentence or two.
    type: text
    required: true
  - name: context
    description: Notes, constraints, discussion excerpts, links or numbers behind the decision.
    type: text
  - name: options
    description: Options that were considered. Leave empty to draw them from the context.
    type: text
  - name: status
    description: Status to record in the ADR.
    type: enum
    enum: [proposed, accepted, superseded]
    default: proposed
  - name: template
    description: Layout to use when the project has no existing ADRs to copy.
    type: enum
    enum: [madr, nygard]
    default: madr
output_contract:
  format: markdown
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An architecture decision record (ADR) captures one architecturally significant decision so that someone joining the team in two years can see what was decided, why, and what it cost. Its value is honesty about the forces and the consequences. An ADR that lists only upsides, or quotes a benchmark nobody ran, is worse than no ADR, because readers trust it.
</context>

<task>
Write an ADR for this decision: {{decision}}
{{#context}}
Context and constraints:
{{context}}
{{/context}}
{{#options}}
Options considered:
{{options}}
{{/options}}

1. If you can read the repository, look for existing ADRs (for example `docs/adr/`, `doc/adr/`, `docs/decisions/`, `adr/`). If you find any, copy their layout, numbering and tone, and use the next free number. Otherwise use the {{template}} layout in the output format below.
2. Extract the decision drivers: the requirements, constraints and quality attributes that actually push the choice (for example latency, cost, team skills, deadline, compliance, existing systems). Use only drivers present in the input or the code.
3. List the options. Include "keep the current approach" when it is a real option. For each option, give pros and cons measured against the drivers, not generic ones.
4. State the decision in one active sentence ("We will …") and say why it wins on the drivers.
5. Write the consequences: what becomes easier, what becomes harder, new risks, follow-up work, and the signal that should make the team revisit this decision.
6. Record the status as {{status}}. If the input does not support a decision yet, record it as proposed and list what is missing under Open questions.
</task>

<constraints>
- One decision per ADR. If the input bundles several, write the main one and list the others under Open questions as candidates for their own ADRs.
- Never invent facts: no made-up benchmarks, prices, dates, names, quotes or product limits. Where a number would matter and none was given, write `TODO: measure …` with what to measure.
- Every option, including the chosen one, gets at least one real downside.
- Keep it readable in five minutes: about 300 to 800 words.
- Plain language. Define any acronym a new team member might not know.
{{> output/uncertainty}}
</constraints>

<output_format>
First line: the suggested file name, `NNNN-short-kebab-title.md`, using the next number when you know it and `NNNN` when you do not.
Then the ADR in Markdown.

madr layout:
# [Short title of the decision]
- Status: [status] · Date: [today if known, else TODO] · Deciders: [names given, else TODO]
## Context and problem statement
## Decision drivers
## Considered options
## Decision outcome
The chosen option and why, then a "Consequences" list of good, bad and neutral bullets.
## Pros and cons of the options
One subsection per option.
## Open questions
Omit when there are none.

nygard layout:
# [N]. [Title]
Date line, then `## Status`, `## Context`, `## Decision`, `## Consequences`, and `## Open questions` only when needed.
</output_format>
