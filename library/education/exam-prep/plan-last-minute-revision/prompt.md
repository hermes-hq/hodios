---
schema: 1
id: plan-last-minute-revision
kind: prompt
title: Plan last-minute revision
description: Builds a triage plan for the last one to three days before an exam, with the highest-yield topics, active recall blocks, protected sleep and an explicit list of what to skip.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [cramming, triage, active-recall, sleep-protection, high-yield]
pairs_with:
  prompts: [create-cheat-sheet, quiz-me-interactively, plan-exam-day-strategy]
  personas: [study-coach]
args:
  - name: exam
    description: The exam and its format, for example "Biology Paper 2, 1h45, short answers and one 6-marker", and when it is.
    type: string
    required: true
  - name: hours_available
    description: Total study hours available before the exam, after sleep, meals and fixed commitments.
    type: number
    required: true
  - name: topics
    description: The topics the exam covers, with their weight in the exam if known.
    type: text
    required: true
  - name: confidence_by_topic
    description: Optional confidence per topic, for example on a 1 to 5 scale, or notes such as "never revised", "fine on theory, weak on calculations".
    type: text
output_contract:
  format: markdown
  sections: [Triage, Plan, Skip list, Sleep and the morning of, If you panic]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
With one to three days left, there is no time to learn everything, so the question is where each hour earns the most marks. The highest yield usually comes from topics that are heavily weighted and half-known, where a few hours of practice turn shaky marks into secure ones; from the standard questions and definitions that appear every year; and from fixing exam technique. Rereading and highlighting feel productive but yield little; testing yourself yields much more. Sleep is not optional: it consolidates what was studied, and an all-nighter costs more marks than it adds.
</context>

<task>
Build a last-minute revision plan for {{exam}} with {{hours_available}} hours of study available.

<topics>
{{topics}}
</topics>
{{#confidence_by_topic}}
<confidence>
{{confidence_by_topic}}
</confidence>
{{/confidence_by_topic}}

1. Sanity-check the hours: if {{hours_available}} hours would leave less than about 7 hours of sleep per night or no breaks, say so and plan with fewer hours.
2. Triage every topic by yield: exam weight times how many marks a few hours could realistically gain. Mid-confidence, high-weight topics come first. Low-confidence, high-weight topics get a targeted rescue of the core definitions, standard questions and most common question type, not the whole topic. High-confidence topics get one quick self-test only. Low-weight, low-confidence topics usually go on the skip list. If confidence is not given, ask for a quick 1 to 5 rating per topic, or plan with weight alone and say so.
3. Plan the hours in blocks of 25 to 50 minutes with short breaks, each block naming its topic and an active method: blank-page recall then check, past-paper questions under time, flashcards on missed items, or explaining aloud. Put the hardest high-yield blocks when the student is freshest. Interleave topics on the last day.
4. Write the skip list explicitly and say why each item is there, so the student can stop feeling guilty about it.
5. Plan the final evening and exam morning: a light review of a one-page summary, materials packed, a normal bedtime, and a 15 to 20 minute warm-up of key facts or formulas on the morning, with nothing new.
6. Add a short "if you panic" routine for the last days.
</task>

<constraints>
- No all-nighters and no plans that cut sleep below about 7 hours; if the student asks for one, explain the cost briefly and give the best plan with sleep.
- No passive blocks: every block includes retrieval or practice.
- Be honest about what cannot be covered in the time; do not pretend the whole syllabus fits.
- Do not invent topic weights; label estimates.
</constraints>

<output_format>
## Triage
A table: Topic | Weight | Confidence | Yield (high, medium, low) | Action.
## Plan
A table: Day and time | Block | Topic | Method.
## Skip list
Bullets with reasons.
## Sleep and the morning of
## If you panic
3 to 4 concrete steps.
</output_format>
