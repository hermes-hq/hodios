---
schema: 1
id: hire-first-virtual-assistant
kind: prompt
title: Hire your first virtual assistant
description: Plans hiring a first virtual assistant for a founder or small business - tasks to hand off, the brief, a paid trial task, safe access to tools and accounts, and a handover routine.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [virtual-assistant, delegation, task-audit, paid-trial, access-control]
pairs_with:
  prompts: [plan-first-hire, delegate-task, write-sop, calculate-true-cost-of-hire]
  personas: [small-business-advisor]
args:
  - name: workload
    description: What you spend your week on, roughly in hours - email, scheduling, invoicing, customer messages, social media, research, data entry - and what you most want off your plate.
    type: text
    required: true
  - name: setup
    description: Budget per month or per hour, time zone and hours the assistant must cover, tools you use, the country you are in, and whether they would handle customer data or money. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What to hand off, Role brief, Where to find and how to screen, Paid trial task, Access and security, First 30 days, Contract and pay checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders hire their first virtual assistant. First hires of this kind fail for familiar reasons: the founder hands over vague tasks with no written process, hires on a friendly call instead of a real sample of work, shares their own passwords, checks everything and saves no time, or hands off work that needs their judgement. What works is a task audit (recurring, rule-based, low-risk tasks go first), a short brief with hours and response times, a small paid trial task identical to the real work, separate logins with the least access needed, written procedures recorded as the founder does the task once, and a weekly check-in that shrinks over time.

<workload>
{{workload}}
</workload>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
</context>

<task>
1. What to hand off: sort the founder's tasks into hand off now (recurring, rule-based, low risk), hand off later with a procedure, and keep (needs the founder's judgement, relationships or authority over money). Estimate hours a week freed.
2. Role brief: a short job description - tasks, hours and time zone overlap, response times, tools, skills, language level, and how success is measured after 30 days.
3. Where to find and how to screen: types of sources (freelance platforms, VA agencies, referrals, local candidates), and screening steps - written application answering one specific question, short call, references, and the paid trial.
4. Paid trial task: design one or two realistic tasks taken from the hand-off list, with instructions, time limit, how to score them, and a note to pay for the trial.
5. Access and security: separate accounts or delegated access instead of shared passwords, a password manager with sharing, two-factor login, the least access each task needs, no access to bank logins, rules for customer data, and how to remove access at the end.
6. First 30 days: week-by-week handover - record procedures, start with two tasks, add more after review, and a check-in rhythm.
7. Contract and pay checks: written agreement with scope, rate, confidentiality and data handling; whether the person is a contractor or employee in the founder's country; and paying across borders. Present these as checks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent hourly rates or platform fees; if the founder gave a budget, check what hours it buys.
- Never suggest sharing the founder's own passwords or giving unsupervised access to move money.
- Contractor or employee status and data protection duties depend on the country; list them as checks with an accountant or employment adviser.
- Keep handing off tasks that need the founder's decisions out of the first month.
</constraints>

<output_format>
## What to hand off
Table: Task | Hours a week | Hand off now, later or keep | Why.
## Role brief
## Where to find and how to screen
## Paid trial task
## Access and security
Checklist.
## First 30 days
## Contract and pay checks
Checklist.
</output_format>
