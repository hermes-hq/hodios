---
schema: 1
id: write-a3-report
kind: prompt
title: Write an A3 problem-solving report
description: Writes a lean A3 problem-solving report on one page, with background, current state, goal, root cause analysis, countermeasures, an implementation plan and follow-up checks.
category: business-writing
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [operations-manager, manager, project-manager, consultant]
requires: [none]
inputs: [notes, dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [a3-report, lean, problem-solving, root-cause, continuous-improvement]
pairs_with:
  prompts: [run-five-whys, write-8d-report, write-sop]
args:
  - name: problem_material
    description: The problem and what you know, such as data showing the gap, where and when it happens, observations from the work area (gemba), causes suspected, and anything already tried.
    type: text
    required: true
  - name: owner_and_scope
    description: Who owns the A3, the process or area, and any constraints such as budget or deadline. Optional.
    type: string
output_contract:
  format: markdown
  sections: [A3, Coaching questions, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The A3 comes from lean practice: one sheet of A3 paper that tells the story of a problem from left to right (background, current state, goal, analysis) and then the response (countermeasures, plan, follow-up). Its value is the thinking it forces, which lean coaches check by asking whether each box follows from the one before. Common failures: the problem statement already contains a solution ("we need a new machine"), the current state has no data or was never observed at the place of work, the goal is a vague direction rather than a measurable target with a date, the root cause is a guess or a person ("operator error"), and countermeasures do not address the cause found. A good A3 quantifies the gap, shows the root cause chain with evidence, links each countermeasure to a cause, and says how and when effect will be checked.
</context>

<task>
Write an A3 report{{#owner_and_scope}} ({{owner_and_scope}}){{/owner_and_scope}}.

<problem_material>
{{problem_material}}
</problem_material>

1. If there is no description of the problem or no indication of its size, ask up to two short questions and stop.
2. Title: a short problem theme, not a solution.
3. Background: why this matters to the business or customer, in two or three sentences.
4. Current state: what is happening, quantified from the material (how often, how much, where, when), with a simple description of the process step where it occurs. Mark missing data `[NEEDED: …]` and say whether the current state was observed or reported.
5. Goal: a measurable target and date. If none given, propose one labelled "proposed".
6. Root cause analysis: a why-chain or cause grouping (people, method, machine, material, measurement, environment) from the material, distinguishing causes supported by evidence from hypotheses, and naming how each hypothesis would be tested. Do not stop at "human error"; ask what about the system allowed it.
7. Countermeasures: each linked to a specific root cause, with the expected effect.
8. Implementation plan: action, owner, date.
9. Follow-up: how and when results will be measured against the goal, and what will be standardised if it works.
10. Add coaching questions a lean mentor would ask about the weakest boxes.
</task>

<constraints>
- Use only the material. Never invent data, causes found or test results; hypotheses must be labelled as such.
- Fit the content of a single A3: short phrases and small tables, about 500 to 700 words in total.
- Countermeasures must address causes, not symptoms; flag any countermeasure that does not trace to a cause.
- No blame of individuals.
</constraints>

<output_format>
## A3
Left side: Title; Background; Current state; Goal; Root cause analysis. Right side: Countermeasures (table: Root cause · Countermeasure · Expected effect); Implementation plan (table: Action · Owner · Date); Follow-up.
## Coaching questions
Three to five questions on the weakest parts.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
