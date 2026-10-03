---
schema: 1
id: choose-ai-tool
kind: prompt
title: Choose an AI tool for a task
description: Helps choose an AI tool for a specific task by defining what the task needs, comparing tool types on capability, data handling, cost and fit, and setting up a side-by-side trial.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, manager, founder, student]
requires: [none]
inputs: [text, preferences]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tool-selection, ai-adoption, data-handling, trial-plan]
pairs_with:
  prompts: [map-ai-use-cases, write-ai-use-policy]
args:
  - name: task
    description: The job you want AI help with, how often you do it, and what a good result looks like.
    type: text
    required: true
  - name: constraints
    description: "Optional: budget, devices, tools you already pay for, data you must protect (client, health, school), language, accessibility needs, or employer rules."
    type: text
output_contract:
  format: markdown
  sections: [What the task needs, Options, Recommendation, Trial plan, Check before committing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The right AI tool depends far more on the task than on which model tops this month's benchmark. A meeting-notes job needs audio input and a calendar integration; a contract review needs long documents and strict data handling; a coding job needs repository access. People often pick by brand, then discover the tool cannot read their files, trains on their data by default, or duplicates something they already pay for. Product features, plans and data terms change often, so any comparison must be checked against current information before money or sensitive data goes in.

<task_description>
{{task}}
</task_description>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. If the task is too vague to know what it needs, ask up to three questions and stop.
2. Translate the task into requirements: inputs (text, long documents, images, audio, spreadsheets, a code repository), outputs, integrations (email, calendar, drive, CRM), capabilities (web search with sources, file analysis, running code, memory across sessions), volume and frequency, and quality bar. Mark each must-have or nice-to-have.
3. Translate the constraints into data and cost requirements: whether inputs include personal, client, health or confidential data; whether the user needs a plan that does not train on their data, a business agreement, or a specific region; budget; and existing tools that may already cover the task.
4. Compare options by type first (a general chat assistant, an assistant built into a tool they already use, a specialist tool for this task, an API or automation, or no AI at all), and name example products only where you are reasonably confident, marked "check current features and terms". Score each option on capability fit, data handling, cost, effort to adopt and accessibility.
5. Recommend one or two options with reasons, and say what would change the recommendation.
6. Give a trial plan: the same three real (sanitised) tasks run in each shortlisted tool, how to judge the results, and how long to trial before deciding.
7. List what to verify on the vendor's own pages before committing: data use and retention, training opt-out, admin controls, pricing limits, export.
</task>

<constraints>
- Your product knowledge may be outdated. Never state a product's current price, limit or data policy as fact; flag every such detail for checking.
- Do not push a paid tool when a tool the user already has meets the must-haves.
- If the task involves regulated or sensitive data and the user's employer or school has rules, say to follow those rules first.
- No affiliate-style enthusiasm; neutral, specific reasons only.
</constraints>

<output_format>
## What the task needs
Table: Requirement | Must or nice | Why.
## Options
Table: Option | Fit | Data handling | Cost | Effort | Notes to check.
## Recommendation
Two to four sentences.
## Trial plan
Numbered steps with the three test tasks.
## Check before committing
Checkbox list.
</output_format>
