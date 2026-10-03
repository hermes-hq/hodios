---
schema: 1
id: design-shutdown-ritual
kind: prompt
title: Design an end-of-workday shutdown ritual
description: Designs an end-of-workday shutdown ritual that closes open loops, sets tomorrow's first task and marks a clear switch to personal time, sized to the minutes you have.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, software-engineer, student]
requires: [none]
inputs: [preferences, text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shutdown-ritual, work-life-boundaries, open-loops, end-of-day, remote-work, routines]
pairs_with:
  prompts: [plan-my-day, design-daily-routine, run-weekly-review, design-habit-plan]
args:
  - name: work_type
    description: What your work is and where you do it, for example "remote software engineer with Slack and on-call weeks", "teacher marking at the kitchen table", "nurse finishing a ward shift", "freelance designer with clients in other time zones".
    type: text
    required: true
  - name: minutes
    description: How many minutes the ritual should take.
    type: number
    default: 10
  - name: tools
    description: Where your tasks, calendar and notes live (for example Todoist and Google Calendar, a paper notebook, Outlook). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why this ritual, The ritual, The closing cue, After hours, Making it stick]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design end-of-day routines that let people actually stop working. Unfinished tasks keep pulling at attention after work, a pattern psychologists link to the Zeigarnik effect, and research on goal completion suggests that writing a concrete plan for an unfinished task reduces that pull. A good shutdown ritual therefore captures every open loop, decides where each one will be picked up, chooses tomorrow's first task, and ends with a fixed cue that tells the brain the workday is over. It must fit the time available and the realities of the job, or it will be skipped by Thursday.

Work:
<work_type>
{{work_type}}
</work_type>

Minutes available: {{minutes}}
{{#tools}}

Tools:
<tools>
{{tools}}
</tools>
{{/tools}}
</context>

<task>
1. In two or three sentences, explain what this ritual will do for this kind of work, naming the specific open loops it has to close (unread messages, half-finished code, patient handover, ungraded papers, client emails in other time zones).
2. Write the ritual as five to eight steps with minutes for each, totalling no more than {{minutes}} minutes, in this order:
   - Capture: empty your head and inboxes into the task list (not doing the tasks, just recording them).
   - Check: review tomorrow's calendar and any deadlines in the next two days.
   - Decide: choose tomorrow's first task and write its first concrete action where you will see it in the morning.
   - Park: leave a one-line note on anything half-finished saying exactly where to resume.
   - Close: set status, auto-replies or notifications for off hours as the job allows, close work apps and tabs, tidy the workspace.
   - Cue: a fixed closing action (a phrase, closing the laptop lid and putting it away, a short walk, changing clothes).
   Adapt each step to the tools named and to the job.
3. Design the closing cue in detail: what it is, and why a consistent physical action helps mark the transition, especially for people working from home without a commute.
4. Plan for after hours: what to do when a work thought appears (capture in one line, do not act), how to handle on-call, urgent clients or time-zone overlap with a clear rule, and when it is acceptable to reopen work.
5. Give three tips for making it stick: anchor it to a time or event, run it for two weeks before changing it, and a short version for days that end in a rush.
</task>

<constraints>
- Fit the minutes given; if steps do not fit, merge them rather than exceeding the time.
- Respect the job's real obligations: never suggest ignoring on-call duties, safety handovers or contractual response times. Build them into the ritual instead.
- Do not prescribe specific apps the person did not mention; work with what they use.
- Keep the steps concrete enough to put on a sticky note.
</constraints>

<output_format>
## Why this ritual
Two or three sentences.

## The ritual
Numbered checklist: step, what to do, minutes. Total line at the end.

## The closing cue
Two to four sentences.

## After hours
Three or four bullets.

## Making it stick
Three bullets, including the rushed-day version.
</output_format>
