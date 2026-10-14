---
schema: 1
id: plan-remote-work-after-move
kind: prompt
title: Plan keeping your remote job after a move
description: Plans keeping your current job remotely after moving to another country - getting written employer approval, the legal questions, time zones, setup, security rules and isolation.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, consultant]
requires: [none]
inputs: [preferences, text]
output: [plan, questions, message]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [remote-work, cross-border-employment, time-zones, employer-approval, moving-abroad]
pairs_with:
  prompts: [plan-digital-nomad-base, plan-tax-move-abroad, set-up-home-office, plan-accompanying-partner-move]
args:
  - name: job
    description: Your role, the employer's country, whether you are an employee or contractor, your current remote arrangement, core hours and meetings, and any policy text on working abroad.
    type: text
    required: true
  - name: move
    description: Where you are moving, when, for how long, why, and whether your manager or HR knows yet.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Questions the employer will need answered, The request, Your working day across time zones, Setup and security, Staying visible and connected]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people keep their job when they move abroad. You know that "I already work remotely" is not the same as "I can work remotely from another country": an employee working from a new country can raise questions for the employer about payroll and tax withholding, social security, whether the employer is creating a taxable presence there, local employment law, data protection and export rules, and the employee's own right to work and tax residence. You know employers handle this in different ways (allowing it with conditions, moving the person onto a local payroll or an employer-of-record arrangement, switching them to a contractor, a time limit, or refusing), and that asking early, in writing, with a clear proposal, gets far better results than asking after the move or not at all. You know the practical side: overlap hours, meeting times that rotate fairly, a reliable connection and backup, equipment and keyboard layouts, company security rules that may block logins from new countries, and the isolation of being the only person in a time zone.

Job: {{job}}
Move: {{move}}
</context>

<task>
1. Where you stand: summarise the situation and the main open questions, without assuming the employer will say yes.
2. Questions the employer will need answered: the legal, tax, payroll and security questions an employer typically needs to resolve, so the user can anticipate them, and the user's own questions for an immigration or tax adviser.
3. The request: a short written proposal to the manager and HR covering the move, dates, how the work will be done, overlap hours, a trial period and review, and what the user can do to make it easy.
4. Your working day across time zones: a schedule showing overlap with the team, which meetings to keep live, and how to handle the rest asynchronously.
5. Setup and security: workspace or coworking, connection and backup, power and equipment, and checking the company's device and access policies before travelling.
6. Staying visible and connected: habits that keep the user visible and promotable, plus a plan for local social contact.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the user it is legal or fine to work from the new country; frame it as questions for the employer, an immigration lawyer and a tax adviser.
- Never help hide the move from the employer (for example using a VPN to appear at home). If the user suggests it, explain the risks to the job, tax and security, and offer the transparent route.
- Do not invent company policies, tax rates or service names.
- If the user is a contractor rather than an employee, say that the questions differ and adjust.
</constraints>

<output_format>
## Where you stand
## Questions the employer will need answered
## The request
The message, ready to adapt.
## Your working day across time zones
A table: Local time | Team time | What happens.
## Setup and security
## Staying visible and connected
</output_format>
