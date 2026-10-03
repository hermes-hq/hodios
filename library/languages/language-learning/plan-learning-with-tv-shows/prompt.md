---
schema: 1
id: plan-learning-with-tv-shows
kind: prompt
title: Plan language learning with a TV series
description: Plans learning a language with a TV series, with an episode routine, a subtitle strategy matched to level, sentence mining and a weekly review.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [language-learner]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [comprehensible-input, subtitles, sentence-mining, immersion, listening]
pairs_with:
  prompts: [mine-sentences-for-flashcards, create-shadowing-script, plan-language-learning]
  personas: [language-learning-strategist]
args:
  - name: target_language
    description: The language to learn, with the variety if it matters (for example "Brazilian Portuguese").
    type: string
    required: true
  - name: level
    description: The learner's current CEFR level; decides the subtitle strategy and how much of each episode is studied closely.
    type: enum
    enum: [a1, a2, b1, b2, c1]
    required: true
  - name: show
    description: The series the learner wants to use, if they have one in mind. Leave empty to get suggestions.
    type: string
  - name: minutes_per_day
    description: Minutes per day available for the routine.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [The show, Subtitle strategy, Daily routine, Sentence mining, Weekly review, When to level up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design input-based study routines. A TV series is excellent material because the characters, setting and vocabulary repeat, so each episode is easier than the last. Most learners waste it by binge-watching with subtitles in their own language, which trains reading, not listening. What works is a mix of intensive work on a short scene (understand every line, repeat it, mine a few sentences) and extensive watching for enjoyment, with subtitles chosen for the level and removed step by step.

Language: {{target_language}}
Level (CEFR): {{level}}
Daily time: {{minutes_per_day}} minutes
{{#show}}
Show: {{show}}
{{/show}}
</context>

<task>
1. The show. If a show was named, judge its fit for {{level}}: speech speed, slang and dialect, how much the plot carries understanding, and episode length. If it is a poor fit, say so and say how to adapt the routine (for example use only the calmer scenes) rather than refusing. If no show was named, suggest three series originally made in {{target_language}}, with genre and why each suits the level; prefer dialogue-heavy, everyday-setting shows, and name only series you are confident exist.
2. Subtitle strategy for {{level}}, as a sequence the learner moves through:
   - A1 to A2: watch a scene with subtitles in their own language for the story, then rewatch with {{target_language}} subtitles, then once with none.
   - B1: {{target_language}} subtitles by default; their own language only to rescue a scene they are lost in.
   - B2 to C1: no subtitles on the first watch, {{target_language}} subtitles on a rewatch of hard scenes.
   Say what the learner should do when lost (rewind once, then move on) and the signal to drop to the next stage.
3. Daily routine within {{minutes_per_day}} minutes, as a timed table: the intensive scene (choose 2 to 5 minutes of footage; watch, check meaning, rewatch, shadow 3 to 5 lines), sentence mining, and extensive watching. Keep the intensive block at about a third of the time and give a shorter fallback for busy days.
4. Sentence mining: how to pick sentences (one new word or structure each, short, likely to be reused), how many per day (5 to 10, fewer at A1 to A2), and a flashcard template with the sentence, the new item highlighted, meaning, and an audio-clip or timestamp field.
5. Weekly review: one session to rewatch the week's intensive scenes without subtitles, review mined cards, retell an episode aloud in a few sentences, and log comprehension on a 1 to 5 scale.
6. When to level up: concrete signals (for example 80 percent of a new episode understood with {{target_language}} subtitles) and what to change.
</task>

<constraints>
- Fit everything inside {{minutes_per_day}} minutes; show the arithmetic.
- Give generic instructions for subtitle settings and clipping tools; do not assume a specific streaming service or app.
- Do not invent plot details, characters or episode titles for a named show. Refer to "the first episode" or "a dialogue-heavy scene" instead.
- If the learner is A1 and the show is fast or slang-heavy, recommend a short supporting resource (graded material, a slower show) alongside it, in one line.
</constraints>

<output_format>
## The show
Fit assessment or three suggestions.
## Subtitle strategy
Stages with the signal to move on.
## Daily routine
Table: Block | Minutes | What to do. Then the busy-day version.
## Sentence mining
Selection rules and the card template.
## Weekly review
Steps and the comprehension log.
## When to level up
Signals and changes.
</output_format>
