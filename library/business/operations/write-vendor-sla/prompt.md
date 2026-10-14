---
schema: 1
id: write-vendor-sla
kind: prompt
title: Write service levels for an outsourced vendor
description: Writes the service level schedule a buyer sets for an outsourced vendor - measurable targets, how each is measured, reporting, review meetings, service credits and exit triggers.
category: operations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [operations-manager, founder, manager]
inputs: [notes, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [service-level-agreement, sla, outsourcing, performance-targets, service-credits, vendor-management]
pairs_with:
  prompts: [write-rfp, compare-vendors, build-supplier-scorecard, write-supplier-onboarding-pack]
args:
  - name: service
    description: The outsourced service, for example office cleaning across three sites, IT support desk, warehousing and fulfilment, payroll bureau, security guarding, customer service call centre.
    type: text
    required: true
  - name: what_matters
    description: What good and bad service look like for you, the failures that hurt most, and any numbers from the current or previous vendor.
    type: text
    required: true
  - name: contract_info
    description: Optional. Contract value, length, whether this is a new tender or a renewal, and any draft terms or vendor-proposed SLAs to improve.
    type: text
  - name: jurisdiction
    description: Country or state whose law governs the contract.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Service scope, Service levels, Measurement and data, Reporting and reviews, Service credits, Persistent failure and exit, Points for the contract lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a procurement and vendor management lead who drafts service level schedules for outsourced services. Buyers often accept the vendor's own SLA, which measures what the vendor controls and can easily hit ("respond to tickets within 4 hours" with no fix time), averages results over a month so bad days disappear, lets the vendor measure itself with no audit right, and offers credits so small they never change behaviour. A good schedule measures outcomes the business feels, defines each measure precisely (start and stop times, exclusions, measurement source, period), has a small number of key levels with real credits plus some tracked indicators without credits, sets reporting and review meetings, and defines persistent failure that gives the right to step in or exit. Credits are usually capped and are a price adjustment, not the buyer's only remedy; that and enforceability depend on the law of the contract.
</context>

<task>
Write a service level schedule.

<service>
{{service}}
</service>

<what_matters>
{{what_matters}}
</what_matters>
{{#contract_info}}
<contract_info>
{{contract_info}}
</contract_info>
{{/contract_info}}
Governing law: {{jurisdiction}}

1. Service scope: the services covered, service hours, locations or users, and what is excluded, in one short list.
2. Service levels: 4 to 8 key service levels tied to what matters. For each, give the name, precise definition, target, measurement period, measurement source, exclusions (for example buyer-caused delays, agreed maintenance) and whether it carries a credit. Add a separate list of key performance indicators tracked without credits. Where the user gave no numbers, propose a starting target labelled as a suggestion and say what data would confirm it.
3. Measurement and data: who measures, from which system, the buyer's right to see raw data and audit, and how disputes about figures are resolved.
4. Reporting and reviews: monthly report contents, a monthly operational review and a quarterly business review with agendas, and how improvement plans are triggered.
5. Service credits: a simple credit model (for example a percentage of the monthly charge per missed level, with a cap), a worked example, and how credits are claimed or applied automatically. Prefer automatic application.
6. Persistent failure and exit: define persistent failure (for example the same level missed in three months out of six) and what follows: a remediation plan, step-in or replacement of staff, and the right to terminate. Include exit support obligations (handover, data return, transition period).
7. Points for the contract lawyer: the legal points to check under {{jurisdiction}}, such as how credits interact with damages, whether they could be treated as a penalty, caps, and termination rights.
8. Check that every service level has a definition, a source and a period, and that the credit example adds up.
</task>

<constraints>
- This is a draft operational schedule, not legal advice; say once that the final contract should be reviewed by a lawyer for {{jurisdiction}}.
- Do not invent the vendor's current performance or industry benchmark figures; label suggested targets as starting points to test with bidders.
- Keep targets measurable; reject wording such as "promptly", "best efforts" or "high quality" without a definition.
- Avoid credits so large they are unrealistic or likely unenforceable; keep the model proportionate and explain the cap.
</constraints>

<output_format>
## Service scope
Bullets.
## Service levels
Table: Level | Definition | Target | Period | Source | Exclusions | Credit?, then a short list of tracked KPIs.
## Measurement and data
Numbered clauses.
## Reporting and reviews
Report contents and the two meeting agendas.
## Service credits
The model, cap and a worked example with numbers.
## Persistent failure and exit
Numbered clauses.
## Points for the contract lawyer
Bullets.
</output_format>
