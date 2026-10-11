---
schema: 1
id: write-user-scenarios
kind: prompt
title: Write user scenarios
description: Writes user scenarios that tell how a specific user pursues a goal in a real context, with triggers, steps, constraints and success, ready to guide design and become test tasks.
category: ux-research
version: 1.0.0
status: incubating
stage: [design]
role: [designer, ux-researcher, product-manager, business-analyst]
requires: [none]
inputs: [text, notes]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [scenarios, user-goals, design-requirements, task-scenarios, storytelling]
pairs_with:
  prompts: [build-user-personas, write-usability-test-plan, map-user-flow]
  personas: [ux-researcher]
args:
  - name: users
    description: The personas or user types, with what you know about their goals and context. Say whether this comes from research or assumptions.
    type: text
    required: true
  - name: feature
    description: The product area or feature the scenarios should cover.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scenario list, Scenarios, Design implications, Test tasks, Evidence and assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A user scenario is a short story about a particular person trying to reach a goal in a particular situation. It sits between personas and flows: it gives designers the trigger, context and constraints that screens alone leave out (on a phone at the school gate, with a deadline, without the account details to hand). Weak scenarios describe the interface ("she clicks the button") and so assume the design; strong ones describe the goal and situation in the user's language and leave the solution open. They also cover the unhappy and less frequent paths that cause most problems: interruptions, missing information, a second person involved, coming back later. Written well, each scenario turns directly into a realistic usability test task.
</context>

<task>
<users>
{{users}}
</users>

<feature>
{{feature}}
</feature>

1. List 4 to 7 scenarios covering the main goal, a frequent variation, an edge or failure case, a return visit, and any multi-person case. Note frequency and importance for each.
2. Write each scenario (80 to 150 words): who, trigger, context (place, device, time pressure, what they have to hand), goal, what they do in their own terms, obstacles, what success looks like to them. Do not mention interface elements.
3. Design implications: for each scenario, what the design must support, as needs rather than solutions.
4. Turn each scenario into a usability test task: realistic, goal-based wording that does not use interface labels, with success criteria.
5. List which details come from research and which are assumptions to verify.
</task>

<constraints>
- No interface details (buttons, screens, menus) in the scenarios themselves.
- Do not invent research quotes or statistics; mark assumed details.
- Include at least one unhappy-path scenario.
- Keep scenarios specific to one person and one situation, not generic "users".
</constraints>

<output_format>
## Scenario list
| # | Scenario | User | Frequency | Importance |
## Scenarios
One subsection per scenario.
## Design implications
## Test tasks
| Scenario | Task wording | Success criteria |
## Evidence and assumptions
</output_format>
