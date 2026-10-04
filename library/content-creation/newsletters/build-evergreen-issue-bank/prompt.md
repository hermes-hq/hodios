---
schema: 1
id: build-evergreen-issue-bank
kind: prompt
title: Build an evergreen issue bank
description: Builds a reserve of evergreen newsletter issues for illness, holidays or busy weeks, with archive pieces to refresh, low-effort formats, six ready outlines and a rule for when to draw on the bank.
category: newsletters
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, content-creator]
requires: [none]
inputs: [notes, text]
output: [plan, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [evergreen-content, content-reserve, publishing-cadence, archive-refresh, sustainable-writing]
pairs_with:
  prompts: [index-newsletter-archive, plan-newsletter-format, write-newsletter-issue]
args:
  - name: newsletter_summary
    description: What the newsletter covers, for whom, cadence, usual length and sections, and how many hours an issue normally takes you.
    type: text
    required: true
  - name: archive_highlights
    description: Past issues worth reusing - titles, dates, what they covered and how readers responded (replies, clicks). Optional; without it the bank uses new formats only.
    type: text
  - name: weeks_to_cover
    description: How many issues of cover you want in reserve.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Bank at a glance, Archive refreshes, Low-effort formats, Issue outlines, When to use the bank, Keeping it topped up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a solo newsletter writer build a reserve of issues they can send when life gets in the way, so the cadence survives illness, holidays and crunch weeks without filler. A good bank is not a pile of half-written drafts: it holds issues that are evergreen (still true and useful in six months), mostly finished, and honest about what they are (a refreshed favourite says so). Writers often fail by banking topical pieces that go stale, by banking issues that still need ten hours of work, or by never refilling the bank after using it. Target: {{weeks_to_cover}} issues of cover.
</context>

<task>
<newsletter_summary>
{{newsletter_summary}}
</newsletter_summary>
{{#archive_highlights}}
<archive_highlights>
{{archive_highlights}}
</archive_highlights>
{{/archive_highlights}}

1. Archive refreshes: from the highlights, pick pieces that are evergreen and well received, and for each say what needs updating (stale facts, dead links, a new example, what the writer has learned since) and a framing line ("From the archive, updated: ..."). Skip anything topical. If no archive is given, say so and lean on formats.
2. Low-effort formats that suit this newsletter and take under two hours: for example a reader Q&A from saved replies, a "tools I still use" list, an annotated favourite from someone else (credited), a behind-the-scenes note, a short guide that collects past advice on one theme, a guest piece arranged in advance. Pick three to five that fit the writer's voice and audience and say why.
3. Write {{weeks_to_cover}} issue outlines mixing refreshes and formats: working title, the reader's takeaway in one sentence, three to five section bullets, what the writer must add (a story, a number, a link) marked [X], hours to finish, and a shelf-life check date.
4. Set the rule for using the bank: for example draw on it only when the writer cannot produce a normal issue by a set day before send, never more than two banked issues in a row, and tell readers when it is a reprint or refresh.
5. Set the refill routine: after each use, add one new piece within a fixed number of weeks, and review the bank every quarter for staleness.
</task>

<constraints>
- Use only the archive and details given; do not invent past issues, reader reactions or facts. Content the writer must supply is marked [X].
- Banked issues must be honest: no presenting an old piece as new, and credit any reused or guest work.
- Keep each outline doable within the hours stated; if the writer's normal issue takes under an hour, say a bank may matter less than a lighter format.
- If the cadence or usual length is missing, ask for it in one line, then proceed with a stated assumption.
</constraints>

<output_format>
## Bank at a glance
Table: # | working title | type (refresh or format) | hours to finish | shelf life.

## Archive refreshes
Bullets per piece: what to update, framing line.

## Low-effort formats
Bullets: format, why it fits, effort.

## Issue outlines
One block per outline with the fields in step 3.

## When to use the bank
Three to five rules.

## Keeping it topped up
A short routine.
</output_format>
