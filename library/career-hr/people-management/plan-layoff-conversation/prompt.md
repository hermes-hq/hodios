---
schema: 1
id: plan-layoff-conversation
kind: prompt
title: Plan a layoff conversation
description: Prepares a manager to deliver a layoff or redundancy conversation humanely, with a script, logistics, what not to say and questions to route to HR or legal. Use before the meeting.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, founder, executive]
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [script, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [layoffs, redundancy, termination-meeting, severance, outplacement]
pairs_with:
  prompts: [plan-one-on-one, write-performance-improvement-plan]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: situation
    description: What is happening (team restructure, company-wide reduction, single role), how many people, what has been decided and approved, what support is offered (notice, severance, benefits, outplacement), who will be in the meeting, timing, and anything known about the person's circumstances.
    type: text
    required: true
  - name: country
    description: The country (and state or province if relevant) where the affected people are employed.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Readiness check, Logistics, Script, Reactions, What not to say, Route to HR or legal, After the meeting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior HR business partner who has supported many managers through redundancies. People remember how they were told for years. A humane conversation is short, private, clear from the first minute, honest that the decision is final, respectful, and gives the person concrete next steps and the information they need. Harm comes from long preambles, false hope, blaming others or the person, debating the decision, managers saying more than they know about terms or law, and logistics handled carelessly (locked accounts before the meeting, being told in public or by email when a conversation was possible). Redundancy processes are also tightly regulated in many places, often with consultation, selection and notice obligations that must be complete before a decision is communicated.

<situation>
{{situation}}
</situation>

Country of employment: {{country}}
</context>

<task>
1. Readiness check: confirm the decision is final and approved; that HR and legal have confirmed the process for {{country}} has been followed (for example individual or collective consultation, fair selection, notice and any authority notifications, where applicable); that documents (letter, terms, severance agreement if any) are ready and checked; and that the person's circumstances (leave, health, pregnancy, recent complaint) have been reviewed by HR. If anything is not ready, say the meeting should wait and why.
2. Logistics: timing (early in the week and day where possible, not right before a holiday or the person's major event), private room or a private video call with camera on, HR present or available, meeting length (10 to 15 minutes), how and when system access and equipment are handled with dignity, how the person can say goodbye to colleagues or not, and how they get home if upset.
3. Script: an opening that gets to the point within the first minute ("I have difficult news. Your role is being made redundant and your employment will end on [date]."), the reason in one or two honest sentences (business decision about the role, not performance, if that is true), what happens next (notice, final pay, severance, benefits continuation, outplacement, references), the documents and the time they have to review them, and a close that says who to contact. Keep the manager's lines short with pauses.
4. Reactions: how to respond to shock or silence, tears, anger, bargaining ("can I take another role or a pay cut?"), questions the manager cannot answer, and a request to leave immediately.
5. What not to say: for example "I know how you feel", "this is hard for me too", speculation about who else is affected, promises about future roles or references beyond what is agreed, legal opinions, blaming leadership, or comments about performance if the reason is redundancy. Give a better line for each.
6. Route to HR or legal: a list of questions the manager should not answer and should pass on (severance calculation, settlement agreements, visa or immigration consequences, pension and equity, discrimination concerns, appeal rights), with a holding line.
7. After the meeting: what to tell the remaining team and when, how to support survivors, and how the manager looks after themselves.
</task>

<constraints>
{{> guardrails/professional-limits}}
- The plan is preparation, not legal clearance. Do not state what the law in {{country}} requires; list what HR or an employment lawyer must confirm.
- Use only facts given; never invent severance amounts, dates or benefits. Use [X].
- If the person may be in distress or says anything suggesting they might harm themselves, the manager should pause the meeting, stay with them, involve HR, and connect them with an employee assistance programme, a crisis line or local emergency services as needed.
</constraints>

<output_format>
## Readiness check
Table: Item | Status | Owner.
## Logistics
## Script
## Reactions
Table: Reaction | What to say or do.
## What not to say
Table: Avoid | Say instead.
## Route to HR or legal
## After the meeting
</output_format>
