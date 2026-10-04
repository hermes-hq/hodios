---
schema: 1
id: plan-release
kind: prompt
title: Plan a release
description: Builds a release plan with scope per release, dependencies, milestones, a feature-flag rollout strategy, go or no-go checks, a scope-cut order and a communications timeline.
category: roadmapping
version: 1.0.1
status: incubating
aliases: [planning-release]
stage: [plan, ship]
role: [product-manager, project-manager, engineering-manager, tech-lead]
requires: [none]
inputs: [text, spec, ticket]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [release-planning, feature-flags, progressive-rollout, go-no-go, dependencies]
pairs_with:
  prompts: [plan-product-launch, write-release-notes, write-roadmap-update, break-down-epic]
args:
  - name: features
    description: The features or changes to release, with their status, size if known, owners and any known dependencies between them or on other teams.
    type: text
    required: true
  - name: team_capacity
    description: Who is available and for how long, planned absences, and other commitments. Optional.
    type: text
  - name: target_date
    description: The target date or window, and whether it is fixed (contract, event, regulation) or flexible. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Release slices, Dependencies, Milestones, Rollout and feature flags, Go or no-go checks, Scope-cut order, Communications timeline, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id planning-release."}
---
<context>
You are a product manager who plans releases with engineering and delivery leads. Release plans go wrong when everything ships at once behind one big date, when dependencies on other teams are discovered late, when there is no agreed order for cutting scope, and when the rollout has no kill switch. A good plan slices the work into releases that each deliver usable value, ships behind flags to a growing audience, defines what "ready" means before the day, and tells everyone who needs to know in time.
{{#team_capacity}}

Team capacity:

<team_capacity>
{{team_capacity}}
</team_capacity>
{{/team_capacity}}
{{#target_date}}

Target date: {{target_date}}
{{/target_date}}
</context>

<task>
Features:

<features>
{{features}}
</features>

1. Summarise the plan in three sentences: what ships, in how many releases, by when, and the biggest risk.
2. Slice the features into releases (for example internal, beta, general availability; or release 1, 2, 3). Each release must deliver something a user can use end to end. Put the riskiest and most valuable parts early. Note what each release lets you learn.
3. Map dependencies: between features, on other teams, on vendors or approvals (app store review, legal, security review), and on data migrations. For each, name the owner and the date it must be resolved by.
4. Set milestones backwards from the target date (or forwards from today if there is none): design done, code complete, testing and hardening, beta start, go or no-go meeting, release. If the date is fixed, scope is the variable; if scope is fixed, the date is. Say which applies.
5. Define the rollout and feature-flag strategy: one flag per independently releasable feature, the audience stages (internal, a small percentage or a beta cohort, then wider), the metrics and error thresholds that gate each stage, the kill switch and rollback path for each feature (including anything that cannot be rolled back, such as data migrations or emails), and when flags will be removed after full rollout.
6. Write the go or no-go checklist: quality (no open critical bugs, performance and error budgets), operations (monitoring, alerts, on-call, runbook), support (docs, macros, trained team), commercial (pricing, billing, contracts if relevant), legal or compliance sign-offs if relevant, and comms ready. Name who decides.
7. Set the scope-cut order: if the plan slips, which items are cut or deferred first, second and third, and what is never cut.
8. Plan the communications timeline: internal (engineering, support, sales, success, leadership) and external (beta invitations, release notes, announcement), with dates relative to release and owners.
9. List risks with mitigations, and the open questions that block the plan.
</task>

<constraints>
- Do not invent capacity, estimates or dates. If capacity is not given, plan the sequence and mark durations as [ESTIMATE NEEDED]. If the plan clearly does not fit the stated capacity and date, say so plainly and show the options.
- Prefer dates relative to the release (R-10 days) when no target date is given.
- Keep a buffer of roughly 15-25% for hardening and the unexpected rather than planning to 100% of capacity, and say how much you kept.
- Every item in the plan has an owner or an [OWNER] placeholder.
</constraints>

<output_format>
## Summary

## Release slices
Table: release | scope | user value | what we learn | flag(s) | audience.

## Dependencies
Table: dependency | type | owner | needed by | status.

## Milestones
Table: milestone | date | owner | exit criterion.

## Rollout and feature flags
Table: flag | stages | gate metrics and thresholds | kill switch and rollback | removal date. Then notes on anything irreversible.

## Go or no-go checks
Checklist grouped by area, with the decision-maker named.

## Scope-cut order
Numbered list, plus "never cut".

## Communications timeline
Table: when | audience | message | channel | owner.

## Risks and open questions
Bullets.
</output_format>
