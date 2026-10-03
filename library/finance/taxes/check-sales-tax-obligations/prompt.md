---
schema: 1
id: check-sales-tax-obligations
kind: prompt
title: Check VAT and sales-tax obligations
description: Lists the VAT or sales-tax questions an online seller must verify for each market - registration thresholds, cross-border rules, marketplaces, invoices and filing - with a priority order.
category: taxes
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, operations-manager, content-creator]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [vat, sales-tax, economic-nexus, marketplace-facilitator, cross-border, digital-services]
pairs_with:
  prompts: [write-invoice, track-business-expenses, set-up-chart-of-accounts]
  personas: [tax-educator, bookkeeper]
args:
  - name: business_and_sales
    description: Where the business is established, what you sell (physical goods, digital products, services, subscriptions), how you sell (own site, marketplaces), annual sales by country or state, B2B or B2C, where stock is held and whether you are registered anywhere already.
    type: text
    required: true
  - name: countries
    description: The countries, US states or regions you sell into or plan to, as a list (for example "Germany, France, UK, United States - California and Texas").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Your profile, Market by market, Marketplaces, Invoices and records, Filing and payment, Priority order, Questions for a tax adviser]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help online sellers work out which consumption-tax questions they must answer for each market they sell into. You think like an indirect-tax specialist doing a first scoping call: the answer depends on a few facts (where the seller is established, what is sold, to whom, through which channel, where the goods ship from and how much is sold into each place), and the cost of getting it wrong is tax owed out of the seller's own margin plus penalties, often for several years back. You produce a structured list of what to verify and in what order, not a final tax opinion, because thresholds, rates and rules change frequently.

Markets: {{countries}}
</context>

<task>
Business and sales:

<business_and_sales>
{{business_and_sales}}
</business_and_sales>

1. Your profile: restate the facts that decide the answer (establishment, product type, B2B or B2C, channels, stock locations, sales per market) and list any missing fact as a question. Note that digital products and services often follow different rules from physical goods, and that holding stock in a country can create an obligation regardless of sales level.
2. Market by market: for each market in the list, cover the questions to verify:
   - Is there a registration threshold for non-resident or remote sellers, and does it apply per country, per state or across a region (for example, an EU-wide threshold for distance sales to consumers with a one-stop-shop return, or US state economic-nexus thresholds based on sales and sometimes transaction counts)? Give the threshold only if you are confident it is current, labelled "verify", otherwise say "look up".
   - Is it based on the seller's location, the customer's location, or where the goods ship from?
   - Does a reverse charge apply to B2B sales, and what customer evidence (tax ID) is needed?
   - Are there import VAT or duty rules for low-value consignments, and who pays them?
   - Any rules specific to digital services or subscriptions.
   Compare the stated sales with any threshold you are confident of and label the result "likely over", "likely under" or "cannot tell".
3. Marketplaces: explain that in many places marketplaces are treated as the seller for tax purposes on some sales (often called marketplace facilitator or deemed supplier rules), which may shift collection but not always registration, records or sales through the seller's own site.
4. Invoices and records: what invoices commonly need to show for VAT or sales-tax purposes, evidence of customer location, and how long to keep records (verify locally).
5. Filing and payment: the kinds of returns and frequencies to expect, and what to set aside from each sale.
6. Priority order: rank the markets by exposure (sales size, likelihood over threshold, stock held there, years already trading), so the seller knows what to resolve first. If they may already have been over a threshold in past years, say that voluntary disclosure with an adviser is usually better than waiting.
7. Questions for a tax adviser, grouped by market.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Every rate, threshold, deadline and scheme name is something to verify. State one as current only when you are confident, and mark it "verify" even then. Never invent a number for a jurisdiction you do not know well; write "look up".
- Do not advise structuring sales to stay under thresholds or to avoid registration, and do not suggest ignoring small markets as harmless.
- Do not recommend specific tax software, marketplaces or service providers.
- Keep the US sections state by state; there is no single US sales tax.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your profile
Bullets, then missing facts as questions.

## Market by market
Table: market | basis (seller, customer, stock location) | threshold to verify | your sales | status (likely over, likely under, cannot tell) | B2B notes | confidence. Then short notes per market where needed.

## Marketplaces
Short paragraph.

## Invoices and records
Checklist.

## Filing and payment
Bullets.

## Priority order
Numbered list with the reason for each rank.

## Questions for a tax adviser
Grouped by market.
</output_format>
