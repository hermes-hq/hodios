---
schema: 1
id: synthesize-qualitative-studies
kind: prompt
title: Synthesise qualitative studies
description: Synthesises findings from several qualitative studies by thematic synthesis, meta-ethnography or framework synthesis, keeping data orders apart and rating confidence with GRADE-CERQual.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, design]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [qualitative-evidence-synthesis, thematic-synthesis, meta-ethnography, cerqual, evidence-synthesis]
pairs_with:
  prompts: [build-literature-matrix, appraise-study-quality, run-thematic-analysis, write-literature-review-section]
  personas: [research-methodologist]
args:
  - name: question
    description: The synthesis question, for example "how do carers of people with dementia experience respite services".
    type: text
    required: true
  - name: studies
    description: The included studies' findings sections or extracted findings, each with a short citation, setting, participants and method. Include participant quotes where you have them.
    type: text
    required: true
  - name: method
    description: The synthesis approach, or "advise" to have one recommended.
    type: enum
    enum: [advise, thematic-synthesis, meta-ethnography, framework-synthesis]
    default: advise
output_contract:
  format: markdown
  sections: [Approach, Study overview, Synthesis, Confidence in findings, Gaps and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Qualitative evidence synthesis brings together findings from several qualitative studies to build an interpretation none of them could reach alone. The main approaches differ in purpose: thematic synthesis (Thomas and Harden) codes findings line by line and builds descriptive then analytical themes, suited to informing interventions; meta-ethnography (Noblit and Hare, reported with eMERGe) translates concepts across studies through reciprocal and refutational translation and a line of argument, suited to new conceptual insight; framework synthesis (including best-fit framework synthesis) codes against an a priori framework and revises it, suited to policy questions on a deadline. Common faults: summarising study by study, mixing participants' words (first-order) with authors' interpretations (second-order) and the synthesist's own (third-order) without labelling them, letting one rich study dominate, and stating synthesised findings without a confidence judgement. GRADE-CERQual rates confidence in each review finding across methodological limitations, coherence, adequacy of data and relevance.
</context>

<task>
Synthesise these studies for the question below, using "{{method}}":
<question>
{{question}}
</question>
<studies>
{{studies}}
</studies>

1. If the method is "advise", recommend one approach with a reason tied to the question's purpose and the studies' conceptual richness. State the approach used.
2. Tabulate the studies: citation, country and setting, participants and number, data collection and analysis method, and how thick the data are (thin descriptive or rich conceptual).
3. Run the synthesis in the chosen approach's steps, showing your working briefly: for thematic synthesis, codes to descriptive themes to analytical themes; for meta-ethnography, key concepts per study, how studies relate (reciprocal, refutational, line of argument) and the translation; for framework synthesis, the framework used, coded findings, and new themes the framework did not anticipate.
4. Write each review finding as a clear statement, list the contributing studies, and illustrate it with at least one first-order quote and the second-order interpretation, each labelled.
5. Note disconfirming or divergent data for each finding, and which settings or groups it does and does not cover.
6. Rate each finding with GRADE-CERQual: a judgement per component (methodological limitations, coherence, adequacy, relevance) and an overall rating of high, moderate, low or very low with an explanation.
7. Name gaps: groups, settings or questions absent from the evidence.
</task>

<constraints>
- Use only the supplied study material. Never invent quotes, themes, participants or studies; a quote must appear verbatim in the input.
- Label every piece of evidence as participant quote (first-order), author interpretation (second-order) or synthesis (third-order).
- Do not count how many studies mention a theme as a measure of its importance or truth.
- If only abstracts or very thin findings are supplied, say the synthesis will be shallow and limit CERQual adequacy ratings accordingly. If fewer than three studies are supplied, say a formal synthesis adds little and offer a structured comparison instead.
- CERQual ratings start at high confidence and move down only for stated concerns.
</constraints>

<output_format>
## Approach
The method and why, in two to four sentences.
## Study overview
The study table.
## Synthesis
Each finding as a bold statement, then contributing studies, labelled evidence, and divergent data.
## Confidence in findings
A CERQual summary table: finding | studies | limitations | coherence | adequacy | relevance | overall confidence | explanation.
## Gaps and limits
Bullets.
</output_format>
