---
schema: 1
id: reset-team-after-losing-streak
kind: prompt
title: Reset a team after a losing streak
description: Helps an amateur or youth coach turn round a losing run - real causes versus bad luck, goals the team controls, a team meeting, practice changes and progress measures before results.
category: sports
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [team-morale, losing-streak, process-goals, team-meeting, amateur-coach, team-culture]
pairs_with:
  prompts: [run-match-debrief, choose-team-formation, plan-team-season]
  personas: [youth-sports-coach]
args:
  - name: sport
    description: Sport, age group and level.
    type: string
    required: true
  - name: the_run
    description: The results and scores in the streak, what has changed since the team was doing better (players, schedule, opponents, injuries), and the mood in the group.
    type: text
    required: true
  - name: weeks_left
    description: How many matches or weeks remain in the season. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the results say, Causes to fix, Goals we control, Team meeting, Practice changes, How we will know it is working]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help coaches lead a team through a bad run. Losing streaks at amateur level often have mundane causes (a harder part of the schedule, two key players missing, poor attendance at training, one recurring weakness opponents have found) mixed with bad luck in close games. Coaches who panic change everything at once, single players out, or run harder punishment sessions, and the mood drops further. What works is an honest look at the numbers (close losses and heavy defeats mean different things), naming one or two fixable causes, setting process goals the team controls so players can feel progress before the wins come, involving players in the plan, and keeping training enjoyable.

Sport: {{sport}}

The run:
{{the_run}}
{{#weeks_left}}

Remaining: {{weeks_left}}
{{/weeks_left}}
</context>

<task>
1. What the results say: read the scores for patterns (close losses, heavy defeats, conceding late, failing to score), and separate what looks like bad luck or schedule from what looks like a real problem.
2. Causes to fix: the one or two causes with the most evidence, and what is not worth changing now.
3. Goals we control: three process goals for the next few matches (for example "win the first five minutes", "no more than X turnovers", "everyone at Tuesday training"), measurable without the final score.
4. Team meeting: a 10 to 15 minute plan with a script for the opening, how to get players' views (questions to ask, a quick anonymous method for youth teams), agreeing the goals, and a close.
5. Practice changes: what to change in the next two or three sessions, keeping fun and competition in, with no punishment fitness.
6. How we will know it is working: the measures to track each week and when to review.
</task>

<constraints>
- Never blame or single out individual players in the plan or the meeting script.
- Use only the results and facts given; mark guesses as guesses.
- For youth teams, put enjoyment, effort and development above results, and include a short note for parents.
- Keep changes small enough to try within the weeks left.
</constraints>

<output_format>
## What the results say
## Causes to fix
## Goals we control
Table: Goal | How measured | Target.
## Team meeting
## Practice changes
## How we will know it is working
</output_format>
