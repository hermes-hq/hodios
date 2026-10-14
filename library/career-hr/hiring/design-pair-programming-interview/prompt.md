---
schema: 1
id: design-pair-programming-interview
kind: prompt
title: Design a pair programming interview
description: Designs a live pair programming interview for developer hiring - a realistic task, setup and tool rules, the interviewer's role, hints, a rubric on process not just output, and calibration.
category: hiring
version: 1.0.0
status: incubating
stage: [design]
role: [engineering-manager, tech-lead, recruiter]
requires: [none]
inputs: [notes, job-posting]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [technical-interview, pair-programming, live-coding, developer-hiring, interview-rubric]
pairs_with:
  prompts: [design-interview-loop, write-take-home-assignment, write-interview-feedback]
  personas: [recruiter]
args:
  - name: role
    description: The engineering role and level, the stack and kind of work, what the team wants this stage to assess, interview length, and whether candidates may use their own setup, search and AI assistants.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this stage assesses, Task, Setup, Interviewer script, Hints ladder, Rubric, Calibration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a staff engineer who has run and redesigned many technical interviews. Puzzle-style whiteboard questions mostly measure practice at puzzles and stress tolerance. A pair programming interview on a small, realistic task in a realistic environment shows how someone reads unfamiliar code, breaks down a problem, tests, communicates and takes input, which is closer to the job. It goes wrong when the task is too big to finish so everyone fails differently, when the interviewer silently watches or takes over, when hints are given inconsistently, when the environment eats the first 15 minutes, or when only "did it pass" is scored.

<role>
{{role}}
</role>
</context>

<task>
1. What this stage assesses: three to five competencies this stage owns (for example problem decomposition, code reading, testing habits, communication while coding, response to feedback), and what it does not assess, so other stages cover it.
2. Task: a realistic task for this stack sized for the time available, such as fixing a bug and adding a small feature to a small prepared codebase. Give the candidate brief, the starting state, a core part most candidates should finish, and optional extensions for strong candidates. Explain why it is fair to people without domain-specific trivia.
3. Setup: the environment (candidate's own editor or a shared one), what is sent in advance, the rules on search, documentation and AI assistants stated clearly and the same for everyone, and a fallback if tooling fails.
4. Interviewer script: timings for intro, reading time, coding, wrap-up and candidate questions; how the interviewer behaves as a pair (answers questions about the codebase, thinks aloud with the candidate, does not take the keyboard); and what to note.
5. Hints ladder: three levels of hint for the predictable sticking points, when to give each, and how hints are recorded so they are scored consistently.
6. Rubric: for each competency, behavioural anchors on a 1 to 4 scale, with evidence examples of strong and weak behaviour, scoring process as well as outcome.
7. Calibration: how to trial the task on current engineers, set expected completion levels, and align interviewers over the first few candidates.
</task>

<constraints>
- Keep the task realistic for the actual job and level; no algorithm puzzles unrelated to the work unless the role needs them.
- Do not write a full solution; describe the expected approach and key checkpoints.
- Include adjustments on request, such as extra time, a different editor, or a break.
- State tool rules the same for every candidate.
</constraints>

<output_format>
## What this stage assesses
## Task
## Setup
## Interviewer script
Table: Minutes | Phase | Interviewer does.
## Hints ladder
Table: Sticking point | Hint 1 | Hint 2 | Hint 3.
## Rubric
Table: Competency | 1 | 2 | 3 | 4.
## Calibration
</output_format>
