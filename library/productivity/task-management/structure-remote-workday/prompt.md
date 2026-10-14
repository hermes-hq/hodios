---
schema: 1
id: structure-remote-workday
kind: prompt
title: Structure a remote workday
description: Designs a home-working day with a start cue, focus blocks, real breaks, a lunch away from the desk and a hard stop, fitted to your meetings, home and energy, plus a fallback for bad days.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, software-engineer, writer, designer]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [remote-work, work-from-home, daily-structure, focus-blocks, breaks, hybrid-work]
pairs_with:
  prompts: [design-shutdown-ritual, protect-deep-work-blocks, plan-working-from-home-with-kids]
args:
  - name: work
    description: What your work is, your usual meetings and when they fall, and how many days a week you work from home.
    type: text
    required: true
  - name: problems
    description: What goes wrong now, for example "start late, graze on email all morning, eat at the desk, still working at 21:00".
    type: text
    required: true
  - name: home_setup
    description: Where you work at home, who else is around and when, and your energy pattern. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What is breaking the day, Daily template, Start and stop cues, Breaks and movement, Bad-day version, First week trial]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design home-working days for people who have lost the edges of their day. At home, the commute, the walk to lunch and leaving the building used to do the work of starting and stopping; without them, people start in bed on their phone, check messages in place of focusing, skip breaks and drift into the evening. What works is a small set of fixed cues (a fake commute, a set first task, a physical shutdown), focus blocks placed before messages are opened, breaks that leave the desk, and a stop time other people can see. Structure should fit the person's real meetings and household, not an ideal schedule.

Work: {{work}}

What goes wrong now:
<problems>
{{problems}}
</problems>
{{#home_setup}}Home setup and energy: {{home_setup}}{{/home_setup}}
</context>

<task>
1. Name the two or three specific causes behind the problems described (for example "no start cue", "messages opened first", "no stop signal") and link each to a fix.
2. Build a daily template with clock times: start cue, first focus block before messages, message windows, meeting slots as given, lunch away from the desk, one or two short movement breaks, a late-afternoon admin block and a hard stop.
3. Define the start cue and the stop cue: a short physical routine (walk, change of clothes, shutting the laptop in a drawer, closing the work profile) and what the user does in the last ten minutes.
4. Add break rules that survive busy days: what counts as a break, when meetings must end five minutes early, and one rule for days that are all meetings.
5. Write a bad-day version: the minimum structure for days that start badly or have back-to-back calls.
6. Set a one-week trial with one thing to track each day and a review question for Friday.
</task>

<constraints>
- Keep every meeting the user listed where it is; work the template around them.
- If the user works hybrid, give the office-day differences in one short note instead of a second full template.
- Do not prescribe early rising, exercise programmes or tools the user did not ask for; cues should cost nothing.
- If someone else is at home with care needs, do not plan long uninterrupted blocks they cannot have; use shorter blocks and say why.
- Use 24-hour times. If the energy pattern is missing, assume a morning peak and say so.
</constraints>

<output_format>
## What is breaking the day
Bullets: cause, then fix.

## Daily template
Table: Time | Block | Rule.

## Start and stop cues
Two short lists.

## Breaks and movement
Bullets.

## Bad-day version
Three to five bullets.

## First week trial
What to track each day and the Friday question.
</output_format>
