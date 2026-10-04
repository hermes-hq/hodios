---
schema: 1
id: land-first-clients-track
kind: workflow
title: Land your first clients
description: Gets a new freelancer or consultant to first paying clients in gated steps - offer and targets, warm network outreach, cold outreach to a short list, discovery and proposal, then a two-week review.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build, operate, review]
role: [consultant, designer, writer]
requires: [none]
inputs: [text, notes]
output: [plan, message, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [freelancing, first-clients, warm-outreach, offer-design, discovery-call, weekly-review]
pairs_with:
  prompts: [screen-freelance-inquiry, write-cold-outreach, write-sales-proposal, ask-clients-for-referrals]
  personas: [small-business-selling-mentor]
args:
  - name: skills_and_offer
    description: What you can do, past work or results you can show (including from employment), who you would like to work with, and any offer or prices you have in mind. Rough notes are fine.
    type: text
    required: true
  - name: network
    description: People you already know who might hire or refer you - former colleagues and managers, past clients, friends in relevant businesses, communities you belong to. Roles are enough; no contact details needed.
    type: text
  - name: hours_per_week
    description: Hours a week you can spend on finding clients. Plans are sized to fit.
    type: number
    default: 10
steps:
  - {id: offer, file: steps/01-offer-and-targets.md, stage: plan, gate: approve, artifact: "first-clients/01-offer.md"}
  - {id: warm, file: steps/02-warm-outreach.md, stage: build, gate: approve, artifact: "first-clients/02-warm-outreach.md"}
  - {id: cold, file: steps/03-cold-outreach.md, stage: build, gate: approve, artifact: "first-clients/03-cold-outreach.md"}
  - {id: proposal, file: steps/04-discovery-and-proposal.md, stage: operate, gate: approve, artifact: "first-clients/04-proposal.md"}
  - {id: review, file: steps/05-two-week-review.md, stage: review, gate: none, artifact: "first-clients/05-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Gets a new freelancer or independent consultant from "I'm available" to paying work. Most first clients come from people who already know and trust you, so the track starts with a sharp offer and the warm network, adds a short, well-researched cold list, turns conversations into proposals, and reviews what worked after two weeks. Each step writes one artifact and stops for approval.

<skills_and_offer>
{{skills_and_offer}}
</skills_and_offer>

{{#network}}<network>
{{network}}
</network>{{/network}}

Hours a week: {{hours_per_week}}

Rules for every step:
- Use only facts the freelancer gave. Never invent results, clients, testimonials, names or contact details; mark gaps as [X].
- Size every plan to the hours available, with a weekly count of messages and conversations.
- Outreach is honest and personal: no fake familiarity, no mass messages, respect a no and anti-spam and data protection rules where the recipient is.
- Steps 4 and 5 depend on real conversations and replies: ask for them before writing.
- Pricing and contracts: give ranges from the freelancer's own figures; suggest checking contract terms, tax registration and insurance with an accountant or local business advice service.
