---
schema: 1
id: plan-brine-or-marinade
kind: prompt
title: Plan a brine or marinade
description: Chooses a dry brine, wet brine or marinade for meat, fish or vegetables, with salt by weight, acid limits, timing for the size, safe handling and how to adjust the cook afterwards.
category: cooking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [brining, marinades, salting, flavour-building, meat-prep]
pairs_with:
  prompts: [plan-barbecue-cook, cook-meat-to-doneness, plan-holiday-feast-schedule]
  personas: [chef-mentor]
args:
  - name: food
    description: What you are preparing and how much (for example "a 5 kg turkey", "4 pork chops", "salmon fillets", "chicken wings for 10").
    type: text
    required: true
  - name: plan
    description: When you will cook it, how (grill, roast, fry), the flavours you want, fridge space, and any diet or salt limits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Which method, Recipe, Timing, Handling safely, Cooking afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cook who knows what salt, acid and time actually do. Salt is the ingredient that penetrates: a dry brine (salt rubbed on and left uncovered in the fridge) seasons inside, keeps meat juicier and dries the skin for crisping; a wet brine (salt dissolved in water, often around 5 to 6 percent by weight for a few hours or a lower strength for longer) adds juiciness but can make skin rubbery and meat taste ham-like if overdone, and takes a lot of fridge space. Most marinade flavour stays near the surface; marinades work best on thin cuts and with salt or soy in them. Acid and some fruit enzymes (pineapple, papaya, kiwi) turn the surface mushy if left too long, especially on fish and chicken breast. Table, kosher and sea salts weigh very differently per spoon, so weights are safer than spoons. Pre-brined, kosher-style or "enhanced" meat should not be brined again. Raw marinade carries bacteria and must not be used as a sauce unless boiled.

Food: {{food}}
{{#plan}}Plan: {{plan}}{{/plan}}
</context>

<task>
1. Which method: dry brine, wet brine, marinade or a combination for this food and cooking method, with the reason in two lines.
2. Recipe: exact amounts for their quantity, salt by weight with a spoon equivalent for a named salt type, flavourings, and for marinades the acid share and oil.
3. Timing: minimum and maximum time for this food and size, and what happens if it goes longer.
4. Handling safely: always in the fridge, container or bag size, keeping raw away from other food, not reusing raw marinade unless boiled, and drying before cooking.
5. Cooking afterwards: rinse or not, how to pat dry, reducing added salt in rubs and sauces, adjusting browning if sugar is in the marinade.
</task>

<constraints>
- Give salt by weight first; never give a bare "cup of salt" without the salt type.
- Ask about or warn against brining meat already labelled as brined, enhanced, injected or kosher.
- Keep acid-heavy marinades short for fish, seafood and chicken breast.
- If they mention a low-salt diet or medical salt limit, offer a marinade with little or no added salt and say brining adds sodium.
</constraints>

<output_format>
## Which method
## Recipe
Table: Ingredient | Amount.
## Timing
## Handling safely
## Cooking afterwards
</output_format>
