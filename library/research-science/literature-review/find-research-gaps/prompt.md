---
schema: 1
id: find-research-gaps
kind: prompt
title: Find research gaps
description: Identifies gaps, contradictions and open questions across a set of abstracts or notes, ties each to its sources and turns it into a researchable question. Use when scoping a thesis, grant or review.
category: literature-review
version: 1.0.0
status: experimental
stage: [discover]
role: [researcher, student]
requires: [none]
inputs: [document, notes]
output: [report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [research-gaps, research-questions, papers]
pairs_with:
  prompts: [build-literature-matrix, design-research-study]
  personas: [research-methodologist]
args:
  - name: sources
    description: Abstracts, extraction notes or a literature matrix, each item with a citation or ID.
    type: text
    required: true
  - name: field
    description: The field and topic, for example "health psychology, adolescent sleep", so gaps are judged against its norms.
    type: string
output_contract:
  format: markdown
  sections: [Coverage, Gaps, Contradictions, Open questions, Before you claim a gap]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"No one has studied X" is the most common unsupported claim in theses and grant proposals. A real gap is specific (what is unknown, for whom, under which conditions), sits in a body of evidence the writer can cite, and matters for theory or practice. Gaps also come in kinds that call for different studies: an evidence gap, a contradiction between findings, a population or context nobody has sampled, a method that was never applied, a theory that was never tested, or knowledge that never reached practice.
</context>

<task>
Analyse these sources{{#field}} in {{field}}{{/field}}:
<sources>
{{sources}}
</sources>

1. Give each source a short ID (first author + year) if it has none, and map what the set covers: questions, populations, settings, designs, measures and time periods.
2. Find gaps of these kinds, and only where the sources support them: evidence gap, contradictory findings, population or context gap, methodological gap, theoretical gap, practice gap.
3. For each contradiction, propose the most likely explanations visible in the sources (different populations, measures, designs, time periods, analysis choices) before calling it unresolved.
4. Turn the strongest gaps into specific, answerable research questions, each with a design that could answer it.
5. Rate your confidence in each gap. A gap visible only because this set is small or narrow is low confidence.
</task>

<constraints>
- Every gap and contradiction cites the IDs that show it. If you cannot point to sources, it is not a gap; drop it.
- The sources are a sample, not the literature. Never write "no study has…"; write "none of these sources…", and say what search would confirm the gap.
- Do not bring in studies from memory as evidence. You may name a search term, database or kind of study to look for.
- If the sources are too few or too unrelated to compare (for example fewer than three on the same topic), say so and give what you can, marked as preliminary.
- Prefer three strong gaps to ten thin ones.
</constraints>

<output_format>
## Coverage
Four to six bullets on what the set covers and what it is mostly made of (designs, populations, years).
## Gaps
A table: # | kind | the gap in one sentence | evidence (IDs and what they show) | why it matters | confidence (high / medium / low).
## Contradictions
For each: the finding in conflict, the IDs on each side, likely explanations. "None found" if none.
## Open questions
Numbered research questions, each with a suggested design and the gap number it addresses.
## Before you claim a gap
Three to five concrete searches (terms, databases or review types) to run before writing that the gap exists.
</output_format>
