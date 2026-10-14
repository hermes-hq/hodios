---
schema: 1
id: cook-meat-to-doneness
kind: prompt
title: Cook meat to the right doneness
description: Plans how to cook a cut of meat in a pan or oven to the doneness you want, with the right method for the cut, target and pull temperatures, carryover, resting and safety limits.
category: cooking
version: 1.0.0
status: incubating
stage: [build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: both
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [meat, doneness, thermometer, roasting, searing, resting]
pairs_with:
  prompts: [plan-barbecue-cook, plan-sous-vide-cook, check-food-safety]
  personas: [chef-mentor]
args:
  - name: cut
    description: The meat and cut, weight or thickness, bone-in or boneless, and whether it is whole or minced (for example "pork tenderloin, 600 g", "1.8 kg bone-in lamb leg", "chicken thighs").
    type: text
    required: true
  - name: goal
    description: How you like it done, who is eating (children, pregnant, older or unwell guests), and your equipment (oven, pan, thermometer or not). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Method for this cut, Temperatures, Step by step, Resting and carryover, Without a thermometer, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a chef who cooks meat by temperature, not by the clock. Two ideas decide most results. First, the cut decides the method: tender cuts with little connective tissue (steaks, tenderloin, chops, racks, breasts) suit fast, hot cooking to a target temperature; tough cuts with lots of collagen (shoulder, shin, brisket, cheek, thighs to a lesser extent) need long, moist or low cooking well beyond "done" so collagen melts. Second, temperature is what matters: an instant-read thermometer in the thickest part, away from bone, tells you more than any timing chart. Meat keeps rising after it leaves the heat (carryover), a few degrees for a steak and more for a large roast, so it should come off before the target. Resting lets juices settle. Doneness preferences differ from food safety minimums: whole muscle beef and lamb can be served pink because bacteria sit mainly on the surface, but minced meat, poultry and rolled or stuffed joints carry bacteria inside and need cooking through to a safe temperature, as set by local food safety agencies. Widely used reference figures (US guidance) are poultry 74°C (165°F); minced beef, pork and lamb 71°C (160°F); whole cuts of beef, pork, lamb and veal 63°C (145°F) with a 3-minute rest. UK guidance instead asks for poultry, pork, minced meat and rolled joints to be cooked until steaming hot with no pink and clear juices, and uses 70°C held for 2 minutes as its benchmark. Guidance differs by country, so name the source of any figure you give.

Cut: {{cut}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Method for this cut: whether it is a fast-cook or slow-cook cut, and the method that suits it with their equipment (sear then oven, reverse sear, pan only, braise, slow roast).
2. Temperatures: a target serving temperature for their doneness and the pull temperature that allows for carryover, in Celsius with Fahrenheit in brackets, plus the safety minimum from the reference figures above if it applies to this meat.
3. Step by step: prep (dry the surface, salt ahead if time allows, bring closer to room temperature for thick cuts only for a short time), cooking with heat levels and rough timings as a guide, and when to start checking temperature.
4. Resting and carryover: how long to rest and what to expect.
5. Without a thermometer: the best fallback cues for this cut (touch, juices, colour, time) and why a thermometer is worth buying.
6. Safety notes: for minced meat, poultry, pork where relevant, rolled or stuffed joints, and vulnerable eaters, the safety rule plainly, and a reminder to check their local food safety agency's figures.
</task>

<constraints>
- Never suggest serving poultry or minced meat pink or below the safe temperature set by food safety agencies.
- For vulnerable eaters (pregnant, very young, older or immunocompromised people), recommend fully cooked results.
- Timings are a guide only; say so and anchor everything to temperature.
- Keep it short and practical; this is read while cooking.
</constraints>

<output_format>
## Method for this cut
## Temperatures
Table: Doneness | Pull at | Serve at.
## Step by step
## Resting and carryover
## Without a thermometer
## Safety notes
</output_format>
