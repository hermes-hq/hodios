---
schema: 1
id: write-webinar-registration-page
kind: prompt
title: Write a webinar registration page
description: Writes a webinar or live workshop registration page with an outcome-led title, what attendees learn, speaker credibility, clear logistics and time zones, the form, and reminder messages.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, consultant]
requires: [none]
inputs: [text, notes]
output: [copy, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [webinar, registration-page, live-workshop, reminders, show-up-rate]
pairs_with:
  prompts: [write-webinar-script, write-event-email-sequence, write-event-promo-copy, write-headline-variations]
  personas: [copywriter]
args:
  - name: webinar
    description: Topic, date, start time and time zone, length, format (talk, live demo, panel, hands-on workshop), speakers with their relevant experience, whether a replay will be sent, and the cost if any.
    type: text
    required: true
  - name: audience
    description: Who should attend and their level (for example "HR generalists at small companies, new to payroll compliance").
    type: string
    required: true
  - name: outcome
    description: What attendees will be able to do or decide after the session. Optional; the prompt proposes one from the topic otherwise.
    type: string
  - name: proof
    description: Past attendee feedback, numbers from previous sessions, or speaker credentials to quote. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Hook and outcome, Registration page copy, Form and confirmation, Reminder messages]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write registration pages for webinars and live online workshops. People register for a specific, useful outcome, not for a topic: "How to close your books in five days" beats "Finance webinar: month-end best practices". The page has to answer quickly what I will learn, whether it is for my level, who is teaching and why I should trust them, when it is in my time zone, how long it takes and whether there is a replay.

Two numbers matter: registration rate and show-up rate. Many registrants never attend, so the confirmation and reminder messages are part of the job: add-to-calendar right away, a reminder the day before and shortly before start, and a "we are live" message. Promising a replay can raise registrations but lower live attendance; say honestly whether there will be one and give a reason to attend live (live Q&A, hands-on exercises) if it is true.
</context>

<task>
<webinar>
{{webinar}}
</webinar>

Audience: {{audience}}

{{#outcome}}Outcome: {{outcome}}{{/outcome}}

{{#proof}}<proof>
{{proof}}
</proof>{{/proof}}

1. If the date, time zone or topic is missing, ask for it and stop.
2. Hook and outcome: write the outcome as one sentence and three title options built on it (outcome, problem, specific number or method), and recommend one.
3. Write the page: title, subtitle with who it is for and the level, date and time with the time zone and a note to see it in local time, length and format, "you will learn" (three to five concrete takeaways), who it is for and not for, speaker blocks (name, role, the experience that matters for this topic), proof if supplied, replay and live-only details, and the call to action.
4. Write the form labels (ask only what you need, such as name, email and one qualifying question) and the confirmation screen with add-to-calendar.
5. Write the reminder sequence: confirmation email, a reminder the day before, one about an hour before, and a "we are live" message, each with subject line and short body. Add a short follow-up for registrants who did not attend, matching the replay policy.
</task>

<constraints>
- Use only speaker credentials, numbers and attendee quotes that are in the inputs; mark gaps as [CONFIRM: ...].
- Takeaways must be specific enough that an attendee could check afterwards whether they got them.
- State the time zone every time a time appears, and say whether there will be a replay only as the inputs say.
- No fake seat limits or "registration closes soon" unless true.
- If the webinar ends in a sales pitch or offer, say so honestly in the page copy (for example "plus a short demo at the end").
</constraints>

<output_format>
## Hook and outcome
The outcome sentence and a table: Title option | Angle; then the recommendation.

## Registration page copy
Each section under its own label, ready to paste.

## Form and confirmation
Form labels, button text and the confirmation screen copy.

## Reminder messages
For each message: when it sends, subject line, body.
</output_format>
