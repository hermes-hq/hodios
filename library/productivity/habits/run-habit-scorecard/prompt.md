---
schema: 1
id: run-habit-scorecard
kind: prompt
title: Run a habit scorecard
description: Lists everything you do on a typical day, marks each habit as helping, hurting or neutral for the person you want to be, and picks the one change worth making first.
category: habits
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
depth: specific
tags: [habit-awareness, behaviour-change, self-reflection, daily-audit]
pairs_with:
  prompts: [design-habit-plan, break-bad-habit, run-energy-audit]
args:
  - name: typical_day
    description: A walk-through of an ordinary day from waking to sleep, in as much small detail as you can, including the automatic things (checking the phone, snacks, how you start work).
    type: text
    required: true
  - name: aims
    description: Who you are trying to become or what you want more of, in your own words. For example "calmer, fitter, a more present parent".
    type: text
    required: true
  - name: other_days
    description: Optional - how weekends, work-from-home days or shift days differ.
    type: text
output_contract:
  format: markdown
  sections: [Your aims, Scorecard, Patterns, Already working, First change, Questions to notice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most daily behaviour runs on autopilot, so people trying to change their habits usually start by guessing which ones matter. A habit scorecard (popularised by James Clear) starts with awareness instead: write down every behaviour in an ordinary day in order, however small, then mark each one plus (helps the person you want to be), minus (works against it) or equals (neutral). The marks are about the person's own aims, not a universal standard: a coffee, a long phone call or an evening of television can be a plus for one person and a minus for another. The value is in the sequence. Behaviours chain, so a minus early in the chain (phone in bed on waking) often triggers several later ones, and changing that one link moves more than fixing the last link. Novices make three mistakes: they skip the small automatic actions, they turn the list into a guilt inventory, and they try to change every minus at once.

<typical_day>
{{typical_day}}
</typical_day>

<aims>
{{aims}}
</aims>
{{#other_days}}
<other_days>
{{other_days}}
</other_days>
{{/other_days}}
</context>

<task>
1. Restate the person's aims as two to four short statements of who they want to be. If the day description is too thin to build a scorecard (under about five behaviours), ask up to three questions that prompt the small automatic actions, and stop.
2. Break the day into individual behaviours in order, keeping the person's own wording, and include obvious small actions they mentioned in passing. Do not invent behaviours they did not describe.
3. Mark each behaviour +, - or = against the stated aims, with a short reason tied to a specific aim. Where it could go either way, mark it "?" and say what would decide it.
4. Find the chains: which behaviours reliably lead into which, and which single link sits upstream of the most minuses.
5. Name what is already working: the pluses to protect and any existing anchor that a new habit could attach to.
6. Pick one first change, usually the upstream link, and say whether it is best handled by adding a habit, removing or replacing one, or changing the environment. Give one concrete next step for this week. Point to a fuller habit-design or habit-breaking plan for later rather than writing it here.
7. Give two or three noticing questions to use for the next few days to refine the scorecard.
</task>

<constraints>
- Judge behaviours only against the person's stated aims, never against your own idea of a good life. Neutral language; no moralising, no guilt.
- One change, not a programme. Park the other minuses.
- Use only what the person described; mark assumptions.
- If the day shows signs of heavy drinking or drug use, disordered eating, or persistent low mood, exhaustion or hopelessness, do not score those as habits to tweak: say so kindly, suggest talking to a doctor, and keep the rest of the scorecard light.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## Your aims
Two to four short statements.

## Scorecard
Table: Time | Behaviour | Mark (+ - = ?) | Why, linked to an aim.

## Patterns
Bullets: the main chains, and the upstream link with the most minuses after it.

## Already working
Pluses to protect and possible anchors for a new habit.

## First change
The one change, its type (add, remove or replace, environment), and this week's next step.

## Questions to notice
Two or three questions for the next few days.
</output_format>
