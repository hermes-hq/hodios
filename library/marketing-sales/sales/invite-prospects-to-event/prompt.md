---
schema: 1
id: invite-prospects-to-event
kind: prompt
title: Invite prospects to an event
description: Writes a seller's invitation run for a hosted dinner, webinar or booth meeting - target list rules, personal invites, reminders and a pre-booked meeting ask - so the right buyers actually turn up.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [sales-rep, founder, marketer, consultant]
requires: [none]
inputs: [notes, text]
output: [plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [event-invitations, field-events, executive-dinner, webinar-invites, trade-show-meetings, attendance]
pairs_with:
  prompts: [follow-up-event-leads, plan-event-marketing, write-event-email-sequence]
args:
  - name: event
    description: What the event is (hosted dinner, roundtable, webinar, booth at a trade show), date, place or link, length, who is speaking or hosting, capacity, and anything that makes it worth a busy buyer's time.
    type: text
    required: true
  - name: audience
    description: Who you want in the room - roles, company types, open deals or target accounts, existing customers to mix in - and how many invites you can personally send.
    type: text
    required: true
  - name: goal
    description: What a good outcome is for you (meetings booked, stalled deals restarted, new accounts met) and any hard limits such as budget per head or compliance rules on hospitality. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Invite list rules, Timeline, Invitation messages, Reminders, Meeting ask, Attendance risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a seller fill an event with the right buyers. Field-event experts know a few things novices miss: a personal note from someone the buyer knows beats a marketing blast several times over; the reason to come must be about the guest (peers they want to meet, a problem they have) rather than your product; small hosted events often lose a sizeable share of confirmed guests on the day, so you over-invite and confirm twice; senior buyers decide from the guest list and the host, not the menu; and the real return comes from meetings agreed before the event, not from badge scans after it. Many buyers in public sector, healthcare and regulated industries cannot accept hospitality above a set value, so the invite must make the event easy to accept within their rules.
</context>

<task>
<event>
{{event}}
</event>

<audience>
{{audience}}
</audience>

{{#goal}}<goal>
{{goal}}
</goal>{{/goal}}

1. **Invite list rules:** who to invite and in what mix (open deals, target accounts, customers who will speak well of you), how many invites per seat given likely drop-off, who sends each invite (rep, executive, partner), and who not to invite (direct competitors, people who would sour the room).
2. **Timeline:** when to send the first invite, the follow-up for non-replies, the confirmation, the day-before reminder and the morning-of message, counted back from the event date. Use 3 to 4 weeks for dinners and in-person events and 2 weeks for webinars unless the user says otherwise.
3. **Invitation messages:** a personal invite for a known contact, a version for a cold target account, and a short one an executive or partner can send. Each under 120 words, leading with why this person would want to come, with the practical details and a single clear reply action.
4. **Reminders:** the non-reply nudge, the confirmation that asks for dietary or access needs, and the day-before and morning-of reminders, each one to three lines.
5. **Meeting ask:** a message for confirmed guests in open deals or target accounts proposing a short meeting at or right after the event, with a specific reason tied to their situation.
6. **Attendance risks:** what usually causes no-shows for this event type and the counter for each, and the plan for the empty seats or the day-after follow-up for no-shows.
</task>

<constraints>
- Use only the event details given. Do not invent speakers, guests, venues, sponsors or attendee names; use placeholders like [speaker name] where something is missing.
- No fake scarcity ("only 2 seats left") unless the user confirms it is true.
- Note that hospitality and gift rules differ by sector and country, and add a line in the invite making it easy for guests with such rules to attend (for example, offering to cover only what their policy allows).
- Keep each message free of product pitching beyond one line on who is hosting.
- If the event has no clear reason for a buyer to attend, say so first and suggest what would make it worth their time before writing invites.
</constraints>

<output_format>
## Invite list rules
Bullets, with the invite-to-seat ratio and who sends what.

## Timeline
Table: When | Action | Who.

## Invitation messages
Three labelled messages, each with a subject line.

## Reminders
Labelled short messages.

## Meeting ask
One message with placeholders for the guest's specifics.

## Attendance risks
Table: Risk | Counter.
</output_format>
