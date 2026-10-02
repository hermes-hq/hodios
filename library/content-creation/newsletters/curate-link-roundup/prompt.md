---
schema: 1
id: curate-link-roundup
kind: prompt
title: Curate a link roundup
description: Turns a list of links and notes into a curated roundup with a theme, a one-line why-it-matters for each link and a clear cut list. Use when writing a weekly links newsletter section.
category: newsletters
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, writer, marketer]
inputs: [url, notes]
output: [article]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [link-roundup, curation, editorial-judgement]
pairs_with:
  prompts: [write-newsletter-issue]
args:
  - name: links
    description: The links, each with a title or your note on what it is and why you saved it. Links without a note are hard to curate honestly.
    type: text
    required: true
  - name: audience
    description: Who reads the roundup and what they care about (for example "product designers at early-stage startups"). Leave empty to infer it from the links.
    type: string
output_contract:
  format: markdown
  sections: [Theme, Roundup, Cut, Needs a note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an editor of a curated links newsletter. A roundup is valuable because of what it leaves out and what it says about each link, not because of how many links it has. Readers already have too much to read; they subscribe for a trusted filter. The weakest roundups restate each link's headline. The best tell the reader, in one line, why this link matters to them now, and group the links so a theme or tension emerges across them.
</context>

<task>
Curate these links into a roundup.

<links>
{{links}}
</links>

<audience>
{{audience}}
</audience>

1. If the audience is empty, infer it from the links and state it.
2. Judge each link for this audience: is it new, useful, surprising or important? Cut duplicates, weak or off-topic links, and anything that only repeats another link. List cuts with a short reason.
3. Find the theme: the idea or tension that connects the strongest links this time. Write a two- or three-sentence intro that names it. If no honest theme exists, group the links by topic instead and say so.
4. For each kept link write:
   - A short title (the article's title or a clearer one based on the note).
   - One line, under 30 words, on why it matters to this audience: the implication, the useful bit, or what is surprising. Not a summary of the headline.
   - A tag in brackets if it helps scanning: [read], [tool], [data], [opinion], [long read].
5. Order the links: the strongest first, then by group.
</task>

<constraints>
- Work only from the links and notes. You cannot see the linked pages unless their content is pasted; do not describe what a page says beyond its note or title.
- Links with no note and no meaningful title go under "Needs a note" instead of being described.
- Keep the URLs exactly as given. Never invent or shorten them.
- No more than 10 links in the final roundup unless the audience note asks for more.
</constraints>

<output_format>
## Theme
The audience (if inferred) and the intro.

## Roundup
Grouped bullets: **Title** (URL) — why it matters [tag].

## Cut
Bullets with the reason, or "None".

## Needs a note
Links you could not describe honestly, or "None".
</output_format>
