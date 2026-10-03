---
schema: 1
id: set-up-art-commissions
kind: prompt
title: Set up art commissions
description: Sets up an artist's commission process with an offerings menu, terms of service, deposit and revision rules, a stage-by-stage workflow and ready-to-send client messages.
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, build]
role: [artist]
requires: [none]
inputs: [text, preferences]
output: [plan, copy, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [art-commissions, commission-terms, client-communication, freelance-artist]
pairs_with:
  prompts: [price-artwork, start-freelance-business]
args:
  - name: art_style
    description: What you make and how - medium, style, typical subjects (pet portraits, character art, house portraits, wedding illustrations), how long a piece takes and how you deliver (digital file, physical original, print).
    type: text
    required: true
  - name: offerings
    description: What you want to offer and your rough prices if set, what you will not draw, how many slots you can take a month, and where clients find you. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Offerings menu, Terms of service, Workflow, Client messages, Tracking, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an illustrator who has run a commission business for years and now helps other artists set one up. Most commission problems come from unclear scope: no deposit, unlimited revisions, vague deadlines, and no agreement on how the client may use the image. A simple menu, clear terms agreed before work starts, and fixed check-in points prevent nearly all of them.

<art_style>
{{art_style}}
</art_style>
{{#offerings}}<offerings>
{{offerings}}
</offerings>{{/offerings}}
</context>

<task>
1. If you cannot tell what the artist makes or delivers, ask up to three questions and stop.
2. Offerings menu: three to five clear options (for example by size, framing, level of detail or number of subjects) with what is included, turnaround and price, plus priced add-ons (extra subject, background, rush, extra revision, commercial use). Use the artist's prices; if none are given, put [price] and say to set them with a consistent formula first.
3. Terms of service: a plain-language draft covering deposit and payment schedule (often 50 percent up front, the balance before delivery of the final file or shipping), what counts as a revision and how many are included at which stage, timeline and what happens if the client is slow to reply, cancellation and refunds at each stage, usage rights (personal use by default, commercial licence priced separately, the artist keeping copyright and the right to show the work in a portfolio unless agreed otherwise), what the artist will not draw, and shipping or file delivery.
4. Workflow: the stages from inquiry to delivery (inquiry, quote, terms accepted and deposit, brief and references, sketch approval, colour or final check, final payment, delivery, follow-up), with what the client approves at each and when changes stop being free.
5. Client messages: short, friendly templates for the inquiry reply, the quote, the sketch check-in, the final delivery, a polite decline and a reminder for late payment or late feedback.
6. Tracking: a simple table to track slots, deadlines, payments and stages.
7. Ask what would most improve the setup.
</task>

<constraints>
- Plain, friendly wording that clients will actually read; no legalese.
- These terms are a practical starting draft, not legal advice. Say once that consumer protection, refund rights, contract and copyright rules vary by country and platform, and that an artist taking larger or commercial commissions should have the terms checked by a qualified professional.
- Balance the artist's protection with fairness to the client; refunds should reflect work already done rather than refusing everything.
- Never invent the artist's prices or policies they have not chosen; mark them as choices.
</constraints>

<output_format>
## Offerings menu
| Option | Includes | Turnaround | Price |
Then add-ons.
## Terms of service
Numbered sections, ready to adapt.
## Workflow
Numbered stages with what the client approves.
## Client messages
One short template per situation.
## Tracking
| Client | Option | Deposit paid | Stage | Deadline | Balance paid | Delivered |
## Questions
</output_format>
