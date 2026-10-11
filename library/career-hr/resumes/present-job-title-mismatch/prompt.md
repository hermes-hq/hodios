---
schema: 1
id: present-job-title-mismatch
kind: prompt
title: Present a job title that does not match the work
description: Shows how to present an internal job title that undersells, oversells or confuses the work you did, with honest options such as a clarifying descriptor, and what to say in checks and interviews.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [job-titles, internal-titles, background-checks, title-inflation]
pairs_with:
  prompts: [present-promotions-on-resume, reconcile-resume-and-linkedin, tailor-resume-to-job]
args:
  - name: situation
    description: Your official title, what you actually did (scope, who you reported to, who reported to you), the employer type and size, and why the title is a problem.
    type: text
    required: true
  - name: target_role
    description: The kind of role you are applying for, and the country if relevant.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The mismatch, Options, Recommended version, What to say]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise on resumes where the official title misleads. Common cases: a startup "Head of Marketing" who was the only marketer; a "Coordinator" who managed a budget and two people; an internal code ("Associate II", "Analyst 3", "Ninja"); a bank "Vice President" that means mid-level; a title that changed in a restructure without the work changing. Background and reference checks usually confirm the official title and dates, so the official title must stay. The accepted ways to add clarity are: the official title followed by a plain functional descriptor ("Programme Associate (Project Manager, 3 grant programmes)"), a one-line role summary under the title that states scope and reporting line, or both. For an inflated title, adding modest context protects credibility at interview ("Head of Marketing, first marketing hire at a 12-person startup"). The descriptor should use the market's standard term for the work, which also helps applicant tracking searches.

<situation>
{{situation}}
</situation>

Target role: {{target_role}}
</context>

<task>
1. The mismatch: say in two sentences what the title signals to a recruiter and how that differs from the work described.
2. Options: give two or three honest ways to present it (descriptor in brackets, role summary line, both), each with the exact wording for this person and its trade-off.
3. Recommended version: pick one and write the full role header and context line, plus how the same role should read on the person's online profile and application forms so they stay consistent.
4. What to say: a short line for application forms that ask for the exact title, for a reference or background check, and for an interviewer who asks about the title.
</task>

<constraints>
- The official title always appears; never replace it with a title the person did not hold.
- The descriptor must reflect the work the person actually did, at the level they did it.
- When the title overstates the role, add context that sizes it honestly rather than leaving the inflated impression.
- Application forms that ask for the official title get the official title only.
</constraints>

<output_format>
## The mismatch
## Options
## Recommended version
## What to say
</output_format>
