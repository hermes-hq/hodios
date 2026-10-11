---
schema: 1
id: plan-sick-day-childcare-cover
kind: prompt
title: Plan sick-day childcare cover
description: Builds a household plan for days a child is too ill for school or nursery, or school shuts, with a call-down list, a fair split between working parents and a 7am decision routine.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [sick-child, working-parents, backup-childcare, school-closure, rota, contingency]
pairs_with:
  prompts: [coordinate-family-calendar, split-mental-load-fairly, write-babysitter-handbook]
args:
  - name: household
    description: The adults at home, their jobs and how flexible each one is, for example "two parents; I can work from home 2 days, my partner is a nurse on fixed shifts".
    type: text
    required: true
  - name: children
    description: Children's ages and their school, nursery or childminder, for example "4 at nursery, 7 at primary school".
    type: text
    required: true
  - name: helpers
    description: Anyone who might help, with distance and limits, for example "grandma 40 minutes away, not Thursdays; neighbour retired". Optional.
    type: text
  - name: country
    description: Country or region, so leave entitlements and setting rules can be flagged to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Exclusion rules to check, The call-down list, Who takes the day, The 7am routine, Longer illness or closure, Sick-day kit, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help working parents prepare for the days a child cannot go to school or childcare: illness, a nursery exclusion after vomiting, a school closure for snow, a strike or a broken boiler. The scramble usually happens at 6.45am with no plan, and the same parent ends up taking every day off by default, often the one whose employer complains least. Families who cope well decide in advance who covers which kind of day, keep a short call-down list of helpers who have already said yes, and know their setting's exclusion rules (many nurseries and schools ask children to stay home for a set time after vomiting or diarrhoea or after starting some treatments) so they are not caught by a call at 10am asking them to collect.

Household: {{household}}
Children: {{children}}
{{#helpers}}
<helpers>
{{helpers}}
</helpers>
{{/helpers}}
{{#country}}Country or region: {{country}}{{/country}}
</context>

<task>
1. Exclusion rules to check: list the questions to ask each setting (stay-home periods after vomiting, diarrhoea or fever, rules for common infections, when a child can return after starting medicine, how they contact parents). Do not state the rules as fact; mark them "check with the setting" and point to the local public health guidance.
2. The call-down list: rank backup options from {{household}} and the helpers: each parent, relatives, friends, neighbours, a paid emergency sitter or backup-care scheme, swapping with another family. For each, note when they can help, how fast they can arrive, whether they can care for an ill child (some grandparents should avoid stomach bugs or flu), and what they need (keys, car seat, medicine consent, the child's routines).
3. Who takes the day: propose a fair rule between the adults, for example alternate days, split each day into morning and afternoon, or tie it to whose work that day is more movable, and a way to tally days so one person does not absorb them all. Separate a short illness (one or two days) from a longer one.
4. The 7am routine: a short decision sequence for the night before or the morning: check the child, decide whether they go, who stays, who tells the setting and each employer, and who rings the first helper. Give two short message templates: one to the setting, one to work.
5. Longer illness or closure: what to do if it runs past three days: rotate helpers, ask employers about carer's or dependant's leave or flexible working (flag this as an entitlement to check for {{country}} or the user's location, not a promise), keep the child's day calm.
6. Sick-day kit: a short checklist of what to keep ready at home: thermometer, any medicine the family already uses with dosing instructions from the label or pharmacist, fluids, a quiet-activity box, a bucket and spare bedding, and the GP or doctor and out-of-hours numbers.
7. Gaps: name any day or situation the plan cannot cover and what would close it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose or give medicine doses. Say when to call a doctor, a nurse line or emergency services: a child who is very drowsy, struggling to breathe, has a rash that does not fade under pressure, cannot keep fluids down, or seems seriously unwell.
- Do not state employment law, leave entitlements or setting exclusion periods as fact; mark each "check" and say where to look.
- Never plan for a child too young to be left alone to stay home without an adult.
- Respect each helper's limits as given; do not assume a grandparent is always free.
- Use [placeholders] for names and numbers not given.
</constraints>

<output_format>
## Exclusion rules to check
Checklist of questions per setting.
## The call-down list
Table: Order | Who | When available | Time to arrive | Ill child OK? | What they need.
## Who takes the day
The rule, then a tally table: Adult | Days covered this term.
## The 7am routine
Numbered steps, then the two message templates in a code block.
## Longer illness or closure
## Sick-day kit
Checklist.
## Gaps
</output_format>
