---
schema: 1
id: write-lab-protocol
kind: prompt
title: Write a reproducible lab or field protocol
description: Turns rough procedure notes into a reproducible lab or field protocol with materials, numbered steps, timings, safety notes, controls and troubleshooting. For scientists and technicians.
category: research-methods
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [lab-protocol, standard-operating-procedure, reproducibility, lab-safety, fieldwork]
pairs_with:
  prompts: [write-methods-section, write-data-management-plan]
args:
  - name: procedure_notes
    description: Your notes on the procedure as you actually do it - steps, reagents or equipment, amounts, times, temperatures, and the tricks you know. Rough notes are fine.
    type: text
    required: true
  - name: field
    description: The field and setting, for example "molecular biology wet lab", "analytical chemistry", "ecology field sampling", "soil science", so conventions and units fit.
    type: string
output_contract:
  format: markdown
  sections: [Overview, Safety, Materials and equipment, Before you start, Procedure, Controls and quality checks, Expected results, Troubleshooting, Gaps to resolve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Protocols fail to reproduce because of what the author takes for granted: an unstated temperature, "spin briefly", a reagent with no supplier or grade, a pause point nobody mentioned, or a step that only works if done within ten minutes of the previous one. A reproducible protocol states every quantity with units, every condition, every critical timing, the controls that show a run worked, and what to do when it does not. It is written so a competent colleague who has never done this procedure could follow it the first time, and it follows conventions used by protocol journals and repositories such as protocols.io and Bio-protocol.
</context>

<task>
Turn these notes into a protocol{{#field}} for {{field}}{{/field}}.
<notes>
{{procedure_notes}}
</notes>

1. Write a short overview: purpose, principle in one or two sentences, what the protocol produces, total hands-on and elapsed time.
2. Write the safety section: hazards from the chemicals, biological materials, equipment and field conditions mentioned, the protective equipment and containment level the notes imply, and waste disposal, with a reminder to check the safety data sheets and the local risk assessment.
3. List materials and equipment in tables: item, specification (concentration, grade, size), quantity per run, and supplier or catalogue number only where the notes give one. Include recipes for solutions with how to prepare and store them.
4. List what to prepare before starting (thawing, pre-warming, calibration, booking equipment, permits for fieldwork).
5. Write the procedure as numbered steps, one action per step, with quantities, units, temperatures, speeds (with g-force rather than rpm when centrifuging, if the notes allow conversion), durations, and the reason for any step whose purpose is not obvious. Mark critical steps with CRITICAL, safe stopping points with PAUSE POINT, and timing-sensitive steps with TIMING.
6. Describe controls (positive, negative, blanks, replicates) and the quality checks that show the run worked.
7. Describe expected results, with how a good and a failed result look.
8. Write a troubleshooting table from the problems the notes mention and the usual failure points of this kind of procedure.
9. List every gap: anything ambiguous or missing in the notes.
</task>

<constraints>
- Never invent quantities, concentrations, temperatures, times, catalogue numbers or safety limits. Where the notes are silent or vague ("a bit", "briefly", "until it looks right"), write [GAP: specify …] and list it under Gaps to resolve. You may suggest a typical value from general practice only if it is labelled "typical value, verify".
- Use SI units and consistent notation, and keep the user's units where converting would lose meaning.
- Do not remove safety steps from the notes. Add missing safety considerations rather than leave them out.
- Do not complete or optimise procedures involving dangerous pathogens, toxins, explosives or controlled substances beyond the notes. Format what is given, and refer the user to their biosafety or safety officer for the missing parts.
- If the notes describe something unsafe (for example mixing incompatible chemicals, or working outside required containment), say so at the top.
</constraints>

<output_format>
Use the contract's section headings in order. Materials and the troubleshooting section as tables (Problem | Likely cause | Fix). Procedure as a numbered list with sub-steps where needed and the CRITICAL, PAUSE POINT and TIMING labels in bold. Gaps to resolve as a numbered list with the step each gap affects.
</output_format>
