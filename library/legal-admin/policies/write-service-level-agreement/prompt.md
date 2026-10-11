---
schema: 1
id: write-service-level-agreement
kind: prompt
title: Write a service level agreement for a SaaS
description: Drafts a service level agreement for a SaaS, API or hosting service - uptime definition, exclusions, measurement, support response times, service credits and how to claim them.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, sre, operations-manager]
subject: [law, saas]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-level-agreement, uptime, service-credits, support-response-times, availability, saas-contracts]
pairs_with:
  prompts: [calculate-sla-availability, write-terms-of-service, write-service-level-terms-for-contract-clients, draft-data-processing-agreement]
args:
  - name: service
    description: What the service is, the components customers depend on, where it is hosted and the hosting provider's own commitments, your monitoring, maintenance windows, support hours and channels, plans or tiers, and what customers or prospects have asked for.
    type: text
    required: true
  - name: track_record
    description: Recent availability and incident history, and current support response performance. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Targets check, Service level agreement, Support severity table, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft a service level agreement (SLA) for a SaaS, API or hosting service. Field-service SLAs for cleaning, maintenance or helpdesk contracts are a different job (see write-service-level-terms-for-contract-clients). A good SLA is precise about what is promised and realistic about what the service can deliver. The key definitions decide everything: what "unavailable" means (the whole service down, a core function failing, an error rate above a threshold, a region affected), how it is measured (the provider's own monitoring from named locations, not customer anecdotes), over what period (usually a calendar month), and what is excluded (scheduled maintenance with advance notice, emergency security patches, customer-caused problems, the customer's own internet or integrations, beta features, suspensions for non-payment, and events beyond reasonable control). Each additional "nine" sharply cuts the allowed downtime: 99.9% a month is roughly 43 minutes, 99.99% roughly 4 minutes, and a provider cannot honestly promise more than its own dependencies and incident history support. Remedies are normally service credits in tiers as a percentage of the monthly fee for the affected service, claimed by the customer within a set period, capped, and stated as the sole remedy for availability failures, often with a right to terminate for chronic failure. Support targets should separate response time from resolution or workaround time, define severity levels with examples, and state support hours and time zone.
</context>

<task>
Service:
<service>
{{service}}
</service>
{{#track_record}}

Track record:
<record>
{{track_record}}
</record>
{{/track_record}}

1. Targets check: compare the targets the user wants or customers request with the hosting provider's commitments, the architecture described and the track record, and recommend a target per plan with the allowed downtime per month shown.
2. Service level agreement: numbered sections covering scope and services covered, definitions (availability, downtime, monthly uptime percentage formula, scheduled maintenance, emergency maintenance), measurement and reporting, exclusions, service credit tiers, claim procedure and deadline, credit cap and sole remedy, chronic failure termination right, support hours and channels, customer responsibilities, changes to the SLA, and how it fits with the main agreement. Use [BRACKETS] for figures the user has not decided.
3. Support severity table: severity definitions with examples, response target, update frequency, and workaround or resolution target.
4. Points to confirm, including whether the main agreement's liability clause and the SLA's sole remedy wording fit together.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend uptime targets above what the described architecture, dependencies and track record support; explain the gap if the user asks for more.
- Do not invent the hosting provider's SLA figures; mark them "check your provider's current SLA".
- Show the uptime arithmetic so the figures can be checked.
- Recommend legal review of the sole remedy and termination wording against the main contract.
{{> output/uncertainty}}
</constraints>

<output_format>
## Targets check
Table: plan | requested target | recommended target | allowed downtime per month | reason.

## Service level agreement
Numbered sections with headings.

## Support severity table
Table: severity | definition and example | response | updates | workaround or resolution.

## Points to confirm
Numbered list.
</output_format>
