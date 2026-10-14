---
schema: 1
id: write-ranking-prompt
kind: prompt
title: Write a ranking prompt
description: Writes a prompt that scores and ranks a list of items such as leads, applications, ideas or tickets against weighted criteria, with evidence per score, tie rules and checks for order bias.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [design, build]
role: [product-manager, sales-rep, operations-manager, recruiter]
requires: [none]
inputs: [text, dataset]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [scoring-rubric, weighted-criteria, position-bias, reusable-prompt]
pairs_with:
  prompts: [write-judge-prompt, write-classification-prompt, rank-options-pairwise]
  personas: [prompt-engineer]
args:
  - name: items
    description: What will be ranked, how many at a time and what each item looks like, for example "40 inbound leads per week, each a form submission plus company size".
    type: text
    required: true
  - name: criteria
    description: What makes an item rank higher, in your own words, and which matters most. The prompt will turn this into a scored rubric.
    type: text
    required: true
  - name: use
    description: Optional - what happens to the top and bottom of the list, and who checks it.
    type: text
output_contract:
  format: markdown
  sections: [Rubric, Prompt, Bias checks, Calibration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that rank lists. Asked to "rank these by priority", assistants produce a confident order that is hard to trust: it shifts when the list is reordered (items near the start or end get favoured), longer or better-written items score higher regardless of substance, scores cluster in the middle so nothing is distinguished, the stated criteria are quietly replaced by the model's own idea of quality, and ties are broken at random. Ranking is more reliable when each item is scored on its own against a written rubric (anchored levels per criterion, explicit weights), with the evidence for each score quoted from the item, a rule for missing information, and the order computed from the scores rather than asked for directly. Running a second pass with the list shuffled shows how stable the result is.

Items: {{items}}

Criteria: {{criteria}}
{{#use}}

Use: {{use}}
{{/use}}
</context>

<task>
1. Build the rubric: three to six criteria from the user's description, each with a definition, a 1-to-5 scale with an anchor description for 1, 3 and 5, a weight, and how to score when information is missing (a stated default, not a guess). Add any hard filter (for example "outside our country: exclude") as a pass or fail gate before scoring. Ask up to three questions if the criteria or weights cannot be inferred.
2. Write the prompt: score each item independently against the rubric, quote or cite the item text that justifies each score, mark "insufficient information" where relevant, compute the weighted total, and return a table sorted by total with a tie rule (for example higher score on the top-weighted criterion, then flag for a human). The prompt forbids rewarding length, style or tone unless they are criteria.
3. Bias checks: run the same list twice in different orders and compare ranks; check whether scores correlate with item length; check that score spread uses the scale; and for any ranking of people, check for proxies of protected characteristics (names, photos, age signals, gaps in employment) and remove them from the input before scoring.
4. Calibration: score ten items a person has already ranked, compare, adjust anchors or weights where they disagree, and decide what share of rankings a person reviews.
</task>

<constraints>
- When the items are people (job applicants, tenants, students), the prompt is a screening aid only: a person makes and owns every decision, protected characteristics and their proxies are excluded from the input, and the user is reminded that automated decision rules in hiring, lending and housing vary by country and may require disclosure or human review.
- Do not invent weights silently; show and justify them.
- Model-agnostic; for long lists, recommend scoring in batches with the same rubric and merging by score.
</constraints>

<output_format>
## Rubric
Table: Criterion | Weight | 1 | 3 | 5 | If missing.
## Prompt
In a fenced code block with [RUBRIC] and [ITEMS] placeholders.
## Bias checks
Numbered checks.
## Calibration
Short steps.
</output_format>
