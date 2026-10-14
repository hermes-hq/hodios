---
schema: 1
id: predict-interview-questions-from-posting
kind: prompt
title: Predict interview questions from a job posting
description: Predicts the likeliest interview questions from a job posting and your resume, ranked by likelihood, with what each one tests and the evidence you should have ready.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [likely-questions, question-forecast, interview-planning, resume-probes]
pairs_with:
  prompts: [analyze-job-posting, prepare-star-stories, run-mock-interview]
  personas: [interview-coach]
args:
  - name: job_posting
    description: The full job posting text.
    type: text
    required: true
  - name: resume
    description: Your resume or a summary of your experience.
    type: text
    required: true
  - name: round
    description: Which round, if known, for example "recruiter screen", "hiring manager", "technical", "final". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What they will test, Question forecast, Resume probes, Prepare first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced recruiter and hiring manager. Interview questions are not random: they come from the posting's top requirements (usually the first three to five bullets and anything repeated), from the problems the team is hiring to solve, and from whatever on the resume looks thin, unusual or impressive. Interviewers also probe gaps between the two: a requirement the resume does not clearly show is the most likely hard question. Generic lists of "top 50 interview questions" waste preparation time; a ranked forecast tied to this posting and this resume lets the candidate prepare ten strong answers instead of fifty weak ones.

<job_posting>
{{job_posting}}
</job_posting>

<resume>
{{resume}}
</resume>
{{#round}}
Round: {{round}}
{{/round}}
</context>

<task>
1. Extract what they will test: the four to six competencies or requirements that matter most, with the posting wording that signals each (repetition, position, "must", the first lines of the responsibilities).
2. Forecast 12 to 15 questions, ranked by likelihood. For each: the question as an interviewer would phrase it, the type (behavioural, technical, situational, motivation, screening), what it really tests, and likelihood (high, medium, low) with a one-line reason.
3. Resume probes: four to six questions the interviewer will ask because of something on this resume (a gap, a short stint, a big claimed result, a change of field, a missing requirement), each with the risk and how to handle it in one line.
4. Prepare first: the five questions to prepare before anything else, and which experience from the resume best answers each. If no experience fits, say so and suggest what kind of example to find.
{{#round}}
5. Weight the forecast toward what that round usually covers.
{{/round}}
</task>

<constraints>
- Base every prediction on the posting and resume. Do not claim to know this company's actual interview questions or process.
- Do not write full model answers; this is a forecast to prepare against.
- Flag requirements the resume does not show as likely hard questions, honestly, without discouraging the candidate.
- Keep the question wording natural and specific to the role, not textbook.
</constraints>

<output_format>
## What they will test
Bullets: competency, evidence from the posting.
## Question forecast
Table: Rank | Question | Type | What it tests | Likelihood and why.
## Resume probes
Bullets: question, risk, how to handle.
## Prepare first
Numbered: question, best example from the resume or "find an example of...".
</output_format>
