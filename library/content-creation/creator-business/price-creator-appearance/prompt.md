---
schema: 1
id: price-creator-appearance
kind: prompt
title: Price a creator appearance
description: Prices an invitation to appear in person - event, panel, brand activation, meet and greet - from real time including travel and prep, content and likeness asks, with a rider and a reply.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [message, notes]
output: [table, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [appearance-fee, event-appearance, speaking-fee, brand-activation, travel-rider]
pairs_with:
  prompts: [build-creator-rate-card, write-media-kit, review-sponsorship-contract]
  personas: [creator-business-manager]
args:
  - name: invite
    description: "The invitation: who is asking (brand, conference, convention, school, charity), what you would do, date, location, length, content they want posted, recording or photo use, and any fee or budget mentioned."
    type: text
    required: true
  - name: context
    description: "Where you live, how you would travel, your rate card or past appearance fees if any, audience size, whether the event helps your goals, and your country."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The ask, Time it really takes, Fee build-up, Rider and terms, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An appearance takes far more time than the hours on stage: preparation, travel days, waiting, the event itself, and recovery, plus any content the organiser wants posted before and after. Brand activations and conventions often ask for social posts, photo and video use of the creator's likeness in marketing, and sometimes exclusivity around the event; each of these is separate value that can be priced. Experienced creators price from a day rate or their content rates, add posting deliverables and usage at their usual rates, and send a short rider covering travel class, accommodation, ground transport, meals, a green room, a safety or security contact for meet-and-greets, a handler, and payment timing (often a deposit, with a cancellation fee). Charity, school or community invites may be worth doing for less or free, but that is a choice, with the organiser still covering costs. Organisers' first offers are often 'exposure'; a clear quote with what is included avoids awkward back-and-forth.
</context>

<task>
<invite>
{{invite}}
</invite>

<your_situation>
{{context}}
</your_situation>

1. **The ask:** what the organiser wants in plain words, including hidden asks (posts, photo and video use in their marketing, exclusivity, extra hours).
2. **Time it really takes:** a table of prep, travel, event, waiting and recovery time, totalled in days.
3. **Fee build-up:** a fee built from their day rate or content rates for time, plus posting deliverables, likeness usage and exclusivity priced separately, with placeholders where they lack rates. Give a reduced option and say when a free or reduced appearance might be worth it.
4. **Rider and terms:** travel, accommodation, meals, ground transport, green room, security and handler for meet-and-greets, deposit and cancellation fee, recording and photo use limits, and payment date.
5. **Reply:** a short reply with the quote, what it includes and a deadline, or a polite decline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not quote market appearance fees as fact; use their numbers or placeholders.
- Always cover travel and safety for in-person meet-and-greets.
- Do not commit the creator to posts or usage not priced.
- Show arithmetic and assumptions.
</constraints>

<output_format>
## The ask
## Time it really takes
Table: part | hours.

## Fee build-up
Table: item | basis | amount.

## Rider and terms
Checkbox list.

## Reply
</output_format>
