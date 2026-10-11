---
schema: 1
id: follow-up-after-no-show
kind: prompt
title: Follow up after a no-show
description: Writes a no-blame message after someone missed a scheduled call or meeting, offering two new slots or an async option, with a firmer version for a second miss.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, sales-rep, consultant, recruiter]
requires: [none]
inputs: [text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [no-show, missed-meeting, rebooking, scheduling, follow-up]
pairs_with:
  prompts: [write-follow-up-email, reschedule-meeting-by-email, write-meeting-request-email]
args:
  - name: missed_meeting
    description: What was missed, when, who it was with, and what it was for, for example "30-min onboarding call with a new client, today 14:00, they never joined".
    type: string
    required: true
  - name: new_slots
    description: Two or three times you can offer, with the time zone.
    type: text
  - name: occurrence
    description: First means this is the first missed meeting; repeat means they have missed or cancelled late before.
    type: enum
    enum: [first, repeat]
    default: first
  - name: async_option
    description: Something that could replace the meeting, for example "I can send a 5-minute video walkthrough" or "answer three questions by email".
    type: string
output_contract:
  format: markdown
  sections: [Message, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most no-shows are not rudeness: a double booking, a wrong time zone, a broken link, an invite that never reached the calendar or a day that fell apart. A message that assumes good faith and makes rebooking effortless gets most meetings back on track; a passive-aggressive one ("I waited 20 minutes") gets silence or a defensive reply. The best follow-up is sent the same day, checks the likely mechanical causes in a single line (the time zone, the link), offers specific new slots or an async alternative, and keeps the door open without chasing. A second miss is different: the sender is allowed to be clearer about their time, ask whether the meeting is still useful, and stop holding slots. Where a fee or policy applies to missed appointments, that belongs in a separate, factual line only if the user says it applies.
</context>

<task>
Write a follow-up to a missed meeting ({{occurrence}} miss).

Missed meeting: {{missed_meeting}}
{{#new_slots}}
<new_slots>
{{new_slots}}
</new_slots>
{{/new_slots}}
{{#async_option}}Async alternative: {{async_option}}{{/async_option}}

1. If it is unclear what meeting was missed or with whom, ask and stop.
2. For a first miss:
   - Open with "We didn't manage to connect at [time] today" or similar, without blame.
   - One line that rules out a mechanical cause: the time and zone it was booked for, and the link or location, in case that was the problem.
   - Offer the slots as a short list, or `[slot 1]`, `[slot 2]`, plus the async option if given.
   - Close with a one-reply path and no pressure.
3. For a repeat miss:
   - Name it plainly and neutrally ("This is the second time we haven't been able to meet").
   - Ask whether the meeting is still useful or whether a different format would suit them better.
   - Offer one slot or the async option, and say you will not hold further times until they confirm.
   - Keep it courteous; no lecture.
4. Give a subject line suited to email and a shorter variant for chat or text.
5. Under Notes, suggest checking the invite (time zone, link, whether it was accepted) before sending, and when to let it go if there is no reply.
</task>

<constraints>
- Under about 80 words for a first miss, about 100 for a repeat.
- No guilt lines ("I waited", "I cleared my afternoon"), no sarcasm.
- Do not mention fees or penalties unless the user says a policy applies, and then only in one factual line.
- Never invent the reason they missed it or offer excuses on their behalf beyond the one mechanical check.
</constraints>

<output_format>
## Message
Subject line, the email, then a short chat or text version.
## Notes
Bullets: checks before sending, follow-up timing, placeholders.
</output_format>
