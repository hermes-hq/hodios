---
schema: 1
id: plan-instrument-practice
kind: prompt
title: Plan instrument practice
description: Builds an instrument practice plan for a level and goal, with warm-ups, technique, repertoire, ear training, timing work and progress checks sized to your daily time. Use to practise with purpose.
category: music
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [artist, student, individual]
subject: [music-theory]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [practice-plan, deliberate-practice, ear-training, metronome]
pairs_with:
  prompts: [suggest-chord-progressions, analyze-song-structure]
args:
  - name: instrument
    description: The instrument, e.g. "acoustic guitar", "piano", "violin", "drum kit", "voice", "alto saxophone".
    type: string
    required: true
  - name: level
    description: Your current level in your own words, e.g. "complete beginner", "can play open chords but not barre chords", "grade 5 piano", "gigging bassist who can't read".
    type: string
    required: true
  - name: goal
    description: What you want to be able to do and by when, e.g. "play 'Blackbird' fingerstyle in 3 months", "pass grade 6 in June", "jam a 12-bar blues with friends". Leave blank for balanced all-round progress.
    type: text
  - name: minutes_per_day
    description: Minutes you can realistically practise on a typical day.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [Assumptions, Daily session, Weekly rotation, Four-week progression, Progress checks, Practice habits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most players practise by playing through what they already know, which feels productive and changes little. Progress comes from deliberate practice: short, focused work on a specific weakness at a speed where it can be played correctly, with feedback (a metronome, a recording, a teacher) and gradual increases in difficulty. A good plan splits the available time across warm-up, technique, repertoire, ear and rhythm work, rotates the focus across the week so nothing is neglected, sets measurable targets (tempo, accuracy, memorised bars), and protects the body from strain.
</context>

<task>
Build a practice plan for {{instrument}} at this level: {{level}}.

Goal: {{goal}}
Time per day: {{minutes_per_day}} minutes

1. **Assumptions:** in three or four lines, what you take the level to mean in concrete skills, the goal (if none was given, choose balanced progress for this level and say so), and whether the goal is realistic in the time stated. If the goal is unrealistic, say so kindly and propose an intermediate milestone. If the level is too vague to plan (for example "okay"), ask up to three questions about what the player can already do and stop.
2. **Daily session:** a template that fits exactly {{minutes_per_day}} minutes, as a table with minutes per block. Typical split: warm-up about 10 to 15 percent; technique about 25 to 30 percent; repertoire or goal piece about 30 to 40 percent; ear training and theory about 10 percent; timing and rhythm, often folded into the other blocks, with a metronome. For each block, name the specific exercises for this instrument and level (scales, arpeggios, chord changes, rudiments, bowing exercises, sight-reading, vocal exercises) and how to do them (for example slow, hands separately, looped four bars).
3. **Weekly rotation:** seven days with a different technical or musical focus per day so all areas are covered, one lighter review or free-play day, and how to adapt when only half the time is available.
4. **Four-week progression:** what to aim for at the end of each week, using measurable targets (metronome tempo at which a passage is clean three times in a row, number of bars memorised, chord change speed per minute, a recording to compare against).
5. **Progress checks:** a weekly self-check (record one take, compare with last week, rate accuracy, tone, timing and confidence), and what to change if progress stalls for two weeks.
6. **Practice habits:** three to five habits that matter most for this instrument and goal, such as practising at a tempo you can play cleanly before speeding up, isolating the hardest bars first, interleaving several skills in short blocks, ending with something you enjoy, and resting hands, lips or voice between blocks.
</task>

<constraints>
- Name real, standard exercises and pieces suited to the level; when suggesting specific repertoire, choose widely known pieces or method books you are confident exist, and give alternatives.
- Do not prescribe more time than {{minutes_per_day}} minutes per day.
- Include a short physical-safety note: warm up, keep a relaxed posture, take breaks, and stop and seek advice from a teacher or, for pain, numbness or tingling that persists, a health professional.
- Where a teacher would help a lot (for example the voice, violin bowing or embouchure), say so once without making the plan depend on one.
</constraints>

<output_format>
## Assumptions
## Daily session
Table: Block | Minutes | Exercises | How.
## Weekly rotation
Table: Day | Focus | Notes.
## Four-week progression
## Progress checks
## Practice habits
</output_format>
