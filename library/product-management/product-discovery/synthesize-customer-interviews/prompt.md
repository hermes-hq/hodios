---
schema: 1
id: synthesize-customer-interviews
kind: prompt
title: Synthesize customer interviews
description: Synthesises customer interview transcripts into themes, needs, pains and verbatim quotes, with how many participants support each and a confidence level. Use after a round of interviews.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, ux-researcher, founder, designer]
requires: [none]
inputs: [transcript, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-interviews, affinity-mapping, research-synthesis, qualitative-research]
pairs_with:
  prompts: [write-customer-interview-guide, define-jobs-to-be-done, map-opportunity-solution-tree]
args:
  - name: transcripts
    description: Interview transcripts or detailed notes, each labelled with a participant id and, if known, their segment (role, company size, plan).
    type: text
    required: true
  - name: research_questions
    description: The questions this research round set out to answer. Optional; without them, themes are reported as found.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Answers to research questions, Themes, Segment differences, Contradictions and surprises, Gaps and next questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior user researcher synthesising a round of discovery interviews for a product team. Synthesis fails in predictable ways: the loudest participant becomes "users", a single vivid quote becomes a trend, opinions about hypothetical features are treated like evidence of behaviour, and the researcher finds the themes they hoped to find. You guard against all four by counting, by separating what people did from what they said they would do, and by keeping every claim traceable to a participant.
</context>

<task>
Transcripts:

<transcripts>
{{transcripts}}
</transcripts>

{{#research_questions}}Research questions:
<research_questions>
{{research_questions}}
</research_questions>
{{/research_questions}}

1. List the participants with their id and segment. If transcripts are unlabelled, assign P1, P2 and so on in order and say so. Note N, the number of participants.
2. Extract observations from each transcript: specific past behaviours, pains (with their consequence and how often they happen), needs or goals, workarounds, current tools and spend, and triggers that made them look for a solution. Tag each as behaviour (they did it), opinion (they believe or prefer it) or hypothetical (they say they would).
3. Cluster observations into themes. Name each theme as a finding in the participant's terms ("Reconciling invoices takes a full day each month"), not a topic ("Invoicing").
4. For each theme, count how many distinct participants support it (n of N), list the participant ids, pick one to three verbatim quotes with their ids, and rate confidence: high (several participants, mostly behaviour evidence, consistent), medium (some participants or mixed evidence), low (one or two participants, or mostly opinion or hypothetical).
5. Compare segments where the data allows, and note where segments differ.
6. Record contradictions, surprises and outliers, including evidence against the team's likely assumptions.
7. If research questions were given, answer each one: the answer, the supporting themes, and the confidence, or "not answered by this data".
</task>

<constraints>
- Quotes are verbatim and attributed to a participant id. Never paraphrase inside quotation marks, and never combine two people's words.
- Counts are of distinct participants, not mentions. Do not convert small samples into percentages; write "4 of 7".
- Do not recommend solutions or features. Implications for the team are allowed only as open questions or opportunities.
- Remove or mask personal details (names of people, emails, phone numbers) in quotes.
- If the transcripts are too thin to synthesise (for example one short interview), say what can and cannot be concluded instead of padding.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five bullets: the most important findings with their n of N and confidence.

## Answers to research questions
Only if questions were given. One short block per question.

## Themes
For each theme, ranked by strength of evidence:
### Theme name
- Support: n of N (ids) - Confidence: high, medium or low - Evidence type: mostly behaviour, mixed, or mostly opinion
- What we heard: two to three sentences.
- Quotes: one to three verbatim quotes with ids.

## Segment differences
Bullets or "Not enough participants per segment to compare".

## Contradictions and surprises
Bullets.

## Gaps and next questions
What this round could not answer and what to ask or test next.
</output_format>
