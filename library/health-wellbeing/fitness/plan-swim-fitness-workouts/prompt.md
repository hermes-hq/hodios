---
schema: 1
id: plan-swim-fitness-workouts
kind: prompt
title: Plan swimming workouts for fitness
description: Builds a pool swimming plan for general fitness - a starting test, technique drills, structured sets with rest, weekly progression and lane etiquette - for adults who swim but do not train.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [swimming, pool-workouts, freestyle, swim-drills, cardio, lap-swimming]
pairs_with:
  prompts: [assess-fitness-baseline, plan-low-impact-cardio, plan-endurance-event-training]
  personas: [fitness-coach]
args:
  - name: swimmer
    description: How far you can swim without stopping and which strokes, how breathing feels (out of breath after one length?), pool length, sessions per week and time per session, and your goal (fitness, weight, cross-training, enjoyment).
    type: text
    required: true
  - name: health
    description: Injuries or conditions (shoulder, back, knee, asthma, heart, pregnancy), equipment you have or can borrow (kickboard, pull buoy, fins), and age. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Your starting test, Technique priorities and drills, Four-week plan, "Rest, pace clock and lane etiquette", After week 4 and when to back off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a swimming coach planning pool sessions for adults who can swim but have never trained. What coaches know and new lap swimmers miss: most adults stop after a length or two because of breathing, not fitness. They hold their breath underwater and try to exhale and inhale in the short moment their face is out. Fixing the steady exhale underwater, a long body position with the head down, and a relaxed kick makes swimming far easier before any extra fitness is built. Swimming continuously until exhausted builds bad habits; structured sets with short rests (for example 4 x 50 m with 20 seconds rest) let people swim more total distance with better form. A session has four parts: an easy warm-up, technique drills, a main set and an easy cool-down. Mixing strokes and using equipment (kickboard for kick, pull buoy for arms, short fins for body position) reduces shoulder load and keeps sessions interesting. Shoulder pain is the classic overuse injury, usually from too much volume too soon or crossing the hand over the midline.

Swimmer: {{swimmer}}
{{#health}}Health and equipment: {{health}}{{/health}}
</context>

<task>
1. Safety check: if they mention heart conditions, chest pain, fainting, uncontrolled asthma, recent surgery or pregnancy complications, recommend checking with a doctor before starting. Note that open water needs different safety rules and this plan is for supervised pools.
2. Starting test: a simple first session to measure their level (for example how many lengths at a steady pace before needing to stop, and how breathing feels). If they gave this, use it.
3. Technique priorities: the two or three that will help them most (exhale underwater, breathing to the side every 2 or 3 strokes, head and hips position, kick from the hips), each with one drill and how to know it is working.
4. A four-week plan: each session with warm-up, drills, main set (distances, repeats and rest), cool-down, total distance and an effort guide on a 1 to 10 scale. Fit their pool length and session time. Progress total distance gradually and change rest before adding distance.
5. Explain how to read the pace clock or count rest, and basic lane etiquette (choose the right lane speed, circle swim, let faster swimmers pass at the wall).
6. Give a progression rule for after week 4, and warning signs to stop or back off (shoulder pain that lasts, dizziness, chest pain).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not prescribe swimming for an injury or condition as treatment; suggest a physiotherapist or doctor for that.
- Keep progression conservative: no big weekly jumps in distance.
- Give distances in the units of their pool (metres or yards), and say so.
- Do not invent the person's pace or ability; ask if missing and use a cautious default.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you start
## Your starting test
## Technique priorities and drills
## Four-week plan
Table: Week | Session | Warm-up | Drills | Main set | Cool-down | Total.
## Rest, pace clock and lane etiquette
## After week 4 and when to back off
</output_format>
