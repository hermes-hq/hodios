---
schema: 1
id: script-hotel-overbooking-walk
kind: prompt
title: Script an overbooking walk
description: Writes the script and checklist for walking an overbooked hotel guest to another property - who to walk, the desk script, transport and compensation, and a follow-up to win them back.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [text]
output: [script, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [overbooking, walked-guest, front-office, service-recovery, alternative-hotel]
pairs_with:
  prompts: [practise-front-desk-guest-complaints, build-service-recovery-playbook]
  personas: [guest-relations-manager]
args:
  - name: property
    description: Your property - size, room types, how many rooms you are over tonight, arrivals still due and their details (length of stay, booking channel, loyalty level, special needs), nearby hotels you could walk to, and who is on duty.
    type: text
    required: true
  - name: compensation_options
    description: What you are allowed to offer - paying the other hotel, taxi or transfer, a phone call home, a voucher, points, a free night on return. Leave empty to get a standard package marked for approval.
    type: text
output_contract:
  format: markdown
  sections: [Walk decision, Before the guest arrives, Desk script, Arrangements checklist, Follow-up message, Log and review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a front office manager or B&B owner who is oversold tonight and must "walk" one or more guests to another property. A walk handled well can earn a loyal guest; handled badly it becomes the worst review the hotel ever gets. Experienced managers decide early (before the evening arrival peak), arrange and pay for the alternative before the guest arrives, deliver the news privately and honestly in person, and follow up the next day. The usual mistakes: discovering the problem at the desk, letting a junior receptionist break the news at a crowded counter, blaming "the system", and making the guest pay first and claim later.
</context>

<task>
<property>
{{property}}
</property>

{{#compensation_options}}
<compensation_options>
{{compensation_options}}
</compensation_options>
{{/compensation_options}}

1. Decide who to walk, using business criteria applied the same way to everyone:
   - Prefer: one-night stays, guests arriving late with flexible plans, guests who agree when asked in advance (an offer to volunteer with a sweetener often solves it).
   - Avoid where possible: multi-night stays (or walk the first night only and bring them back), loyalty members at top tiers, direct and repeat guests, groups and weddings, guests with accessibility needs unless the other property fully meets them, families with small children late at night, anyone arriving after about 22:00 with no transport.
   - Never choose on nationality, appearance, age or any other personal characteristic.
   Show the ranking in a short table with the reason for each.
2. Before arrival: check no-show and early-departure chances, call the alternative hotel(s) of the same or higher standard nearby, book and prepay the room for the night, arrange transport, and try to reach the guest by phone before they travel.
3. Write the desk script for the duty manager: a private spot, the guest's name, the plain truth in the first two sentences ("We don't have a room for you tonight, and that is our failure"), what is already arranged and paid, the choice they have, the return plan for multi-night stays, and calm lines for anger ("You're right to be upset. Here's what I've done so far.").
4. Arrangements checklist: room booked and paid, confirmation number in hand, transport booked both ways, phone call or message to family, messages and parcels forwarded, a note on the profile, and the return room blocked and upgraded where possible.
5. Write the follow-up message for the next day: thanks, apology, what you will do on their return, and a named person to contact.
</task>

<constraints>
- Use only the facts and options given. If compensation options are missing, propose a standard package (first night paid at the other hotel, transport both ways, a call home, an upgrade or amenity on return) clearly marked "for approval".
- Never ask the walked guest to pay and claim back. Never say "the system overbooked you".
- Do not state legal compensation rules; if the guest booked through a channel or package with its own terms, say to check them.
- Keep the desk script speakable: short sentences, under about 180 words.
{{> output/uncertainty}}
</constraints>

<output_format>
## Walk decision
Table: arrival | stay | why walk or keep. Then one line with the decision.

## Before the guest arrives
Numbered steps with who does them and by what time.

## Desk script
The script, then three short lines for pushback.

## Arrangements checklist
Checkbox list.

## Follow-up message
Ready-to-send email or text.

## Log and review
Bullets: what to record, and two questions for tomorrow's review of why the hotel was oversold.
</output_format>
