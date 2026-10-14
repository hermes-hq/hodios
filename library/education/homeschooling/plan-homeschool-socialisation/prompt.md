---
schema: 1
id: plan-homeschool-socialisation
kind: prompt
title: Plan social life for a homeschooled child
description: Plans regular friendships and group time for a homeschooled child from their temperament and your area - recurring groups, mixed-age and peer contact, skills practice and a realistic weekly rhythm.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [friendships, social-skills, peer-groups, clubs-and-teams, introverted-child, community-activities]
pairs_with:
  prompts: [plan-homeschool-co-op, plan-homeschool-year]
args:
  - name: child_profile
    description: Child's age, temperament (shy, outgoing, anxious, intense), interests, current friendships and groups, any social difficulties or neurodivergence, and how they feel about being with other children.
    type: text
    required: true
  - name: local_context
    description: What is around you (town or rural, transport, homeschool groups you know of, libraries, sports clubs, faith or community groups), your budget and the time you can drive or travel each week.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this child needs, Options near you, Weekly rhythm, Building friendships, Check-in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home education adviser who understands child development. You know that the real question behind "what about socialisation?" is not how many children a homeschooler meets, but whether they have a few steady friendships, regular practice in group situations (taking turns, disagreeing, being led by someone other than a parent), and time with people of different ages. Friendships grow from repeated contact with the same children around a shared interest, so one weekly club attended all year often does more than many one-off events. Shy or anxious children do better with small, structured, activity-focused groups and a predictable routine; very social children may need more time than a parent expects. Rural families often have to combine fewer, longer meet-ups with online groups for older children.

Child: {{child_profile}}
Local context: {{local_context}}
</context>

<task>
1. What this child needs: from the profile, describe the social needs to plan for (steady friendships, group skills, mixed-age contact, time with adults other than parents, downtime), and what to avoid (overscheduling, groups that trigger anxiety).
2. Options near you: list types of opportunity that likely fit the area and child (homeschool groups and co-ops, interest clubs, sports teams, scouting or similar, library and museum programmes, music or drama, volunteering, faith or community groups, part-time classes, online groups for older children), and for each say what it gives socially and how to find one locally. Do not invent named groups.
3. Weekly rhythm: a realistic week with two to four regular social anchors, travel time and rest, within the budget and time given.
4. Building friendships: practical ways to turn acquaintances into friends (inviting one child over after a group, staying for the same session each week, starting a small interest club), plus support for the child's specific difficulties if mentioned.
5. Check-in: what to watch over the first two to three months (the child naming friends, wanting to go, coping afterwards) and when to adjust. If the profile suggests significant social anxiety or isolation, suggest involving a doctor or a qualified professional.
</task>

<constraints>
- Do not invent the names of local groups, clubs or venues; describe types and how to search for them.
- Do not frame homeschooling as harmful or as superior to school; focus on this child's needs.
- Keep the plan within the family's time and budget; mark free options.
- Respect the child's temperament: do not push an introverted child into constant group activities.
</constraints>

<output_format>
## What this child needs
## Options near you
A table: Option type | What it gives | How to find one | Cost.
## Weekly rhythm
A table: Day | Activity | Social focus.
## Building friendships
## Check-in
</output_format>
