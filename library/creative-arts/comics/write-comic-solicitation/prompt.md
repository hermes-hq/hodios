---
schema: 1
id: write-comic-solicitation
kind: prompt
title: Write a comic solicitation
description: Writes the solicitation text for a comic issue or collection, with a hook line, a short pitch, the spec line and a retailer note, built only from facts you give. Use before orders open.
category: comics
version: 1.0.0
status: incubating
stage: [ship]
role: [writer, artist, marketer]
requires: [none]
inputs: [text, notes]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [solicits, preorders, retailers, comic-marketing, product-copy]
pairs_with:
  prompts: [write-graphic-novel-pitch, write-comic-cover-brief, pitch-comic-to-local-shops]
args:
  - name: book
    description: "The issue or collection: title, issue number or volume, creators, the story so far and what happens in this one (without spoilers you want kept), and what makes it worth ordering."
    type: text
    required: true
  - name: specs
    description: "Format facts you know: page count, size, colour or black and white, binding, cover price, age rating, covers and variants, release or order dates."
    type: text
  - name: channel
    description: "Where the text goes, for example a distributor catalogue, a publisher's site, a retailer email or a crowdfunding page. Optional."
    type: string
    default: "Distributor catalogue and retailer email"
output_contract:
  format: markdown
  sections: [Hook, Solicitation text, Spec line, Retailer note, Missing facts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write comic solicitations: the short catalogue copy that retailers read months before release to decide how many copies to order. Retailers skim hundreds of solicits, so the first line has to say what the book is and why a reader will ask for it. Good solicits name the premise and the stakes of this issue, not the whole series history; they mention a jumping-on point (a first issue, a new arc, a collected volume) because that drives orders; they keep spoilers out unless the publisher wants a reveal sold; and they put the format facts in one consistent spec line. A retailer note (comps, an earlier sell-out, a creator's following, a display idea) is separate from the reader-facing copy. Invented facts, such as fake sell-outs, awards or sales numbers, damage trust with retailers for every later book.

Book:
{{book}}

{{#specs}}Specs: {{specs}}{{/specs}}

Channel: {{channel}}
</context>

<task>
1. Hook: write three options of one line each (under about 20 words), each saying what the book is and the one reason to want it. Mark the strongest.
2. Solicitation text: write the main copy at about 60 to 120 words for {{channel}}: premise, what is at stake in this issue or volume, the tone, and the jumping-on point if there is one. Also give a 35-word short version for tight catalogue slots.
3. Spec line: put the given format facts in one line, in a fixed order (creators; pages; format; colour; price; rating; release). Leave a visible blank for any fact not given.
4. Retailer note: two or three lines for the people ordering, using only facts provided: comparable titles to verify, who the reader is, and a shelving or display suggestion.
5. Missing facts: list what a distributor or retailer will expect that was not given.
</task>

<constraints>
- Use only facts supplied. Do not invent sales figures, awards, quotes, sell-outs, release dates or prices.
- Comparable titles are suggestions to verify, labelled as such.
- No spoilers beyond what {{book}} says may be revealed.
- Plain, specific language. Avoid stock phrases like "you won't want to miss" and "epic".
</constraints>

<output_format>
## Hook
## Solicitation text
Main version, then the short version.
## Spec line
## Retailer note
## Missing facts
A bulleted list.
</output_format>
