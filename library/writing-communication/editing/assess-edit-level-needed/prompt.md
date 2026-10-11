---
schema: 1
id: assess-edit-level-needed
kind: prompt
title: Assess what level of edit a manuscript needs
description: Assesses from samples whether a manuscript or document needs a developmental edit, line edit, copyedit or only a proofread, with evidence, the right order and a rough effort estimate.
category: editing
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, editor, individual]
requires: [none]
inputs: [text, document, notes]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [edit-levels, manuscript-assessment, hiring-an-editor, developmental-edit, copyedit]
pairs_with:
  prompts: [critique-draft, write-editorial-letter, edit-for-structure, copyedit-to-style-guide]
  personas: [editor]
args:
  - name: samples
    description: Two or three samples of about 1,000 words each, ideally from the beginning, the middle and near the end, plus the table of contents or a chapter summary.
    type: text
    required: true
  - name: project
    description: What it is (novel, memoir, business book, thesis, report, website copy), total word count, readers, goal (publish, submit, self-publish, internal) and deadline.
    type: text
    required: true
  - name: history
    description: Who has already read or edited it and what they did, for example "two beta readers", "a friend proofread it". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Evidence by level, What to do first, Effort estimate, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Writers usually ask for the wrong edit. Most ask for a proofread or "a quick polish" because it is cheaper and less frightening, when the manuscript's real problems are structural; paying for a copyedit first means paying again after the structure changes. Editing works from big to small: a developmental (structural) edit addresses purpose, structure, argument or plot, character and pacing; a line edit addresses voice, clarity, rhythm and word choice sentence by sentence; a copyedit addresses grammar, consistency, style-guide conformity and factual slips; a proofread catches remaining typos and layout errors in the final version. Openings are usually the most polished part of a draft, so samples from the middle and end tell the truth. Effort depends on the level and on how clean the text is: editors' typical paces run from a few pages an hour for heavy developmental or line work to many pages an hour for a light proofread, which is why a sample is the honest basis for an estimate.

<project>
{{project}}
</project>
{{#history}}
<history>
{{history}}
</history>
{{/history}}
<samples>
{{samples}}
</samples>
</context>

<task>
1. If there are no samples, or only the opening, ask for samples from the middle and end and stop, unless the user says that is all they have; then proceed and say the assessment is limited.
2. For each level, look for the signs that it is needed, quoting short evidence:
   - Developmental: unclear purpose or premise, structure that does not build, missing or misordered sections or plot points, an argument that does not hold, pacing or point-of-view problems, a mismatch with the target readers or genre, length far off the norm for the type.
   - Line: flat or inconsistent voice, long tangled sentences, repetition, vague wording, clichés, weak openings to paragraphs or scenes.
   - Copy: frequent grammar and punctuation errors, inconsistent spelling, names, numbers or formatting, unchecked facts.
   - Proofread: only scattered typos in otherwise clean text.
3. Recommend the highest level that is needed now, and say which later levels will still be needed and when. If the text is clean at higher levels, say so plainly and recommend less.
4. Say what the writer can do themselves before paying for an edit, if anything would cut the cost (for example a self-edit pass on repetition, a beta read for structure).
5. Estimate effort in editor hours as a range for the recommended level, showing the word count and the pace assumption, and state that it is a rough planning figure. Do not quote prices; rates vary by country, genre and editor.
6. List what a writer should ask an editor before hiring: a sample edit, what the deliverable is (letter, tracked changes, both), and how many passes are included.
</task>

<constraints>
- Base every judgement on the samples and project details; never assess chapters you have not seen.
- Do not recommend a heavier edit than the evidence supports, and do not soften a structural problem into a "polish".
- No prices, no guarantees about publication or acceptance.
</constraints>

<output_format>
## Recommendation
Two or three sentences: the level needed now, and the later levels.
## Evidence by level
Table: Level | Needed now? (yes, later, no) | Evidence from the samples.
## What to do first
Numbered steps, including any self-editing that would reduce the cost.
## Effort estimate
Word count, pace assumption and hour range for the recommended level.
## Questions
Questions to ask an editor before hiring, plus anything you need from the writer.
</output_format>
