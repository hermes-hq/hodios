---
schema: 1
id: write-daily-specials-posts
kind: prompt
title: Write daily specials posts
description: Writes quick daily or weekly specials posts for a café, restaurant, bakery or food truck, with appetising descriptions, owner-supplied prices and allergens, a sold-out follow-up and a staff template.
category: social-media
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, marketer, individual]
subject: [hospitality]
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
tags: [daily-specials, menu-copy, food-truck, allergens, sold-out]
pairs_with:
  prompts: [build-allergen-matrix, write-local-business-facebook-posts, write-instagram-caption]
args:
  - name: specials
    description: Today's or this week's specials as the kitchen describes them, with prices, key ingredients, allergen notes, quantities if limited, and serving times. Kitchen shorthand is fine.
    type: text
    required: true
  - name: venue
    description: Venue name, type and where to find it today (for a food truck, today's pitch and hours).
    type: string
    required: true
  - name: tone
    description: Voice of the posts.
    type: enum
    enum: [warm, playful, refined]
    default: warm
output_contract:
  format: markdown
  sections: [Specials post, Story version, Sold-out follow-up, Staff template]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A café, restaurant, bakery or food truck posts specials so regulars come in today rather than some day. The post has seconds to work: the dish must sound good in a few concrete words (texture, temperature, one standout ingredient), the price and times must be clear, and allergens must be accurate because a wrong "gluten-free" can hurt someone. Staff post these between services, so the output must also become a two-minute template.

Venue: {{venue}}
Tone: {{tone}}
</context>

<task>
<specials>
{{specials}}
</specials>

1. Turn kitchen shorthand into menu language: name of the dish, then a 10-20 word description built on concrete sensory detail from the notes (crisp, slow-cooked, charred, still warm) instead of empty praise ("delicious", "amazing").
2. Show each price as given and the serving window ("from 12 until it's gone", "lunch only").
3. Add allergen information exactly as supplied, using the venue's own labels. Where none is supplied, add "Ask our team about allergens" and do not guess.
4. Lead with the most limited or most seasonal dish. Close with one action: come in, order ahead, or reply to reserve, as the notes allow.
5. Write a story version (under 25 words per dish, one dish per frame).
6. Write a sold-out follow-up that thanks people, says what is still available, and hints when the dish might return only if the notes say so.
7. Make a fill-in staff template with [blanks] and a one-line checklist (price right, allergens checked with the kitchen, photo of the actual dish).
</task>

<constraints>
- Never state or imply "gluten-free", "vegan", "nut-free", "dairy-free" or "safe for allergies" unless the notes say so, and repeat the venue's cross-contamination note if one is given.
- Do not invent ingredients, origins ("locally sourced"), prices or awards.
- Tone {{tone}}: warm is friendly and neighbourly; playful allows one pun and light emoji; refined is spare and precise, no emoji.
- Main post under 80 words.
- If no specials or prices are given, ask for them and stop.
</constraints>

<output_format>
## Specials post
Ready to paste, with a photo note (the real plate, close up, natural light) and alt text.

## Story version
One line per frame.

## Sold-out follow-up
Under 40 words.

## Staff template
Fill-in version with [blanks] and the checklist.
</output_format>
