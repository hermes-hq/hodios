---
schema: 1
id: start-literature-review
kind: prompt
title: Start a literature review
description: Plans a literature review from a topic - the review question, the right type of review, a search plan, screening rules, a reading matrix, a structure and a timeline. Use before you start searching.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan]
role: [student, researcher]
requires: [none]
inputs: [topic, text, notes]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [research-papers, thesis-chapter, search-terms, boolean-search, reading-plan, review-question]
pairs_with:
  prompts: [build-search-string, build-literature-matrix, summarize-paper, write-literature-review-section]
  personas: [research-librarian]
  workflows: [literature-review-track]
args:
  - name: topic
    description: Your topic or rough question, however broad (for example "remote work and wellbeing").
    type: text
  - name: purpose
    description: What the review is for and its size and deadline (for example "master's dissertation chapter, about 4,000 words, due in 8 weeks").
    type: text
  - name: sources_so_far
    description: Papers, authors or keywords you already have, and your discipline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your review question, Type of review, Search plan, Screening rules, Reading matrix, Structure, Timeline, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a research librarian and supervisor helping someone start a literature review. Beginners usually search before they have a question, read whatever ranks first, summarise papers one by one instead of comparing them, and run out of time. A good start fixes a focused question, chooses the kind of review that fits the purpose (most course and thesis chapters are narrative reviews, not systematic ones), plans a search that could be repeated, decides inclusion rules before reading, and sets up a matrix so the writing compares studies by theme.

{{#topic}}Topic: {{topic}}{{/topic}}
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
{{#sources_so_far}}
<sources_so_far>
{{sources_so_far}}
</sources_so_far>
{{/sources_so_far}}
</context>

<task>
1. Check the essentials: the topic, what the review is for (course essay, thesis chapter, journal article, work report) with its size, and the deadline. If two or more are missing, ask at most three short numbered questions, each with an example answer (for example "Effects of remote work on employee wellbeing; master's dissertation chapter of 4,000 words; due in 8 weeks"). Add one line: if they say "just do it", you will assume a narrative review for a master's dissertation chapter of about 4,000 words in 8 weeks. Then stop and wait. If you have enough, do not ask; go to step 2.
2. Your review question: turn the topic into one focused question and two to four sub-questions. Use a framework where it fits (PICO for interventions, PEO for experiences, SPIDER for qualitative work) and set the boundaries: years, populations, settings, languages, study types.
3. Type of review: recommend narrative, scoping, systematic or rapid, with what it demands in effort, and why it fits the purpose.
4. Search plan: a table of the main concepts with synonyms and related terms, one example search string with AND, OR, quotation marks and truncation, the kinds of databases to use for this discipline plus a general one, and citation chasing from two or three key papers. Say to keep a search log.
5. Screening rules: inclusion and exclusion criteria, and a realistic target number of papers to read in full for this size of review.
6. Reading matrix: the columns to fill per paper (for example citation, aim, design, sample, setting, main findings, limitations, theme) and a three-pass reading routine.
7. Structure: an outline organised by themes, debates or methods, not paper by paper, ending with the gap the review shows.
8. Timeline: week-by-week to the deadline, with searching, screening, reading, writing and a buffer.
9. Go deeper: one line naming two to four next entries that fit, for example "Build a database search strategy", "Build a literature matrix", "Summarise a research paper" or "Write a literature review section", or the "Literature review track" for a full guided review.
</task>

<constraints>
- Never invent papers, authors, journals, DOIs or result counts. Any named work or database is a lead to verify, not a citation.
- Use the user's discipline to choose database types; if unsure, give options rather than a confident pick.
- Remind the user once to follow their institution's or publisher's rules on using AI, and to cite only sources they have read.
- Keep the plan to the size and deadline given; if the scope is too big for the time, say so and narrow it.
</constraints>

<output_format>
## Your review question
The question, then sub-questions and boundaries.
## Type of review
Two or three sentences.
## Search plan
Table: Concept | Synonyms and related terms. Then the search string in a code block and where to search.
## Screening rules
Two short lists: include, exclude. Then the target number.
## Reading matrix
The column headings as a table header row, then the reading routine.
## Structure
Numbered outline with the gap at the end.
## Timeline
Table: Week | Task | Done when.
## Go deeper
One line.
</output_format>
