---
schema: 1
id: write-service-disruption-notices
kind: prompt
title: Write service disruption notices
description: Writes the notices for a sudden disruption such as card machine down, kitchen closed, water off or website down - door sign, social post, messages to booked customers and the staff script.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text]
output: [copy, message, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: "off"
level: beginner
tags: [disruption-notice, door-sign, outage, status-update, staff-script]
pairs_with:
  prompts: [plan-business-continuity, write-support-reply, build-service-recovery-playbook]
args:
  - name: disruption
    description: What has happened, what still works, what customers can do instead (cash only, takeaway only, another branch), who is affected (walk-ins, bookings, online orders), and what you can offer people who are let down.
    type: text
    required: true
  - name: expected_duration
    description: How long you expect it to last, or "unknown". Give a time for the next update if you can.
    type: string
    default: unknown
output_contract:
  format: markdown
  sections: [Door sign, Social post, Message to booked customers, Staff script, Updates and all-clear]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the notices a cafe, shop, salon or venue needs in the first half hour of a sudden disruption: the card machine is down, the kitchen or coffee machine is out, the water is off, staff are short, the booking system or website is down. In that half hour the owner is fixing the problem, so the words must be ready to print and send without editing. Good disruption notices say what is affected, what still works, what the customer can do now, and when the next update comes. They do not over-explain, guess an end time, or blame a supplier.

Expected duration: {{expected_duration}}
</context>

<task>
<disruption>
{{disruption}}
</disruption>

1. Door sign: a headline of 3-6 words (for example "Cash only today"), then up to 25 words on what still works and the alternative, then "Updated [time]". Large and readable from two metres away; no apology paragraph.
2. Social post: 40-80 words, the same facts, what to do instead, when the next update will be posted, and a thank-you. One version for the main page or account, and a shorter one for stories or status updates.
3. Message to booked customers (text and email): who it is for, what changes for their booking, their choices (keep, move, cancel with no fee, or the alternative), how to reply, and a deadline if the business needs to know by a time. Text under 160 plain characters if possible; email under 120 words.
4. Staff script: three or four lines to say at the door, counter or phone; what not to say (no guesses about cause or fix time, no blaming a supplier or colleague); what staff may offer and what needs a manager; how to handle someone who is upset.
5. Updates and all-clear: when to post updates if the duration is unknown (every 1-2 hours, or at a set time), an update template, and the all-clear message for the sign, social and booked customers.
</task>

<constraints>
- Use only the facts given. If the alternative or the offer for affected customers is missing, use a [CHECK: ...] placeholder; never invent a compensation, a reopening time or a cause.
- If the duration is unknown, never give an end time; give the next update time instead, as [CHECK: time] if not given.
- If the disruption involves safety (gas, electrics, flooding, food safety, no hot water in a kitchen), the staff script says to follow the safety steps and close the affected area first; do not suggest trading around a hazard.
- Plain, calm, warm language. One apology at most per notice.
</constraints>

<output_format>
## Door sign
The sign text, laid out as it should be printed.

## Social post
Main version, then the short version.

## Message to booked customers
Text version with its character count, then the email with a subject line.

## Staff script
Say, Do not say, May offer, Ask a manager, as four short lists.

## Updates and all-clear
The update rhythm, an update template and the all-clear messages.
</output_format>
