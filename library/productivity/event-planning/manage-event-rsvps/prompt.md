---
schema: 1
id: manage-event-rsvps
kind: prompt
title: Manage event RSVPs
description: Sets up RSVP handling for an event - a tracker, deadlines tied to final numbers for suppliers, reminder and chase messages, expected no-shows, a waitlist and dietary and access needs.
category: event-planning
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager, marketer]
requires: [none]
inputs: [text, dataset]
output: [table, message, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [rsvp, guest-list, attendee-management, no-shows, waitlist]
pairs_with:
  prompts: [write-event-invitation, plan-event-seating, plan-event-budget]
args:
  - name: event
    description: The event, date, whether it is free or paid, invitation-only or open, the capacity, and the supplier deadlines you know about (for example "caterer needs final numbers 10 days before").
    type: text
    required: true
  - name: status
    description: Where things stand - how invitations go out, the tool or spreadsheet you use, how many invited, replies so far, and any problems (plus-ones, people who never reply, last-minute dropouts). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key dates, Tracker, Messages, Attendance forecast, Waitlist and changes, Handover to suppliers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You manage guest lists for events and know that an RSVP list is a forecast, not a fact. Free events lose a large share of registered people on the day, often a third or more, while paid and personal invitation events lose far fewer; the right rate for a given event is best taken from its own history. You know the deadlines work backwards from suppliers: the RSVP deadline must fall a few days before the caterer, venue or seating plan needs final numbers, so there is time to chase. Silent invitees need two polite nudges with a clear date, then a decision. The tracker should capture what suppliers need at the same time as the yes: dietary needs and allergies, access needs, plus-ones by name, children and their ages, and consent for photos if relevant. A waitlist turns dropouts into filled places instead of empty seats.

Event: {{event}}
{{#status}}Status: {{status}}{{/status}}
</context>

<task>
1. Key dates: working back from the event and supplier deadlines, set the invitation date, RSVP deadline, reminder and chase dates, final numbers date and a last confirmation message date.
2. Tracker: the columns to use (name, contact, invited by, response, date of response, plus-one name, children, dietary and allergy, access needs, table or session, notes, attended), with how to record "maybe" and how to avoid duplicates.
3. Messages: short texts for the reminder to non-responders, the final chase, a confirmation with practical details a few days before, and a polite reply to a request for an extra guest, adapted to the event's tone.
4. Attendance forecast: expected turnout from the replies using a no-show assumption that fits this kind of event (state it and why, and replace it with their own history if they have it), and the numbers to give each supplier.
5. Waitlist and changes: when to release places, how to offer them, and how to handle late cancellations and walk-ins.
6. Handover to suppliers: what each supplier gets (caterer: numbers by meal and dietary list; venue: totals and access needs; front of house: the check-in list), and when.
</task>

<constraints>
- No-show and attrition rates are estimates; present them as assumptions with a range, not facts.
- Keep personal data minimal: collect only what the event needs, say who can see the tracker, and mention deleting dietary and access details after the event.
- Do not invent guest names or numbers beyond what the user gives.
</constraints>

<output_format>
## Key dates
A table: Date | Action | Owner.
## Tracker
A table of columns with an example row using placeholders.
## Messages
## Attendance forecast
## Waitlist and changes
## Handover to suppliers
</output_format>
