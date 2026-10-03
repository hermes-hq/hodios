---
schema: 1
id: write-meeting-request-email
kind: prompt
title: Write a meeting request email
description: Writes an email asking a busy person for a meeting with the purpose, the length, proposed slots in their time zone and a pre-read. Use when booking time with stakeholders or clients.
category: email
version: 1.0.0
status: incubating
stage: [build]
role: [manager, consultant, sales-rep, product-manager]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [meeting-request, scheduling, time-zones, agenda, stakeholder-management]
pairs_with:
  prompts: [write-follow-up-email, write-introduction-email, write-professional-email]
args:
  - name: recipient_context
    description: Who they are, how you know them (or not), their time zone, and what they care about, for example "VP Operations at a client, Chicago, met once at a conference, cares about warehouse throughput".
    type: text
    required: true
  - name: purpose
    description: Why you want the meeting and what should be decided or produced by the end of it, plus any pre-read you will send.
    type: text
    required: true
  - name: proposed_times
    description: Slots you can offer, with your own time zone, for example "Tue 11 Nov or Wed 12 Nov, 15:00-17:00 CET". Leave empty to ask for their availability or offer a booking link.
    type: text
  - name: duration_minutes
    description: Meeting length in minutes. Shorter requests get accepted faster; 15, 20 or 30 suit most first meetings.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Email, Calendar invite, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Busy people accept a meeting when the request shows, in the first two lines, what the meeting is for, what they get out of it, and how little time it takes. They decline or ignore requests that say "let's catch up" or "pick your brain", that ask them to do the scheduling work, or that offer slots in the sender's time zone at 6 a.m. theirs. The best requests name a concrete outcome ("agree the go-live date"), give a short agenda, offer two or three slots already converted to the recipient's time zone, attach or promise a pre-read with the minutes it takes to read, and make it easy to delegate or decline.
</context>

<task>
Write a meeting request for a {{duration_minutes}}-minute meeting.

<recipient>
{{recipient_context}}
</recipient>

<purpose>
{{purpose}}
</purpose>
{{#proposed_times}}
Times I can offer: {{proposed_times}}
{{/proposed_times}}

1. If the purpose gives no outcome or reason for this person specifically (for example "just want to connect"), ask one question about what the meeting should achieve and stop.
2. Write a subject line that names the topic, the length and the timeframe, for example "30 min next week: agree pilot scope for Q1".
3. Open with the purpose and the outcome in one or two sentences, and why this person: their decision, expertise or stake, using only what the recipient context gives. If you have never met, add one line on who the sender is.
4. Give a two- or three-item agenda ending in the outcome.
5. Offer the times:
   - Convert each slot to the recipient's time zone and show it first, with the sender's time in brackets only when the zones differ ("Tue 11 Nov, 10:00 Chicago time (17:00 CET)"). Account for daylight-saving changes between the zones on those dates, and flag in Notes any date near a changeover.
   - Drop or flag slots that fall outside about 08:00 to 18:00 for the recipient.
   - If the recipient's time zone is unknown, keep the sender's zone, label it, and add `[confirm: recipient time zone]`.
   - If no times are given, ask for two or three slots that suit them or offer a booking link as `[booking link]`.
6. Mention the pre-read if there is one, with how long it takes to read, or say none is needed.
7. Close with an easy out: offer a shorter call, an async answer by email, or the right person on their team instead.
8. Write the calendar invite title and description (agenda plus pre-read link placeholder) to send once they accept.
</task>

<constraints>
- Under about 130 words in the email body.
- Never invent the recipient's interests, mutual contacts, deadlines or slots. Mark unknowns `[need: …]`.
- Do not flatter or apologise for asking ("I know you're incredibly busy, sorry to bother you"). One line of courtesy is enough.
- Times are always written with weekday, date and time zone, never "tomorrow" or "next Tuesday" alone.
- Keep the meeting length the user chose; if the agenda clearly cannot fit, say so under Notes rather than changing it silently.
</constraints>

<output_format>
## Email
Subject line, then the body.
## Calendar invite
Title, then a three-to-five line description.
## Notes
Time zone conversions used, placeholders to fill, and anything to check. "None" if nothing.
</output_format>
