---
schema: 1
id: write-unplanned-absence-email
kind: prompt
title: Write an unplanned absence email
description: Writes a same-day sick or emergency absence note to your manager and team with minimal private detail, what is covered, what slips and when you will next update them.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, software-engineer, project-manager, teacher]
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
tags: [sick-day, absence, family-emergency, calling-in-sick, workplace]
pairs_with:
  prompts: [request-time-off-by-email, write-out-of-office-message, write-delay-notification]
args:
  - name: situation
    description: What happened in as much or as little detail as you like, for example "migraine", "child sent home from school", "burst pipe". Only you see this; the email shares as little as needed.
    type: string
    required: true
  - name: todays_work
    description: Meetings, deadlines and tasks you had today or tomorrow, and anyone who could pick something up.
    type: text
  - name: expected_return
    description: When you expect to be back, or "not sure yet".
    type: string
    default: not sure yet
  - name: availability
    description: Whether you can answer anything at all today. Off means fully offline; limited means a quick reply on one urgent item.
    type: enum
    enum: [off, limited]
    default: off
output_contract:
  format: markdown
  sections: [Message to manager, Note to team, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An unplanned absence message is written by someone who feels unwell or is dealing with an emergency, and read by people who need to rearrange their day. It works when it is short, sent early, says what is affected and when the next update comes. People overshare out of guilt (symptoms, diagnoses, family details), apologise at length, or promise to "keep an eye on email", which means they never really rest and colleagues keep waiting on them. In most workplaces a manager is entitled to know that someone is absent and roughly for how long, not why in medical detail. Many employers also have a formal sickness reporting rule (call before a set time, log it in a system, a doctor's note after a number of days), which the email does not replace.
</context>

<task>
Write an absence message for today.

Situation (private, for tone only): {{situation}}
Expected return: {{expected_return}}
Availability today: {{availability}}
{{#todays_work}}
<todays_work>
{{todays_work}}
</todays_work>
{{/todays_work}}

1. Decide how much of the situation to share. Default to a neutral phrase ("I'm unwell", "a family emergency", "an urgent problem at home"). Share more only if the user asks to.
2. Message to manager:
   - Subject or first line: "Off today ([date]): [neutral reason]".
   - What is affected today and tomorrow, item by item, with a suggestion for each: move it, ask a named colleague (only names given), or let it slip with the new date.
   - Availability: if off, say so plainly; if limited, name the one thing they can reach the user about.
   - When the next update will come ("I'll update you by 9am tomorrow").
3. Note to team: two or three lines for the team channel or a reply-all: absent today, which meetings are cancelled or covered, who to ask instead.
4. Under Notes, remind the user to follow any formal reporting step (phone call, HR system, doctor's note rules) without stating what those rules are for their employer. For an emergency or a dependant's illness, add that a specific leave type (emergency, carer's or compassionate leave) may apply and is worth checking with HR. List meetings to decline in the calendar.
</task>

<constraints>
- Manager message under about 90 words; team note under about 40.
- No medical or family detail beyond the neutral phrase unless the user asks. Never add symptoms.
- One short apology at most ("Sorry for the short notice"), or none.
- Never invent colleagues, deadlines or meetings. Use `[need: …]` where cover is unclear.
- Do not promise availability the user did not offer.
</constraints>

<output_format>
## Message to manager
Subject or first line, then the message.
## Note to team
Short message.
## Notes
Bullets: formal reporting step to check, calendar items to decline or reassign, placeholders. "None" if nothing.
</output_format>
