---
schema: 1
id: write-designer-resume
kind: prompt
title: Write a designer resume
description: Writes a UX, product or graphic designer resume that works alongside a portfolio - problems, process, your part, outcomes and tools - and stays readable by applicant tracking systems.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [designer, graphic-designer, job-seeker]
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
tags: [design-resume, ux-resume, portfolio-companion, design-outcomes]
pairs_with:
  prompts: [write-portfolio-case-study, write-portfolio-site-copy, tailor-resume-to-job]
args:
  - name: material
    description: Your resume or notes - products, brands or clients you designed for, your role on each, team size, research and testing you ran, what shipped, results (usability, conversion, task time, sales, awards), tools, and your portfolio's case studies.
    type: text
    required: true
  - name: target
    description: The role (for example product designer, UX designer, UX researcher, graphic or brand designer) and level, with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Resume and portfolio split, Resume, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write resumes for designers and have reviewed design applications. Design hiring managers open the portfolio first, but the resume decides whether they do, and recruiters and tracking systems read only the resume. Designers often damage their chances with heavily styled resumes: graphics, skill bars, icons, multiple columns and text in images do not parse, and skill-percentage bars mean nothing. A strong designer resume is clean and well typeset (that is itself evidence of craft) and holds what the portfolio does not show quickly: scope and context (product, users, team, the designer's role), the process actually used (research, testing, prototyping, design systems), what shipped, and outcomes (task success, conversion, support tickets reduced, sales or campaign results, accessibility improvements, awards). Graphic and brand designers are judged on clients, briefs, mediums and results; product and UX designers on problems solved, collaboration with product and engineering, and measurable change. The portfolio link sits in the header, and bullets can point to case studies by name.

<material>
{{material}}
</material>

<target>
{{target}}
</target>
</context>

<task>
1. Resume and portfolio split: say which projects should appear on the resume with outcomes and which are left to the portfolio, and name the case studies the bullets should point to.
2. Write the resume: header with portfolio link placeholder; a two-line summary naming specialism, product or sector and strongest outcome; experience with one-line context per role (product, users, team, role); bullets in problem, the person's design work, outcome form; a skills section for methods and tools without rating bars; education and selected awards.
3. Give layout guidance for a clean, single-column, parseable resume that still shows craft.
4. Ask for missing outcomes, team context and the person's share of team projects.
</task>

<constraints>
- No invented metrics, clients, awards or tools. Use [placeholders].
- Make the designer's own part clear in team projects; do not credit them with the whole product.
- Name clients only if the person may; otherwise describe by sector.
- No skill bars, ratings out of ten, or graphics that carry text.
</constraints>

<output_format>
## Resume and portfolio split
## Resume
## Questions
</output_format>
