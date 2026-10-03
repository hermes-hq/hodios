---
schema: 1
id: write-introduction-section
kind: prompt
title: Write a paper introduction
description: Writes a manuscript introduction that moves from the field to the gap to the study's aim using the CARS model, citing only supplied sources and using placeholders instead of invented references.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes, document]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [manuscript, cars-model, research-gap, citations, imrad]
pairs_with:
  prompts: [write-methods-section, write-results-section, write-discussion-section, write-abstract]
  personas: [research-methodologist]
  rules: [academic-writing-rules, source-citation-rules]
args:
  - name: study_summary
    description: The study in a few sentences - question, design, sample, main findings, and the contribution you want to claim - plus the target journal or field if known.
    type: text
    required: true
  - name: key_literature
    description: The sources you want to cite, each with a citation key (for example "Ng2021") and a note on what it found or argues. Only these will be cited by name.
    type: text
output_contract:
  format: markdown
  sections: [Introduction, Citation map, Gap check, Questions for you]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Swales' CARS model (Create a Research Space) describes how strong introductions work across disciplines. Move 1 establishes the territory: why the topic matters and what is known. Move 2 establishes the niche: a specific gap, conflict, limitation or unanswered question in that knowledge. Move 3 occupies the niche: what this study does, its aims or hypotheses, its approach, and, in some fields, the main finding and the structure of the paper. Reviewers object to introductions that review everything instead of building toward one gap, claim a gap the cited literature does not show, overclaim novelty ("the first study ever"), or describe aims that do not match the methods. An introduction is usually 400 to 800 words in empirical papers, longer in some humanities and social-science traditions.
</context>

<task>
Write the introduction for this study.
<study>
{{study_summary}}
</study>
{{#key_literature}}
<key_literature>
{{key_literature}}
</key_literature>
{{/key_literature}}

1. Identify the gap the study fills in one sentence and the type of gap (no evidence, conflicting evidence, a population or setting not studied, a methodological limitation, a new problem). If the summary does not make a gap clear, propose the most defensible one and mark it for the author to confirm.
2. Plan the funnel: three to five paragraphs from the broad problem to the specific gap to the aim, each with its job and the claims it makes.
3. Write the introduction. Cite supplied sources by their keys in brackets, for example [Ng2021], only for claims those sources support according to the user's notes. Where a claim needs a source that was not supplied, insert [CITE: what the source must show].
4. End with the aim, research questions or hypotheses exactly matching the design described, and the approach in one or two sentences. Include the main finding only if the field's conventions do (say which you assumed).
5. Build a citation map so the author can check every claim.
</task>

<constraints>
- Never invent a reference, author, year, statistic or finding. Every factual claim either uses a supplied key or a [CITE: ...] placeholder.
- Do not claim novelty ("first", "no study has") unless the supplied literature notes support it; otherwise soften to what the author can defend ("few studies have", "to our knowledge") and flag it.
- Keep to the gap: do not review literature that does not lead to this study's aim.
- Use the present tense for established knowledge and the past tense for specific prior studies, unless the field's style differs.
- If the study summary lacks the question, design or contribution, ask for it in Questions for you and write the draft with clearly marked assumptions.
</constraints>

<output_format>
## Introduction
The draft, with bracketed citations and placeholders, and a word count.
## Citation map
A table: claim (short) | paragraph | source key or placeholder | does the source support it? (yes, per notes / needs checking / missing).
## Gap check
The gap in one sentence, its type, and whether the cited literature actually establishes it.
## Questions for you
Anything that would change the framing.
</output_format>
