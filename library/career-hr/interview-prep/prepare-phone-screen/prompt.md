---
schema: 1
id: prepare-phone-screen
kind: prompt
title: Prepare for a recruiter phone screen
description: Prepares a recruiter phone screen with a two-minute pitch, logistics answers, salary and notice period lines, likely screening questions and smart questions to ask. Use before a first call.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [job-posting, resume]
output: [script, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [phone-screen, recruiter-screen, elevator-pitch, screening-questions]
pairs_with:
  prompts: [write-tell-me-about-yourself, answer-salary-expectations, prepare-questions-for-interviewer, analyze-job-posting]
  workflows: [interview-prep-track]
args:
  - name: job_posting
    description: The job posting, plus anything you know about the call (who is calling, how long, internal or agency recruiter).
    type: text
    required: true
  - name: background
    description: Your resume or a summary of your experience, plus logistics the recruiter will ask about - notice period, location and right to work, availability, salary range, other processes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this screen checks, Two-minute pitch, Likely questions, Logistics lines, Questions to ask, Call checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an in-house recruiter who runs a dozen 20 to 30 minute screens a day. A recruiter screen is a filter, not a deep interview. The recruiter is checking a short list: does the candidate roughly match the must-haves, can they explain their background clearly, are the logistics workable (location, right to work, notice period, salary), are they genuinely interested, and will they come across well to the hiring manager. Candidates fail screens by rambling through their whole history, being vague about logistics, naming a number too early or too low, or showing they have not read the posting.

<job_posting>
{{job_posting}}
</job_posting>

<background>
{{background}}
</background>
</context>

<task>
1. What this screen checks. From the posting, list the three to five must-haves the recruiter will tick and, for each, the one line of evidence from the background that answers it. Flag any must-have the background does not clearly meet and how to address it honestly in one sentence.
2. Two-minute pitch for "Walk me through your background": present (current role and the one thing it shows), past (one or two moves that built toward this role, with one result), future (why this role, specific to the posting). About 250 to 280 spoken words, plus a 30-second version for when the recruiter is short of time.
3. Likely questions. The six to eight questions this screen will most likely include, with a short answer for each from the background: why you are looking, why this company, the must-have the background is thinnest on, a gap or short tenure if the background shows one, work-mode preferences, and what you are looking for next.
4. Logistics lines. One or two sentences each for notice period, start date, location or relocation, right to work or sponsorship, and other processes. For salary, write a polite deferral that asks for the budgeted range first and a fallback that gives the candidate's range if pressed; if no range is in the background, leave [X] and say how to research it.
5. Questions to ask the recruiter: four or five that a recruiter can actually answer (interview stages and timeline, the hiring manager's top priority, why the role is open, the budgeted range, what made past hires succeed), and how to close the call with a clear next step.
</task>

<constraints>
- Use only facts from the background and posting. Never invent employers, numbers, reasons for leaving or company facts; use [placeholder] for anything missing and list it in the checklist.
- Keep spoken answers short: under about 60 words each except the pitch.
- Answer "why are you looking" and any departure reason without criticising a current or former employer.
- If the logistics in the background conflict with the posting (for example the role is on-site and the candidate needs remote, or sponsorship is required and the posting excludes it), say so at the top and suggest how to raise it early rather than hide it.
</constraints>

<output_format>
## What this screen checks
Table: Must-have | Your evidence | Risk (none, thin, gap).
## Two-minute pitch
Full version, then the 30-second version.
## Likely questions
Each question with a short answer.
## Logistics lines
## Questions to ask
## Call checklist
Bullets: placeholders to fill, what to have open during the call, and a two-line note to send after it.
</output_format>
