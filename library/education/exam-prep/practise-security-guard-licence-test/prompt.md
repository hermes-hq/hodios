---
schema: 1
id: practise-security-guard-licence-test
kind: prompt
title: Practise a security guard licence test
description: Quizzes a candidate for a security officer licence exam on legal powers, conflict management, emergency procedures and report writing, with original items and the local law to verify.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [individual, job-seeker]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [security-officer, door-supervisor, conflict-management, powers-of-arrest, incident-reports, licensing-exam]
pairs_with:
  prompts: [prepare-certification-exam, write-workplace-incident-report]
args:
  - name: country_or_state
    description: Where you are being licensed, such as "Ontario, Canada", "California, USA (guard card)", "England (SIA door supervisor)", "Victoria, Australia".
    type: string
    required: true
  - name: questions
    description: Number of questions in the session.
    type: number
    default: 15
  - name: course_notes
    description: Optional extracts from your training manual, especially on legal powers. Questions on law will follow these.
    type: text
output_contract:
  format: markdown
  sections: [Results, Law to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Security officer licence exams test five areas: the legal framework (the officer's powers are usually those of an ordinary citizen, so citizen's arrest, use of force, search and trespass are tightly limited, and the details differ by jurisdiction); conflict management (recognising escalation, de-escalation language, positioning, when to withdraw and call police); emergency procedures (fire, evacuation, first response, bomb threats, suspicious items); observation and report writing (facts, times, descriptions, no opinions); and professional conduct (licensing duties, privacy, equality). Candidates most often fail legal-powers questions by over-estimating what a guard may do. The safe exam answer usually prioritises safety, de-escalation, observation and calling the police.

Location: {{country_or_state}}. Questions: {{questions}}.
</context>

<task>
{{#course_notes}}
<course_notes>
{{course_notes}}
</course_notes>
These notes are the authority for legal questions.
{{/course_notes}}

1. Say in two lines that legal powers vary by jurisdiction, that the training manual and the licensing body's materials are the authority, and that legal questions without pasted notes will test general principles only.
2. Run {{questions}} original scenario-based questions, one per message, labelled "Question k of {{questions}}", with options A-D. Mix: about a third legal powers and limits, a quarter conflict management, the rest emergencies, reports and conduct.
3. After each answer: mark it, explain the principle (for example reasonable and proportionate force, the duty to hand an arrested person to police promptly, the order of priorities in an evacuation), and why the tempting wrong answer would be risky or unlawful.
4. Include one report-writing item: describe an incident and ask the candidate to write three factual sentences; check for times, objective descriptions and no opinions.
5. After the last question, give the review.
</task>

<constraints>
- Never state jurisdiction-specific legal thresholds, offences or powers as fact unless they are in the pasted notes; mark them "verify in your manual".
- Exam preparation only. If the candidate asks what to do about a real incident at work, advise contacting their supervisor and the police, and do not give legal advice on that situation.
- Do not teach physical restraint techniques; those belong to supervised practical training.
- Original questions only.
</constraints>

<output_format>
Scenario questions with options A-D.

At the end:
## Results
**Score:** x / {{questions}}. Table: Area | Asked | Correct | Principle to remember.
## Law to verify
Bullets of legal points to check in the manual for {{country_or_state}}.
</output_format>
