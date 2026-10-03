---
schema: 1
id: plan-baby-shower
kind: prompt
title: Plan a baby shower
description: Plans a baby shower or welcome party around the parents' wishes, with a guest list approach, countdown timeline, inclusive activities, food, budget and a gift registry approach.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [baby-shower, sip-and-see, party-planning, gift-registry, inclusive-games, new-baby]
pairs_with:
  prompts: [prepare-for-new-baby, choose-meaningful-gift, plan-surprise-party]
args:
  - name: parents_wishes
    description: What the parents-to-be want and do not want, for example "no games about the bump, mixed group of friends and family, she's vegetarian, they'd love meals after the birth rather than gifts", any cultural or religious customs, and the due date.
    type: text
    required: true
  - name: budget
    description: Total budget with currency, for example "300 GBP" or "under 200 dollars".
    type: string
    required: true
  - name: guests
    description: Roughly how many guests.
    type: number
    default: 20
  - name: style
    description: The overall feel. classic is a traditional shower with games and gifts; low-key is a relaxed gathering; co-ed includes everyone; virtual is online.
    type: enum
    enum: [classic, low-key, co-ed, virtual]
    default: low-key
output_contract:
  format: markdown
  sections: [The plan in one line, Check with the parents, Guests and invitations, Countdown, On the day, Activities, Food and drink, Gifts, Budget]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan baby showers and welcome parties that the parents actually enjoy. The parents' wishes come first: some love games and gifts, others want a quiet afternoon, and some traditions prefer to celebrate only after the birth. Good showers are short enough for a tired pregnant guest of honour, include guests who are not into games, avoid activities that make anyone uncomfortable (comments on bodies, assumptions about gender, or pain for guests who have experienced pregnancy loss or infertility), and steer gifts towards what the parents really need.

<parents_wishes>
{{parents_wishes}}
</parents_wishes>
Budget: {{budget}}
Guests: about {{guests}}
Style: {{style}}
</context>

<task>
1. The plan in one line: the format, length, where and when.
2. Check with the parents: questions the host should confirm before booking anything (date relative to the due date, guest list, surprise or not, customs, whether they want gifts, dietary needs, accessibility). If their wishes or tradition suggest celebrating after the birth, propose a welcome party or "sip and see" instead and plan that.
3. Guests and invitations: how to build the list with the parents, invitation wording that sets the tone and the gift approach, and RSVP timing.
4. Countdown: a timeline from about eight weeks before to the day after (venue, invitations, registry, food orders, decorations, thank-yous).
5. On the day: a running order of about two to three hours, with seating and rest for the guest of honour.
6. Activities: four to six options suited to the style, inclusive and optional (for example advice cards for the parents, a book-for-baby library, decorating onesies or bibs, a guess-the-baby-photo game, a group meal-train sign-up), and which to skip if the parents prefer.
7. Food and drink: a menu for the number of guests and the style, with quantities, dietary needs from the wishes, non-alcoholic drinks, and food the pregnant parent can safely eat (label common pregnancy food-safety cautions such as unpasteurised cheeses and undercooked meat or eggs, to check with their midwife or doctor).
8. Gifts: a registry approach that fits the wishes, such as a registry, a group gift, a "bring a book instead of a card" invitation, a nappy fund, secondhand-friendly lists, or a meal train and practical help after the birth.
9. Budget: a breakdown that adds up to the budget or less.
10. For a virtual shower, adapt: a shorter online format, posted favours or recipe cards, games that work on screen, and a gift-opening moment.
</task>

<constraints>
- The parents' stated wishes override any tradition or default; never plan games they ruled out.
- Avoid activities that measure or comment on the pregnant parent's body, assume the baby's gender roles, or involve alcohol-centred games, unless the parents asked.
- The budget breakdown must add up to no more than {{budget}}; no prices stated as facts, use estimates labelled as such.
- Before answering, check that every section reflects the wishes and the style.
</constraints>

<output_format>
## The plan in one line
## Check with the parents
## Guests and invitations
Includes invitation wording in quotes.
## Countdown
Table: When | Task | Done.
## On the day
Table: Time | What happens.
## Activities
## Food and drink
## Gifts
## Budget
Table: Item | Estimate | Notes, with a total.
</output_format>
