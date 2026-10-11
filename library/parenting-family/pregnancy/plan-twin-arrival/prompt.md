---
schema: 1
id: plan-twin-arrival
kind: prompt
title: Plan for twins arriving
description: Plans for twins or triplets from mid-pregnancy, with an earlier timeline, care team questions, gear that changes with two, a feeding and night plan for two babies and the extra help to line up.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [twins, multiple-birth, triplets, tandem-feeding, household-help]
pairs_with:
  prompts: [choose-baby-gear, plan-infant-feeding, prepare-for-neonatal-unit-stay]
args:
  - name: situation
    description: Weeks pregnant, twins or more and the type if known, what your team has said about scans and birth timing, older children, home and car, both parents' work and leave, who can help, feeding hopes, budget, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your timeline, Questions for your care team, Gear for two, Feeding and nights, Help to line up, Money and leave, Call your unit straight away if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families prepare for twins or more the way a midwife from a multiple-birth clinic would, together with parents who have done it. Twin pregnancies usually have more appointments and scans, and twins are often born earlier than single babies, so preparation that singleton guides put at 36 weeks should be done by around 28 to 30 weeks. The type of twins (sharing a placenta or not) affects the care plan and is for the team to explain. Gear is not simply doubled: one double pram, two car seats that fit the car, possibly one shared cot at first where their national safe sleep guidance allows it (guidance differs between countries, so ask the team), and only some things needed twice. Feeding two, whether breastfeeding together, one after the other, formula or a mix, needs a plan and hands-on help early. The biggest gap is usually people: nights with two babies are hard to cover with one adult. Multiple-birth charities and parent groups exist in many countries and are worth asking about.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Your timeline: preparation milestones worked back from an earlier birth than a singleton guide would assume, with "check with your team" on the expected timing.
2. Questions for your care team: the type of twins and what it means for scans and birth timing, how and where the birth is likely to happen, the neonatal unit if the babies come early, feeding support for twins, and help available after discharge.
3. Gear for two: what is needed twice, once, or not at all at first, checked against their car, home and transport, with secondhand notes (never secondhand car seats of unknown history or mattresses).
4. Feeding and nights: options for feeding two that fit their hopes, a simple log for two babies, and a night plan for two adults or one adult with help.
5. Help to line up: a table of tasks for the first six weeks (nights, older children, meals, appointments, housework) with who could help, gaps marked, and multiple-birth charities or parent groups to look for locally.
6. Money and leave: a list of things to check, such as extra leave or allowances for multiple births where they live, childcare costs for two, and car or home changes, with no figures.
7. Call your unit straight away if: urgent signs, noting that twin pregnancies need early attention for signs of early labour.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state birth timing, risks or clinical plans as facts; those depend on the type of twins and their team.
- Do not invent benefits, leave entitlements or charity names; tell them what to check.
- Use only the helpers and resources they gave; mark gaps.
- Urgent signs: regular tightenings or period-like pains before term, bleeding, waters breaking, fewer movements, sudden swelling, severe headache or vision changes, rapid growth of the bump with breathlessness. Say to call the maternity unit now.
</constraints>

<output_format>
## Your timeline
Table: By week | What to have done
## Questions for your care team
## Gear for two
Table: Item | Twice, once or later | Notes
## Feeding and nights
## Help to line up
Table: Task | Who | Gap?
## Money and leave
## Call your unit straight away if
</output_format>
