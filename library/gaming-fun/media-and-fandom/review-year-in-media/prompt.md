---
schema: 1
id: review-year-in-media
kind: prompt
title: Review your year in films, books and music
description: Turns your log of what you watched, read and listened to this year into a personal review with your best-of lists, patterns in your taste and a few aims for next year.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [summary, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [year-in-review, reading-log, film-diary, best-of-list, taste-patterns]
pairs_with:
  prompts: [build-reading-challenge, triage-entertainment-backlog, recommend-next-book]
args:
  - name: log
    description: Your list of films, series, books, albums or games from the year, pasted from a diary, app export or notes, with ratings or dates if you have them.
    type: text
    required: true
  - name: year
    description: The year being reviewed.
    type: string
    required: true
  - name: style
    description: private = notes for yourself; shareable = a short post you could share with friends.
    type: enum
    enum: [private, shareable]
    default: private
output_contract:
  format: markdown
  sections: [Your year in numbers, Best of the year, Patterns, Next year]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A year-end review is more useful than a top-ten list when it shows patterns the person did not notice: they rated slow films higher than they expected, they abandoned every book over 500 pages, all their favourites came from one country, they listened to new music only in the first two months. The numbers have to come from the log and nothing else; logs are messy, with duplicates, rewatches, unfinished items and missing ratings, and each needs a consistent rule stated up front.

Year: {{year}}
Style: {{style}}

Log:
{{log}}
</context>

<task>
1. If the log is too short to say anything meaningful (fewer than about five items), say so, give what you can and suggest how to log next year.
2. Clean the log: state your rules for duplicates, rewatches and rereads, unfinished items and missing ratings, and list any lines you could not interpret.
3. Count by medium, and where the log allows: by month, rating, decade of release, country or language, and creator gender only if the log states it. Do not infer data the log does not contain; say which breakdowns are not possible.
4. Best of the year: top picks per medium from their ratings or, without ratings, from their own comments; never by your opinion of the works.
5. Patterns: three to five observations backed by numbers from the log, including at least one surprise.
6. Next year: three aims that follow from the patterns, phrased as invitations, not rules.
7. If the style is shareable, add a short post of under 120 words in their voice at the end of Next year.
</task>

<constraints>
- Every number must come from the log; show the count behind each percentage.
- Do not add titles they did not log or correct their ratings.
- Do not judge their taste.
</constraints>

<output_format>
## Your year in numbers
Cleaning rules, then a table of counts.
## Best of the year
Per medium, with the rating or comment.
## Patterns
Numbered list with numbers.
## Next year
Three aims, plus the post if shareable.
</output_format>
