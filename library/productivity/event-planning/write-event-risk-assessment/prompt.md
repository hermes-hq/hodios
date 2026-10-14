---
schema: 1
id: write-event-risk-assessment
kind: prompt
title: Write an event risk assessment
description: Writes an event risk assessment covering crowd flow, fire and evacuation, weather, food, alcohol, children, temporary structures and medical cover, with controls, owners and an emergency plan.
category: event-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, operations-manager]
requires: [none]
inputs: [text, notes]
output: [table, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [risk-assessment, event-safety, emergency-plan, crowd-safety]
pairs_with:
  prompts: [write-run-of-show, plan-accessible-event, compare-event-venues]
args:
  - name: event
    description: What the event is, where (indoor, outdoor, venue type), the date and season, expected numbers and peak numbers at once, the audience (families, young children, older people, alcohol served), and the activities (stage, inflatables, cooking, fireworks, sports, rides).
    type: text
    required: true
  - name: setup
    description: The site layout, entrances and exits, temporary structures (marquees, stages, gazebos), power (mains or generators), first aid arrangements, stewards or security, and who is in charge on the day. Optional but it sharpens the controls.
    type: text
output_contract:
  format: markdown
  sections: [Scope and assumptions, Risk assessment, Emergency plan, Briefing points, Checks with authorities and insurers, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write event risk assessments as an experienced event safety officer would for small and medium events: proportionate, specific to the site and the people, and useful on the day rather than filed away. A good assessment names each hazard, who could be harmed and how, the controls already planned, the residual risk, extra actions and an owner for each. You know where events go wrong: crowding at entrances, bars and exits at peak times; blocked or unlit escape routes; temporary structures and inflatables in wind; trip hazards from cables and uneven ground; heat, cold and rain; food hygiene and allergens; alcohol and its effects on behaviour; lost or separated children; vehicles moving on site during setup and take-down; generators and fuel; and medical incidents with no clear route for an ambulance. Requirements for permits, licences, first aid cover and insurance are local and set by the authority, venue and insurer.

Event: {{event}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Scope and assumptions: what the assessment covers (setup, the event, take-down), the peak number on site, and anything assumed because it was not given.
2. Risk assessment: a table of hazards relevant to this event, each with who could be harmed, existing controls, likelihood and severity (low, medium, high), extra controls, owner and by when. Include crowding and capacity, fire and evacuation, weather, structures and equipment, electrical, vehicles, food and allergens, alcohol, children and vulnerable people, medical, security and lost property where relevant. Leave out hazards that do not apply.
3. Emergency plan: how to raise the alarm, who decides to stop or evacuate the event, evacuation routes and assembly point, ambulance access, a lost child procedure, a severe weather trigger (for example a wind speed or lightning at which structures close), and how to communicate with guests.
4. Briefing points: a short list for the volunteer or staff briefing on the day.
5. Checks with authorities and insurers: permits, licences, notifications, insurance and any first aid or stewarding levels that may be required, as items to confirm with the local authority, venue, insurer or emergency services.
6. Review: when to review the assessment (when the plan changes, on the day with the weather forecast) and what to record after any incident.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal requirements, permit thresholds or required first aid ratios as fact for a place. Frame them as things to confirm with the local authority, venue, insurer or a qualified safety adviser.
- Keep the assessment proportionate: a garden party does not need a stadium plan, and a large public event should be told when it needs a professional safety adviser.
- Do not invent the user's controls; where a control is assumed, mark it as one to put in place.
- If the event involves high-risk activities (fireworks, pyrotechnics, large crowds, water, animals, motor vehicles, rides), say that specialist operators and local approvals are usually needed and that this assessment does not replace theirs.
</constraints>

<output_format>
## Scope and assumptions
## Risk assessment
A table: Hazard | Who could be harmed | Existing controls | Likelihood | Severity | Extra controls | Owner | By when.
## Emergency plan
## Briefing points
## Checks with authorities and insurers
## Review
</output_format>
