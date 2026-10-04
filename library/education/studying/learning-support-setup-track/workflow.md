---
schema: 1
id: learning-support-setup-track
kind: workflow
title: Learning support setup track
description: Helps a disabled student set up support at college or university by mapping barriers by task, preparing for a needs assessment, requesting adjustments, setting up tools and reviewing after a term.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [student, parent]
requires: [none]
inputs: [text, notes, document]
output: [plan, table, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [reasonable-adjustments, needs-assessment, assistive-technology, disability-support, exam-access]
pairs_with:
  prompts: [adapt-study-for-learning-difference, reformat-notes-for-accessibility]
  personas: [assistive-technology-specialist]
args:
  - name: needs
    description: The condition or conditions in your own words (diagnosed or being assessed), how they affect studying day to day, what has helped before (school support, exam arrangements, tools), and what evidence you have (reports, letters).
    type: text
    required: true
  - name: institution_type
    description: Where you are or will be studying, e.g. "university in Scotland, starting in September", "community college in Ontario", "vocational college". Include the country.
    type: string
    required: true
steps:
  - {id: map-barriers, file: steps/01-map-barriers.md, stage: discover, gate: approve, artifact: "support/01-barriers.md"}
  - {id: needs-assessment, file: steps/02-needs-assessment.md, stage: plan, gate: approve, artifact: "support/02-assessment-prep.md"}
  - {id: request-adjustments, file: steps/03-request-adjustments.md, stage: build, gate: approve, artifact: "support/03-request.md"}
  - {id: set-up-tools, file: steps/04-set-up-tools.md, stage: build, gate: approve, artifact: "support/04-tools.md"}
  - {id: term-review, file: steps/05-term-review.md, stage: review, gate: none, artifact: "support/05-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Helps a disabled student (or a parent supporting a younger student) get the right support in place at {{institution_type}}. Support goes wrong when students wait until they are struggling, describe their diagnosis rather than the barriers it creates in specific tasks, ask for vague help instead of named adjustments, miss application deadlines for exam arrangements or funding, or get adjustments agreed that lecturers never apply. This track works from tasks to barriers to adjustments, prepares the paperwork, sets up tools, and checks after a term that support is actually happening.

<needs>
{{needs}}
</needs>

Rules for every step:
{{> guardrails/professional-limits}}
- Disability support systems, funding, evidence rules and legal duties differ by country and institution. Confirm the country first; describe common patterns, mark them to verify, and point to the institution's disability or accessibility service as the authority. Do not state legal rights, funding amounts or deadlines as fact.
- The student decides what to disclose and to whom. Never pressure disclosure; explain what support depends on it.
- Use only what the student shares. Do not diagnose or question a diagnosis; describe needs in terms of barriers and tasks.
- Do not draft legal threats or say what a court or tribunal would decide. Requests tied to barriers and evidence come first; if one is refused, explain the internal appeal or complaint route and suggest a disability adviser, students' union adviser, advocate or lawyer.
- If the student mentions a crisis, self-harm or being unsafe, stop and point them to local emergency services or a crisis line in their country.
- Each step ends by stopping for the student's approval.
