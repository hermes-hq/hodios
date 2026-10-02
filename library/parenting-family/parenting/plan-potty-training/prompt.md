---
schema: 1
id: plan-potty-training
kind: prompt
title: Plan potty training
description: Plans potty training from a toddler's readiness signs, with an approach, home setup, how to handle accidents and setbacks, and when to ask a health visitor or doctor.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [potty-training, toilet-training, toddlers, regression, readiness-signs]
pairs_with:
  prompts: [plan-behavior-approach]
  personas: [parenting-coach]
args:
  - name: child_age
    description: The child's age, for example "2 years 4 months".
    type: string
    required: true
  - name: readiness_signs
    description: What you have noticed, for example "tells me when nappy is wet", "dry after naps", "hides to poo", "interested in the toilet". Also anything relevant such as a new sibling, starting nursery, constipation or what you have already tried. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Ready or not yet, The approach, Setup, Day by day, "Accidents, setbacks and regressions", Night time, Ask a health visitor or doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents plan potty training calmly. Readiness matters more than age: most children are ready somewhere between about 18 months and 3 years, and starting before a child is ready usually makes it take longer. Signs of readiness include staying dry for an hour or two or after naps, knowing and showing when they are weeing or pooing, interest in the toilet or in wearing pants, being able to sit, walk to the potty and pull clothes down and up, and following simple instructions. Day training usually comes well before night dryness, which is largely physical and can take years longer. Constipation is a common hidden cause of difficulty. Pressure, punishment and shame make problems worse.

Child's age: {{child_age}}
{{#readiness_signs}}What the parent has noticed: {{readiness_signs}}{{/readiness_signs}}
</context>

<task>
1. Assess readiness from what is given: list the signs present, the signs not yet mentioned, and a verdict of ready now, nearly ready (with what to do in the meantime), or not yet. If the signs are not given, give a short readiness checklist and ask the parent to come back with it, then give the plan anyway for when they are ready.
2. Recommend an approach that fits the child and family, explaining the trade-off between a gradual, child-led approach and an intensive few-days approach, and say which suits this situation. Point out when to wait, for example around a new sibling, a house move or starting nursery.
3. Setup: what to have ready (potty or toilet seat with a step, pants, easy clothes, spare clothes kit for outings, a travel potty or fold-up seat), and how to introduce it with books, play and watching family members.
4. Write a day-by-day guide for the first week: timing prompts (after waking, meals and naps, before going out), what to say, how to praise the effort without big rewards that become bribes, handwashing, and what to do on outings and at nursery or with other carers so everyone does the same thing.
5. Accidents and setbacks: what to say and do in the moment, calmly and without shame, normal patterns such as a child who wees in the potty but holds poo, when to pause and try again in a few weeks, and regressions after life changes or illness.
6. Night time: keep nappies or pull-ups at night until they are dry most mornings, and what usually helps later.
7. When to ask a health visitor, family doctor or paediatrician.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No punishment, shaming, withholding drinks to avoid accidents, forcing a child to sit for long periods, or comparing them to other children.
- Do not suggest laxatives, medicines or doses. If constipation is suspected (hard, painful or infrequent poos, holding on, soiling), say it is common, often treatable and worth raising with a health visitor, doctor or pharmacist before or during training.
- Ask a professional if: pain or burning when weeing, blood in wee or poo, a child who was dry starts wetting often with extra thirst or tiredness, constipation that does not settle, no progress after a full trial well past the usual age, daytime wetting continuing past around school age, or concerns about development. Fever with pain when weeing needs a doctor promptly.
- Respect the family's culture and approach, including elimination communication or later training.
- If the child's age is missing, ask for it.
</constraints>

<output_format>
## Ready or not yet
Signs present, signs to watch for, and the verdict.
## The approach
## Setup
A checklist.
## Day by day
A table: Day | Focus | What to do | What to say.
## Accidents, setbacks and regressions
## Night time
## Ask a health visitor or doctor if
</output_format>
