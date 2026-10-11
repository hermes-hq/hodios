---
schema: 1
id: learn-morse-code
kind: prompt
title: Learn Morse code
description: Builds a daily Morse code practice plan that learns characters by sound with the Koch and Farnsworth methods, moves to head copy and sending, and leads to a first on-air contact.
category: pastimes
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual, language-learner]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [morse-code, cw, amateur-radio, koch-method, practice-plan, ham-radio]
pairs_with:
  prompts: [get-started-with-amateur-radio, plan-pota-activation]
args:
  - name: goal
    description: Why you want Morse, for example "on-air contacts as a licensed ham", "scouting badge", "just for fun", "to read signals on a receiver".
    type: string
    required: true
  - name: minutes_per_day
    description: How long you can practise each day, for example "15 minutes".
    type: string
    default: 15 minutes
  - name: current_level
    description: What you know so far, for example "nothing", "I memorised the chart but cannot copy by ear", "5 words per minute".
    type: string
    default: nothing
output_contract:
  format: markdown
  sections: [How to learn it, Settings to use, Week-by-week plan, Daily session, Sending, Plateaus and fixes, First contact]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a radio amateur who teaches Morse classes. The biggest mistake learners make is memorising a dot-and-dash chart: they end up translating each sound into a picture and back into a letter, which stalls them around 5 to 10 words per minute. Teachers instead train each character as a single sound pattern ("di-dah" is A), use a fast character speed from day one with extra spacing between characters (Farnsworth timing), and add characters one at a time only once the current set is copied at about 90 percent (the Koch method). Short daily sessions beat long weekly ones; progress then moves from writing every letter to copying whole words in the head, and sending is learned with good spacing rather than speed. You know the method well but do not invent specific apps, course names or websites; you describe what the trainer software should do.

Goal: {{goal}}
Practice time: {{minutes_per_day}} per day
Current level: {{current_level}}
</context>

<task>
1. How to learn it: explain in plain words why sound patterns beat the chart and what Koch and Farnsworth mean. If {{current_level}} shows chart learning, explain how to retrain by ear without starting over in spirit.
2. Settings to use: character speed (for example around 18 to 25 words per minute), effective speed to begin with, tone pitch to taste, session length and the 90 percent rule for adding a character. Say these are typical starting points to adjust.
3. Week-by-week plan: a realistic timeline for {{minutes_per_day}} a day toward {{goal}}, covering the order of adding letters, numbers, common punctuation and prosigns, then common words and abbreviations, then call signs and exchanges. Give rough milestones and say plainly that people vary widely.
4. Daily session: a structure that fits {{minutes_per_day}}, for example warm-up with known characters, new-character drills, random groups, words, and listening to real or simulated contacts.
5. Sending: when to start (after receiving is solid on a good part of the alphabet), straight key versus paddles, posture and a light touch, sending into a practice oscillator or software that decodes, and spacing drills, since bad spacing is the common sending fault.
6. Plateaus and fixes: missed characters, freezing on a missed letter (let it go and keep copying), confusing similar characters (for example the set of short-element letters), the plateau around 10 words per minute, and the move to head copy.
7. First contact: if {{goal}} involves transmitting, remind them that a licence is needed to transmit (rules vary by country; check whether Morse is still tested where they live), then outline a standard short first exchange at a slow agreed speed and how to ask others to slow down. If {{goal}} is listening only, suggest what to listen for instead.
</task>

<constraints>
- Do not teach from a visual chart as the main method.
- Never suggest transmitting without a licence; listening is fine.
- Do not invent app names, websites or club names; describe features to look for.
- Give timelines as ranges with an honest note that progress varies.
</constraints>

<output_format>
## How to learn it
## Settings to use
## Week-by-week plan
Table: Weeks | Focus | Milestone.
## Daily session
## Sending
## Plateaus and fixes
## First contact
</output_format>
