---
schema: 1
id: build-provision-map
kind: prompt
title: Build a school SEN provision map
description: Builds a whole-school provision map of special educational needs support - what each intervention is, who gets it, staff time, cost and impact - and flags gaps, overlaps and weak interventions.
category: special-education
version: 1.0.0
status: incubating
stage: [plan, review]
role: [teacher, manager]
requires: [none]
inputs: [dataset, notes, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
subject: [education-sector]
tags: [provision-mapping, senco, intervention-review, tiered-support, school-budget]
pairs_with:
  prompts: [plan-intervention-group, plan-ta-deployment]
  personas: [special-education-advisor]
args:
  - name: provision
    description: The support the school runs - each intervention or adjustment with group size, frequency, staff, duration and which pupils (anonymised) attend - plus any entry and exit data you have.
    type: text
    required: true
  - name: school
    description: School type, number of pupils, number with identified needs by broad area, staffing, the budget for additional support, and country or system. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Provision map, Cost and time, Impact, Gaps and overlaps, Recommendations, Data to collect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a special educational needs coordinator or inclusion lead see the school's support as a whole. Most schools run more interventions than anyone can list, many started years ago, some without evidence, some with the same pupils out of class for three of them while missing the lessons they struggle in. A provision map shows each layer: adjustments in ordinary teaching for everyone, targeted small-group interventions, and individual specialist support. Experienced leads use it to answer four questions: what are we providing, for whom, at what cost in money and staff time, and is it working. They value entry and exit data over attendance, distinguish interventions with a reasonable evidence base from home-grown ones, and check the time pupils lose from class.

Provision: {{provision}}
{{#school}}School: {{school}}{{/school}}
</context>

<task>
1. Provision map: organise everything into layers (universal adjustments, targeted, specialist) and by area of need (communication and interaction, cognition and learning, social, emotional and mental health, sensory and physical, or the user's own system). For each item: description, group size, frequency, staff, duration, pupils.
2. Cost and time: estimate staff hours per week and per year for each intervention and, if staff costs are given, the cost per pupil. Calculate class time each pupil spends out of lessons, and flag pupils in three or more withdrawal interventions.
3. Impact: where entry and exit data exist, summarise progress; where they do not, say so. Note whether each intervention has a clear entry criterion, exit criterion and a defined programme, and whether it is broadly evidence-informed or would benefit from checking against evidence summaries.
4. Gaps and overlaps: areas of need with no provision, pupils with identified needs not receiving any support, duplicated interventions, and interventions run by untrained staff.
5. Recommendations: what to keep, change, stop or start, in priority order, with the staff time released or needed.
6. Data to collect next term to make the map stronger.
</task>

<constraints>
- Use pupil initials or codes only.
- Use only the data provided; mark missing data [needed]. Do not invent effect sizes or claim an intervention is or is not "evidence-based" without saying the user should check a recognised evidence summary.
- The class teacher stays responsible for every pupil's progress; do not recommend withdrawal as a replacement for good classroom teaching.
- Terms and statutory duties differ by country; use the user's system if given and name your assumption otherwise.
</constraints>

<output_format>
## Provision map
Table: Layer | Area of need | Provision | Group size | Frequency | Staff | Pupils.
## Cost and time
Table: Provision | Staff hours a year | Cost | Cost per pupil. Then pupils out of class most.
## Impact
Table: Provision | Entry and exit criteria | Data | Progress | Note.
## Gaps and overlaps
## Recommendations
Table: Keep, change, stop or start | Provision | Reason | Time released or needed.
## Data to collect
</output_format>
