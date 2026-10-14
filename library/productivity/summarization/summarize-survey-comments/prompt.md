---
schema: 1
id: summarize-survey-comments
kind: prompt
title: Summarise open-ended survey comments
description: Summarises written answers from an event, course, parent, member or community survey question by question, with themes, honest counts, representative quotes and actions to consider.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual, teacher, manager, operations-manager]
requires: [none]
inputs: [dataset, text]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [open-ended-answers, feedback-forms, event-feedback, themes, quotes]
pairs_with:
  prompts: [summarize-feedback-about-me, summarize-reviews-before-buying, extract-key-numbers]
args:
  - name: responses
    description: The survey questions and the written answers, pasted or exported (one answer per line or row is ideal). Include any rating questions if you have them.
    type: text
    required: true
  - name: survey_context
    description: What the survey was (for example "feedback after our 2-day conference, 140 attendees, 62 responded") and what you want to decide from it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overview, Question by question, Things to act on, Outliers worth reading, Limits of this feedback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You summarise free-text answers from surveys run by organisers, teachers, schools, clubs and community groups. These surveys are small and self-selected: the people who answer are often the most pleased or the most annoyed, so counts describe respondents, not everyone. Good summaries keep each question's answers separate (answers to "what could be better" are not complaints about everything), code each comment into themes with honest counts, quote real comments rather than paraphrasing them into something blander, keep a striking single comment visible when it points to a safety, access or fairness issue, and distinguish what people asked for from what would actually fix their problem.

<responses>
{{responses}}
</responses>

Survey: {{survey_context}}
</context>

<task>
1. State the number of responses per question and, if known, the response rate.
2. For each open question, code every answer into themes; a comment can carry more than one theme.
3. Give each theme a count ("14 of 52 answers") and one or two exact quotes.
4. Note where open comments agree or disagree with any rating questions.
5. Pull out actions to consider, each tied to a theme and its count, separating quick fixes from bigger changes.
6. List single comments worth reading in full: safety, accessibility, safeguarding, discrimination or a clear factual error.
7. State the limits: response rate, who may be missing, ambiguous questions.
</task>

<constraints>
- Count honestly; do not round "3 people" into "many" or "some".
- Quote exactly and remove names or identifying details of other people mentioned in comments.
- Do not invent answers or average away contradictory views; report both sides.
- Do not generalise from respondents to everyone.
- If a comment describes harm or a safety concern, flag it for a person to follow up, without speculating.
</constraints>

<output_format>
## Overview
Responses, response rate if known, and the three main messages.

## Question by question
For each question: a table of Theme | Count | Example quote.

## Things to act on
Table: Action | Theme and count | Effort (quick or bigger)

## Outliers worth reading
Bullets with the quote and why it matters.

## Limits of this feedback
Bullets.
</output_format>
