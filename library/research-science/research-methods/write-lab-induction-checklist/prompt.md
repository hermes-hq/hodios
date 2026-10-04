---
schema: 1
id: write-lab-induction-checklist
kind: prompt
title: Write a lab induction checklist
description: Writes an induction checklist for new lab members covering safety training, hazardous materials, equipment sign-offs, data rules, waste and who to ask, with sign-off columns for lab managers.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text, notes]
output: [checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [lab-induction, new-starters, lab-safety, training-records, lab-management]
pairs_with:
  prompts: [write-lab-protocol, write-lab-notebook-entry, set-up-sample-tracking]
  personas: [lab-manager]
args:
  - name: lab_type
    description: The kind of lab, for example "molecular biology, biosafety level 2", "synthetic chemistry", "laser optics", "geology sample prep" or "teaching lab".
    type: string
    required: true
  - name: hazards
    description: The hazards present - chemical classes, biological agents, radiation, lasers, cryogens, high voltage, sharps, animals, heavy equipment - and any area with restricted access.
    type: text
    required: true
  - name: equipment
    description: Equipment that needs a sign-off before independent use, for example "autoclave, fume hoods, -80 freezers, confocal microscope, centrifuges".
    type: text
output_contract:
  format: markdown
  sections: [Before the first day, Day one, Hazard-specific training, Equipment sign-offs, Data and records, Waste, Lab rules, Who to ask, Review points]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Inductions fail quietly: a new student is shown round on day one, signs a form, and three weeks later uses the autoclave alone because nobody checked they could, or pours solvent waste down the sink because the waste rules were in an email they never read. A useful induction checklist is ordered by when things must happen, separates "told about" from "demonstrated competence", names a person responsible for each item, and has review points after the first week and month. It sits on top of the institution's own risk assessments, mandatory training and safety rules, which the local safety officer owns and approves.
</context>

<task>
Write an induction checklist for a {{lab_type}} lab.

<hazards>
{{hazards}}
</hazards>
{{#equipment}}
<equipment>
{{equipment}}
</equipment>
{{/equipment}}

1. Before the first day: accounts and access cards, the institution's mandatory online training for these hazards, health screening or vaccinations if the hazards call for it (as items to confirm with occupational health), and reading the lab's risk assessments and local rules.
2. Day one: emergency exits and assembly point, fire alarms and extinguishers, eyewash and safety shower, spill kits, first aid and first aiders, emergency contacts, out-of-hours rules, and where personal protective equipment is kept and how to wear it.
3. Hazard-specific training: for each hazard in the list, the training needed, who delivers it, and the practical competence to demonstrate (for example a supervised spill clean-up, donning and doffing in a containment area, a cryogen fill). Add restricted-area access as a separate sign-off.
4. Equipment sign-offs: for each item, the trainer, the steps of training (watch, do under supervision, demonstrate alone), and the condition for independent use. If no equipment was listed, give a template row and the usual categories for this lab type.
5. Data and records: the lab notebook rules, where data are stored and backed up, file naming, sample labelling, and what must never leave the lab's systems.
6. Waste: each waste stream for these hazards (for example halogenated and non-halogenated solvents, biological, sharps, radioactive, general), the container, labelling and who collects it.
7. Lab rules: food and drink, lone working and out-of-hours work, visitors, booking shared equipment, ordering, and reporting incidents and near misses.
8. Who to ask: a table of roles (lab manager, safety officer, biosafety or radiation protection officer where relevant, equipment owners, first aiders) with placeholders for names and contacts.
9. Review points: a check-in at the end of week one and month one, with what is checked.
10. Before you answer, check that every hazard in the list has training, a demonstrated-competence item and a waste stream where applicable.
</task>

<constraints>
- Put a line at the top saying the checklist must be checked and approved by the lab's safety officer against the institution's risk assessments before use.
- Do not state legal requirements or exposure limits as fact; refer to the institution's rules and risk assessments.
- Separate "informed" items (a signature that something was explained) from "competence" items (a trainer confirms the person did it correctly).
- If the hazards are too vague to plan training (for example just "chemicals"), ask for the main classes and give a provisional checklist with placeholders.
</constraints>

<output_format>
Markdown with the sections in the output contract. Each section is a table: Item | Type (informed or competence) | Responsible | Date | Signed (new member) | Signed (trainer). Keep items short and concrete, one action per row.
</output_format>
