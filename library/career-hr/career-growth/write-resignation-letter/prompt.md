---
schema: 1
id: write-resignation-letter
kind: prompt
title: Write a resignation letter
description: Writes a resignation letter and a plan for the conversation with your manager, covering notice, a handover offer and tone, while keeping relationships intact. Use when you have decided to leave.
category: career-growth
version: 1.0.0
status: incubating
stage: [ship]
role: [individual, job-seeker, manager]
requires: [none]
inputs: [text]
output: [message, script, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [resignation, notice-period, handover, counteroffer, leaving-well]
pairs_with:
  prompts: [evaluate-job-offer, plan-first-90-days]
  personas: [career-coach]
args:
  - name: situation
    description: Your role, manager, why you are leaving (as much as you want to share), whether you have a signed offer, your relationship with the team, anything sensitive (a conflict, a complaint, a competitor), and your contract's notice terms if you know them.
    type: text
    required: true
  - name: notice_period
    description: Your notice period and proposed last day (for example "4 weeks, last day 31 May"). Leave empty if unsure; you get a placeholder and a reminder to check your contract.
    type: string
output_contract:
  format: markdown
  sections: [Before you resign, Conversation plan, Resignation letter, Handover outline, Handling a counteroffer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people leave jobs well. A resignation letter is a formal record, not the place to air grievances: it should state the decision, the last working day and a willingness to help with the handover, and little else. The conversation with the manager matters more than the letter: the manager should hear it first, in person or on a call, before anyone else and before the letter arrives. People who leave well keep references, rehire options and a network that follows them for decades; people who leave badly rarely gain anything from it.

<situation>
{{situation}}
</situation>
{{#notice_period}}Notice and last day: {{notice_period}}{{/notice_period}}
</context>

<task>
1. Before you resign: a short checklist - a signed offer and agreed start date in hand (if moving to a new job), the notice period and any garden leave, non-compete, repayment (training, relocation, sign-on) or holiday-pay clauses checked in the contract, personal files and contacts copied appropriately without taking company data, and benefits or equity events whose timing may matter (vesting dates, bonus payment dates). Frame clause questions as things to check, and suggest HR or an employment adviser if anything is unclear.
2. Conversation plan: when and how to tell the manager (privately, first, before the letter), an opening of two or three sentences that states the decision clearly, how much to say about the reason (honest but brief and forward-looking; nothing they would regret being repeated), how to answer "where are you going?" and "why?", and what to say about the handover. Include how to handle an emotional or angry reaction calmly.
3. Resignation letter: short and formal, with the date, recipient, a clear statement of resignation, the last working day based on the notice period, an offer to support the handover, an optional one-line thanks that is sincere, and a sign-off. No complaints, no detailed reasons, no new employer's name unless they want it there. Provide a warmer and a strictly neutral version.
4. Handover outline: the sections of a handover document for their role (open work and status, recurring tasks, contacts, access and accounts, where things live, risks and deadlines) and a suggested schedule across the notice period.
5. Handling a counteroffer: questions to ask themselves before considering one (did the reasons for leaving go away, or only the pay?), and a gracious way to decline.
</task>

<constraints>
- Never invent contract terms or legal requirements. Notice rules, garden leave and final pay differ by country and contract; mark the notice period as [check your contract] if not given.
- If the situation involves harassment, discrimination, unpaid wages, a whistleblowing matter or being pushed to resign, say that resigning may affect their rights, and suggest speaking to an employment lawyer, union or official advice service before resigning.
- Keep the letter under 150 words. Keep the spoken opening under 30 seconds.
- Do not include anything in the letter that could be read as a grievance or a negotiation.
</constraints>

<output_format>
## Before you resign
Checklist.
## Conversation plan
Opening lines, answers to likely questions, and how to handle reactions.
## Resignation letter
Warmer version, then neutral version.
## Handover outline
## Handling a counteroffer
</output_format>
