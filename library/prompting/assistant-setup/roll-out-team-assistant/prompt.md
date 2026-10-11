---
schema: 1
id: roll-out-team-assistant
kind: prompt
title: Roll out an AI assistant to a small team
description: Plans rolling out a shared AI chat assistant to a small team, with chosen use cases, traffic-light data rules, shared instructions, a pilot, training, review habits and how to measure it.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, founder, operations-manager]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [team-adoption, pilot, data-rules, staff-training]
pairs_with:
  prompts: [write-ai-use-policy, build-team-prompt-library, write-custom-gpt-instructions]
args:
  - name: team
    description: Team size, what the team does, the tools it already uses and how comfortable people are with AI.
    type: text
    required: true
  - name: goals
    description: What you hope the assistant helps with and why now.
    type: text
    required: true
  - name: constraints
    description: "Optional: budget, existing policies, regulated or client data, people who are sceptical."
    type: text
output_contract:
  format: markdown
  sections: [Use cases, Data rules, Shared setup, Rollout plan, Review and quality, Measuring it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small-team rollouts usually fail in one of four ways: licences are bought and few people use them; everyone uses the assistant differently so results vary; confidential data ends up in unapproved tools; or output goes to customers unchecked. What works is narrower: two or three use cases that are frequent and low-risk, shared instructions and starter prompts for those, simple data rules people can apply in a second, a small pilot with a named champion, a short hands-on session using the team's real (non-confidential) tasks, a human check on anything that leaves the team, and a 30 and 60-day look at what changed. A formal AI use policy may also be needed; this plan sits beside it.

<team>
{{team}}
</team>
<goals>
{{goals}}
</goals>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. List candidate use cases from the goals and the team's work, score each on frequency, time saved and risk, and pick two or three to start.
2. Write data rules as a traffic light: green (fine to use), amber (only in the approved team account, with names removed), red (never), with examples from this team's work.
3. Write the shared setup: team instructions for the approved assistant, starter prompts for each chosen use case, and which reference files to add, without confidential content.
4. Write a rollout plan by week: a pilot group with a champion, a 45-minute hands-on session (agenda), office hours, then wider rollout if the pilot works.
5. Set review rules: what must be checked by a person before it reaches a customer, client or the public, and how to report a bad output.
6. Say how to measure it: a short before-and-after survey, a usage check, a log of issues and saved time, and the questions for the 30 and 60-day reviews, including whether to stop.
7. Note the decisions that need someone else: vendor contract and data terms, a formal policy, and legal or IT review for regulated or client data.
</task>

<constraints>
- Do not make claims about any vendor's security, certifications or data terms; say what to check in the contract.
- Do not recommend monitoring or ranking individual staff by their prompts or usage. If asked, decline briefly, note that workplace monitoring is restricted by law in many countries and needs HR or legal advice, and offer team-level measures instead.
- Keep it proportionate to the team size.
</constraints>

<output_format>
## Use cases
A table: use case, frequency, time saved, risk, start now or later.
## Data rules
Green, amber and red lists with examples.
## Shared setup
Team instructions in a fenced block, then starter prompts.
## Rollout plan
A week-by-week table with owners by role.
## Review and quality
Bullets.
## Measuring it
Bullets and the review questions.
</output_format>
