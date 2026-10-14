---
schema: 1
id: set-up-recurring-assistant-tasks
kind: prompt
title: Set up recurring tasks for your assistant
description: Turns things you want from an assistant regularly, such as a morning briefing or weekly review, into scheduled or saved task prompts that work unattended, with empty and failure cases.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager]
requires: [none]
inputs: [text, preferences]
output: [prompt, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
depth: specific
tags: [scheduled-tasks, daily-briefing, weekly-review, automation, routines]
pairs_with:
  prompts: [plan-assistant-connectors, turn-chat-into-prompt]
  styles: [{id: skimmable, level: 4}]
args:
  - name: routines
    description: What you want regularly and why, for example "a 7am summary of today's meetings and anything urgent", "a Friday review of what I finished".
    type: text
    required: true
  - name: tool
    description: "Optional: your assistant and what it can do - scheduled tasks, web search, connected email or calendar."
    type: text
  - name: timezone
    description: "Optional: your time zone and working days."
    type: string
output_contract:
  format: markdown
  sections: [Routine plan, Task prompts, If your tool cannot schedule, First-run check, Two-week review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Some assistants can run a prompt on a schedule; with others, people rerun a saved prompt by hand. Either way, a prompt that runs without you watching needs more than a chat prompt, because nobody is there to answer a clarifying question. It must name its sources, its time window ("since the last run" and "the last 24 hours" give different results), a fixed format and length, what to say when there is nothing new (one line, not filler), what to do when a source could not be reached (say so first, never fill the gap from memory), dated facts for anything that changes, and that it takes no actions. Too many routines cause alert fatigue; each one should earn its place.

<routines>
{{routines}}
</routines>
{{#tool}}
<tool>
{{tool}}
</tool>
{{/tool}}
{{#timezone}}
Time zone and working days: {{timezone}}
{{/timezone}}
</context>

<task>
1. For each routine, decide whether it deserves a schedule, propose a frequency and time (with time zone), and merge routines that overlap. Drop or downgrade ones that would rarely have anything useful, and say why.
2. Write each task prompt: purpose in one line, sources, time window, output format and maximum length, the empty case, the failure case, how to date facts, and "do not send, buy, delete or change anything".
3. If the tool's abilities are unknown or it cannot schedule, give the manual version: a saved prompt plus a calendar reminder.
4. Write a first-run check: run each prompt once by hand and check the output against five or six yes/no questions.
5. Write a two-week review: which routines were read and used, which to cut, and which to adjust.
</task>

<constraints>
- Do not assume the tool can schedule, browse or read email. Write prompts that state what they need, and say what to do if access is missing.
- No routine may take actions with side effects; drafts only.
- For news, prices or anything time-sensitive, the prompt must ask for dates and sources on each item.
- Keep each task prompt under about 150 words.
</constraints>

<output_format>
## Routine plan
A table: routine, frequency and time, sources, keep or merge or drop.
## Task prompts
One fenced block per routine, titled with its name.
## If your tool cannot schedule
Short steps.
## First-run check
A checklist.
## Two-week review
Three or four questions.
</output_format>
