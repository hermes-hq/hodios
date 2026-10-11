---
schema: 1
id: follow-low-fodmap-diet
kind: prompt
title: Follow a low FODMAP diet
description: Guides the low FODMAP elimination, reintroduction and personalisation phases advised for IBS, with everyday swaps for your diet and a dose-by-dose reintroduction log.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [low-fodmap, ibs, elimination-diet, food-reintroduction, gut-symptoms]
pairs_with:
  prompts: [build-symptom-log, diversify-plants-for-gut-health, plan-eating-for-condition, increase-fiber-gradually]
  personas: [nutrition-educator]
args:
  - name: situation
    description: "Your diagnosis and who made it, whether coeliac disease was ruled out, whether a dietitian is involved, which phase you are in, your usual meals, eating pattern (vegetarian, halal, dairy-free), and any history of disordered eating."
    type: text
    required: true
  - name: phase_notes
    description: "If you are reintroducing, the foods tested so far, amounts and symptoms. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Before you start, The three phases, Phase one swaps, Reintroduction plan, Reintroduction log, Ask your dietitian]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain the low FODMAP diet as a short, structured test for irritable bowel syndrome, not a lifelong diet. FODMAPs are fermentable carbohydrates in five main groups: fructans (wheat, rye, onion, garlic), galacto-oligosaccharides (beans, lentils, chickpeas), lactose (milk, soft cheeses, yoghurt), excess fructose (honey, apples, mango) and polyols (sorbitol and mannitol in some fruits, mushrooms and sugar-free products). The diet has three phases: (1) restriction for about 2 to 6 weeks; (2) reintroduction, testing one group at a time over about three days with increasing portions and a break between tests; (3) personalisation, keeping only the restrictions that clearly matter, at the level tolerated. Around half to three quarters of people with IBS report improvement. Portion size decides whether many foods are low or high, so an up-to-date FODMAP food guide matters. Useful swaps: garlic-infused oil (fructans do not pass into oil), the green tops of spring onions, lactose-free milk and yoghurt, hard cheeses, rice, oats, potatoes, quinoa, firm tofu, tempeh, and small portions of canned rinsed lentils or chickpeas. Long-term strict restriction reduces fibre and beneficial gut bacteria, and the diet is not suitable for people with an eating disorder history without specialist support. Guidelines advise doing it with a dietitian and after coeliac disease has been excluded.

Situation: {{situation}}
{{#phase_notes}}Reintroduction so far: {{phase_notes}}{{/phase_notes}}
</context>

<task>
1. Check readiness: IBS diagnosed by a clinician, coeliac disease excluded (or the question raised), no red-flag symptoms, ideally a dietitian involved. If something is missing, say so first and what to ask.
2. Explain the three phases briefly, with time limits.
3. For phase one, give swaps for their usual meals and eating pattern, grouped by FODMAP group, with portion notes where portion decides. Keep protein, fibre and calcium covered and note the vegetarian protein challenge if relevant.
4. Give a reintroduction plan: an order of foods to test for each group, a small, medium and larger portion over three days, a two-to-three-day washout on the restricted diet between tests, and how to decide whether a group is tolerated.
5. Provide a reintroduction log table. If they gave reintroduction notes, fill in what they reported and say what the results suggest so far, cautiously.
6. Explain personalisation: bringing back everything tolerated and keeping only the limits that matter.
7. List questions for their dietitian or doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present restriction as permanent or as a weight-loss diet. Stress moving on to reintroduction.
- If coeliac disease has not been tested for, say testing needs gluten in the diet beforehand and should come first.
- If they report blood in stool, weight loss, anaemia, night symptoms, fever, or a new change in bowel habit (especially over about 50), tell them to see a doctor before starting.
- If they have a history of an eating disorder, or are under 18, pregnant or underweight, advise doing this only with a specialist dietitian and give general information only.
- Do not claim exact FODMAP cut-offs for specific foods you are not sure of; say portion thresholds are in an up-to-date FODMAP food guide and vary by product.
</constraints>

<output_format>
## Before you start
## The three phases
## Phase one swaps
Table: Instead of | Try | Note on portion.
## Reintroduction plan
Table: FODMAP group | Test food | Day 1 | Day 2 | Day 3.
## Reintroduction log
Table: Date | Food and portion | Symptoms 0 to 10 | Notes. Filled in where they gave results.
## Ask your dietitian
</output_format>
