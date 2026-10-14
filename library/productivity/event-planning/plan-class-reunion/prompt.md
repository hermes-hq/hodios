---
schema: 1
id: plan-class-reunion
kind: prompt
title: Plan a class reunion
description: Plans a school or college reunion - finding classmates, date and venue, a break-even ticket price, RSVP tracking, a memorial moment and a programme for the night.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [class-reunion, school-reunion, alumni, ticket-pricing, rsvp-tracking, organising-committee]
pairs_with:
  prompts: [price-event-tickets, manage-event-rsvps, compare-event-venues, write-run-of-show]
args:
  - name: reunion
    description: The school or college and class year, which anniversary, roughly how many were in the class, how many you can already contact and how, and who is helping organise.
    type: text
    required: true
  - name: preferences
    description: The kind of event you imagine (casual drinks, dinner, family day, weekend with a school tour), city, rough date window, and what you think people would pay.
    type: text
    required: true
  - name: budget_notes
    description: Optional. Any money or sponsorship available, deposits you can afford to pay up front, and whether partners and children are invited.
    type: text
output_contract:
  format: markdown
  sections: [Organising team and timeline, Finding classmates, Date and venue, Budget and ticket price, Invitations and RSVPs, Programme for the event, After the reunion]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone organise a class reunion. Reunions differ from other parties in a few ways. The hardest part is finding people: contact lists are years out of date, so organisers work through social media groups, the school or alumni office, mutual friends and "who is still in touch with whom" chains, and they need a single sign-up point. Attendance is hard to predict: many people say "maybe" and decide late, so organisers set a ticket deadline, take payment up front, and plan the budget on a cautious headcount. Venue deposits and minimum spends create personal financial risk for the organiser if numbers fall short, so the ticket price should break even at the cautious number. A good programme leaves most of the time for talking (loud music and long speeches are the most common complaints), includes name badges with old photos or class names, a short welcome, perhaps a slideshow, and a respectful moment for classmates who have died. Some classmates will be unreachable or will not want to be found; privacy matters when sharing contact details and photos.

<reunion>
{{reunion}}
</reunion>

<preferences>
{{preferences}}
</preferences>

{{#budget_notes}}
<budget_notes>
{{budget_notes}}
</budget_notes>
{{/budget_notes}}
</context>

<task>
1. Propose a small organising team with roles (lead, finder, money, venue and programme, communications) and a timeline working back from the event: at least six to nine months for a large reunion, with milestones.
2. Plan finding classmates: a shared tracker (name then, name now, contact, found by, status), where to look, a short message to forward, and how to handle privacy and people who opt out.
3. Help choose a date and venue: a date poll with two or three options, venue criteria (capacity at likely turnout, noise level for talking, access, location near the school or where most people live, deposits and minimum spend, cancellation terms), and questions to ask venues.
4. Build a budget and ticket price: fixed costs, per-head costs, a cautious, likely and high attendance scenario, a break-even ticket price at the cautious number, payment platform fees to check, and what happens to any surplus or shortfall. Use only figures supplied; otherwise show formulas.
5. Plan invitations and RSVPs: save-the-date, invitation, two reminders and a final call, with a ticket deadline; draft the invitation message.
6. Write a programme for the night: arrival and badges, a short welcome, a memorial moment, a slideshow or photo wall, a group photo, and open time to mingle.
7. Plan after the reunion: thank-you message, sharing photos with consent, settling the accounts openly, and keeping the contact list for next time.
</task>

<constraints>
- Do not invent venue names, prices or attendance figures; use the user's numbers or formulas.
- Do not suggest scraping or sharing classmates' personal data without consent.
- Treat the memorial moment with care: confirm names and family wishes before mentioning anyone.
- Flag the organiser's personal financial risk if deposits are paid before tickets are sold.
</constraints>

<output_format>
## Organising team and timeline
Roles, then a table: Months before | Milestone.

## Finding classmates
Tracker columns, where to look, and the forwardable message.

## Date and venue
Bullets and venue questions.

## Budget and ticket price
Table: Item | Fixed or per head | Amount or formula. Then the three scenarios and the break-even price.

## Invitations and RSVPs
Schedule, then the invitation draft.

## Programme for the event
Timed run of the event.

## After the reunion
Checklist.
</output_format>
