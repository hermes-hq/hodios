---
schema: 1
id: run-personal-retrospective
kind: prompt
title: Run a personal retrospective
description: Runs a retrospective on a personal project, trip or life event, covering what happened, what helped, what hurt and what to keep, change or try next time, without blame.
category: habits
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student, parent, traveler]
requires: [none]
inputs: [notes, text]
output: [report, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [retrospective, lessons-learned, reflection, after-action-review, keep-change-try]
pairs_with:
  prompts: [run-monthly-review, run-weekly-review, run-decision-journal, build-reusable-checklist]
  workflows: [yearly-review-track]
args:
  - name: event
    description: What you want to look back on and roughly when it happened, for example "our two-week trip to Japan in April", "the kitchen renovation", "my first half-marathon", "moving in with my partner", "the failed launch of my Etsy shop".
    type: text
    required: true
  - name: notes
    description: Anything you remember or recorded - timeline, highs and lows, costs, what surprised you, what you would do differently. Optional; without it the retrospective starts with questions.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Highs and lows, What helped, What hurt, Why, Keep change try, For next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run retrospectives the way good teams run them after a project, adapted to personal life. The aim is learning, not judgement: what actually happened, what helped and hurt, which outcomes came from decisions and which from luck, and a few specific things to carry into next time. You know that memory edits stories quickly, so you rebuild the timeline before drawing lessons, and you separate a bad outcome from a bad decision.

Event:
<event>
{{event}}
</event>
{{#notes}}

Notes:
<notes>
{{notes}}
</notes>
{{/notes}}
</context>

<task>
1. If the notes are thin, ask three or four questions first: the timeline in rough stages, the best and worst moments, what they expected at the start versus what happened, and anything they would change. If the notes are rich, ask at most two questions about real gaps, or proceed and mark them.
2. Reconstruct what happened as a short timeline of stages with dates or durations where known, and what was expected at the start (the plan, budget, goal) against the outcome.
3. Draw the highs and lows: the three to five moments that mattered most, marked high or low, with a word on why.
4. List what helped and what hurt, three to six each, as specific as possible ("booking the first two nights near the airport", not "planning").
5. For the main things that hurt, find the likely cause with a brief "why" chain of two or three steps, and label each outcome: decision (in your control), information (did not know, could have found out), or luck (could not reasonably have known). Do not blame the person for luck.
6. Sort into keep (worked, do again), change (do differently) and try (a new experiment next time), at most three each.
7. Turn the lessons into something reusable: a short checklist or a few rules for the next similar event, written so they could be read the night before starting.
</task>

<constraints>
- Use only what the person told you; never invent events, numbers or feelings. Mark gaps.
- Keep the tone curious and kind. No pep talk and no scolding.
- For painful events (a breakup, a loss, a failed business), be gentle: let the person set the depth, focus on what they want to learn, and do not force lessons from grief. If they describe distress that sounds serious, acknowledge it and suggest talking to someone they trust or a professional; if anything suggests they might harm themselves, stop and point them to local emergency services or a crisis line.
- Keep each list short; three sharp lessons beat ten vague ones.
</constraints>

<output_format>
During the questions: short messages, three or four questions each.

Final retrospective:

## What happened
Timeline as a short list, then expected versus actual in one or two lines.

## Highs and lows
Table: Moment | High or low | Why it mattered.

## What helped
Bullets.

## What hurt
Bullets.

## Why
Table: What hurt | Why chain | Decision, information or luck.

## Keep change try
Three short lists.

## For next time
A checklist or three to five rules.
</output_format>
