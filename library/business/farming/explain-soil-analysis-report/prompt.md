---
schema: 1
id: explain-soil-analysis-report
kind: prompt
title: Explain a soil analysis report
description: Explains a farm soil analysis report line by line - pH, P, K, Mg, organic matter, indices - in plain words, what each means for the planned crop and what to ask an agronomist before buying.
category: farming
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, founder, student]
subject: [agriculture]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [soil-analysis, soil-ph, soil-indices, lime, nutrient-management]
pairs_with:
  prompts: [plan-soil-sampling-round, plan-grassland-reseed, triage-crop-symptoms]
args:
  - name: report
    description: The soil report, typed or pasted - lab name, method names, units, each result and any index or rating the lab gives, plus the sampling depth and date if shown.
    type: text
    required: true
  - name: planned_crop
    description: The crop or use planned for the field, for example "grazed grass", "winter wheat", "potatoes", "apple orchard".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [In one paragraph, Line by line, What it means for the crop, Questions for your agronomist, Before you buy anything]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain soil reports to farmers and growers who are new to them. Agronomists know that a soil number means little on its own: it depends on the lab method (phosphorus results from Olsen, Morgan, Mehlich-3 or Bray methods are not comparable), the units (mg/l, mg/kg, ppm), the sampling depth, the soil type and the crop. Many countries convert results into indices or bands (for example a 0-9 index system) with a target for each crop. The common failures: reading a number against the wrong scale, treating pH and lime as an afterthought when it limits everything else, and buying a standard compound fertiliser that the soil does not need.

Planned crop: {{planned_crop}}
<report>
{{report}}
</report>
</context>

<task>
1. Identify the lab method and units for each result if the report shows them. If a method or unit is missing, say how that limits interpretation.
2. Explain each line in plain words: what it measures, what this result means using the lab's own index or rating where given, and whether it is likely low, adequate or high for {{planned_crop}}. When the lab gives no index or rating, say what reference the farmer needs (the lab's interpretation sheet or the local advisory guide) rather than inventing one.
3. pH first: explain that pH controls nutrient availability, that targets differ by crop and soil (for example grassland often lower than arable, and peaty soils lower than mineral soils), and that lime needs a lime requirement figure from the lab or adviser.
4. Organic matter, CEC, texture and any extras: what they tell about the soil's ability to hold nutrients and water.
5. What it means for the crop: the two or three results that matter most for {{planned_crop}} and why.
6. Questions for the agronomist: specific ones that will decide spend (lime rate and product, whether P or K needs building up or just maintaining, whether manure or slurry already supplies it, whether a re-test of a zone is needed).
7. Before you buy anything: what to check (manure analysis, previous applications, recommended rates from the local advisory system).
</task>

<constraints>
- Do not give lime or fertiliser rates or product recommendations; that is the agronomist's job using the local system.
- Do not apply thresholds from one lab method or country to another; say when you are unsure of the scale.
- Never invent results that are not in the report; mark unreadable lines [X].
- If no report is given or it has no results, ask for it and stop.
</constraints>

<output_format>
## In one paragraph
Under 80 words: the headline for this field.
## Line by line
Table: Measure | Result and units | What it measures | What this result suggests.
## What it means for the crop
Bullets.
## Questions for your agronomist
Numbered, at most six.
## Before you buy anything
Checklist.
</output_format>
