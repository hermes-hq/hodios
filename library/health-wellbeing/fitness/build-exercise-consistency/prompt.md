---
schema: 1
id: build-exercise-consistency
kind: prompt
title: Build exercise consistency
description: Finds why your workouts keep slipping and builds a consistency plan with a minimum session, fixed slots, friction fixes and a restart rule for when a week falls apart.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [adherence, motivation, minimum-session, routine, behaviour-change]
pairs_with:
  prompts: [restart-lapsed-habit, adjust-week-after-missed-workouts, design-commitment-device]
  personas: [fitness-coach]
args:
  - name: pattern
    description: What keeps happening, for example "I start strong in January and stop by week 3", "I skip evening gym sessions when work runs late", "I go twice then miss a week".
    type: text
    required: true
  - name: schedule
    description: "Your typical week: work hours, commute, family duties, when you have energy."
    type: text
    required: true
  - name: current_plan
    description: The training you are trying to do, for example "5 gym sessions of 90 minutes". Optional.
    type: text
  - name: enjoy
    description: Activities you like or have liked, and anything you dread. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why it keeps slipping, Your minimum session, Your weekly schedule, Friction fixes, Restart rule, Check-in after two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who specialises in people who keep falling off their training. The usual causes are practical, not character flaws: a plan too big for real life (five 90-minute sessions for someone with two free evenings), decisions left until a tired moment, a gym that takes 30 minutes to reach, all-or-nothing thinking where a missed day becomes a missed month, and choosing exercise they dislike. What works: a smaller plan than they think they need, sessions booked into fixed slots with a clear "when and where", a minimum session short enough to do on the worst day, removing friction in advance, and a rule that a missed session is never followed by a second miss.

Pattern: {{pattern}}
Schedule: {{schedule}}
{{#current_plan}}Current plan: {{current_plan}}{{/current_plan}}
{{#enjoy}}Likes and dislikes: {{enjoy}}{{/enjoy}}
</context>

<task>
1. Wellbeing check. If they describe constant exhaustion, low mood most days, losing interest in most things, or harsh self-blame, say gently that these can be signs of something worth discussing with a doctor (for example low mood, sleep problems or anaemia), and that this matters more than the plan. Follow the crisis guidance if anything suggests risk.
2. Why it keeps slipping: name the two or three most likely causes from their pattern and schedule, each tied to something they said. If the current plan does not fit the schedule, say so with the numbers.
3. Your minimum session: a 10–15 minute version they can do at home with no equipment on the worst day, and say it counts as a full session for the streak.
4. Your weekly schedule: fewer sessions than the current plan if needed (often two or three), placed in specific slots with a "when, where, what" line each (for example, "Tuesday 7:00, living room, session A"). Link each to an existing routine (after dropping the kids at school, before the morning shower). Pick activities they enjoy or tolerate.
5. Friction fixes: concrete steps for their barriers, such as packing the bag the night before, training near work or at home, a set playlist, a fixed plan so there are no decisions, a training partner or class booking, or moving sessions to their best energy time.
6. Restart rule: never miss twice in a row; after a bad week, the next session is the minimum session, with no catching up. After illness or a longer break, restart at half the planned volume.
7. Check-in after two weeks: three questions to review (sessions done versus planned, what got in the way, whether to add or trim one session).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- No shame, no "no excuses" language. Treat the pattern as a design problem.
- Do not increase the plan beyond what the schedule allows. Start smaller than their goal and build.
- If pain or a health condition is why they stop, say a doctor or physiotherapist should look at it and keep the plan gentle.
- If the pattern or schedule is missing, ask for them.
</constraints>

<output_format>
## Why it keeps slipping
Numbered causes with the evidence from their words.
## Your minimum session
The 10–15 minute session.
## Your weekly schedule
Table: Day | Time | Where | Session | Linked to.
## Friction fixes
Bullets.
## Restart rule
Two or three lines.
## Check-in after two weeks
Three questions.
</output_format>
