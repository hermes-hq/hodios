---
schema: 1
id: match-language-level-to-job-ad
kind: prompt
title: Check if your language level fits a job ad
description: Turns a job ad's language requirement into the concrete tasks the job needs, lets the applicant self-check against sample tasks, and gives a gap plan and honest wording for the application.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [job-seeker, language-learner]
requires: [none]
inputs: [job-posting, text]
output: [report, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cefr, language-requirements, self-assessment, job-applications, gap-analysis, honest-cv]
pairs_with:
  prompts: [assess-language-level, learn-language-for-work-role, practice-interview-in-language, plan-language-exam-prep]
  personas: [language-learning-strategist]
args:
  - name: target_language
    description: The language the job requires.
    type: string
    required: true
  - name: job_ad
    description: The job ad or the relevant parts (role, duties, language requirement, location, customers or colleagues). Paste it as it is.
    type: text
    required: true
  - name: level
    description: Your honest current level in that language (CEFR), from a test, a course or your own estimate.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
  - name: evidence
    description: Optional. Certificates and dates, where you have used the language (work, study, living there), and what you find hard.
    type: text
output_contract:
  format: markdown
  sections: [What the ad really asks, Self-check tasks, Your gap, Gap plan, Wording for your application, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help job seekers decide whether their {{target_language}} is good enough for a specific job, and how to say so honestly. Job ads describe language needs vaguely ("fluent", "business level", "good working knowledge", "native-like", a CEFR level with no detail), and the real need depends on the tasks: answering customer calls, writing reports, reading regulations, chatting with a team that switches languages. Applicants go wrong in both directions: they apply only when perfect, or overclaim and fail in the first interview. Rough, commonly used equivalences (label them as rough): "conversational" is often around B1, "good working knowledge" around B2, "fluent" or "business fluent" usually C1, "native-like" or "mother tongue" C2 or native. What matters is which skills, which tasks and how often.

Your current level: {{level}}

<job_ad>
{{job_ad}}
</job_ad>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
1. What the ad really asks: quote the language requirement, give the likely CEFR level range, and list the six to ten language tasks the duties imply, each with the skill (listening, speaking, reading, writing, interaction), how often (daily, weekly, rare), and whether mistakes would be costly (customer-facing, legal, safety).
2. Self-check tasks: four or five short sample tasks drawn from those duties for the learner to try (for example read and summarise a short work email in two minutes, write a three-line reply, explain a delay to a customer aloud, follow a fast meeting fragment). For each, say what "ready" looks like and what "not yet" looks like, so they can judge their own attempt.
3. Your gap: compare {{level}} and their evidence with the tasks; mark each task ready, close, or gap. Be honest, and say where an employer might accept a gap (internal language, training budget, team support).
4. Gap plan: for the gaps, a plan for the time until the interview or start date, focused on the job's tasks and phrases (not general study), plus whether a recognised certificate would help this application.
5. Wording for your application: two or three honest sentences for the CV or cover letter describing their level with evidence (certificate, use, tasks they can do), and one honest answer for an interview question about their language.
6. Questions to ask: three questions to clarify the real language need with the employer.
</task>

<constraints>
- Never encourage overstating a level or a certificate. If the learner asks to claim a level they do not have, explain the risk and offer honest wording that still sells them.
- CEFR equivalences of job-ad phrases are conventions, not rules; say so.
- Do not state that an employer will or will not hire them, or legal requirements for language in a profession; where a regulated profession or visa may set a language test, say to check the official body.
- If the ad has no language requirement or the target language is not mentioned, say so and ask whether they want to check the general language needs of the duties instead.
</constraints>

<output_format>
## What the ad really asks
The requirement, the likely level range, then a table: task | skill | how often | cost of mistakes.
## Self-check tasks
Numbered tasks, each with "ready looks like" and "not yet looks like".
## Your gap
Table: task | ready, close or gap | why.
## Gap plan
Weekly steps until the interview or start, then the certificate note.
## Wording for your application
CV or cover-letter sentences, then the interview answer.
## Questions to ask
Three bullets.
</output_format>
