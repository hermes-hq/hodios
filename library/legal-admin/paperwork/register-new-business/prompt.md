---
schema: 1
id: register-new-business
kind: prompt
title: Register a new business
description: Lists in order the registrations to set up a new business in a given location - name, entity, tax numbers, payroll, licences and bank - with what each needs and where to verify it.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [business-registration, company-formation, tax-registration, sole-trader, llc, startup-admin]
pairs_with:
  prompts: [choose-business-structure, check-business-licences, set-up-first-payroll]
args:
  - name: location
    description: Country and state, province or city where the business will be based, and any other places where it will sell, employ or hold stock.
    type: string
    required: true
  - name: business
    description: What the business does, the structure you have chosen (sole trader, partnership, LLC or limited company, other), the owners, expected first-year turnover, whether you will hire staff, sell online or to other countries, and the trading name you want.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Registration sequence, Thresholds and triggers to watch, Information to have ready, Ongoing filings created by registering, Where to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new business owners complete the registrations that make a business legal once the structure is chosen. The order matters because later steps need earlier outputs: the entity or business registration gives a number the tax office needs; the tax number is needed to open a business bank account and register for payroll; licences often need the registered address and entity details. Experts also know where people go wrong: registering a name without checking trademarks and domain availability, missing a separate state, provincial or local registration, forgetting that sales or value-added tax registration is triggered by turnover or by selling into another place, hiring the first employee before registering as an employer and arranging required insurance, using a home address that then appears on a public register, and not diarising the annual filings that registration creates. Many countries now have a single online portal that combines several of these. You give the sequence; licences specific to the activity are a separate check.

Location: {{location}}
</context>

<task>
Business:

<business>
{{business}}
</business>

1. State your assumptions (structure, location, staff, turnover) and anything missing that changes the sequence.
2. Give the registration sequence for {{location}} as an ordered table. Typical steps, adjusted to the location and structure: name availability check (registry, trademarks, domain); entity formation or sole-trader registration; business or trade registration with the local authority where required; tax registration and identification numbers; sales tax or VAT registration if required or chosen; employer and payroll registration and workers' insurance before the first hire; beneficial ownership or similar filings; business bank account; activity licences and permits (flag as a separate check). For each step: what it is, which body usually handles it, what it needs, typical cost or time (only if confident, else "to verify"), and what it produces for later steps.
3. Thresholds and triggers: turnover thresholds for sales tax or VAT, selling into other states or countries, hiring, and premises, explained as triggers to monitor rather than numbers you guarantee.
4. Information to have ready: owner IDs and addresses, registered office address (and whether it will be public), description of activities and classification code, start date, share or ownership details, expected turnover.
5. Ongoing filings created by registering: annual returns or reports, tax returns, payroll filings, renewals, with a suggestion to put them in a calendar.
6. Where to get help: the official business portal or registry, the tax office's new-business guidance, small business support services, and an accountant for tax set-up.
7. Check before answering: steps in a workable order, no invented fees or body names, and licences flagged rather than listed from guesswork.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent registry names, fees, thresholds or timescales; mark uncertain items "to verify" and name the type of official body.
- Do not re-decide the business structure; if the stated structure looks unsuitable or is missing, note it in one line and suggest checking with an accountant.
- Warn about lookalike paid services and invoices that imitate official registries.
- If the activity is regulated (food, alcohol, childcare, health, finance, transport), say that licensing must be checked before trading starts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Registration sequence
Table: step | handled by | needs | cost or time | produces.

## Thresholds and triggers to watch
Bullets.

## Information to have ready
Checklist.

## Ongoing filings created by registering
Table: filing | how often | first due.

## Where to get help
Bullets.
</output_format>
