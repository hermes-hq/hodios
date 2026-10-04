---
schema: 1
id: write-missed-call-textbacks
kind: prompt
title: Write missed-call text-backs
description: Writes the automatic text a small business sends after a missed call, plus follow-ups that sort callers into emergency, new job or existing booking so the owner calls back in the right order.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [missed-calls, sms-templates, lead-capture, callback-order, voicemail]
pairs_with:
  prompts: [triage-service-call, write-delivery-exception-texts, write-call-centre-script]
args:
  - name: business
    description: Your business - name as customers know it, trade or service, area covered, how bookings work (online link, phone only), and how you want to sound.
    type: text
    required: true
  - name: hours
    description: When someone usually answers the phone, for example "Mon-Fri 8:00-17:00, Sat 9:00-12:00".
    type: string
    default: not given
  - name: emergency_service
    description: True if you take genuine emergency jobs (burst pipes, lock-outs, no heating) and want those callers flagged first.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Main text-back, Sorting replies, Follow-ups, Voicemail greeting, Callback order, Setup notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the automatic messages a small business sends when it misses a phone call: a tradesperson on a ladder, a stylist mid-colour, a cleaner on a job, a shopkeeper with a queue. Most missed callers do not leave a voicemail and simply ring the next business, so a fast, clear text keeps the job. It must work for people who do not know the number, look genuine rather than spammy, and collect just enough to sort the callback order without feeling like a form.

Answering hours: {{hours}}
Takes emergency jobs: {{emergency_service}}
</context>

<task>
<business>
{{business}}
</business>

1. Main text-back, sent within about a minute of the missed call: the business name first, a human-sounding line ("Sorry we missed you - we're on a job"), when they will hear back (a realistic time, inside or outside the hours above), and one easy reply instruction. Under 160 plain characters if possible; state the count.
2. Sorting replies: offer numbered or one-word replies, such as 1 new job or quote, 2 existing booking or change, 3 something else. If emergency jobs are taken, add an emergency option and a safety line: if there is danger to life (gas smell, fire, flooding near electrics), call the gas emergency service or local emergency services first. Write the auto-reply for each choice, asking for no more than two details (for example postcode and a short description, or name and booking date).
3. Follow-ups: one gentle nudge if there is no reply after 2-3 hours during working time (never more than one), and an out-of-hours version that says when the business reopens.
4. Voicemail greeting (under 25 seconds spoken) that matches the text, for landline callers who cannot receive texts.
5. Callback order for the owner: emergencies, then existing customers with a booking today or tomorrow, then new jobs by value or urgency, then everything else; with a target time for each.
6. Setup notes: test with your own phone, do not text numbers marked as business or withheld, avoid sending to the same number twice within 24 hours, keep these messages free of marketing, and check local rules on automated texts.
</task>

<constraints>
- Use only the details given. Do not invent a booking link, prices, response times or service area; use [CHECK: ...] placeholders.
- No marketing, discount codes or review requests in any of these messages.
- Plain characters only (no emoji or curly quotes), so texts stay within one segment.
- Never promise an emergency attendance time the business has not stated.
- If the hours are "not given", write the messages with a [CHECK: hours] placeholder rather than guessing.
</constraints>

<output_format>
## Main text-back
The text, then its character count.

## Sorting replies
Table: reply | auto-response | what the owner sees.

## Follow-ups
The nudge and the out-of-hours text, each with a count.

## Voicemail greeting
The script.

## Callback order
Numbered list with target times.

## Setup notes
Bullets.
</output_format>
