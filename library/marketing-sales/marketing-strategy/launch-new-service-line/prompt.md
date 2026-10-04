---
schema: 1
id: launch-new-service-line
kind: prompt
title: Launch a new service line
description: Plans how an existing business introduces a new service to current customers first - who to tell, an early-adopter offer, staff scripts, materials and first-month targets. Use once you have decided.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, marketer, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [service-launch, existing-customers, early-adopters, cross-sell, staff-scripts]
pairs_with:
  prompts: [evaluate-new-service-line, write-service-packages-page, plan-promotional-offer, ask-clients-for-referrals]
args:
  - name: business_and_new_service
    description: What the business does now, the new service, its price, who can deliver it and how many jobs or appointments a month you can take, and any training, accreditation or insurance in place for it.
    type: text
    required: true
  - name: customer_base
    description: Who your current customers are, how many, what records you hold (service history, last visit, equipment age) and how you can contact them with consent. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Readiness check, Who to tell first, Early-adopter offer, Messages and staff scripts, Materials, First-month targets, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help established small businesses launch a new service to the customers who already trust them: a plumber adding heat pumps, a salon adding treatments, a clinic adding a new therapy, an agency adding a retainer. Existing customers are the cheapest and fastest first buyers, but launches go wrong when the business announces to everyone at once and cannot deliver, markets before the qualifications or insurance are in place, gives early buyers a discount that becomes the expected price, or never asks the staff who talk to customers every day to mention it. A good launch starts with the customers who most need the new service, offers a few early adopters a fair deal in return for feedback, photos and reviews, and sets small first-month targets.
</context>

<task>
<business_and_new_service>
{{business_and_new_service}}
</business_and_new_service>

{{#customer_base}}<customer_base>
{{customer_base}}
</customer_base>{{/customer_base}}

1. If the new service, its price or who delivers it is unclear, ask and stop.
2. Readiness check: training, accreditation, licences, insurance, suppliers, booking and pricing, and delivery capacity. Anything not confirmed in the input is a question; recommend not marketing a service that needs an accreditation until it is held.
3. Who to tell first: segment current customers by how likely they are to need it now (for example boilers over 12 years old, clients who asked about it, regulars who buy the related service). Rank three segments and estimate size from the input only.
4. Early-adopter offer: a limited number of places (sized to capacity) with a fair benefit (priority booking, an included extra, a modest introductory price with a clear end date) in exchange for feedback and permission to use photos or reviews. Avoid deep discounts that anchor the price.
5. Messages and staff scripts: a personal message to the first segment, a general announcement for later, and a staff script of under 60 words for mentioning it naturally during existing jobs or appointments, plus answers to the three most likely questions.
6. Materials: what to update or create (services page, price list, booking options, map listing services, a leaflet left after jobs, a before-and-after or case study once the first jobs are done).
7. First-month targets: conversations, quotes or consultations, bookings, and feedback collected, sized to capacity; and the decision at day 30 (widen, adjust or pause).
</task>

<constraints>
- Use only supplied facts; no invented demand, prices or customer counts. Mark gaps as [X].
- Do not claim qualifications, accreditations, grants or approvals not stated. Where government schemes or grants may apply (energy upgrades, health services), tell the owner to check eligibility and current rules rather than stating them.
- Contact existing customers only through channels they consented to; flag local marketing consent rules.
- Health, beauty and wellbeing services: no medical claims; the owner checks what can be claimed locally.
</constraints>

<output_format>
## Readiness check
Checklist with confirmed and to-confirm items.

## Who to tell first
Table: Segment | Why now | Size | Channel.

## Early-adopter offer
The offer, number of places, end date, and what you ask in return.

## Messages and staff scripts
Personal message, announcement, staff script, and three Q&As.

## Materials
Checklist.

## First-month targets
Table: Measure | Target | Notes. Then the day-30 decision rule.

## Risks and questions
Bullets.
</output_format>
