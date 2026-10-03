---
schema: 1
id: design-mixed-methods-study
kind: prompt
title: Design a mixed-methods study
description: Designs a mixed-methods study by choosing convergent, explanatory or exploratory sequential or a complex design, and planning sampling, integration points, joint displays and analysis.
category: research-methods
version: 1.0.1
status: incubating
stage: [plan, design]
role: [researcher, student, ux-researcher]
requires: [none]
inputs: [text]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [mixed-methods, integration, joint-display, explanatory-sequential, convergent-design, gramms]
pairs_with:
  prompts: [design-research-study, design-sampling-plan, write-research-interview-protocol, write-survey-questionnaire, run-thematic-analysis]
  personas: [research-methodologist]
args:
  - name: question
    description: The overall research question and, if you have them, the quantitative and qualitative sub-questions, plus the field and anything already decided (for example "the survey is already running").
    type: text
    required: true
  - name: resources
    description: Time, team skills (quantitative, qualitative or both), budget, access to participants or data, and any funder or degree requirements.
    type: text
output_contract:
  format: markdown
  sections: [Why mixed methods, Design choice, Procedures, Integration plan, Analysis, Quality and reporting, Risks and feasibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Mermaid node labels are quoted so the procedural diagram renders."}
  - {version: 1.0.0, note: "First version."}
---
<context>
A mixed-methods study is justified when neither quantitative nor qualitative data alone can answer the question, and its value comes from integration: deliberately connecting the strands so the combined answer says more than either part. The core designs are convergent (both strands at once, then merged), explanatory sequential (quantitative first, qualitative to explain it) and exploratory sequential (qualitative first, then building an instrument or intervention tested quantitatively), with complex designs embedding these in trials, evaluations, case studies or participatory work. Integration happens at the design level, in methods (connecting samples, building instruments, merging, embedding) and at interpretation through joint displays and meta-inferences. The usual failure is two parallel studies stapled together, with integration promised in one sentence and never planned.
</context>

<task>
Design a mixed-methods study for:
<question>
{{question}}
</question>
{{#resources}}
<resources>
{{resources}}
</resources>
{{/resources}}

1. Test whether mixed methods is warranted: state the rationale (complementarity, explanation, development, expansion, triangulation) or say plainly that one method would answer the question better.
2. Choose the design. Compare the core designs (and a complex design if the question implies a trial, evaluation or case study) for this question and these resources, recommend one, and give its notation (for example QUAN → qual) with priority and timing.
3. Write the quantitative and qualitative sub-questions and a mixed-methods question that only integration can answer.
4. Plan each strand: design, sample and sampling (including how samples relate: identical, nested, parallel or multilevel), data collection, and instruments.
5. Plan integration concretely: the point or points where strands connect, what passes between them (for example "participants with the highest and lowest scores are invited to interviews"; "themes become survey items"), the joint display to build with its rows and columns, and how divergent findings will be handled.
6. Plan the analysis for each strand and the meta-inferences.
7. Address quality: validity for each strand, legitimacy of integration, appraisal standards (for example MMAT), and reporting (GRAMMS or the field's guideline).
8. Check feasibility against the resources: time per phase, skills, dependencies in sequential designs, and risks with mitigations.
</task>

<constraints>
- Integration must be specific and placed in the timeline; "the findings will be integrated" is not a plan.
- Keep sample sizes justified separately for each strand by its own logic (power or precision; information power or saturation).
- Do not invent citations; name frameworks and authors generically and mark any reference to confirm.
- If resources clearly cannot support the design, recommend a smaller one rather than a heroic plan.
</constraints>

<output_format>
## Why mixed methods
The rationale, or the case for a single method.
## Design choice
A comparison table (design | fits because | problem for this study), the recommendation and notation, and a procedural diagram as a Mermaid flowchart in a code block, with every node label in double quotes (for example `A["QUAN survey (n = 300)"]`) so arrows, parentheses and commas in labels render.
## Procedures
Sub-questions, then each strand's design, sample, data and instruments.
## Integration plan
The integration points, what passes between strands, and a joint display template as a table.
## Analysis
Each strand and the meta-inference step.
## Quality and reporting
Validity, legitimacy, appraisal and reporting guideline.
## Risks and feasibility
A timeline by phase and a risk table (risk | effect | mitigation).
</output_format>
