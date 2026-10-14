---
schema: 1
id: design-synthetic-checks
kind: prompt
title: Design synthetic monitoring checks
description: Designs synthetic checks and uptime probes for a service's key user journeys, with check types, locations, frequency, test accounts, data cleanup and alert rules that avoid single-probe false pages.
category: incident
version: 1.0.0
status: incubating
stage: [design, operate]
role: [sre, devops-engineer, qa-engineer]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [synthetic-monitoring, uptime-checks, black-box-monitoring, user-journeys, probes]
pairs_with:
  prompts: [define-slos, design-alerting-rules, design-service-dashboard, write-runbook]
  personas: [site-reliability-engineer]
args:
  - name: service_description
    description: What the service does, who uses it and from where, its main user journeys (sign in, search, checkout), public endpoints, and anything third-party in the path such as payments or a CDN.
    type: text
    required: true
  - name: current_monitoring
    description: What you already monitor and what incidents were missed or found late by customers.
    type: text
  - name: tooling
    description: The synthetic monitoring tool or platform you use or plan to use, if any. Leave empty for a tool-neutral design.
    type: string
---
<context>
You design black-box checks that act like users, so the team learns about outages that internal metrics cannot see: DNS, certificate, CDN or load balancer failures, a broken login page that returns 200, or a region unreachable from outside. Experienced teams know the traps: a check on /health that passes while the product is broken; single-location probes that page on a network blip; journey checks that create real orders, send real emails or skew analytics; test accounts whose passwords expire or that hit MFA; scripts so brittle that every UI change pages someone. Synthetic checks complement real-user and server-side signals; they do not replace them.

<service_description>
{{service_description}}
</service_description>

{{#current_monitoring}}
<current_monitoring>
{{current_monitoring}}
</current_monitoring>
{{/current_monitoring}}
{{#tooling}}Tooling: {{tooling}}{{/tooling}}
</context>

<task>
1. Pick the journeys worth checking: the few whose failure customers would notice first and that internal metrics might miss. Rank them and say why each made the list.
2. For each, choose the check type: simple endpoint check (status, latency, a content assertion on the body), multi-step API check, or scripted browser check. Prefer the cheapest type that would catch the failure.
3. Define for each check: steps, assertions beyond status code (expected text, JSON field, response time budget), frequency, locations (spread across the regions your users are in), timeout and retries.
4. Design the test data: dedicated test accounts and how they avoid MFA and expiry safely, how transactions are marked and excluded from billing, analytics and emails, and how created data is cleaned up.
5. Add checks for the edges: TLS certificate expiry with lead time, DNS resolution, redirects from HTTP and the bare domain.
6. Write alert rules: alert only when a check fails from several locations or several consecutive runs, page only for the top journeys, ticket for the rest, and link each to a runbook.
7. Give a maintenance plan: who owns the scripts, how they are updated with UI changes, and how to pause checks during planned maintenance.
</task>

<constraints>
- Do not design checks that perform real payments, send messages to real people or change real customer data. If a journey cannot be tested safely, say so and suggest a partial check.
- Do not put credentials in check scripts; say they belong in the tool's secret store.
- Keep the number of paging checks small; explain the cost of each additional page.
- Do not claim features of a named tool unless you are sure; describe the setting in general terms otherwise.
{{> output/uncertainty}}
</constraints>

<output_format>
## Journeys to cover
Ranked list with reasons.
## Checks
Table: check | type | steps and assertions | frequency | locations | timeout.
## Test data and accounts
Bullets.
## Edge checks
Bullets.
## Alert rules
Table: check | condition to alert | page or ticket | runbook.
## Upkeep
Bullets.
</output_format>
