---
schema: 1
id: design-regular-customer-recognition
kind: prompt
title: Design regular customer recognition
description: Designs how a cafe, salon, pub or shop recognises its regulars - what staff note and where, names and usual orders, small gestures and privacy limits - without a points scheme.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, operate]
role: [founder, manager]
subject: [hospitality, retail]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [regulars, customer-recognition, personal-service, guest-notes, small-gestures]
pairs_with:
  prompts: [design-loyalty-program, build-service-recovery-playbook]
args:
  - name: business
    description: The business - type, how often regulars visit, how busy it gets, what staff can already see (booking system, till with customer accounts, nothing), and any regulars you already know well.
    type: text
    required: true
  - name: staff_count
    description: How many people work the floor or counter across the week, including part-timers.
    type: number
    default: 4
  - name: budget_for_gestures
    description: Rough monthly amount you are willing to spend on small gestures (free coffee, a sample, an upgrade). Optional; leave empty for no-cost gestures only.
    type: string
output_contract:
  format: markdown
  sections: [What recognition means here, What to note and where, Privacy limits, Gestures, Staff habits, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small hospitality and retail businesses keep regulars by recognising them, not by running a points scheme. What regulars value most is being known: their name, their usual, the thing they mentioned last time, and a small unexpected gesture now and then. Recognition breaks when it lives in one person's head (the regular feels like a stranger on that person's day off), when notes become intrusive or judgemental, when gestures turn into an expected entitlement, or when new customers feel the place is a club for insiders. The business has about {{staff_count}} staff on the floor across the week.
</context>

<task>
<business>
{{business}}
</business>
{{#budget_for_gestures}}
Budget for gestures: {{budget_for_gestures}} a month
{{/budget_for_gestures}}

1. What recognition means here: three to five concrete behaviours for this business (greeting by name, starting the usual on sight, asking about the thing they mentioned).
2. What to note and where: the minimum useful fields (name as they like to be called, usual order or service, preferences that matter such as oat milk or a quiet table, one conversation hook) and where they live (booking notes, till customer record, a simple shared notebook or card file) given the tools described. Notes are written so the customer could read them without offence.
3. Privacy limits: what never to record (health, religion, relationships, finances, opinions about the person, gossip), getting consent before storing contact details, how long notes are kept, and who can see them. Mention that data protection rules may apply to customer records and to check them locally.
4. Gestures: a small menu of gestures with when to use them and roughly how often, so they stay surprising (for example a free extra on the tenth visit nobody announced, remembering a birthday they mentioned, a taste of something new). No-cost gestures first; paid ones within the budget if given.
5. Staff habits: how new staff learn the regulars (a short weekly huddle, a photo-free "who's who" by first name and usual), how to recover when you forget a name, and how to welcome newcomers so regulars do not crowd them out.
6. Questions: anything to confirm.
</task>

<constraints>
- No points, stamps or discount schemes; if the business really wants one, say that is a loyalty programme design job.
- Never suggest photographing customers, tracking them across visits without their knowledge, or recording sensitive personal details.
- Gestures are small and fair; avoid anything that could look like favouritism in pricing or service speed for other waiting customers.
- Use only the business facts given; ask about tools if unclear.
</constraints>

<output_format>
## What recognition means here
Bullets.
## What to note and where
Table: Field | Example | Where it lives | Who updates it.
## Privacy limits
Bullets: never record, consent, retention, access.
## Gestures
Table: Gesture | When | How often | Cost.
## Staff habits
Bullets.
## Questions
Bullets.
</output_format>
