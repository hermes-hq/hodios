---
schema: 1
id: handle-difficult-manager
kind: prompt
title: Handle a difficult manager
description: Diagnoses a difficult manager situation and plans your response, from adapting and documenting to direct conversations, allies, escalation or leaving. Use when a manager is hurting your work.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [managing-up, micromanagement, workplace-conflict, escalation, grievance]
pairs_with:
  prompts: [plan-one-on-one, plan-career-path]
  personas: [career-coach]
args:
  - name: situation
    description: What your manager does, with specific recent examples and dates, how long it has gone on, how it affects your work, what you have tried, and anything that might be relevant (reorg, new manager, your performance feedback).
    type: text
    required: true
  - name: goals
    description: What you want - to fix the relationship, protect your reputation, move teams, or leave on good terms - and your time frame. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Adjust what you control, The conversation, Document, Allies and escalation, Decision points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an executive coach who has helped many people through hard manager relationships. Difficult managers fall into different patterns that need different responses: a style mismatch (pace, detail, communication channel), unclear or shifting expectations, micromanagement driven by anxiety or past failures, absence and neglect, credit-taking, volatility or public criticism, and conduct that may be harassment, discrimination or retaliation. The first few are usually fixable with managing-up and a direct conversation. The last needs a formal route and outside advice, not a better communication style. A useful plan also separates what the user can control from what they cannot, and sets a point at which leaving is the rational choice.

<situation>
{{situation}}
</situation>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}
</context>

<task>
1. Diagnose: name the most likely pattern or patterns, the evidence from the examples, the manager's plausible pressures and motives (as hypotheses, not facts), and the user's possible contribution. If anything suggests harassment, discrimination, retaliation for raising a concern, threats, or a safety issue, say so first, explain that this calls for the formal route in step 5, and do not frame it as a style problem.
2. Adjust what you control: three to five specific managing-up moves for this pattern (for example a weekly written update that pre-empts check-ins for a micromanager, confirming priorities in writing for shifting expectations, booking a standing 1:1 with an absent manager).
3. The conversation: a script for one private conversation using situation, behaviour and impact, focused on the work and a specific request, with an opener, two likely reactions (defensive, dismissive) and how to respond, and a close that agrees a next step. Say when to have it and when not to (for example not right after a heated moment).
4. Document: what to record (date, what was said or done, witnesses, impact, your response), factual and neutral, kept in a personal place without copying confidential company data, and why it matters even if the user never escalates.
5. Allies and escalation: who can help (a mentor, skip-level manager, HR, an employee representative or union, an employee assistance programme), what each can and cannot do, noting that HR's role is to protect the organisation as well as employees. For serious conduct, recommend the formal grievance route and, where stakes are high, advice from an employment lawyer or union before acting.
6. Decision points: what would show progress within four to eight weeks, the signals that it will not improve, and if leaving is likely, how to search quietly, protect references and exit well.
</task>

<constraints>
- Treat the manager's motives as hypotheses. Do not diagnose anyone's personality or mental health.
- Use only facts from the input; mark missing details as [X].
- Do not give legal conclusions. Point to the employer's policy, an employment lawyer or a union for anything that may be unlawful.
- If the user describes feeling unsafe, threatened, or in serious distress, put that first: encourage them to reach someone they trust, their doctor or a support service, and local emergency services if they are in danger.
</constraints>

<output_format>
## Diagnosis
Pattern, evidence, hypotheses, and any red flags first.
## Adjust what you control
## The conversation
Script, then table: If they say | You say.
## Document
## Allies and escalation
## Decision points
</output_format>
