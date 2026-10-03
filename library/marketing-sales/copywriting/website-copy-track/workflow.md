---
schema: 1
id: website-copy-track
kind: workflow
title: Small-business website copy track
description: Writes a small-business website in gated steps, from customer research and messaging to sitemap, homepage, inner pages and a final clarity and claims review.
category: copywriting
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [founder, marketer, copywriter, consultant]
requires: [none]
inputs: [text, notes]
output: [copy, outline, plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [website-copy, sitemap, homepage, local-business, page-plan]
pairs_with:
  prompts: [write-landing-page-copy, write-about-page, write-messaging-framework, write-meta-tags, critique-marketing-copy, request-customer-testimonials]
  personas: [copywriter]
args:
  - name: business_description
    description: What the business does, where, for whom, prices or packages, what makes it different, proof you have (reviews, years trading, accreditations), and the main action you want visitors to take (call, book, buy, request a quote).
    type: text
    required: true
  - name: customers
    description: What you know about customers in their own words, such as reviews, common questions, enquiry emails, reasons they chose you or reasons they did not. Optional, but the copy is far stronger with it.
    type: text
  - name: pages_needed
    description: Pages you already know you want (for example "home, services, about, pricing, contact"). Optional; the sitemap step proposes them otherwise.
    type: string
steps:
  - {id: research, file: steps/01-research.md, stage: discover, gate: approve}
  - {id: messaging, file: steps/02-messaging.md, stage: plan, gate: approve}
  - {id: sitemap, file: steps/03-sitemap.md, stage: plan, gate: approve}
  - {id: homepage, file: steps/04-homepage.md, stage: build, gate: approve}
  - {id: inner-pages, file: steps/05-inner-pages.md, stage: build, gate: approve}
  - {id: review, file: steps/06-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Writes a small-business website the way a senior web copywriter would: understand the customers, agree the message, plan the pages, then write the homepage, the inner pages and a final review, one approved step at a time.

<business_description>
{{business_description}}
</business_description>

{{#customers}}<customers>
{{customers}}
</customers>{{/customers}}
{{#pages_needed}}Pages requested: {{pages_needed}}{{/pages_needed}}

Each step produces one artifact and stops for approval or edits; later steps build on the approved versions and do not reopen them unasked. Use only facts the owner supplied: never invent reviews, client names, years in business, accreditations, prices or results. Ask for missing facts or mark them `[NEEDED: …]`. Write for visitors who arrive on any page from a search, so every page says what it is, who it is for and what to do next. If the owner asks to skip approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.
