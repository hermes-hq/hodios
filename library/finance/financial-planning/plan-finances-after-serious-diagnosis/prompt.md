---
schema: 1
id: plan-finances-after-serious-diagnosis
kind: prompt
title: Plan finances after a serious diagnosis
description: Plans the money side after a serious illness diagnosis for you or a partner - income if work stops, insurance and benefit claims, bills to pause, treatment costs and the paperwork to put in place.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [serious-illness, income-protection, sick-pay, benefits]
pairs_with:
  prompts: [plan-finances-after-job-loss, build-financial-emergency-file, build-tight-budget, negotiate-with-creditor]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Who is ill, what you know about time off work or treatment (no medical detail needed beyond that), household income, essential costs, savings and debts.
    type: text
    required: true
  - name: cover
    description: Any cover you have or might have - sick pay at work, income protection, critical illness or life cover (including through an employer, mortgage or card), health insurance. Say "not sure" if you do not know. Optional.
    type: text
  - name: country
    description: Country and region, because sick pay, health costs and benefits differ widely.
    type: string
output_contract:
  format: markdown
  sections: [First two weeks, Income if work stops, Cover to check and claim, Costs and bills, Paperwork to put in place, Where to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people deal with money after a serious diagnosis, for themselves or someone they live with, so that money worry takes less room. The pattern is predictable: income drops or stops, costs rise (travel, parking, prescriptions or treatment, heating, care), and paperwork piles up while energy is low. Many people have cover they do not know about: employer sick pay beyond the legal minimum, group income protection or life cover through work, critical illness cover attached to a mortgage, payment protection on loans or cards, or health insurance through an employer or partner. Claims have time limits and need evidence, so finding cover early matters. Creditors and utilities often have hardship processes if told early. Specialist charities and hospital social workers or financial advisers attached to treatment centres exist in many countries and know the local system. Powers of attorney or their local equivalent must be made while the person can still decide.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>
{{#cover}}

Cover:

<cover>
{{cover}}
</cover>
{{/cover}}

1. First two weeks: a short list of the few things that matter now (tell the employer in writing, ask HR about sick pay and benefits, find all policies, set aside essential bills money), and permission to leave the rest.
2. Income if work stops: how long sick pay may last, what comes after (income protection, state benefits for illness or disability, a partner's income), and a month-by-month view of household income against essential costs for the next six months with the person's figures. Mark entitlements as "to check".
3. Cover to check and claim: a checklist of places cover may hide, how to start a claim, evidence usually needed, and to note time limits.
4. Costs and bills: likely extra costs to plan for, and which bills or debts to contact for hardship support (mortgage or rent, energy, loans, cards), with the priority order.
5. Paperwork to put in place: power of attorney or local equivalent, will, the emergency money file, a second person able to manage bills, and who to give consent to speak on the person's behalf.
6. Where to get help: types of service (hospital or treatment-centre financial or social work support, illness-specific charities, free benefits and debt advice), naming specific organisations only when confident they exist in that country.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not give medical advice or comment on prognosis. Ask nothing about the illness beyond what affects work and costs.
- Never invent benefit names, amounts or sick pay rules. Mark entitlements "to check".
- Do not suggest cashing in pensions or borrowing at high cost as a first step; if early pension access on ill-health grounds may exist, frame it as a question for the provider and an adviser.
- Be gentle and brief. Use short sentences and clear next steps.
{{> output/uncertainty}}
</constraints>

<output_format>
## First two weeks
Up to five bullets.

## Income if work stops
Short explanation and a six-month table: month | income | essentials | gap.

## Cover to check and claim
Checklist.

## Costs and bills
Bullets in priority order.

## Paperwork to put in place
Checklist.

## Where to get help
Bullets.
</output_format>
