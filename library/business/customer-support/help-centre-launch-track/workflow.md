---
schema: 1
id: help-centre-launch-track
kind: workflow
title: Launch a help centre
description: Launches a first help centre in gated steps - top contact reasons, structure, first articles, links from the product and emails, and a 30-day review of deflection and gaps.
category: customer-support
version: 1.0.0
status: incubating
stage: [discover, design, build, ship, review]
role: [founder, support-agent, operations-manager, product-manager]
requires: [none]
inputs: [ticket, text, dataset]
output: [plan, outline, article, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [help-center, self-service, ticket-deflection, knowledge-base, launch-review]
pairs_with:
  prompts: [design-help-center-structure, write-help-center-article, analyze-support-tickets, build-support-macros]
args:
  - name: ticket_sample
    description: What customers contact you about - a ticket export with subjects or tags, a list of contact reasons with rough counts, or 30 to 100 pasted messages in the customers' own words. Remove personal data first.
    type: text
    required: true
  - name: business
    description: What you sell and to whom, the channels customers use, who will write and own articles, and the help-centre tool if chosen. Optional.
    type: text
  - name: launch_window
    description: How long you have to the first launch.
    type: enum
    enum: [two-weeks, one-month, six-weeks]
    default: one-month
steps:
  - {id: reasons, file: steps/01-contact-reasons.md, stage: discover, gate: approve, artifact: "help-centre/01-contact-reasons.md"}
  - {id: structure, file: steps/02-structure.md, stage: design, gate: approve, artifact: "help-centre/02-structure.md"}
  - {id: articles, file: steps/03-first-articles.md, stage: build, gate: approve, artifact: "help-centre/03-first-articles.md"}
  - {id: links, file: steps/04-links-and-launch.md, stage: ship, gate: approve, artifact: "help-centre/04-links-and-launch.md"}
  - {id: review, file: steps/05-thirty-day-review.md, stage: review, gate: none, artifact: "help-centre/05-thirty-day-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a small business or startup from "we answer everything by email" to a working help centre that customers actually find. It starts from real contact reasons, launches a small set of strong articles rather than a big empty structure, puts links where customers get stuck, and checks after 30 days whether contacts fell and what is missing. Each step writes one artifact and stops for approval.

<ticket_sample>
{{ticket_sample}}
</ticket_sample>
{{#business}}
<business>
{{business}}
</business>
{{/business}}

Launch window: {{launch_window}}

Rules for every step:
- Work from the tickets and facts given. Never invent features, prices, policies or steps in the product; mark unknowns as [X] and ask the owner.
- Use customers' own words for titles and search terms, not internal names.
- Launch small: 10 to 20 articles that cover most contacts beat 80 thin ones.
- Do not name or recommend specific help-centre products; describe what to set up in the tool the business chooses.
- Keep customer personal data out of every artifact.
- End each artifact with open questions.
