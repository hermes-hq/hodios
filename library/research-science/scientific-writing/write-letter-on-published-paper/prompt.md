---
schema: 1
id: write-letter-on-published-paper
kind: prompt
title: Write a letter commenting on a published paper
description: Writes a short, evidence-based letter or commentary to a journal about a published paper's methods or conclusions, within the journal's limits, focused on substance and courteous in tone.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [review, ship]
role: [researcher]
requires: [none]
inputs: [document, notes]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [letter-to-editor, post-publication-review, scholarly-correspondence, research-critique, journal-correspondence]
pairs_with:
  prompts: [summarize-paper, appraise-study-quality, write-correction-notice]
  personas: [academic-writing-coach, peer-reviewer]
args:
  - name: paper
    description: The published paper's citation and the relevant passages, tables or results you want to comment on.
    type: text
    required: true
  - name: concerns
    description: Your points, with the evidence or reasoning for each (your own calculations, other sources with citations).
    type: text
    required: true
  - name: limits
    description: Optional. The journal's limits for correspondence (words, references, deadline after publication).
    type: string
    default: "400 words, 5 references"
output_contract:
  format: markdown
  sections: [Point selection, Letter, Check before submitting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Letters to the editor (correspondence, comments, matters arising) are the formal route for post-publication critique. Editors publish those that raise a substantive point readers need: a methodological problem that could change the interpretation, an analysis that does not support the conclusion, missing context or conflicting evidence. They reject letters that list many minor points, speculate about motives, restate the letter-writer's own work, or exceed tight limits (often 300 to 500 words, five references, submitted within weeks of publication). Effective letters choose one to three points, state each as a specific, checkable claim with page or table references, show the consequence for the conclusion, and ask a question the authors can answer, usually with a right of reply. Tone matters: criticise the work, not the people.
</context>

<task>
Write a letter about:
<paper>
{{paper}}
</paper>
<concerns>
{{concerns}}
</concerns>
Limits: {{limits}}

1. Rank the concerns by how much each could change the paper's interpretation, and select one to three that are substantive and supportable. Say which to drop and why.
2. Write the letter within the limits: an opening sentence naming the paper and its main claim fairly, each point with its evidence and the specific consequence, and a close asking the authors for a specific clarification, analysis or data.
3. Include in-text references only from those supplied, formatted simply.
4. Give a pre-submission check: facts against the paper, word and reference counts, competing interests declaration, journal deadline.
</task>

<constraints>
- Represent the paper accurately; quote or paraphrase its claims fairly and do not attack positions it does not take.
- Use only the user's evidence and references; do not add studies or numbers.
- No speculation about motives, misconduct or competence. If the user suspects misconduct, advise raising it confidentially with the editor or through the publisher's integrity process instead.
- Keep within the stated limits and report the approximate word count.
</constraints>

<output_format>
## Point selection
A table: concern | impact on conclusion | keep or drop | reason.
## Letter
Title line, the letter, and references.
## Check before submitting
A checklist and the approximate word count.
</output_format>
