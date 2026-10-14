---
schema: 1
id: scope-software-maintenance-agreement
kind: prompt
title: Scope a software maintenance agreement
description: Scopes post-launch support and maintenance for a client's software with what is covered, response targets by severity, an hours model, exclusions and monthly reporting.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [consultant, tech-lead, founder, engineering-manager]
stack: []
advice_risk: [legal]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [maintenance-retainer, support-sla, software-agency, client-project, dependency-updates, hosting]
pairs_with:
  prompts: [write-statement-of-work, write-bug-severity-policy, assess-technical-debt]
args:
  - name: system
    description: The software delivered (stack, hosting, integrations, mobile apps, age of dependencies), who hosts it, how critical it is to the client, and what has gone wrong since launch.
    type: text
    required: true
  - name: commercial
    description: What the client asked for, your available capacity, your rates if you want pricing, and whether you also host it.
    type: text
output_contract:
  format: markdown
  sections: [Gaps to settle first, Service scope, Severity and response targets, Hours and pricing model, Exclusions, Reporting and reviews, Notes before signing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After launch, clients expect the software to keep working, and agencies and freelancers often agree "support" without defining it. The disputes that follow are predictable: new features requested as "fixes", 24/7 expectations on a business-hours budget, nobody responsible for security patches and framework upgrades until something breaks, app store policy changes and OS updates treated as free work, hosting and third-party outages blamed on the developer, and unused hours argued about at month-end. A clear agreement separates reactive work (incidents and defects, with severity-based response targets and honest support hours), proactive maintenance (dependency and security updates, certificates, backups checked, platform upgrades, app store compliance), and small changes from a capped bank of hours, with new features quoted separately. Response time is not resolution time, and the targets must match the people actually available.

{{> guardrails/professional-limits}}
</context>

<task>
System: {{system}}
{{#commercial}}Commercial context: {{commercial}}{{/commercial}}

1. List the gaps that change scope or price (hosting ownership, support hours and time zone, whether mobile apps are included, access to production, third-party accounts). Ask the key ones; use [X] for the rest.
2. Service scope: reactive support (what counts as an incident or defect, how it is reported, which channel), proactive maintenance with a monthly or quarterly calendar (security patches, dependency and framework updates, certificates and domains, backup restore checks, uptime monitoring, OS and app store requirement updates), and small changes from an hours bank.
3. Severity and response targets: three or four levels with definitions, response and target workaround times within stated support hours, and what out-of-hours cover costs if offered. Distinguish response from resolution.
4. Hours and pricing model: options (fixed monthly retainer with included hours, pay as you go, tiered plans), how unused hours are handled (expire, limited rollover), overage rates as [X] unless given, and a simple way to estimate the monthly hours needed from the system's size and age.
5. Exclusions: new features, redesigns, third-party outages, problems caused by client changes or other suppliers, hosting costs, major version migrations beyond a stated size, and content entry; each quoted separately.
6. Reporting and reviews: a monthly report (hours used, incidents, updates applied, risks such as end-of-life dependencies) and a quarterly review.
7. Notes before signing: what belongs in the main contract (liability, data protection, termination, handover on exit) and a reminder to have it reviewed under local law.
</task>

<constraints>
- Never invent rates or prices; use the user's figures or [X].
- Do not offer response targets the stated capacity cannot meet; flag it if the client's ask exceeds it.
- Not legal advice; point contractual clauses to the main agreement and a lawyer's review.
{{> output/uncertainty}}
</constraints>

<output_format>
## Gaps to settle first
## Service scope
Reactive, proactive (with a calendar table: Activity | Frequency), small changes.
## Severity and response targets
Table: Severity | Definition | Response | Target workaround | Hours covered.
## Hours and pricing model
## Exclusions
## Reporting and reviews
## Notes before signing
</output_format>
