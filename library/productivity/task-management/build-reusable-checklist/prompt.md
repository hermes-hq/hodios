---
schema: 1
id: build-reusable-checklist
kind: prompt
title: Build a reusable checklist
description: Builds a reusable checklist for a recurring procedure such as travel prep, month-end or event setup, ordered by timing, with pause points, commonly missed steps and a way to keep it current.
category: task-management
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, operations-manager, project-manager, traveler]
requires: [none]
inputs: [text, notes]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [checklists, standard-operating-procedure, recurring-tasks, error-prevention, routines]
pairs_with:
  prompts: [build-team-wiki-structure, write-project-plan, run-weekly-review]
args:
  - name: procedure
    description: The recurring procedure, who does it and how often, the steps you already know (rough is fine), deadlines or lead times, and what has gone wrong before.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [About this checklist, Checklist, Commonly missed, How to use it, Keeping it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design checklists the way they are designed in aviation and surgery: short, used at natural pause points, focused on the steps that are easy to forget and costly to miss, not on everything a competent person already does. Two styles exist: "read-do" (read each item, then do it; for unfamiliar or rarely done procedures) and "do-confirm" (do the work from memory, then pause and confirm nothing was missed; for practised procedures). A checklist nobody maintains goes stale, so it needs an owner and a way to learn from each run.

Procedure:
<procedure>
{{procedure}}
</procedure>
</context>

<task>
1. Identify the procedure, who runs it, how often, and the outcome that shows it was done right. If you cannot tell what the procedure is or its main steps, ask up to three questions and stop.
2. Choose read-do or do-confirm for each phase, with a reason.
3. Order the steps by time and dependency. Group them into phases with timing relative to a fixed point (for example "T-14 days", "T-1 day", "on the day", "after"), or by stage for procedures without dates.
4. Within each phase, keep five to nine items. Each item is a short, checkable action starting with a verb, with any key detail (quantity, place, owner) that prevents a mistake. Remove items so obvious nobody would forget them.
5. Mark the critical items, where a miss is expensive or hard to undo, so they stand out.
6. Add pause points: the moments where the person should stop and run through the checklist (for example before leaving the house, before sending the invoices).
7. List commonly missed steps for this kind of procedure, from what the user said went wrong and from typical failure points, and make sure each is in the checklist.
8. Explain how to use it and how to keep it current: an owner, where it lives, a "what went wrong this time" note after each run, and a review rhythm.
</task>

<constraints>
- Keep it usable in the moment: one page per phase at most; detail goes in a short note under an item, not in the item.
- Use the user's own steps and terms first; add commonly missed items only where they apply to this procedure, and mark added items so the user can check them.
- Do not invent specific deadlines, regulations or amounts; use placeholders such as [deadline] where the user must fill in their own.
- Where steps are governed by law, regulation, a professional standard, or safety procedures (tax filing, payroll, food safety, equipment, medical or aviation procedures), say the checklist supplements the official procedure and must be checked against it.
</constraints>

<output_format>
## About this checklist
Purpose, who uses it, how often, the outcome, and the style (read-do or do-confirm) for each phase.

## Checklist
For each phase: a heading with its timing, then checkbox items ("- [ ] ..."). Mark critical items with **(critical)** and items you added with *(added)*. Put "PAUSE POINT" lines where the person should stop and check.

## Commonly missed
Bullets: the step, why it is missed, and where it sits in the checklist.

## How to use it
Three to five bullets.

## Keeping it current
Owner, where it lives, the after-run note template, and the review rhythm.
</output_format>
