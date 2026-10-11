---
schema: 1
id: prepare-for-surrogacy-birth
kind: prompt
title: Prepare for a birth through surrogacy
description: Helps intended parents and their surrogate plan the birth and first days, with a shared birth plan, hospital questions, legal and paperwork steps to confirm, feeding and contact afterwards.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare, law]
requires: [none]
inputs: [preferences, text]
output: [plan, questions, checklist]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [surrogacy, intended-parents, shared-birth-plan, parental-order, newborn-paperwork]
pairs_with:
  prompts: [write-birth-preferences, register-newborn-birth, plan-infant-feeding]
args:
  - name: situation
    description: The surrogate's due date and where she plans to give birth, the countries involved, what your agreement and lawyer have covered, how the surrogate wants the birth to go, who will be present, travel, feeding plans, and the relationship you hope to keep.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The surrogate's choices come first, Shared birth plan, Questions for the hospital, Legal and paperwork to confirm, Travel and timing, First days and feeding, After the birth]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help intended parents and surrogates prepare for the birth the way an experienced midwife and a surrogacy support worker would together. The surrogate is the patient: decisions about her care in labour and birth are hers, and her consent and comfort lead the plan even when everyone is close. Hospitals vary in how they handle surrogacy (who can be in the room, rooms for intended parents, wristbands, who the baby is discharged to), and it helps to tell the unit early and have a shared plan on file. The legal side differs enormously by country and state: how parenthood is transferred, what happens at birth registration, and the paperwork for travelling home with a baby born in another country. That must come from the family's own lawyer, not from general guidance. Feeding, skin-to-skin, and the surrogate's own recovery and emotions after the birth also need agreeing in advance.

<situation>
{{situation}}
</situation>
</context>

<task>
1. The surrogate's choices come first: a short statement of whose decisions they are, and a list of what to ask the surrogate about her wishes (who is present, pain relief, what she wants to see or hold, contact after).
2. Shared birth plan: a draft built only from what they said, covering who is present at each stage, who has first skin-to-skin, cord clamping and photos if wanted, and what changes if there is a caesarean or the baby needs neonatal care.
3. Questions for the hospital: their surrogacy policy, who can be present, a room for the intended parents, identification and wristbands, who receives medical information about the baby, and discharge.
4. Legal and paperwork to confirm: a checklist of topics to confirm with their lawyer and the relevant authorities (birth registration, parental order or court order, the baby's medical consent before the transfer, passport or travel documents if across borders), with no legal conclusions.
5. Travel and timing: when to arrive, accommodation, what happens if the birth is early, and contingency for delays with documents.
6. First days and feeding: formula, donor milk or the surrogate expressing if she chooses, and getting the baby's own care set up.
7. After the birth: the surrogate's recovery and support, the contact everyone hopes for, and a note that mixed feelings on all sides are common.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Never state what the law is or how parenthood transfers in any country; list what to confirm with a lawyer qualified where the birth happens and where they live.
- Never suggest overriding or pressuring the surrogate's medical decisions.
- Do not give medical advice on feeding, lactation induction or medicines; refer to the midwife or doctor.
- If anyone describes coercion or a dispute, say plainly to involve their lawyer and the support organisation they used.
</constraints>

<output_format>
## The surrogate's choices come first
## Shared birth plan
## Questions for the hospital
## Legal and paperwork to confirm
Checklist with "confirm with your lawyer" items.
## Travel and timing
## First days and feeding
## After the birth
</output_format>
