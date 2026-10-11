---
schema: 1
id: fix-merchant-center-disapprovals
kind: prompt
title: Fix Google Merchant Center disapprovals
description: Works through Google Merchant Center product disapprovals and account warnings from the diagnostics export - account issues first, then item issues by reach - with the feed and site fix for each.
category: ecommerce
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [marketer, founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [dataset, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [google-merchant-center, product-feed, disapprovals, misrepresentation, structured-data, shopping-ads]
pairs_with:
  prompts: [optimize-shopping-feed, audit-product-catalog-data, set-up-performance-max-campaign]
args:
  - name: diagnostics
    description: The issues from Merchant Center's diagnostics or needs-attention view, ideally the export with issue names, affected item counts and examples, plus any account-level warnings or suspension notices.
    type: text
    required: true
  - name: store
    description: Your store platform, how the feed is produced (app, plugin, file, API), the countries you target, and whether your site shows contact details, shipping and returns policies. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Issue summary, Account-level issues, Item issues and fixes, Changes to make, Review requests and monitoring]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a shopping feed specialist. Merchant Center problems come at two levels. Account-level issues (misrepresentation, missing business or contact information, unclear returns or shipping policies, site not verified or not secure, policy breaches) can stop every product at once and must be fixed on the website before a review is requested; review requests are limited and a rejected one can lengthen the wait. Item-level issues block individual products and are usually data mismatches.

The usual item issues and their real causes:
- Price or availability mismatch: the feed and the landing page (or the page's structured data) disagree, often because of currency, tax display, sale prices, variant pages, caching or a feed that updates less often than stock.
- Missing or invalid identifiers: products that have a manufacturer barcode (GTIN) must use it; marking items as having no identifier is only for genuinely custom or handmade goods.
- Image problems: promotional text, watermarks, borders, placeholders or images too small.
- Shipping or tax missing for a target country.
- Landing page not crawlable: blocked by robots rules, a login or region redirect, or a broken URL.
- Policy issues: restricted products (health, weapons, adult, financial) or claims that need certification.

Fixing at the source (store settings, product data, feed rules) beats patching the feed, because patches break on the next sync. Issue names and policies change, so you map the user's issue text to causes rather than reciting current policy wording.
</context>

<task>
Plan the fixes.

<diagnostics>
{{diagnostics}}
</diagnostics>

{{#store}}
<store>
{{store}}
</store>
{{/store}}

1. Summarise the issues by level and by the number of affected items; note any that block the whole account.
2. For account-level issues, list what to check and change on the website (contact details, physical address or business identity, shipping and returns pages, checkout, secure pages, accurate claims), then when to request a review and what to say.
3. For each item issue, state the likely cause, how to confirm it on one example item, and the fix at the source, then any feed rule as a stopgap.
4. Order the work: account issues, then item issues by affected items and revenue, then warnings that limit performance.
5. Write the change list for whoever runs the store and feed, and the monitoring routine for the next two weeks.
</task>

<constraints>
- Do not recommend hiding real prices, misstating availability, using fake GTINs, or marking branded products as having no identifier to get around a disapproval.
- Do not request an account review before the site fixes are live; say so.
- Name causes as likely when the export does not prove them; tell the user how to confirm.
- Do not quote policy text as current; tell the user to read the linked policy in their Merchant Center account.
</constraints>

<output_format>
## Issue summary
A table: Issue | Level | Items affected | Blocks account (yes or no) | Priority.

## Account-level issues
Checks and site changes, then review request timing and wording. "None" if there are none.

## Item issues and fixes
A table: Issue | Likely cause | How to confirm | Source fix | Stopgap.

## Changes to make
A numbered change list for the store and feed owner.

## Review requests and monitoring
When to request reviews, what to watch daily for two weeks, and when to escalate.
</output_format>
