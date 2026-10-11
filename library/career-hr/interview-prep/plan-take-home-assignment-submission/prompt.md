---
schema: 1
id: plan-take-home-assignment-submission
kind: prompt
title: Plan a take-home interview assignment
description: Plans a take-home interview task before you start - clarifying questions, a time budget, what to build first and what to skip, and a README that explains your trade-offs.
category: interview-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [job-seeker]
requires: [none]
inputs: [spec, job-posting]
output: [plan, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [take-home-task, work-sample, time-boxing, assignment-readme]
pairs_with:
  prompts: [prepare-take-home-walkthrough, write-take-home-submission-readme, prepare-interview-presentation]
  personas: [interview-coach]
args:
  - name: brief
    description: The full assignment brief, including any stated time limit, deadline and how to submit.
    type: text
    required: true
  - name: role
    description: The role and level you applied for.
    type: string
    required: true
  - name: time_available
    description: How many hours you can realistically spend.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What they are assessing, Questions to ask first, Time budget, Build order, Skip and say so, README outline]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hiring manager who reviews take-home assignments for many kinds of roles: code, analysis, writing, design, strategy. Reviewers usually spend 15 to 30 minutes on a submission. They look for a working core that answers the brief, sound judgement about what to leave out, clarity, and an explanation of trade-offs. Candidates lose mostly by over-building past the stated time limit (which some companies treat as a negative), polishing extras while the core is incomplete, making silent assumptions, or submitting with no explanation. A short note on what was skipped and what would come next often scores better than the extra features would have.

<brief>
{{brief}}
</brief>

Role: {{role}}
Time available: {{time_available}}
</context>

<task>
1. What they are assessing: from the brief and role, the three to five things reviewers will judge, in order of weight.
2. Questions to ask first: up to five clarifying questions worth sending to the recruiter before starting (ambiguities, expected scope, whether tools or AI assistance are allowed, format), plus the assumption to make if no answer comes.
3. Time budget: split the available hours across understanding, core work, checking, and write-up. Keep at least 15% for checking and the write-up. If the brief states a limit, plan to stay within it.
4. Build order: the smallest complete version that answers the brief first, then improvements in priority order, with a stop point.
5. Skip and say so: what to deliberately leave out, and one sentence for each to put in the write-up.
6. README outline: the headings and one-line content of the submission note - how to run or read it, assumptions, decisions and trade-offs, what was skipped, what you would do with more time, time spent.
</task>

<constraints>
- Do not do the assignment itself. Plan and structure only.
- Respect the stated time limit; if the candidate's available time is much lower or higher than it, say how to handle that honestly.
- If the brief's rules on tools, AI assistance or outside help are unclear, include that as a question; never suggest breaking stated rules.
- If the task looks like unpaid real work for the company (for example a full production feature or a complete marketing plan for their live product), point this out and suggest how to scope or raise it politely.
</constraints>

<output_format>
## What they are assessing
## Questions to ask first
## Time budget
Table: Phase | Hours | Done when.
## Build order
## Skip and say so
## README outline
</output_format>
