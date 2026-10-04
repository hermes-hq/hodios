---
schema: 1
id: set-up-offline-feedback-channels
kind: prompt
title: Set up offline feedback channels
description: Plans feedback channels for a service with few online users, such as comment cards, QR codes, phone lines, staff-logged comments and follow-up calls, with reach, accessibility, logging and review.
category: user-feedback
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, operations-manager, product-manager]
subject: [public-sector, nonprofit, retail]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [comment-cards, qr-codes, frontline-staff, easy-read, digital-exclusion, feedback-channels]
pairs_with:
  prompts: [check-feedback-sampling-bias, analyze-user-feedback, set-up-failure-demand-tracking]
args:
  - name: service_and_users
    description: What the service is, where it happens (counter, ward, bus, library, shop floor) and who uses it, including groups that rarely give feedback (older people, people with limited English, children, people without smartphones).
    type: text
    required: true
  - name: staff_capacity
    description: Optional. Who could collect and log feedback and how much time they realistically have (for example "two receptionists, 10 minutes a day between them").
    type: text
  - name: languages
    description: Optional. Languages your users speak and any accessible formats you already provide.
    type: text
output_contract:
  format: markdown
  sections: [Who you need to hear from, Channel mix, Channel set-up, Staff logging, Accessibility and languages, Weekly review, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a service that meets most of its users in person set up feedback channels that reach everyone, not only the people who scan QR codes. Each channel reaches a different crowd: QR codes and web forms reach confident smartphone users; comment cards reach people with time and literacy; phone lines reach older users; staff hear the most but write down the least. A good mix covers the people the service most often fails.

Typical failures: a single QR poster that only the youngest users answer; a comment box emptied twice a year; staff asked to "capture feedback" with no form and no time, so nothing gets logged; and feedback collected but never answered, so people stop giving it.
</context>

<task>
<service>
{{service_and_users}}
</service>

{{#staff_capacity}}Staff capacity: {{staff_capacity}}{{/staff_capacity}}
{{#languages}}Languages and formats: {{languages}}{{/languages}}

1. List the user groups to hear from, and mark those least likely to answer a digital survey.
2. Choose three or four channels, not all of them. For each, say who it reaches, who it misses, cost and effort. Options: comment cards (three questions at most: a smiley or 1-5 rating, what went well, what to change), QR code to a two-minute form, a freephone or voicemail line, a kiosk or tablet with a single question, staff-logged comments, short follow-up calls to five to ten users a week, a suggestion board, a regular drop-in session.
3. Set up each channel: where it sits, wording, how often it is emptied or checked, and who does it. Cards go in a locked box with pens at hand; QR posters at eye height where people wait, not at the exit.
4. Design staff logging so it takes under 30 seconds: a tally sheet or a one-screen form with the date, location, five or six topic ticks, positive or negative, and an optional quote in the user's words. Staff log what they hear, including praise, without names.
5. Accessibility and languages: large print and easy read cards, translated versions for the main languages, a way to give feedback by speaking (phone, staff, voicemail), and help for people who cannot write.
6. Weekly review in 20 minutes: type up or count entries, compare channels, pick one thing to fix and one thing to tell users, and post a "You said, we did" notice where people will see it.
</task>

<constraints>
- Do not recommend more channels than the stated staff time can support; if no staff capacity is given, assume very little and keep it to three channels, marked as an assumption.
- Keep personal data minimal and stored safely; include a one-line privacy notice on cards and forms, and say to check local data protection rules.
- Complaints that need a formal response (safety, safeguarding, discrimination) must be routed to the existing complaints process, not left in the feedback pile; say who checks for them.
- Do not invent response rates or costs; give effort in staff minutes a week only as an estimate labelled as such.
- If the service or its users are not described, ask for them and stop.
</constraints>

<output_format>
## Who you need to hear from
Bullets: group, why they matter, how easy they are to reach.

## Channel mix
Table: channel | reaches | misses | effort per week (estimate) | recommended (yes/no).

## Channel set-up
Per chosen channel: placement, wording, collection routine, owner.

## Staff logging
The logging form or tally sheet laid out in text, plus three rules for staff.

## Accessibility and languages
Checklist.

## Weekly review
Agenda and the "You said, we did" format.

## Questions
What to confirm.
</output_format>
