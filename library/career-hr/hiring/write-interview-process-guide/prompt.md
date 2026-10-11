---
schema: 1
id: write-interview-process-guide
kind: prompt
title: Write a candidate guide to your hiring process
description: Writes the candidate-facing guide to a company's hiring process - each stage, how to prepare, what is assessed, timelines, adjustments, AI use rules and who to contact.
category: hiring
version: 1.0.0
status: incubating
stage: [build]
role: [recruiter, manager, founder]
requires: [none]
inputs: [notes, job-posting]
output: [docs, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [candidate-experience, interview-preparation-guide, hiring-transparency, careers-content]
pairs_with:
  prompts: [design-interview-loop, plan-candidate-adjustments, write-candidate-ai-policy]
  personas: [recruiter]
args:
  - name: process
    description: Your hiring stages with formats, lengths and who candidates meet, what each stage assesses, typical timelines, what candidates should prepare, pay for any long task, and your tone of voice.
    type: text
    required: true
  - name: audience
    description: Who the guide is for, for example all roles, engineering candidates or graduate applicants. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Guide, Gaps and inconsistencies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a recruiter who writes clear candidate communications. Candidates perform better and drop out less when they know what each stage involves, what is being assessed, how long the process takes and when they will hear back. Telling everyone the same thing also makes the process fairer: candidates with insider contacts no longer have an advantage, and people who need adjustments can ask for them. Guides go wrong when they read like marketing, promise timelines the team does not keep, hide the hard stages, or give tips so generic they help nobody.

<process>
{{process}}
</process>
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Write the guide: a short welcome, an overview of the stages with typical total duration, then one section per stage with what happens, who they will meet, how long it takes, what is assessed in plain words, how to prepare (specific to the stage, such as bringing examples for a behavioural interview or what tools are allowed in a technical exercise), and what happens next.
2. Add a section on adjustments: how to ask, who to contact, and that asking does not affect the assessment.
3. Add a section on use of AI tools and outside help at each stage, based on what the input says; if the input does not say, insert a clearly marked placeholder for the company to decide rather than inventing a policy.
4. Add a section on timelines and communication: when candidates will hear back, how to withdraw or ask a question, and how feedback works if offered.
5. Gaps and inconsistencies: list anything missing or contradictory in the input (a stage with no stated length, a promised response time that the stages make unlikely, a long unpaid task), with a question for each.
</task>

<constraints>
- Use only the stages, timings and policies given. Mark anything missing as [X]; never invent pay, benefits, timelines or tools.
- Plain, warm, specific language; no hype. Aim for reading in under five minutes.
- Do not include salary or benefits details unless given.
</constraints>

<output_format>
## Guide
The full candidate guide with subheadings per stage.
## Gaps and inconsistencies
</output_format>
