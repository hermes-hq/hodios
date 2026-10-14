---
schema: 1
id: manage-cold-or-flu-at-home
kind: prompt
title: Manage a cold or flu at home
description: Plans self-care for a cold, flu or similar virus - rest, fluids, symptom relief to check with a pharmacist, who should contact a doctor early, red flags, and when to return to work or school.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [common-cold, influenza, self-care, red-flags, sick-day, respiratory-virus]
pairs_with:
  prompts: [choose-right-care-service, disinfect-after-illness, prepare-pharmacist-consultation]
  personas: [pharmacist-educator, health-navigator]
args:
  - name: illness
    description: Symptoms, when they started, highest temperature if measured, whether they are getting better or worse, any test results, and who is ill (age).
    type: text
    required: true
  - name: background
    description: Long-term conditions (asthma, COPD, diabetes, heart disease, weak immune system), pregnancy, regular medicines, who you live with, your work or school, and country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Emergency check, Are you higher risk, Home-care plan, Symptom relief to ask a pharmacist about, Contact a doctor if, Back to work or school]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone look after themselves through a cold, flu or similar respiratory virus, the way a sensible pharmacist would at the counter. Most of these illnesses get better on their own: colds over about a week to ten days, with a cough that can linger longer; flu hits harder and faster, with fever and aches. Antibiotics do not help viruses. What helps is rest, enough fluids, warm drinks, and symptom relief chosen with a pharmacist, who checks for traps people miss: taking the same ingredient twice in a combined cold remedy and a separate painkiller, decongestants that are unsuitable with high blood pressure, heart problems or some other medicines, and remedies unsuitable for young children. Honey can soothe a cough but not for babies under one. People at higher risk from flu (older adults, pregnancy, long-term heart, lung, kidney or metabolic conditions, a weakened immune system, very young children) should contact a doctor early, because antiviral treatment, where used, works best when started within the first couple of days. The warning sign people miss is getting better and then suddenly worse, which can mean a secondary infection.

Illness: {{illness}}
{{#background}}Background: {{background}}{{/background}}
</context>

<task>
1. Check first for emergency signs: severe difficulty breathing, chest pain, blue or grey lips, confusion or very hard to wake, a seizure, a rash that does not fade under a pressed glass, severe dehydration, or coughing up blood. If any are present, tell them to call emergency services now and stop.
2. Say whether they are in a higher-risk group and, if so, recommend contacting a doctor or helpline today rather than waiting.
3. Give a home-care plan for the next few days: rest, fluid targets in simple terms (urine pale), eating little and often, sleep position for a blocked nose, steam or saline, honey for cough if over one year.
4. List symptom relief types to ask a pharmacist about (pain and fever relief, decongestant, cough or throat products) and the questions to ask (other medicines, conditions, pregnancy, age). No product names or doses.
5. List "call a doctor or helpline" signs: fever lasting more than a few days, getting better then worse, breathlessness, ear or sinus pain that is severe or lasting, symptoms beyond about three weeks, or worry about a child or older relative.
6. Give return-to-work or school guidance: generally when fever has gone without fever medicine and they feel well enough, with "check your local public health and workplace guidance", plus hand hygiene, covering coughs, ventilation and protecting vulnerable people at home.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose which virus it is. Testing guidance varies by country and time; tell them to check local advice.
- No medicine names with doses. Never suggest antibiotics or leftover prescription medicines.
- For babies and young children, say to use only products suitable for their age and to ask a pharmacist; lower the threshold for seeking help.
- Do not tell people to "push through" with fever or work while very unwell.
{{> output/uncertainty}}
</constraints>

<output_format>
## Emergency check
## Are you higher risk
## Home-care plan
## Symptom relief to ask a pharmacist about
## Contact a doctor if
## Back to work or school
</output_format>
