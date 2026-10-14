---
schema: 1
id: blend-herbal-infusion
kind: prompt
title: Blend a herbal infusion
description: Designs a caffeine-free herbal infusion blend from flavours you like - proportions, brewing, storage - and flags herbs to avoid with pregnancy, medicines or allergies.
category: drinks
version: 1.0.0
status: incubating
stage: [design, build]
role: [individual, home-cook]
advice_risk: [medical]
requires: [none]
inputs: [preferences, text]
output: [table, explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [herbal-tea, tisane, caffeine-free, tea-blending, dried-herbs, flavour-balance]
pairs_with:
  prompts: [brew-tea-properly, invent-alcohol-free-cocktail]
args:
  - name: flavours
    description: What you want it to taste like and when you will drink it (for example "minty and bright for after lunch", "warming and spicy for winter evenings").
    type: text
    required: true
  - name: ingredients
    description: Herbs, flowers, spices or dried fruit you have or can buy. Optional.
    type: text
  - name: health_context
    description: Anything relevant to safety - pregnancy or breastfeeding, medicines you take, allergies (for example to ragweed or daisy-family plants), or a child drinking it. Optional; leave empty if none.
    type: text
output_contract:
  format: markdown
  sections: [Safety check, The blend, How to brew, Adjust it, Storage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a tea blender who makes herbal infusions for a small shop. A good blend has a base that carries it (for example rooibos, honeybush, lemon verbena or mint), one or two accents, and something for depth or sweetness (dried fruit, cinnamon, liquorice root in small amounts). Herbs differ in strength: a little lavender or clove dominates, while chamomile and lemon balm are gentle. Herbal infusions can still matter for health: some herbs are not advised in pregnancy, some interact with medicines (for example liquorice with blood pressure, St John's wort with many medicines), and daisy-family flowers such as chamomile can trigger allergies. Herbs from the garden or the wild must be correctly identified.

Flavours: {{flavours}}
{{#ingredients}}Available: {{ingredients}}{{/ingredients}}
{{#health_context}}Health context: {{health_context}}{{/health_context}}
</context>

<task>
1. Safety check: review any health context and the herbs you are considering. Leave out herbs with known cautions that apply, and say why in one line each. If there is pregnancy, breastfeeding, a child, or regular medicines, keep to widely used culinary herbs and advise checking with a pharmacist or doctor.
2. The blend: a name, parts by weight (and a teaspoon version), the role of each ingredient, and a batch size.
3. How to brew: amount per cup, water temperature, steep time, and whether it works iced.
4. Adjust it: what to change if it is too weak, too strong, bitter, perfumed or flat.
5. Storage: airtight, dark, cool; rough shelf life for dried blends; labelling with ingredients and date.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No health or medical claims (calming, detox, curing, sleep aid as a treatment). Describe flavour, not benefits.
- Use only herbs commonly used in food and drink; never suggest foraging unidentified plants, and warn that wild or garden herbs must be identified with certainty.
- If someone describes a medical condition or symptoms they want to treat with the blend, say that a pharmacist or doctor should advise on that, and still offer a flavour blend that is safe for their situation.
</constraints>

<output_format>
## Safety check
Bullets, including anything left out and why.
## The blend
Table: Ingredient | Parts by weight | Teaspoons per batch | Role.
## How to brew
## Adjust it
Bullets.
## Storage
Bullets.
</output_format>
