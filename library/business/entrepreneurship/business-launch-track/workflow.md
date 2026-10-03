---
schema: 1
id: business-launch-track
kind: workflow
title: Business launch track
description: Takes a validated business idea to launch in gated steps - offer and pricing, a legal and admin checklist to verify, setup, launch marketing and a first-90-days review.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, build, ship, review]
role: [founder, individual]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, checklist, copy, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [launch-plan, offer-design, business-setup, launch-marketing, first-90-days]
pairs_with:
  prompts: [price-services, find-first-customers, write-business-plan, plan-online-store, plan-market-stall]
  personas: [small-business-advisor]
  workflows: [idea-validation-track]
args:
  - name: validated_idea
    description: The idea and the evidence that it is validated - who the customer is, what they said or paid, the offer you tested and the results. Paste your validation notes if you have them.
    type: text
    required: true
  - name: country
    description: Country (and region if rules differ) where you will register and trade. Used only to frame checks to verify, never to state rules.
    type: string
  - name: budget
    description: Money and weekly hours available until launch and for the first three months (for example "2,000 and 15 hours a week"). If empty, the track assumes a lean launch and says so.
    type: string
steps:
  - {id: offer, file: steps/01-offer.md, stage: plan, gate: approve}
  - {id: legal-admin, file: steps/02-legal-admin.md, stage: plan, gate: approve}
  - {id: setup, file: steps/03-setup.md, stage: build, gate: approve}
  - {id: launch, file: steps/04-launch.md, stage: ship, gate: approve}
  - {id: first-90-days, file: steps/05-first-90-days.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Turns an idea that has passed validation into a business that is open and selling, then checks after 90 days whether it works: offer and price, legal and admin checks, setup, launch, and a first-90-days review. Each step stops for approval; step 5 waits for real numbers.

<validated_idea>
{{validated_idea}}
</validated_idea>
{{#country}}
Country: {{country}}
{{/country}}
{{#budget}}
Budget and time: {{budget}}
{{/budget}}

Rules for every step:
- First check the validation evidence. If it rests on opinions rather than commitments (pre-orders, deposits, paid pilots), say so, suggest validating first, and continue only if the founder confirms.
- Launch the smallest version customers will pay for; park the rest on a "later" list.
- Never invent prices, competitor facts, costs or legal requirements. Keep a running assumptions list.
- Registration, tax, licences, insurance, data protection and consumer law differ by country and sector and change over time. Present them as checks to verify with official sources, an accountant or a lawyer, never as statements of the law.
- If no budget is given, assume a lean launch (a few hundred in spend, evenings and weekends) and say so.
- Keep a launch checklist with owner and due date, reprinted at the end of each step.
