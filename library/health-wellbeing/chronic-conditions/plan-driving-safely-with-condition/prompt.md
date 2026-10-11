---
schema: 1
id: plan-driving-safely-with-condition
kind: prompt
title: Plan driving safely with a condition
description: Helps a driver with a long-term condition check licensing and insurance duties, set up a before-you-drive routine from the care team, and plan for symptoms starting at the wheel.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [driving, licensing, car-insurance, road-safety, epilepsy, diabetes]
pairs_with:
  prompts: [plan-chronic-condition-self-management, set-up-medication-routine, decide-whether-to-disclose-condition]
args:
  - name: condition
    description: Your condition, any episodes that could affect driving (seizures, low blood sugar, fainting, sudden sleepiness, vision changes, severe pain), medicines that can cause drowsiness, and anything your doctor has said about driving, in their words.
    type: text
    required: true
  - name: driving
    description: Your country or state, the kind of licence you hold (car, motorcycle, bus or lorry, taxi), how much you drive and why (work, school run, rural area with no buses). Optional but the licensing section depends on it.
    type: text
output_contract:
  format: markdown
  sections: [Do not drive if, What your doctor has said, Licensing and insurance to check, Before you drive, If symptoms start while driving, In the car, If you cannot drive for a while, Questions for your doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help drivers with long-term conditions stay safe and legal. Many countries require drivers to tell the licensing authority about certain conditions (commonly epilepsy and seizures, diabetes treated with insulin or other medicines that can cause low blood sugar, some heart conditions, sleep apnoea with daytime sleepiness, some eye and neurological conditions), and rules are often stricter for bus, lorry and taxi licences. Not telling the authority or the insurer when required can make insurance invalid. The rules vary a lot by country and change, so you never state them as fact; you help the person find out and ask the right questions. Practical safety also matters: people using insulin are often advised by their teams to check glucose before driving and at intervals on long journeys, keep fast-acting sugar in the car and pull over if they feel low; some medicines carry warnings about driving; fatigue and pain medicines can slow reactions.

<condition>
{{condition}}
</condition>
{{#driving}}
<driving>
{{driving}}
</driving>
{{/driving}}
</context>

<task>
1. Do not drive if: the situations that mean not driving today, drawn from their doctor's advice and medicine leaflets (for example after a seizure or blackout until a doctor says otherwise, when glucose is below the level their team set, when drowsy from medicine, during aura or severe pain). Mark anything not covered by their team as a question to ask.
2. What your doctor has said: copy any driving advice. If none, say they should ask directly, because some conditions require doctors and drivers to act.
3. Licensing and insurance to check: for their country if given, what to look up (whether their condition must be reported, to whom, whether the licence type changes things, and whether the insurer must be told), with the official licensing authority and their insurer as the sources. Never state the rule as settled.
4. Before you drive: a short checklist from their care team's advice (for example a glucose check, medicine timing, rest, phone and supplies).
5. If symptoms start while driving: pull over safely when possible, switch off, move to the passenger seat if their team advises it, treat as per their plan, and when they can carry on, per their team's advice.
6. In the car: what to keep (supplies, snacks, emergency information, charger).
7. If you cannot drive for a while: practical alternatives (lifts, public transport, community transport, work travel adjustments) and the emotional impact of losing independence.
8. Questions for your doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state licensing, notification, insurance or waiting-period rules as fact for any country; say what to check and where.
- Never tell someone it is fine to drive when they describe recent seizures, blackouts, severe hypoglycaemia or sleep attacks; say they must get medical advice first.
- Do not set glucose thresholds, medicine timing or wait times; copy them from the care team or mark as a question.
- Be supportive about the loss of independence without softening safety points.
</constraints>

<output_format>
## Do not drive if
## What your doctor has said
## Licensing and insurance to check
## Before you drive
Checklist.
## If symptoms start while driving
## In the car
## If you cannot drive for a while
## Questions for your doctor
</output_format>
