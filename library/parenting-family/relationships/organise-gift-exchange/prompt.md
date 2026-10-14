---
schema: 1
id: organise-gift-exchange
kind: prompt
title: Organise a gift exchange
description: Sets up a Secret Santa or other gift exchange for friends, family or a workplace, with the format, budget, draw rules, exclusions, wish lists, an announcement and a fallback for no-shows.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [secret-santa, gift-exchange, white-elephant, holiday-traditions, group-games]
pairs_with:
  prompts: [choose-meaningful-gift, create-family-tradition, budget-for-holidays-and-gifts]
args:
  - name: group
    description: Who is taking part, roughly how many, how well they know each other (family, friends, colleagues), ages if children are included, and whether it is in person or remote.
    type: text
    required: true
  - name: wishes
    description: Budget with currency, the occasion and date, and anything to plan around (couples who should not draw each other, someone who cannot spend much, people in other countries). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Format, Rules, The draw, Wish lists, Announcement, On the day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run gift exchanges. Formats differ: a secret draw where each person buys for one other (Secret Santa, Kris Kringle, Wichteln, amigo secreto), a swap or steal game with wrapped gifts (often called White Elephant or Yankee swap), a themed exchange (a book, a local item, something handmade), or a children-only draw in large families. What makes them work: one clear budget that everyone can afford, a draw with sensible exclusions (partners, people in the same household, last year's pairs), short wish lists or "likes and no-gos", clear dates for shipping if remote, a plan for anyone who forgets, and workplace-safe rules (no gag gifts that embarrass, nothing alcoholic by default).

<group>
{{group}}
</group>
{{#wishes}}Wishes: {{wishes}}{{/wishes}}
</context>

<task>
1. Format: recommend the best format for this group with one alternative, and why.
2. Rules: budget (one figure, with a lower option if anyone is stretched), what counts as a good gift, what is off limits, and remote shipping if relevant.
3. The draw: how to do it fairly (names from a hat, or a free draw tool if they prefer), the exclusions to set, and how to keep it secret. Do not invent specific tool names; describe what to look for.
4. Wish lists: a short template (likes, dislikes, sizes if relevant, "please no") and a deadline.
5. Announcement: a ready-to-send message with format, budget, dates, wish-list request and a polite opt-out line.
6. On the day: running order for the reveal or swap game, a fallback gift for no-shows, and how to include remote people.
</task>

<constraints>
- Keep it inclusive: an easy opt-out, no pressure to spend beyond the budget, and nothing tied to a religion unless the group shares it.
- For workplaces, no embarrassing, sexual or alcohol-based gag gifts by default, and mention checking any workplace gift policy.
- For children, adapt the rules so younger ones are not left out of the surprise.
- Neutral on culture; use the local name for the tradition if given.
</constraints>

<output_format>
## Format
## Rules
## The draw
## Wish lists
## Announcement
In quotes.
## On the day
</output_format>
