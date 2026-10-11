---
schema: 1
id: analyze-procurement-spend
kind: prompt
title: Analyse procurement spend
description: Builds a spend analysis by supplier and category from purchase or accounts payable data to find tail spend, off-contract buying, duplicate suppliers and consolidation savings.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [operations-manager, financial-analyst, business-analyst, executive]
requires: [none]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spend-analysis, procurement, tail-spend, supplier-consolidation, maverick-spend]
pairs_with:
  prompts: [find-business-cost-savings, deduplicate-records, run-pareto-analysis, classify-text-records]
  personas: [procurement-specialist, data-analyst]
args:
  - name: spend_data
    description: Purchase orders, invoices or accounts payable lines with supplier name, amount, date, cost centre or department, GL account, description, and whether a PO or contract was used. Say the period, currency and row count.
    type: text
    required: true
  - name: organisation_context
    description: Type and size of organisation, which suppliers have contracts or framework agreements, purchasing policy thresholds, and any categories already managed centrally.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Supplier cleanup, Spend cube, Tail spend, Off-contract and policy gaps, Savings opportunities, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a procurement analyst. Spend analysis is mostly data cleaning: the same supplier appears under five spellings, general ledger codes describe accounting rather than what was bought, and a "miscellaneous" bucket hides real categories. Until suppliers are normalised and spend is classified into a category tree, totals per supplier and category are wrong. Once clean, the classic findings are a long tail (often 80% of suppliers account for under 10% of spend but most of the transaction cost), the same item bought from several suppliers at different prices, and spend with contracted categories going to non-contracted suppliers. Savings estimates must be ranges based on typical consolidation effects, not promises.
</context>

<task>
Analyse this spend data.

<spend_data>
{{spend_data}}
</spend_data>

{{#organisation_context}}Organisation context: {{organisation_context}}{{/organisation_context}}

1. Data checks: credit notes, duplicate invoices (same supplier, amount and date or invoice number), tax included or excluded, currencies, intercompany payments, and non-addressable spend that procurement cannot influence (taxes, salaries, rent under long leases, grants). Separate non-addressable spend before any analysis.
2. Supplier cleanup: normalise supplier names (case, legal suffixes such as Ltd, GmbH, Inc, punctuation, known parent companies) and show the mapping rules and how many raw names collapsed into each supplier.
3. Spend cube: classify spend into a two-level category tree (for example IT > software, facilities > cleaning) using description, GL code and supplier, flagging low-confidence classifications. Present spend by category, supplier and department.
4. Tail spend: the Pareto of suppliers by spend, the number of suppliers and invoices in the tail (for example the bottom 80% of suppliers), and the transaction cost this implies.
5. Off-contract and policy gaps: spend in contracted categories going to other suppliers, invoices without a PO, orders split just under approval thresholds, and categories bought by many departments separately.
6. Savings opportunities: for each, the addressable spend, the lever (consolidate suppliers, use the existing contract, tender, demand management, catalogue or purchasing card for tail spend), a savings range with the assumption stated, and the effort.
7. Give runnable code (pandas or SQL) for supplier normalisation and the spend cube.
</task>

<constraints>
- Do not invent contract terms, prices or savings percentages; savings are ranges with the assumption stated, and the user should validate them with category owners.
- Treat split orders and duplicate payments as items to check, not proof of misconduct.
- Do not classify spend with false precision; show low-confidence lines separately.
- Public-sector buyers face procurement rules on tendering thresholds that vary by country; flag that any re-tendering must follow them.
</constraints>

<output_format>
## Headline
Total addressable spend, supplier count before and after cleanup, and the largest opportunity.

## Data checks
Bullets, including non-addressable spend removed.

## Supplier cleanup
Rules and a table of the biggest merges.

## Spend cube
Table: Category | Subcategory | Spend | Suppliers | Departments.

## Tail spend
Table and two sentences.

## Off-contract and policy gaps
Table: Issue | Spend | Invoices | Example.

## Savings opportunities
Table: Opportunity | Addressable spend | Lever | Savings range | Effort.

## Code
One code block.
</output_format>
