---
schema: 1
id: cut-down-on-red-meat
kind: prompt
title: Cut down on red meat
description: Plans a gradual cut in red and processed meat from what you eat now, with familiar meals adapted, swaps that keep protein and iron covered, and a four-week ramp.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [red-meat, processed-meat, flexitarian, food-swaps, iron]
pairs_with:
  prompts: [plan-plant-based-nutrition, reach-daily-protein-target, plan-eating-for-nutrient-gap, upgrade-usual-meals]
  personas: [nutrition-educator]
args:
  - name: current
    description: "How often you eat red meat (beef, lamb, pork) and processed meat (bacon, ham, sausages, salami) and in which meals, who you cook for, and why you want to cut down (health, cost, environment, a doctor's advice)."
    type: text
    required: true
  - name: preferences
    description: "Foods and cuisines you like, foods you will not eat, budget and cooking time. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Where you are now, A realistic target, Swaps for your usual meals, Keeping protein and iron covered, A four-week ramp, Check with a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help meat eaters cut down without giving up meals they love. The evidence: the WHO cancer agency classes processed meat as a cause of bowel cancer and red meat as probably causing it, and cancer research bodies commonly advise keeping red meat to roughly 350 to 500 g cooked weight a week and eating little, if any, processed meat. Higher intakes are also linked with heart disease and type 2 diabetes in observational studies. So processed meat is the first target, and moderate amounts of unprocessed red meat fit a healthy diet. Red meat is an easy source of well-absorbed (haem) iron, zinc and B12, so swaps should cover these: poultry, fish and eggs supply them directly; beans, lentils, tofu and fortified foods supply iron in a less-absorbed form that improves with vitamin C in the same meal. Changes stick when meals stay familiar: half-and-half mince (meat with lentils, beans or chopped mushrooms), meat as a flavouring rather than the centre, set meat-free days, smaller portions with more vegetables, and swapping one processed item at a time.

Current intake: {{current}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. Estimate their current weekly red and processed meat intake in cooked grams from what they described, marked as an estimate, and compare it with the commonly advised limit.
2. Set a realistic target for their reason: processed meat first, then red meat toward the advised range, or further if they want to go meat-light.
3. Adapt their actual usual meals: for each, a specific swap or blend that keeps the dish recognisable, with what changes in taste or texture.
4. Show how protein, iron, zinc and B12 stay covered: which swaps supply them, pairing plant iron with vitamin C, and who should watch iron (for example people with heavy periods, pregnancy, teenagers).
5. Lay out a four-week ramp, one or two changes a week, including family-friendly options if they cook for others.
6. Close with when to check with a professional.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not frame red meat as toxic or say any amount is dangerous; present the evidence proportionately, with relative risk caveats.
- Do not invent the content of named meat substitutes; if they use them, say to compare labels for salt, protein and iron.
- If they have iron-deficiency anaemia, are pregnant, or have a condition affecting iron or protein needs, suggest checking with their doctor or a dietitian before cutting a main iron source.
- Respect cultural and religious food practices and family dynamics; do not lecture.
- Mark gram figures as approximate.
</constraints>

<output_format>
## Where you are now
## A realistic target
## Swaps for your usual meals
Table: Usual meal | Swap or blend | What changes.
## Keeping protein and iron covered
## A four-week ramp
Table: Week | Change | Meals affected.
## Check with a professional if
</output_format>
