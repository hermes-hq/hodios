---
schema: 1
id: write-guest-messages-for-rental
kind: prompt
title: Write guest messages for a short-term rental
description: Writes the guest message set for a short-term rental host - booking confirmation, pre-arrival, check-in guide, house rules, mid-stay check, checkout and review request - in a warm, clear voice.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, individual, support-agent]
subject: [hospitality, real-estate]
inputs: [notes, text]
output: [message, copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [short-term-rental, vacation-rental, host-messages, check-in-instructions, house-rules, guest-communication]
pairs_with:
  prompts: [write-appointment-reminder-messages, respond-to-online-review, build-support-macros]
args:
  - name: property
    description: The property and how arrival works - type, location area, check-in and checkout times, self check-in method, parking, wifi, appliances that confuse people, local tips, and the host's name and voice.
    type: text
    required: true
  - name: rules
    description: House rules and policies - guest numbers, pets, smoking, parties, quiet hours, rubbish and recycling, early or late check-in, what to do at checkout, damage and lost keys. Leave empty to get placeholders.
    type: text
output_contract:
  format: markdown
  sections: [Message set, House rules card, Sending schedule, Fill in before using]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write guest communications for short-term rental hosts. Good messages prevent the messages hosts dread: "how do I get in?" at 11 p.m., "where do I park?", "the wifi doesn't work", and the surprise one-star review about rules nobody explained. Each message has one job and arrives when the guest needs it: details confirmed at booking, directions and access a day or two before, a quick check after the first night, clear and short checkout steps. Rules are stated once, kindly and specifically, with the reason where it helps ("Quiet after 22:00 - our neighbours are families with young kids"). Platform policies and local short-let rules vary, so hosts must keep their messages consistent with their listing and platform terms.
</context>

<task>
Write the guest message set.

<property>
{{property}}
</property>
{{#rules}}
<rules>
{{rules}}
</rules>
{{/rules}}

1. Write these messages, each short enough to read on a phone, with [GuestName], [CheckInDate], [CheckOutDate] and other merge fields in square brackets:
   - Booking confirmation: thanks, dates, what happens next, one question (arrival time, purpose of stay if helpful for tips).
   - Pre-arrival (one to two days before): address, directions and parking, check-in time and method step by step, wifi, host contact and what to do if something goes wrong on arrival.
   - Check-in guide (can be a separate document): access steps, where things are, appliances with quirks, heating or cooling, rubbish, emergency information (local emergency number as `[LOCAL EMERGENCY NUMBER]`, the location of the fire extinguisher and first aid kit, the gas or water shut-off if relevant), local tips.
   - Mid-stay check (morning after the first night): one short question, an easy way to report problems.
   - Checkout reminder (evening before): time and the short list of what to do (keys, rubbish, dishes, windows), and what not to bother with.
   - After checkout: thanks and a review request that is genuine, not pushy.
   - Two problem replies: a guest locked out, and a noise or rules complaint from a neighbour about the guest.
2. Write a house rules card for the property, short and friendly, using the given rules; use `[RULE: …]` placeholders if rules are empty.
3. Give a sending schedule.
</task>

<constraints>
- Do not invent access codes, addresses, wifi passwords, fees or deposits; use placeholders. Remind the host not to put door codes in public listing text.
- Keep each message under about 150 words except the check-in guide; use numbered steps for anything physical (finding the key box, operating the boiler).
- Never ask for or offer a review in exchange for a discount or gift, or ask guests to contact the host instead of leaving an honest review.
- Rules are firm but courteous; no capital letters, threats or lists of fines in the welcome messages. State any fee or deposit only if the host gave it, once, in the house rules card.
- Note in "Fill in before using" that the host should check local short-let rules and their platform terms where these may apply (registration numbers, guest limits, tourist taxes).
</constraints>

<output_format>
## Message set
Each message with a heading, timing and the text ready to paste.
## House rules card
## Sending schedule
Table: Message | When | Channel (platform messaging, SMS, email, printed).
## Fill in before using
Checklist of placeholders and checks.
</output_format>
