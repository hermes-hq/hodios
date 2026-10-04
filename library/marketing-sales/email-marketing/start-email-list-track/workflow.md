---
schema: 1
id: start-email-list-track
kind: workflow
title: Start an email list
description: Takes a small business with no email marketing to a working programme in gated steps - consent and list sources, platform setup, welcome email, first month of campaigns and a 30-day review.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build, ship, review]
role: [founder, individual, marketer]
subject: [retail, hospitality]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, copy, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-email-list, welcome-email, list-building, email-platform-setup, thirty-day-review]
pairs_with:
  prompts: [grow-email-list-in-store, write-re-permission-campaign, map-email-automation-flows, analyze-email-campaign-report]
  rules: [email-consent-rules]
args:
  - name: business
    description: What the business is and sells, where it trades (shop, online, on site, market), the country, typical customers and how often they buy, and what you want email to do (repeat visits, bookings, launches).
    type: text
    required: true
  - name: existing_contacts
    description: Any contacts you already have - customer spreadsheet, booking system, card reader receipts, enquiry inbox, social followers - and how each was collected. Optional.
    type: text
  - name: hours_per_week
    description: Hours per week you can realistically spend on email.
    type: number
    default: 2
steps:
  - {id: consent, file: steps/01-consent-and-sources.md, stage: plan, gate: approve, artifact: "email-list/01-consent-and-sources.md"}
  - {id: setup, file: steps/02-platform-setup.md, stage: build, gate: approve, artifact: "email-list/02-platform-setup.md"}
  - {id: welcome, file: steps/03-welcome-email.md, stage: build, gate: approve, artifact: "email-list/03-welcome-email.md"}
  - {id: first-month, file: steps/04-first-month.md, stage: ship, gate: approve, artifact: "email-list/04-first-month.md"}
  - {id: review, file: steps/05-thirty-day-review.md, stage: review, gate: none, artifact: "email-list/05-thirty-day-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a shop, trade, restaurant or freelancer from no email marketing to a small programme they can keep up: lawful list sources, a set-up platform, a welcome email, four weeks of sends sized to their time, and a review of real results. Each step writes one artifact and stops for approval.

<business>
{{business}}
</business>

{{#existing_contacts}}<existing_contacts>
{{existing_contacts}}
</existing_contacts>{{/existing_contacts}}

Time available: {{hours_per_week}} hours per week.

Rules for every step:
{{> guardrails/professional-limits}}
- Use only facts the owner gave; ask for missing essentials and mark gaps as [NEEDED: ...]. Never invent results, prices, offers or reviews.
- Never suggest bought, scraped or borrowed lists, or adding people to marketing because they once received a receipt or quote, unless the owner's country clearly allows it and they confirm it.
- Fit everything to the hours available: if the plan needs more time than that, cut scope, never quality.
- Judge results by clicks, bookings, orders and unsubscribes, not opens.
- If the owner asks to skip approvals, confirm once, then run the remaining steps up to the first month; the review always waits for real data.
