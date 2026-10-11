---
schema: 1
id: write-editorial-letter
kind: prompt
title: Write an editorial letter
description: Writes a developmental editor's letter to an author that names what the manuscript does well, the few big revision issues with evidence, and a prioritised revision plan.
category: editing
version: 1.0.0
status: incubating
stage: [review]
role: [editor, writer]
requires: [none]
inputs: [document, notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [editorial-letter, developmental-edit, manuscript-feedback, revision-plan]
pairs_with:
  prompts: [edit-for-structure, critique-draft, respond-to-editorial-letter]
  personas: [editor]
args:
  - name: manuscript
    description: The manuscript, or as much as you can paste, plus a chapter-by-chapter summary for anything not pasted.
    type: text
    required: true
  - name: project_brief
    description: Genre or type (novel, memoir, trade non-fiction, thesis-to-book), target readers, word count, the author's goals (query agents, self-publish, submit to a press) and the deadline.
    type: text
    required: true
  - name: editor_notes
    description: Your own margin notes or reading notes, if you are the editor and want the letter built from them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Letter, Revision plan, Notes for the editor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An editorial letter is the main deliverable of a developmental edit. Professional editors know three things novices miss. First, authors read the letter defensively, so specific praise up front is not politeness: it tells the author what to protect while revising. Second, a letter that lists twenty problems at equal weight is useless; the value is in naming the three to five issues that cause most of the other symptoms (a passive protagonist explains the saggy middle and the flat ending) and ordering them by impact. Third, the editor diagnoses and offers options, but the book belongs to the author, so each issue ends with possible approaches, not a rewrite. Line-level comments belong in the margins, not the letter.

<project_brief>
{{project_brief}}
</project_brief>

<manuscript>
{{manuscript}}
</manuscript>
{{#editor_notes}}
<editor_notes>
{{editor_notes}}
</editor_notes>
{{/editor_notes}}
</context>

<task>
1. If the manuscript and summary together do not cover the whole work, say which parts you have not seen, and limit claims about them to what the summary states.
2. Work out the book's promise: what it is about, for whom, and what the opening tells the reader to expect. State it in one or two sentences; the letter is built around whether the draft keeps that promise.
3. Identify real strengths, each tied to a specific passage, chapter or choice. Aim for three to five.
4. Identify the big issues at the level of structure, character or argument, point of view, pacing, stakes, voice consistency, and fit with the genre or readership. Group symptoms under their likely cause. Keep three to five issues; move the rest to a short "smaller points" paragraph.
5. For each issue, give the evidence (chapter, scene or quoted line), explain the effect on the reader, and offer two or three possible approaches, saying what each would cost the author in revision work.
6. If editor notes are given, build from them: keep their judgements, sharpen the wording and add evidence, and flag any note you think is wrong instead of silently dropping it.
7. Write the letter in a warm, direct, professional voice addressed to the author. Open with the promise and the strengths, then the issues in order of impact, then smaller points, then a closing that says what the revised book could be.
8. Turn the issues into a revision plan in the order the author should tackle them, biggest structural changes first.
</task>

<constraints>
- Do not rewrite the author's scenes or chapters. A sample sentence to illustrate an approach is fine; anything longer is not.
- Every criticism is tied to evidence from what was pasted or summarised. Never invent plot points, characters or chapter contents.
- No line edits, typo lists or style-guide points in the letter.
- Do not predict sales, agent interest or publication outcomes.
- Keep the letter to roughly 1,200 to 2,500 words; length should come from evidence, not padding.
</constraints>

<output_format>
## Letter
The letter to the author, with short headings for each big issue.
## Revision plan
A numbered list: the change, the chapters affected, and why it comes at this point in the order.
## Notes for the editor
Bullets: parts of the manuscript not seen, assumptions made, and any editor note you disagreed with and why. "None" if none.
</output_format>
