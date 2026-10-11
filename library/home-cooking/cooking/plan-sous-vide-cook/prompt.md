---
schema: 1
id: plan-sous-vide-cook
kind: prompt
title: Plan a sous vide cook
description: Plans a sous vide cook for meat, fish, eggs or vegetables, with temperature for the texture you want, time for the thickness, bagging, holding or chilling, the sear and food safety limits.
category: cooking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sous-vide, precision-cooking, searing, food-safety, meal-timing]
pairs_with:
  prompts: [check-food-safety, plan-dinner-party-menu, teach-cooking-technique]
  personas: [chef-mentor]
args:
  - name: food
    description: What you are cooking, the cut, thickness, weight and whether it starts fresh or frozen (for example "two ribeye steaks, 4 cm thick, fresh").
    type: text
    required: true
  - name: goal
    description: The texture you want, when you want to eat, and who is eating (for example "medium-rare, dinner at 7pm, one guest is pregnant"). Optional.
    type: text
  - name: equipment
    description: Your circulator or water oven, bags (zip-top, vacuum sealer, reusable silicone), container size, and what you will sear with. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Temperature and time, Timeline, Bagging, Finishing, Safety notes, If plans change]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan sous vide cooks the way a chef who runs a water bath every service would. Temperature sets the final doneness; time depends mostly on thickness, not weight, because heat has to reach the centre, and then food must be held long enough for safety when it is cooked below standard "safe" temperatures. Below about 54°C (130°F) food should not be held for more than a few hours in total, because pathogens can grow; well-made tables of time at temperature for pasteurisation exist for poultry and meat, and the cook should follow a reputable published table rather than a guess. Long holds change texture: a tender steak goes soft and mealy after many hours, while tough cuts such as short rib need a day or more. Fish cooks fast and is delicate. Bags float when air is trapped; the water displacement method works for zip-top bags. A hard sear on very dry surfaces, quickly, keeps the inside at the right doneness; a short ice bath first can help with thin cuts. Cook-chill (cook, ice-bath fast, refrigerate, reheat in the bath) is a powerful make-ahead method but needs rapid chilling.

Food: {{food}}
{{#goal}}Goal: {{goal}}{{/goal}}
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
</context>

<task>
1. Temperature and time: the water temperature for the texture they want, a minimum time for the thickness and a maximum before texture suffers, with one line on why. For poultry, pork or anything served to vulnerable people, give a time-at-temperature that reaches pasteurisation and tell them to confirm it against a published table.
2. Timeline: a clock-time plan back from serving (preheat, bag, cook window, rest, sear, serve), including a frozen-start adjustment if relevant.
3. Bagging: seasoning (and what to avoid, such as raw garlic over long cooks or a lot of alcohol), fat, bag type, removing air, keeping bags submerged.
4. Finishing: drying, sear method and time, sauce from bag juices (bring to a boil first), resting.
5. Safety notes: the limits on low-temperature, long holds, who should avoid lightly cooked foods (pregnant, very young, older or immunocompromised people), and cook-chill handling if used.
6. If plans change: how long it can stay in the bath, and how to chill and reheat.
</task>

<constraints>
- Never suggest holding food below 54°C (130°F) for more than a short cook (a few hours at most), or cooking poultry below a temperature without stating the pasteurisation time requirement.
- Give temperatures in Celsius with Fahrenheit in brackets.
- Do not invent precise pasteurisation figures beyond well-established values; direct them to a reputable published table for confirmation.
- For vulnerable eaters, default to fully cooked results.
- Keep times as ranges where texture is a matter of taste.
</constraints>

<output_format>
## Temperature and time
## Timeline
Table: Clock time | Step.
## Bagging
## Finishing
## Safety notes
## If plans change
</output_format>
