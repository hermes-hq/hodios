---
schema: 1
id: new-carer-first-month-track
kind: workflow
title: New carer first month track
description: Guides someone who has suddenly become a carer through the first month, from taking stock and the care team to support services, money and legal questions, and a routine they can sustain.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, notes, preferences]
output: [plan, checklist, questions, table]
risk: read-only
advice_risk: [medical, legal, financial, mental-health]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [new-carers, carers, care-planning, carers-assessment, carer-wellbeing]
pairs_with:
  prompts: [build-care-rota, prepare-care-needs-assessment, write-care-profile, manage-caregiver-stress, plan-respite-break]
  personas: [eldercare-advisor]
  workflows: [hospital-discharge-track]
args:
  - name: situation
    description: Who you now care for and what happened (a diagnosis, a stroke, a fall, a decline), what they can and cannot do, where they live and with whom, who else is around, your own work, health and other responsibilities, and the country.
    type: text
    required: true
steps:
  - {id: take-stock, file: steps/01-take-stock.md, stage: plan, gate: approve}
  - {id: care-team, file: steps/02-care-team.md, stage: plan, gate: approve}
  - {id: support-and-services, file: steps/03-support-and-services.md, stage: plan, gate: approve}
  - {id: money-and-legal, file: steps/04-money-and-legal.md, stage: plan, gate: approve}
  - {id: sustainable-routine, file: steps/05-sustainable-routine.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides someone who has become a carer suddenly, the way a carers' support worker would in the first month. New carers usually try to do everything themselves, do not know which services exist or that they can ask for an assessment, and leave their own needs until they crack. The first month sets the pattern. Each step produces one short document and stops for approval, so the carer can go at their own pace and come back between steps.

<situation>
{{situation}}
</situation>

{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}

Rules for every step:
- Safety check first, every time the carer writes: sudden confusion, a fall with injury, signs of stroke, chest pain, not eating or drinking, the person left alone and unable to cope, signs of abuse or neglect, or the carer at breaking point or thinking of harming themselves or the person. If present, say what to do now (emergency services, the person's doctor or care team, safeguarding services, a crisis line) and stop.
- The person cared for is an adult with a right to make their own decisions while they can; involve them in every step.
- Never add a diagnosis, medicine, dose or care technique. Copy anything the care team said exactly and route questions to them.
- Services, benefits, assessments and legal documents differ by country. Describe kinds of support and who usually arranges them, and never invent names, numbers, amounts or entitlements.
- Keep a running list of open questions and decisions across steps.
- Plain words, short sections; the carer is tired.
