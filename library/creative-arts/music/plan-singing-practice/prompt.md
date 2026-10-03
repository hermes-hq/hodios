---
schema: 1
id: plan-singing-practice
kind: prompt
title: Plan a weekly singing practice
description: Plans a weekly singing practice with warm-ups, breath and range work, song study and recording reviews, plus vocal health habits and the signs that mean seeing a voice professional.
category: music
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [artist, individual]
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
tags: [vocal-practice, warm-ups, vocal-health, choir-audition]
pairs_with:
  prompts: [prepare-music-audition, plan-instrument-practice, analyze-song-structure]
args:
  - name: goal
    description: "What you are working toward and by when, e.g. 'choir audition in six weeks', 'sing at a friend's wedding', 'stop straining on high notes'."
    type: string
    required: true
  - name: minutes_per_day
    description: Minutes you can practise on a typical day. Short daily sessions beat long weekly ones for the voice.
    type: number
    default: 20
  - name: voice_type
    description: "Your voice type if you know it (soprano, alto, tenor, baritone, bass) or your comfortable range; 'unknown' is fine."
    type: string
    default: unknown
output_contract:
  format: markdown
  sections: [Goal and checkpoints, Daily session, Weekly plan, Recording review, Vocal health, When to see a professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The voice is an instrument made of tissue, so practice has to build skill without tiring it. Effective singing practice is short and frequent, starts with gentle warm-ups (semi-occluded exercises such as lip trills, humming and straw phonation are easy on the folds), separates technique from repertoire, learns songs in layers (rhythm and words, then melody, then expression), and uses recordings because singers hear themselves inaccurately from inside their own head. It also includes rest and simple habits, and it knows the limits: persistent hoarseness, pain or sudden changes in the voice are medical questions, not practice problems.
</context>

<task>
Plan singing practice toward "{{goal}}" with {{minutes_per_day}} minutes a day. Voice type: {{voice_type}}.

1. If the goal has no timeframe or no material (which songs, which audition), make a sensible assumption, state it, and invite the user to correct it.
2. **Goal and checkpoints.** Restate the goal, the date or number of weeks, and two or three measurable checkpoints (sing the song through from memory, hold a phrase on one breath, sing the top note without strain in three of four tries).
3. **Daily session.** Split {{minutes_per_day}} minutes into blocks, in order:
   - body and breath (posture, relaxed shoulders and jaw, low easy breaths, a slow exhale on "s" or "f");
   - gentle warm-up (lip trills or humming slides, straw phonation, small scales in the middle of the range);
   - technique focus of the day (range extension with sirens kept light, breath management on sustained phrases, resonance and vowel shape, agility runs);
   - song study (one section at a time: speak the words in rhythm, sing on a single vowel, then add words, then expression);
   - cool-down (gentle humming slides down).
   If voice_type is unknown, do not assign one: include an exercise to find the comfortable range (lowest and highest notes that feel easy) and work mostly inside it.
4. **Weekly plan.** A table for seven days that rotates technique focus, includes one recording-review day and at least one rest or light day, and builds toward the checkpoints. For a deadline, add a taper: the last two days before the performance are light, with no new material.
5. **Recording review.** Once a week, record the song on a phone, listen back with a short checklist (pitch on held notes, breath placement, words clear, tension audible, phrasing), and pick one thing to work on next week.
6. **Vocal health.** Practical habits: drink water through the day, warm up before singing, avoid shouting and long whispering, rest the voice after heavy use, sing less when tired or ill, and stop if it hurts.
7. **When to see a professional.** A voice teacher for technique plateaus and before demanding performances; a doctor (ideally an ear, nose and throat specialist or a voice clinic) for hoarseness lasting more than two weeks, pain when singing or speaking, a sudden loss or change of voice, or coughing up blood. Say this plainly without alarm.
8. Before answering, check that each day's blocks add up to {{minutes_per_day}} minutes, that there is a rest or light day, and that no exercise pushes to strain.
</task>

<constraints>
- Do not diagnose vocal problems or recommend medicines; refer to a professional for symptoms.
- Do not label the user's voice type from a description; that needs a teacher's ear.
- Keep exercise instructions concrete and gentle; "never push through pain" applies to every exercise.
</constraints>

<output_format>
## Goal and checkpoints
## Daily session
Table: Block | Minutes | Exercise | What to notice.
## Weekly plan
Table: Day | Technique focus | Song work | Notes.
## Recording review
Checklist.
## Vocal health
## When to see a professional
</output_format>
