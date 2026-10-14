---
schema: 1
id: write-testable-hypotheses
kind: prompt
title: Write testable hypotheses
description: Turns research questions into testable hypotheses with named variables, direction, the null, the comparison and the test that will decide each one.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [hypotheses, null-hypothesis, falsifiability, quantitative-research, confirmatory-research]
pairs_with:
  prompts: [refine-research-question, operationalize-variables, write-preregistration, choose-statistical-test]
  personas: [research-methodologist]
args:
  - name: questions
    description: Your research questions, and any variables, measures, design or prior findings you already know about.
    type: text
    required: true
  - name: design
    description: The study design if decided (for example survey, experiment, cohort, secondary data).
    type: text
output_contract:
  format: markdown
  sections: [Question review, Hypotheses, How each is tested, Weak spots]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hypothesis is testable when it names measurable variables, a population, a relationship with a direction or form, and an outcome that would count against it. Novice hypotheses fail in predictable ways: they restate the question ("social media affects wellbeing"), use words that cannot be measured ("better", "impacts"), pack two predictions into one, predict a causal effect from a design that can only show association, or have no result that could contradict them. Directional hypotheses need a reason from theory or prior evidence; without one, a non-directional hypothesis is more honest. Interaction and mediation hypotheses must say exactly which effect changes and how. Exploratory and qualitative questions usually should not have hypotheses at all; they get aims.
</context>

<task>
Write testable hypotheses for:
<questions>
{{questions}}
</questions>
{{#design}}
Design: {{design}}
{{/design}}

1. Classify each question as confirmatory, exploratory or qualitative. For exploratory and qualitative ones, write an aim instead and say why a hypothesis would be inappropriate.
2. For each confirmatory question, name the independent, dependent and any moderator, mediator or control variables, and the population.
3. Write each hypothesis as one prediction: the alternative (H1) with direction or form, and the null (H0). Split compound predictions.
4. Give the rationale for any direction in one line, citing the user's stated theory or evidence, or mark it as an assumption to support from the literature.
5. Match the verb to the design: "causes" or "increases" only for randomised or strong quasi-experimental designs; "is associated with" or "predicts" otherwise.
6. For each hypothesis, state the comparison or model that tests it, the result that would support it, the result that would count against it, and whether the smallest effect worth caring about has been defined.
7. Number the hypotheses so they can be carried into a preregistration and analysis plan.
</task>

<constraints>
- Every hypothesis must name measurable variables; replace vague words with what will actually be measured, or flag that the measure is undecided.
- Do not invent prior findings or theories to justify a direction.
- Do not write hypotheses for qualitative or purely descriptive questions.
- Flag any hypothesis that would need far more data than the design suggests (for example a three-way interaction).
</constraints>

<output_format>
## Question review
A table: question | type | issue found | fix.
## Hypotheses
Numbered H1/H0 pairs with variables named, and aims for non-confirmatory questions.
## How each is tested
A table: hypothesis | comparison or model | supports if | counts against if | smallest effect of interest.
## Weak spots
Bullets on causal language, missing measures, power and multiple testing.
</output_format>
