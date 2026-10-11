---
schema: 1
id: design-absence-management-process
kind: prompt
title: Design a sickness absence management process
description: Designs a company sickness absence process - reporting rules, recording, review triggers, return-to-work meetings, long-term absence steps and adjustments - fair to staff and workable for managers.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, founder, manager]
advice_risk: [legal, medical]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [sickness-absence, return-to-work, absence-triggers, long-term-sickness, occupational-health]
pairs_with:
  prompts: [plan-workplace-adjustments-as-manager, manage-staff-attendance-issues, write-workplace-policy, define-hr-metrics]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Countries, headcount, type of work (shift, office, field), whether you have occupational health or an employee assistance programme, and any union agreement.
    type: text
    required: true
  - name: current_situation
    description: How sickness is reported and recorded today, sick pay arrangements, absence rates or patterns you know of (anonymised), and what is going wrong.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Principles, Reporting and recording, Short-term absence, Long-term absence, Adjustments and support, Manager toolkit, Data and measures, Questions to confirm locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design sickness absence processes the way an experienced employee relations lead does. What experts know: the most effective single step is a short, supportive return-to-work conversation after every absence, held by the manager within a day or two; review triggers (for example a number of spells or days in a rolling period, or a Bradford-style score) prompt a conversation, not automatic sanctions, and must allow discretion for disability, pregnancy and other protected reasons, which many laws require to be treated differently; long-term absence needs early contact, a medical or occupational health view with the employee's consent, a phased return plan and regular reviews, and only after that, and with legal advice, any capability decision; health information is sensitive personal data with strict handling rules; and managers fail most often by doing nothing until the problem is large, or by acting inconsistently. Sick pay and evidence rules (self-certification, doctor's notes) vary by country.

<organisation>
{{organisation}}
</organisation>

<current_situation>
{{current_situation}}
</current_situation>
</context>

<task>
1. Principles: three to five, such as support first, consistency, confidentiality, and early contact.
2. Reporting and recording: who the employee contacts, by when, what they say, what evidence is needed after how many days (mark "confirm locally"), and how absence is recorded without storing more health detail than needed.
3. Short-term absence: the return-to-work conversation (questions and a short form), review triggers with the reasoning, the stages of formal review, and where discretion is required for protected reasons.
4. Long-term absence: when an absence counts as long-term, contact frequency and tone, occupational health or medical input with consent, phased return and adjusted duties, review meetings, and the point at which legal advice is needed.
5. Adjustments and support: how to identify and agree workplace adjustments, the employee assistance programme, and mental health considerations.
6. Manager toolkit: a checklist per stage, a return-to-work script, and what not to say or ask.
7. Data and measures: absence rate, frequency, long-term cases, return-to-work completion rate, and how to report them without identifying individuals.
8. Questions to confirm locally (sick pay, evidence rules, disability law, data protection).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not design automatic dismissal or pay penalties from triggers; triggers start a conversation.
- Never count disability-related, pregnancy-related or other protected absences in the same way as other absences without flagging the legal risk.
- Do not ask managers to diagnose or to request medical details beyond what is needed.
- Use roles and anonymised data only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
## Reporting and recording
## Short-term absence
Table: Trigger | What happens | Who | Discretion.
## Long-term absence
Timeline from week 1 onwards.
## Adjustments and support
## Manager toolkit
## Data and measures
## Questions to confirm locally
Numbered.
</output_format>
