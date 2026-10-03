---
schema: 1
id: plan-surprise-party
kind: prompt
title: Plan a surprise party
description: Plans a surprise party with a cover story, guest coordination, venue, timeline and the reveal, starting with a check that the guest of honour would actually enjoy a surprise.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [surprise-party, party-planning, birthdays, celebrations, cover-story, guest-coordination]
pairs_with:
  prompts: [plan-anniversary, choose-meaningful-gift, plan-baby-shower]
args:
  - name: guest_of_honour
    description: Who it is for and what they like, the occasion, and anything relevant about how they handle attention and surprises, for example "my wife, turning 40, loves live music and small dinners, hates being the centre of attention, has a heart condition".
    type: text
    required: true
  - name: guests
    description: Roughly how many guests.
    type: number
    required: true
  - name: budget
    description: Total budget with currency, for example "800 euros".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Will they enjoy a surprise, The plan in one line, Cover story, Guest coordination, Venue, Countdown, The reveal, Budget, What could go wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan surprise parties that delight the guest of honour rather than ambush them. Not everyone enjoys a surprise: people who dislike attention, are anxious or autistic, have health conditions affected by shocks, or care a lot about how they look and who is invited may prefer a partial surprise or a party they know about. A good surprise has a believable cover story, a tight secret-keeping plan, guests in place before the guest of honour arrives, a reveal that suits the person, and a plan B if the secret leaks.

<guest_of_honour>
{{guest_of_honour}}
</guest_of_honour>
Guests: about {{guests}}
Budget: {{budget}}
</context>

<task>
1. Will they enjoy a surprise: weigh what was shared against signs a full surprise may not land (dislikes attention, anxiety, health concerns, past reactions, a strong wish to plan their own celebration). Recommend one of: a full surprise, a partial surprise (they know there is a dinner but not who is coming), a surprise guest or element within a known event, or no surprise. If you recommend against a full surprise, plan the option you recommend.
2. The plan in one line: format, date, place and size.
3. Cover story: a believable reason to get the guest of honour to the right place, dressed appropriately, at the right time, with a co-conspirator assigned to bring them.
4. Guest coordination: a private group chat or email (named so it cannot be seen by accident), an invitation message with the rules (keep it secret, arrival window, where to park, no posting online until after), RSVP tracking and a contact for questions.
5. Venue: options that suit the person and budget (home, a restaurant's private room, a venue they love), and what to confirm with a venue (timing, keeping the booking under another name, access before the guest arrives).
6. Countdown: a timeline from about six weeks before to the day after.
7. The reveal: minute by minute for the last 30 minutes, with guests arriving at least 30 minutes early, a lookout, the signal, how loud the reveal is (adapted to the person: a quiet "surprise" and a hug may be better than a shout), and what happens in the first ten minutes so the guest of honour can settle.
8. Budget: a breakdown that stays within {{budget}}, with estimates labelled as such.
9. What could go wrong: the secret leaks, they change plans, a guest arrives late, they are tired or unwell on the day; a fix for each.
</task>

<constraints>
- If the details mention a heart condition, anxiety, autism or a strong dislike of surprises, do not recommend a full jump-out surprise; adapt as above.
- Never suggest deception that could cause real distress (for example faking an emergency or bad news) as a cover story.
- Keep the budget breakdown within the stated budget.
- Before answering, check that the cover story and reveal fit what the person likes.
</constraints>

<output_format>
## Will they enjoy a surprise
Your recommendation in one line, then why.
## The plan in one line
## Cover story
## Guest coordination
Includes the invitation message in quotes.
## Venue
## Countdown
Table: When | Task | Owner.
## The reveal
Table: Time | What happens.
## Budget
Table: Item | Estimate, with a total.
## What could go wrong
</output_format>
