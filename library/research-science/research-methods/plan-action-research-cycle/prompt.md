---
schema: 1
id: plan-action-research-cycle
kind: prompt
title: Plan an action research cycle
description: Plans a practitioner action research project, such as a teacher's classroom inquiry, through plan, act, observe and reflect cycles with focused data collection, ethics and a write-up plan.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, researcher, student]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [action-research, practitioner-inquiry, teacher-research, reflective-practice, improvement-cycle]
pairs_with:
  prompts: [refine-research-question, write-ethics-application, write-positionality-statement, plan-participatory-research]
  personas: [research-methodologist]
args:
  - name: concern
    description: The problem in your own practice you want to improve, your role and setting, the people involved, the time available and whether this is for a course, a qualification or your own improvement.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Focus and question, Baseline, Cycle plan, Data collection, Ethics, Reflection and write-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Action research is systematic inquiry by practitioners into their own practice in order to improve it, run in cycles of plan, act, observe and reflect (Kemmis and McTaggart; Elliott in education). Its claims are local and practical, not generalisable effects. Projects go wrong in recognisable ways: the question is too broad ("improve engagement"), there is no baseline so change cannot be seen, data collection is so heavy it competes with the job, only the practitioner's impressions are used, the second cycle never happens, or ethics are skipped because "it is just my class". Power matters: when the researcher is the teacher, nurse or manager of the participants, consent must be free and separate from grades or care, and routine practice data used for research may still need approval. Good projects use a few triangulated sources (artefacts, short surveys, observation by a colleague, the practitioner's journal, participants' voices) and a reflective journal kept throughout.
</context>

<task>
Plan an action research project for:
<concern>
{{concern}}
</concern>

1. Narrow the concern to a focused question about the user's own practice in the form "How can I improve ... ?", and state what improvement would look like and how it would be noticed.
2. Plan a baseline: what to gather before acting, from two or three sources, to describe the current situation.
3. Design cycle 1: the change to try and why (from experience, colleagues or literature to be checked), how long it runs, and the data to collect during it. Sketch how cycle 2 would adapt depending on findings.
4. Choose light, triangulated data methods that fit the working day, with a schedule and who collects what, including a critical friend or colleague.
5. Plan ethics: power relations, consent and opt-out without penalty, using routine data, anonymity in a small setting, and whether institutional approval is required, which the user must confirm.
6. Plan reflection: a reflective journal template, when to analyse data, and questions for the reflect stage.
7. Outline the write-up and the kind of claims it can make.
</task>

<constraints>
- Keep the scope realistic for a practitioner's workload and time.
- Do not frame findings as proof that an intervention works in general; claims are about this setting.
- Ethics requirements differ by institution and country; tell the user to check rather than assuming none are needed.
- Do not invent research findings to justify the chosen change; mark them as to check.
</constraints>

<output_format>
## Focus and question
The question and what improvement looks like.
## Baseline
A table: source | what it shows | when.
## Cycle plan
A table: cycle | change | duration | data | decision point.
## Data collection
Methods and schedule.
## Ethics
Bullets.
## Reflection and write-up
Journal template in a code block, reflect-stage questions and write-up outline.
</output_format>
