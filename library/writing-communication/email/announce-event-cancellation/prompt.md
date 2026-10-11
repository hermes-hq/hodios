---
schema: 1
id: announce-event-cancellation
kind: prompt
title: Announce an event cancellation or postponement
description: Writes the email telling attendees an event is cancelled or postponed, with the reason, refund or new date, exactly what they need to do and a sincere apology.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager, marketer, project-manager]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [event-cancellation, postponement, refunds, attendee-communication, bad-news]
pairs_with:
  prompts: [postpone-or-cancel-event, write-event-invitation, write-bad-news-email]
args:
  - name: event
    description: Event name, original date, time and place, and who the attendees are (ticket buyers, invited guests, members, speakers).
    type: text
    required: true
  - name: decision
    description: Cancelled or postponed, the reason you can share, the new date if known, and what happens to tickets, registrations, travel or deposits (refund amount and method, transfer, credit, timeline).
    type: text
    required: true
  - name: organiser
    description: Who is sending it and how attendees can reach you with questions.
    type: string
output_contract:
  format: markdown
  sections: [Email, Short message version, Questions to answer before sending, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
This is the message for after the decision is made. Organisers who have been through it know that attendees want three things in the first two lines: is it off, what happens to my money or place, and do I need to do anything. Burying the news under a long preamble, being vague about refunds ("we will be in touch"), or making people email to ask are what turn disappointment into complaints and chargebacks. A good notice states the decision in the subject line, gives one honest sentence of reason, sets out refund or transfer terms with a timeline and whether action is needed, mentions travel and hotels people may have booked, and apologises once, plainly. For postponements, the default should protect people who cannot make the new date.
</context>

<task>
Write the announcement for this event.{{#organiser}} Sender and contact: {{organiser}}.{{/organiser}}

<event>
{{event}}
</event>

<decision>
{{decision}}
</decision>

1. If it is unclear whether the event is cancelled or postponed, or what happens to tickets or payments, list those as questions under "Questions to answer before sending" and write the email with [placeholders] for them.
2. Subject line states the news: "[Event] on [date] is cancelled" or "[Event] is moving to [new date]".
3. Opening two sentences: the decision, and the headline of what happens to their ticket or place.
4. The reason in one or two honest sentences, without blaming named people or suppliers.
5. What happens next, as a short list: refund amount and method or transfer, when it will arrive, whether they must do anything, and the deadline if so. For a postponement: the new date, that their ticket is valid automatically, and the option and deadline to get a refund instead if the input allows it.
6. One line on travel or accommodation they booked themselves: the organiser cannot refund these unless the input says otherwise; suggest checking their booking terms.
7. Contact for questions, and one plain apology and thank-you. Do not apologise more than twice.
8. A short version under 50 words for SMS, social or a website banner.
</task>

<constraints>
- Email body under about 200 words.
- Never invent refund amounts, dates, timelines, reasons or compensation. Do not promise refunds the input has not confirmed; use placeholders and raise it as a question.
- Do not imply attendees must act to get a refund if refunds are automatic, or that they will be refunded automatically if they must claim.
- Plain, warm, factual; no "unfortunately due to unforeseen circumstances" without the actual reason if one was given.
- If the input suggests withholding refunds people are likely entitled to, write the email accurately and flag the risk under Notes, suggesting they check local consumer rules.
</constraints>

<output_format>
## Email
Subject, then body.
## Short message version
Under 50 words.
## Questions to answer before sending
Bullets. "None" if complete.
## Notes
Anything flagged. "None" if nothing.
</output_format>
