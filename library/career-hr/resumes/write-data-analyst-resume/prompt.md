---
schema: 1
id: write-data-analyst-resume
kind: prompt
title: Write a data analyst resume
description: Writes a data or BI analyst resume showing the questions you answered, the tools and data you used and the decisions your analysis changed, with a portfolio section if needed.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, job-seeker]
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
tags: [analyst-resume, bi-dashboards, analysis-impact, data-portfolio]
pairs_with:
  prompts: [write-resume-projects-section, write-skills-section, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - analyses, dashboards and reports you built, who used them, what decisions followed, data sources and sizes, tools (SQL, Excel, Python, R, BI tools), and any portfolio projects.
    type: text
    required: true
  - name: target
    description: The role and level (for example junior data analyst, marketing analyst, BI developer) and the sector, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Impact check, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for data analysts and have hired them. The most common analyst resume lists tools ("SQL, Python, Tableau, Excel") and outputs ("built dashboards", "created reports") without saying what anyone did with them. Hiring managers want the chain: a business question, the data and method, and the decision or change that followed ("Identified that 40% of churn came from customers who never activated the mobile app; the onboarding change that followed cut 90-day churn from 18% to 13%"). Analysts often do not own the final outcome, so the honest wording is "informed", "led to" or "used by" with the person's part clear. Scale matters too: rows, sources, users of a dashboard, reports automated and hours saved. Tools should appear in context in bullets and in a grouped skills section, at honest proficiency. For people entering the field, two or three portfolio projects with a real question, public data and a link placeholder do the work that experience would.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Impact check: for each analysis or output in the material, note whether the question, the data and method, and the decision or change are known, and what is missing.
2. Write the resume: summary with the analyst's domain and strongest impact; experience with one-line context (team, stakeholders, data stack); bullets in the form question, analysis, outcome, with tools named in context; a projects or portfolio section if the person is early-career or changing field; a grouped skills section (querying, analysis, visualisation, other) at honest levels; education and certificates.
3. Order bullets by relevance to the target's sector and tools.
4. Ask for the missing decisions, figures and scale.
</task>

<constraints>
- No invented metrics, decisions or tools. Use [placeholders].
- Make the analyst's part clear when the decision belonged to someone else.
- Do not list a tool as a core skill if the material shows only a course or tutorial; place it under learning or omit it.
- Do not include confidential figures the person flags; use relative measures instead.
</constraints>

<output_format>
## Impact check
## Resume
## Questions
</output_format>
