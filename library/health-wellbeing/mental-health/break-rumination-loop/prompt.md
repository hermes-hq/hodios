---
schema: 1
id: break-rumination-loop
kind: prompt
title: Break a rumination loop
description: Helps someone stuck replaying past events or mistakes notice rumination, test whether it is helping, and switch out of it with concrete exercises and a daily plan.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, explanation, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [rumination, overthinking, cbt-skills, low-mood, replaying-conversations]
pairs_with:
  prompts: [set-up-worry-time, reframe-negative-thoughts, practice-self-compassion, talk-through-a-bad-day]
  personas: [supportive-listener]
args:
  - name: what_replays
    description: What keeps going round in your head, for example "a comment I made in a meeting last week", "why my relationship ended", "whether I should have taken that job three years ago".
    type: text
    required: true
  - name: when
    description: When it happens and for how long, for example "in bed for an hour", "on the commute", "all weekend". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is it rumination, Your rumination pattern, The two-minute test, Switches to try, Daily plan, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who is stuck replaying the past. Rumination is repetitive, passive thinking about problems, causes and feelings, usually in abstract "why" questions ("Why did I say that?", "Why does this always happen to me?") that never reach an answer. It feels like problem-solving, which is why people keep doing it, but it tends to deepen low mood, keep stress high and delay action. It differs from useful reflection, which is concrete ("What exactly happened, and what will I do next time?"), time-limited, and ends in a decision or acceptance. Rumination-focused approaches in cognitive behavioural therapy work by spotting the triggers and early signs, testing whether the thinking is helping, shifting from abstract "why" to concrete "how" and "what next", and switching attention to absorbing activity. Trying to suppress the thoughts backfires; switching works better.

What replays: {{what_replays}}
{{#when}}When: {{when}}{{/when}}
</context>

<task>
1. Is it rumination: explain the difference between rumination and reflection in three or four plain sentences, using their example to illustrate both versions, and note that the urge to "figure it out" is part of the loop.
2. Your rumination pattern: a short map from their description: typical triggers (times, places, moods, reminders), early signs it has started (for example lying still, scrolling old messages, re-reading emails), the questions that keep looping, and what it costs them (sleep, mood, time, presence with others). Use their words; ask them to fill gaps.
3. The two-minute test: a set of questions to ask when they notice it: "Have I made progress toward solving this in the last few minutes?", "Do I understand it better than before?", "Do I feel better or worse?" If the answers are no, it is rumination and it is time to switch.
4. Switches to try: five or six specific options fitted to their pattern and setting: turning "why" into one concrete "what next" step and writing it down; a time-limited writing exercise (write it out once for 15 minutes, then close the notebook); moving attention to the senses or a hands-on task; an absorbing activity that needs concentration; moving the body; contacting someone for a non-rumination conversation; a kind phrase to say to themselves. Say which suit bed-time, commute or weekend loops.
5. Daily plan: a simple plan for two weeks: noticing and naming ("there's the loop"), one scheduled 15-minute reflection slot earlier in the day for anything genuinely unresolved, the switch list on their phone, and a brief evening note of how often they caught it. Progress means catching it sooner, not never having the thoughts.
6. When to get more help: if rumination comes with low mood most days for two weeks or more, hopelessness, sleep loss that is affecting daily life, or thoughts of self-harm, recommend a doctor or therapist; rumination-focused CBT and other talking therapies help.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not try to answer the "why" question or reanalyse the past event with them; that feeds the loop. If an action is genuinely needed (an apology, a conversation), name it as one concrete step and move on.
- If what replays involves trauma, abuse or a recent loss, acknowledge it and note that grief and trauma memories need gentler, specialised support; keep the exercises light.
- Do not diagnose. Use "rumination" and their words.
- Warm, practical tone; never imply they are weak or doing it on purpose.
</constraints>

<output_format>
## Is it rumination
## Your rumination pattern
Table: Trigger | Early sign | Looping question | Cost.
## The two-minute test
## Switches to try
## Daily plan
## When to get more help
</output_format>
