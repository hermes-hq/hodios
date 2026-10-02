---
schema: 1
id: refine-backlog-ticket
kind: prompt
title: Refine a backlog ticket
description: Turns a vague ticket into a ready-for-development one with the user problem, scope and non-scope, open questions, acceptance criteria and a definition-of-ready check. Use in backlog refinement.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, tech-lead, software-engineer, business-analyst]
stack: []
requires: [none]
inputs: [ticket, text]
output: [rewrite, questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [backlog-refinement, definition-of-ready, user-story, acceptance-criteria]
pairs_with:
  personas: [product-manager]
  prompts: [write-acceptance-criteria, write-user-stories, break-down-epic, plan-sprint]
args:
  - name: ticket
    description: The ticket as it stands, including title, description, comments and any linked designs or bug details.
    type: text
    required: true
  - name: product_context
    description: Who the users are, the product area, related features and any constraints the team already knows.
    type: text
  - name: definition_of_ready
    description: Your team's definition of ready. Leave empty to use a common default.
    type: text
output_contract:
  format: markdown
  sections: [Refined ticket, Open questions, Definition-of-ready check, Suggested split]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A ticket is ready when an engineer who was not in the conversation can build it, a tester can verify it and nobody needs to ask the author what they meant. Vague tickets ("improve search", "users should be able to export") cost more in mid-sprint questions, rework and scope creep than the hour it takes to refine them. Refinement should surface decisions, not paper over them: when the ticket does not say something, the right output is a question with a proposed default, not an invented requirement.
</context>

<task>
Refine this ticket so it can pass the team's definition of ready.

<ticket>
{{ticket}}
</ticket>

{{#product_context}}
<product_context>
{{product_context}}
</product_context>
{{/product_context}}

{{#definition_of_ready}}
Definition of ready:
{{definition_of_ready}}
{{/definition_of_ready}}
If no definition of ready was given, use: the user problem is clear; scope and non-scope are written; acceptance criteria are testable; dependencies are known; designs or examples are attached where UI changes; open questions are answered or have an owner; it is small enough to finish in one sprint.

1. Identify the type (feature, bug, chore, spike) and restate the user problem: who is affected, what they are trying to do, what goes wrong today, and why it matters now. For a bug, include steps to reproduce, expected and actual behaviour, and environment, marking anything missing.
2. Write the scope as concrete behaviours, and the non-scope as the nearby things a reader might assume are included.
3. Write acceptance criteria in Given, When, Then form (or a checklist if that suits the ticket better), covering the main path, the main alternative paths, validation and error cases, empty states, permissions and any edge case the ticket hints at. Each criterion must be checkable by someone who did not write it.
4. List open questions. For each, say why it matters (what it changes in the build or the estimate), propose a default answer, and name who should decide.
5. Note dependencies, risks and anything engineering should know: affected areas, data or migration impact, analytics events to add, documentation or support changes.
6. Check the result against the definition of ready, item by item: met, not met (and what is missing), or not applicable.
7. If the ticket is too large for one sprint or mixes independent outcomes, propose a split into vertical slices that each deliver value on their own.
</task>

<constraints>
- Do not invent business rules, numbers, designs or decisions. Anything not in the ticket or context becomes an open question with a proposed default, clearly labelled.
- Keep the original intent. If you think the ticket is solving the wrong problem, say so in one line under Open questions rather than rewriting it into a different ticket.
- Write in plain language a new team member could follow. No filler.
</constraints>

<output_format>
## Refined ticket
**Title:** a short, specific title.
**Type:**
**Problem:** two to four sentences.
**Scope:** bullets.
**Out of scope:** bullets.
**Acceptance criteria:** numbered.
**Notes for engineering:** dependencies, risks, analytics, docs.
## Open questions
Table: question, why it matters, proposed default, who decides.
## Definition-of-ready check
Table: item, status (met, not met, n/a), what is missing.
## Suggested split
Numbered slices, or "Not needed".
</output_format>
