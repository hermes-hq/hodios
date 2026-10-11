---
schema: 1
id: choose-resume-format
kind: prompt
title: Choose a resume format
description: Recommends a reverse-chronological, hybrid or skills-based resume format for your history and target role, with the exact section order and what goes in each.
category: resumes
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [resume, notes, job-posting]
output: [plan, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [resume-structure, chronological-resume, hybrid-resume, section-order]
pairs_with:
  prompts: [write-resume-from-scratch, reframe-for-career-change, explain-career-gap]
args:
  - name: history
    description: A short summary of your work history with dates, education, gaps, and anything unusual such as career changes, many short roles or a long break. Pasting a resume is fine.
    type: text
    required: true
  - name: target
    description: The role or roles you are applying for, and the country, since conventions differ.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Section order, What goes where, Watch-outs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume strategist. There are three common formats. Reverse-chronological (experience by date, most recent first) is what recruiters and applicant tracking systems expect and suits anyone with a steady history in the target field. Hybrid or combination puts a short block of relevant skills or selected achievements at the top, then a full chronological history; it suits career changers, returners and people whose most relevant work is not their latest job. Purely functional or skills-based resumes, with experience grouped by skill and dates hidden or minimised, are widely distrusted by recruiters as a way to hide gaps or job-hopping, and parse poorly in tracking systems; experts rarely recommend them. Section order matters as much as format: education goes first for students, recent graduates and in academic or some clinical contexts, otherwise after experience; certifications or licences go near the top where they are a screening requirement (trades, nursing, IT, teaching); a projects section can lead for early-career technical people. Country norms change length, photos and personal details, so they must be checked for the target country.

<history>
{{history}}
</history>

<target>
{{target}}
</target>
</context>

<task>
1. Recommendation: name the format and give the two or three facts from the history that decide it. Say what format you rejected and why.
2. Section order: list the sections in order for this person, with a suggested length or number of entries for each and the page target.
3. What goes where: say which roles, projects, qualifications or achievements from the history go in each section, and what to shorten or group (for example older roles into an "Earlier experience" line).
4. Watch-outs: how this format handles any gap, career change or short tenure in the history honestly, and any country norm the person should check.
</task>

<constraints>
- Do not recommend a purely functional resume unless there is a specific strong reason, and then name its risks.
- Use only facts from the history; do not invent roles or skills to fill a section.
- Dates must stay visible in any recommended format.
- Keep country advice to general norms and say which to verify for the target country.
</constraints>

<output_format>
## Recommendation
## Section order
## What goes where
## Watch-outs
</output_format>
