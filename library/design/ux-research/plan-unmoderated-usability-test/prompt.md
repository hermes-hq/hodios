---
schema: 1
id: plan-unmoderated-usability-test
kind: prompt
title: Plan an unmoderated usability test
description: Plans a remote unmoderated usability test with self-explanatory tasks, success detection, screener, quality checks for low-effort participants, a pilot and an analysis plan.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [unmoderated-testing, remote-usability, task-design, participant-quality, think-aloud]
pairs_with:
  prompts: [write-usability-test-plan, synthesize-usability-findings, write-research-screener]
  personas: [ux-researcher]
args:
  - name: product
    description: What is being tested (live site, app, clickable prototype) and its state, plus the flows that matter.
    type: text
    required: true
  - name: questions
    description: What the team needs to learn and the decisions it will inform.
    type: text
    required: true
  - name: participants
    description: Who the users are and any recruitment source or testing platform already chosen. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is unmoderated right, Tasks, Success and metrics, Participants and screener, Quality controls, Setup, Pilot, Analysis plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unmoderated tests trade the moderator's ability to clarify and probe for speed and scale. That trade only works if every task is understandable without help, the prototype cannot strand people in a dead end, success can be judged from the recording or a defined end screen, and there is a way to spot participants who speed through or do not think aloud. Panel participants are often experienced testers who behave unlike real users, so screeners need behavioural questions and quality checks. Unmoderated is a poor fit for exploratory questions, complex or sensitive tasks, and early prototypes with many missing paths.
</context>

<task>
<product>
{{product}}
</product>

<questions>
{{questions}}
</questions>
{{#participants}}

<participants>
{{participants}}
</participants>
{{/participants}}

1. Is unmoderated right: check the questions and prototype against the method's limits; recommend moderated instead if needed, or a hybrid.
2. Tasks: 4 to 6 scenario tasks, each self-contained, without interface labels, with a clear start point and an end the participant recognises, plus a post-task question (for example the single ease question) and an open "what, if anything, was confusing".
3. Success and metrics: how success is judged for each task (reached a URL or screen, answer to a verification question, reviewer judgement from video), plus time and ease ratings.
4. Participants and screener: behavioural criteria, numbers (for finding problems, about 5 to 8 per distinct user group; for metrics, many more), over-recruit for drop-outs.
5. Quality controls: speeders, silent recordings, a sanity question, and the rule for replacing a session, set before data arrive.
6. Setup: intro text, think-aloud instruction with a practice task, device and browser rules, prototype guardrails (disable dead ends, reset state).
7. Pilot with two participants, then fix.
8. Analysis plan: watch every recording, log issues with timestamps, count success with confidence intervals for larger samples, tie findings to the questions.
</task>

<constraints>
- Task wording must not contain interface labels or step-by-step hints.
- Do not promise statistical precision from small samples.
- Do not invent platform features; describe needs generically if no platform is named.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is unmoderated right
## Tasks
| # | Scenario | Start | Success criterion | Post-task question |
## Success and metrics
## Participants and screener
## Quality controls
## Setup
## Pilot
## Analysis plan
</output_format>
