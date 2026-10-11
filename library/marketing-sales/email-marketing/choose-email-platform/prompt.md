---
schema: 1
id: choose-email-platform
kind: prompt
title: Choose an email marketing platform
description: Compares email marketing platforms for a business's list size, automation needs, shop or CRM integration, SMS, budget and skills, and recommends one with the questions to confirm in a trial.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, operations-manager]
requires: [none]
inputs: [text]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [email-software, vendor-selection, marketing-tools, tool-comparison]
pairs_with:
  prompts: [migrate-email-platform, map-email-automation-flows]
  workflows: [start-email-list-track]
args:
  - name: business
    description: What the business is, the shop platform or CRM you use, list size now and in a year, and who will run email (skills and hours).
    type: text
    required: true
  - name: needs
    description: Must-haves and nice-to-haves (ecommerce flows, product recommendations, SMS, landing pages, multiple languages, transactional email, data residency, B2B lead scoring) and budget per month.
    type: text
    required: true
  - name: shortlist
    description: Platforms you are already considering or currently use. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Requirements, Shortlist comparison, Recommendation, Trial checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help businesses choose an email platform. The wrong choice is expensive to undo: migrations take weeks, flows must be rebuilt, and a new sending setup needs warming up. Experts start from requirements rather than brand names: the integration with the shop or CRM (does purchase and product data sync in real time, can it trigger flows), the automation the business will really use, pricing at next year's list size (most platforms charge by contacts, so unengaged contacts cost money), included SMS or not, deliverability support, template editor fit for the person doing the work, data export, and where data is stored if that matters. Platform features and prices change often, so any comparison from memory must be labelled as needing confirmation on the vendor's current pricing page and in a trial.
</context>

<task>
Help choose an email platform.

<business>
{{business}}
</business>

<needs>
{{needs}}
</needs>
{{#shortlist}}Already considering: {{shortlist}}{{/shortlist}}

1. **Requirements:** turn the inputs into must-haves, nice-to-haves and deal-breakers, and note which needs are often over-bought (features the business is unlikely to use in the first year).
2. Ask up to three clarifying questions if a deal-breaker is unclear (for example the exact shop platform); otherwise proceed with stated assumptions.
3. **Shortlist comparison:** compare three or four platforms that commonly fit this kind of business (include the user's shortlist), on integration depth, automation, segmentation, SMS, editor ease, deliverability support, pricing model at the expected list size, data export and contract terms. Mark every price and feature claim "confirm on current pricing page".
4. **Recommendation:** the best fit with the reasons, the runner-up and when it would be better, and the main risk of the choice.
5. **Trial checklist:** what to test in a free trial or demo with this business's own data: connect the shop, check data sync timing, build the welcome and abandoned-checkout flows, import contacts with consent fields, send test emails to major mailbox providers, check reporting, and confirm export.
</task>

<constraints>
- Do not state prices or feature availability as current fact; label them for confirmation.
- Do not recommend platforms because they are popular; tie every point to a stated requirement.
- Say when the business's needs suggest it should stay on its current platform.
- No affiliate-style hype.
</constraints>

<output_format>
## Requirements
Must-have, nice-to-have and deal-breaker lists.

## Shortlist comparison
A table with platforms as columns and criteria as rows.

## Recommendation
Pick, runner-up, risks.

## Trial checklist
A checklist.
</output_format>
