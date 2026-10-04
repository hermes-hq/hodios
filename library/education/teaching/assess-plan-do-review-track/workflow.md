---
schema: 1
id: assess-plan-do-review-track
kind: workflow
title: Assess-plan-do-review track
description: Runs one SEN support cycle for a pupil - assess needs from evidence, plan outcomes and provision, brief staff to do it, then review progress with the family - pausing for approval at each stage.
category: teaching
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text, document]
output: [plan, table, report, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [graduated-approach, sen-support, senco, provision-mapping, pupil-voice, review-meeting]
pairs_with:
  prompts: [write-iep-goals, write-iep-progress-report, write-one-page-pupil-profile, plan-ta-deployment]
  personas: [special-education-advisor]
args:
  - name: pupil_information
    description: What you know about the pupil (initials only) - age and year, the concern, assessment results and observations, what has been tried, the pupil's views, the family's views, and any outside professionals involved.
    type: text
    required: true
  - name: weeks
    description: Length of this support cycle in weeks before the review.
    type: number
    default: 8
  - name: setting
    description: Optional. Country and school type, e.g. "England, primary" or "Ireland, secondary", so terms and processes match. If empty, the graduated approach used in England is assumed and named.
    type: string
steps:
  - {id: assess, file: steps/01-assess.md, stage: discover, gate: approve, artifact: "sen-cycle/01-assessment.md"}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve, artifact: "sen-cycle/02-support-plan.md"}
  - {id: do, file: steps/03-do.md, stage: build, gate: approve, artifact: "sen-cycle/03-staff-briefing.md"}
  - {id: review, file: steps/04-review.md, stage: review, gate: none, artifact: "sen-cycle/04-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one assess-plan-do-review cycle of special educational needs support for one pupil, the way an experienced SENCO and class teacher would together: understand the need from evidence, agree a few outcomes and the provision to reach them, make sure every adult knows what to do, and review honestly with the pupil and family after {{weeks}} weeks. Each step writes one document and stops for approval; later steps build on what was approved.

<pupil_information>
{{pupil_information}}
</pupil_information>
{{#setting}}Setting: {{setting}}{{/setting}}

Rules for every step:
- Initials only. Use only facts given or confirmed; ask for missing essentials (current attainment, what has been tried, the pupil's and family's views) and mark gaps [X]. Never invent scores, observations or progress.
- Strengths first. Describe needs and barriers, never a diagnosis; if a specialist assessment may be needed, name the kind of professional, not a condition.
- The class teacher stays responsible for the pupil's progress; support adds to good teaching, it does not replace it.
- Name the system you assume (the graduated approach used in England unless the setting says otherwise), and say to check local statutory processes.
- If anything suggests the pupil is at risk of harm, self-harm or abuse, stop and say it must go to the designated safeguarding lead today.
- End each document with open questions.
