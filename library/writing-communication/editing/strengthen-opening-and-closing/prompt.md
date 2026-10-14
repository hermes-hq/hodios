---
schema: 1
id: strengthen-opening-and-closing
kind: prompt
title: Strengthen the opening and closing of a document
description: Rewrites the first and last paragraphs of an essay, article, report or post so the opening earns attention and states the point, and the ending lands it, offering two options for each.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, student, content-creator, consultant]
requires: [none]
inputs: [text, document]
output: [rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [introductions, conclusions, hooks, essay-writing, first-paragraph]
pairs_with:
  prompts: [critique-draft, fix-paragraph-flow, edit-for-structure]
  personas: [editor]
args:
  - name: draft
    description: The full draft. The opening and ending can only be judged against the body.
    type: text
    required: true
  - name: purpose_and_reader
    description: "What the piece is for and who reads it, for example \"op-ed for a local paper\" or \"quarterly report to the board\"."
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Opening options, Closing options, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers decide in the first few sentences whether to keep reading, and they remember the last few. Weak openings warm up instead of starting: dictionary definitions, "since the dawn of time", "in today's fast-paced world", a restated title, or background before the reader knows why it matters. Strong openings start with the specific: a concrete scene or case, a surprising fact the body supports, a tension or question, or (for reports and business writing) the conclusion itself. Weak endings summarise everything again, add a new idea, trail off with "only time will tell", or end on a caveat. Strong endings answer the opening, state the implication or the ask, and stop. The opening and ending must fit the body: a hook the piece never pays off is worse than no hook.
</context>

<task>
Strengthen the opening and closing of this draft.
{{#purpose_and_reader}}Purpose and reader: {{purpose_and_reader}}{{/purpose_and_reader}}

<draft>
{{draft}}
</draft>

1. If the draft is empty, ask for it and stop. If no purpose was given, infer it from the draft and state it.
2. State the draft's main point in one sentence, from the body, not from the current opening.
3. Diagnose the current opening and ending: what they do, which of the weak patterns they use, and whether they match the body.
4. Write two opening options using different approaches suited to the genre (for example a concrete case, a tension, or the bottom line first). Use only material that appears in the body or is clearly marked `[ADD: …]` for the writer to supply.
5. Write two closing options that land the main point, answer or echo the opening, and end with the implication or next step.
6. Recommend one pairing and say how to join it to the body (any sentence in the second or second-to-last paragraph that now needs adjusting).
</task>

<constraints>
- Do not invent statistics, quotes, anecdotes or events for a hook. Use what the body contains or mark what the writer must supply.
- Match the genre: no dramatic scene-setting for a board report, no bottom-line-first bluntness where the form expects a narrative opening unless you explain why.
- Keep the author's voice, person and spelling variety.
- Change only the first and last paragraphs and any joining sentence you name.
</constraints>

<output_format>
## Diagnosis
The main point in one sentence, then what is wrong with the current opening and ending.
## Opening options
Two labelled options, each with one line on the approach.
## Closing options
Two labelled options, each with one line on the approach.
## Recommendation
Which pairing to use, why, and any joining sentence to adjust.
</output_format>
