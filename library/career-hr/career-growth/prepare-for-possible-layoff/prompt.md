---
schema: 1
id: prepare-for-possible-layoff
kind: prompt
title: Prepare for a possible layoff
description: Prepares for rumoured or announced layoffs before they land - records to keep, a money check, network warm-up, a ready job-search kit and questions to ask - without panic or breaking company rules.
category: career-growth
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
advice_risk: [financial, legal]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [layoff, redundancy, job-security, emergency-fund, contingency-plan]
pairs_with:
  prompts: [recover-from-layoff, plan-job-search-while-employed, write-brag-document]
  personas: [career-coach]
args:
  - name: situation
    description: What you have heard or been told about cuts, your role and length of service, how exposed you think your team is, your savings and essential monthly costs in broad terms, and any dates coming up (bonus, vesting, leave, visa).
    type: text
    required: true
  - name: country
    description: Country and state or region of employment.
    type: string
output_contract:
  format: markdown
  sections: [Read the signals, This week, Money check, Your job-search kit, Network warm-up, Questions if cuts are announced, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get ready for layoffs that have not happened yet. The weeks before cuts are when preparation is cheapest: once access is cut, people lose their own records of achievements and contacts, and a job search started in shock is slower. Good preparation is quiet and lawful: keep personal copies of what is yours to keep (pay slips, contract, reviews, your own contact details), never company confidential data; build a cash buffer; update the resume while achievements are fresh; and reconnect with contacts before you need a favour. Some situations need special care: people on a work visa, near a vesting or bonus date, on leave, or with health cover tied to the job. Rumours are often wrong, so the plan should also be worth doing if no cuts come.

<situation>
{{situation}}
</situation>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Read the signals: separate firm signals (announcements, hiring freezes, budget cuts to their area, consultations) from rumour, and give a short, honest view of how exposed their role seems, saying what would change that view.
2. This week: an ordered checklist of quiet steps: save personal copies of their own documents and contacts allowed under company policy; write down achievements with figures; collect praise and results; note key dates (bonus, vesting, leave, visa, notice terms in the contract); check what benefits depend on employment.
3. Money check: a runway calculation from the figures given (savings divided by essential monthly costs), costs to cut now versus later, big commitments to postpone, and what to check about unemployment benefits and health cover with the official source.
4. Your job-search kit: what to have ready before any news (updated resume, a refreshed professional profile, a target role list, three short achievement stories, references sounded out), sized to a few hours a week.
5. Network warm-up: who to reconnect with first and a short, natural message that does not announce a layoff that has not happened.
6. Questions if cuts are announced: what to ask HR or the manager (selection criteria, timeline, consultation, redeployment options, severance terms, notice, equity, benefits, reference policy, outplacement) and a reminder not to sign anything on the spot.
7. What not to do: taking confidential files or customer lists, spreading rumours, resigning early and losing severance, or making big financial moves in panic.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never advise copying company confidential data, customer lists or code, or forwarding work files to personal accounts. Personal records only, and only as company policy allows.
- Do not state severance, notice, benefit or visa rules as fact for their country; name what to check and the official source. If the country is missing, ask for it.
- Do the runway arithmetic exactly with the numbers given; mark missing figures as [X].
- If they are on a work visa, flag that immigration timelines after job loss can be short and that they should get immigration advice early.
- Keep the tone steady; the aim is preparation, not alarm.
</constraints>

<output_format>
## Read the signals
## This week
Numbered checklist.
## Money check
Runway calculation with formula, then actions.
## Your job-search kit
## Network warm-up
## Questions if cuts are announced
## What not to do
</output_format>
