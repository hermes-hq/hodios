---
schema: 1
id: plan-lab-relocation
kind: prompt
title: Plan a lab move
description: Plans moving a research lab, covering inventory and disposal, regulated materials, sample cold chain, instrument moves and requalification, decommissioning, commissioning and continuity.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, operations-manager]
subject: [biology, chemistry]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lab-move, decommissioning, cold-chain, hazardous-materials-transport, instrument-requalification]
pairs_with:
  prompts: [plan-freezer-failure-response, set-up-sample-tracking, plan-instrument-calibration-schedule]
  personas: [lab-manager]
args:
  - name: move
    description: From where to where (same building, campus, city, another country), the date or window, lab size and people, and what moves - chemicals, biological materials, animals, radioactive or controlled substances, freezers and samples, large instruments.
    type: text
    required: true
  - name: constraints
    description: Grant deadlines or experiments that cannot stop, budget, who the institution provides (movers, estates, safety office), and the state of the new space. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Timeline, Inventory and disposal, Regulated materials, Samples and cold chain, Instruments, Old space, New space, Research continuity, Who does what]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lab moves go wrong at the edges: licences and permits for radioactive sources, controlled drugs, genetically modified organisms or pathogens are often tied to a specific room and must be amended before anything moves; general movers cannot carry hazardous chemicals, which need trained staff or a specialist carrier under dangerous goods rules; samples thaw because the freezer was moved full and switched off; sensitive instruments are moved by people who are not the manufacturer's engineers and then never work the same; the new biosafety cabinets and fume hoods are not certified when the lab arrives; and the old space cannot be handed back without decontamination sign-off. A good move starts months early with an inventory and a big clean-out, because the cheapest material to move is the material disposed of before the move.

Move:
<move>
{{move}}
</move>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Timeline: phases working back from the move date (for example six months, three months, one month, move week, the month after), with the long-lead items first: licence amendments, permits, specialist carriers, manufacturer engineers, and new-space certification.
2. Inventory and disposal: how to inventory chemicals, biologicals, consumables and equipment, the rule for what to dispose of before the move, and how to schedule a waste collection.
3. Regulated materials: for each regulated category present, what must be amended or notified, who handles transport, and the paperwork. Mark local requirements as [CONFIRM] with the institutional office responsible.
4. Samples and cold chain: freezer contents moved in dry ice or dry shippers rather than in switched-off freezers, liquid nitrogen stocks, temperature logging during transport, backup storage, and moving freezers empty.
5. Instruments: which need the manufacturer's service team to decommission and reinstall, which need requalification or recalibration after the move, and the order of reinstallation.
6. Old space: decontamination of surfaces, hoods and cabinets, removal of all materials, and sign-off for handover.
7. New space: checks before moving in (services, power and backup circuits for freezers, ventilation, fume hood and biosafety cabinet certification, safety equipment, network), and a new risk assessment and induction.
8. Research continuity: which experiments to finish, pause or move to a partner lab, and the expected downtime per activity{{#constraints}}, considering the constraints given{{/constraints}}.
9. Who does what: a responsibility table across lab members, the safety office, estates, movers and suppliers.
</task>

<constraints>
- Do not state specific licence, transport or waste regulations as facts for a country; describe what typically needs checking and name the responsible office.
- Never suggest moving hazardous chemicals, biological agents or radioactive material in private cars or with general movers.
- Do not invent dates or lead times; mark typical lead times as estimates to confirm with suppliers.
</constraints>

<output_format>
Use the contract's section headings in order. Timeline and Who does what as tables. Other sections as checklists.
</output_format>
