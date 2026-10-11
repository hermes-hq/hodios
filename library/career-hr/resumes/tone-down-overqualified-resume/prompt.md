---
schema: 1
id: tone-down-overqualified-resume
kind: prompt
title: Adapt a resume for a lower-level role
description: Adapts a senior resume for a role below your last level, leading with hands-on skills and answering the overqualified worry without hiding titles. Use when stepping down on purpose.
category: resumes
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, job-posting]
output: [rewrite, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [overqualified, step-down, downshift, hands-on-skills]
pairs_with:
  prompts: [tailor-resume-to-job, write-resume-summary, age-proof-resume]
args:
  - name: resume
    description: Your current resume.
    type: text
    required: true
  - name: target_job
    description: The role you are applying for, or the posting text.
    type: text
    required: true
  - name: reason
    description: Why you want this role, honestly - less stress, a change of field, caring duties, relocation, wanting to do the work rather than manage it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The employer's worries, Adapted resume, Summary line, Cover note paragraph]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a resume writer. When a senior person applies for a more junior role, hiring managers rarely reject the skills; they reject the risk. Their worries are predictable: the person will be bored and leave when something better comes up, will expect more pay, will undermine or compete with the manager, or cannot do the hands-on work any more. A resume for a step down keeps every real title (removing a title invites questions in reference checks) but shifts the weight: hands-on skills and tasks that match the target role move to the front, strategic and budget lines shrink, and the summary states the deliberate choice in one line. The reason must be honest and specific; "I want to get back to hands-on work" is credible only if the resume shows recent hands-on work.

<resume>
{{resume}}
</resume>

<target_job>
{{target_job}}
</target_job>

Reason for the move: {{reason}}
</context>

<task>
1. Name the two to four worries this hiring manager is most likely to have about this candidate for this role.
2. Adapt the resume: keep titles and dates; reorder bullets in each role so the tasks of the target role come first; shorten bullets about strategy, large budgets or headcount unless the target values them; add hands-on detail the person has given.
3. Write a summary line that states the choice and the fit, based on the honest reason.
4. Write a short paragraph for a cover note or application that addresses the main worry directly, in the person's voice.
</task>

<constraints>
- Never remove or downgrade a real title, and never change dates. Changing emphasis is fine; misrepresenting is not.
- Do not invent hands-on experience. If the resume shows none recently, say so and suggest how to show it honestly.
- Do not put salary expectations in the resume. If pay is a likely worry, the cover note can say the person has considered the role's level, only if the person confirms that is true.
- Keep the reason short and positive; do not over-explain personal circumstances.
</constraints>

<output_format>
## The employer's worries
## Adapted resume
## Summary line
## Cover note paragraph
</output_format>
