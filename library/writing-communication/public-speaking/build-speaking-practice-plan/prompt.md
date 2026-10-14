---
schema: 1
id: build-speaking-practice-plan
kind: prompt
title: Build a speaking practice plan
description: Builds a four-to-eight-week practice plan to fix specific delivery habits such as filler words, rushing, monotone or weak eye contact, with short daily drills, recordings and self-checks.
category: public-speaking
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, manager, job-seeker]
requires: [none]
inputs: [notes, preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [filler-words, pacing, vocal-variety, eye-contact, deliberate-practice, delivery-skills]
pairs_with:
  prompts: [critique-speech-recording, practice-impromptu-speaking, warm-up-voice-before-speaking]
  personas: [speaking-coach]
args:
  - name: habits
    description: "What you want to fix, in your words or from feedback, for example 'I say um and like constantly', 'I speed up when nervous', 'people say I sound flat', 'I stare at my slides'. Include how you know (recording, manager feedback)."
    type: text
    required: true
  - name: context
    description: Where you speak and what is coming up, for example "weekly team updates on video calls, a conference talk in 6 weeks", "university seminars".
    type: string
    required: true
  - name: time_per_day
    description: Minutes a day you can realistically practise.
    type: number
    default: 15
  - name: weeks
    description: How many weeks the plan should run.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Baseline, Focus order, Weekly plan, Daily drills, How to measure, When to get more help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Delivery habits change with short, frequent, specific practice and feedback from recordings, not with one long rehearsal before a big talk. Coaches work on one habit at a time, because trying to fix filler words, pace and eye contact at once makes speakers stiff. Some specifics: filler words drop when speakers learn to tolerate a silent pause (the pause replaces the "um"), which is trained by counting fillers in short recorded answers and repeating them with deliberate pauses; it is not fixed by trying never to say "um". Rushing is usually a breathing and chunking problem: shorter sentences, a breath at each full stop, and practising at a deliberately slow pace that feels too slow but sounds normal. Monotone comes from reading or memorising word for word; varying pitch and pace on key words, and talking from bullet points, brings variation back. Eye contact in a room means finishing each thought with one person; on video it means looking at the camera at key moments, not throughout. Self-measurement (fillers per minute, words per minute, a 1 to 5 self-rating against the same recording each week) keeps progress visible. A few fillers are normal in spontaneous speech; the goal is that they do not distract.
</context>

<task>
Build a {{weeks}}-week practice plan. Habits: {{habits}}. Context: {{context}}. Time available: {{time_per_day}} minutes a day.

1. Baseline: tell the user how to record a two-minute sample on a familiar topic and what to count or rate (fillers per minute, words per minute, a self-rating for each habit), so the same test can be repeated weekly.
2. Focus order: decide which habit to work on first and why (usually the one that most affects the listener, or the one that drives others: breathing and pace often drive fillers).
3. Weekly plan: one main focus per week or two, building towards the user's upcoming event, with a "real-world rep" each week (using the skill in an actual meeting, call or class).
4. Daily drills that fit in {{time_per_day}} minutes: name each drill, how to do it, how long, and what success looks like. Include a deliberate-pause drill for fillers, a slow-pace reading drill for rushing, an emphasis-marking drill for monotone, and a thought-per-person drill for eye contact, as relevant to the habits given.
5. How to measure: the weekly re-test and simple targets based on the user's own baseline, not a universal number.
6. When to get more help: signs that point to a speaking club, a coach, or a speech and language therapist (for example stammering, voice strain, persistent hoarseness, or anxiety that stops the user speaking at all).
</task>

<constraints>
- Keep the plan inside the stated time per day; never assume more.
- Do not promise to eliminate fillers entirely or give made-up statistics about audiences.
- Treat stammering as different from filler words: do not give drills to suppress a stammer; point to specialist support and the user's own choices.
- Drills must be doable alone with a phone for recording.
</constraints>

<output_format>
## Baseline
How to record and what to measure.
## Focus order
Ordered list with a reason for each.
## Weekly plan
Table: Week | Focus | Drills | Real-world rep.
## Daily drills
Each drill: name, steps, minutes, success looks like.
## How to measure
Weekly re-test and targets.
## When to get more help
Short list of signs and where to go.
</output_format>
