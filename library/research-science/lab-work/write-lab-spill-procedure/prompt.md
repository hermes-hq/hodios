---
schema: 1
id: write-lab-spill-procedure
kind: prompt
title: Write a lab spill procedure
description: Writes spill response cards for a lab's actual materials, with minor versus major spill criteria, step-by-step clean-up by hazard class, spill kit contents and reporting.
category: lab-work
version: 1.0.0
status: incubating
stage: [build, operate]
role: [researcher, operations-manager]
subject: [chemistry, biology]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [lab-safety, spill-response, emergency-procedures, biohazards, hazardous-substances]
pairs_with:
  prompts: [assess-lab-procedure-risks, write-lab-induction-checklist]
  personas: [lab-manager]
args:
  - name: lab
    description: The materials used and stored (with typical quantities and forms), biosafety level, spill kits and safety equipment present, room layout features (drains, fume hoods), and who works there and when.
    type: text
    required: true
  - name: local_rules
    description: Your institution's emergency numbers, reporting system and any existing spill procedure to follow or replace. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Minor or major, Spill cards, Spill kit contents, Reporting, Gaps to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Spill procedures fail when they are generic. Responders need to know at a glance whether this spill is one they can handle (small quantity, known material, trained person, correct kit, no one hurt) or one where they leave, close the door, and call for help. The steps then depend on the hazard class: acids and bases, flammable solvents, toxic or carcinogenic chemicals, water-reactive materials, biological material (cover, apply disinfectant, wait the contact time, then clean), mercury, and radioactive material (which follows the radiation protection rules). Common errors are wiping a biological spill before the disinfectant has worked, using water or paper towels on materials they react with, and forgetting to report a spill nobody was hurt by.

Lab:
<lab>
{{lab}}
</lab>
{{#local_rules}}Local rules: {{local_rules}}{{/local_rules}}
</context>

<task>
1. Minor or major: criteria for this lab to decide whether a spill is minor (handle it) or major (evacuate, isolate, call), including quantity thresholds as [CONFIRM] values, injuries, fire risk, vapours, and spills outside a hood or cabinet.
2. Spill cards: one card per hazard class present in this lab, each with: first actions (alert others, help anyone contaminated, first aid pointers), personal protective equipment, how to contain, how to absorb or neutralise using the kit's materials, clean-up and decontamination, waste bagging and labelling, and when to stop and call for help. For biological spills include covering, disinfectant application, contact time to confirm, and clean-up from the edge inwards.
3. Spill kit contents: what each kit should hold for the materials present, where kits should be located, and a monthly check.
4. Reporting: what to report, to whom{{#local_rules}} using the local rules given{{/local_rules}}, and near misses.
5. Gaps to confirm: items to verify from safety data sheets, the safety officer and local rules.
</task>

<constraints>
- Do not invent quantity thresholds, neutraliser amounts or disinfectant contact times; mark them [CONFIRM] with the source to check.
- Radioactive spills follow the radiation protection supervisor's procedure; refer to it rather than writing one.
- Keep each card short enough to print on half a page and read under stress, with verbs first.
- If a material listed should not be handled by lab staff at all after a spill, say so on its card.
</constraints>

<output_format>
Use the contract's section headings in order. Each spill card under its own third-level heading as a short numbered list. Spill kit contents as a checklist.
</output_format>
