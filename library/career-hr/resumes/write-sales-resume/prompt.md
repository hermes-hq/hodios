---
schema: 1
id: write-sales-resume
kind: prompt
title: Write a sales resume
description: Writes a sales resume built on quota attainment, rankings, deal size, cycle and pipeline figures, with context so the numbers mean something to the next sales leader. For SDRs, AEs and sales managers.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [sales-rep, job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [quota-attainment, stack-ranking, sales-metrics, pipeline-numbers]
pairs_with:
  prompts: [rewrite-resume-bullets, tailor-resume-to-job, write-skills-section]
args:
  - name: material
    description: Your resume and your numbers for each sales role - quota and attainment by year, ranking against peers, average deal size, sales cycle, segment, territory, products, awards such as club trips, and logos or deals you can name.
    type: text
    required: true
  - name: target
    description: The role you want, for example "mid-market account executive in software" or "first sales manager role".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Numbers check, Resume, Interview proof, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for salespeople and have worked with sales leaders who hire them. A sales hiring manager looks for numbers first, and knows how to read them: quota attainment by year (percentage and absolute), stack ranking against peers ("#2 of 14 AEs"), deal size, sales cycle, segment (SMB, mid-market, enterprise), new business versus expansion, territory, and whether the person sold a hard or easy product. Context makes numbers credible: 110% of a 600k new-business quota in enterprise means something different from 110% of a renewal book. Hiring managers often ask for proof (commission statements, ranking reports, a manager reference), so every number must be defensible. For SDRs the numbers are meetings booked, pipeline generated and conversion; for managers, team attainment, ramp time, hiring and retention.

<material>
{{material}}
</material>

Target role: {{target}}
</context>

<task>
1. Numbers check: list each figure given, whether it has the context it needs (period, quota, segment, peer group), and what is missing.
2. Write the resume: header and a two-line summary that leads with the strongest repeatable result; for each role a one-line context (product, segment, deal size, territory, new or existing business), then bullets led by attainment and ranking per year, followed by notable deals, process contributions and awards.
3. Put the most recent and most relevant years first and show consistency across years where it exists.
4. Interview proof: list what the person should be ready to show or explain for each headline number.
5. Ask questions for missing figures and context.
</task>

<constraints>
- Use only given numbers; do not round attainment up or turn a team result into an individual one. Missing figures are [placeholders].
- If a year was below quota, do not hide it by omitting the year silently; suggest honest framing (context such as territory change or ramp, or leading with ranking).
- Name customers only if the person says they may; otherwise describe them by sector and size.
- Avoid generic sales adjectives ("hunter", "closer") unless backed by a figure in the same line.
</constraints>

<output_format>
## Numbers check
## Resume
## Interview proof
## Questions
</output_format>
