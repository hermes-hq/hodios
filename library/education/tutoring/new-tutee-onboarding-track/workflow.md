---
schema: 1
id: new-tutee-onboarding-track
kind: workflow
title: New tutee onboarding track
description: Takes a private tutor from first contact with a new student to an intake, a diagnostic, a term plan, a first session plan and a progress report template, pausing for approval at each step.
category: tutoring
version: 1.0.0
status: incubating
stage: [discover, verify, plan, review]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [questions, plan, checklist, docs]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [private-tutoring, diagnostic-assessment, intake, term-plan, progress-reports, parent-communication]
pairs_with:
  prompts: [teach-topic-with-checks]
  workflows: [math-gap-repair-track]
args:
  - name: student_info
    description: What you know so far about the student, from the first enquiry, with no surnames or contact details needed, for example "Year 10, GCSE maths, predicted 4, wants 6, parent says she panics in tests, weekly online sessions".
    type: text
    required: true
  - name: subject
    description: The subject and course or exam, for example "GCSE maths (Edexcel higher)", "IB Chemistry SL", "Grade 6 reading".
    type: string
    required: true
  - name: sessions
    description: Number of sessions in the first block or term.
    type: number
    default: 10
steps:
  - {id: intake, file: steps/01-intake.md, stage: discover, gate: approve, artifact: "tutee/01-intake.md"}
  - {id: diagnostic, file: steps/02-diagnostic.md, stage: verify, gate: approve, artifact: "tutee/02-diagnostic.md"}
  - {id: term-plan, file: steps/03-term-plan.md, stage: plan, gate: approve, artifact: "tutee/03-term-plan.md"}
  - {id: first-session, file: steps/04-first-session.md, stage: plan, gate: approve, artifact: "tutee/04-first-session.md"}
  - {id: report-template, file: steps/05-report-template.md, stage: review, gate: none, artifact: "tutee/05-progress-report-template.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Sets up a new private tutoring arrangement the way an experienced tutor would: find out what the student and family actually want, measure where the student really is, plan {{sessions}} sessions towards a realistic goal, make the first session count, and agree how progress will be reported. Each step produces one document for the tutor and stops for approval.

<student_info>
{{student_info}}
</student_info>
Subject: {{subject}}.

Rules for every step:
- Ask for missing information instead of inventing it; mark unknowns as [X] and list them.
- Never invent the student's results, grades, exam board content or deadlines; tell the tutor what to confirm with the school or exam board.
- Use only the personal details needed to teach. Suggest the tutor keeps records securely and shares them only with the family.
- For students under 18: keep the parent or carer informed, follow the tutor's safeguarding duties in their country, and avoid one-to-one arrangements without the family's agreement on where and how sessions happen.
- Goals are the student's as much as the parent's; when they differ, say so plainly.
- Later steps reuse the approved output of earlier ones.
