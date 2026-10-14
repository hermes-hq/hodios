---
schema: 1
id: compare-theories
kind: prompt
title: Compare theories for your study
description: Compares two or more theories or models, such as TAM and UTAUT, on constructs, assumptions, evidence base, critiques and fit for a planned study, with sources to verify.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, design]
role: [researcher, student]
requires: [none]
inputs: [topic, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [theoretical-framework, theory-comparison, conceptual-framework, thesis]
pairs_with:
  prompts: [trace-concept-origins, outline-literature-review, refine-research-question]
  personas: [research-methodologist]
args:
  - name: theories
    description: The theories or models to compare, for example "TAM, UTAUT and diffusion of innovations", with any versions you mean (UTAUT or UTAUT2).
    type: text
    required: true
  - name: study
    description: Your planned study in two or three sentences - question, population, design - so fit can be judged.
    type: text
  - name: discipline
    description: Your field, which changes which critiques and versions are standard, for example "information systems" or "health psychology".
    type: string
output_contract:
  format: markdown
  sections: [The theories in brief, Construct map, Assumptions and scope, Evidence and critiques, Fit for your study, Sources to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Choosing a theoretical framework is one of the first things a thesis committee or reviewer probes, and students often pick the theory they met first and justify it afterwards. A sound choice compares candidates on what they explain (the outcome they predict), their constructs and how those overlap under different names, their assumptions (rational choice, social influence, stage models, context), the level they work at (individual, organisational, societal), the evidence behind them, and the standard critiques. Many families of theories have versions and extensions (UTAUT and UTAUT2; the theory of reasoned action and the theory of planned behaviour) and mixing constructs from different versions without saying so is a common error. The framework must fit the study: the outcome, the population, and whether the design tests the theory, applies it or uses it as a lens.
</context>

<task>
Compare these theories:
<theories>
{{theories}}
</theories>
{{#discipline}}Field: {{discipline}}{{/discipline}}
{{#study}}
The planned study:
{{study}}
{{/study}}

1. For each theory, give its origin (originators and approximate period, marked to verify), the outcome it explains, its core constructs and proposed relationships, and its main versions or extensions.
2. Map constructs across theories: which are the same idea under different names, which are unique to one theory, and which overlap only partly.
3. Compare assumptions and scope: the view of human action, the level of analysis, the role of context and time, and the conditions under which each was developed and tested.
4. Summarise the evidence base and critiques as commonly reported: how much empirical support, typical variance explained if that is a standard reported figure, and the main critiques. Mark anything you are unsure of.
5. Judge fit for the planned study if given: which theory matches the outcome, population and design best, what each would make you measure, and whether combining theories is justified or would muddle the framework.
6. List the original sources and key critiques to read, each marked "(verify)".
</task>

<constraints>
- Describe constructs as the theory's authors define them, and say when definitions differ between versions. Do not invent constructs or relationships.
- Every source, year or variance-explained figure you mention is a lead to verify, never a citation; when unsure, give a search phrase.
- Present critiques fairly and say which are widely accepted and which are contested.
- Do not pick a theory for the user if no study is given; compare, and state what the choice depends on.
- If a named theory is unknown to you or ambiguous, say so and ask for its source rather than guessing its content.
</constraints>

<output_format>
## The theories in brief
One short paragraph per theory.
## Construct map
Table: idea | theory A construct | theory B construct | (more columns as needed) | note.
## Assumptions and scope
Table: dimension | theory A | theory B | (more).
## Evidence and critiques
Bullets per theory.
## Fit for your study
Two to four paragraphs, or "No study given" with what the choice depends on.
## Sources to verify
Bullets: source (verify) | why read it.
</output_format>
