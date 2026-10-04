---
schema: 1
id: write-service-level-terms-for-contract-clients
kind: prompt
title: Write service levels for contract clients
description: Writes service level terms for business clients of a cleaning, maintenance, security or IT firm - priorities, response and fix times, reporting and credits - that its staff can really meet.
category: customer-support
version: 1.0.0
status: incubating
stage: [design, build]
role: [founder, operations-manager, manager]
requires: [none]
inputs: [text, notes]
output: [docs, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-level-agreement, response-times, service-credits, priority-levels, facilities-services]
pairs_with:
  prompts: [design-escalation-process, plan-support-staffing, prepare-business-review]
args:
  - name: service
    description: What you provide to business clients (office cleaning, building maintenance, manned security, IT support), the client type and size, sites covered, and what clients currently expect or complain about.
    type: text
    required: true
  - name: capacity
    description: What you can really deliver - staff numbers and hours, on-call cover, travel times between sites, subcontractors, parts lead times, and any service levels you already promise.
    type: text
    required: true
  - name: client_ask
    description: Any service levels or credits a client has asked for, pasted from their tender or email. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Priority definitions, Service levels, Measurement and reporting, Escalation, Service credits, Exclusions, Points for legal review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help service firms write service level terms for business clients. Small firms usually get this wrong in one of two ways: they copy a large company's targets ("4-hour fix, 24/7") that their staff cannot meet, then pay credits or lose the contract; or they write vague promises ("prompt response") that leave every dispute to opinion. Good service levels define priority by impact on the client, separate response (acknowledged and someone assigned or on the way) from resolution or a workaround, set clock rules (business hours or 24/7, when the clock pauses), measure monthly, and cap credits at an amount the firm can survive. Every target must survive a test against the firm's real staffing, travel and parts lead times.
</context>

<task>
<service>
{{service}}
</service>

<capacity>
{{capacity}}
</capacity>
{{#client_ask}}
<client_ask>
{{client_ask}}
</client_ask>
{{/client_ask}}

1. Capacity check: test each likely or requested target against the stated capacity (for example a 2-hour on-site response across sites 90 minutes apart with one engineer on call is not achievable). Say which targets are safe, which need more resource, and which to refuse or price separately.
2. Priority definitions: three or four priorities with plain examples for this service (P1: site unsafe or unusable, or business stopped; P2: major part affected; P3: minor fault or request; P4: planned work), and who decides the priority.
3. Service levels: for each priority, response and resolution or workaround targets, the hours that apply, and the clock rules (when it starts, pauses for client access or parts, and stops).
4. Measurement and reporting: how each target is measured, the monthly report contents, the target achievement level (for example 95% of P2 within target in a month), and a review meeting cadence.
5. Escalation: named roles and timings on both sides.
6. Service credits: a simple scheme, if any, tied to monthly achievement, with a cap (for example a small percentage of the monthly fee), and the principle that credits are the sole remedy for missed targets only if the contract says so - flag this for legal review.
7. Exclusions: client-caused delays, access refusal, force majeure, work outside scope, third-party failures.
8. Points for legal review: everything that needs a lawyer before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never propose a target the stated capacity cannot meet; when the client asks for one, show the gap and the cost of closing it.
- Use only the facts given; mark missing fees, hours or site details as [X].
- Do not write liability caps, indemnities or termination rights as final contract wording; list them for legal review in the country.
- Plain English the client's facilities or office manager can read.
</constraints>

<output_format>
One opening line: a draft for discussion, to be reviewed by a lawyer before it goes into a contract.
## Capacity check
Table: Target | Achievable now? | What it would take.
## Priority definitions
Table: Priority | Definition | Examples.
## Service levels
Table: Priority | Response | Resolution or workaround | Hours | Clock pauses when.
## Measurement and reporting
Bullets.
## Escalation
Table: Level | Firm contact role | Client contact role | When.
## Service credits
Short paragraph and table.
## Exclusions
Bullets.
## Points for legal review
Bullets.
</output_format>
