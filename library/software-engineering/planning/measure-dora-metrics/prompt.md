---
schema: 1
id: measure-dora-metrics
kind: prompt
title: Measure DORA delivery metrics
description: Defines how to measure deployment frequency, lead time for changes, change failure rate and recovery time from your own tools, with data sources, caveats and gaming risks.
category: planning
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [engineering-manager, devops-engineer, sre, tech-lead]
stack: []
requires: [none]
inputs: [notes, config, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dora, delivery-performance, deployment-frequency, lead-time, change-failure-rate, engineering-metrics]
pairs_with:
  prompts: [assess-technical-debt, plan-team-capacity]
args:
  - name: toolchain
    description: Where code, deploys and incidents live, for example GitHub, GitLab, Jenkins, Argo CD, PagerDuty, Jira, and how services and teams map to repositories.
    type: text
    required: true
  - name: goal
    description: Why you want the metrics, for example to find bottlenecks, to report to leadership, to track a platform investment.
    type: text
output_contract:
  format: markdown
  sections: [Definitions for your setup, Data sources and queries, Caveats, How to use them, How they get gamed, First steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The four DORA metrics (deployment frequency, lead time for changes, change failure rate, time to restore service) are useful as a team's own trend lines and misleading as targets or cross-team rankings. Most of the work is in definitions: what counts as a deployment (to production, per service), where lead time starts (first commit or merge) and ends (running in production), what counts as a failed change (a rollback, hotfix or incident caused by a change, which requires linking incidents to deploys), and when an outage starts and ends. Teams with monorepos, batched releases, mobile apps or feature flags need adapted definitions. Percentiles beat averages because the distributions are skewed. Newer versions of the research add reliability and a rework rate; mention them without depending on them.
</context>

<task>
Toolchain: {{toolchain}}
{{#goal}}Goal: {{goal}}{{/goal}}

1. Definitions for your setup: for each metric, the exact start and end events, the unit (per service, per team), the aggregation (median and 85th percentile, weekly or monthly), and adaptations for the release models present (mobile app store releases, feature flags, batched releases, monorepo).
2. Data sources and queries: for each metric, which system holds each event and how to join them (deploy events to commits, incidents to the deploy that caused them). Describe the extraction in terms of each tool's API or export and say where the user should check field names; give a sample SQL over a simple events table (deploys, commits, incidents) that computes the four metrics.
3. Caveats: data gaps (manual deploys, incidents not linked to changes), small sample sizes for low-volume services, and how to report with uncertainty.
4. How to use them: as trends for the team's own improvement, paired with qualitative input (developer surveys, retros), and the questions each metric prompts (for example long lead time: where does the time go, review wait or deploy queue?).
5. How they get gamed: splitting deploys, not declaring incidents, closing incidents early, and how to guard against it (do not tie them to individual performance or bonuses).
6. First steps: the smallest version to start next week, often deployment frequency and lead time from the CI/CD system alone.
</task>

<constraints>
- Do not invent API endpoints or field names; describe what to look for and say to confirm in the tool's docs.
- Do not quote benchmark thresholds as targets for this team; if you mention published performance bands, say they come from survey research and change between reports.
- Never recommend using these metrics to rate individual engineers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Definitions for your setup
Table: Metric | Starts | Ends | Unit | Aggregation | Adaptations.
## Data sources and queries
Per metric, then the sample SQL.
## Caveats
## How to use them
## How they get gamed
## First steps
</output_format>
