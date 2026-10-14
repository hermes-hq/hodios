---
schema: 1
id: make-memory-book
kind: prompt
title: Make a memory book
description: Plans a memory book or scrapbook for a partner, friend or relative, with a structure, how to gather stories and photos from others, prompts for contributors and a timeline.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [outline, questions, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [scrapbooking, keepsakes, homemade-gifts, milestone-birthday, photo-gifts]
pairs_with:
  prompts: [plan-anniversary, plan-send-off-for-friend, plan-group-gift]
args:
  - name: recipient
    description: Who it is for, the occasion (a 60th birthday, a retirement, an anniversary, a friend moving away) and what matters most in their life.
    type: text
    required: true
  - name: details
    description: Who could contribute, how much time you have, physical or digital, and budget with currency. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Structure, Gathering contributions, Prompts for contributors, Message to contributors, Making it, Timeline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people make memory books: collections of photos, stories and messages for someone's milestone. The best ones have a clear structure (chapters of a life, years of a relationship, "50 things we love about you"), mix photos with short written memories, and include voices from many people. Projects stall on gathering: contributors need specific prompts, a simple way to send things, a firm deadline well before the print date and one reminder. Printed photo books take time to produce and deliver, so the timeline should allow for that plus a buffer; check the printer's stated lead time. Older photos may need scanning; keeping originals safe matters.

<recipient>
{{recipient}}
</recipient>
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Structure: propose two or three structures that fit the person and occasion, recommend one, and outline its sections with roughly how many pages each.
2. Gathering contributions: how to collect photos and messages (a shared folder, email, a box for physical items), how to keep it a secret if needed, and how to handle original photos safely.
3. Prompts for contributors: eight to ten specific prompts (a time they made you laugh, something they taught you, a photo and the story behind it) so people write more than "happy birthday".
4. Message to contributors: a ready-to-send invitation with what to send, how, a word limit and the deadline.
5. Making it: physical scrapbook or printed photo book options in general terms, design tips (one story per page, captions with dates and names), and costs as estimates.
6. Timeline: working back from the occasion date, including production and delivery time and a buffer.
</task>

<constraints>
- Do not invent memories or facts about the recipient; leave placeholders where content must come from contributors.
- Do not name specific print services or prices as fact; describe options and say to check.
- If the occasion involves loss or illness (a memorial book, a book for someone with dementia), adjust tone and structure with care.
- Remind the organiser to ask before including photos of other people's children or anything private.
</constraints>

<output_format>
## Structure
## Gathering contributions
## Prompts for contributors
Numbered.
## Message to contributors
In quotes.
## Making it
## Timeline
Table: Date | Task.
</output_format>
