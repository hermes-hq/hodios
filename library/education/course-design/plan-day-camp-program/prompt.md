---
schema: 1
id: plan-day-camp-program
kind: prompt
title: Plan a themed day camp week
description: Plans a themed day camp with a daily schedule, activities by age group, staffing ratios, rainy-day swaps and a safety checklist. For camp directors, schools, libraries and community groups.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher, parent, operations-manager]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [day-camp, summer-camp, holiday-club, youth-programme, staffing-ratios, risk-assessment]
pairs_with:
  prompts: [plan-after-school-club, plan-field-trip, plan-kids-summer]
args:
  - name: theme
    description: The camp theme, e.g. "space explorers", "junior chefs", "inventors' workshop".
    type: string
    required: true
  - name: ages
    description: Age range and expected number of children, e.g. "ages 5-11, about 40 children".
    type: string
    required: true
  - name: days
    description: Number of camp days.
    type: number
    default: 5
  - name: staff
    description: Optional number of staff or volunteers available each day. Leave empty to have the plan calculate what you need.
    type: number
output_contract:
  format: markdown
  sections: [Camp overview, Groups and staffing, Daily schedule, Activities by day, Rainy-day swaps, Safety checklist, Packing and communication, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good day camp runs on a predictable daily rhythm that children quickly learn, with a theme that builds across the week toward a finale families can see. Activities must suit each age group: younger children need shorter blocks, more movement and more adult help; older children want challenge and some choice. Most problems on the day come from logistics, not activities: drop-off and pick-up, transitions between areas, heat and weather, allergies and medication, and not knowing where every child is. Staffing ratios and licensing rules vary by country, state and activity type and must be checked locally.
</context>

<task>
Plan a {{days}}-day **{{theme}}** day camp for **{{ages}}**.
{{#staff}}Staff or volunteers available per day: {{staff}}.{{/staff}}

1. If the number of children is not given, ask for it and stop, because staffing and groups depend on it. If the daily hours or venue (indoor, outdoor, both) are unknown, assume 9:00 to 15:00 with indoor and outdoor space and list the assumption.
2. **Groups and staffing:** split the children into age groups, give a working adult-to-child ratio per group as a starting point marked "confirm against local rules", calculate the staff needed per group plus floaters for toilets, first aid and transitions, and compare with the staff available if given. If there are not enough staff, say so plainly and suggest what to change.
3. **Daily schedule:** a repeating timetable with arrival, opening circle, activity blocks, snack, lunch, quiet time for younger children, outdoor time and closing circle, with transitions built in.
4. **Activities by day:** a daily sub-theme building to a finale (show, exhibition, mission, cook-off). For each day give 3 to 4 activities with a version for each age group, materials, and the staff needed to run it.
5. **Rainy-day and heat swaps:** an indoor replacement for every outdoor activity, plus a heat plan (shade, water breaks, moving active play to cooler times).
6. **Safety checklist:** registration forms with allergies, medical needs, medication and authorised collectors; daily headcounts at every transition; sign-in and sign-out; first aid and a named first-aider; emergency and lost-child procedures; food allergy controls for any food activity; sun and hydration; water activities only with qualified supervision; staff background checks per local requirements; and a written risk assessment for each activity with hazards.
7. **Packing and communication:** what children bring, a welcome message for families, and the end-of-week invitation to the finale.
</task>

<constraints>
- Never present ratios, licensing, background-check or first-aid requirements as legal fact; label them "confirm with local regulations or your insurer".
- Activities use safe, age-appropriate materials; flag any that need extra supervision (cooking heat, tools, glue guns, water).
- Food activities must include allergy controls; no activity relies on nuts or other common allergens without an alternative.
- Keep the plan realistic for the staff count; do not plan activities that need more adults than available.
</constraints>

<output_format>
## Camp overview
Theme arc across the days and the finale.
## Groups and staffing
Table: Group | Ages | Children | Working ratio (confirm locally) | Staff needed. Then a staffing gap note.
## Daily schedule
Table: Time | Younger group | Older group.
## Activities by day
A `###` heading per day with a table: Activity | Younger version | Older version | Materials | Staff.
## Rainy-day swaps
Table: Outdoor activity | Indoor swap. Then the heat plan.
## Safety checklist
Checkbox list grouped by Before camp, Every day, Activity-specific.
## Packing and communication
Packing list and a short family welcome message.
## Assumptions to confirm
Bullets.
</output_format>
