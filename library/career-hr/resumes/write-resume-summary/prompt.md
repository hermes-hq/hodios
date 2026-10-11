---
schema: 1
id: write-resume-summary
kind: prompt
title: Write a resume summary
description: Writes the three-to-four-line professional summary at the top of a resume, aimed at one target role and built only from proof already in the resume. Offers two angles to choose from.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [professional-summary, personal-profile, first-impression]
pairs_with:
  prompts: [tailor-resume-to-job, review-resume, rewrite-resume-bullets]
  personas: [resume-writer]
args:
  - name: resume
    description: Your current resume, or the main facts - roles, years, specialisms, two or three results you are proud of.
    type: text
    required: true
  - name: target_role
    description: The job title and level you are aiming for, for example "senior payroll specialist" or "first UX design role".
    type: string
    required: true
  - name: job_posting
    description: A specific posting, if you have one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the summary must do, Two versions, Why each line is there, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer. The summary (called a profile or personal statement in some countries) is the first thing a recruiter reads and the part most people waste on adjectives: "hard-working, passionate team player with excellent communication skills". Recruiters skip those lines because every resume has them. A useful summary answers three questions in three or four lines: what are you (title and level the reader recognises), what are you known for (a specialism, sector or kind of problem), and what is the proof (one or two concrete results or credentials already shown below). It is written in implied first person without "I", and it mirrors the target role's language where that is honest. For students and career changers the summary does a different job: it states the target and bridges from what they have to what the role needs.

<resume>
{{resume}}
</resume>

Target role: {{target_role}}
{{#job_posting}}
<job_posting>
{{job_posting}}
</job_posting>
{{/job_posting}}
</context>

<task>
1. State in two or three bullets what this summary must do for this person: the title to claim, the specialism to lead with, and the strongest proof in the resume that fits the target. If a posting is given, name the two or three requirements the summary should echo.
2. Write two versions, each 40 to 70 words:
   - Version A leads with identity and specialism ("Payroll specialist with eight years across multi-country payrolls...").
   - Version B leads with the strongest result or credential.
3. Under each line, explain in one short phrase what it signals to the reader.
4. List questions for facts that would make it stronger and that are missing, for example years in the field, a certification, a scale figure.
</task>

<constraints>
- Use only facts present in the input. No invented years, numbers, tools or employers; use [placeholders] where a fact would help.
- Do not claim a title or level the person has not held. A career changer says what they are moving into ("Teacher moving into instructional design") rather than claiming the new title.
- Ban empty traits: "passionate", "results-driven", "hard-working", "team player", "dynamic", "detail-oriented" unless followed by proof in the same line.
- No "I", "me" or "my". No objective statement about what the candidate wants from the employer.
- If the resume shows no fit at all for the target role, say so plainly and suggest what the summary can honestly bridge.
</constraints>

<output_format>
## What the summary must do
Two or three bullets.
## Two versions
**Version A** and **Version B**, each with a word count.
## Why each line is there
Short notes per line.
## Questions
Numbered.
</output_format>
