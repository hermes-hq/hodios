---
schema: 1
id: eat-well-while-travelling
kind: prompt
title: Eat well while travelling
description: Plans eating for a business trip, holiday or long drive across airports, hotels and road stops, with packable foods, simple rules, food and water safety, and what to check before you go.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [business-travel, travel-eating, packable-snacks, food-safety, hotel-eating]
pairs_with:
  prompts: [order-healthily-when-eating-out, plan-hydration, plan-filling-snacks, beat-jet-lag]
  personas: [nutrition-educator]
args:
  - name: trip
    description: "Where and how you are travelling (flights, long drives, trains), how many days, accommodation (hotel, kitchen or not), work dinners or events, and time zones crossed."
    type: text
    required: true
  - name: needs
    description: "Your goals and needs: eating pattern, allergies, a condition such as diabetes, budget, and what usually goes wrong for you when travelling."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your trip at a glance, Simple rules for this trip, Pack list, Choices by situation, Food and water safety, Check before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help travellers eat reasonably well without turning a trip into a project. Travel rarely goes wrong at one meal; it goes wrong through long gaps followed by large meals, grazing in airports out of boredom, oversized hotel breakfasts, alcohol at work events, sitting for hours, low fluid intake on planes (cabin air is very dry), and constipation from changed routine. What works is a few simple rules set in advance, a small stash of packable food (nuts, fruit that travels, oat pots, wholegrain crackers, canned or pouched fish, roasted chickpeas, nut butter sachets), and using supermarkets and hotel breakfasts deliberately. Practical limits differ by country and change: airport security rules on liquids and soft foods, and customs restrictions on bringing fresh fruit, meat, dairy or plants across borders. In places where tap water or food hygiene is a concern, the traveller's rule is to drink safe water and eat food that is freshly cooked and hot, or that they can peel themselves. People with allergies, coeliac disease or diabetes need extra planning for delays and for communicating needs in another language.

Trip: {{trip}}
Needs: {{needs}}
</context>

<task>
1. Summarise the trip and the moments most likely to derail eating (long transit days, events, no kitchen).
2. Set three to five simple rules for this trip, fitted to their goals and what usually goes wrong (for example "protein at hotel breakfast", "one planned treat a day", "water between alcoholic drinks").
3. Write a pack list of foods and kit that suit the trip length and border crossings, flagging items that may not be allowed through security or customs and to check.
4. For each situation on this trip (travel days, airport, train or road stops, hotel breakfast, work dinners, days without a kitchen), give what to look for, two or three good choices and a fallback if plans change. Give choices, not a fixed meal schedule.
5. Add food and water safety notes for the destination type, without claiming specific local conditions you do not know.
6. Cover their needs: allergy cards in the local language, carrying medicines and hypo treatments in hand luggage for diabetes, coeliac-safe staples, and adjusting meal timing across time zones.
7. List what to check before going.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state specific airport liquid limits, customs rules or tap-water safety for a named country as fact; tell them to check the official airline, airport or government travel advice.
- For diabetes on insulin or other glucose-lowering medicine, do not advise on dose adjustments across time zones; tell them to agree a plan with their diabetes team before travelling.
- For severe allergies, remind them to carry their prescribed emergency medicine and an allergy action plan, and not to rely on staff assurances alone.
- Keep it light and flexible: enjoying local food is part of travel. No guilt or compensation rules.
- Do not invent restaurant, chain or product names at the destination.
</constraints>

<output_format>
## Your trip at a glance
## Simple rules for this trip
## Pack list
Checklist, with items to check against security or customs rules marked.
## Choices by situation
Table: Situation | What to look for | Good choices | Fallback.
## Food and water safety
## Check before you go
</output_format>
