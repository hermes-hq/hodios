---
schema: 1
id: write-delivery-exception-texts
kind: prompt
title: Write delivery exception texts
description: Writes SMS and email templates for delivery exceptions - failed attempt, running late, damaged, address problem, age check refused, safe place - each with one next action and character counts.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, support-agent, founder]
subject: [ecommerce, supply-chain]
requires: [none]
inputs: [text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sms-templates, failed-delivery, last-mile, notifications, character-limits]
pairs_with:
  prompts: [resolve-missing-parcel-complaint, write-appointment-reminder-messages, build-support-macros]
args:
  - name: business
    description: Who sends the messages (courier, delivery team or shop), your sender name, what customers can actually do (rebook online, pick-up points, redelivery days, how long parcels are held before return), your web address and your tone.
    type: text
    required: true
  - name: exceptions
    description: Which exceptions to cover if not the standard six (failed attempt, running late, damaged before delivery, address problem, age check refused, left in safe place), plus any of your own.
    type: text
  - name: channel
    description: Which templates to write.
    type: enum
    enum: [sms, email, both]
    default: both
output_contract:
  format: markdown
  sections: [Variables, Templates, Send rules, Facts to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the automated messages a delivery operation sends when something goes off plan. Each one is read on a phone screen by someone who is busy, often anxious, and increasingly wary of parcel scam texts. Good exception messages do three things: say what happened in the first few words, give exactly one next action with a deadline, and look unmistakably genuine. Common failures: vague "delivery update" texts, several competing links, missing deadlines before a parcel goes back to the sender, and wording that copies scam patterns (urgent fees, unknown links, requests for card details).

Channel: {{channel}}
</context>

<task>
<business>
{{business}}
</business>

{{#exceptions}}
<exceptions>
{{exceptions}}
</exceptions>
{{/exceptions}}

1. Define the variables once, in square brackets so they survive any messaging tool: [first_name], [sender_name], [tracking_ref], [new_window], [pickup_point], [hold_until], [rebook_link] and any others needed.
2. For each exception (the standard six unless others were given), write:
   - SMS: start with the sender name, then what happened, then the one action and its deadline. Aim for 160 characters or fewer including a typical-length link; count characters and state the count. Use plain characters only: an emoji, a curly quote or many accented letters can switch a text to 70-character segments.
   - Email: a subject of 50 characters or fewer that names the event (not "Update on your order"), a body of 60-120 words, and one clear button or link text.
3. Exception-specific rules:
   - Failed attempt: what we tried, where the parcel is now, the hold-until date and the ways to get it.
   - Running late: the new window, not just "delayed"; an apology only if the delay is ours.
   - Damaged before delivery: we did not deliver it, what happens next (replacement, refund or sender contact), and nothing the customer must do unless true.
   - Address problem: what is missing (flat number, access code), how to add it, the cut-off time.
   - Age check refused or no ID: never name the item or its category (privacy); state that an ID check is required and what ID is accepted.
   - Left in safe place: where exactly, the photo link if one exists, and who to contact within 24 hours if it is not there.
4. Anti-scam hygiene in every message: only the business's own domain, no payment requests or redelivery fees by text, no urgent threats, and a line in the email footer saying the business never asks for card details by text.
</task>

<constraints>
- Use only the options the business offers. If rebooking, pick-up points or hold periods are not stated, use a [CHECK: ...] placeholder and list it under Facts to confirm; never invent a hold period or a fee.
- One action per message. No marketing, discount codes or review requests in exception messages.
- Plain, warm, international English at about a 9-year-old reading level; no courier jargon such as "manifested" or "out for delivery exception".
- Character counts must be honest: count the template with each variable at a realistic length and say which length you assumed.
</constraints>

<output_format>
## Variables
Table: variable | meaning | example value | assumed length.

## Templates
For each exception a level-3 heading, then the SMS (with count) and/or the email (subject, body, button text), depending on the channel.

## Send rules
Bullets: when each message fires, quiet hours, how to avoid duplicate texts for the same event, and when a human should follow up.

## Facts to confirm
Bullets of every [CHECK] item.
</output_format>
