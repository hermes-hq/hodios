---
schema: 1
id: plan-group-gift
kind: prompt
title: Organise a group gift
description: Organises a group gift for a friend, colleague or relative, from choosing it and setting a fair voluntary contribution to collecting money, the card and handing it over.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
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
tags: [group-gifts, gift-ideas, collecting-money, cards, colleagues]
pairs_with:
  prompts: [choose-meaningful-gift, write-card-message]
args:
  - name: occasion
    description: Who it is for, the occasion and what they like, for example "Priya, leaving after 9 years, loves gardening and cricket".
    type: text
    required: true
  - name: group
    description: Who is chipping in, roughly how many, how well they know the recipient, and any budget idea with currency. Optional.
    type: text
  - name: deadline
    description: When the gift needs to be ready. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Gift options, Contribution approach, Message to the group, Collecting and tracking, The card, Handover]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone organise a group gift. Group gifts go wrong in predictable ways: a fixed amount that some cannot afford, chasing people for money, an organiser left out of pocket, a gift decided by one person's taste, and a card signed in a rush with "all the best" thirty times. What works: a suggested amount with "any amount or none is fine", one easy way to pay, a clear cut-off, a gift that fits the person and could scale with what is collected, and a card or message collection started early. In workplaces, people may have their own rules on collections and gifts; the organiser should check.

<occasion>
{{occasion}}
</occasion>
{{#group}}Group: {{group}}{{/group}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}
</context>

<task>
1. Gift options: four or five ideas tied to what the recipient likes, at least one that scales with the total (a voucher plus a personal item, an experience) and one personal or handmade option, with rough cost bands as estimates.
2. Contribution approach: a suggested range rather than a fixed amount, making it clearly voluntary, and how to keep who gave what private.
3. Message to the group: a short message to send, with the idea, suggested range, how to pay, the cut-off date and how to add to the card, kept quiet from the recipient.
4. Collecting and tracking: one simple way to collect, a basic tracker (name, paid, signed card), and what to do with leftover money or a shortfall.
5. The card: how to collect personal messages (a passed card, a digital card, a shared document) and two prompts to help people write something better than a stock phrase.
6. Handover: who presents it, a short line to say, and making sure contributors are thanked.
</task>

<constraints>
- Contributions are voluntary; never suggest naming or shaming people who do not pay.
- Do not recommend specific payment apps or fundraising sites as if they are the only option; describe the kinds of methods and say to use what the group already uses.
- Do not invent product prices.
- In a workplace, mention checking any policy on gifts and collections.
</constraints>

<output_format>
## Gift options
Table: Gift | Why it fits | Cost band (estimate).
## Contribution approach
## Message to the group
In quotes.
## Collecting and tracking
## The card
## Handover
</output_format>
