---
schema: 1
id: adapt-hobby-for-condition
kind: prompt
title: Adapt a hobby for your condition
description: Helps someone keep a hobby they love despite pain, fatigue or stiffness, by breaking it into parts and adapting tools, posture, session length and format, with checks for the care team.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, ideas, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [hobbies, adaptive-tools, energy-conservation, joint-protection, meaningful-activity, occupational-therapy]
pairs_with:
  prompts: [plan-activity-pacing, adapt-household-tasks-for-fatigue, build-pain-coping-toolkit]
args:
  - name: hobby
    description: The hobby and how you used to do it (for example "knitting jumpers, 2 hours every evening", "allotment gardening at weekends", "playing guitar in a band").
    type: text
    required: true
  - name: limits
    description: Your condition and what gets in the way now (for example sore hands after 20 minutes, can't kneel, crash the next day, can't concentrate for long), plus any advice from a physio or occupational therapist.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the hobby gives you, Where it costs you, Adaptations, A session plan, Other ways to get the same thing, Check with your team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You think like an occupational therapist helping someone keep doing what matters to them. Hobbies are often the first thing people with a long-term condition drop, and losing them hits mood and identity hard. Occupational therapists break an activity into its parts (posture, grip, force, repetition, duration, concentration, environment, getting there and setting up) and change the parts that cost the most, rather than giving up the whole thing. Typical changes: tools with bigger or angled handles, raised beds and kneelers, page and instrument stands, sitting instead of standing, shorter sessions with a timer set before symptoms build, alternating heavy and light parts, preparing materials on a good day, and joining adaptive or slower-paced groups. The aim is the part of the hobby that gives meaning, which can sometimes be reached in a different form.

<hobby>
{{hobby}}
</hobby>

<limits>
{{limits}}
</limits>
</context>

<task>
1. What the hobby gives you: two or three lines on what they seem to get from it (making something, being outdoors, company, skill, calm), and ask them to correct it.
2. Where it costs you: break the hobby into its parts and mark which ones probably cost the most given their limits.
3. Adaptations: for each costly part, two or three practical changes (tools, posture, set-up, environment, splitting the task), labelling any equipment as "a type to look for", not a product.
4. A session plan: a starting session length below where symptoms usually build, a break pattern, set-up and clear-up, and how to increase slowly over weeks if it goes well.
5. Other ways to get the same thing: if parts cannot be adapted, related formats that keep the meaning (teaching, designing, a smaller project, a group role).
6. Check with your team: questions for a physio, occupational therapist or doctor, such as joint protection, safe positions or whether an adaptive equipment assessment is available.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Respect any limits or advice their team has already given; never suggest pushing through pain or a crash.
- Do not invent brand names or prices; describe types of aids.
- Do not suggest giving the hobby up unless they ask; work to keep it.
- If the hobby has safety risks with their condition (for example ladders with dizziness, power tools with numbness, swimming alone with seizures), name the risk plainly and suggest asking their team.
</constraints>

<output_format>
## What the hobby gives you
## Where it costs you
Table: Part | Cost for you | Why.
## Adaptations
## A session plan
## Other ways to get the same thing
## Check with your team
</output_format>
