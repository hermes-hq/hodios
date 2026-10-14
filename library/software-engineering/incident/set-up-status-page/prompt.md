---
schema: 1
id: set-up-status-page
kind: prompt
title: Set up a public status page
description: Sets up a public status page with components that match how users see the product, status definitions, incident templates, update cadence, ownership and monitoring links.
category: incident
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sre, engineering-manager, support-agent]
stack: []
requires: [none]
inputs: [text]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [status-page, customer-communication, uptime, incident-comms, transparency]
pairs_with:
  prompts: [write-incident-update, write-incident-response-plan, design-synthetic-checks, plan-maintenance-window]
  personas: [incident-commander]
args:
  - name: product
    description: What the product is, who uses it (consumers, businesses, developers via API), its main features and regions, and how customers currently learn about outages.
    type: text
    required: true
  - name: setup
    description: Optional details - the status page tool if chosen, monitoring and synthetic checks in place, team size and on-call, contractual SLAs, and who approves customer communication.
    type: text
output_contract:
  format: markdown
  sections: [Components, Status definitions, Ownership and rules, Templates, Automation, Launch checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a team set up a status page that customers trust. Status pages fail in predictable ways. Components mirror internal architecture ("orders-service", "Kafka") instead of what customers recognise ("Checkout", "Mobile app login", "API"), so nobody can tell if their problem is listed. Status stays green during an obvious outage because updating it needed a manager's approval, which destroys trust faster than the outage. Fully automatic status changes from monitoring flap and post false outages, so most teams automate detection and alerts but keep a human posting the public status, with a short time target (for example 10 to 15 minutes after an incident is declared). Status levels need definitions so the choice between "degraded performance" and "partial outage" is not argued during the incident. Updates follow a cadence even with no news ("still investigating, next update in 30 minutes"). The page itself must be hosted separately from the product so it survives the outage it reports, and subscribers (email, RSS, webhook) reduce support load.
</context>

<task>
<product>
{{product}}
</product>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. Components: a list grouped as customers see the product (features, platforms, API, regions), 5 to 15 items, each with a one-line description in customer words and the internal services or checks behind it (for the team's reference, not shown publicly).
2. Status definitions: operational, degraded performance, partial outage, major outage, maintenance, each with a concrete criterion for this product.
3. Ownership and rules: who may post (the incident commander or a communications role), the time target for the first post after declaring an incident, update cadence per severity, no approval chain for the first post, and when to post for partial or single-region issues.
4. Templates: investigating, identified, monitoring, resolved, and scheduled maintenance, with placeholders, written in plain customer language without internal names or blame.
5. Automation: which monitoring signals should alert the team to update the page, what may be automated (scheduled maintenance, uptime display), subscriber notifications, and keeping the page hosted independently of production.
6. Launch checklist: steps to go live, including a test incident on a private page, linking the page from the help centre and app, and support team briefing.
</task>

<constraints>
- Use customer language in all public text; no internal service names, hostnames or vendor names unless the user wants them.
- Do not promise uptime numbers or SLA credits on the page; that belongs to the contract.
- Do not recommend a specific vendor as required; if the user has not chosen a tool, list the capabilities to look for.
- Keep templates honest: no "a small number of users" unless that is known.
{{> output/uncertainty}}
</constraints>

<output_format>
## Components
Table: Public component | Description | Internal mapping.

## Status definitions
Status | Criterion for this product.

## Ownership and rules
Bullets.

## Templates
One block per template.

## Automation
Bullets.

## Launch checklist
Checklist.
</output_format>
