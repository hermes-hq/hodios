---
schema: 1
id: care-worker-induction-track
kind: workflow
title: Care worker induction track
description: Runs a new care worker's induction in gated steps, from policies and mandatory training to shadow shifts, core skills sign-off, first solo visits with check-ins and an end-of-induction review.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [operations-manager, individual]
subject: [healthcare]
requires: [none]
inputs: [text, notes, spec]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [care-workers, staff-induction, new-starters, competency-assessment, shadowing, social-care]
pairs_with:
  prompts: [write-care-visit-notes, write-clinical-skills-checklist, write-safeguarding-concern-record]
  personas: [clinical-documentation-coach]
args:
  - name: service_type
    description: The kind of service. home-care is visits to people in their own homes; residential is a care home or supported living setting; day-service is a day centre or community support service.
    type: enum
    enum: [home-care, residential, day-service]
    default: home-care
  - name: standards
    description: The induction standards your service must meet and your mandatory courses, pasted or named, for example a national induction standard, moving and handling, medicines support, safeguarding, first aid. Leave empty to plan against common topics marked to confirm.
    type: text
  - name: weeks
    description: The length of the induction and probation period in weeks.
    type: number
    default: 12
steps:
  - {id: induction-plan, file: steps/01-induction-plan.md, stage: plan, gate: approve}
  - {id: shadow-shifts, file: steps/02-shadow-shifts.md, stage: operate, gate: approve}
  - {id: core-skills-sign-off, file: steps/03-core-skills-sign-off.md, stage: review, gate: approve}
  - {id: first-solo-work, file: steps/04-first-solo-work.md, stage: operate, gate: approve}
  - {id: induction-review, file: steps/05-induction-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a registered manager or senior carer through a new care worker's induction. Each step produces a short document and stops for approval. New care workers most often leave in their first weeks because they felt thrown in or unsupported; a paced induction with regular check-ins is something a service fully controls.

Service type: {{service_type}}
Induction period: {{weeks}} weeks
{{#standards}}
<standards>
{{standards}}
</standards>
{{/standards}}

{{> guardrails/professional-limits}}

Rules for every step:
- Plan the induction; do not teach clinical procedures. Moving and handling, medicines support and similar tasks are taught and assessed by qualified trainers under the service's policies.
- Competence is signed off only by a qualified, authorised assessor who has observed the worker. This workflow produces plans, checklists and records for that assessor; it never marks anyone as competent.
- Use the service's standards when given; otherwise mark common topics "[confirm against your required standards]", since requirements differ by country.
- No new worker carries out a task alone before it is signed off, and no one works alone with people until the background or criminal record checks the service requires are complete.
- Use roles and initials only; no personal details of staff or the people supported.
- If the manager describes a safeguarding concern, an injury or a medicine error during induction, tell them to follow their incident or safeguarding procedure first.
- Keep each step's document to one or two screens, end by saying what you need from the manager, and wait.
