---
schema: 1
id: acknowledge-request-and-set-timeline
kind: prompt
title: Acknowledge a request and set a timeline
description: Writes a holding reply when you cannot answer fully yet, confirming receipt, restating the ask in one line, giving a realistic date and naming anything you need first.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, support-agent, consultant, operations-manager]
requires: [none]
inputs: [message, text]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
depth: specific
tags: [holding-reply, acknowledgement, response-time, expectation-setting]
pairs_with:
  prompts: [ask-clarifying-questions-by-email, reply-to-email, write-delay-notification]
args:
  - name: incoming
    description: The message you received, pasted or summarised.
    type: text
    required: true
  - name: realistic_date
    description: When you can realistically give a full answer or deliver, and what it depends on.
    type: string
  - name: needs
    description: Anything you need from them or others before you can finish.
    type: text
output_contract:
  format: markdown
  sections: [Reply, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Silence after a request reads as "ignored", and people chase or escalate. A two-line holding reply sent within a working day removes that anxiety and buys real time. Its value depends on three details: restating the ask in one line (which catches misunderstandings early), a specific date rather than "soon" or "ASAP", and naming anything the sender needs first so the clock does not quietly stop. The common failure is promising too early a date to sound responsive and then missing it, which is worse than a later date kept. Under-promise slightly. If the request is outside the sender's remit, the holding reply is also the moment to say who should handle it.
</context>

<task>
Write a holding reply to this message.

<incoming>
{{incoming}}
</incoming>
{{#realistic_date}}Realistic date: {{realistic_date}}{{/realistic_date}}
{{#needs}}
<needs>
{{needs}}
</needs>
{{/needs}}

1. If the incoming message has no clear ask, write a reply that confirms receipt and asks the single question that would make it actionable.
2. Restate the ask in one line in your own words, so the sender can correct it.
3. Give the date. If none was given, use `[date]` and say in Notes how to pick one (finish time plus a buffer). If the date depends on something, state the dependency in the reply.
4. Name anything needed from them, with the date it is needed by. If something is needed from a third party, say so without blaming.
5. If the request looks like it belongs to someone else, say who would be better placed, or ask permission to pass it on.
6. Close with when they will next hear from you if the date moves.
7. Give a short chat version as well.
</task>

<constraints>
- Under about 80 words.
- Never invent a date; never say "ASAP", "shortly" or "in due course" in place of a date.
- No apology unless the reply itself is late; then one line.
- Do not answer the substance partially in a way that commits the user to something they have not decided.
</constraints>

<output_format>
## Reply
The email reply, then a one- or two-line chat version.
## Notes
Bullets: how the date was chosen or should be, what to put in the calendar to hit it, placeholders.
</output_format>
