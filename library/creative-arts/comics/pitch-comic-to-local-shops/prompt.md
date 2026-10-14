---
schema: 1
id: pitch-comic-to-local-shops
kind: prompt
title: Pitch a comic to local shops
description: Prepares a self-published comic creator to pitch their book to independent comic shops and bookshops for consignment or wholesale, with a one-page sell sheet, terms to offer and a follow-up plan.
category: comics
version: 1.0.0
status: incubating
stage: [ship]
role: [artist, writer]
requires: [none]
inputs: [notes, text]
output: [message, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [self-publishing, consignment, retailers, sell-sheet, small-press]
pairs_with:
  prompts: [write-comic-solicitation, plan-artist-alley-table, make-one-sheet-minicomic]
args:
  - name: book
    description: The comic, format, price, how many copies you have, your unit cost, and anything that shows readers want it (only real facts).
    type: text
    required: true
  - name: shops
    description: The kind of shops you will approach (comic shops, bookshops, zine shops), how many, and whether you can visit in person. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit and offer, Terms to offer, Sell sheet, First contact, Visit or drop-off, Tracking and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small press creators get their comics into local shops. Shop owners are busy and approached often; they say yes when the creator makes it easy: a finished, priced book with a barcode or clear price, a short pitch that says who it is for and where it shelves, a small first quantity, clear terms in writing, and reliable follow-up. Consignment (the shop pays only for copies sold, at an agreed split, settled on a schedule) is common for unknown creators; wholesale at a discount off cover price is for books with proven demand. The split, the settlement period and what happens to unsold or damaged copies vary by shop and must be agreed, not assumed. Creators who keep a simple record of copies left, sold and paid avoid awkward disputes. Calling at a quiet time, asking for the buyer by name, and bringing a copy to leave works better than a long email.

Book: {{book}}
{{#shops}}Shops: {{shops}}{{/shops}}
</context>

<task>
1. Fit and offer: which shops and sections this book suits and which it does not, and the offer to lead with (a small consignment quantity, a sample copy).
2. Terms to offer: consignment split, settlement period, how unsold copies are returned, and a wholesale option, each as values the creator chooses (blanks with a note on what to consider), checked against the unit cost so each option still covers it.
3. Sell sheet: a one-page sheet: cover image placeholder, title, creator, one-line pitch, who it is for, format and price, comparable books to verify, contact, and the terms.
4. First contact: a short email or message and a 30-second in-person pitch.
5. Visit or drop-off: what to bring, when to go, what to ask, and how to agree terms in writing (a simple consignment slip with date, copies left, split and settlement date).
6. Tracking and follow-up: a tracking table and when to check in, restock or collect copies.
</task>

<constraints>
- Do not state typical splits or discounts as fact; leave them for the creator to set and explain the trade-off.
- Use only real facts about the book; no invented sales or praise.
- Be honest if the book is not shop-ready (no price, poor print quality, no contact details) and say what to fix first.
- Keep messages short and polite; no pressure tactics.
</constraints>

<output_format>
## Fit and offer
## Terms to offer
## Sell sheet
## First contact
## Visit or drop-off
## Tracking and follow-up
A table: Shop | Date left | Copies | Terms | Sold | Paid | Next check.
</output_format>
