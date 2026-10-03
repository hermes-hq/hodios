---
schema: 1
id: thesis-track
kind: workflow
title: Thesis track
description: Takes a master's or doctoral thesis from proposal through plan, chapter cycles and whole-thesis revision to defence preparation, in gated steps with a supervisor checkpoint at each.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [plan, build, review]
role: [student, researcher]
requires: [none]
inputs: [topic, notes, document]
output: [plan, outline, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [thesis, dissertation, phd, masters-thesis, viva, supervision]
pairs_with:
  prompts: [refine-research-question, write-research-proposal, plan-thesis-structure, plan-phd-timeline, write-ethics-application, review-thesis-draft, turn-thesis-chapter-into-paper]
  personas: [thesis-advisor, academic-writing-coach, research-methodologist]
  rules: [academic-writing-rules]
args:
  - name: topic
    description: Your thesis topic or question as it stands, the field, what you have done so far (reading, data, drafts) and what your supervisor has said.
    type: text
    required: true
  - name: degree
    description: The degree and format, for example "MSc dissertation, 15,000 words", "PhD by monograph", "PhD by publication (3 papers)", plus your institution's rules if you have them.
    type: string
    required: true
  - name: deadline
    description: The submission deadline and any earlier milestones such as a proposal defence, confirmation review or ethics deadline.
    type: string
  - name: slug
    description: Short kebab-case name for the thesis, used for the folder the step artifacts are saved in.
    type: string
    default: thesis
steps:
  - {id: proposal, file: steps/01-proposal.md, stage: plan, gate: approve, artifact: "theses/{{slug}}/01-proposal.md"}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve, artifact: "theses/{{slug}}/02-structure-and-timeline.md"}
  - {id: chapters, file: steps/03-chapters.md, stage: build, gate: approve, artifact: "theses/{{slug}}/03-chapter-log.md"}
  - {id: revision, file: steps/04-revision.md, stage: review, gate: approve, artifact: "theses/{{slug}}/04-revision-plan.md"}
  - {id: defence, file: steps/05-defence.md, stage: review, gate: none, artifact: "theses/{{slug}}/05-defence-prep.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a thesis the way an experienced supervisor would: a defensible question and contribution first, then a structure and a timeline that work back from the real deadline, then chapter cycles of outline, draft and feedback, then a revision of the whole thesis as an examiner will read it, and finally preparation for the defence or viva. Each step writes one artifact and stops for approval. Each step also ends with a supervisor checkpoint: what to take to the supervisor, the questions to ask, and what to record from the meeting, because the supervisor and the institution, not this workflow, approve the thesis.

<topic>
{{topic}}
</topic>

Degree and format: {{degree}}
{{#deadline}}Deadline and milestones: {{deadline}}{{/deadline}}

Rules for every step:
- The thesis is the student's own work. Help by questioning, planning, outlining, reviewing drafts and modelling a short example; never write chapters or sections for submission, and never invent sources, data, results or quotations. Mark gaps as [MISSING: ...].
- Ask before assuming institutional rules (word limits, format, thesis by publication rules, examination process). Where they matter and are unknown, list them as questions for the supervisor or graduate school.
- Keep scope realistic for the degree: a master's thesis shows competence and a modest contribution; a PhD makes an original contribution to knowledge. Prefer a smaller finished thesis to a larger unfinished one.
- Remind the student once, at the start, to follow the institution's policy on AI assistance and disclosure.
- Carry decisions from approved artifacts forward instead of re-asking, and record any change the supervisor requests.
