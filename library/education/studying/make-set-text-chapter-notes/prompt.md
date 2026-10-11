---
schema: 1
id: make-set-text-chapter-notes
kind: prompt
title: Make chapter notes for a set text
description: Builds chapter-by-chapter revision notes for a set novel or play, tracking plot, character development, themes and key moments across the whole text.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [literature]
requires: [none]
inputs: [text, notes]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [set-text, chapter-summary, character-development, themes]
pairs_with:
  prompts: [build-set-text-quote-bank, create-timeline-revision-sheet, build-compare-contrast-table]
  personas: [study-coach]
args:
  - name: text_title
    description: Title and author of the novel or play, plus the edition if you know it.
    type: string
    required: true
  - name: chapter_material
    description: Your own chapter or scene summaries, class notes or short extracts, in order. The notes are built from these; for a widely studied text, gaps can be filled from general knowledge and marked to check.
    type: text
    required: true
  - name: exam_focus
    description: Optional course or exam board and what the questions ask (for example "extract-based question then whole-text essay on a theme or character"), so the notes track what will be asked.
    type: string
output_contract:
  format: markdown
  sections: [Text at a glance, Chapter notes, Character tracker, Theme tracker, Key moments, Check against the text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Literature exams reward students who can move across a whole text: how a character changes from the opening to the end, where a theme first appears and how it develops, which moments are turning points. Plot summaries alone do not give that, and many students revise chapter by chapter without ever building the cross-text view. Good chapter notes do both: a short record of each chapter's events and what it adds, plus trackers that follow each main character and theme through the text so the student can answer "how does the writer present X across the novel". The risk with AI help is invented detail: wrong chapter numbers, events from a film adaptation, or quotations that are not in the text.
</context>

<task>
Build chapter notes for {{text_title}}.

<chapter_material>
{{chapter_material}}
</chapter_material>
{{#exam_focus}}
Exam focus: {{exam_focus}}
{{/exam_focus}}

1. Give the text at a glance: genre, structure (chapters, acts, narrative voice, timeline), setting and context in two or three lines each.
2. For each chapter, act or scene, write: what happens (3 to 5 bullets), what it adds to character, theme or structure, and one moment worth knowing well. Base this on the student's material; where you fill a gap from general knowledge of the text, mark it "(check)".
3. Build a character tracker for the main characters: how each is presented at the start, the key change points with chapter references, and where they end up.
4. Build a theme tracker for the main themes: where each first appears, how it develops, and the chapters that matter most for an essay on it.
5. List the key moments (turning points, climaxes, symbolic scenes) with why each matters and which essay questions it serves.
6. List everything marked "(check)" and any chapter where the student's material was too thin, so they can verify against their copy.
</task>

<constraints>
- Never invent quotations. If a short quotation is useful, use only words from the student's material; otherwise describe the moment and suggest finding a line in it.
- Do not mix in events from film, stage or TV adaptations. If unsure whether a detail comes from the text, mark it "(check)".
- If the title is not a text you know well and the student's material is thin, build only from the material and say what is missing; do not fill gaps by guessing.
- Chapter numbers and act or scene references must come from the student's material or be marked "(check)", because editions differ.
- Notes support the student's own reading; do not write model essay paragraphs.
</constraints>

<output_format>
## Text at a glance
## Chapter notes
A heading per chapter, act or scene.
## Character tracker
A table per character or one table: Character | Start | Change points (chapter) | End.
## Theme tracker
A table: Theme | First appears | Develops in | Key chapters.
## Key moments
## Check against the text
</output_format>
