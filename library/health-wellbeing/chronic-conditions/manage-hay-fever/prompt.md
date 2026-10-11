---
schema: 1
id: manage-hay-fever
kind: prompt
title: Manage hay fever through the season
description: Builds a hay fever plan for the pollen season - which pollens and months matter, home and outdoor measures, treatment types to discuss with a pharmacist, and when to see a doctor.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [hay-fever, pollen, allergic-rhinitis, seasonal-allergies, antihistamines, allergy-season]
pairs_with:
  prompts: [reduce-dust-and-allergens, build-symptom-log, prepare-pharmacist-consultation]
  personas: [pharmacist-educator]
args:
  - name: symptoms
    description: Symptoms (sneezing, blocked or runny nose, itchy eyes, cough, wheeze), which months they are worst, how much they affect sleep, work or school, and who it is for (adult or child, age).
    type: text
    required: true
  - name: current
    description: What you already use or have tried, other conditions such as asthma, pregnancy or breastfeeding, other medicines, and your country or region. Optional.
    type: text
output_contract:
  format: markdown
  sections: [See a doctor first if, Your likely pollen season, Season timeline, Treatments to discuss with a pharmacist, Cutting your exposure, Symptom and pollen log, When to go back for help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get through hay fever season with a plan rather than reacting each time symptoms flare. What experienced pharmacists know: symptoms track specific pollens, so knowing which months are worst tells you which pollen is likely (in many temperate places trees in spring, grasses in early summer, weeds in late summer, but this varies by region and year). Preventive treatments such as steroid nasal sprays work best when started a couple of weeks before the person's usual season and used every day, not only on bad days, and correct spray technique (aiming away from the middle of the nose) changes how well they work and reduces nosebleeds. Non-drowsy antihistamines suit most daytime use; eye drops help itchy eyes that tablets miss. Exposure reduction matters: pollen counts are usually highest on warm, dry, windy days and in early morning and evening; showering and changing after being outdoors, keeping windows shut on high-count days, wraparound sunglasses, drying laundry indoors and a pollen filter in the car all help. Hay fever and asthma are linked, and some regions see thunderstorm-related asthma on high-pollen stormy days.

Symptoms: {{symptoms}}
{{#current}}Current situation: {{current}}{{/current}}
</context>

<task>
1. Check first for red flags that need a doctor rather than a self-care plan: wheeze, chest tightness or breathlessness; symptoms on one side only, nosebleeds or blood; symptoms all year rather than seasonal; severe symptoms not controlled by pharmacy treatments; a young child, pregnancy or breastfeeding (needs a pharmacist or doctor to choose treatment). If breathing is hard now, tell them to seek urgent care first.
2. From the months they give, name the likely pollen type with the caveat that it varies by region, and suggest checking a local pollen forecast daily during the season.
3. Build a season timeline: when to start preventive treatment (before the usual onset), daily routine in season, and when to stop.
4. List treatment types to discuss with a pharmacist (steroid nasal spray, non-drowsy antihistamine, antihistamine or other eye drops, saline rinse), what each helps, how to use a nasal spray properly, and what to tell the pharmacist (other medicines, conditions, pregnancy, driving or exams). Note that decongestant nasal sprays are for a few days only, because longer use can cause rebound blocking. Do not give brands or doses.
5. Give exposure measures for home, outdoors, travel and sleep, matched to their life (commute, sport, gardening, pets).
6. Add a short symptom and pollen log they can keep, and when to see a doctor: not controlled after trying pharmacy options correctly, asthma symptoms, or wanting to discuss prescription options or allergen immunotherapy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose. Seasonal symptoms are consistent with hay fever, but other causes exist; say a doctor or pharmacist confirms it.
- No medicine names with doses, no brand recommendations, and no advice to combine products without a pharmacist.
- For children, pregnancy, breastfeeding, glaucoma, high blood pressure or heart conditions, say treatment choice needs a pharmacist or doctor.
- Do not invent local pollen counts or season dates.
{{> output/uncertainty}}
</constraints>

<output_format>
## See a doctor first if
## Your likely pollen season
## Season timeline
## Treatments to discuss with a pharmacist
## Cutting your exposure
## Symptom and pollen log
## When to go back for help
</output_format>
