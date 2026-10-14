---
schema: 1
id: write-use-case-specification
kind: prompt
title: Write use case specifications
description: Writes fully dressed use cases for a system, with actors, goals, preconditions, main success scenario, alternate and exception flows, postconditions and business rules, numbered for traceability.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [business-analyst, product-manager, architect, qa-engineer]
stack: []
requires: [none]
inputs: [notes, spec, document]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [use-cases, business-analysis, uml, requirements]
pairs_with:
  prompts: [write-user-stories, write-requirements-traceability-matrix, derive-test-cases-from-requirements]
args:
  - name: system_description
    description: The system or feature, the people and systems that interact with it, and the goals they pursue.
    type: text
    required: true
  - name: context
    description: Business rules, existing processes, notes from workshops, and the level of detail or template the organisation expects.
    type: text
output_contract:
  format: markdown
  sections: [Actors and use case list, Use cases, Business rules, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Use cases remain the standard in many organisations, tenders and regulated projects because they capture complete interactions, including what goes wrong, in a form both business and engineering can sign off. Weak use cases describe screens instead of goals ("user clicks Save"), mix several goals into one, skip the alternate and exception flows where most of the real requirements live, and leave preconditions and postconditions vague so testers cannot derive cases. The approach Alistair Cockburn popularised works well: one use case per actor goal at user-goal level, a numbered main success scenario written as actor and system steps in plain language without UI detail, extensions numbered against the step they branch from (3a, 3b), clear preconditions, minimal and success guarantees, and business rules pulled out and referenced by id so they are written once.
</context>

<task>
<system>
{{system_description}}
</system>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Identify actors: primary human actors, secondary actors and external systems, each with a one-line description.
2. List use cases at user-goal level (one sitting, one goal, the actor would be satisfied to stop afterwards), each with an id (UC-01), name as verb phrase, primary actor and priority. Note any summary-level or sub-function use cases separately.
3. For each use case write: goal, scope, level, primary actor, stakeholders and interests, preconditions, trigger, main success scenario as numbered steps alternating actor and system actions without UI specifics, extensions keyed to step numbers (for example 4a. Card declined) with their own steps and how they end, postconditions (success guarantee and minimal guarantee), and referenced business rules.
4. Extract business rules into a numbered list (BR-01) with the use cases that reference them.
5. List open questions and contradictions found in the input, each tied to a use case.
</task>

<constraints>
- Write goals, not screens: no button names or field layouts in the main scenario.
- Every use case has at least the realistic failure extensions (invalid input, rejection, timeout or system unavailable, cancellation) where they apply.
- Do not invent business rules; mark guessed rules as assumptions and list them as open questions.
- If the organisation gives a template, follow its headings instead of the default.
- If actors or goals are unclear, ask before writing full use cases.
</constraints>

<output_format>
## Actors and use case list
Table of actors, then table: id, use case, primary actor, priority.
## Use cases
For each: ### UC-NN Name, then labelled fields, numbered main scenario and extensions.
## Business rules
Numbered BR-NN with referencing use cases.
## Open questions
Numbered: question, affected use case.
</output_format>
