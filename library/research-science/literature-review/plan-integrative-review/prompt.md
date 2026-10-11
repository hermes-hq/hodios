---
schema: 1
id: plan-integrative-review
kind: prompt
title: Plan an integrative review
description: Plans an integrative review that combines experimental and non-experimental studies, following Whittemore and Knafl's stages from problem and search to appraisal, analysis and presentation.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [integrative-review, evidence-synthesis, mixed-evidence, nursing-research]
pairs_with:
  prompts: [build-search-string, appraise-study-quality, build-literature-matrix]
  personas: [research-methodologist]
args:
  - name: topic
    description: The topic and the problem the review addresses, for example "nurses' experiences and outcomes of early warning score use on general wards".
    type: text
    required: true
  - name: purpose
    description: What the review is for - a thesis, a journal article, a practice change project - and any rules from your programme or target journal.
    type: text
  - name: team
    description: Who is doing it and the time available, for example "one master's student and a supervisor, four months".
    type: string
output_contract:
  format: markdown
  sections: [Is an integrative review right, Problem and purpose, Literature search, Data evaluation, Data analysis, Presentation and reporting, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The integrative review, widely used in nursing and health professions research, combines experimental and non-experimental studies (and sometimes theoretical literature) to give a fuller picture of a phenomenon than one design can. The most cited method is Whittemore and Knafl's (2005) five stages: problem identification, literature search, data evaluation, data analysis, and presentation. Its strength is breadth; its weakness is rigour, because combining diverse designs invites bias. The commonest faults are a vague purpose that cannot guide selection, a search that is not reproducible, appraisal done and then ignored, and an "analysis" that is a study-by-study summary. Data analysis should follow the method's steps: data reduction (classifying and extracting into a common format), data display (matrices or charts), data comparison (finding patterns and themes), and conclusion drawing and verification (checking conclusions against the primary sources). It also needs a clear reason it is not a scoping review (which maps without appraising to answer a question) or a mixed-methods systematic review (which has its own formal methods, for example JBI's).
</context>

<task>
Plan an integrative review on:
<topic>
{{topic}}
</topic>
{{#purpose}}Purpose and rules: {{purpose}}{{/purpose}}
{{#team}}Team and time: {{team}}{{/team}}

1. Test whether an integrative review is the right choice against a systematic review, a mixed-methods systematic review and a scoping review, and say why. If another type fits better, say so and stop after a short explanation.
2. Problem identification: write the review purpose and one or two review questions, the variables or concepts of interest, and the inclusion and exclusion criteria (designs, populations, settings, dates, languages) with a reason for each.
3. Literature search: databases suited to the topic, a search structure by concept, supplementary methods (citation chasing, grey literature, hand searching), and how the search and selection will be recorded (for example a PRISMA-style flow diagram).
4. Data evaluation: how quality will be appraised across diverse designs (a design-specific tool for each design, or a tool for mixed designs such as the MMAT), who appraises, and how quality will be used in the analysis (sensitivity of conclusions to weaker studies, weighting in narrative) rather than only reported.
5. Data analysis: plan each step (data reduction into a matrix with named fields, data display, data comparison for patterns, themes and contradictions, and conclusion drawing and verification against the primary sources).
6. Presentation: how findings will be reported (a summary table of included studies, themes, a conceptual model if justified), limitations, implications, and reporting guidance to adapt, since no single reporting guideline exists for integrative reviews.
7. List open decisions and a realistic timeline for the team.
</task>

<constraints>
- Do not run searches or report results; this is a plan.
- Name appraisal tools and frameworks only as widely used options; tell the user to check their programme's or journal's expectations and the current versions.
- Every inclusion criterion and method choice gets a one-line reason.
- Flag where a second reviewer is needed for credibility (selection, appraisal, verification) and what to do if only one person is available (state it as a limitation and use checks such as supervisor sampling).
- If the topic is too broad for the time or team, propose a narrower purpose.
</constraints>

<output_format>
## Is an integrative review right
Short comparison and the decision.
## Problem and purpose
Purpose, questions, and a criteria table: criterion | include | exclude | reason.
## Literature search
Bullets and a search structure in a code block.
## Data evaluation
Bullets.
## Data analysis
Numbered steps with the extraction matrix fields.
## Presentation and reporting
Bullets.
## Open decisions
Bullets, then a timeline table.
</output_format>
