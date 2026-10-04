---
schema: 1
id: write-market-stall-posts
kind: prompt
title: Write market stall posts
description: Writes this week's posts for a farmers market or craft fair stall, with what is on the table and why, where to find you, pre-orders and a sold-out note, plus a phone-friendly template.
category: social-media
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, individual, content-creator]
subject: [agriculture, retail]
requires: [none]
inputs: [notes, text]
output: [post, copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [farmers-market, craft-fair, small-producer, pre-orders, weekly-posts]
pairs_with:
  prompts: [plan-market-stall, write-local-business-facebook-posts]
args:
  - name: this_week
    description: What you are bringing this week and why (first strawberries, a new batch, a seasonal special), quantities if limited, prices if you want them shown, and anything you are not bringing. Rough notes from your phone are fine.
    type: text
    required: true
  - name: market_details
    description: Stall name, which market, day and hours, where the stall is, and how people can pre-order or reserve (DM, form, text), if they can.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [This week's post, Story or status version, Sold-out note, Reusable template]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A grower, baker or maker posts each week before market day. Regulars want three things fast: what is on the table, where and when, and whether they can reserve. What makes people come early is the reason behind the produce (the first picking of the season, a batch that only happens when the weather allows, a small run), told in the producer's own plain voice. Polished marketing copy reads false at a market stall. The post is usually written on a phone the night before, so it must be quick to adapt.

Market details: {{market_details}}
</context>

<task>
<this_week>
{{this_week}}
</this_week>

1. Pick the one lead item: the newest, most seasonal or most limited thing. Say why it is special this week in one or two sentences using only the producer's notes (weather, harvest, variety, method).
2. List the rest of the table in short lines, grouped (veg, fruit, bakes, crafts), with prices only if given.
3. Give the where and when in one line: market, day, hours, stall location.
4. Add the pre-order or reserve option exactly as given, with a cut-off if there is one. If no pre-order route is given, leave it out and mention it under the template as an option.
5. Write a short story or status version (under 30 words) for Instagram or WhatsApp status.
6. Write a sold-out note for the lead item and a "back next week?" line, so people are not disappointed in silence.
7. Turn the structure into a fill-in template the producer can copy each week with blanks in square brackets.
</task>

<constraints>
- Use the producer's facts only. Do not invent varieties, quantities, prices, awards or claims like "organic", "local" or "free-range" unless stated; these words can be regulated.
- Allergens: if a bake is listed, add "ask us about allergens" unless allergen details are given; never state that something is free from an allergen unless the notes say so.
- Warm and plain, first person, no hype words ("amazing", "epic"), at most two emoji.
- Main post under 90 words; hashtags optional, at most three, in camel case.
- If the notes do not say what is being sold or which market, ask and stop.
</constraints>

<output_format>
## This week's post
Ready to paste, with an image idea (the lead item on the stall, natural light) and alt text.

## Story or status version
Under 30 words.

## Sold-out note
Two lines.

## Reusable template
A fill-in version with [blanks], under 80 words.
</output_format>
