---
schema: 1
id: talk-to-employer-about-caring
kind: prompt
title: Talk to your employer about caring
description: Prepares a working carer to tell their employer about caring and ask for what they need, such as flexible hours, carer's leave or a phased plan, with the rights to check and a written request.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, script, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [working-carers, flexible-working, carers-leave, workplace, carers]
pairs_with:
  prompts: [manage-caregiver-stress, build-care-rota, check-burnout-signs]
  personas: [eldercare-advisor]
args:
  - name: caring_and_work
    description: Who you care for and what caring takes (appointments, mornings, unpredictable crises), your job, hours and how flexible it is now, and the country or state.
    type: text
    required: true
  - name: what_you_want
    description: What you hope to change, for example "start at 10 on two days", "a few unpaid weeks after Dad's surgery", "just for my manager to know". Optional.
    type: text
  - name: workplace
    description: What you know about your manager, HR, policies, a carers' network or employee assistance programme. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you need from work, Rights and policies to check, Options to propose, The conversation, Written request, If the answer is no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help working carers talk to their employer, the way an experienced carers' adviser or HR business partner would. Many carers say nothing until they are exhausted or facing discipline for lateness, then quit a job they did not need to lose. What helps: telling the employer early and factually, asking for a specific, workable arrangement rather than "some flexibility", showing how the work will still get done, proposing a trial period and a review date, and putting a formal request in writing where the law gives a route for it. Rights differ a lot: some countries give a right to request flexible working, a short statutory carer's leave, or protected family or medical leave; others give little beyond company policy. Employers often have more in their own policies (carers' leave, compassionate leave, employee assistance programmes, carers' networks) than people realise.

<caring_and_work>
{{caring_and_work}}
</caring_and_work>
{{#what_you_want}}What you want: {{what_you_want}}{{/what_you_want}}
{{#workplace}}Workplace: {{workplace}}{{/workplace}}
</context>

<task>
1. What you need from work: turn the caring load into concrete needs (fixed times, predictable appointments, unpredictable emergencies, a block of time off) and separate short-term from ongoing.
2. Rights and policies to check: for the country given, name the kinds of rights that may apply (a right to request flexible working, carer's or family leave, emergency time off for dependants, disability-by-association protections) as things to verify with an official government source, HR or a union, and list what to look for in the company's own policies. Never state an entitlement, length or pay as certain.
3. Options to propose: two or three specific arrangements (changed start times, compressed hours, home working on set days, reduced hours, a period of leave, a phased return), each with how the work gets covered and the trade-offs for the carer (pay, pension, career).
4. The conversation: who to speak to first, how much to share about the person cared for (enough to explain, keeping their privacy), an opening, the ask, how to answer likely concerns, and agreeing a trial and review date.
5. Written request: a short, factual request in a code block that states the arrangement, start date, how the work will be covered, a trial period, and asks for a reply by a date; add a note that formal statutory requests may need specific wording or forms to check.
6. If the answer is no: ask for reasons in writing, adjust the proposal, check appeal or grievance routes, and where to get independent advice (a union, a carers' organisation, an employment advice service or lawyer).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent laws, leave lengths, pay rates or eligibility rules; say they vary by country, state and employer and must be checked.
- Do not encourage hiding caring in ways that could breach a contract, or sharing the cared-for person's medical details beyond what is needed.
- Keep scripts calm and collaborative; no threats of legal action in a first conversation.
- If the carer mentions being disciplined, dismissed or discriminated against, recommend independent employment advice promptly because time limits may apply.
</constraints>

<output_format>
## What you need from work
## Rights and policies to check
## Options to propose
Table: Option | How the work gets done | Trade-offs for you.
## The conversation
## Written request
Code block.
## If the answer is no
</output_format>
