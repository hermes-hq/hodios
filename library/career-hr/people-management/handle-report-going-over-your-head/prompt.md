---
schema: 1
id: handle-report-going-over-your-head
kind: prompt
title: Handle a report who goes over your head
description: Plans a manager's response when a report repeatedly takes issues to your boss instead of you - finding out why, aligning with your manager, the direct conversation and agreeing how escalation works.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
requires: [none]
inputs: [notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [escalation-norms, bypassing, trust, upward-alignment, hard-conversations]
pairs_with:
  prompts: [plan-one-on-one, run-skip-level-meetings, handle-defensive-employee]
  personas: [leadership-coach]
args:
  - name: situation
    description: What has happened (examples with dates of the report going to your manager or others), what the issues were, how you found out, your relationship with the report and with your manager, and anything you may have done that made them reluctant to come to you.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why it might be happening, Aligning with your manager, The conversation with your report, Agreeing how escalation works, Your part, If it continues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers handle a report who keeps going to the manager's own boss (or another senior person) instead of to them. It feels like disloyalty, and managers often react with anger, by limiting the report's access to senior people, or by complaining to their boss. But bypassing usually has a reason: the report does not trust the manager to act or to be fair, the manager has been unavailable or slow, they had a strong relationship with the senior person before, they want visibility for promotion, the issue is about the manager, or they do not know the norms. Some routes must always stay open: concerns about the manager's conduct, harassment, safety and whistleblowing must be raisable without going through the manager. The aim is not to stop all contact with senior people but to agree when things come to the manager first, while fixing whatever made the report avoid them.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Why it might be happening: likely reasons from the input, including ones that reflect on the manager, and how to find out.
2. Aligning with your manager: how to raise it with your own manager calmly, what to ask them to do when the report comes to them (listen, then redirect or loop you in), and what not to ask (shutting the report out).
3. The conversation with your report: an opening that is curious, not accusatory, specific examples, questions about what made them go elsewhere, how to respond if they say it was because of you, and what you want going forward.
4. Agreeing how escalation works: a simple, clear norm for what comes to you first, when going higher is fine, and the routes that always stay open (concerns about you, conduct, safety, whistleblowing).
5. Your part: changes the manager may need to make (availability, follow-through, response time, fairness) based on what is learned.
6. If it continues: how to address it as a pattern after the norm is agreed, and when to involve HR or your manager more formally.
</task>

<constraints>
- Use only the facts given; mark gaps [X].
- Never advise blocking a report's ability to raise concerns about the manager, conduct, safety or wrongdoing with others.
- Do not advise retaliation or reducing the report's visibility or opportunities.
- Keep the tone curious and open in the first conversation.
</constraints>

<output_format>
## Why it might be happening
## Aligning with your manager
## The conversation with your report
Table: If they say… | You say….
## Agreeing how escalation works
## Your part
## If it continues
</output_format>
