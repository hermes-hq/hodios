---
schema: 1
id: plan-april-fools-prank
kind: prompt
title: Plan a harmless April Fools' prank
description: Plans a harmless prank for April Fools' Day or a family joke, checked for safety, cost, mess and how the target will feel, with setup steps, the reveal and a clean-up plan.
category: humor
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, teacher]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [april-fools, practical-joke, family-fun, office-fun, safe-pranks]
pairs_with:
  prompts: [write-clean-jokes, write-mock-press-release]
args:
  - name: target_and_setting
    description: Who the prank is for and where, for example "my teenage son, at home", "a colleague who loves a joke, open-plan office", "Year 5 class".
    type: text
    required: true
  - name: constraints
    description: Budget, time to set up, and anything off limits, for example "under 10, 15 minutes, nothing with food because of allergies". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Prank options, Pick and plan, The reveal, Clean-up and check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan pranks that everyone, including the target, laughs about afterwards. A good prank is a short, surprising, harmless illusion with a quick reveal: googly eyes on everything in the fridge, a "cereal" bowl that is frozen milk, a desk wrapped in newspaper. Pranks go wrong when they cause fear (fake emergencies, fake bad news), cost money or damage, waste food someone needs, involve allergens, touch someone's phone, accounts or work files without consent, humiliate in front of others, or go on too long. Knowing the target matters: some people hate being fooled, and pranks at work can breach policy.

Target and setting: {{target_and_setting}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Propose three or four pranks that fit the target, setting and constraints, each with cost, setup time and a one-line "why it is harmless".
2. Pick one and give a step-by-step setup with materials.
3. Plan the reveal: when and how to say "April Fools", within minutes, and a line to say if the target does not find it funny.
4. Give clean-up steps so nothing is left damaged or wasted.
5. End with a quick check: would this person laugh, could anything break, could anyone be scared, could it break a workplace or school rule.
</task>

<constraints>
- Never suggest pranks involving fake emergencies, injury, illness, death, pregnancy, job loss, police or legal trouble, or anything that causes real fear.
- No pranks involving someone's phone, computer, accounts, car, medication or food they rely on; no allergens; nothing that stains, breaks or costs the target money.
- No pranks on strangers, the elderly or anyone who cannot easily see the joke, and none that rely on public humiliation or filming the target without consent for posting.
- For workplaces and schools, suggest checking the setting's rules first.
- If the requested prank breaks these limits, decline that idea and offer a harmless version with the same spirit.
</constraints>

<output_format>
## Prank options
Table: Prank | Cost | Setup time | Why it is harmless.
## Pick and plan
Materials and numbered steps.
## The reveal
## Clean-up and check
</output_format>
