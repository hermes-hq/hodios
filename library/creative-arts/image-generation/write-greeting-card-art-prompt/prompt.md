---
schema: 1
id: write-greeting-card-art-prompt
kind: prompt
title: Write greeting card artwork prompts
description: Writes prompts for greeting card and invitation artwork for an occasion, with a front composition, an inside spot motif and a matching back, leaving clear space for the message.
category: image-generation
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent]
stack: [midjourney, stable-diffusion, dall-e]
requires: [none]
inputs: [text]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [greeting-cards, invitations, printables, occasions, stationery]
pairs_with:
  prompts: [write-image-prompt, write-seamless-pattern-prompt]
args:
  - name: occasion
    description: The occasion and any personal detail to work in, e.g. "70th birthday, she loves sailing", "baby shower invitation, woodland theme", "sympathy card".
    type: string
    required: true
  - name: recipient
    description: Who the card is for, e.g. friend, grandparent, colleague, child, couple, whole team.
    type: string
    default: friend
  - name: style
    description: The artwork style.
    type: enum
    enum: [watercolour, minimal, vintage, playful]
    default: watercolour
output_contract:
  format: markdown
  sections: [Concept, Front prompt, Inside motif prompt, Back prompt, Message space, Print notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stationery illustrator. A card works when the front has one clear idea that suits the occasion and the relationship, the inside has a small motif that echoes the front and leaves room to write, and the whole set shares a palette. Tone matters more than detail: a sympathy card is quiet and restrained, a child's birthday is bright and busy, a work card stays friendly but neutral. Generated lettering is unreliable, so "Happy Birthday" or names are added afterwards in an editor or by hand. Cards and invitations print on folded stock, commonly A6 (105 x 148 mm), A5 or 5 x 7 inches, and need a little bleed.

Occasion: {{occasion}}
Recipient: {{recipient}}
Style: {{style}}
</context>

<task>
1. **Concept.** The front idea in two lines, drawing on any personal detail in the occasion, matched to the tone for a {{recipient}}. If the occasion is ambiguous in a way that changes the tone or imagery (for example which faith's holiday, or whether a "leaving card" is a retirement or a bereavement), ask one question and stop.
2. **Front prompt.** Portrait card front in {{style}} style: the motif and its placement, a calm area in the upper or lower third for a greeting added later, a palette of three to five named colours suited to the occasion, paper texture if the style suits it, and "no text, no letters".
3. **Inside motif prompt.** A small spot illustration that echoes the front (one element from it), on plain white, for the corner or top of the inside page.
4. **Back prompt.** A tiny matching emblem or a simple pattern strip, optional.
5. **Message space.** Where the greeting goes on the front, and two or three short message suggestions for the inside that fit the occasion and recipient, for the user to adapt.
6. **Print notes.** Common folded sizes, the pixel size at 300 dpi for the chosen size, about 3 mm bleed, and a reminder to print a test on plain paper first.
</task>

<constraints>
- No text in the artwork; greetings and names are added afterwards.
- No copyrighted characters, sports or brand logos, or real people's likeness.
- Keep imagery respectful of the occasion and of religious or cultural traditions; do not mix symbols from different traditions unless the user asks.
</constraints>

<output_format>
## Concept
## Front prompt
One code block.
## Inside motif prompt
One code block.
## Back prompt
One code block, or "skip".
## Message space
Placement, then the message suggestions as a short list.
## Print notes
</output_format>
