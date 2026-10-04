---
schema: 1
id: parental-leave-return-track
kind: workflow
title: Return from parental leave track
description: Guides an employee back from parental leave in gated steps, from keep-in-touch days and the return conversation to a flexible work request, childcare logistics, the first weeks and rebuilt visibility.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, script, message, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [parental-leave, maternity-leave, return-to-work, keep-in-touch-days, childcare, working-parents]
pairs_with:
  prompts: [propose-flexible-work, increase-work-visibility, write-brag-document, plan-one-on-one]
  personas: [career-coach]
args:
  - name: leave_end_date
    description: The date your leave ends and you are due back, and today's date or how many weeks are left, for example "back on 3 March, about 6 weeks from now".
    type: string
    required: true
  - name: role
    description: Your job, level and team, and anything that changed while you were away (new manager, reorganisation, someone covering your work).
    type: string
    required: true
  - name: desired_schedule
    description: The working pattern you want on return, if different - fewer days, compressed hours, set finish times, remote days, a phased return. Leave empty if returning to the same pattern.
    type: text
  - name: country
    description: Country (and state or region) where you work, because leave, keep-in-touch arrangements, flexible-work rights and breastfeeding provisions differ.
    type: string
    required: true
steps:
  - {id: reconnect, file: steps/01-reconnect.md, stage: plan, gate: approve, artifact: "parental-return/01-reconnect-plan.md"}
  - {id: return-conversation, file: steps/02-return-conversation.md, stage: plan, gate: approve, artifact: "parental-return/02-return-conversation.md"}
  - {id: flexible-request, file: steps/03-flexible-request.md, stage: build, gate: approve, artifact: "parental-return/03-flexible-request.md"}
  - {id: childcare, file: steps/04-childcare-logistics.md, stage: plan, gate: approve, artifact: "parental-return/04-childcare-plan.md"}
  - {id: first-weeks, file: steps/05-first-four-weeks.md, stage: operate, gate: approve, artifact: "parental-return/05-first-four-weeks.md"}
  - {id: visibility, file: steps/06-rebuild-visibility.md, stage: build, gate: none, artifact: "parental-return/06-visibility-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Plans one return from parental leave from the employee's side: reconnect before day one, agree the return with the manager, ask for a sustainable working pattern, make childcare solid with a backup, pace the first four weeks, then rebuild visibility so the leave does not stall the career. Each step produces one artifact and stops for approval. (Managers planning someone's return: use plan-return-from-leave.)

Leave ends: {{leave_end_date}}
Role: {{role}}
Country: {{country}}
{{#desired_schedule}}
<desired_schedule>
{{desired_schedule}}
</desired_schedule>
{{/desired_schedule}}

Rules for every step:
- Work back from the leave end date; if the date has passed or is under two weeks away, compress steps 1 to 4 into what can still be done and say so.
- Use only facts the person gave or confirmed; mark gaps as [X] with a question. Ask before assuming a partner, family help or a particular childcare type.
- Rights to keep-in-touch days, flexible work requests, returning to the same job, and breastfeeding breaks differ by country and employer. Name what to check for {{country}} and where (employer policy, HR, the official labour authority); never state them as settled law.
- If the person describes being sidelined, demoted, pressured to resign or treated worse because of pregnancy, leave or caring, say once that this may be unlawful in many places and suggest HR, a union or an employment advice service.
- If exhaustion, low mood or anxiety sounds like more than adjustment (postnatal depression can affect any parent), acknowledge it and suggest a doctor or health visitor. If anything suggests danger to parent or child, point to emergency services or a crisis line first.
- Keep plans realistic for someone with broken sleep: short scripts, few actions per week, defaults they can accept or change.
