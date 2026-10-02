---
schema: 1
id: design-habit-plan
kind: prompt
title: Design a habit plan
description: Designs a habit plan around a tiny starting behaviour anchored to an existing routine, with a reward, simple tracking, a missed-day rule and a path to grow it. Use when starting a new habit.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [habit-formation, implementation-intentions, habit-stacking, behaviour-change]
pairs_with:
  personas: [productivity-coach]
  prompts: [beat-procrastination]
args:
  - name: habit
    description: The habit you want, and why it matters to you.
    type: text
    required: true
  - name: current_routine
    description: Optional outline of a typical day, the times you are busy, and anything that has derailed past attempts.
    type: text
output_contract:
  format: markdown
  sections: [The habit, Tiny start, Cue, Reward, Environment, Tracking, Missed days, Growing it, Recipe card]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design habits the way behaviour-change research suggests: make the starting behaviour so small it is almost impossible to skip, tie it to a cue that already happens every day, make it rewarding right away, shape the environment so the easy path is the right one, and plan for missed days before they happen. Motivation is unreliable; a good design works on a bad day. Habits take weeks to months to feel automatic, and the time varies a lot between people and behaviours, so the plan should expect that.

<habit>
{{habit}}
</habit>
{{#current_routine}}
<current_routine>
{{current_routine}}
</current_routine>
{{/current_routine}}
</context>

<task>
1. Define the habit as one specific, observable behaviour. If the goal is an outcome ("get fit", "be less stressed"), pick the one behaviour most likely to drive it and say why. If the habit is too vague to choose a behaviour, ask up to two questions and stop.
2. Shrink it to a tiny version that takes under two minutes and still counts as a win (one push-up, open the book and read one paragraph, put on running shoes).
3. Choose the cue: an existing daily anchor from the routine, written as an if-then plan: "After I [anchor], I will [tiny habit]." If no routine is given, offer two anchor options and say how to choose.
4. Design an immediate reward: a small, honest celebration or pairing with something enjoyable, plus the longer-term reason.
5. Design the environment: what to make visible, what to prepare the night before, and what friction to remove or add for competing habits.
6. Set up tracking that takes seconds: a mark on a calendar, a note or a habit app, and what counts as done.
7. Write the missed-day plan: the "never miss twice" rule, a minimum version for bad days, and how to restart after a longer break without starting over in your head.
8. Plan the growth: when and how to scale up (only after the tiny version feels automatic, usually by small steps), with a two-week review question.
</task>

<constraints>
- Start smaller than feels useful. Ambition goes into the growth plan, not the first week.
- One habit at a time. If the user lists several, design the one with the biggest payoff and park the rest.
- Use the person's real routine and words; do not invent details about their life. State any assumption.
- No guilt, streak pressure or all-or-nothing rules.
- If the habit involves a medical condition, medication, dependence on alcohol or other drugs, or strict eating, fasting or extreme exercise targets, keep the plan general, recommend checking it with a doctor first, and do not set targets.
</constraints>

<output_format>
## The habit
One sentence, plus the reason in the user's own words.
## Tiny start
## Cue
The if-then sentence, and a backup anchor.
## Reward
## Environment
Bullets: make it obvious, make it easy, and friction for the competing habit.
## Tracking
## Missed days
## Growing it
Table: Phase | Behaviour | Move on when.
## Recipe card
Five lines the user can copy onto a sticky note: After I... / I will... / Then I... (reward) / If I miss... / Next review on...
</output_format>
