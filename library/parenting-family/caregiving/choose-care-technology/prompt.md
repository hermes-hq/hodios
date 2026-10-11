---
schema: 1
id: choose-care-technology
kind: prompt
title: Choose care technology
description: Helps a family choose technology for someone living at home, such as personal alarms, fall detection, medicine reminders and sensors, matched to real risks, consent and who responds.
category: caregiving
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [assistive-technology, personal-alarm, fall-detection, telecare, consent]
pairs_with:
  prompts: [plan-aging-in-place-modifications, plan-long-distance-caregiving, set-up-medication-routine]
args:
  - name: situation
    description: Who it is for, their main risks (falls, getting lost, missed medicines, cooker left on, loneliness), what they can use or wear, whether they live alone, internet and signal, who would respond to alerts, budget and country.
    type: text
    required: true
  - name: their_view
    description: What the person themselves thinks about the idea, if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risks to cover, Options matched to risks, Consent and dignity, Who responds, Setup and testing, What technology cannot do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families choose care technology the way an occupational therapist who specialises in telecare would. Common mistakes: buying gadgets before naming the risk; a pendant alarm that sits in a drawer because the person finds it stigmatising or forgets to wear it; fall detectors that miss slow slides to the floor or send false alarms; a monitoring plan with no one close enough to respond at 3am; cameras installed without the person's consent; and devices that depend on Wi-Fi in a house with none. Simple, wearable or invisible options that fit the person's habits work best, and every alert needs a named responder. In many places, local health or social care services offer telecare assessments, and costs vary widely.

<situation>
{{situation}}
</situation>
{{#their_view}}Their view: {{their_view}}{{/their_view}}
</context>

<task>
1. Risks to cover: list the risks from the situation in order of seriousness, and what a good outcome looks like for each (for example "if she falls at night, someone knows within minutes").
2. Options matched to risks: a table of technology types (not brands) for each risk: personal alarms (pendant, wrist), fall detectors, smart watches with fall detection, bed or chair sensors, door and movement sensors, cooker or water shut-offs, automatic medicine dispensers or reminders, simplified phones or video devices, GPS locators, key safes, smart speakers, plus what each needs (power, signal, Wi-Fi, charging), how it fails, and a rough cost type (one-off, monthly monitoring).
3. Consent and dignity: how to involve the person in choosing; where they cannot decide, acting in their best interest with the least restrictive option and checking local rules; avoiding cameras in private spaces; who sees what data.
4. Who responds: for each alert, who responds by day and night, how quickly they can get there, and whether a monitoring service or key holder is needed. Flag any alert with no realistic responder.
5. Setup and testing: a checklist for installing, practising with the person, testing alerts monthly, charging routines, and reviewing after a month.
6. What technology cannot do: what still needs people (company, personal care, noticing decline) and when needs mean more care, not more devices; mention asking the local health or social care service or an occupational therapist about a telecare assessment.
</task>

<constraints>
- No brand or product recommendations, and no specific prices; give cost types and say to compare locally.
- Never suggest covert monitoring of an adult who can decide, or cameras in bedrooms or bathrooms.
- Be honest about limits: devices fail, need charging and need a responder.
- If the situation shows the person is unsafe now (recent long lie after a fall, getting lost at night, not eating), say technology is not enough on its own and to contact their doctor or care services now.
</constraints>

<output_format>
## Risks to cover
## Options matched to risks
Table: Risk | Technology type | Needs | How it fails | Cost type.
## Consent and dignity
## Who responds
Table: Alert | Day responder | Night responder | Time to arrive.
## Setup and testing
## What technology cannot do
</output_format>
