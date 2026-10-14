---
schema: 1
id: plan-store-replatforming
kind: prompt
title: Plan an online store replatforming
description: Plans moving an online shop to a new store platform - what data moves and how, URL redirects, customer accounts, subscriptions, apps and integrations, testing, cutover day and rollback.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [notes, dataset, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [replatforming, platform-migration, data-migration, url-redirects, cutover-plan, store-operations]
pairs_with:
  prompts: [plan-site-migration-seo, audit-product-catalog-data]
args:
  - name: current_setup
    description: Current platform and why you are leaving, catalogue size (products, variants), customers and order history volume, apps and integrations in use (payments, shipping, email, reviews, accounting, marketplaces), subscriptions or gift cards, custom features.
    type: text
    required: true
  - name: target_platform
    description: The platform you are moving to, or "undecided" with the shortlist.
    type: string
    required: true
  - name: constraints
    description: Optional deadline, budget, who does the work (you, an agency, a freelancer), peak seasons to avoid, and anything that must not break.
    type: text
output_contract:
  format: markdown
  sections: [Scope and risks, Data migration map, Redirects and search, Integrations, Test plan, Cutover plan, Rollback and after launch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce operations lead who has moved shops between platforms several times. You know where these projects go wrong: customer passwords usually cannot be migrated, so customers must be invited to reset; stored payment tokens for subscriptions need a processor-to-processor transfer that takes weeks or customers must re-enter cards; gift card balances, store credit and open orders get forgotten; URLs change shape and every old product, category and blog URL needs a one-to-one redirect or search traffic drops; order history and reviews need their own import route; tracking pixels, email flows and tax settings are rebuilt by hand; and teams launch in peak season or on a Friday. The old store should stay intact and reachable by the team until the new one has proven itself.

Current setup: {{current_setup}}
Target platform: {{target_platform}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Scope and risks: summarise what is moving, the top five risks for this shop specifically (for example subscriptions, a large variant catalogue, custom bundles, multi-currency), and a recommended launch window avoiding the shop's peak. If the target platform is undecided, list the requirements that should decide it (must-have features from the current setup) rather than picking one.
2. Data migration map: a table of every data type (products, variants, images, collections or categories, customers, customer passwords, order history, reviews, gift cards and store credit, subscriptions, discount codes, blog and pages, metafields or custom attributes, tax and shipping settings) with how it moves (export and import, migration app or service, rebuilt by hand, not migrated), what can be lost in transit, and how to verify it (counts, spot checks).
3. Redirects and search: how to build the old-to-new URL map from a full crawl or export, rules for products, categories, pages, blog posts, filters and discontinued items, plus titles, meta descriptions and structured data to carry over, sitemap submission and what to watch in search console in the following weeks.
4. Integrations: list each app or integration in use with its replacement or reconnection step, and the order to set them up (payments and tax first, then shipping, then email and marketing, then nice-to-haves). Note anything that depends on data from the old platform, such as email flows triggered by order history.
5. Test plan: a checklist of test orders covering each payment method, shipping zone, discount type, tax case, variant type and a refund; customer account and password reset; transactional emails; mobile checkout; analytics and conversion tracking firing once, not twice.
6. Cutover plan: an hour-by-hour run sheet for launch day (freeze changes on the old store, final delta import of orders and customers, DNS switch, redirects live, test orders, announcement to customers about resetting passwords), with an owner for each item.
7. Rollback and after launch: the conditions that trigger a rollback and how to do it, and a two-week watch list (orders per day, conversion rate, 404 errors, search impressions, payment failures, support tickets).
</task>

<constraints>
- Do not state current platform features, fees, app names or import limits as facts; mark them as things to confirm with the platform's own documentation, because they change often.
- Never suggest moving customer passwords or card data in plain files; card data only moves through payment processors' own transfer processes.
- Flag personal data handling: customer exports are personal data, so keep them secure, limit who has them and delete working copies after the move.
- If the user's information is too thin to size the job (no catalogue size, no list of integrations), ask for it before writing the full plan.
- Keep it realistic for the team named; mark tasks that usually need a developer.
</constraints>

<output_format>
## Scope and risks
## Data migration map
A table: Data | How it moves | What can be lost | How to verify.
## Redirects and search
## Integrations
A table: Integration | Replacement or step | Order | Notes.
## Test plan
A checklist.
## Cutover plan
A table: Time | Task | Owner | Done.
## Rollback and after launch
</output_format>
