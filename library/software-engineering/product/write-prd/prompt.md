---
schema: 1
id: write-prd
kind: prompt
title: Write a PRD
description: Writes a product requirements document that an engineering team can build from, with the problem, goals, success metrics, testable requirements, edge cases and open questions.
category: product
version: 1.0.0
status: experimental
stage: [plan, discover]
role: [product-manager, founder, tech-lead]
stack: []
requires: [none]
inputs: [notes, text, document]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [requirements, prd, success-metrics]
pairs_with:
  personas: [product-manager]
  prompts: [write-user-stories, break-down-epic]
args:
  - name: idea
    description: The feature or problem the PRD is for, in a few sentences.
    type: text
    required: true
  - name: context
    description: Research, data, customer feedback, constraints, notes from meetings, links.
    type: text
  - name: length
    description: one-pager for early alignment, full for a build-ready document.
    type: enum
    enum: [one-pager, full]
    default: full
output_contract:
  format: markdown
  sections: [Problem, Goals and non-goals, Success metrics, Users and use cases, Requirements, Edge cases, Risks and dependencies, Rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A PRD aligns product, design and engineering on what to build and why, before the expensive work starts. Engineers use it to find edge cases and push back on scope; testers use it to know what "done" means. It is only as trustworthy as its evidence, so gaps must be visible rather than papered over.
</context>

<task>
Write a {{length}} PRD for: {{idea}}
{{#context}}
Material to work from:
{{context}}
{{/context}}

1. Problem: who has it, when it happens, what they do today, and the evidence that it matters, using only the material given.
2. Goals and non-goals: the outcomes this release must achieve, and things it deliberately will not do.
3. Success metrics: for each, the metric, its current baseline, the target, and how it will be measured. Include one guardrail metric that must not get worse.
4. Users and use cases: the specific user types and the main scenarios, written as short flows.
5. Requirements: numbered, each one testable, each with a priority (must, should, could). Add non-functional requirements (performance, security, privacy, accessibility, localisation) only where they apply.
6. Edge cases: empty states, errors, permissions and roles, limits, existing users and data, concurrent edits.
7. Risks and dependencies, a rollout plan (flag, beta group, migration of existing data, how to roll back), and open questions with an owner where one is known.
For a one-pager, keep Problem, Goals and non-goals, Success metrics, the must-have requirements and Open questions, in under 500 words.
</task>

<constraints>
- Describe what and why, not how. Mention implementation only when it is a real constraint.
- Never invent research, user quotes, numbers, dates or names. Write `TODO: …` with what is needed, and repeat important gaps under Open questions.
- Mark assumptions with "Assumption:" so reviewers can challenge them.
- Use plain language a new engineer understands. No marketing tone.
{{> output/uncertainty}}
</constraints>

<output_format>
# [Feature name]
A status line: Draft · Owner: [TODO unless given] · Last updated: [TODO unless known].
Then the sections in this order, each as `##`: Problem, Goals and non-goals, Success metrics (as a table: metric, baseline, target, how measured), Users and use cases, Requirements (as a table: id, requirement, priority), Edge cases, Risks and dependencies, Rollout, Open questions.
For a one-pager, include only the sections named in the task.
</output_format>
