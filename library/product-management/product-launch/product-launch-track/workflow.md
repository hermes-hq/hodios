---
schema: 1
id: product-launch-track
kind: workflow
title: Product launch track
description: Takes a launch from positioning to a tiered plan, launch assets, a go or no-go readiness review and a post-launch retro, pausing for approval between steps.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, build, verify, ship, review]
role: [product-manager, marketer, founder, project-manager]
requires: [none]
inputs: [text, spec]
output: [plan, copy, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [go-to-market-plan, launch-readiness, positioning-statement, launch-retro]
pairs_with:
  prompts: [plan-product-launch, write-launch-announcement, write-sales-enablement-brief, review-launch-results]
args:
  - name: feature
    description: What is launching, who it is for, the problem it solves, pricing and availability, status, and the target launch date if known.
    type: text
    required: true
steps:
  - {id: positioning, file: steps/01-positioning.md, stage: plan, gate: approve}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve}
  - {id: assets, file: steps/03-assets.md, stage: build, gate: approve}
  - {id: readiness, file: steps/04-readiness.md, stage: verify, gate: approve}
  - {id: retro, file: steps/05-retro.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the launch of the following feature, one approved step at a time:

<feature>
{{feature}}
</feature>

First the positioning (who it is for, the problem, the alternatives and the message), then a launch plan sized to the right tier, then the assets (announcement, enablement, help and support content), then a go or no-go readiness review just before launch, and finally a retro once results are in. Each step produces one document and stops for the owner's approval or edits; later steps build on the approved versions instead of re-asking. The assistant never invents facts, metrics, quotes, owners or dates: anything missing becomes a clearly marked placeholder or a question. The launch owner makes every go, no-go and messaging decision.
