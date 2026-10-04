---
schema: 1
id: end-point-assessment-track
kind: workflow
title: End-point assessment track
description: Prepares an apprentice for end-point assessment in gated steps covering gateway readiness, portfolio mapping, professional discussion practice, project or observation prep and a test-day plan.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, review, verify, ship]
role: [student, manager, teacher]
requires: [none]
inputs: [text, document]
output: [checklist, table, questions, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [end-point-assessment, apprenticeship, gateway, portfolio-evidence, professional-discussion, ksbs]
pairs_with:
  prompts: [prepare-oral-exam, plan-exam-day-strategy, design-apprenticeship-plan]
  personas: [apprenticeship-assessor]
args:
  - name: standard
    description: The apprenticeship standard and level, such as "Level 3 Software Development Technician", "Level 2 Hospitality Team Member", "Level 4 Project Manager".
    type: string
    required: true
  - name: assessment_methods
    description: The assessment methods and grading from the assessment plan, ideally pasted with the criteria, such as "knowledge test; professional discussion underpinned by portfolio; work-based project with presentation".
    type: text
    required: true
  - name: gateway_date
    description: The planned gateway date, such as "15 March" or "in 8 weeks".
    type: string
    required: true
steps:
  - {id: gateway, file: steps/01-gateway-readiness.md, stage: plan, gate: approve, artifact: "epa/01-gateway-readiness.md"}
  - {id: portfolio, file: steps/02-portfolio-mapping.md, stage: review, gate: approve, artifact: "epa/02-portfolio-map.md"}
  - {id: discussion, file: steps/03-discussion-practice.md, stage: verify, gate: approve, artifact: "epa/03-discussion-practice.md"}
  - {id: method-prep, file: steps/04-project-or-observation.md, stage: verify, gate: approve, artifact: "epa/04-method-prep.md"}
  - {id: assessment-day, file: steps/05-assessment-day.md, stage: ship, gate: none, artifact: "epa/05-assessment-day-plan.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares an apprentice for end-point assessment the way a good training provider and an independent assessor would together: confirm readiness honestly, map the apprentice's own evidence to every criterion, practise each assessment method under realistic conditions, and plan the days themselves. Each step writes one artifact and stops for approval.

<standard>
{{standard}}
</standard>

<assessment_methods>
{{assessment_methods}}
</assessment_methods>

Gateway date: {{gateway_date}}

Rules for every step:
- Work from the criteria the user pastes. If the knowledge, skills and behaviours or grading criteria are not given, ask for them; never reconstruct an assessment plan from memory, and mark gaps [X].
- The apprentice's evidence must be their own. Help them find, describe and present it; never write or invent evidence, project content or answers.
- Do not predict grades or state rules on resits, appeals or timescales; tell them to check the assessment plan and their assessment organisation.
- Keep confidential employer and personal data out of portfolio examples; suggest redaction.
- End each artifact with open questions for the apprentice, employer or provider.
