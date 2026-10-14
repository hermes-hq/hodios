---
schema: 1
id: write-fire-risk-assessment
kind: prompt
title: Write a fire risk assessment
description: Writes a fire risk assessment for a small shop, office, café, salon or venue - hazards, people at risk, escape routes, alarms, equipment, training - with a dated action plan and on-site checks.
category: compliance
version: 1.0.0
status: incubating
stage: [build, review]
role: [founder, operations-manager, manager]
subject: [law, retail, hospitality]
requires: [none]
inputs: [text, notes]
output: [report, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [fire-safety, fire-risk-assessment, emergency-evacuation, escape-routes, fire-doors, premises-safety]
pairs_with:
  prompts: [write-workplace-risk-assessment, write-health-and-safety-policy]
args:
  - name: premises
    description: Type of business and building, floors and rough layout, number and location of exits and stairs, whether the building is shared with other occupiers, cooking or other heat sources, flammable stock or chemicals, storage areas, and opening hours.
    type: text
    required: true
  - name: people
    description: Who is in the building and when - staff, customers or visitors (rough numbers), anyone working alone or late, anyone with mobility, sight or hearing needs, and whether anyone sleeps there.
    type: text
    required: true
  - name: jurisdiction
    description: Country and region, because who must do the assessment, whether it must be written, and the standards for alarms and equipment differ.
    type: string
    required: true
  - name: existing_measures
    description: What is already in place - alarm and detectors, emergency lighting, extinguishers and blankets, fire doors, signs, drills, servicing records, training. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Premises summary, Fire hazards, People at risk, Existing precautions, Risk rating, Action plan, Emergency plan and training, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help the person responsible for a small non-domestic premises write a fire risk assessment. In many countries the employer, owner or occupier must assess fire risk and act on it, and must keep a written record once they employ a set number of people or hold certain licences. The usual method has five steps: identify fire hazards (sources of ignition, fuel and oxygen); identify people at risk, especially lone workers, people who need help to escape, and members of the public who do not know the building; evaluate the risk and remove, reduce or protect against it (escape routes and travel distances, fire doors kept shut, emergency lighting, signs, detection and alarm, extinguishers, separation of high-risk rooms); record the findings and an emergency plan, and train people; and review regularly and after changes. The failures that inspectors find again and again are wedged or damaged fire doors, blocked or locked exits, storage in escape routes or under stairs, overloaded extension leads, lint or grease build-up, untested alarms and lights, no drills, no personal evacuation plans for people who need them, and confusion over who is responsible in shared buildings. An assessment written from a description cannot replace looking at the building, so you mark what must be checked on site.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Premises:
<premises>
{{premises}}
</premises>

People:
<people>
{{people}}
</people>
{{#existing_measures}}

Existing measures:
<measures>
{{existing_measures}}
</measures>
{{/existing_measures}}

1. Premises summary: use, layout, occupancy, hours, and who the responsible person or people are, including the split with a landlord or other occupiers for shared areas.
2. Fire hazards: ignition sources, fuel and oxygen sources specific to this business, and the unsafe practices likely in this kind of premises.
3. People at risk: who, where, when, and why they are at greater risk, including the need for personal evacuation plans.
4. Existing precautions: what is in place for each area (means of escape, detection and warning, lighting, firefighting equipment, signs, separation, maintenance), with "check on site" for each item that a walk-round must confirm.
5. Risk rating: likelihood of fire and consequence for people, with a short justification, using a simple scale.
6. Action plan: each action, why, priority, owner [ROLE] and target date, putting life safety items first (blocked exits, missing detection, sleeping risk).
7. Emergency plan and training: raising the alarm, evacuation routes, assembly point, calling emergency services, roles such as fire wardens, helping people who need assistance, drills and their frequency, and testing and servicing records to keep.
8. Review: when to review (a set interval and after changes, incidents or near misses) and a sign-off block.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the building's features or confirm anything you were not told; mark gaps "check on site".
- Do not state legal thresholds, servicing intervals or equipment standards as fact for the jurisdiction unless supplied; describe common practice and mark "confirm locally".
- If anyone sleeps on the premises, the building is large or complex, has several storeys of shared occupation, or stores large amounts of flammable material, say clearly that a competent fire risk assessor should do or check the assessment.
- If the description shows an immediate danger, such as a locked final exit during opening hours or no way to raise the alarm, put it at the top and say to fix it now.
{{> output/uncertainty}}
</constraints>

<output_format>
## Premises summary
Short paragraph and a responsibilities line.

## Fire hazards
Table: hazard | where | why it matters.

## People at risk
Table: who | where and when | extra risk | measure.

## Existing precautions
Table: precaution | status | check on site.

## Risk rating
Likelihood, consequence and overall rating with reasons.

## Action plan
Table: action | priority | owner | target date.

## Emergency plan and training
Numbered steps, then a training and testing schedule.

## Review
Review dates and a sign-off block.
</output_format>
