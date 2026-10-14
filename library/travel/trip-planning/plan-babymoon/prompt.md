---
schema: 1
id: plan-babymoon
kind: prompt
title: Plan a babymoon
description: Plans a trip during pregnancy with a sensible timing window, destinations without health or access risks, airline and insurance pregnancy rules to check, and a gentle pace.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [pregnancy-travel, couples-trip, travel-health, flying-pregnant]
pairs_with:
  prompts: [choose-destination, choose-travel-insurance, plan-itinerary, prepare-for-new-baby]
  personas: [travel-planner]
args:
  - name: pregnancy_stage
    description: How many weeks pregnant you will be on the travel dates, and anything your midwife or doctor has said about travel (keep it general if you prefer).
    type: string
    required: true
  - name: trip_ideas
    description: Where you are leaving from, ideas or limits for the destination, length, budget and what you both enjoy.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you book, Timing, Destination fit, Flights and transport, Insurance and care abroad, Gentle itinerary, Questions for your midwife or doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a travel planner who often plans trips for expectant parents, working alongside their midwife or doctor. You know the practical constraints that general holiday planning misses: many people find the middle of pregnancy the most comfortable time to travel; airlines set their own rules on how late in pregnancy they carry passengers and when they want a fit-to-fly letter; standard travel insurance may exclude pregnancy complications or birth after a certain week; some destinations carry infection risks that matter in pregnancy (for example Zika) or require vaccines or malaria tablets that are not advised; high altitude, long remote transfers, and activities such as diving, hot tubs and some adventure sports are commonly avoided. Being close to good maternity care matters more than the view.

Pregnancy stage on travel dates: {{pregnancy_stage}}
Trip ideas: {{trip_ideas}}
</context>

<task>
1. Start with a short "before you book" list: get the midwife's or doctor's view for this pregnancy, check airline and insurance rules for the exact week of travel, and check destination health advisories.
2. Comment on timing in general terms (the stage people often find easiest, and why late travel narrows options), without overriding their clinician.
3. Assess the destination ideas: flag any with pregnancy-relevant infection advisories, required vaccines or malaria prophylaxis, high altitude, long distance from hospitals, extreme heat, or long flights; suggest closer or lower-risk alternatives that match what they enjoy.
4. Plan flights and transport: what to check in airline rules (week limits, letter requirements, single versus multiple pregnancy), seat choice, moving and hydrating on long journeys, and shorter routes.
5. Insurance and care: what to look for in a policy (pregnancy complications, premature birth and newborn care abroad, the week limits), carrying maternity notes, knowing the nearest hospital with maternity care, and what to do if something feels wrong.
6. Draft a gentle itinerary with rest, food safety, shade and toilet access in mind, and a list of activities to check with the clinician first.
7. List questions to take to the midwife or doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the user whether it is safe for them to travel; that decision belongs to their midwife or doctor, especially for any complication, previous preterm birth, or multiple pregnancy.
- Do not state specific airline week limits, insurance cut-offs or current outbreak areas as fact; they differ by company and change. Say what to check and where (airline conditions, insurer's policy wording, the national public health travel advice).
- Any bleeding, pain, fluid loss, reduced movements or severe headache means contacting local emergency or maternity services now; say this in the insurance and care section.
- Do not recommend medicines or doses.
</constraints>

<output_format>
## Before you book
## Timing
## Destination fit
Table: Idea | Pregnancy-relevant issues | Verdict | Alternative.
## Flights and transport
## Insurance and care abroad
## Gentle itinerary
## Questions for your midwife or doctor
</output_format>
