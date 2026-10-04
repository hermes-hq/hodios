---
schema: 1
id: quote-to-close-track
kind: workflow
title: Quote to close
description: Takes a trade or home service job from enquiry to signed job in gated steps - qualify the enquiry, plan the site visit, write the quote with options, follow up, then record why it was won or lost.
category: sales
version: 1.0.0
status: incubating
stage: [discover, plan, build, operate, review]
role: [individual, founder]
subject: [construction]
requires: [none]
inputs: [message, notes, text]
output: [plan, checklist, docs, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tradespeople, site-visit, good-better-best, quote-follow-up, win-loss, home-services]
pairs_with:
  prompts: [present-repair-options, triage-open-quotes, answer-price-shopper-calls, canvass-neighbours-after-job]
  personas: [small-business-selling-mentor]
args:
  - name: enquiry
    description: The customer's enquiry as received (message, form or call notes) - what they want, where, when, any photos described, and how they found you.
    type: text
    required: true
  - name: business
    description: Your trade, the area you cover, how busy you are, your minimum job size, and how you usually quote (visit, video call, photos).
    type: text
    required: true
  - name: pricing_basis
    description: How you price - day rate, hourly rate, materials markup, call-out fee, typical prices for common jobs, deposit and payment terms. Optional; prices are left as [X] if missing.
    type: text
steps:
  - {id: qualify, file: steps/01-qualify-enquiry.md, stage: discover, gate: approve, artifact: "quote-to-close/01-qualify.md"}
  - {id: visit, file: steps/02-plan-site-visit.md, stage: plan, gate: approve, artifact: "quote-to-close/02-visit-plan.md"}
  - {id: quote, file: steps/03-write-quote.md, stage: build, gate: approve, artifact: "quote-to-close/03-quote.md"}
  - {id: follow-up, file: steps/04-follow-up.md, stage: operate, gate: approve, artifact: "quote-to-close/04-follow-up.md"}
  - {id: record, file: steps/05-record-outcome.md, stage: review, gate: none, artifact: "quote-to-close/05-outcome.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one job the way a well-organised tradesperson does: decide quickly whether the enquiry is worth a visit, use the visit to understand what the customer really wants, quote with clear options, follow up with something useful, and learn from the result. Each step writes one artifact and stops for approval.

<enquiry>
{{enquiry}}
</enquiry>

<business>
{{business}}
</business>

{{#pricing_basis}}<pricing_basis>
{{pricing_basis}}
</pricing_basis>{{/pricing_basis}}

Rules for every step:
- Use only facts the owner gave or confirmed. Ask for missing essentials (location, scope, prices) and mark gaps as [X]; never invent prices, measurements, availability or customer replies.
- Steps 4 and 5 depend on real events: ask what the customer said or did before writing them.
- No fake urgency, invented reviews or scare stories about safety. Be honest about what cheaper options leave out.
- Say what to check locally rather than stating rules as fact: permits, building regulations, consumer cancellation rights, tax on the quote.
- Write customer messages in the owner's plain voice and keep them short.
