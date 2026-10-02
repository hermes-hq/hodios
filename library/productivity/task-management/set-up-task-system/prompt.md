---
schema: 1
id: set-up-task-system
kind: prompt
title: Set up a personal task system
description: Designs a personal task system in the chosen app - one capture inbox, lists or projects, contexts, a review routine and the few rules that keep it trusted. Use when your to-dos live everywhere.
category: task-management
version: 1.0.0
status: incubating
stage: [design]
role: [individual, manager, founder, student]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [capture, trusted-system, contexts, weekly-review, inbox-processing]
pairs_with:
  prompts: [run-weekly-review, prioritize-todo-list, design-second-brain]
  personas: [productivity-coach]
args:
  - name: app
    description: Optional - the app you want to use (for example Todoist, Things, Notion, Apple Reminders, Microsoft To Do, a paper notebook). If empty, two fitting options are suggested.
    type: string
  - name: work_style
    description: How you work and where tasks come from today - job, email and chat volume, devices, meetings, home tasks, what has failed before.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Structure, Capture, Daily use, Weekly review, Rules, Migration plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A task system works only if the person trusts it, and they trust it only if everything goes in, lists are easy to scan, and a review keeps it current. Most systems fail in one of four ways: too many capture points, lists mixing projects with next actions, so much structure that upkeep becomes a chore, or no review, so the lists go stale and the head takes over again. You design the simplest system that fits how this person actually works.

<work_style>
{{work_style}}
</work_style>
{{#app}}
Chosen app: {{app}}
{{/app}}
</context>

<task>
1. Diagnose. From the work style, name where tasks currently come from, where they get lost, and which failure modes apply. If no app was named, recommend two that fit (one simple, one more powerful) with one line on why, and design for the simpler one unless the work style clearly needs more.
2. Design the structure in the chosen app, using its real features (projects, lists, tags, labels, filters, sections, due versus scheduled dates) and naming them as that app does. If you are unsure whether the app has a feature, say so and give a fallback. Include:
   - one inbox for everything;
   - next actions grouped by context only if contexts genuinely change what the person can do (place, tool, energy, person to talk to); otherwise use a simple Today and Next split;
   - projects as outcomes with one next action each;
   - waiting for, and someday or maybe;
   - a rule for when something goes on the calendar instead (only when it must happen at that time).
3. Capture: list every source of tasks (email, chat, meetings, notes, conversations) and give each one a capture method and a step that turns it into an inbox item within a day.
4. Daily use: a five-minute start-of-day routine and a two-minute end-of-day routine.
5. Weekly review: a 30-minute checklist adapted to this system.
6. Rules: at most seven short rules that keep the system trusted (for example "If it takes under two minutes, do it now"; "Due dates only for real deadlines").
7. Migration: how to move from the current scattered lists in one sitting of under two hours, step by step.
</task>

<constraints>
- Simplest structure that works. Every list, tag or field you add must earn its upkeep; say why each exists.
- Do not invent app features. When an exact menu or feature name may differ by version, say "check in your version".
- Respect the person's constraints in the work style (work phone only, company-mandated tools, shared lists with a partner).
- No product promotion: recommend apps only on fit.
</constraints>

<output_format>
## Diagnosis
Three to five bullets.
## Structure
A table: List or project | What goes in it | How to set it up in the app.
## Capture
A table: Source | How it gets captured | When it is processed.
## Daily use
Two short numbered routines.
## Weekly review
A checklist of eight items or fewer.
## Rules
Up to seven, numbered.
## Migration plan
Numbered steps with time estimates.
</output_format>
