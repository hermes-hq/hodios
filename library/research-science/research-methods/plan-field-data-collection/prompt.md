---
schema: 1
id: plan-field-data-collection
kind: prompt
title: Plan a field data collection trip
description: Plans a field data collection trip with the sampling design, equipment and spares, permits, safety and lone-working arrangements, daily data backup and a daily log template.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [text, spec]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [fieldwork, sampling-design, field-safety, lone-working, data-backup, permits]
pairs_with:
  prompts: [design-sampling-plan, write-field-observation-protocol, write-lab-protocol, write-data-management-plan]
  personas: [research-methodologist]
args:
  - name: study
    description: What you are measuring and why - the question, the variables, the sampling unit (plot, transect, household, site) and the target number of samples if you know it.
    type: text
    required: true
  - name: location
    description: Where the fieldwork happens, including terrain, remoteness, mobile coverage and season if known, for example "upland peat bog, 2 hours' walk from the road, no signal, October".
    type: string
    required: true
  - name: days
    description: Number of days available in the field, including travel days.
    type: number
    required: true
  - name: team
    description: Number of people in the field team.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Sampling design, Schedule, Equipment and spares, Permits and permissions, Safety plan, Data handling, Daily log template, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Field data are expensive and often impossible to recollect: the season passes, the site floods, the grant ends. Trips go wrong in predictable ways: no buffer for weather, a single GPS or probe with no spare, sites chosen for convenience so the sample is biased, samples labelled differently by each person, data kept on one memory card, permits applied for too late, and nobody knowing where a lone worker is. A good plan fixes the sampling design before departure, schedules for bad days, carries spares for anything whose failure ends the trip, backs data up every evening, and has a safety plan that someone outside the team holds.
</context>

<task>
Plan fieldwork for this study at {{location}}: {{days}} days, a team of {{team}}.

<study>
{{study}}
</study>

1. Sampling design: the sampling unit, how sites or units are selected (random, stratified or systematic, and how the selection is made before arrival), replication, controls or reference sites, the order of visits (avoid confounding time of day or weather with treatment), the metadata recorded for every sample, and the minimum number of samples below which the trip cannot answer the question.
2. Schedule: a day-by-day plan for the {{days}} days with travel, set-up, sampling, and at least one buffer day for weather or failures (or say what gets cut first if there is no room). Estimate sampling time per unit and check the target is achievable with {{team}} people; if not, say what to reduce.
3. Equipment and spares: a checklist grouped as sampling, measurement (with calibration before departure and in the field), labelling and storage, data capture, power, safety and personal kit. Mark single points of failure and give each a spare or a fallback method.
4. Permits and permissions: landowner access, protected-area or collection permits, permits to move or export samples, ethics approval for work with people, and community or Indigenous consent where relevant. List these as items to confirm with the local authority and your institution, with lead times to check.
5. Safety plan: hazards for this location and season, a risk assessment summary, lone-working arrangements (check-in times, who holds the plan, what happens when a check-in is missed), communication without mobile signal if relevant, first aid, nearest medical help to look up, weather limits that stop work, and travel and vehicle safety.
6. Data handling: the sample labelling scheme, a file naming convention, what is recorded on paper and digitally, and a nightly routine: copy data to two separate devices, photograph paper sheets, check for gaps against the plan, and log any problems.
7. Daily log template: a copy-ready template.
8. Open questions: what you need to know to finish the plan.
9. Before you answer, check the schedule against the sampling time estimate and that every single point of failure has a spare.
</task>

<constraints>
- Do not state specific laws, permit names or emergency numbers as fact; tell the user to verify them for {{location}} with the relevant authority and their institution's safety office.
- Do not recommend lone working in remote or hazardous terrain without a check-in system; if {{team}} is 1, say what the plan needs and that the institution's lone-working policy decides whether it is allowed.
- Keep the sampling design honest: if the days available cannot support the study, say so.
- If the study description lacks the sampling unit or variables, ask for them and give a provisional plan with the assumptions marked.
</constraints>

<output_format>
Markdown with the sections in the output contract. Schedule and equipment as tables (Equipment: Item | Quantity | Spare or fallback | Checked). Daily log template in a code block, with fields for date, team, weather, sites visited, samples collected (ids), deviations from protocol, equipment issues, check-in times and backup done.
</output_format>
