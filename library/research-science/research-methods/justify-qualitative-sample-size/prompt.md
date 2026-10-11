---
schema: 1
id: justify-qualitative-sample-size
kind: prompt
title: Justify a qualitative sample size
description: Justifies the sample size for an interview or focus group study using information power, the analysis approach and practical limits, and writes text for the protocol, ethics form or methods section.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [explanation, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [qualitative-research, sample-size, information-power, data-saturation, interview-studies, focus-groups]
pairs_with:
  prompts: [design-sampling-plan, write-research-interview-protocol, write-ethics-application, plan-grounded-theory-study]
  personas: [research-methodologist]
args:
  - name: study
    description: The research question, the analysis approach (for example reflexive thematic analysis, IPA, framework analysis), the population and how specific they are, and how many interviews or groups you are thinking of.
    type: text
    required: true
  - name: where
    description: Where the justification will appear.
    type: enum
    enum: [protocol, ethics-form, methods-section, grant]
    default: protocol
output_contract:
  format: markdown
  sections: [Assessment, Recommended range, Justification text, How to report it after]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Qualitative sample sizes are often justified badly in two directions: a borrowed number ("12 interviews reach saturation") or a promise to stop "at saturation" without saying what that means for the method. Saturation is defined differently across approaches (theoretical, data, code, meaning saturation), and reflexive thematic analysis rejects it as a stopping rule altogether, since themes are constructed rather than found. Information power (Malterud and colleagues) offers a more transparent rationale: fewer participants are needed when the aim is narrow, the sample is highly specific to the aim, established theory is used, the dialogue quality is strong, and the analysis is case-oriented; more are needed for broad aims, diverse samples and cross-case analysis. Approaches also have norms: interpretative phenomenological analysis typically uses small homogeneous samples, while studies comparing subgroups need enough in each. Committees and funders need a planned range, a rationale and a stopping logic; papers need an honest account of what was done.
</context>

<task>
Justify the sample size for:
<study>
{{study}}
</study>
The text will go in: {{where}}.

1. Assess the study on the five information power dimensions (aim, sample specificity, use of theory, quality of dialogue, analysis strategy), rating each as pushing the number down or up, with a reason.
2. Note the norms and stopping logic for the stated analysis approach: whether saturation is a coherent criterion for it, and if not, what to use instead.
3. Account for subgroups or comparisons, recruitment realities, attrition and the time needed per interview for transcription and analysis.
4. Recommend a planned range with a stopping logic suited to the method, and say what would move the number to the top or bottom of the range.
5. Write ready-to-use justification text for the stated destination: future tense and an explicit range for protocols, ethics forms and grants; for a methods section, a template in past tense with placeholders for what actually happened.
6. Say what to record during the study to report the decision honestly afterwards.
</task>

<constraints>
- Do not cite a single number as universally sufficient, and do not attribute specific numbers to specific studies unless the user supplied them.
- Do not use saturation as the stopping rule for reflexive thematic analysis; explain the alternative.
- Do not invent the study's details; ask for missing essentials or state assumptions.
- If the design needs comparisons across many subgroups, say when the target is unrealistic and suggest narrowing.
</constraints>

<output_format>
## Assessment
A table: dimension | rating (fewer / more) | reason.
## Recommended range
The range, stopping logic and what moves it.
## Justification text
Ready-to-paste text in the right tense for the destination.
## How to report it after
Bullets of what to record.
</output_format>
