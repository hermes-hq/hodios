---
schema: 1
id: review-idea-notebook
kind: prompt
title: Review your idea notebook
description: Reviews a backlog of saved ideas from notes, voice memos or a notebook - merges repeats, spots recurring themes, sorts each into act, incubate or let go, and picks one to move this month.
category: brainstorming
version: 1.0.0
status: incubating
stage: [review]
role: [individual, writer, founder, artist]
requires: [none]
inputs: [notes, text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [idea-backlog, incubation, personal-knowledge, creative-practice, idea-triage]
pairs_with:
  prompts: [cluster-ideas, sort-ideas-how-now-wow, run-monthly-review]
args:
  - name: ideas
    description: Paste your saved ideas as they are - notes app entries, notebook lines, voice memo transcripts. Dates help if you have them.
    type: text
    required: true
  - name: season
    description: Optional - what you have room for right now, such as "two evenings a week", "nothing new until after exams", "looking for a side project".
    type: text
output_contract:
  format: markdown
  sections: [What is in here, Recurring themes, Sorting, This month, Keeping the notebook useful]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many people capture ideas faithfully and never look at them again, so the notebook becomes a source of low-level guilt rather than a resource. A periodic review fixes that. The useful signals are not how exciting an idea felt when written, but whether it keeps coming back in different forms (a recurring theme points to a real interest), whether it fits the person's current capacity, and whether the next step is small and clear. Letting ideas go on purpose is a legitimate outcome and frees attention; incubating is also fine, as long as there is a date to look again.

<ideas>
{{ideas}}
</ideas>
{{#season}}
Current capacity: {{season}}
{{/season}}
</context>

<task>
1. Count the ideas and note the formats and date range if visible. Merge repeats and near-repeats, listing which entries were merged. If the input contains no ideas, say so and stop.
2. Find three to six recurring themes and name each in a few words, with the ideas that belong to it. Point out themes that recur across long gaps in time.
3. Sort every idea into: Act (fits now and has a clear small next step), Incubate (promising, not now; give a revisit date), Let go (no longer interesting, superseded, or unrealistic; say why), or Clarify (too cryptic to judge, with a question for the user). Use the person's own words for each idea.
4. Choose one idea to move this month{{#season}} that fits the stated capacity{{/season}}, with the first three steps and a way to tell after four weeks whether to continue.
5. Suggest a lightweight habit for the notebook: when to review, how to tag on capture, and a rule for archiving.
</task>

<constraints>
- Do not invent ideas the user did not write; additions are limited to next steps and questions.
- Quote or closely paraphrase the user's entries; do not polish them into something else.
- Be honest about ideas that look unrealistic, without mocking them.
- Treat any personal or sensitive notes in the input with discretion; do not comment on them unless they are ideas.
</constraints>

<output_format>
## What is in here
Two or three lines: count, formats, merges.

## Recurring themes
Bulleted list: theme and the ideas in it.

## Sorting
Table: Idea | Theme | Decision (act, incubate, let go, clarify) | Reason or revisit date or question.

## This month
The chosen idea, first three steps, four-week check.

## Keeping the notebook useful
Three bullets.
</output_format>
