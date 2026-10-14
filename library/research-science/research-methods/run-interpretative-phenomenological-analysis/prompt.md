---
schema: 1
id: run-interpretative-phenomenological-analysis
kind: prompt
title: Run interpretative phenomenological analysis
description: Runs IPA on interview transcripts case by case, from exploratory notes to experiential statements, personal experiential themes and group themes, keeping the idiographic focus.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [transcript]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
subject: [psychology]
tags: [ipa, phenomenology, qualitative-analysis, lived-experience, idiographic, interview-data]
pairs_with:
  prompts: [choose-qualitative-methodology, prepare-interview-transcripts, plan-qualitative-rigour, justify-qualitative-sample-size]
  personas: [research-methodologist]
args:
  - name: transcript
    description: For a single case, one participant's transcript with numbered lines or turns and a participant code. For the cross-case step, the personal experiential themes, with key quotes, from each case already analysed.
    type: text
    required: true
  - name: research_question
    description: The experiential research question.
    type: text
    required: true
  - name: stage
    description: Whether this is a single case analysis or the cross-case step using personal experiential themes you have already developed.
    type: enum
    enum: [single-case, cross-case]
    default: single-case
output_contract:
  format: markdown
  sections: [Exploratory notes, Experiential statements, Personal experiential themes, Cross-case notes, Analyst reflections]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Interpretative phenomenological analysis (Smith, Flowers and Larkin) explores how particular people make sense of a significant experience. It is idiographic: each case is analysed in depth on its own before any cross-case work, and the final account keeps individual voices rather than averaging them. It is double hermeneutic: the researcher makes sense of the participant making sense of their experience. The current terminology runs from exploratory notes (descriptive, linguistic and conceptual comments), to experiential statements, to clustering into personal experiential themes for each case, and then to group experiential themes that show convergence and divergence across cases. Typical mistakes: coding the dataset as a whole like thematic analysis, staying descriptive with no interpretation, interpreting without grounding in the participant's words, and reporting group themes without showing how each participant contributes and differs.
</context>

<task>
Run the {{stage}} stage of IPA for the question: {{research_question}}
<transcript>
{{transcript}}
</transcript>

For a single case:
1. Write exploratory notes on meaningful passages, labelled descriptive, linguistic (metaphor, repetition, pronouns, hesitations) or conceptual (interpretive questions), each with the line or turn reference.
2. Turn the notes into experiential statements: concise phrases that capture the participant's experience and the analyst's interpretation, each tied to lines.
3. Cluster statements into personal experiential themes and subthemes for this case, with a short narrative for each and key quotes with references.
4. Record what was set aside or does not fit, and reflections on the analyst's own reactions.

For cross-case work (when personal experiential themes from several cases are supplied):
5. Compare cases to build group experiential themes, showing for each theme which participants contribute and how they differ, and keep distinctive individual experiences visible.

Always:
6. Keep interpretation grounded: each interpretive claim must point to the participant's words.
</task>

<constraints>
- Analyse one case at a time; do not jump to group themes from a single transcript.
- If the material is not rich first-person accounts of a significant experience (for example short open-text survey answers or summaries), or the question is not experiential, say IPA does not fit and suggest a better approach such as reflexive thematic analysis or content analysis.
- Every quote must be verbatim from the transcript with a reference; never invent or tidy quotes.
- Mark interpretations as interpretations, distinct from what the participant said.
- The analysis is a draft for the researcher's own interpretative work; remind them that IPA requires their own engagement and reflexivity.
</constraints>

<output_format>
## Exploratory notes
A table: line | text excerpt | descriptive | linguistic | conceptual.
## Experiential statements
A list with line references.
## Personal experiential themes
Themes and subthemes with a narrative and quotes (single case), or "not applicable at this stage".
## Cross-case notes
Group experiential themes with participant contributions and divergence, or what to look for when more cases are done.
## Analyst reflections
Bullets on assumptions, reactions and set-aside material.
</output_format>
