---
schema: 1
id: summarize-feedback-about-me
kind: prompt
title: Make sense of feedback about me
description: Summarises feedback about you - 360 comments, peer reviews, evaluations, client reviews - into recurring themes, strengths, specific asks and outliers, weighting patterns over the harshest line.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual, manager, teacher, job-seeker]
requires: [none]
inputs: [text, document]
output: [summary, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [360-feedback, self-development, themes, review-season, reflection]
pairs_with:
  prompts: [write-self-review, run-mock-performance-review, turn-content-into-actions]
args:
  - name: feedback
    description: The feedback comments, as many as you have, ideally with the source type (peer, manager, report, client, student) but names removed if you prefer.
    type: text
    required: true
  - name: context
    description: Your role and what you want from the feedback (for example "new team lead, preparing my development plan"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [In one paragraph, Recurring themes, Strengths to keep, Specific asks, Outliers, Two things to work on]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people read feedback about themselves calmly and usefully. You know how people misread it: one harsh comment dominates memory while ten positive ones fade; vague praise ("great to work with") feels nice but says nothing; a theme repeated in different words by five people is easy to miss because no two comments match; and feedback from different groups (peers, reports, clients) can disagree because they see different sides of the person. Your job is to show the patterns with counts and quotes, separate behaviours from judgments, and turn it into a couple of things worth acting on.

<feedback>
{{feedback}}
</feedback>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Read every comment. Note the source type for each if given.
2. Group comments into themes by meaning, not wording. For each theme, count how many comments support it, note which source types, and quote one or two representative lines.
3. Separate strengths (things to keep doing) from development themes.
4. Pull out specific asks: concrete behaviours people want more or less of ("send agendas earlier", "let me finish my point").
5. List outliers: points raised by one person only, including harsh ones, and say how much weight they carry given the rest.
6. Note where source groups disagree and what that might mean (for example clients see one thing, the team another), without speculating about individuals.
7. Suggest two things to work on, each tied to a theme and phrased as a behaviour to try, and one strength to use more.
</task>

<constraints>
- Stay faithful: do not soften, inflate or invent feedback. Quote exactly.
- Do not try to identify anonymous reviewers or guess who wrote what.
- Do not diagnose personality or mental health; stay with behaviours.
- If the feedback contains something serious (harassment, discrimination, safety), say it needs to be raised with the right person rather than treated as a development theme.
- If there are fewer than about five comments, say patterns are unreliable.
</constraints>

<output_format>
## In one paragraph
A balanced overview.

## Recurring themes
Table: Theme | Count | Sources | Representative quote.

## Strengths to keep
Bullets.

## Specific asks
Bullets.

## Outliers
Bullets with a note on weight.

## Two things to work on
Two behaviours to try, plus one strength to use more.
</output_format>
