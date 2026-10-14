---
schema: 1
id: compare-design-alternatives-with-users
kind: prompt
title: Compare design alternatives with users
description: Plans a comparative usability study of two or three design alternatives with shared tasks, counterbalanced order, matched fidelity and metrics agreed in advance to choose between them.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, image]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [comparative-testing, counterbalancing, within-subjects, design-decision, prototype-testing]
pairs_with:
  prompts: [write-usability-test-plan, size-ux-research-sample, plan-preference-test]
  personas: [ux-researcher]
args:
  - name: alternatives
    description: The two or three designs and how they differ, for example "tabbed settings versus a single long page".
    type: text
    required: true
  - name: decision
    description: What the team must decide and by when, plus the tasks that matter most.
    type: text
    required: true
  - name: setup
    description: Moderated or unmoderated, available participants, and prototype fidelity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Study design, Making the comparison fair, Tasks, Metrics and decision rules, Participants, Session outline, Analysis and reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comparing alternatives with users is one of the most common requests in design, and one of the easiest to bias. In a within-subjects design (each person tries every version) the second version benefits from what people learned on the first, so order must be counterbalanced, and tasks must use different but equivalent data so people are not repeating answers. Between-subjects designs avoid learning effects but need far more participants to detect differences. Unequal fidelity or content (one version polished, one rough) decides the result before the study starts. With the usual 5 to 10 moderated participants, the study reveals why each version works or fails, not a statistically reliable winner; the strongest outcome is often a hybrid. Agreeing the metrics and what would count as a win before testing prevents reading the results to fit the favourite.
</context>

<task>
<alternatives>
{{alternatives}}
</alternatives>

<decision>
{{decision}}
</decision>
{{#setup}}

<setup>
{{setup}}
</setup>
{{/setup}}

1. Study design: within- or between-subjects, with the reason; if within, a counterbalancing scheme (for example AB/BA, or a Latin square for three) assigned to participant numbers.
2. Making the comparison fair: matched fidelity, identical content and data except the variable, neutral naming of versions ("Version 1", not "new"), and moderator neutrality about which is preferred.
3. Tasks: 3 to 5 shared tasks that exercise the differences, with equivalent variants for the second version to limit learning effects.
4. Metrics and decision rules: task success, errors, time (only if unmoderated or large enough), a per-task ease rating, and a final comparison question asked after both; state in advance what would make one version win or suggest a hybrid.
5. Participants: number and segments, with what that sample can and cannot show.
6. Session outline with timings.
7. Analysis and reporting: per-version issue lists with severity, results by order group to spot order effects, and a recommendation that may combine strengths.
</task>

<constraints>
- Do not claim a statistically significant winner from a small qualitative sample.
- Do not let the team's favourite be presented first by default or labelled as new.
- Do not invent results; this is a plan.
</constraints>

<output_format>
## Study design
| Participant | Order |
## Making the comparison fair
## Tasks
## Metrics and decision rules
## Participants
## Session outline
## Analysis and reporting
</output_format>
