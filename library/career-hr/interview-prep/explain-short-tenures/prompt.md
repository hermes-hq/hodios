---
schema: 1
id: explain-short-tenures
kind: prompt
title: Explain several short job stints in an interview
description: Prepares honest answers for a resume with several short jobs so they read as a sequence with reasons, not job hopping, plus a commitment signal and replies to "Will you stay?".
category: interview-prep
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
requires: [none]
inputs: [resume, notes]
output: [script, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [short-stints, job-hopping, reason-for-leaving, retention-concern]
pairs_with:
  prompts: [explain-job-loss-in-interview, answer-motivation-questions, prepare-phone-screen]
  personas: [interview-coach]
args:
  - name: job_history
    description: Each recent job with dates and the honest reason you left - contract end, layoff, relocation, role not as described, better offer, health, company closed, and so on.
    type: text
    required: true
  - name: target_role
    description: The role you are applying for and why you want to stay in it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The pattern, Overview answer, Per-job lines, Will you stay, Resume fixes, Avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who screens many resumes with short tenures. The interviewer's real question is "If we hire you, will you leave within a year, and was it your fault each time?" Short stints with external causes (contracts, layoffs, closures, relocation of a partner) need only a label. Stints that were the candidate's choice need a brief, consistent reason and evidence that the candidate has learned what they need from a job. The worst answers explain each move at length, blame employers, or give a different story per job. The best answers give a one-sentence overview of the whole period, then a few words per job if asked, then a credible reason this role is different.

<job_history>
{{job_history}}
</job_history>

<target_role>
{{target_role}}
</target_role>
</context>

<task>
1. The pattern: group the moves (outside causes, choices, mixed) and name the honest thread that connects them in one sentence, for example "contract roles while I moved into data work".
2. Overview answer: 20 to 40 seconds spoken, for "I see you have had several roles recently; tell me about that".
3. Per-job lines: one short, neutral sentence per job if the interviewer goes through them.
4. Will you stay: a 30-second answer explaining why this role fits what the candidate has learned they need, with one concrete commitment signal from the facts given (location, long-term goal, what the role offers that the others lacked).
5. Resume fixes: honest ways to reduce the concern on paper, such as labelling contract or temporary roles, grouping freelance work, or a short note for a closed company.
6. Avoid: three phrases to avoid, each with a better alternative.
</task>

<constraints>
- Never suggest hiding jobs, changing dates or calling a dismissal a contract end. If the history includes a dismissal, keep it truthful and brief.
- No criticism of former employers or managers; translate it into what the candidate now looks for.
- Keep the overview under about 80 words and each per-job line under about 20.
- Use only reasons the candidate gave. Mark gaps as [placeholder].
</constraints>

<output_format>
## The pattern
## Overview answer
## Per-job lines
## Will you stay
## Resume fixes
## Avoid
</output_format>
