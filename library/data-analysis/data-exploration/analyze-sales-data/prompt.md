---
schema: 1
id: analyze-sales-data
kind: prompt
title: Analyse sales performance
description: Analyses sales data by product, customer, region and time to find what drives revenue, seasonality, best and worst performers, and the actions worth taking. Use for a sales performance review.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [data-analyst, business-analyst, sales-rep, founder]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-performance, seasonality, customer-concentration, product-mix]
pairs_with:
  prompts: [decompose-revenue-change, run-pareto-analysis, compare-period-performance, segment-customers]
  personas: [data-analyst]
args:
  - name: sales_data
    description: The sales data (pasted rows, an extract, or a description of the table with summary output), with what one row represents, the date range, the currency, and whether amounts are gross or net of discounts, returns and tax.
    type: text
    required: true
  - name: questions
    description: Specific questions you want answered (for example "why did Q3 miss plan?"). Leave empty for a general performance review.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data check, Trend and seasonality, Products, Customers, Regions, What drives revenue, Actions, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a commercial analyst reviewing sales performance for people who will act on it: a sales lead, a founder, a category manager. A useful sales review does not list every cut of the data; it finds the few things that explain most of the revenue and its change, separates real performance from calendar, mix and data artefacts, and ends in actions someone can own.
</context>

<task>
Analyse the sales data below.

<sales_data>
{{sales_data}}
</sales_data>

<questions>
{{questions}}
</questions>

1. Check the data first: grain (order, line or invoice), date range and partial periods at either end, currency, gross versus net (discounts, returns, credit notes, tax), duplicates, test or internal orders, and one total reconciled to a figure the user can confirm. State the revenue definition you will use.
2. Trend and seasonality: revenue by month with year-over-year comparison where at least 13 months exist. Call a pattern seasonal only when it repeats in two or more years; with less history, say the pattern is not yet confirmed.
3. Products: revenue, units, average selling price and growth by product or category; contribution to total growth; the products growing fastest and declining fastest, judged on size and growth together (a small product doubling matters less than a large one slipping 5%).
4. Customers: concentration (share of revenue from the top 10 and top 20% of customers), new versus returning revenue, order frequency and average order value, and the customers whose spend fell most.
5. Regions or channels: the same performance view, normalised where size differs (per store, per rep, per active customer).
6. What drives revenue: split the change between periods into more customers, more orders per customer and higher order value (or volume and price), and say which explains most of it. For a full price, volume and mix bridge, say that a decomposition is the next step rather than improvising one.
7. Answer the user's questions directly, using the cuts above.
8. Recommend three to five actions, each tied to a finding, with the expected effect, an owner type and how to check it worked.
</task>

<constraints>
- Use only numbers that come from the data or from code you actually ran. If you cannot compute from what was pasted (a sample, a description), give the code and say the results section will be filled from its output; never invent figures.
- When the data is small enough to compute exactly, compute exactly and show the totals so they can be checked.
- Show comparisons, not lone numbers: versus prior period, prior year, plan if given, or the average.
- Flag small denominators (segments with few orders or customers) and do not rank them as best or worst on percentage growth alone.
- Say "is associated with" for relationships the data cannot prove are causal.
- Keep personal data out of the report: refer to customers by ID or account name only as needed.
</constraints>

<output_format>
## Headline
Three sentences: what happened to revenue, the main reason, the most important action.

## Data check
Bullets: grain, period, revenue definition, issues found, reconciliation.

## Trend and seasonality
A short monthly table or description, with the YoY comparison.

## Products
Table: Product | Revenue | Share | Growth | Contribution to growth | Note.

## Customers
Concentration, new versus returning, and the biggest decliners.

## Regions
Table of the normalised view.

## What drives revenue
The split of the change, with numbers that add up to the total change.

## Actions
Numbered: action, finding behind it, expected effect, owner, how to check.

## Code
Python (pandas) or SQL that reproduces every table above, if the full data was not available.
</output_format>
