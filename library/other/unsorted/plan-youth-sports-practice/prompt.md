---
schema: 1
id: plan-youth-sports-practice
kind: prompt
title: Plan a youth sports practice
description: Plans a youth sports practice for volunteer coaches with one theme, age-appropriate games and drills, maximum touches, timings, coaching cues, progressions and a safety checklist.
category: unsorted
proposed_category: sports-coaching
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences, text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [youth-sports, coaching, practice-plan, drills, volunteer-coach]
pairs_with:
  prompts: [plan-team-season]
args:
  - name: sport
    description: The sport, for example football (soccer), basketball, netball, rugby, hockey, volleyball or baseball.
    type: string
    required: true
  - name: age_group
    description: Ages or age group, plus the number of players and their experience if you know it, for example "U8, 12 kids, mostly first season" or "11-12 year olds, 9 players, competitive league".
    type: string
    required: true
  - name: minutes
    description: Practice length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Theme and goal, Equipment, Practice plan, Activity details, Safety checklist, Wrap-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help volunteer coaches, many of them parents with no coaching background, run practices that children enjoy and learn from. The evidence from youth sport development is consistent: young players learn most through game-like activities with lots of touches on the ball, short instructions, small-sided games, and plenty of praise for effort; they learn least standing in lines, running laps, or listening to long talks. Kids keep coming back when practice is fun and they feel improvement. Every practice also has to be safe and inclusive.

Sport: {{sport}}
Age group: {{age_group}}
Practice length: {{minutes}} minutes
</context>

<task>
1. If the number of players is unknown, assume 10 to 14 and give notes for fewer or more. If the ages are too vague to pitch the plan (for example "kids"), ask and stop.
2. Pick one practice theme suited to the age (for example "dribbling to keep the ball close" for under-8s, "creating space in attack" for 11 to 12 year olds) and a goal a coach can see being met.
3. Build the session in a play, practise, play shape: a fun active warm-up game linked to the theme, one or two skill activities with every child active (no lines longer than three players), a small-sided game that rewards the theme, and a final free game. Include water breaks.
4. For each activity give: setup (space in metres or paces, cones, groups), how to explain it in under 30 seconds, rules, two or three coaching cues in kid language, a regression (easier) and a progression (harder), and what success looks like.
5. Fit the activities to the age: for under-8s, short activities (8 to 10 minutes), lots of individual ball time and imaginative games; for 9 to 12, more passing, decision-making and simple positions; for teens, more tactical game situations and player input.
6. Write the safety checklist: a pre-practice check of the area and equipment, a dynamic warm-up, heat and hydration, the first aid kit and emergency contact numbers, and head injuries (any child with a suspected concussion stops playing that day and does not return until cleared under the league's protocol).
7. End with a short wrap-up: a team cheer or praise round, one question to ask the players, and a note for parents.
</task>

<constraints>
- Make every activity inclusive: no elimination games where players sit out for long, mixed-ability groupings, and a role for any child who cannot fully take part that day.
- Positive coaching language only; no laps or exercise as punishment.
- Keep contact and tackling within the age's rules and the league's safety rules; for contact sports with young children, prefer modified, non-contact versions unless the league says otherwise.
- Do not give medical advice about injuries beyond basic first aid and the stop-and-refer rule; tell the coach to follow the league's or governing body's safeguarding and medical guidance.
- Timings must add up to {{minutes}} minutes, including transitions and water breaks.
</constraints>

<output_format>
## Theme and goal
## Equipment
## Practice plan
Table: Time | Activity | Purpose | Setup.
## Activity details
`### Activity name (N min)` with the fields from the task.
## Safety checklist
Checkbox list.
## Wrap-up
</output_format>
