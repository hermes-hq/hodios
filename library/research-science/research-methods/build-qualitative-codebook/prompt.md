---
schema: 1
id: build-qualitative-codebook
kind: prompt
title: Build a qualitative codebook
description: Builds a codebook and coding procedure for qualitative data, with definitions, inclusion and exclusion rules, verbatim examples and an inter-rater check. Use before coding interviews or open text.
category: research-methods
version: 1.0.0
status: experimental
stage: [design]
role: [researcher, ux-researcher, student]
requires: [none]
inputs: [transcript, text]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [qualitative-coding, thematic-analysis, inter-rater-reliability, open-ended-responses]
pairs_with:
  prompts: [design-research-study]
  personas: [research-methodologist]
args:
  - name: data_sample
    description: A representative sample of the data (interview excerpts, open-ended answers, field notes), de-identified.
    type: text
    required: true
  - name: research_question
    description: The question the coding should help answer.
    type: text
    required: true
  - name: approach
    description: Whether codes come from the data (inductive), from a theory or framework you name (deductive), or both (hybrid).
    type: enum
    enum: [inductive, deductive, hybrid]
    default: hybrid
output_contract:
  format: markdown
  sections: [Coding frame, Codebook, Coding procedure, Inter-rater check, Limits of this draft]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A codebook makes qualitative coding consistent, teachable and auditable. Codes that are only labels drift: two coders apply "frustration" to different things, and themes built on them do not hold up. The structure used in team-based qualitative research is, for each code, a short name, a full definition, when to use it, when not to use it, and real examples, including the near-misses that belong to another code. The codebook is a living document that changes during coding, and every change is logged.
</context>

<task>
Build a draft codebook ({{approach}} approach) for this research question:
<research_question>
{{research_question}}
</research_question>

Data sample:
<data>
{{data_sample}}
</data>

1. Read the whole sample before naming any code.
2. Derive codes according to the approach: inductive codes from patterns in the data; deductive codes from the framework the user names (ask for it if "deductive" was chosen and none is named); hybrid starts from any named framework and adds data-driven codes where the framework does not fit.
3. Organise codes into a frame of 5 to 15 parent codes, with child codes only where they will be analysed separately. Keep codes at the same level of abstraction and mutually distinguishable.
4. For each code write: name, short definition, full definition, inclusion criteria, exclusion criteria (pointing to the code to use instead), a typical example, an atypical example and a "close but no" example where the sample has one.
5. Write a coding procedure: unit of coding, whether segments can carry several codes, how to handle uncodable text, and how to propose a new code.
6. Write an inter-rater check suited to the approach.
</task>

<constraints>
- Every example is a verbatim quote from the data sample, with its location (participant or line) if given. If the sample has no example for a field, write "no example in sample yet". Never invent quotes.
- Codes must answer the research question; note interesting material outside it under Limits instead of coding it.
- For the inter-rater check, recommend two coders independently double-coding about 10 to 20 percent of the data, an agreement statistic suited to the design (Cohen's kappa for two coders, Krippendorff's alpha for more coders or missing data), discussion of disagreements and a codebook revision. If the user follows reflexive thematic analysis, say that reliability statistics do not fit that approach and offer a reflexive audit trail and team discussion instead.
- If the sample is too small to support a codebook (for example one short interview), say so and label every code provisional.
- If the sample appears to contain names or other identifying details, point them out and recommend de-identifying before sharing further.
</constraints>

<output_format>
## Coding frame
The code hierarchy as a nested list.
## Codebook
For each code, a block: **Name** · Short definition · Full definition · Use when · Do not use when (use X instead) · Typical example · Atypical example · Close but no.
## Coding procedure
Numbered rules.
## Inter-rater check
Steps, the statistic, the agreement threshold to aim for, and what happens when it is not met.
## Limits of this draft
Bullets: thin codes, material outside the question, what more data would change.
</output_format>
