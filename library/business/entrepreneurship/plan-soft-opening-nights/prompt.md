---
schema: 1
id: plan-soft-opening-nights
kind: prompt
title: Plan soft opening nights
description: Plans the soft opening of a new cafe, restaurant or bar - invite lists, a reduced menu, staff run-throughs, ticket timing checks, feedback capture and a fix list before the public opening.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [founder, operations-manager]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [soft-opening, friends-and-family, ticket-times, service-rehearsal, restaurant-launch]
pairs_with:
  prompts: [plan-restaurant-opening, write-opening-closing-checklist, plan-shop-opening]
args:
  - name: venue
    description: The venue - type (cafe, restaurant, bar), covers or seats, kitchen set-up, team size and experience, opening date for the public, and anything not yet working (equipment, till, suppliers).
    type: text
    required: true
  - name: nights
    description: How many soft opening sessions you can run before the public opening.
    type: number
    default: 3
  - name: menu
    description: The full planned menu or drinks list, with any dishes you are unsure about.
    type: text
output_contract:
  format: markdown
  sections: [Goals for the soft opening, Session plan, Reduced menu, Run-throughs before guests, Guest list and invitations, On the night, Feedback capture, Fix list and go decision]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a new hospitality owner plan soft opening sessions: invited, lower-pressure services before the public opening. They exist to find what breaks - kitchen timing, the till and printers, the pass, table numbering, the bar flow, allergy handling - while the stakes are low. They fail when every friend is invited at 7pm (the kitchen gets one huge spike that teaches nothing), when the full menu is offered on night one, when free food makes guests too polite to criticise, and when nobody writes down what went wrong, so the same problems reach paying customers.

Sessions planned: {{nights}}
</context>

<task>
<venue>
{{venue}}
</venue>
{{#menu}}

<menu>
{{menu}}
</menu>
{{/menu}}

1. Goals: three to five things the sessions must prove (for example tickets out within a target time, every allergy order handled correctly, the till and card machines reliable, the bar keeping up with a full room).
2. Session plan: a ramp across the {{nights}} sessions - start small (about a third to half of covers), stagger bookings in 15-minute waves, then build to a full room with a deliberate rush in the last session. Mix guest types: family and friends first, then neighbours, nearby businesses and local people, then a near-real trading session (for example discounted, not free, so guests behave like customers).
3. Reduced menu: cut to the dishes and drinks the kitchen and bar can execute consistently, with the reasoning (shared prep, station load, unreliable equipment); add items back each session. If no menu was given, give the rules for cutting it and ask for it.
4. Run-throughs before guests: a staff-only mock service with the team ordering and eating, till and printer test with every modifier, allergen matrix check, opening and closing routines, and a walk of the guest route (door, toilets, accessibility, card payments).
5. Guest list and invitations: who to invite per session, invitation wording that sets expectations ("we are practising, please be honest"), how to handle no-shows, and a short line on dietary needs at booking.
6. On the night: a timeline from staff briefing to debrief, who watches what (an owner or manager floating, not working a station), and what to log - order time and ticket out time for each table, items sent back, waits at the bar, every till error.
7. Feedback capture: a short card or QR form of no more than five questions (scores plus "one thing to fix"), and a staff debrief of 15 minutes after close with three questions: what went wrong, why, who fixes it by when.
8. Fix list and go decision: a running list with owner and deadline, sorted into must-fix before public opening (safety, allergens, payments, ticket times above target) and can-fix after; the criteria for opening on the planned date or delaying.
</task>

<constraints>
- Food safety, allergen and licensing rules (including whether free or discounted alcohol needs anything special) are local; list them as checks with the local authority, not as rules.
- Do not invent the venue's covers, staff or equipment; use what is given and mark gaps with [X].
- Keep the plan within the number of sessions given; if fewer than two, say what is lost and how to compress.
- If the venue description is too thin to plan (no type, covers or team), ask for those three items first.
</constraints>

<output_format>
## Goals for the soft opening
Table: Goal | Target | How measured.

## Session plan
Table: Session | Guests and covers | Booking waves | Menu | Focus.

## Reduced menu
Keep, cut, add later, with one reason each.

## Run-throughs before guests
Checklist.

## Guest list and invitations
Bullets, then the invitation text (under 80 words).

## On the night
Timeline and roles, then the log template.

## Feedback capture
The guest questions and the staff debrief questions.

## Fix list and go decision
Table: Issue | Must-fix or later | Owner | By when. Then the go criteria.
</output_format>
