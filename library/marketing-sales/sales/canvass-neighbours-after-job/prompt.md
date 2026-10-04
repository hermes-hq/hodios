---
schema: 1
id: canvass-neighbours-after-job
kind: prompt
title: Canvass neighbours after a job
description: Plans the doorstep visit a tradesperson makes to neighbours after a finished job, with the customer's permission, which doors to knock, a 30-second opener, replies and a visit log.
category: sales
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
subject: [construction]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [doorstep-canvassing, neighbour-leads, customer-permission, no-cold-callers, local-leads, tradespeople]
pairs_with:
  prompts: [write-door-to-door-leaflet-copy, ask-clients-for-referrals, triage-open-quotes, answer-price-shopper-calls]
  workflows: [quote-to-close-track]
  personas: [small-business-selling-mentor]
args:
  - name: job_done
    description: The job just finished - what you did, the street or area (not the full address), what neighbours could see (scaffolding, skip, new roof, driveway), how long it took, what the neighbouring houses are like (same age, same build), and whether the customer was happy and might recommend you.
    type: text
    required: true
  - name: business
    description: Your business name, trade, who will knock (you, a partner, an apprentice), contact number or booking link, how you normally quote, any price ranges you are happy to say on the doorstep, and checks people can verify (trade body membership, insurance). Placeholders are fine.
    type: text
    required: true
  - name: offer
    description: Anything genuine you can offer neighbours (free inspection, no call-out fee while you are on the street, a discount if two neighbours book together). Optional; none is invented.
    type: text
output_contract:
  format: markdown
  sections: [Permission, Doors and timing, Doorstep opener, Replies, No-answer card, Visit log]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a roofer, landscaper, window cleaner, solar or driveway installer, or similar trade knock on neighbours' doors in the days after a finished job and talk to them in person. Neighbours have watched the van and the work, so they are the warmest local prospects there are, but a doorstep visit goes wrong when it names the customer without permission, runs like a pressure sale, invents a problem with the neighbour's house, uses "today only" urgency, ignores "no cold callers" signs, or tries to sign someone up on the spot. A good visit is short, friendly and specific: the job they saw, one question, an offer to look properly at a booked time, and an immediate, warm exit on "no thanks".

This entry is about the visit and the conversation. If the user mainly wants printed copy to post through letterboxes (a leaflet, door hanger or postcard), that is a separate job (write-door-to-door-leaflet-copy); here, only a short handwritten-style card for doors where nobody answers is written.
</context>

<task>
<job_done>
{{job_done}}
</job_done>

<business>
{{business}}
</business>

{{#offer}}<offer>
{{offer}}
</offer>{{/offer}}

1. Permission: write the short question to ask the customer before any visit: may you mention the job by street (never their name or house number unless they agree), show before-and-after photos on a phone, and pass their name to a neighbour who asks for a reference. Say what changes if they say no (talk only about "a job on this street", no photos of their home).
2. Doors and timing: which doors (typically the 10 to 20 homes with a view of the job plus similar houses on the same street), when (within about a week of finishing; early weekday evening or late Saturday morning; never after dark), how long per door (aim for under 2 minutes unless invited to talk), and which doors to skip: "no cold callers" or "no sales" signs, anyone who has said no before, homes where only a child answers. Note who knocks and what to carry (ID or a business card, the phone with photos, a notebook, the no-answer cards).
3. Doorstep opener, under 30 seconds spoken: who you are, the job they have probably seen, one easy question tied to their house ("Yours looks the same age; has anyone had a look at the roof recently?"), and the offer to book a proper look at a time that suits them. If an offer was given, mention it once, plainly. Step back from the door, no foot over the threshold.
4. Replies, each one or two spoken sentences: "No thanks" (thank them and leave at once); "How much?" (give a range only if one is in the business notes, otherwise explain that you quote after a look and offer a time); "We already have someone" (say that is good and leave a card); "Can you look at mine now?" (a quick visual look is fine if invited, but quote later in writing, never sign up on the doorstep); "Was that the house at number...?" (answer only within the permission given); "Are you insured / who are you with?" (only the checks in the business notes); an older or vulnerable person who seems unsure (suggest they talk it over with family and offer to come back when someone can join).
5. No-answer card: a handwritten-style note under 30 words for doors where nobody answers, naming the job on the street, one line on what you can do, and the contact. Not a designed leaflet.
6. Visit log: how to record each door so nobody is knocked twice against their wishes and the return can be measured.
</task>

<constraints>
- Never name or identify the customer, or show photos of their home, beyond the permission given.
- No fake urgency, no claims that a neighbour's property needs work you have not inspected, no safety scare stories. Describe what you saw only after a requested look, and only what you actually saw.
- No sale is agreed on the doorstep: book a visit or send a written quote. Tell the user to check the local rules on doorstep and off-premises selling, cooling-off periods and cancellation notices before canvassing, and that these differ by country.
- Respect "no cold callers" signs, a "no" at the door and any do-not-knock list; do not go back to a door that said no.
- Use only the offers, prices and credentials given; use [X] placeholders for anything missing.
- If the job or the business details are missing, ask for them and stop.
</constraints>

<output_format>
## Permission
The question for the customer, and what changes if they say no.

## Doors and timing
Bullets: which doors and how many, days and times, time per door, who knocks and what to carry, doors to skip.

## Doorstep opener
The spoken opener with its approximate length in seconds.

## Replies
Table: They say | You say.

## No-answer card
The card text with a word count.

## Visit log
Table: Door (house number only) | Date | Outcome (no answer, no thanks, card left, look booked, quote sent) | Follow-up date | Do not knock again (yes/no). Then one line on totals to compare after a month: doors, conversations, looks booked, quotes, jobs won.
</output_format>
