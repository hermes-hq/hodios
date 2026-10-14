---
schema: 1
id: set-up-cloud-cost-allocation
kind: prompt
title: Set up cloud cost allocation and alerts
description: Sets up a tagging or labelling policy, cost allocation reports, per-team budgets and anomaly alerts so cloud spend can be attributed to teams, services and environments.
category: devops
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [devops-engineer, engineering-manager, sre]
stack: [aws, gcp, azure]
requires: [none]
inputs: [spec, dataset]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [finops, tagging-policy, budgets, cost-anomaly-alerts, showback]
pairs_with:
  prompts: [reduce-cloud-spend, design-cloud-account-structure, write-policy-as-code]
args:
  - name: organisation
    description: Teams and services, how accounts, projects or subscriptions are laid out today, current tagging (if any), and who looks at the bill.
    type: text
    required: true
  - name: cloud
    description: Provider or providers.
    type: string
    default: aws
  - name: goals
    description: What the owner wants, e.g. "monthly showback per team", "alert when any service jumps 30%", "chargeback to cost centres".
    type: text
output_contract:
  format: markdown
  sections: [Allocation model, Tag policy, Enforcement, Reports, Budgets and alerts, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most organisations cannot say what a team or product costs, so cost reviews turn into arguments. Allocation works from the top down: the cheapest and most reliable split is structural (one account, project or subscription per team or environment), and tags or labels refine within it. Tags only count for billing after they are activated as cost allocation tags (AWS) or exported with billing data (GCP labels, Azure tags), and a tag only shows up for usage that happened while it was on the resource (AWS can backfill the activation of tags that already existed, but adding a tag today does not relabel last year), so start early. Some spend can never be tagged (support plans, data transfer, shared clusters, NAT gateways, marketplace fees); it needs an explicit shared-cost rule (proportional, fixed split or a platform line item) or it becomes an unexplained remainder. Kubernetes spend needs in-cluster allocation by namespace or label (for example OpenCost or the provider's split-cost feature). Budgets alert on forecasts and thresholds; anomaly detection catches a sudden spike from one service that a monthly budget would miss for weeks.
</context>

<task>
Set up cost allocation on {{cloud}} for:
{{organisation}}
{{#goals}}
Goals: {{goals}}
{{/goals}}

1. Allocation model: what is split structurally (accounts, projects, subscriptions), what by tags, and the rule for shared and untaggable costs. Say whether this is showback or chargeback and who owns the numbers.
2. Tag policy: a small required set (for example `team`, `service`, `env`, `cost-center`), exact key spelling and case, allowed values or their source of truth, and which resource types are exempt. Fewer reliable tags beat many optional ones.
3. Enforcement: default tags in IaC (provider-level default tags or labels), a policy that rejects untagged resources (organisation tag policies, Azure Policy, organisation policy constraints, or policy as code in CI), and a weekly report of untagged spend with owners.
4. Reports: activate the cost allocation tags or billing export, the views or dashboards to build (by team, service, environment, trend), and the Kubernetes allocation approach if clusters are shared.
5. Budgets and alerts: one budget per team or account with forecast and actual thresholds, anomaly detection monitors per service or account, and who receives each alert and what they are expected to do.
6. Rollout: order of steps with the first useful report date, noting that tags are not retroactive.
</task>

<constraints>
- Use only provider features that exist; if unsure of a feature name or availability, say so.
- Do not invent prices, savings or percentages; the goal is visibility, not estimates.
- Keep the tag set small and say why each tag exists.
{{> output/uncertainty}}
</constraints>

<output_format>
## Allocation model
A short paragraph plus the shared-cost rule.
## Tag policy
Table: key | allowed values or source | required on | example.
## Enforcement
Bullets with config snippets in fenced blocks where useful.
## Reports
Bullets: views to build and where.
## Budgets and alerts
Table: scope | threshold or monitor | recipient | expected action.
## Rollout
Numbered steps.
</output_format>
