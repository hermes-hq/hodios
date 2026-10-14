---
schema: 1
id: review-conceptual-paper
kind: prompt
title: Review a theory or conceptual paper
description: Reviews a theory-building or conceptual paper with no new data, judging the problem, the clarity of constructs, the logic of propositions, rival explanations, testability and contribution.
category: peer-review
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, editor]
requires: [none]
inputs: [document]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [theory-building, conceptual-paper, propositions, construct-clarity, manuscript]
pairs_with:
  prompts: [write-peer-review, review-humanities-article]
  personas: [peer-reviewer]
args:
  - name: paper
    description: The conceptual paper, including any figures of the model and the reference list.
    type: text
    required: true
  - name: field_and_venue
    description: The field and journal, for example "organisation studies, a theory-focused review journal".
    type: string
output_contract:
  format: markdown
  sections: [Summary of the theory, Problem and contribution, Constructs, Logic of the argument, Rival explanations and boundary conditions, Testability, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Conceptual papers, common in management, psychology, sociology, information systems and education, cannot be judged by the methods checklist used for empirical work. Editors of theory journals look for a problem the existing theory cannot handle, constructs that are defined precisely and distinguished from near neighbours (construct proliferation, old wine in new bottles), propositions that follow from stated mechanisms rather than from assertion, boundary conditions that say when the theory does not apply, engagement with rival explanations, and implications that could in principle be tested or used. Weak conceptual papers are literature reviews with a box-and-arrow figure added, introduce a new label for an existing construct, or derive propositions that are true by definition.
</context>

<task>
Review this conceptual paper{{#field_and_venue}} for {{field_and_venue}}{{/field_and_venue}}.
<paper>
{{paper}}
</paper>

1. Summarise the theory in a few sentences: the phenomenon, the core constructs, the mechanism and the main propositions.
2. Judge the problem and contribution: what puzzle existing theory fails to explain, and whether the paper changes how the field thinks or relabels something known.
3. Judge each core construct: definition, distinctness from established constructs, and level of analysis.
4. Judge the logic: whether each proposition follows from a stated mechanism, whether any is tautological, and whether the figure matches the text.
5. Judge rival explanations and boundary conditions: alternative theories that would predict the same thing, and when the theory should not hold.
6. Judge testability and usefulness: what observations would support or contradict the propositions, and what follows for research or practice.
7. Recommend accept, minor revision, major revision, or reject, and give prioritised suggestions.
</task>

<constraints>
- Do not ask for empirical data unless the venue requires it; ask instead whether propositions are testable and how.
- Do not invent rival theories' citations; name the rival idea and ask the authors to engage with its literature.
- Every issue points to a section, proposition or figure and suggests a remedy.
- Separate disagreement with the theory from flaws in its construction.
- Remind the reviewer that the paper is confidential and to check the journal's AI-use policy.
</constraints>

<output_format>
One reminder line, then:
## Summary of the theory
## Problem and contribution
## Constructs
## Logic of the argument
## Rival explanations and boundary conditions
## Testability
## Recommendation
One line, the deciding reasons, then numbered suggestions in priority order.
</output_format>
