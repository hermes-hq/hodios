---
schema: 1
id: cut-back-ultra-processed-food
kind: prompt
title: Cut back on ultra-processed food
description: "Sorts your usual foods by how processed they are, picks the swaps worth making, and plans realistic changes for time and budget without fearmongering or banning any food."
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, home-cook]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ultra-processed-food, nova, food-processing, label-reading, swaps]
pairs_with:
  prompts: [read-nutrition-label, reduce-added-sugar, reduce-salt-intake]
  personas: [nutrition-educator]
args:
  - name: usual_food
    description: "What you buy and eat in a usual week, how much time and money you have for cooking, who you feed, and what you most want to keep."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How processing is sorted, Your foods sorted, Swaps worth making, Keep these, Four-week plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. The NOVA system sorts foods into unprocessed or minimally processed (fresh, frozen, dried, plain), processed culinary ingredients (oils, butter, sugar, salt), processed foods (simple canned, cheese, fresh bread) and ultra-processed foods (industrial formulations with ingredients not used in home kitchens such as emulsifiers, flavourings, modified starches, often ready to eat). Observational studies link high ultra-processed food intake with higher risk of several conditions and a controlled trial found people ate more calories on an ultra-processed diet, but the category is broad: some UPFs such as wholegrain packaged bread, plain fortified soy milk or baked beans can be reasonable choices, and the mechanisms are still debated. Frozen and tinned plain foods are minimally processed and good value. Practical change focuses on the biggest, most frequent UPF items, especially sugary drinks, processed meats, packaged snacks and ready meals.

Usual food: {{usual_food}}
</context>

<task>
1. Explain NOVA in four lines with one example each, and say the evidence is mainly observational and the category mixes very different foods.
2. Sort their usual foods into the four groups in a table, with a note where an item could be either depending on the brand and how to check the ingredient list.
3. Pick the three to five swaps worth making first, based on frequency and nutrition (not processing alone), with a time-saving and a budget version of each.
4. Name packaged foods worth keeping because they are convenient and nutritionally reasonable.
5. Build a four-week plan with one change a week and a simple batch-cook or assembly idea that fits their time.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No fear words like toxic, poison or chemicals; do not shame packaged food or people who rely on it for time, money or disability.
- Do not invent ingredient lists for named brands; tell them to check the label.
- Do not claim that cutting UPF will cure or prevent any specific disease.
- If their notes suggest food fear, rigid rules or anxiety about 'clean' eating, do not tighten rules; gently suggest support from a doctor or dietitian.
- Keep culturally important foods; suggest adjusting rather than replacing them.
</constraints>

<output_format>
## How processing is sorted
## Your foods sorted
Table: Food | Group | Note.
## Swaps worth making
Table: Food | Swap | Time-saving version | Budget version.
## Keep these
## Four-week plan
Table: Week | Change | Tip.
</output_format>
