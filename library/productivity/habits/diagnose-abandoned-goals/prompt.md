---
schema: 1
id: diagnose-abandoned-goals
kind: prompt
title: Diagnose why your goals keep stalling
description: Looks across several goals you started and dropped to find the recurring pattern - wrong goal, wrong size, no system, a clash with other priorities - and redesigns your next goal around it.
category: habits
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, student, founder, writer]
requires: [none]
inputs: [notes, text]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [goal-abandonment, pattern-finding, self-reflection, follow-through]
pairs_with:
  prompts: [set-woop-goals, run-personal-retrospective, set-smart-goals]
  personas: [life-coach]
args:
  - name: past_goals
    description: Three or more goals you started and dropped - what each was, how long it lasted, what was happening when it stopped, and how you felt.
    type: text
    required: true
  - name: next_goal
    description: Optional - a goal you are thinking about starting next.
    type: text
output_contract:
  format: markdown
  sections: [Goal by goal, The pattern, What it says about you, Redesigned next goal, Early warning signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
One dropped goal tells you little; several reveal a pattern. The usual patterns are: the goal was someone else's or a "should" rather than a want; it was sized for an ideal week rather than a real one; it relied on motivation with no routine, cue or tracking; it clashed with another priority that always won; it had no early wins or feedback; the first slip triggered all-or-nothing quitting; or life changed and the goal was never adjusted. Dropping a goal is not always failure; sometimes it was the right call, and recognising that is part of the diagnosis. The aim is to change how goals are set, not to judge the person.

<past_goals>
{{past_goals}}
</past_goals>
{{#next_goal}}
Next goal under consideration:
<next_goal>
{{next_goal}}
</next_goal>
{{/next_goal}}
</context>

<task>
1. For each past goal, note in one line: whose goal it was, its size against the time available, the system behind it (cue, routine, tracking), what competed with it, how long it lasted and what happened at the point of stopping. Mark where details are missing. If fewer than two goals are given, ask for more and stop.
2. Identify the recurring pattern or patterns across goals, quoting the person's own words as evidence. Distinguish goals that were rightly dropped from ones they still want.
3. Reflect what the pattern suggests about how the person works best (for example, needs social commitment, does better with short sprints, needs goals linked to something they care about), stated as a hypothesis for them to confirm, not a judgement.
4. Redesign the next goal with specific fixes for each pattern found. If no next goal was given, write the fixes as rules for any next goal and ask what it will be.
5. List early warning signs of the pattern returning and what to do when one appears.
</task>

<constraints>
- No labels like lazy, undisciplined or a quitter; describe patterns, not character.
- Do not diagnose medical or psychological conditions. If the person describes persistent low mood, exhaustion or concentration problems across all goals, suggest talking to a doctor, as these can have causes worth checking.
- Use only what the person wrote; label inferences.
- If anything suggests a crisis, set the exercise aside, respond with care and point to local emergency services or a crisis line.
</constraints>

<output_format>
## Goal by goal
Table: Goal | Whose | Size vs time | System | Competing priority | Stopped when.

## The pattern
Two to four patterns with evidence in the person's words.

## What it says about you
Two or three hypotheses to confirm.

## Redesigned next goal
The goal and a table: Pattern | Fix in this goal.

## Early warning signs
Table: Sign | What to do.
</output_format>
