---
schema: 1
id: write-spec-for-coding-agent
kind: prompt
title: Write a feature spec for a coding agent
description: Writes a spec-driven development package for a coding agent, with requirements in EARS form, a design grounded in the existing codebase, and an ordered task list with tests and checkpoints.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [software-engineer, tech-lead, product-manager, fullstack-engineer]
stack: []
requires: [repo-read]
inputs: [repo, spec, notes]
output: [docs, plan, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spec-driven, coding-agents, ears, requirements]
pairs_with:
  prompts: [make-issue-agent-ready, implement-feature-from-spec, write-acceptance-criteria]
args:
  - name: feature_request
    description: What the feature should do and why, in plain words, with any ticket text or examples.
    type: text
    required: true
  - name: context
    description: Constraints (deadline, areas not to touch, performance or compliance needs), the agent that will build it, and where spec files should live.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Design, Tasks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agents do their best work from a spec that removes guessing, and their worst from a paragraph. Spec-driven development splits the work into three documents: requirements (what must be true), design (how it fits this codebase) and tasks (small ordered steps, each verifiable). Requirements written in EARS form (Easy Approach to Requirements Syntax: "When <trigger>, the <system> shall <response>", "While <state>, ...", "If <unwanted condition>, then ...", "Where <feature is included>, ...") are short, testable and hard to misread, and they force unwanted-behaviour cases to be written. The design must come from reading the repository: the existing modules, patterns, data models, error handling and test style the agent should follow; a design that invents a new layer the codebase does not use is the most common reason agent output is rejected. Tasks should each touch a small area, reference the requirements they satisfy, include the tests to add, and end at checkpoints where the human reviews before the agent continues.
</context>

<task>
<feature_request>
{{feature_request}}
</feature_request>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Read the repository before writing: find the modules the feature touches, similar existing features to copy, the data model, API and UI conventions, error handling, configuration, and how tests are written and run. Note the files you read.
2. Write requirements: a one-paragraph goal, user stories where useful, and numbered acceptance requirements in EARS form (ubiquitous, event-driven, state-driven, unwanted behaviour, optional feature), including error, permission, empty and limit cases. Add explicit non-goals.
3. Write the design grounded in what you read: components and files to change or add, data model and migration changes, API or interface changes, how errors and edge cases are handled, security and performance notes, and the testing approach, each following an existing pattern you name. Note alternatives rejected in one line each.
4. Write tasks: an ordered checklist of small tasks, each with the files involved, the requirement ids it satisfies, the tests to add or update, and a done condition. Insert checkpoints for human review after risky steps (migrations, public API changes). Never include destructive commands without a confirmation step.
5. List open questions that block or change the design, each with a recommended default.
6. If the user gave a location for spec files, propose the three file names; otherwise return all three sections in one document.
</task>

<constraints>
- Do not write implementation code; this is the spec the agent will implement from.
- Ground every design decision in files you actually read; if you could not read the repository, say so and mark the design as provisional.
- Every requirement must be testable and every task must map to at least one requirement.
- Keep tasks small enough to review in one sitting; split anything that touches many unrelated areas.
- If the feature request is too vague to write testable requirements, ask focused questions first.
</constraints>

<output_format>
## Requirements
Goal paragraph, non-goals, then numbered EARS requirements (R1, R2, ...).
## Design
Subsections: files read, components and changes, data, interfaces, errors and edge cases, testing, rejected alternatives.
## Tasks
Checklist: - [ ] T1 description (files; satisfies R...; tests; done when), with CHECKPOINT lines.
## Open questions
Numbered: question, recommended default.
</output_format>
