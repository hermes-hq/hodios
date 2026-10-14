---
schema: 1
id: address-personal-issues-affecting-work
kind: prompt
title: Raise work concerns linked to a personal situation
description: Plans how a manager raises falling performance or attendance linked to a report's personal situation, such as divorce, caring or money trouble, balancing privacy, support and expectations.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [mental-health]
requires: [none]
inputs: [notes]
output: [script, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [personal-circumstances, compassionate-management, flexible-support, employee-wellbeing, privacy]
pairs_with:
  prompts: [support-grieving-employee, plan-workplace-adjustments-as-manager, address-underperformance-early]
  personas: [hr-business-partner, leadership-coach]
args:
  - name: situation
    description: What you have noticed at work (specific examples and dates), what you know about their personal situation and how you know it (they told you, a colleague mentioned it, a guess), and what support your organisation offers if you know.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you know and what you do not, Before you talk, The conversation, Support options, Expectations for now, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers handle the overlap between someone's personal life and their work. Divorce, caring for a sick parent or child, money worries, housing problems, illness and similar situations commonly affect concentration, attendance and mood. Managers tend to fail in one of two directions: they ignore the work impact for months out of kindness and then hit the person with a formal process, or they ask intrusive questions and act on gossip. The right approach is to raise what you see at work, privately and with care, invite the person to share only what they want to, offer concrete temporary support (flexibility, workload changes, leave, an employee assistance programme where one exists), and agree adjusted expectations for a defined period with a review. The manager is not a counsellor or a financial adviser and should point to people who are. Information the person shares is confidential except on a need-to-know basis, and some situations (domestic abuse, risk of harm) need specific care.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What you know and what you do not: separate observed work facts from what you have been told and from assumptions. If the knowledge came second-hand, say how to avoid revealing or relying on it.
2. Before you talk: check what support exists (policies on flexible working, carer's or compassionate leave, an employee assistance programme), whether HR should be consulted first, and the setting.
3. The conversation: an opening that names the work changes kindly and asks how they are, without prying; lines that let them share or not; and what to say if they do share something significant.
4. Support options: a table of realistic temporary supports (schedule, workload, deadlines, leave, remote work, an assistance programme) with what needs approval.
5. Expectations for now: how to agree what is realistic for the next few weeks, what still must happen, and a review date, so kindness has a structure.
6. Follow-up: a short note confirming what was agreed (without sensitive details), check-in timing, and what to do if work does not recover after support.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not speculate about or diagnose the person's mental health, relationships or finances.
- Do not use or reveal second-hand information as if the person had told you.
- Keep personal details out of any written record except what is needed and agreed; follow the organisation's confidentiality rules.
- If anything suggests domestic abuse or risk to someone's safety, prioritise safety, keep it confidential, and point to HR and specialist support services.
</constraints>

<output_format>
## What you know and what you do not
## Before you talk
## The conversation
## Support options
Table: Support | What it helps with | Needs approval from.
## Expectations for now
## Follow-up
</output_format>
