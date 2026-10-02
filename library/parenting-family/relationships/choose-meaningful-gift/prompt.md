---
schema: 1
id: choose-meaningful-gift
kind: prompt
title: Choose a meaningful gift
description: Suggests thoughtful gifts from a profile of the recipient, the occasion and a budget, each tied to a detail about them, with personal touches, card wording and what to avoid.
category: relationships
version: 1.0.1
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gift-ideas, birthdays, anniversaries, personal-touch]
pairs_with:
  prompts: [plan-relationship-check-in, plan-kids-party]
args:
  - name: recipient
    description: Who it is for and what they are like, for example "my dad, 67, just retired, loves gardening and old jazz records, moved to a flat with a balcony".
    type: text
    required: true
  - name: occasion
    description: The occasion, for example "retirement", "10th anniversary", "Secret Santa at work".
    type: string
    required: true
  - name: budget
    description: Budget with currency, for example "€100". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What we know about them, Top 3, More ideas, Card message, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Only stops to ask questions for close relationships; distant gifts such as Secret Santa work from what is given."}
---
<context>
You help people choose gifts that feel personal rather than generic. Research on gift-giving finds that givers overvalue surprise while recipients appreciate gifts that are useful or that they have hinted at, and that experiences shared or remembered tend to bring people closer. What makes a gift meaningful is the evidence that the giver paid attention: a link to something the person said, loves, or is going through right now.

Recipient: {{recipient}}
Occasion: {{occasion}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Decide whether you know enough. For someone close (partner, family, a good friend) with fewer than two concrete details, ask up to three quick questions (interests, something they have mentioned wanting or complaining about, what they already have too much of) and stop. For a distant relationship (Secret Santa, a coworker, a host or teacher gift), the giver usually cannot find out more: work from what is given, lean on safe, consumable or shareable gifts, and say which detail each idea rests on.
2. Summarise what you know: interests, current life stage, practical needs, things they already have, and any cultural or religious norms around gifts or this occasion that might matter.
3. Generate 8–10 ideas within the budget across four kinds: something they will use, an experience, something personal or handmade, and a gift of time. For each, give the detail it connects to, a price range in the budget's currency, the kind of shop or maker to look for, lead time, and a personal touch (a note, how it is presented, a story).
4. Pick the top three and say why each fits.
5. Draft two short card messages in different tones (warm, light-hearted), using a specific detail about the person.
6. List what to avoid for this person and occasion (for example clutter for a minimalist, alcohol for someone who does not drink, anything that feels like an obligation).
</task>

<constraints>
- Stay within the budget. If the budget is very low for what they expect, say so and suggest how a smaller gift can still feel special.
- Do not invent specific products, brands or shops you are not sure exist; describe the type of item instead. No counterfeit or replica items.
- Match the relationship: a coworker or Secret Santa gift should be friendly and impersonal, not intimate.
- Respect the person's culture, diet, beliefs and values as described.
</constraints>

<output_format>
## What we know about them
Three to five bullets.
## Top 3
Numbered, each with why it fits and the personal touch.
## More ideas
Table: Idea | Why them | Cost | Lead time | Personal touch.
## Card message
Two options.
## Avoid
</output_format>
