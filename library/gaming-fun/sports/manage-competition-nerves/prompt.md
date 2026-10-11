---
schema: 1
id: manage-competition-nerves
kind: prompt
title: Manage nerves before a match or race
description: Builds a routine for an amateur athlete who freezes or underperforms when it counts, covering the night before, a pre-match routine, a reset cue for mistakes and a way to practise under pressure.
category: sports
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [sport-psychology, pre-performance-routine, competition-anxiety, mental-skills, choking, reset-routine]
pairs_with:
  prompts: [prepare-for-sports-tryout, learn-new-sport-as-adult]
args:
  - name: sport
    description: The sport and the kind of competition, for example "club tennis league matches", "first 10k race", "penalty takers in U16 football".
    type: string
    required: true
  - name: what_happens
    description: What the nerves look like for you or the athlete - when they start, what you think and feel, and what goes wrong (tight muscles, rushed decisions, playing safe, freezing after a mistake).
    type: text
    required: true
  - name: athlete_age
    description: The athlete's age if not an adult, so the routine fits. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What is going on, Night before and morning, Pre-match routine, Reset after mistakes, Practising under pressure, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur athletes and their parents or coaches deal with competition nerves. Nerves are normal and some arousal helps performance; the problem is when it tips into tension, rushed play or freezing. Sport psychologists commonly teach a short pre-performance routine (the same few steps before every serve, kick or start), breathing with a longer exhale to settle the body, reframing the feeling as readiness rather than danger, focusing on a process cue instead of the result, and a reset routine after errors so one mistake does not become five. These skills are trained in practice under mild pressure, not invented on match day. Persistent or severe anxiety, panic attacks or anxiety outside sport are reasons to see a qualified professional.

Sport: {{sport}}

What happens:
{{what_happens}}
{{#athlete_age}}

Athlete's age: {{athlete_age}}
{{/athlete_age}}
</context>

<task>
1. Explain briefly what seems to be going on from the description, in plain language, without labelling it as a disorder.
2. Night before and morning: sleep, food timing, kit packed the night before, arrival time, and what to avoid (new kit, new food, scrolling results).
3. Pre-match routine: a 10 to 20 minute sequence and a 10-second routine before each key action (serve, free throw, start), with a breathing pattern, one process cue word, and how to use it.
4. Reset after mistakes: a short physical and mental routine (for example a breath, a physical cue like adjusting the strings or touching the ground, a cue word for the next action), plus what to say to oneself.
5. Practising under pressure: two or three practice games that add mild consequences or an audience so the routine becomes automatic, over the next few weeks.
6. When to get more help: signs that nerves are more than normal competition anxiety and who to talk to.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose anxiety disorders or recommend medication, supplements or doses, including beta-blockers; if asked, say it is a question for a doctor and that some sports ban them in competition.
- For children, include what parents can do and avoid (pre-match pressure, car-ride post-mortems) and keep the tone light.
- Keep routines short and specific enough to use in the moment.
- Avoid promising results; frame routines as skills that improve with practice.
- If the description mentions panic attacks, self-harm or distress outside sport, put the get-help section first and keep the rest brief.
</constraints>

<output_format>
## What is going on
## Night before and morning
## Pre-match routine
Numbered steps, then the 10-second routine.
## Reset after mistakes
## Practising under pressure
## When to get more help
</output_format>
