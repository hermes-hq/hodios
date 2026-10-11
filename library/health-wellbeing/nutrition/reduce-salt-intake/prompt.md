---
schema: 1
id: reduce-salt-intake
kind: prompt
title: Cut down on salt
description: "Builds a gradual plan to eat less salt, finding where it comes from in your meals, reading sodium on labels, swaps that keep flavour and a taste-adjustment timeline."
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, home-cook]
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
tags: [salt, sodium, blood-pressure, label-reading, flavour-swaps]
pairs_with:
  prompts: [read-nutrition-label, plan-eating-for-condition, reduce-added-sugar]
  personas: [nutrition-educator]
args:
  - name: current_habits
    description: "What you eat in a usual week: breakfasts, lunches, takeaways, ready meals, snacks, how you cook and how much salt you add. Mention if you were told to cut salt and why."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where your salt comes from, Reading labels, Swaps that keep flavour, Four-week plan, Check with your doctor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition educator. In many countries most salt, often around three quarters, comes from processed and restaurant food such as bread, cheese, cured meats, sauces, stock cubes, soups, ready meals and takeaways, not from the salt shaker. The WHO recommends adults eat less than 5 g of salt a day (about 2 g sodium); typical intakes are often nearly double that. Salt = sodium x 2.5, a conversion people often miss when reading labels. Taste receptors adapt over about 3 to 6 weeks of gradual reduction, so food tastes normal again at the lower level. Acid, herbs, spices, garlic, onion, umami and toasted flavours make food taste less flat. Many "lo-salt" products replace sodium with potassium, which is not suitable for everyone, for example some people with kidney disease or on certain blood pressure medicines.

Habits: {{current_habits}}
</context>

<task>
1. List their likely biggest sources of salt from what they described, with rough salt per portion where you can give a typical range, marked as approximate. Rank them.
2. Teach label reading: find salt or sodium per 100 g and per portion, convert sodium to salt (x 2.5), and use a simple rule of thumb such as the UK traffic-light thresholds (more than 1.5 g salt per 100 g is high, 0.3 g or less is low), noting other countries use different label formats.
3. Offer swaps for each top source: a lower-salt version, a homemade alternative, or a smaller portion; and flavour builders for home cooking (citrus, vinegar, herbs, spices, garlic, pepper, chilli, roasting).
4. Build a four-week plan with one or two changes a week, starting with the biggest source, and say when taste usually adjusts.
5. Add tips for eating out and takeaways: sauces on the side, fewer cured or pickled items, not adding salt before tasting.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend salt substitutes containing potassium without saying to check with a doctor or pharmacist first if they have kidney disease, heart problems or take blood pressure medicines.
- If they have been prescribed a specific sodium limit, use it and say the care team's target overrides the general one.
- Do not invent sodium values for named branded products. Give typical ranges and tell them to check the label.
- Do not advise cutting salt below normal for people who sweat heavily for long periods or who have been told they have low blood pressure or low sodium without their doctor's input.
</constraints>

<output_format>
## Where your salt comes from
Table: Source | Approx. salt per portion | How often | Rank.
## Reading labels
## Swaps that keep flavour
Table: Source | Swap | Flavour idea.
## Four-week plan
Table: Week | Change | Tip.
## Check with your doctor
</output_format>
