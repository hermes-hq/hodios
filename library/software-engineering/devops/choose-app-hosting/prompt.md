---
schema: 1
id: choose-app-hosting
kind: prompt
title: Choose where to host an app
description: Recommends where to host an app (PaaS, serverless, managed containers, a VPS or Kubernetes) from its workload, traffic, team skills and budget, with cost estimates at two scales.
category: devops
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, fullstack-engineer, tech-lead, devops-engineer]
stack: []
requires: [none]
inputs: [text, spec]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [hosting, paas, serverless, managed-containers, build-vs-buy]
pairs_with:
  prompts: [deploy-app-to-paas, deploy-to-vps, estimate-cloud-costs]
args:
  - name: app
    description: What the app is (language, framework, web app, API, background workers, cron jobs, websockets, file storage, database), expected traffic now and in a year.
    type: text
    required: true
  - name: team
    description: Team size and operations experience, budget, compliance or data-location needs, and any cloud credits or existing accounts.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Options compared, Cost estimates, Risks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hosting choices are usually made by habit (we know Kubernetes) or by the latest blog post, then lived with for years. The real decision rests on a few facts: the shape of the workload (always-on web server, spiky traffic, long-running background jobs, websockets, heavy CPU or GPU), the database and where it lives, how many people will operate it and how much they want to, data-location rules, and the bill at the traffic the app will actually have. Small teams almost always do better on a PaaS or managed containers until something specific forces a change; Kubernetes pays off with many services and a team to run it. Serverless functions are cheap at low or spiky traffic but awkward for long jobs, websockets and connection-heavy databases. Egress, managed databases and per-seat pricing often dominate the bill, not compute.
</context>

<task>
Recommend where to host this app:
<app>
{{app}}
</app>
{{#team}}
Team and constraints: {{team}}
{{/team}}

1. If the workload shape, the database, the team's ops experience or the budget is unknown, ask up to five short questions and stop.
2. List the requirements that eliminate options (websockets, long jobs, GPUs, data residency, compliance needs, private networking) and apply them.
3. Compare four or five realistic options across categories: a PaaS, a managed container service, serverless, a VPS, and Kubernetes when warranted. For each: fit with the workload, ops effort per month, lock-in, scaling ceiling, and how the database, background jobs and scheduled jobs are handled.
4. Estimate monthly cost for each option at today's traffic and at ten times that, listing every assumption (instance sizes, requests, storage, egress, managed database tier). Mark figures as estimates to verify against current pricing.
5. Recommend one option and a runner-up, with the signal that would make them switch later.
6. Give the first concrete steps for the recommendation.
</task>

<constraints>
- Do not quote prices as facts; give ranges with assumptions and tell the reader to check the provider's calculator.
- Do not recommend Kubernetes to a small team without a specific reason.
- Stay neutral between vendors; name providers only as examples within a category.
- Ask about data-location or regulatory rules rather than assuming a country.
</constraints>

<output_format>
## Recommendation
The choice and runner-up in a short paragraph, with the reason tied to the workload and team.

## Options compared
A table: option, fit, ops effort, lock-in, scaling ceiling, notes.

## Cost estimates
A table: option, cost now, cost at ten times traffic, key assumptions.

## Risks
Three to five risks of the recommendation and how to reduce each.

## Next steps
The first five steps to get the app running there.
</output_format>
