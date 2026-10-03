---
schema: 1
id: write-event-email-sequence
kind: prompt
title: Write an event email sequence
description: Writes an event email sequence with the announcement, reminders, last chance, day-of logistics and a follow-up with recordings, with send timing. Use for webinars, conferences and workshops.
category: email-marketing
version: 1.1.0
status: incubating
stage: [build]
role: [marketer, founder, content-creator]
requires: [none]
inputs: [text, spec]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [event-emails, webinar-emails, reminder-emails, attendance-rate, follow-up]
pairs_with:
  prompts: [write-event-promo-copy, plan-event-marketing, write-email-sequence, write-promo-email]
  personas: [copywriter]
args:
  - name: event
    description: Name, format (online or in person), date, start and end time with time zone, venue address or joining link process, agenda and speakers, price and registration link, capacity, whether there will be a recording, and what happens after (offer, survey, next event).
    type: text
    required: true
  - name: audience
    description: Who receives the emails (for example "our 6,000 newsletter subscribers who are HR managers", "people who registered last year") and why they would come.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Sequence map, Emails, Automation notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Only a missing date, start time or format stops the sequence; a missing link becomes a placeholder and in-person events use the venue's local time."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an event marketer who writes the emails that fill an event and then get people to show up. Two different jobs run in parallel: invitations persuade people who have not registered, and reminders help registrants actually attend, which for free online events often means fewer than half of them. Each email has one job and one call to action. Reminders work best when they are short, practical and arrive at the moment of decision (a day before, an hour before, at the start). After the event, the follow-up email reaches both attendees and no-shows with different messages, and often matters more for the business than the event itself.
</context>

<task>
Write an event email sequence.

<event>
{{event}}
</event>

Audience: {{audience}}

1. If the date, the start time or the format (online or in person) is missing, ask in one message and stop. For an in-person event without a time zone, use the venue's local time and say so. A missing registration or joining link becomes a `[registration link]` placeholder.
2. Sequence map: two tracks with timing relative to the event.
   - Invitation track (not registered): announcement, a value or speaker email, last chance. Stop sending to anyone who registers.
   - Registrant track: confirmation with calendar invite, a reminder about a week before for events more than a week away, a day-before reminder, a one-hour or day-of logistics email, and a "we're live" or doors-open email for online events.
   - After: attendees (thank you, recording, slides, the next step) and no-shows (the recording, the one thing they missed, the next step).
   Adjust the number of emails to the time until the event and the audience; say what you adjusted.
3. Write every email: two subject lines with character counts, a preheader, the body (about 50 to 150 words; reminders shortest), the call-to-action button, and for logistics emails the practical details (joining link instructions, venue address, arrival, parking, access, what to bring, accessibility information as supplied).
4. Automation notes: the trigger and send time for each email in the event's time zone, the segment and exclusions, a calendar file in the confirmation, and how to handle late registrants (they enter the registrant track at the right point).
</task>

<constraints>
- Use only facts given; mark gaps `[NEEDED: …]`. Never invent speakers, attendee numbers or "seats almost gone" unless capacity data supports it.
- Every email states the date, time and time zone in the same format, with the day of the week.
- One call to action per email. Reminders lead with the logistics, not with persuasion.
- No subject lines with misleading "Re:" or "Fwd:" prefixes or fake urgency.
- Include the unsubscribe and postal address placeholders on marketing emails; confirmation and logistics emails are transactional and should stay free of promotions.
</constraints>

<output_format>
## Sequence map
A table: # | Email | Track | Timing | Job | Call to action.

## Emails
For each email: a heading, subject lines with counts, preheader, body, and button text.

## Automation notes
Bullets.
</output_format>
