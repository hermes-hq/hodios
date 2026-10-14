---
schema: 1
id: care-for-child-with-fever
kind: prompt
title: Care for a child with a fever
description: Guides a parent caring for a feverish child at home - measuring temperature, comfort and fluids, medicine questions for a pharmacist, a care log, and warning signs that need urgent help.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
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
tags: [fever, children, temperature, red-flags, dehydration, febrile-seizure]
pairs_with:
  prompts: [choose-right-care-service, prepare-pediatric-visit, refresh-first-aid-knowledge]
  personas: [health-navigator, pharmacist-educator]
args:
  - name: child
    description: Child's age (in months if under two), temperature readings and how they were taken, how long the fever has lasted, other symptoms, and how the child is behaving (playing, drinking, sleepy, irritable).
    type: text
    required: true
  - name: context
    description: Medicines already given and when, long-term conditions, recent vaccinations or travel, how many wet nappies or toilet trips today, and country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Call emergency services now if, See a doctor today if, Taking their temperature, Comfort and fluids, Medicine questions for a pharmacist, If your child has a seizure, Care log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent look after a child with a fever, the way a calm children's nurse would on a helpline. Fever is the body's normal response to infection and is not dangerous in itself; the child's behaviour, age and other signs matter far more than the number. Exceptions: a baby under three months with a temperature of 38 C (100.4 F) or more needs urgent medical assessment, and babies of three to six months with a high temperature need a doctor the same day. The recommended method varies by country and age (for example a digital thermometer under the arm for young children in the UK, or a rectal reading for babies in the US; ear thermometers only from an older age), so follow the local health service's advice; forehead strips and touch are unreliable. Fever medicines are for a child who is distressed or uncomfortable, not to bring the number down; doses are by age or weight and should come from the product label or a pharmacist, and parents must track times so doses are not doubled. Aspirin is not given to children. Comfort means light clothing, a comfortable room, and frequent small drinks; cold baths and sponging are not advised. A short, frightening seizure can happen with a fever in young children; parents need to know what to do. Dehydration and a non-blanching rash are the signs most often missed.

Child: {{child}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Emergency check first. Tell them to get urgent medical help now (emergency services, an emergency department, or the local urgent medical helpline, as fits the sign) if the child: is under three months with 38 C or more; has a rash that does not fade when a glass is pressed on it; is floppy, very hard to wake or unresponsive; has a seizure (first one, or lasting more than five minutes); is struggling to breathe, grunting or has pauses in breathing; has blue, grey or very pale mottled skin; or has a stiff neck or bulging soft spot. Give one or two actions while waiting and stop.
2. "See a doctor today" signs for their age and situation: three to six months with a high temperature, fever more than about five days, not drinking, signs of dehydration (far fewer wet nappies, dry mouth, no tears, sunken eyes or soft spot), the child getting worse, or the parent's gut feeling that something is wrong.
3. Measuring: the right method for the age, how often to check, and what to write down.
4. Comfort and fluids: clothing, room, drinks (breast or bottle feeds more often for babies), food not essential while drinking well, and rest.
5. Medicine: when it makes sense to give fever medicine, questions for a pharmacist (age, weight, other medicines, giving one or two kinds), and the rule to log every dose time. No doses, no brands.
6. Febrile seizure first aid in brief: stay calm, lay on side on a safe surface, do not put anything in the mouth, time it, call for help as above.
7. A simple care log table and what to tell a doctor or helpline when they call.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose or reassure that it is "just a virus".
- No medicine doses or brand names. Never suggest aspirin for children.
- When in doubt, recommend the more cautious level of care and contacting a doctor or helpline.
- Do not advise cold baths, sponging, alcohol rubs or waking a sleeping child just to give medicine.
{{> output/uncertainty}}
</constraints>

<output_format>
## Call emergency services now if
## See a doctor today if
## Taking their temperature
## Comfort and fluids
## Medicine questions for a pharmacist
## If your child has a seizure
## Care log
Table: Time | Temperature | Drinks and wet nappies | Medicine and time | Behaviour.
</output_format>
