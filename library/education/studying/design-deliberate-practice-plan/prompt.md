---
schema: 1
id: design-deliberate-practice-plan
kind: prompt
title: Design a deliberate practice plan
description: Designs a deliberate practice plan for a skill such as typing, sight-reading, mental arithmetic or drawing, with sub-skills, drills at the edge of ability, feedback sources and a weekly measure.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual, student]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deliberate-practice, skill-drills, feedback-loops, practice-log]
pairs_with:
  prompts: [practice-mental-math]
args:
  - name: skill
    description: The skill to improve, as specifically as you can ("touch typing", "sight-reading piano at grade 3 level", "drawing faces from life").
    type: string
    required: true
  - name: current_level
    description: Where you are now, with a number if possible ("45 words per minute at 92% accuracy", "can read single-line melodies slowly").
    type: string
    required: true
  - name: minutes_per_day
    description: Minutes per day you can practise.
    type: number
    default: 20
  - name: goal
    description: Optional. The target and by when ("70 wpm by March", "pass grade 4 sight-reading").
    type: string
output_contract:
  format: markdown
  sections: [Baseline test, Sub-skills, Drills, Daily session, Weekly measure, When progress stalls, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A self-learner wants to improve at {{skill}} from this level: {{current_level}}, with {{minutes_per_day}} minutes a day.{{#goal}} Goal: {{goal}}.{{/goal}} Most practice is just repetition in the comfort zone: playing pieces already known, typing at an easy pace, drawing what is already easy. That builds familiarity, not skill. Deliberate practice, as described by researchers of expert performance, means working on one specific weakness at a time, at a difficulty where the learner succeeds often but not always, with fast feedback, and adjusting the next attempt based on that feedback. It is tiring, so sessions are short and focused, and progress is measured the same way every week.
</context>

<task>
1. Design a short baseline test for the skill that can be repeated weekly under the same conditions (for example a fixed-length typing test, a set of unseen sight-reading lines, 50 mixed arithmetic problems against the clock, a timed portrait from a reference photo). Say what to record.
2. Break the skill into four to seven sub-skills (for typing: home-row accuracy, weak-finger letters, common bigrams, numbers and symbols, rhythm). Mark which ones the current level suggests are weakest, or which to check first.
3. For each sub-skill, write one or two drills with: what to do, the difficulty dial (speed, size, complexity, time limit), the target success rate (roughly 70-85% correct; easier means raise difficulty, harder means lower it), and the feedback source (answer key, metronome, recording yourself, a teacher, side-by-side with a reference, the test software's error report).
4. Build a daily session that fits {{minutes_per_day}} minutes: a short warm-up (about 10%), focused drills on one or two sub-skills (about 60-70%), and whole-skill practice (about 20-30%). Rotate sub-skills across the week.
5. Set the weekly measure: the baseline test, a log with date, score and notes, and the rule for changing the plan (move on from a sub-skill when its drill is at target difficulty for two weeks).
6. Give stall rules: plateaus are normal; change one variable (drill, difficulty, feedback source), slow down for accuracy, or take a lighter week.
7. Add body care where relevant: breaks and posture for typing and music, rest days for anything physically demanding.
</task>

<constraints>
- Use only the level given. If it is too vague to set drill difficulty, ask for one number or sample, and give a provisional plan marked [adjust after baseline].
- Do not promise a rate of improvement or a date; say that the weekly measure will show the trend.
- Keep each daily session within {{minutes_per_day}} minutes; check the sum.
- If the skill involves physical risk (sport, lifting, instruments with strain), recommend a qualified coach or teacher for technique, and stop any drill that causes pain.
- Do not recommend specific paid apps or products; describe the type of tool.
</constraints>

<output_format>
## Baseline test
What to do, the conditions, and what to record.

## Sub-skills
Table: Sub-skill | Why it matters | Likely weak? (yes, no, check).

## Drills
Table: Sub-skill | Drill | Difficulty dial | Target success rate | Feedback source.

## Daily session
A timed outline that adds up to {{minutes_per_day}} minutes, and a weekly rotation table: Day | Focus sub-skills.

## Weekly measure
The log template as a table (Date | Score | Accuracy or quality note | Change next week) and the move-on rule.

## When progress stalls
Three to five bullets.

## Questions
What to confirm.
</output_format>
