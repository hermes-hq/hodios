---
schema: 1
id: convert-academic-cv-to-industry-resume
kind: prompt
title: Convert an academic CV into an industry resume
description: Turns a long academic CV into a two-page industry resume, translating research into skills, outcomes and business language and cutting publication lists. Use when leaving academia.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [leaving-academia, phd-to-industry, postdoc-transition, transferable-skills]
pairs_with:
  prompts: [write-academic-cv, reframe-for-career-change, write-skills-section]
args:
  - name: cv
    description: Your academic CV - positions, PhD and postdoc work, methods, publications, grants, teaching, supervision, service, software or datasets you built.
    type: text
    required: true
  - name: target
    description: The industry role or roles you are aiming at (for example data scientist, R&D scientist, policy analyst, UX researcher), with a posting if you have one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Translation map, Resume, What was cut, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help researchers move from academia into industry, government and non-profit roles. An academic CV proves scholarly standing through lists: every publication, talk, grant and committee. An industry hiring manager wants to know in a page or two what problems you can solve for them, with which methods and tools, at what scale, and with whom. The translation experts make: a PhD or postdoc is experience (a multi-year project you ran, often listed as a role with dates, not only under education); research questions become problems; methods become named skills and tools (statistical modelling in R, cell culture, survey design, Python pipelines); papers and grants become outcomes and evidence of communication and persuasion ("secured 180k in competitive funding", "results adopted in national guidance"); supervising students becomes mentoring and managing; running a lab, a consortium or a conference becomes project and stakeholder management. Jargon from the subfield is replaced by plain terms a non-specialist recruiter recognises. Publications shrink to a short "Selected publications" line or a count, unless the target is industry R&D where a few key papers matter.

<cv>
{{cv}}
</cv>

<target>
{{target}}
</target>
</context>

<task>
1. Translation map: a table of academic items from the CV and their industry equivalents (skill, outcome or responsibility), noting which matter for the target role.
2. Write a resume of at most two pages: a summary naming the target role and the strongest transferable evidence; a skills section of methods and tools the CV demonstrates; experience with the PhD, postdoc and any other research posts written as roles with achievement bullets; education condensed; selected publications or a one-line count only if useful to the target; teaching and service reduced to bullets that show relevant skills.
3. What was cut: list the categories of material removed or condensed and why, so the person knows nothing was lost by accident.
4. Questions: ask for missing scale, impact, collaborators, tools or results that industry readers expect.
</task>

<constraints>
- Do not invent skills, tools, results or industry experience. If a tool is implied but not stated, ask rather than assume.
- Keep claims accurate: a contribution to a multi-author paper is described as that, not as leading the study.
- Remove unexplained subfield jargon and acronyms; keep technical terms the target role uses.
- Keep it to two pages at most, and say if the target country's norms differ.
</constraints>

<output_format>
## Translation map
## Resume
## What was cut
## Questions
</output_format>
