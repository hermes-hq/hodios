---
schema: 1
id: write-host-stand-booking-script
kind: prompt
title: Write a host stand booking script
description: Writes host stand and phone scripts for a restaurant covering bookings, the waitlist, large groups, deposits, allergies noted at booking, walk-ins on a full night and turning tables politely.
category: customer-support
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, manager, operations-manager]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [restaurant-bookings, waitlist, table-turns, deposits, front-of-house]
pairs_with:
  prompts: [train-server-with-roleplay, reduce-appointment-no-shows, write-appointment-reminder-messages]
args:
  - name: restaurant
    description: The restaurant - style, covers, opening times, how bookings arrive (phone, online, walk-in), and the tone you want (relaxed neighbourhood place, formal dining room).
    type: text
    required: true
  - name: booking_rules
    description: Your rules - table time limits, group size that needs a set menu or deposit, deposit and cancellation terms, how long tables are held for late arrivals, waitlist method, how allergies are recorded. Optional; gaps are marked for you to decide.
    type: text
output_contract:
  format: markdown
  sections: [Phone booking, Taking details, Large groups and deposits, Allergies at booking, Walk-ins and the waitlist, Late arrivals and no-shows, Turning tables, Rules to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write front-of-house scripts for restaurants. The host stand shapes the whole night: a booking taken without a time limit causes an argument at 9pm, an allergy mentioned on the phone and not written down reaches the kitchen too late, a walk-in turned away curtly posts a review, and a host who quotes "about ten minutes" for a 40-minute wait loses the table anyway. Good scripts are short lines a host can say naturally, with the key details confirmed back, honest wait times, and polite firmness on limits agreed at booking rather than sprung on the guest later.
</context>

<task>
<restaurant>
{{restaurant}}
</restaurant>
{{#booking_rules}}
<booking_rules>
{{booking_rules}}
</booking_rules>
{{/booking_rules}}

1. Phone booking: answering line, checking availability, offering alternatives when the slot is full (another time, the bar, the waitlist), and the close.
2. Taking details: name, number, party size, date and time, children or high chairs, accessibility needs, occasion, allergies. Read-back line confirming date, time, party size and any table time limit.
3. Large groups and deposits: the threshold from the rules, how to explain the set menu, deposit and cancellation terms in one or two sentences, and when to send written confirmation.
4. Allergies at booking: record the allergy and severity, say it will be passed to the kitchen and confirmed on arrival, and never promise a dish is safe on the phone.
5. Walk-ins and the waitlist: greeting on a full night, honest wait quotes (quote longer, seat sooner), taking a number, offering the bar, and a warm "no" when there is no chance tonight with an invitation to book.
6. Late arrivals and no-shows: the hold time and the call to a late party; what to say when the table has gone.
7. Turning tables: the gentle reminder 15 minutes before the agreed end, offering to move to the bar or lounge, and never rushing guests whose limit was not stated at booking.
8. Rules to confirm: every rule you assumed, marked [X].
</task>

<constraints>
- Lines are short enough to say aloud, in the restaurant's tone; British, American or other spelling as the input uses.
- Use only the rules given; mark any assumed time limit, deposit, hold time or group threshold as [X]. Never invent deposit amounts or cancellation fees.
- Allergy lines never guarantee safety or say "it's fine"; the kitchen decides and confirms with the guest.
- Do not refuse or treat guests differently for reasons such as disability, assistance animals, children's age or appearance unless a stated, lawful house rule applies; check local rules on assistance animals.
</constraints>

<output_format>
For each section, a heading, then the host's lines in quotes with a one-line note on when to use each. Keep each section under about 120 words.
## Phone booking
## Taking details
## Large groups and deposits
## Allergies at booking
## Walk-ins and the waitlist
## Late arrivals and no-shows
## Turning tables
## Rules to confirm
Bulleted [X] items.
</output_format>
