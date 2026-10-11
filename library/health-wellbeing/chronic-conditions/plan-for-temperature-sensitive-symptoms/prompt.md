---
schema: 1
id: plan-for-temperature-sensitive-symptoms
kind: prompt
title: Plan for temperature-sensitive symptoms
description: Builds a seasonal plan for a long-term condition that worsens in heat, cold, sun or sudden changes, with cooling or warming strategies, home and outing set-up, and warning signs to act on.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [heat-sensitivity, cold-sensitivity, heatwave, raynauds, multiple-sclerosis, seasonal-planning]
pairs_with:
  prompts: [plan-flare-day-logistics, plan-activity-pacing, explore-flare-triggers]
args:
  - name: condition
    description: Your condition and how temperature affects you (for example "symptoms get worse in hot showers and summer", "fingers go white and numb in the cold", "dizzier in the heat"), and anything your care team has told you about it.
    type: text
    required: true
  - name: setting
    description: Your climate and season ahead, home (heating, cooling, which rooms get hot), work or school, how you get around, and what you have tried. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get help now if, What your team has said, Your seasonal plan, At home, Going out and at work, Medicines and temperature, Questions for your team]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people plan around conditions that react to temperature. Many people with MS find symptoms temporarily worsen when their body temperature rises (a hot bath, exercise, fever, summer) and ease when they cool down; people with POTS or other dysautonomia often feel worse in heat because blood vessels widen; people with Raynaud's react to cold and to sudden changes, and keeping the whole body warm protects the hands and feet, not just gloves; lupus and some medicines make skin sensitive to sun; many people with arthritis or fibromyalgia report more stiffness and pain in cold or damp. Some medicines (for example some diuretics, blood pressure and mental health medicines) can affect how the body handles heat, which is a question for a pharmacist. Planning ahead works better than reacting: pre-cooling before going out, a cool room, cooling vests or neck wraps, timing activity to cooler parts of the day, layered warmth, warming up gradually rather than with very hot water. Heatwaves and cold snaps also raise costs and risks for people who are less mobile.

<condition>
{{condition}}
</condition>
{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}
</context>

<task>
1. Get help now if: signs of heat exhaustion or heat stroke, hypothermia, or condition-specific warnings (for example a Raynaud's attack that does not recover, an ulcer or colour change that stays, new symptoms that do not settle once cool). Say clearly that temperature-related worsening that does not reverse, or any new neurological symptom, needs medical advice.
2. What your team has said: copy any advice given. Mark gaps as "[ask your team]".
3. Your seasonal plan: a short plan for the season ahead, with an "alert" version for heatwave or cold-snap days (check forecasts, cancel or move plans, who checks on them).
4. At home: room choice, cooling or warming options at different costs, bathing and shower temperatures, bedding, keeping drinks and supplies at hand, and practical money-saving ideas if cost is a concern.
5. Going out and at work: pre-cooling or warming before leaving, what to carry, timing trips, transport, and adjustments to ask for at work or school (desk away from windows or heaters, fan, flexible hours).
6. Medicines and temperature: storage questions (some medicines and devices must be kept within a range) and whether any of their medicines affect heat tolerance, both as questions for the pharmacist.
7. Questions for your team.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell them a symptom is "just the heat" or "just the cold"; temperature-linked worsening is common but new or lasting symptoms need checking.
- Never suggest stopping or changing a medicine because of the weather.
- Do not suggest extreme cooling or warming methods (ice baths, very hot water on numb skin, heaters near beds).
- Give options at several price points; do not assume air conditioning or good heating.
</constraints>

<output_format>
## Get help now if
## What your team has said
## Your seasonal plan
Normal days and alert days.
## At home
## Going out and at work
## Medicines and temperature
## Questions for your team
</output_format>
