---
schema: 1
id: plan-redesign-rollout
kind: prompt
title: Plan a redesign rollout to existing users
description: Plans rolling out a redesign of a familiar interface to existing users, with an opt-in preview, a switch-back period, feedback capture, change communications and a firm cut-over date.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, designer, marketer]
requires: [none]
inputs: [text, spec]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [redesign, change-management, opt-in-preview, switch-back, cut-over]
pairs_with:
  prompts: [plan-staged-feature-rollout, write-in-app-announcement, write-admin-change-notice, plan-visual-refresh-rollout]
args:
  - name: redesign
    description: What changes (navigation, layout, workflows, visual style), why, who uses the current version and how heavily, and anything removed or moved.
    type: text
    required: true
  - name: users
    description: User base size and types (power users, occasional users, admins, customers on contracts), and any accessibility or training needs. Optional.
    type: text
  - name: deadline
    description: When the old version must be switched off, and why (cost, tech debt). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rollout approach, Phases, Feedback and decision rules, Communications, Draft messages, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product lead who has shipped redesigns of interfaces people use every day. Users have muscle memory: even a better design costs them time in the first weeks, so early feedback is negative almost regardless of quality, and the loudest feedback comes from power users. Separating "I have to relearn this" from "this is worse" is the core skill. Rollouts that work give people a preview they choose, a period to switch back with a reason asked, a clear end date, help for what moved, and fixes for real problems before the old version goes. Rollouts that fail flip everyone at once, hide where things moved, or leave the switch-back open forever so two versions must be maintained.

Redesign: {{redesign}}
{{#users}}Users: {{users}}{{/users}}
{{#deadline}}Old version deadline: {{deadline}}{{/deadline}}
</context>

<task>
1. Choose the rollout approach and explain it: opt-in preview, then default-on with switch-back, then cut-over. Say when to shorten it (small change, few users) or lengthen it (contracted business users, training needs, accessibility impact).
2. Define phases with dates relative to start (or calendar dates if a deadline is given): internal use, opt-in preview, default for new users, default for everyone with switch-back, switch-back removed, old version deleted. For each: who, how users enter or leave it, and the entry criteria for the next phase.
3. Feedback and decision rules: a short prompt when users switch back asking why (fixed choices plus free text), in-product feedback, tracking of task completion and time on key tasks for both versions, and how to read early negative sentiment against behaviour data. Define what blocks moving to the next phase (for example a key task slower after the learning period, an accessibility regression, or a removed capability many users need).
4. Communications: preview invitation, "what moved where" guide, notice before default-on, notice before switch-back ends, admin notice for business accounts, and help content and support macros.
5. Draft the in-product preview invitation and the switch-back-ending notice.
6. List risks: power users, assistive technology users, customers with training materials or screenshots in their own docs, integrations that depend on layout, and cost of running two versions.
</task>

<constraints>
- Always include an end date for switch-back; flag plans that keep two versions indefinitely.
- Do not dismiss negative feedback as resistance to change; require behaviour data to tell learning cost from real regressions.
- Accessibility regressions block cut-over.
- Do not invent user counts or metrics; use placeholders.
</constraints>

<output_format>
## Rollout approach
Two or three sentences.

## Phases
Table: phase | when | who | how to enter or leave | criteria to move on.

## Feedback and decision rules
Bullets, including blocking conditions.

## Communications
Table: when | audience | channel | message.

## Draft messages
The preview invitation and the switch-back-ending notice.

## Risks
Bullets with mitigations.
</output_format>
