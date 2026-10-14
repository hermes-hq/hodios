---
schema: 1
id: split-resume-for-two-target-roles
kind: prompt
title: Split a resume for two target roles
description: Builds two targeted resume versions from one history when you are applying for two different kinds of role at once, and shows exactly what changes between them and what stays identical.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [two-tracks, resume-versions, dual-job-search, targeted-resumes]
pairs_with:
  prompts: [tailor-resume-to-job, build-master-resume, reframe-for-career-change]
args:
  - name: resume
    description: Your full resume or master list of roles, achievements and skills.
    type: text
    required: true
  - name: role_a
    description: The first kind of role, with one or two example postings or their key requirements.
    type: text
    required: true
  - name: role_b
    description: The second kind of role, with one or two example postings or their key requirements.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How the two roles differ, Resume A, Resume B, What changed, Keeping them consistent]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people run two job searches in parallel, for example data analyst and business analyst, product manager and project manager, teaching and training, nursing and clinical research. One generic resume aimed at both reads as unfocused to each. Two standing versions, each tailored to a track and then lightly adjusted per posting, work better. What legitimately changes between versions: the summary and headline target; which achievements lead in each role and which are cut; the wording of bullets toward each field's vocabulary; the skills section; section order (for example projects or certifications moved up); and which older roles are condensed. What must stay identical: titles, employers, dates, qualifications and every fact. Recruiters sometimes see both versions (same company, same recruiter, an online profile), so the two must never contradict each other; they should look like two honest emphases of the same career.

<resume>
{{resume}}
</resume>

<role_a>
{{role_a}}
</role_a>

<role_b>
{{role_b}}
</role_b>
</context>

<task>
1. How the two roles differ: a short table of what each track screens for (skills, evidence, vocabulary, certifications) and where the person's history overlaps both.
2. Resume A: a complete resume aimed at the first track.
3. Resume B: a complete resume aimed at the second track.
4. What changed: a table listing each difference between the versions (summary, bullet order, wording, skills, section order, cut items) and why.
5. Keeping them consistent: what must match across both and the online profile, how to name the files, and how to handle applying to both kinds of role at one company.
</task>

<constraints>
- Both versions use only facts from the resume. No invented achievements, skills or certifications. Use [placeholders] for gaps and say which track needs them.
- Titles, employers, dates and qualifications are identical in both versions.
- No version may contradict the other or the person's online profile.
- If one track is a poor fit for the history, say so plainly and name the gap.
</constraints>

<output_format>
## How the two roles differ
## Resume A
## Resume B
## What changed
## Keeping them consistent
</output_format>
