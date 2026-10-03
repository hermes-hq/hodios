---
schema: 1
id: plan-activity-pacing
kind: prompt
title: Plan activity pacing
description: Plans activity pacing for chronic pain or fatigue, covering baselines, an energy budget, cautious increases and a flare plan, written to review with a clinician.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pacing, chronic-pain, fatigue, energy-envelope, flare-plan, long-covid]
pairs_with:
  prompts: [plan-chronic-condition-self-management, build-symptom-log, prepare-doctor-questions]
  personas: [health-navigator]
args:
  - name: condition
    description: The condition or main symptom you are pacing for, for example "fibromyalgia", "ME/CFS", "long COVID", "chronic low back pain", "fatigue after cancer treatment". Say if it is diagnosed.
    type: string
    required: true
  - name: typical_day
    description: What a typical good day and a bad day look like, what triggers crashes or flares and how long after, what you must do (work, school run, care), what you want to get back to, and any advice your clinicians have already given.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Check first, How pacing works for you, Find your baseline, Your energy budget, A paced day, Increasing safely, Flare plan, Review with your clinician]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with chronic pain or fatigue use pacing, the occupational-therapy and pain-management approach to stopping the boom-and-bust cycle: doing too much on good days, then crashing for days. Pacing means finding a baseline you can manage on good and bad days alike, spreading activity out, resting before you need to, and increasing only when stable. Approaches differ by condition. For persistent pain, gradual, planned increases from a stable baseline are standard. For ME/CFS, long COVID and other conditions with post-exertional malaise (a delayed worsening 12 to 72 hours after effort), current guidance such as NICE's 2021 ME/CFS guideline advises staying within the energy envelope and against fixed, incremental exercise increases; any increase is flexible, symptom-led and agreed with a specialist.

Condition: {{condition}}

<typical_day>
{{typical_day}}
</typical_day>
</context>

<task>
1. Check first: if they describe new or worsening symptoms that have not been assessed, or anything urgent (chest pain, fainting, new weakness or numbness, loss of bladder or bowel control with back pain, unexplained weight loss), say to see a clinician before starting, or emergency services now for the urgent ones.
2. Decide which pacing approach fits and say why in two lines: does the description suggest post-exertional malaise (delayed crashes after effort)? If unclear, ask, and default to the cautious approach.
3. Find your baseline: a one- to two-week activity and symptom diary (what, how long, physical, mental or emotional effort, rest, symptoms the next day), then set the baseline at a level they can manage on a bad day without a flare, below their good-day level.
4. Energy budget: group their activities as physical, cognitive and emotional; rate them heavy, medium or light from their description; and show how to spread heavy ones across the day and week, break tasks into chunks with rests, alternate types, and plan rest before and after demanding events. Include ideas to reduce the cost of essential tasks (sitting to cook, online shopping, delegating).
5. Write one paced day built from their real commitments, with activity blocks, planned rests (genuine rest, not scrolling), and buffers.
6. Increasing safely:
   - For persistent pain without post-exertional malaise: once the baseline has been stable for one to two weeks, increase one activity by a small step (for example about 10 percent), hold, and only increase again if there is no flare.
   - For ME/CFS, long COVID or suspected post-exertional malaise: stabilise first, no fixed increases, any change small and flexible, and only with their specialist team.
7. Flare plan: early warning signs, what to drop first, the minimum day to fall back to, how to return to baseline gradually, and when a flare needs a clinician.
8. Review with your clinician: what to bring (the diary), and questions to ask (whether this baseline and approach suit them, referral to a pain management, fatigue or occupational therapy service, work or school adjustments).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose, do not suggest that symptoms are psychological or "deconditioning", and do not recommend medicines, supplements or a graded exercise programme. Respect that the illness is real.
- Use their activities and words; no generic wellness filler.
- Keep numbers as examples to agree with a clinician, never prescriptions.
- If the condition is not diagnosed, encourage assessment first and keep the plan gentle.
- If they mention feeling hopeless or unable to go on, respond with care and point them to support, including crisis lines if there is any risk.
- Readable in a few minutes; use tables where they help.
</constraints>

<output_format>
## Check first
## How pacing works for you
Which approach and why, two to four lines.
## Find your baseline
A diary table template and how to set the baseline.
## Your energy budget
Table: Activity | Type | Cost | How to make it lighter.
## A paced day
Time-blocked schedule.
## Increasing safely
## Flare plan
## Review with your clinician
Bring and ask lists.
</output_format>
