---
schema: 1
id: plan-lab-waste-segregation
kind: prompt
title: Plan lab waste segregation
description: Plans a lab's waste streams from what it actually uses, with containers, labels, where each stream sits, collection routines and a one-page waste chart, ready for the safety office to check.
category: lab-work
version: 1.0.0
status: incubating
stage: [operate]
role: [researcher, operations-manager]
subject: [chemistry, biology]
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
depth: specific
tags: [lab-waste, waste-segregation, sharps, chemical-compatibility, waste-labelling]
pairs_with:
  prompts: [assess-lab-procedure-risks, write-lab-spill-procedure, write-lab-induction-checklist]
  personas: [lab-manager]
args:
  - name: materials
    description: What the lab uses and produces as waste - solvents, acids and bases, heavy metals, biological material and its containment level, sharps, glass, radioactive or other regulated material, gels, plastics.
    type: text
    required: true
  - name: setting
    description: Country or region, institution type, and what the institution's waste service already provides (containers, collection days, contractors). Optional but important.
    type: text
output_contract:
  format: markdown
  sections: [Waste inventory, Streams and containers, Placement, Labelling, Collection routine, Do and do not, Waste chart, Questions for the safety office]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lab waste incidents usually come from mixing incompatible chemicals in one carboy (oxidisers with organics, acids with cyanides or sulfides), unlabelled containers nobody can identify, sharps in ordinary bags, and biological waste going out before treatment. Good segregation starts from an inventory of what is really produced, puts the right container at the point of generation, labels from the first drop with contents and a start date, and keeps containers closed. Rules differ by country and institution, so the safety office and waste contractor have the final word; this plan prepares the conversation with them.
</context>

<task>
<materials>
{{materials}}
</materials>
{{#setting}}

<setting>
{{setting}}
</setting>
{{/setting}}

1. Waste inventory: list each waste the materials produce, grouped by hazard class.
2. Streams and containers: define the streams (for example halogenated solvents, non-halogenated solvents, aqueous acids, aqueous bases, heavy-metal aqueous, solid chemical, sharps, broken glass, biological for treatment, regulated streams handled by specialists), the container type for each, fill limits and secondary containment.
3. Placement: where each container sits relative to where waste is generated, away from incompatible streams.
4. Labelling: label contents from the first addition, constituents with approximate percentages, hazard, start date, owner.
5. Collection routine: who checks, how often, how to request a collection, maximum storage time to confirm with the institution.
6. Do and do not: a short list of the incompatibilities and mistakes relevant to these materials.
7. Waste chart: a one-page table to post on the wall.
8. Questions for the safety office.
</task>

<constraints>
- Do not state legal storage limits, disposal codes or drain-disposal permissions as facts; mark them "confirm with your safety office" and ask for the jurisdiction if missing.
- Never suggest neutralising, treating or disposing of hazardous waste down the drain unless the user says the institution's procedure permits it; then point to that procedure.
- Regulated streams (radioactive, controlled substances, higher containment biological) are handed to the responsible specialist, not designed here.
</constraints>

<output_format>
## Waste inventory
## Streams and containers
| Stream | What goes in | What never goes in | Container | Fill limit |
## Placement
## Labelling
## Collection routine
## Do and do not
## Waste chart
## Questions for the safety office
</output_format>
