---
schema: 1
id: service-go-live-track
kind: workflow
title: Take a new service live
description: Takes a new or changed service to go-live in gated steps - readiness across people, process, systems and premises, staff training, a soft launch, a go or no-go review and a first-month review.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, build, verify, ship, review]
role: [operations-manager, manager, product-manager, project-manager]
subject: [hospitality, healthcare, public-sector]
requires: [none]
inputs: [text, notes]
output: [checklist, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-readiness, soft-launch, go-no-go, staff-training, backstage-processes, first-month-review]
pairs_with:
  prompts: [brief-frontline-staff-on-release, plan-branch-by-branch-rollout, plan-launch-retrospective]
  workflows: [product-launch-track]
args:
  - name: service_and_launch_date
    description: The new or changed service (a clinic service, council service, hotel offering, delivery option), who it is for, how it will work, and the planned launch date.
    type: text
    required: true
  - name: teams_involved
    description: The teams and roles that deliver or support it (front desk, clinicians, kitchen, drivers, call centre, IT, finance), with numbers and shifts, and who owns the service.
    type: text
    required: true
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: plan, gate: approve, artifact: "go-live/01-readiness.md"}
  - {id: training, file: steps/02-training.md, stage: build, gate: approve, artifact: "go-live/02-training.md"}
  - {id: soft-launch, file: steps/03-soft-launch.md, stage: verify, gate: approve, artifact: "go-live/03-soft-launch.md"}
  - {id: go-no-go, file: steps/04-go-no-go.md, stage: ship, gate: approve, artifact: "go-live/04-go-no-go.md"}
  - {id: first-month, file: steps/05-first-month.md, stage: review, gate: none, artifact: "go-live/05-first-month-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a service to go-live the way an experienced service operations lead would. Services are delivered by people, through processes the customer never sees: bookings, handovers, payments, stock, records, complaints. Most service launches fail backstage, not at the front desk. This track checks readiness across people, process, systems and premises, trains staff on real scenarios, runs a soft launch with limited customers, decides go or no-go on evidence, and reviews the first month. Each step writes one artifact and stops for approval.

<service_and_launch_date>
{{service_and_launch_date}}
</service_and_launch_date>

<teams_involved>
{{teams_involved}}
</teams_involved>

Rules for every step:
- Use only facts the service owner gave or confirmed. Missing owners, numbers and dates become [X] and a question.
- Treat safety, safeguarding, clinical, food hygiene, data protection and accessibility checks as must-pass items, and say which specialist confirms each; never state the rule itself as fact.
- The service owner makes the go or no-go decision; present evidence and a recommendation.
- Keep staff readiness and backstage processes as launch-critical as anything customers see.
- End each artifact with open questions.
