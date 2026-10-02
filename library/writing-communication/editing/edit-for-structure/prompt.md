---
schema: 1
id: edit-for-structure
kind: prompt
title: Edit a draft for structure
description: Edits a non-fiction draft at the structural level, covering argument, order, misplaced and missing sections, with a reverse outline and a prioritised revision plan instead of line edits.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [writer, editor, researcher, consultant]
requires: [none]
inputs: [document, text]
output: [report, outline, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [developmental-editing, reverse-outline, structural-edit, argument]
pairs_with:
  prompts: [tighten-prose, proofread-text, build-style-sheet, write-executive-summary]
  personas: [editor]
args:
  - name: draft
    description: The full draft (report, article, essay, chapter or book section). Structure can only be judged on the whole piece, not an excerpt.
    type: text
    required: true
  - name: purpose
    description: "What the piece must do and for whom, for example \"persuade a funding panel that our pilot should scale\" or \"explain the history of the dispute to general readers\"."
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Reverse outline, Structural problems, Proposed structure, Revision plan, What to leave alone]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A structural (developmental) edit asks whether the piece is built right before anyone polishes sentences. Typical structural faults in non-fiction: the real thesis appears on page six; sections are ordered by how the author researched rather than how the reader needs to understand; two sections make the same point; a key step in the argument is missing or asserted without support; background swamps the argument; the ending summarises instead of concluding. The standard diagnostic is the reverse outline: write what each paragraph or section actually says and does, then compare it with what the piece needs to do. Line editing at this stage is wasted effort, because the sentences may be cut or moved.
</context>

<task>
Give a structural edit of this draft.
{{#purpose}}Purpose and reader: {{purpose}}{{/purpose}}

<draft>
{{draft}}
</draft>

1. If the draft is clearly an excerpt of a longer piece (it starts or ends mid-argument, refers to sections that are not there, or is a single chapter of a book), say that a structural edit needs the whole piece, give at most three observations about the excerpt's internal order, and ask for the complete draft and its purpose; do not produce the full report. A short piece that is complete in itself (a one-page memo, a brief guide) gets the full edit, with the reverse outline done sentence group by sentence group.
2. State the thesis or central claim as the draft currently makes it, quoting where it first appears. If no purpose was given, infer the purpose and reader and say so; if it is impossible to infer, ask and stop.
3. Write a reverse outline: for each section (or each paragraph, for pieces under about 2,000 words), one line on what it says and one on what it does for the reader (sets up the problem, gives evidence, answers an objection, digresses).
4. Diagnose structural problems against the purpose: buried or shifting thesis, order that does not follow the reader's questions, repetition, missing steps or evidence, misplaced material, sections out of proportion to their importance, a weak opening or ending, and missing signposting between parts. For each, point to the exact sections.
5. Propose a revised structure as an outline: section headings that state the point, what each contains, and where existing material moves (by reverse-outline number). Mark new material needed as `[NEW: …]` and material to cut.
6. Turn it into a revision plan ordered by impact: the change that fixes the most first.
</task>

<constraints>
- Stay at the structural level. Do not rewrite sentences or correct grammar, except a suggested one-sentence thesis or a heading.
- Respect the author's argument and voice. Your job is to make their piece work, not to change what it argues; if you think the argument itself is weak, say so once, with the reason, as a separate point.
- Ground every criticism in specific sections or quotes. No generic advice ("add more detail").
- Do not invent facts or evidence to fill gaps; describe what kind of evidence is missing.
- Be direct and kind: name what works structurally so it is kept.
</constraints>

<output_format>
## Diagnosis
Three to five sentences: the thesis as it stands, the biggest structural problem and the main fix.
## Reverse outline
Numbered list: Says | Does.
## Structural problems
Numbered, most serious first: problem, where (section numbers or quotes), why it hurts this reader, fix.
## Proposed structure
An outline with point-stating headings, the source of each part's material, `[NEW: …]` and `[CUT]` marks.
## Revision plan
Numbered steps in order of impact, each a concrete task.
## What to leave alone
Strengths to keep through the revision.
</output_format>
