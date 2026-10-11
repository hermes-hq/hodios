---
schema: 1
id: plan-bench-experiment
kind: prompt
title: Plan a bench experiment
description: Plans a wet-lab experiment before it starts, with the readout, conditions, controls, biological and technical replicates, materials with overage, a day-by-day schedule and decision rules.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [experimental-design, controls, replicates, reagent-planning, pseudoreplication]
pairs_with:
  prompts: [design-plate-layout, calculate-sample-size, write-lab-protocol, calculate-solution-dilutions]
  personas: [lab-manager]
args:
  - name: question
    description: What you want to find out, the method or assay you plan to use, the conditions or treatments, and the samples or cells available.
    type: text
    required: true
  - name: constraints
    description: Limits such as number of samples, budget, equipment booking, incubation or culture times, deadlines, and who is doing the work. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Question and readout, Conditions, Controls, Replicates, Materials, Schedule, Decision rules, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many bench experiments are wasted before they start: no positive control, so a negative result means nothing; technical replicates (three wells from one culture) counted as independent samples; no vehicle control for a drug dissolved in DMSO; too little reagent to finish; or no decision about what result would count as a yes. Good planning names the readout and what effect size matters, picks the controls that make each result interpretable, separates biological replicates (independent cultures, animals, preparations, ideally on different days) from technical ones, randomises or blinds where human judgement enters, budgets materials with overage, and writes down the decision rule before seeing data.

Question:
<question>
{{question}}
</question>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Question and readout: restate the question as a testable prediction, the primary readout with units, and the smallest effect that would matter. Ask if this is unclear.
2. Conditions: list each condition with doses, time points or variants, and drop or merge conditions that do not serve the question.
3. Controls: name the positive, negative, vehicle, untreated, loading or normalisation controls and blanks needed, and what each rules out.
4. Replicates: define the experimental unit, the number of biological and technical replicates with the reasoning, and point to a sample size calculation if effect size and variance are known. Say how replicates will be spread across days or batches, and where to randomise or blind.
5. Materials: a table of reagents, consumables and equipment with quantity per run, total with 10 to 20 percent overage, and what must be ordered or booked{{#constraints}}, checked against the constraints given{{/constraints}}.
6. Schedule: day-by-day steps from preparation to readout, with incubation times and pause points.
7. Decision rules: what result will be taken as support, no support or inconclusive, and the analysis planned.
8. Risks: what could go wrong (cell health, timing clashes, equipment availability) and a fallback for each.
</task>

<constraints>
- Do not invent doses, concentrations, incubation times or kit specifics; use the user's values or mark [CONFIRM: typical value from protocol or literature].
- Call out pseudoreplication explicitly whenever technical replicates could be mistaken for biological ones.
- Mention the safety assessment needed for hazardous materials, without detailing procedures for dangerous pathogens, toxins or controlled substances.
- Keep within the stated constraints; if the design cannot answer the question within them, say so and propose the smallest design that can.
</constraints>

<output_format>
Use the contract's section headings in order. Conditions, Controls, Materials and Schedule as tables.
</output_format>
