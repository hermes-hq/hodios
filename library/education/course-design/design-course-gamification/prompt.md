---
schema: 1
id: design-course-gamification
kind: prompt
title: Design course gamification
description: Designs course game mechanics (quests, progress, badges, choice, team challenges) tied to learning outcomes, flags points that reward the wrong behaviour and plans for disengaged learners.
category: course-design
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, content-creator]
requires: [none]
inputs: [text, spec]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [gamification, game-mechanics, badges, quests, motivation, self-determination-theory]
pairs_with:
  prompts: [design-course-outline, design-microlearning-series, design-branching-scenario]
args:
  - name: course_outline
    description: The course - outcomes, units or modules, assessments, format (classroom, online, blended), length and any platform or tools you use. Say what engagement problem you are trying to fix.
    type: text
    required: true
  - name: audience_age
    description: Who the learners are, which changes tone, competition and reward choices.
    type: enum
    enum: [children, teens, adults]
    default: teens
output_contract:
  format: markdown
  sections: [Engagement problem, Core loop, Mechanics map, Progress and rewards, Perverse incentive check, Disengaged learners, Running it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gamification helps when the game rewards the learning itself: attempting harder problems, practising, revising work after feedback, helping peers. It backfires when points reward the easy and visible (logins, clicks, speed, volume of posts), when public leaderboards tell the bottom half they are losers, when extrinsic rewards replace interest people already had, and when the novelty fades after three weeks. Durable designs support autonomy (meaningful choices), competence (visible progress toward real mastery) and relatedness (team goals, contribution).

Learners: {{audience_age}}.
</context>

<task>
<course_outline>
{{course_outline}}
</course_outline>

1. **Engagement problem:** name the specific behaviour to change (for example students skip practice quizzes, few submit drafts, online learners drop off in week 3). If none is given, infer the likeliest from the outline and say so.
2. **Core loop:** the repeating cycle learners go through each week (choose a quest, practise, get feedback, level up), in one or two sentences, and how it maps to the course's learning cycle.
3. **Mechanics map:** for each unit or module, the mechanics used and the learning behaviour each rewards. Choose from: quests with choice of route, mastery levels or skill trees tied to outcomes, retries without penalty, narrative or theme, team challenges with shared goals, badges for specific demonstrated skills, unlocks, and personal-best progress. Use only a few, consistently.
4. **Progress and rewards:** how progress is shown (progress toward outcomes, not raw points), what badges mean (each with a criterion a teacher could verify), and how this relates to grades. Keep game points separate from final grades, or say exactly how they feed in.
5. **Perverse incentive check:** for every mechanic, what a learner could do to game it without learning, and the fix.
6. **Disengaged learners:** a fallback for learners who do not care for games or fall behind: private progress only, catch-up quests, choice to opt out of competitive elements, and a human check-in.
7. **Running it:** set-up effort, what a teacher does weekly, low-tech options (paper tracker, wall chart) as well as digital, and how to tell after four weeks if it is working.
</task>

<constraints>
- Every mechanic must reward a behaviour that serves an outcome; cut any that only rewards attendance, clicks or speed.
- No public ranking of individuals for children or teens; for adults, only opt-in leaderboards, ideally team-based or personal-best.
- No loss-based pressure (streak-breaking penalties, losing earned levels) and no purchasable advantages.
- Collect no more learner data than the course already does; respect the platform's privacy settings and school policies.
- Do not name specific apps or platforms unless the outline already uses them.
- If the outline has no outcomes or structure, ask for them and stop.
</constraints>

<output_format>
## Engagement problem
Two or three sentences.
## Core loop
One or two sentences and a simple text diagram.
## Mechanics map
Table: Unit or module | Mechanic | Learning behaviour rewarded | Outcome served.
## Progress and rewards
Bullets, with a badge list: Badge | Criterion | Evidence.
## Perverse incentive check
Table: Mechanic | How it could be gamed | Fix.
## Disengaged learners
Bullets.
## Running it
Bullets: set-up, weekly routine, four-week check.
</output_format>
