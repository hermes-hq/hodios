---
schema: 1
id: write-reading-list-post
kind: prompt
title: Write an annotated reading list post
description: Writes an annotated reading or resource list post from the writer's own picks, grouped by need or level, with why each is here, who should skip it, cost and access notes and a start-here choice.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, teacher, content-creator]
requires: [none]
inputs: [notes, text]
output: [article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-list, curation, annotated-list, book-recommendations, resource-guide]
pairs_with:
  prompts: [write-listicle, write-best-of-buying-guide]
args:
  - name: picks
    description: Your chosen books, articles, courses, podcasts or tools, each with the author or maker, why you chose it, who it suits, and anything you know about cost, length, format or availability. Rough notes are fine.
    type: text
    required: true
  - name: topic
    description: What the list helps with and for whom (for example "getting started with birdwatching in Europe", "understanding climate policy for sixth-formers").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Reading list post, Details to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A blogger, librarian, teacher or newsletter writer is publishing a curated list of books or resources. The value of a curated list is the curator's judgement: which item to start with, which to skip, and why. Lists lose that value when they read like a shop page ("a must-read!"), pad with famous titles the writer has not used, hide that an item is expensive, out of print or behind a paywall, or present ten equal options so the reader picks none. The writer's picks are the list; the job is to annotate them honestly and arrange them so the reader knows where to begin.

Topic: {{topic}}
</context>

<task>
<picks>
{{picks}}
</picks>

1. Group the picks by the reader's need or level (for example "Start here", "Going deeper", "For reference", "If you prefer listening"), not by format, unless format is what readers choose by. Two to five groups.
2. Name one "Start here" pick and say why it is the best first step for most readers.
3. For each item: title, author or maker, format, and length or time to finish if given; a two- to four-sentence annotation in the writer's voice saying what it does well and the one thing to get from it; "Best for" and "Skip if" lines; and access notes (free, paid, library, out of print, paywall, accessibility such as audiobook or captions) only from the notes, with [check] where unknown.
4. Write a short intro (under 100 words) saying who the list is for, how it was chosen (the writer's own use, as stated), and how to use it.
5. Add a short closing section: how to suggest additions, and if the writer has affiliate links, a plain disclosure line placed before the first link.
6. List every detail the writer must verify before publishing.
</task>

<constraints>
- Never add titles, authors, editions, prices, quotes or ratings the writer did not supply. If the list has an obvious gap, mention it under Details to check as a question, not as a new entry.
- Annotations must match the writer's notes; do not praise an item beyond what the writer says, and keep honest caveats.
- No "must-read", "life-changing" or "best ever" unless quoting the writer.
- If an item's author, title or link is ambiguous, mark it [check] rather than guessing.
- If the picks are missing, ask for them and stop.
</constraints>

<output_format>
## Reading list post
Title, intro, Start here, grouped items in the format above, closing section. Ready to paste.

## Details to check
Bullets: author spellings, editions, prices and availability, links, affiliate disclosure, gaps the writer may want to fill.
</output_format>
