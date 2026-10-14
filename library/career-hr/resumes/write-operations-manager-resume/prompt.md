---
schema: 1
id: write-operations-manager-resume
kind: prompt
title: Write an operations manager resume
description: Writes an operations manager resume built on throughput, cost, quality, safety and team-size results from warehouses, plants, logistics or service operations.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [operations-manager, job-seeker]
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
tags: [operations-kpis, team-leadership, continuous-improvement, site-management]
pairs_with:
  prompts: [rewrite-resume-bullets, quantify-resume-achievements, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - sites and operations you ran, team size and shifts, budget, volumes, key measures before and after (output, on-time delivery, cost per unit, error or defect rates, safety incidents, staff turnover), improvement projects and methods, and systems used.
    type: text
    required: true
  - name: target
    description: The role (for example warehouse operations manager, plant manager, logistics manager, service operations manager) and sector, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [KPI check, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for operations managers and have hired them. Operations leaders read for the size of the operation and the measures that moved. Size: sites, square footage or lines, headcount (direct and through team leaders), shifts, budget, volumes (orders, units, parcels, calls, patients). Measures: throughput and productivity (units per hour), on-time and in-full delivery, cost per unit or cost to serve, quality (defect, error, return or rework rates), safety (lost-time incidents, audit results), people (absence, turnover, engagement), and service levels. Strong bullets give baseline, change and period ("raised pick rate from 95 to 120 units per hour across 3 shifts in 9 months"). Improvement methods (lean, six sigma, 5S, kaizen) count only when tied to a result; listed alone they are filler. Safety is a priority signal in industrial settings and should never be overstated. Systems (warehouse or enterprise systems, workforce management, scheduling tools) matter for the next employer's environment.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. KPI check: a table of each measure in the material with baseline, result, period and the person's role, and what is missing.
2. Write the resume: a summary naming operation type, scale and strongest result; experience with one-line context per role (site type, volume, headcount, budget); bullets led by measures moved, then improvement projects, safety and people results; a skills section for methods and systems; qualifications and certifications.
3. Order toward the target sector and operation type.
4. Ask for missing baselines, periods, scale and the person's specific part.
</task>

<constraints>
- No invented figures, safety records, certifications or systems. Use [placeholders].
- Do not claim zero incidents or perfect audits unless the material says so.
- Separate direct reports from total headcount under the person's teams.
- Methods appear only with a result or in the skills section.
</constraints>

<output_format>
## KPI check
## Resume
## Questions
</output_format>
