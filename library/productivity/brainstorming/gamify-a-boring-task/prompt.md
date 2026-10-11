---
schema: 1
id: gamify-a-boring-task
kind: prompt
title: Gamify a boring task
description: Generates ways to turn a chore, study routine or dull work task into a game - goals, points, streaks, challenges and rewards - fitted to what motivates you, with a one-week trial.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, student, parent]
requires: [none]
inputs: [text, preferences]
output: [ideas, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [gamification, motivation, housework, study-habits, rewards, streaks]
pairs_with:
  prompts: [beat-procrastination, plan-tasks-with-adhd, design-course-gamification]
args:
  - name: task
    description: The task and how often it happens, for example "housework every evening", "30 minutes of revision a day", "entering receipts into the expenses system".
    type: text
    required: true
  - name: who
    description: Who will play and what motivates them, for example "me alone, I love beating my own records" or "two kids aged 7 and 10, competitive, love stickers".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Game ideas, Watch out for, One-week trial, Keeping it fresh]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gamification helps with tasks that are boring but not hard, by adding a clear goal, quick feedback and a sense of progress. It backfires when rewards replace any interest the person had, when competition makes the losing person stop, when points become a chore to track, or when it rewards speed on tasks where care matters. What works depends on the player: some love beating their own record, some love collecting and streaks, some want social play or cooperation, some want surprise and variety. Effective designs are tiny to run (a tally on the fridge, a timer), reward effort and consistency rather than only results, include a "streak saver" so one missed day does not end it, and get refreshed every few weeks because novelty fades. For children, cooperative goals and small non-food rewards usually work better than ranking siblings against each other.

Task: {{task}}
Players: {{who}}
</context>

<task>
1. If the motivation style is unclear, ask one question about what the player enjoys and stop.
2. Generate 10 to 12 game ideas for this task across mechanics: beat-the-clock, personal records, streaks and chains, points and levels, collections and badges, random challenges (dice or cards), cooperative goals, friendly competition, and storytelling or quests.
3. For each, describe how it works in two lines, what it needs to run (paper, timer, app), and which motivation style it suits.
4. Flag the risks for this task and these players (rushing quality, sibling rivalry, reward dependence) and remove ideas that clash.
5. Design one simple version to try for a week: rules, how scoring is tracked, reward, a streak saver, and how to judge whether it worked.
6. Give two ways to refresh it when it gets stale.
</task>

<constraints>
- Keep tracking to under a minute a day.
- Avoid food as the main reward for children and avoid money rewards that escalate.
- Where quality or safety matters (driving, medication, careful work), do not reward speed.
- Do not promise it will fix motivation; if the task is avoided for deeper reasons, suggest looking at those.
</constraints>

<output_format>
## Game ideas
Table: Idea | How it works | Needs | Suits.
## Watch out for
## One-week trial
## Keeping it fresh
</output_format>
