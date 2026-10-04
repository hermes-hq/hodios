---
schema: 1
id: course-accessibility-retrofit-track
kind: workflow
title: Course accessibility retrofit track
description: Retrofits an existing course for accessibility in gated stages, from an audit of materials to prioritised fixes, reworked documents, media and assessments, and a check with learners.
category: course-design
version: 1.0.0
status: incubating
stage: [review, plan, build, verify]
role: [teacher, manager]
requires: [none]
inputs: [text, document, notes]
output: [report, checklist, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [accessibility-audit, wcag, inclusive-design, captions, alt-text, reasonable-adjustments]
pairs_with:
  prompts: [review-course-for-udl, convert-course-to-online, plan-course-assessment-mix]
  personas: [instructional-designer]
args:
  - name: course_materials
    description: An inventory of the course - documents (formats, page counts), slides, videos and audio (with or without captions), images and diagrams, the learning platform, live sessions, activities and assessments. Paste samples of text or describe them.
    type: text
    required: true
  - name: known_needs
    description: Optional. Access needs you already know about (anonymised), complaints or adjustment requests received, the institution's accessibility standard or policy, deadlines and who can do the work.
    type: text
steps:
  - {id: audit, file: steps/01-audit.md, stage: review, gate: approve, artifact: "accessibility/01-audit.md"}
  - {id: prioritise, file: steps/02-prioritise.md, stage: plan, gate: approve, artifact: "accessibility/02-fix-plan.md"}
  - {id: documents-and-media, file: steps/03-documents-and-media.md, stage: build, gate: approve, artifact: "accessibility/03-documents-and-media.md"}
  - {id: activities-and-assessment, file: steps/04-activities-and-assessment.md, stage: build, gate: approve, artifact: "accessibility/04-activities-and-assessment.md"}
  - {id: learner-check, file: steps/05-learner-check.md, stage: verify, gate: none, artifact: "accessibility/05-learner-check.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Retrofits an existing course so disabled learners, and everyone else, can use it without having to ask for adjustments first. It works the way an experienced learning technologist would: audit what exists, fix the barriers that block the most learners first, rework documents and media, then activities and assessment, and finally check with real learners. Each step writes one artifact and stops for approval.

<course_materials>
{{course_materials}}
</course_materials>
{{#known_needs}}

<known_needs>
{{known_needs}}
</known_needs>
{{/known_needs}}

Rules for every step:
- Work from the materials given. Where you cannot see a file, say what to check and how (for example run the authoring tool's accessibility checker, test with keyboard only, check with a screen reader) rather than guessing the result.
- Use the Web Content Accessibility Guidelines (WCAG) 2.2 level AA as the default reference unless the institution names another standard; cite success criteria by number only when sure, otherwise describe the requirement.
- Keep learning outcomes and academic standards the same; change the access, not the bar.
- Never ask for or record individual learners' diagnoses; talk about barriers and needs.
- Do not state legal duties as fact; say to check the institution's policy and local law with the disability or accessibility service.
- Mark anything missing as [X] and end each artifact with open questions.
