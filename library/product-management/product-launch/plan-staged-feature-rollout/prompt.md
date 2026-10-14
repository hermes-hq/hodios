---
schema: 1
id: plan-staged-feature-rollout
kind: prompt
title: Plan a staged feature rollout
description: Plans exposing a feature to users in stages - internal, early cohorts, percentages, everyone - with entry and exit rules, guardrail metrics, soak times and comms for each stage.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, engineering-manager, tech-lead]
subject: [saas]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [staged-rollout, feature-flags, guardrail-metrics, cohort-selection, halt-criteria]
pairs_with:
  prompts: [design-deployment-strategy, add-feature-flag, define-feature-success-metrics, plan-product-launch]
args:
  - name: feature
    description: The feature, who it is for, what could go wrong for users (data, money, workflow disruption), and whether it can be turned off cleanly once users have used it.
    type: text
    required: true
  - name: user_base
    description: Rough user counts, segments (plans, regions, platforms, account sizes) and daily traffic, so the stages can be sized. Optional.
    type: text
  - name: constraints
    description: Fixed dates, contractual or enterprise customers who need notice, and whether a public announcement is planned. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rollout summary, Stages, Guardrail metrics, Halt and rollback, Communications by stage, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product manager planning how a feature reaches users, working alongside the engineers who own the deployment mechanics. A staged rollout limits the blast radius and buys learning, but only if each stage has a reason, a size that can actually show a problem, an exit rule decided in advance and someone watching. Common mistakes: jumping from 5% to 100% because nothing broke in an hour; picking cohorts that hide problems (only internal staff, only small accounts); not knowing whether turning the feature off strands users' data or work; ignoring that users talk, so a 10% cohort becomes a public announcement anyway; and forgetting that enterprise customers may need notice before any change reaches them. Some changes cannot be rolled back cleanly once used (data migrations, emails sent, prices shown); those need smaller early stages and an explicit decision about what "off" means.
{{#user_base}}

User base:

<user_base>
{{user_base}}
</user_base>
{{/user_base}}
{{#constraints}}

Constraints:

<constraints_input>
{{constraints}}
</constraints_input>
{{/constraints}}
</context>

<task>
Feature:

<feature>
{{feature}}
</feature>

1. Summarise the rollout goal (safety, learning, capacity, or all three) and state whether turning the feature off after use is clean, lossy or impossible; if lossy or impossible, say what users would lose and plan around it.
2. Design 4-6 stages, for example internal, opted-in or friendly customers, a small percentage, a larger percentage, everyone. For each: who is in it and why that cohort exposes the risk, size, minimum soak time (long enough to cover a full weekly cycle where usage is weekly), entry rule and exit rule.
3. Choose guardrail metrics that must not get worse (errors, latency, crash rate, support contacts, key task completion, cancellations) and the success signal per stage. Give thresholds relative to the control group or baseline; write [baseline needed] where it is missing.
4. Write halt and rollback rules: what triggers a pause versus a full rollback, who decides, and what happens to users who already have the feature.
5. Plan communications per stage: in-product notices for exposed users, support and sales briefings before each stage, enterprise notice where required, and when the public announcement happens relative to 100%.
6. List open questions that must be answered before stage one.
</task>

<constraints>
- Do not prescribe a percentage ladder without a reason for each step; tie sizes to the traffic needed to see the guardrail move.
- Never invent baselines, user counts or thresholds; use placeholders.
- Flag cohorts that would bias results (staff only, single region, free users only) and say how to offset them.
- Stay at the product level; point to the engineering deployment strategy for mechanics rather than designing infrastructure.
</constraints>

<output_format>
## Rollout summary
Three to five sentences, including reversibility.

## Stages
Table: stage | cohort and why | size | min soak | entry rule | exit rule.

## Guardrail metrics
Table: metric | threshold vs baseline | owner | action if crossed.

## Halt and rollback
Bullets: pause triggers, rollback triggers, decider, effect on already-exposed users.

## Communications by stage
Table: stage | audience | message or briefing | timing.

## Open questions
Numbered.
</output_format>
