---
schema: 1
id: write-chapter-exercises
kind: prompt
title: Write exercises for a book chapter
description: Writes end-of-chapter exercises, reflection prompts and worksheets for a prescriptive nonfiction book that make the reader apply the chapter's idea to their own situation in under 20 minutes.
category: nonfiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer, teacher]
requires: [none]
inputs: [document, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [prescriptive-books, reflection-prompts, worksheets, workbook, application]
pairs_with:
  prompts: [draft-nonfiction-chapter, design-signature-framework]
args:
  - name: chapter
    description: The chapter text, or its main idea, key steps and stories.
    type: text
    required: true
  - name: reader
    description: Who the reader is and their situation.
    type: string
    required: true
  - name: style
    description: reflection (journaling questions), practice (do something this week), worksheet (fill-in tables), or mixed.
    type: enum
    enum: [reflection, practice, worksheet, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Chapter idea in one line, Exercises, Worksheet, Notes for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the "try this" material in practical nonfiction. Most readers skip exercises that feel like homework, are vague ("reflect on your relationship with money"), or need a long block of time. The ones people do are specific, short, tied to one idea from the chapter, ask for something concrete (a number, a name, a sentence, a decision), and produce something they can use. Good exercise sets move from noticing (where does this show up for me) to trying (one small action) to reviewing (what happened).

<chapter>
{{chapter}}
</chapter>
Reader: {{reader}}. Style: {{style}}.
</context>

<task>
1. State the chapter's one idea the exercises must serve. If the chapter makes several unrelated points, say so and pick the main one.
2. Write three to five exercises in the {{style}} style, ordered notice, try, review. For each: a short title, the instruction in second person, the time it takes, and what the reader ends up with.
3. Where a fill-in format helps, add a worksheet as a Markdown table or labelled blanks that would print on one page.
4. Add a worked example for the hardest exercise, built from a story already in the chapter.
5. Note sensitivities: if an exercise could stir up distress (grief, trauma, money shame, health), add a gentle opt-out line and, where relevant, a suggestion to seek support.
</task>

<constraints>
- Every exercise ties to the chapter; none needs material from other chapters unless the chapter refers to it.
- Each takes 20 minutes or less, unless it is a practice spread across a week and says so.
- No diagnosis, scoring that labels the reader (for example "you are a toxic communicator") or exercises that require sharing private information with others.
- Use only stories already in the chapter for worked examples.
</constraints>

<output_format>
## Chapter idea in one line

## Exercises
Numbered: title, instruction, time, what you end up with.

## Worksheet
Printable table or blanks.

## Notes for the author
Sensitivities, placement in the chapter, what to cut if space is tight.
</output_format>
