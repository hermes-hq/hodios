---
schema: 1
id: plan-customer-escalation-response
kind: prompt
title: Plan the engineering response to a customer escalation
description: Plans the engineering response to a major customer escalation with facts first, triage, a workaround, a fix plan, an update cadence, one owner and a follow-up review.
category: planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, tech-lead, support-agent, sre]
stack: []
requires: [none]
inputs: [ticket, logs, message, text]
output: [plan, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [customer-escalation, key-accounts, workaround, status-updates, root-cause, b2b]
pairs_with:
  prompts: [prioritize-bug-backlog, write-bug-severity-policy]
args:
  - name: escalation
    description: What the customer reports, who they are (size, contract, renewal timing if relevant), what has already happened in the ticket, any logs or evidence, and who is asking engineering for help.
    type: text
    required: true
  - name: constraints
    description: Team availability, release process and any commitments already made to the customer.
    type: text
output_contract:
  format: markdown
  sections: [Facts and unknowns, Owner and roles, Triage plan, Workaround, Fix plan, Customer updates, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a large customer escalates outside an outage (a bug blocking their workflow, data that looks wrong, performance that breaks their use case), engineering typically gets pulled in through several channels at once: sales, support, an executive. The common failures are several engineers investigating in parallel without coordination, promises of dates made before the cause is known, a fix rushed to production without review, silence between updates, and no check afterwards of why the problem reached the customer first. A good response names one engineering owner, establishes facts and reproduces before theorising, separates a fast workaround from the proper fix, gives the customer-facing owner accurate updates on a fixed cadence including "no news yet", and ends with a short review. If many customers are affected, it is an incident and goes through the incident process instead.
</context>

<task>
Escalation: {{escalation}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}

1. Facts and unknowns: what is known from evidence, what is claimed but unverified, and what is unknown. Check whether other customers could be affected; if so, recommend handling it as an incident.
2. Owner and roles: one engineering owner, the single customer-facing owner (support or account manager), who else is needed, and who shields the rest of the team from side requests.
3. Triage plan: steps to reproduce with the customer's data or configuration (with their permission and within data-access rules), logs and metrics to check, recent changes to compare, and a time box before escalating within engineering.
4. Workaround: options that relieve the customer quickly (configuration change, manual data fix with review and audit, feature flag), with risks.
5. Fix plan: the change, testing, review and release path; a hotfix only if severity justifies it; no shortcuts past review.
6. Customer updates: cadence, what to say at each stage, wording that commits to the next update time rather than to a fix date until the cause is known, and a first message draft for the customer-facing owner.
7. Follow-up: a short review of how it reached the customer, detection gaps, and whether this customer's configuration should be in tests.
</task>

<constraints>
- Do not promise fix dates or root causes before they are known.
- Customer data is accessed only as permitted by the contract and internal policy; say to check before using production data.
- Do not invent facts about the customer or the system; mark assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Facts and unknowns
Table: Item | Known, claimed or unknown | Source.
## Owner and roles
## Triage plan
## Workaround
## Fix plan
## Customer updates
Cadence, then the first message draft.
## Follow-up
</output_format>
