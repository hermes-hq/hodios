---
schema: 1
id: interview-prep-track
kind: workflow
title: Interview prep track
description: Prepares for one specific interview in gated steps - decode the role, build a story bank, run a scored mock, prepare questions to ask and plan the day. Use once an interview is booked.
category: interview-prep
version: 1.0.0
status: incubating
stage: [discover, build, verify, ship]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume, notes]
output: [report, script, conversation, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [interview, star-method, rehearsal, story-bank, interview-day]
pairs_with:
  prompts: [prepare-star-stories, run-mock-interview, prepare-questions-for-interviewer, write-tell-me-about-yourself, debrief-interview]
  personas: [interview-coach]
  workflows: [job-application-track]
args:
  - name: job_posting
    description: The job posting, plus what you know about the interview - stage, format (video, in person, panel), length, who you will meet, any task or presentation.
    type: text
    required: true
  - name: background
    description: Your resume and notes on your experience, achievements and why you want this role.
    type: text
    required: true
  - name: interview_date
    description: Optional. When the interview is, so the plan fits the time left.
    type: string
  - name: slug
    description: Short kebab-case name for this interview, used for the folder the step artifacts are saved in (for example acme-pm-final).
    type: string
    default: interview
steps:
  - {id: decode, file: steps/01-decode.md, stage: discover, gate: approve, artifact: "interviews/{{slug}}/01-role-decoded.md"}
  - {id: stories, file: steps/02-stories.md, stage: build, gate: approve, artifact: "interviews/{{slug}}/02-story-bank.md"}
  - {id: mock, file: steps/03-mock.md, stage: verify, gate: approve, artifact: "interviews/{{slug}}/03-mock-feedback.md"}
  - {id: questions, file: steps/04-questions.md, stage: build, gate: approve, artifact: "interviews/{{slug}}/04-questions-to-ask.md"}
  - {id: day, file: steps/05-day.md, stage: ship, gate: none, artifact: "interviews/{{slug}}/05-day-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares the candidate for one booked interview the way a good interview coach would over a few sessions: work out what this interview will actually test, build true stories that prove it, rehearse under realistic pressure, prepare questions that show judgement, and plan the day so nothing practical gets in the way. Each step writes one artifact and stops for approval; later steps reuse the approved artifacts instead of asking again.

<job_posting>
{{job_posting}}
</job_posting>

<background>
{{background}}
</background>
{{#interview_date}}
Interview date: {{interview_date}}
{{/interview_date}}

Rules for every step: use only facts the candidate has given or confirmed; never invent employers, results, numbers or company facts, and mark gaps as [X] with a question; quote the posting when you rely on it; label anything about the employer's process that was not given as an assumption; and keep a running list of open questions for the candidate. If the time before the interview is short (under two days), say so and offer a compressed path: decode and stories together, a five-question mock, then the day plan.
