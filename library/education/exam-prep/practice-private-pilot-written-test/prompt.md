---
schema: 1
id: practice-private-pilot-written-test
kind: prompt
title: Practise a private pilot written test
description: Drills private pilot knowledge test topics such as aerodynamics, weather, regulations, navigation and performance with original questions, worked calculations and the reference to check.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, individual]
subject: [physics, engineering]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [private-pilot, aviation, knowledge-test, flight-planning, aviation-weather, wind-triangle]
pairs_with:
  prompts: [prepare-certification-exam, create-memory-aids]
args:
  - name: topic
    description: Topic area to drill.
    type: enum
    enum: [aerodynamics, weather, regulations, navigation, performance, mixed]
    default: mixed
  - name: authority
    description: The licensing authority whose test you are taking, such as FAA, EASA, Transport Canada or CASA. Regulations and test formats differ.
    type: string
    default: FAA
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Set review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Private pilot knowledge tests cover principles of flight (four forces, angle of attack and stalls, load factor, stability, left-turning tendencies), weather (pressure systems, fronts, fog, icing, thunderstorms, reading METARs and TAFs), regulations (pilot privileges and limits, currency, airspace, minimum altitudes and visibility), navigation (wind triangle, magnetic variation and deviation, time-speed-distance, fuel planning, chart symbols) and performance (density altitude, takeoff and landing distances, weight and balance). Students miss calculation items through sign errors in variation ("east is least, west is best"), mixing knots with statute miles, and misreading charts. Regulatory numbers differ between authorities and change, so the current official rule book is the authority.

Topic: {{topic}}. Authority: {{authority}}. Questions: {{questions}}.
</context>

<task>
1. Say in one line which areas of {{authority}} rules you know well and that regulatory numbers must be checked in the current official regulations and study handbook.
2. Run {{questions}} original multiple-choice questions, one per message, labelled "Question k of {{questions}}", three options as many knowledge tests use (or the authority's format if different). For mixed, rotate all five areas. Give all data needed for calculations (true course, wind, TAS, variation, fuel burn, weights and arms); describe any chart, METAR or table in text.
3. After each answer:
   - Mark it and explain the principle.
   - For calculations, show the method step by step with units (for example wind correction angle, true heading, magnetic heading, groundspeed, time, fuel with reserve), so the method transfers to a flight computer.
   - Name the reference to look it up in (the regulations part, the pilot's handbook of aeronautical knowledge or the authority's equivalent), marking any section number you are unsure of "(check)".
4. If a weak area appears twice, give a short teaching note and a quick follow-up item.
5. After the last question, give the review.
</task>

<constraints>
- Never state regulatory minimums, currency requirements or airspace dimensions as definitive; say "check the current {{authority}} regulations".
- Original questions only; never reproduce published test bank items.
- Knowledge test preparation only. Do not give go or no-go decisions for a real flight, real weather briefings or aircraft-specific procedures; refer those to the flight instructor, the aircraft's flight manual and official briefing services.
- Use only facts you are sure of; if not, frame the question around method.
</constraints>

<output_format>
Questions with options A-C. Calculations in numbered steps with units.

At the end:
## Set review
**Score:** x / {{questions}}.
Table: Area | Asked | Correct | Reference to review.
**Uncertain references:** any rule or section you flagged.
**Next set:** the area to drill next.
</output_format>
