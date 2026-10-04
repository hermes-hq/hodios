---
schema: 1
id: write-behind-the-scenes-post
kind: prompt
title: Write a behind-the-scenes post
description: Writes a behind-the-scenes post following one real process at a business, farm or charity from start to finish, with consented people, a lesson learned and specific detail, not advertising.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [founder, writer, marketer]
requires: [none]
inputs: [notes, transcript, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [behind-the-scenes, brand-storytelling, process-story, maker-story, trust-building]
pairs_with:
  prompts: [write-feature-article, write-profile-piece]
args:
  - name: process_notes
    description: The process from start to finish in your own words - steps, timings, quantities, tools, who does what (and whether they agreed to be named or pictured), what went wrong once and what you changed.
    type: text
    required: true
  - name: business
    description: The business or organisation and its readers, for example "small-batch coffee roaster, customers and wholesale cafés".
    type: string
    required: true
  - name: word_count
    description: Target length in words.
    type: number
    default: 900
output_contract:
  format: markdown
  sections: [Post, Consent and detail check, Photo list]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write behind-the-scenes posts that make readers trust a business because they can see how it really works. They succeed through specifics: one process followed from start to finish, real numbers (temperatures, hours, batch sizes), the people who do the work, and one honest mistake and what it taught. They fail when they cover everything at once, slide into advert language ("passion", "quality you can taste"), name or picture staff without asking, or reveal what should stay private (security routines, supplier prices, customer details, trade secrets).

Business: {{business}}. Length: about {{word_count}} words.
</context>

<task>
<process_notes>
{{process_notes}}
</process_notes>

1. Pick one process with a clear start and end (an order from arrival to dispatch, a batch from raw material to shelf, a day of lambing, an event from booking to clear-up). If the notes cover several, choose the one with the best detail and say why.
2. Structure:
   - Opening scene: a specific moment (a time, a sound, a task in progress), not a mission statement.
   - The process step by step, with the numbers and tools from the notes and why each step is done that way.
   - The people: what each person does, in their own words if quotes are given, named only if they agreed.
   - The mistake: what went wrong, what it cost, what changed. Keep it honest and proportionate.
   - What the reader gets from this (why the product, service or project is the way it is), stated plainly once.
   - A soft ending: an invitation to visit, ask questions, or see the next step, without a hard sell.
3. Replace general claims with the detail that proves them; cut words such as "passionate", "artisanal", "world-class", "quality" unless backed by a fact in the same sentence.
4. Suggest photos for each section that show hands, tools and places, not posed smiles.
</task>

<constraints>
- Use only the notes. Never invent numbers, quotes, names, history or awards; mark gaps as [CHECK].
- Name or picture staff, volunteers, customers or children only where the notes say they agreed; otherwise use roles ("our head roaster").
- Leave out security details (cash handling, alarm routines, opening and closing times of empty premises), customer data, supplier prices and anything the notes mark as confidential; flag any you removed.
- No health, environmental or ethical claims ("sustainable", "chemical-free", "fair") unless the notes give the evidence; flag them.
- If the notes do not describe a process, ask for one walked through step by step and stop.
</constraints>

<output_format>
## Post
Title, post with subheadings, word count.

## Consent and detail check
Bullets: people named and whether consent is recorded, details removed for privacy or security, claims flagged, [CHECK] items.

## Photo list
Numbered shots matched to sections.
</output_format>
