---
schema: 1
id: prepare-skin-check-visit
kind: prompt
title: Prepare for a mole or skin check
description: Prepares for a mole or skin check with a log of each spot and how it has changed, a photo routine that makes change visible, risk history to mention and questions for the clinician.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [skin-check, moles, dermatology, skin-cancer-awareness, sun-damage]
pairs_with:
  prompts: [prepare-doctor-questions, build-symptom-log, prepare-telehealth-visit, explain-pathology-report]
  personas: [health-navigator]
args:
  - name: spots
    description: The spots you want checked and what you have noticed, for example "mole on my back that my partner says looks bigger and darker", "scaly patch on my forehead that keeps coming back", "new dark line under a toenail".
    type: text
    required: true
  - name: history
    description: Risk history if you know it, for example skin type (burns easily or not), blistering sunburns as a child, sunbed use, lots of moles, previous skin cancer, family history of melanoma, organ transplant or medicines that lower immunity. Optional.
    type: text
  - name: visit
    description: The kind of visit, for example "family doctor", "dermatologist", "photo-based teledermatology service". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Book sooner if, Spot log, How to photograph each spot, History to mention, Questions for the clinician, Between checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone prepare for a skin or mole check. Clinicians look for change and for spots that differ from the person's other moles. The ABCDE prompts (asymmetry, irregular border, several colours, diameter over about 6 mm, and evolving, meaning changing in size, shape, colour, height or symptoms) and the "ugly duckling" idea (the one mole that looks unlike the rest) are widely used, and change over time is often the most useful information a patient can bring. Not all skin cancers are dark moles: a sore that does not heal, a pearly or shiny lump, a scaly or crusted patch that bleeds, or a dark streak in a nail are also reasons to be checked. Good photos (same distance, same light, with a ruler or coin for scale, plus a wider shot showing where the spot is) let a clinician see change that memory cannot, and are essential for photo-based services. Risk factors such as many moles, fair skin, sunburn history, previous skin cancer, family history of melanoma and weakened immunity change how closely someone is followed.

Spots: {{spots}}
{{#history}}History: {{history}}{{/history}}
{{#visit}}Visit: {{visit}}{{/visit}}
</context>

<task>
1. Book sooner if: from their description, say clearly if any spot should be seen soon rather than at a routine check (a new or changing mole in an adult, bleeding, itching or crusting that persists, a sore that has not healed in several weeks, a fast-growing lump, a new dark streak in a nail), and to tell the booking staff about the change. Do not say what the spot is.
2. Spot log: a table with one row per spot from {{spots}}: a label, body location, when first noticed, what has changed, symptoms, and a photo reference. Add blank rows for others they find.
3. How to photograph each spot: consistent light (daylight or the same lamp, no flash glare), same distance, a ruler or coin beside it, one close-up and one wider shot showing location, a partner's help for back and scalp, date in the file name, and repeating monthly for spots they are watching.
4. History to mention: the risk factors from their notes, plus a "tell them if" list of the common ones they did not mention.
5. Questions for the clinician: top three first, including which spots they looked at and what they think, whether any need removal, a biopsy or a follow-up photo comparison, how and when results come back, how often to be checked, and what changes should bring them back sooner.
6. Between checks: a monthly self-check routine (whole body including scalp, soles, between toes, nails and genitals, with a mirror or partner), sun protection basics, and to remove nail polish and make-up before the visit.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never say whether a spot looks benign, cancerous or harmless, even from a detailed description or an image. Only a clinician examining it, often with a dermatoscope, can judge.
- Do not suggest removing, freezing or treating spots at home or with unregulated products.
- Keep warnings proportionate: most moles are harmless, and the point of the check is to find the few that are not.
</constraints>

<output_format>
## Book sooner if
## Spot log
Table: Label | Location | First noticed | What has changed | Symptoms | Photo reference.
## How to photograph each spot
## History to mention
## Questions for the clinician
Top 3, then the rest.
## Between checks
</output_format>
