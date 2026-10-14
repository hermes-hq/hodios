---
schema: 1
id: find-a-gift
kind: prompt
title: Find a gift
description: Finds gift ideas for anyone and any occasion, asking who it is for, the occasion and budget if missing, then gives a shortlist tied to the person with prices, timing and a top pick.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [present, gift-ideas, birthday, christmas, anniversary, last-minute, budget-gift]
pairs_with:
  prompts: [choose-meaningful-gift, plan-group-gift, organise-gift-exchange, make-experience-vouchers]
args:
  - name: recipient
    description: Who it is for and how you know them, plus anything they love, do or have mentioned, for example "my dad, 70, gardens, just retired", "a coworker I barely know".
    type: text
  - name: occasion
    description: The occasion and date, for example "birthday on 3 November", "thank-you for a host", "Secret Santa next week".
    type: text
  - name: budget
    description: How much you want to spend, with currency, for example "about 30 EUR", "under 100 USD".
    type: text
output_contract:
  format: markdown
  sections: [Shortlist, Top pick, Card line, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find a good gift quickly. Generic gift lists fail because they are not about the person: a candle, a mug, a gadget nobody asked for. Recipients tend to value gifts that are useful, that they hinted at, or that give them a good experience, more than surprise or price. A good gift shows the giver paid attention, fits the relationship, arrives on time and stays within budget.

{{#recipient}}Recipient: <recipient>{{recipient}}</recipient>
{{/recipient}}{{#occasion}}Occasion: <occasion>{{occasion}}</occasion>
{{/occasion}}{{#budget}}Budget: {{budget}}
{{/budget}}</context>

<task>
1. You need who it is for (and how close you are) and a budget. If you have a recipient with at least one detail about them, go ahead: assume what is missing (a general occasion, ideas at three price levels) and say so in one line. Otherwise ask 2–3 short numbered questions, each with an example answer, for example:
   1. Who is it for, and what do they enjoy or talk about? *e.g. "my sister, 30, into climbing and coffee"*
   2. What's the occasion, and when do you need it? *e.g. "birthday, 12 December"*
   3. Roughly how much do you want to spend? *e.g. "around 50 EUR"*
   Add: "If you'd rather I just start, I'll give ideas at three price levels for a general occasion." Then stop and wait.
2. Match the relationship. For someone close, tie each idea to a detail about them. For someone you barely know (coworker, Secret Santa, host, teacher), choose safe, useful, consumable or shareable gifts, and nothing intimate or about their body or age.
3. Give 6–8 ideas across kinds: something they will use, an experience, something to eat or drink (only if it fits their diet and beliefs), something personal or handmade, and a gift of time. For each: why it suits them, a price range in their currency, and how much lead time it needs.
4. Check timing against the date: mark anything that may not arrive in time and give a last-minute alternative.
5. Pick the top one and say why. Add one short card line using a detail about the person.
</task>

<constraints>
- Stay within the budget. If it is tight, say how a small gift can still feel thoughtful.
- Do not invent specific products, brands or shops you are not sure exist; describe the kind of item and where to look.
- No alcohol for someone who does not drink, no food that breaks their diet or beliefs, no counterfeit items.
- Some workplaces and schools limit gifts to staff; mention it for teacher, client or public-sector gifts.
</constraints>

<output_format>
## Shortlist
Table: Idea | Why them | Price | Lead time.

## Top pick
The idea and why, in two or three sentences.

## Card line
One line.

## Next steps
One line offering: Choose a meaningful gift (deeper, more personal ideas), Organise a group gift, Organise a gift exchange, Make homemade experience vouchers.
</output_format>
