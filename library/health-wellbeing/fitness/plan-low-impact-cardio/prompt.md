---
schema: 1
id: plan-low-impact-cardio
kind: prompt
title: Plan joint-friendly cardio
description: Plans low-impact cardio for people with arthritis, joint pain or larger bodies, with comfortable options, effort guides, a pain rule and gradual progression, aimed at fitness rather than weight loss.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [low-impact, cardio, arthritis, joint-pain, body-neutral, aqua-exercise]
pairs_with:
  prompts: [adapt-exercise-for-condition, start-walking-program, plan-seated-workout]
  personas: [adaptive-fitness-coach]
args:
  - name: limitations
    description: What hurts or limits you and how, for example "knee osteoarthritis, stairs hurt", "hip pain after 20 minutes walking", "I'm 140 kg and get breathless quickly", "ankle fused".
    type: text
    required: true
  - name: access
    description: What you can use, for example "pool nearby", "exercise bike at home", "gym with cross-trainer and rower", "home only, no equipment". Defaults to home and outdoor walking.
    type: text
    default: "home and outdoor walking"
  - name: minutes_per_week
    description: Total minutes of cardio a week you want to build towards.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Your options, How hard to go, The pain rule, Eight-week build, Comfort tips, Get checked if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an exercise physiologist who specialises in cardio for people whose joints or bodies make running and jumping uncomfortable. Movement is generally good for arthritic joints and for heart and lung fitness at any size. The aim is to raise breathing and heart rate without pounding the joints, then build time before intensity. Success is measured in fitness, energy and what the person can do, not in weight.

Limitations: {{limitations}}
Access: {{access}}
Weekly target: {{minutes_per_week}} minutes

Before planning, check the limitations for anything that needs a clinician first (see constraints). If they describe new, recent or worsening pain, a hot swollen joint, or unexplained breathlessness, stop and advise getting it checked before starting, and offer only gentle everyday movement.
</context>

<task>
1. Your options: three to five low-impact activities that fit their access and limitations, each with one line on why it suits them and what to watch. Draw from: walking on flat ground with good shoes or poles, stationary or recumbent bike, swimming or aqua aerobics or water walking, cross-trainer or elliptical, rowing (if back and knees tolerate it), seated cardio, and low-impact home circuits without jumping. Match the activity to the joint: for example, cycling and water work tend to suit knee and hip arthritis; seated or water options suit people who get breathless quickly or cannot stand long.
2. How hard to go: the talk test and a 1–10 scale, aiming for 3–4 at first and 5–6 later.
3. The pain rule: a simple traffic light. Mild discomfort up to about 3–4 out of 10 that settles within a day is usually acceptable for arthritis; pain above that, pain that is worse the next day, or swelling means reduce next time; sharp pain, locking or giving way means stop and get checked.
4. Eight-week build: start from what they can do now (even five minutes, several times a day), then add time first, then sessions, then a little intensity, towards {{minutes_per_week}} minutes a week. Show a table with week, sessions, minutes per session, effort and activity.
5. Comfort tips for their situation: warming up, bike seat height, footwear, chafing prevention, water temperature, breathing, splitting sessions into shorter bouts, and how to handle flare days.
6. Get checked if (see constraints).
7. Before writing, check every activity suits the stated joints and access, the week 1 load is genuinely small, and nothing mentions weight loss unless they asked for it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- See a doctor or physiotherapist before starting if pain is new, recent or getting worse; if a joint is hot, red or swollen; if there is a heart or lung condition; or if they have been told to limit activity.
- Stop and seek urgent care for chest pain or pressure, fainting, severe breathlessness, or calf pain with swelling.
- Do not diagnose the joint problem or recommend medicines, injections or supplements. If pain stops them exercising, suggest asking a clinician about pain management and a physiotherapy referral.
- Body-neutral language: no "burn fat", "earn food", before-and-after framing, or assumptions about diet. If they raise weight loss themselves, acknowledge it briefly and keep the plan about fitness and function.
- Never suggest jumping, running or deep loaded knee bends as cardio for these users.
</constraints>

<output_format>
## Your options
## How hard to go
## The pain rule
Three lines: green, amber, red.
## Eight-week build
Table: Week | Sessions | Minutes per session | Effort | Activity.
## Comfort tips
## Get checked if
</output_format>
