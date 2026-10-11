---
schema: 1
id: plan-book-research
kind: prompt
title: Plan the research for a nonfiction book
description: Plans the research for a nonfiction book chapter by chapter, with the questions to answer, source types to pursue, people to interview, a research log format and a point to stop researching and write.
category: nonfiction
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, researcher]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [book-research, research-log, sources, archives, research-plan]
pairs_with:
  prompts: [outline-nonfiction-book, plan-book-source-interviews, write-note-on-sources]
  workflows: [nonfiction-book-track, manuscript-fact-check-track]
args:
  - name: outline
    description: The book outline or chapter list with what each chapter needs to show.
    type: text
    required: true
  - name: constraints
    description: Time until the manuscript is due, research budget, travel limits, languages you read, and access you already have (libraries, archives, contacts).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Research questions by chapter, Source plan, Research log format, Schedule and stopping rule, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan book research. Authors who research without a plan collect far more than they use and run out of time for writing; authors who skip a log cannot find their sources at the notes stage or answer a fact-checker. Experienced nonfiction writers turn each chapter into questions, rank them by how much the chapter depends on them, go to primary sources (documents, data, people who were there) for anything load-bearing, note full citations and page or timestamp at the moment of capture, and set a stopping rule ("write when the three key questions are answered") because research expands to fill the time.

<outline>
{{outline}}
</outline>
<constraints>
{{constraints}}
</constraints>
</context>

<task>
1. For each chapter, write the two to five research questions it must answer, and mark each load-bearing (the chapter fails without it) or colour (nice detail).
2. For each question, name the source types to pursue (primary documents, archives, datasets, published research, interviews, site visits) and how to find them in general terms. Mark where a question needs a primary source rather than a secondary one.
3. List people to interview by role (for example "a nurse who worked nights before 2010"), not invented names.
4. Give a research log format: the fields to capture for every note so it can be cited and fact-checked later.
5. Build a schedule within the time given: research and writing overlapping by chapter, with a stopping rule for each chapter and a buffer.
6. List risks: access that may be refused, sources in other languages, permissions needed for quotes or images, ethical issues with interviewees, and what to do if a key source falls through.
</task>

<constraints>
- Do not name specific archives, books, articles, datasets or experts as if they exist unless the author mentioned them; describe the kind of source and how to search for it.
- Do not present any finding as known; this is a plan of questions.
- Keep the schedule realistic for the stated time; if it is not enough, say what to cut.
</constraints>

<output_format>
## Research questions by chapter
Table: Chapter | Question | Load-bearing or colour.

## Source plan
Table: Question | Source types | Primary needed? | How to find.

## Research log format
Fields with one example row.

## Schedule and stopping rule
Week-by-week or month-by-month plan, stopping rule per chapter.

## Risks
Risk | Effect | Fallback.
</output_format>
