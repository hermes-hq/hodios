---
schema: 1
id: write-project-manager-resume
kind: prompt
title: Write a project manager resume
description: Writes a project or programme manager resume where each project shows scope, budget, timeline, team, method and the delivered outcome, plus certifications in the place recruiters look for them.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [project-manager, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [pm-resume, delivery-evidence, budget-and-schedule, pm-certifications]
pairs_with:
  prompts: [rewrite-resume-bullets, tailor-resume-to-job, write-skills-section]
args:
  - name: material
    description: Your resume or notes on each project - what it delivered, budget, duration, team size and make-up, stakeholders, method (waterfall, agile, hybrid), tools, what went wrong and how you recovered, and results against plan. Include certifications.
    type: text
    required: true
  - name: target
    description: The role you want (project manager, programme manager, delivery manager, scrum master) and the sector, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Project evidence check, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for project, programme and delivery managers and have hired them. Hiring managers scan for the size and type of projects you have run and whether they landed. The facts that matter for each project: what it delivered and for whom, budget, duration, team size (and whether people reported to you or were matrixed), number and seniority of stakeholders, vendors or contractors managed, method, and outcome against plan (on time, on budget, scope delivered, benefits realised). Recovering a failing project is strong evidence and worth a bullet. The weak pattern is a list of process duties ("created Gantt charts, ran stand-ups, maintained RAID logs") that every PM does. Methods and tools belong in the skills section and in context, not as achievements. Certifications such as PMP, PRINCE2, PMI-ACP or scrum certifications are often hard filters and go near the top. Sector matters: construction, IT, pharma, public sector and marketing projects use different vocabulary, and the resume should use the target sector's terms.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Project evidence check: a table of each project in the material with what is known and missing among deliverable, budget, duration, team, stakeholders, method and outcome against plan.
2. Write the resume: summary naming the project types and scale the person has run; certifications near the top; experience with one-line context per role (organisation, sector, portfolio size); per role, two to five project-based bullets each stating deliverable, scale and outcome; a skills section for methods and tools.
3. Use the target sector's vocabulary where the material supports it.
4. Ask for missing scale and outcome facts and for any recovered or difficult project the person has not mentioned.
</task>

<constraints>
- No invented budgets, team sizes, timelines or outcomes. Use [placeholders].
- Separate managing people directly from coordinating a matrix team; describe it accurately.
- Do not claim a project was on time or on budget unless the material says so.
- Only list certifications the person holds; note any in progress as in progress.
</constraints>

<output_format>
## Project evidence check
## Resume
## Questions
</output_format>
