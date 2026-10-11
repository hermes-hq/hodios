---
schema: 1
id: fix-ignored-reminders
kind: prompt
title: Fix reminders you keep ignoring
description: Audits the reminders, alarms and notifications someone swipes away, cuts the noise, and redesigns the ones that matter to fire at the moment and place they can act, with a backup for critical ones.
category: task-management
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [individual, parent, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [reminders, notifications, alarm-fatigue, prompts-and-cues, phone-setup]
pairs_with:
  prompts: [set-up-task-system, plan-tasks-with-adhd, set-up-life-admin-calendar]
args:
  - name: reminders
    description: The reminders, alarms and notifications you currently get (what, when, which app or device), which ones you ignore or snooze, and what you have missed because of it.
    type: text
    required: true
  - name: devices
    description: The devices and apps you use (phone, watch, smart speaker, computer, paper calendar), and where you usually are at different times of day. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why they are ignored, Cut, Redesign, Critical backups, Keeping it quiet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people fix reminders the way someone who designs habit cues for a living would. Reminders get ignored for predictable reasons: too many of them so all feel optional, firing at a time when the person cannot act ("call the bank" at 7am), being vague ("taxes"), snoozing that becomes a habit, and arriving on a device that is not to hand. The most reliable reminders are few, fire when and where the action is possible (location-based, attached to an existing routine, or as a calendar block), say the first physical action, and for the few critical ones, have a second channel such as a person, a visible object or a paper note. Cutting noise from other notifications makes the remaining reminders noticeable again.

<reminders>
{{reminders}}
</reminders>
{{#devices}}
<devices>
{{devices}}
</devices>
{{/devices}}
</context>

<task>
1. Why they are ignored: a short diagnosis per group of reminders using the failure modes above.
2. Cut: reminders and notifications to delete, merge into one daily list, or move to a weekly review, and app notifications to silence.
3. Redesign: for each reminder that stays, a new version with the timing or trigger (time, place, after an existing routine), the device, and wording that starts with the first action.
4. Critical backups: for things with real consequences if missed (medicines as prescribed, bills, school forms, a pet's care), a second cue such as a visible object, a shared calendar, a person, or a weekly check.
5. Keeping it quiet: one rule to stop the noise creeping back (for example, every new reminder must say an action and have a time when it can be done), and a monthly two-minute review.
</task>

<constraints>
- Do not invent app features; describe the type of reminder (time, location, recurring, shared) and say "check if your app supports it".
- Do not change medicine timing or doses; only help them remember what was prescribed.
- Keep the redesigned set small; fewer reminders is the goal.
- If missed reminders have caused serious harm or they describe memory problems that are new or getting worse, kindly suggest raising it with a doctor.
</constraints>

<output_format>
## Why they are ignored
## Cut
List grouped by delete, merge, move to review, silence.
## Redesign
Table: Reminder | Trigger | Device | New wording
## Critical backups
## Keeping it quiet
</output_format>
