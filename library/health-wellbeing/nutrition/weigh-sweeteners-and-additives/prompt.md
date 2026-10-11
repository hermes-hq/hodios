---
schema: 1
id: weigh-sweeteners-and-additives
kind: prompt
title: Weigh up sweeteners and additives
description: Explains the evidence on the sweeteners and additives you actually consume, puts your intake in context of safety limits, and says whether a change is worth making.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [explanation, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [sweeteners, additives, diet-drinks, food-safety, evidence-check]
pairs_with:
  prompts: [read-nutrition-label, reduce-added-sugar, check-health-claim, cut-back-ultra-processed-food]
  personas: [nutrition-educator]
args:
  - name: intake
    description: "What you consume and how often, for example \"4 cans of diet cola a day\", \"sweetener in 6 coffees\", \"sugar-free gum all day\", \"protein bars with sucralose\". Name the sweetener or additive if you know it."
    type: text
    required: true
  - name: concern
    description: "What worries you or what you heard, plus your weight and anything relevant such as pregnancy, diabetes, IBS or phenylketonuria. Optional."
    type: text
output_contract:
  format: markdown
  sections: [What you consume, What the evidence says, Your intake in context, Is a change worth it, Ask a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain food additive evidence calmly and accurately. Regulators such as JECFA (the joint FAO/WHO committee), EFSA and the US FDA set an acceptable daily intake (ADI) per kg of body weight, normally about 100 times below the highest dose that caused no effect in studies, and typical intakes sit well below it. Two different questions get mixed up: hazard (could something cause harm at some dose) and risk (does it at the amounts people eat). In 2023 the WHO cancer agency classed aspartame as "possibly carcinogenic" (its weakest positive category, based on limited evidence) while JECFA kept its ADI of 40 mg per kg; WHO's statement gave the example that a 70 kg adult would need roughly 9 to 14 cans of diet soft drink a day to exceed it, depending on the product. Also in 2023 WHO advised against relying on non-sugar sweeteners for long-term weight control, based on low-certainty evidence, mostly observational associations. Sugar alcohols such as sorbitol, xylitol, mannitol and maltitol cause wind and diarrhoea in larger amounts and count as polyols on a low FODMAP diet; erythritol is better tolerated by most people but can also upset the gut in large amounts. Aspartame contains phenylalanine, which matters for people with phenylketonuria. Evidence on emulsifiers and the gut microbiome is early, mostly animal and small human studies. Amounts of a sweetener in a product are rarely listed on labels.

Intake: {{intake}}
{{#concern}}Concern: {{concern}}{{/concern}}
</context>

<task>
1. List what they consume, the likely sweeteners or additives involved (say "likely" when the product is not named), and how often.
2. For each sweetener or additive: what it is, what it does in the food, its regulatory status in general terms, and the state of the evidence in plain words, separating hazard from risk and strong evidence from early or observational findings.
3. Put their intake in context: where the ADI is known and amounts can be reasonably estimated, compare their likely intake with it and show the arithmetic with every amount marked as an estimate; where the amount is unknown, say so instead of guessing.
4. Answer their concern directly.
5. Say whether a change is worth making and why, weighing the realistic alternative (for example diet drinks against sugary drinks against water), gut symptoms, taste habits and cost. Offer a gradual change if they want one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not call additives "toxic", "poison" or "chemicals" as a scare word, and do not dismiss real findings either. State uncertainty honestly.
- Do not invent study results, numbers, ADIs or product contents. If you are not sure of a figure, say it varies and how to check (the regulator's published ADI, the manufacturer).
- Rules on which additives are approved differ by country; name that and do not claim a product is legal or banned somewhere unless certain.
- Phenylketonuria, pregnancy, children under 3, IBS or other gut conditions, and diabetes management: give the relevant general facts and refer to their doctor or dietitian for personal advice.
- Do not tell them to drink sugary drinks instead "to be natural" without weighing the sugar.
</constraints>

<output_format>
## What you consume
Table: Product | Likely sweetener or additive | How often.
## What the evidence says
One short block per sweetener or additive: what it is, status, evidence strength.
## Your intake in context
Arithmetic where possible, marked as estimates; "unknown" where not.
## Is a change worth it
A clear answer and, if useful, a gradual plan.
## Ask a professional if
</output_format>
