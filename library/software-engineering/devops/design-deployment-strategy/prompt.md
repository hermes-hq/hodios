---
schema: 1
id: design-deployment-strategy
kind: prompt
title: Design a deployment strategy
description: Chooses and specifies a deployment strategy (rolling, blue-green, canary or feature-flagged) with health gates, automated rollback triggers and database-change ordering. Use when deploys feel risky.
category: devops
version: 1.0.0
status: experimental
stage: [design, ship]
role: [devops-engineer, sre, tech-lead, backend-engineer]
requires: [none]
inputs: [spec, config, text]
output: [plan, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [canary-release, blue-green, progressive-delivery, automated-rollback]
pairs_with:
  prompts: [add-feature-flag, plan-zero-downtime-schema-change, define-slos, write-github-actions-workflow]
  personas: [devops-engineer]
args:
  - name: system
    description: What is being deployed - services, how state is stored, traffic volume and shape, clients (web, mobile, partner APIs), and how often it ships.
    type: text
    required: true
  - name: platform
    description: Where it runs and deploys from (Kubernetes, ECS, VMs, serverless, PaaS; CI/CD tool; service mesh or load balancer).
    type: string
  - name: risk_profile
    description: What a bad deploy costs - users affected, money, compliance, contractual SLAs - and recent deploy incidents.
    type: text
  - name: current_process
    description: How deploys happen today, how long they take, how rollback works and what has gone wrong.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Rollout stages, Health gates and rollback triggers, Database and schema changes, Rollback procedure, Implementation, Migration plan, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Deploys are scary when a bad release reaches every user at once, when nobody knows it is bad until customers complain, and when rollback is a manual procedure that has never been practised. The fix is not one technique but a combination sized to the system: limiting how many users see a release before it is trusted, automated checks that compare the new version against the old, a rollback that is one action and tested, schema changes ordered so old and new code both work, and separating deploying code from releasing features. Each technique has costs: blue-green needs double capacity, a canary needs enough traffic to produce a signal, and feature flags add code paths that must be cleaned up.
</context>

<task>
Design the deployment strategy for:
{{system}}
{{#platform}}

Platform: {{platform}}
{{/platform}}
{{#risk_profile}}

Risk profile: {{risk_profile}}
{{/risk_profile}}
{{#current_process}}

Current process: {{current_process}}
{{/current_process}}

1. Choose the strategy and justify it against the system's properties: stateless or stateful, traffic volume (enough requests in a canary slice to detect a regression within minutes), long-lived connections or sessions, client versions you do not control (mobile apps, partner integrations), capacity cost, and the risk profile. Say why the alternatives are worse here. Combine techniques where it helps, for example a canary for the deploy plus feature flags for risky behaviour changes.
2. Define the rollout stages: traffic share or instance count per stage, bake time per stage, and whether each promotion is automatic or needs approval.
3. Define health gates for each stage: pre-traffic checks (readiness, smoke tests against the new version), and live comparisons of the new version against the current one on error rate, latency percentiles, saturation and one business signal (checkouts, sign-ins). Give each gate a threshold, a comparison window and a minimum sample size, as starting values.
4. Define automated rollback triggers: which gate failures roll back without a human, how fast, and what alerts and records are produced. Say which failures should page someone even after an automatic rollback.
5. Order database and schema changes with expand and contract: migrations must work with both the current and the new code; destructive steps ship in a later release after the old code is gone; backfills run separately and are throttled. State the rule for what may ship together in one deploy.
6. Specify the rollback procedure: one command or button, how long it takes, what it does not undo (migrations, messages already sent, cache entries, data written in a new format), and how often it is rehearsed.
7. Describe the implementation on the platform: which native features or tools provide traffic splitting, analysis and rollback, the pipeline stages, deploy markers on dashboards, and deploy freeze rules.
8. Plan the move from the current process in small steps, each one an improvement on its own.

If the system description lacks traffic volume, state handling or how rollback works today, and the choice depends on it, ask for it before choosing. Otherwise state assumptions.
</task>

<constraints>
- Choose the simplest strategy that meets the risk profile. A low-traffic internal tool does not need a five-stage canary.
- Every threshold is a starting value with the reason for it, to be tuned from real deploys.
- Name tools only as examples of a capability available on the platform.
- Never treat "roll back" as free: list what a rollback cannot undo.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The strategy in two or three sentences, and why the alternatives lose.

## Rollout stages
Table: stage | traffic or instances | bake time | promotion (automatic or approval).

## Health gates and rollback triggers
Table: signal | comparison | threshold | window | action on failure.

## Database and schema changes
Numbered rules, then an example sequence for a column rename across releases.

## Rollback procedure
Steps, expected duration, and what it does not undo.

## Implementation
How to build it on the platform, with a pipeline sketch as a code block in the platform's format where possible.

## Migration plan
Numbered steps from today's process to the target.

## Risks and open questions
Bullets.
</output_format>
