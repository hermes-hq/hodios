---
schema: 1
id: write-aml-risk-assessment
kind: prompt
title: Write an anti-money laundering risk assessment
description: Drafts a business-wide money laundering and terrorist financing risk assessment for a small regulated firm, rating customer, service, channel and geography risks and linking each to controls.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, legal-professional, consultant]
subject: [law, real-estate]
requires: [none]
inputs: [text]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [anti-money-laundering, aml, risk-based-approach, regulated-sector, financial-crime]
pairs_with:
  prompts: [plan-customer-due-diligence, set-up-sanctions-screening, build-compliance-checklist]
  personas: [compliance-officer]
args:
  - name: business
    description: What the firm does - for example accountancy, estate agency, law firm, company services, high-value dealer - its services, typical customers, how they are onboarded, payment methods, countries involved and size.
    type: text
    required: true
  - name: country
    description: Country and the AML supervisor if known. Who is regulated and what is required differs by country. Required, because the duty itself depends on it.
    type: string
    required: true
  - name: existing
    description: Any current AML policy, past assessments, supervisor feedback, or incidents and suspicious activity reports (described without client details). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope and assumptions, Risk factors, Risk ratings, Controls mapped to risks, Gaps and actions, Review and sign-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small firm in a regulated sector write the written, business-wide money laundering and terrorist financing risk assessment that many AML regimes require and that supervisors ask to see first. Supervisors criticise generic assessments copied from templates: the document must reflect this firm's actual customers, services, delivery channels, geographies and transactions, use the national risk assessment and sector guidance as inputs, and lead to proportionate controls (customer due diligence levels, enhanced checks, staff training, monitoring, and reporting). Real-world red flags differ by sector: for estate agents, cash or third-party funded purchases and complex ownership of the buyer; for accountants, unusual flows through client accounts and company formation for unclear purposes; for dealers, large cash payments. The assessment needs a named owner, approval by senior management, and regular review.

Country: {{country}}
</context>

<task>
Business:

<business>
{{business}}
</business>
{{#existing}}

Existing material:
<existing>
{{existing}}
</existing>
{{/existing}}

1. Scope and assumptions: whether the firm appears to be within the AML regime (say what to verify with the supervisor), which services are in scope, the inputs that should be consulted (national risk assessment, supervisor or sector guidance), and every assumption.
2. Risk factors: for customers, products and services, delivery channels, geography and transactions, list the factors specific to this firm and sector, with real red flags.
3. Risk ratings: rate each area low, medium or high with reasons, and give an overall rating. Show the reasoning, not just the label.
4. Controls mapped to risks: for each material risk, the control (standard or enhanced due diligence triggers, source of funds or wealth checks, refusing cash above a threshold set by policy, ongoing monitoring, staff training, internal reporting to a nominated officer), the owner, and the evidence kept.
5. Gaps and actions: missing controls, prioritised, with owners and dates.
6. Review and sign-off: who approves, the review frequency, and events that trigger a review (new service, new market, supervisor guidance, an incident).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent regulations, supervisor names, thresholds or record-keeping periods. Use what the user supplies; otherwise mark "verify with your supervisor".
- Do not tip off: never draft wording that would alert a customer to a suspicion or a report. Mention tipping-off risk where relevant.
- Avoid boilerplate; every factor must link to something in the firm's description, or be marked as a question.
- Recommend the firm's nominated officer, supervisor guidance and an AML specialist for review, especially if the firm handles client money, trusts, high-value cash or customers in high-risk countries.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Bullets.

## Risk factors
Table: area | factor specific to this firm | red flags.

## Risk ratings
Table: area | rating | reasons; then the overall rating.

## Controls mapped to risks
Table: risk | control | owner | evidence.

## Gaps and actions
Prioritised table: gap | action | owner | date.

## Review and sign-off
Bullets.
</output_format>
