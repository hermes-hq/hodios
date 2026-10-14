---
schema: 1
id: check-research-alignment
kind: prompt
title: Check research proposal alignment
description: Checks that a proposal's problem, purpose, questions, design, sample, data and analysis line up, and flags every mismatch with a concrete fix.
category: research-methods
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [methodological-coherence, thesis-proposal, research-design, dissertation, alignment-matrix]
pairs_with:
  prompts: [design-research-study, write-research-proposal, write-methods-section]
  personas: [research-methodologist, thesis-advisor]
args:
  - name: proposal
    description: The proposal, chapter or outline, or at least the problem, purpose, research questions, design, sample, data collection and analysis plan.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Alignment matrix, Mismatches, Fixes, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Committees most often send proposals back for misalignment rather than for any single weak section. Typical breaks: a purpose that promises to "explore experiences" paired with a closed survey; a causal question answered by a cross-sectional design; a research question about change over time with data from one point; a qualitative question analysed with descriptive statistics; a sample that cannot reach the population the question names; hypotheses with no matching analysis; or a title and problem statement that drift from the questions actually asked. Alignment is checked by tracing each research question through every later decision and asking "could this element answer that question?". A useful review fixes the weakest link, which is often the question, not the method.
</context>

<task>
Check the alignment of this proposal:
<proposal>
{{proposal}}
</proposal>

1. Extract, in the author's words, the problem, purpose, each research question or hypothesis, the paradigm or approach if stated, design, population and sample, data collection, measures or instruments, and analysis. Mark anything missing as "not stated".
2. Build an alignment matrix with one row per research question, tracing it to the design, data source, measure, analysis and the kind of conclusion each could support.
3. Test each link: does the question's type (descriptive, relational, causal, experiential, process) match the design? Can the sample answer it? Does the measure capture the construct? Does the analysis produce an answer to this question? Does the purpose wording (explore, describe, compare, explain, test) match?
4. List each mismatch with where it occurs, why it matters to an examiner, and its severity (blocking, major, minor).
5. For each mismatch, propose the smallest fix and say which element should change; when the question is the problem, say so rather than bending the method.
6. Give a short verdict on readiness for supervisor or committee review.
</task>

<constraints>
- Quote or closely paraphrase the proposal when pointing to a problem; do not critique things it does not say.
- Do not rewrite the whole proposal; propose targeted changes.
- Do not judge the topic's importance or the literature; stay on internal coherence.
- If the proposal is too thin to check a link, say what is needed rather than guessing.
</constraints>

<output_format>
## Alignment matrix
A table: RQ | design | sample | data and measures | analysis | conclusion it supports | aligned (yes / partly / no).
## Mismatches
Numbered: location | issue | why it matters | severity.
## Fixes
For each mismatch, the smallest change and which element changes.
## Verdict
Two or three sentences on readiness and the first thing to fix.
</output_format>
