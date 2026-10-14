---
schema: 1
id: assess-lab-procedure-risks
kind: prompt
title: Assess the risks of a lab procedure
description: Drafts a risk assessment for one lab procedure from its steps and materials, covering chemical, biological and physical hazards, controls by hierarchy, waste and emergencies.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, review]
role: [researcher, student]
subject: [chemistry, biology]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lab-safety, risk-assessment, hazardous-substances, hierarchy-of-controls, chemical-waste]
pairs_with:
  prompts: [write-lab-protocol, write-lab-induction-checklist, write-lab-spill-procedure]
  personas: [lab-manager]
args:
  - name: procedure
    description: The procedure step by step, with every chemical or biological material, its form (solid, solution, gas), quantities and concentrations, equipment, temperatures and pressures.
    type: text
    required: true
  - name: setting
    description: Country and type of institution, containment or biosafety level of the room, who will do the work and their training, lone or out-of-hours working, and any local form you must follow. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Hazards, Risk ratings, Controls, Waste, Emergency arrangements, Gaps and sign-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful lab risk assessment is written for the procedure as actually performed, not as a list of chemicals copied from safety data sheets. The hazard depends on form, quantity and what the steps do: weighing a toxic powder creates dust, heating a solvent creates vapour, vortexing or sonicating biological material creates aerosols, and a closed vessel being heated can build pressure. Experienced assessors check incompatible combinations, apply the hierarchy of controls (eliminate or substitute, reduce scale, engineering controls such as a fume hood or biosafety cabinet, procedures and training, and personal protective equipment last), think about who is exposed (students, lone workers, cleaners, people who are pregnant), and plan waste and emergencies before the work starts. Legal frameworks differ by country, and the institution's safety officer or biosafety committee approves the final assessment.

Procedure:
<procedure>
{{procedure}}
</procedure>
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. Scope: the procedure, location, people involved and frequency. Name the assumptions made where the setting is not given, including the country's framework if known.
2. Hazards: for each step, the hazards from materials (with the hazard classes the user should confirm on the safety data sheet), from the operation (aerosols, heat, pressure, sharps, cryogens, UV, ergonomics), and from incompatible combinations.
3. Risk ratings: likelihood and severity before controls, using a simple stated scale.
4. Controls: for each significant risk, controls in hierarchy order, with substitution or scale reduction considered first, then engineering controls, then procedures and training, then the specific personal protective equipment. Give the residual rating.
5. Waste: segregation and disposal route for each waste stream, to be matched to local rules.
6. Emergency arrangements: spill, fire, exposure and first aid steps specific to these materials, and equipment that must be present (eyewash, spill kit type, shower).
7. Gaps and sign-off: what must be confirmed from safety data sheets and local rules, health surveillance or training needed, and who must approve.
</task>

<constraints>
- Do not invent exposure limits, hazard statements, glove breakthrough times or legal thresholds. Tell the user to take them from the current safety data sheet and local rules, and mark them [CONFIRM].
- If the procedure as described is unsafe (incompatible mixing, work outside required containment, missing controls for a highly hazardous material), say so first.
- Do not provide procedures to make, enhance or weaponise dangerous pathogens, toxins, explosives or chemical weapons precursors; for such work, refer to the institution's safety and biosafety officers.
- State clearly that this is a draft for the competent person or safety officer to review, not an approval.
</constraints>

<output_format>
Use the contract's section headings in order. Hazards and Controls as one table: Step | Hazard | Who is at risk | Rating before | Controls | Rating after. Waste and emergency arrangements as tables or checklists.
</output_format>
