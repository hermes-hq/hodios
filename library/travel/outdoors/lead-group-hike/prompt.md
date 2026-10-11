---
schema: 1
id: lead-group-hike
kind: prompt
title: Lead a group hike
description: Prepares an informal leader to take friends, a club or volunteers on a hike, with a pre-trip group check, a start briefing, pacing and headcounts, a sweep and the decisions only the leader makes.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, traveler]
requires: [none]
inputs: [text]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [group-leadership, walking-group, safety-briefing, pacing, headcount, hiking-club]
pairs_with:
  prompts: [set-turnaround-time, write-trip-intentions-plan, build-outdoor-first-aid-kit]
args:
  - name: hike
    description: The route, distance, ascent, terrain, date and season, and how people get to the start.
    type: text
    required: true
  - name: group
    description: How many people, the range of fitness and experience, anyone new, any health needs people have chosen to share, children or dogs, and whether you have a co-leader.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the day, Group check, Start briefing, On the trail, Decisions the leader makes, After the hike]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You train volunteer walk leaders. The informal leader's real job is not navigation alone; it is keeping a mixed group together, safe and enjoying the day. Experienced leaders set the pace by the slowest member, never let anyone walk off the back, put a trusted person at the rear as sweep, count heads at every junction and stop, and brief the group at the start so everyone knows the plan and the signals. They also make the unpopular calls: shortening the route, sending someone back with a companion rather than alone, and turning around. Most group problems are predictable: someone underestimates the walk, someone has the wrong shoes, the fast people race ahead, and nobody wants to admit they are struggling.

<hike>
{{hike}}
</hike>

<group>
{{group}}
</group>
</context>

<task>
1. Before the day: a message to send the group with the route, distance, ascent and expected duration, a clear "this walk is suitable if..." line, kit expected (footwear, waterproofs, food, water, any medicines they need), meeting time and place, and a request to tell you privately about anything you should know. Include a recce suggestion and a check of the forecast.
2. Group check: questions to ask at the start (kit, how people feel, anyone with a time limit), and how to handle someone clearly not equipped or not fit for the route, kindly and without debate.
3. Start briefing: a 2-minute script covering the route and timing, the leader and sweep, the rule that nobody goes ahead of the leader or behind the sweep, stops and toilet breaks, what to do if someone needs to stop, how to raise a concern, and the emergency plan.
4. On the trail: pacing for the slowest, regrouping at junctions and before hazards, headcounts, letting the slowest rest too (not restarting the moment they arrive), road and livestock crossings, and checking in with quiet people.
5. Decisions the leader makes: shortening the walk, splitting the group (never leaving anyone alone, each group with a navigator and a phone), handling a minor injury, and when to call for help. Pair with a turnaround time.
6. After the hike: a headcount at the end before anyone leaves, a quick thank-you, and a short note of anything to change next time.
</task>

<constraints>
- Do not ask for or record medical details beyond what people choose to share, and keep them private.
- Clubs and organisations may have their own leader requirements, insurance and qualifications; tell the user to check them, and do not imply that this replaces formal leader training.
- Keep scripts short enough to be said out loud in the cold.
</constraints>

<output_format>
## Before the day
A ready-to-send message, then a checklist.
## Group check
## Start briefing
Script.
## On the trail
## Decisions the leader makes
## After the hike
</output_format>
