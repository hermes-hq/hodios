---
schema: 1
id: analyze-competitor-financials
kind: prompt
title: Analyse a competitor's financial accounts
description: Reads a competitor's public accounts or filings for growth, margins, cash and investment signals, compares them with yours and explains what they imply for strategy.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover]
role: [executive, financial-analyst, founder, consultant]
requires: [none]
inputs: [document, dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [competitor-accounts, financial-benchmarking, margin-analysis, filings, competitive-analysis]
pairs_with:
  prompts: [profile-a-competitor, summarize-annual-report, read-company-financials, benchmark-competitor-pricing]
args:
  - name: accounts
    description: The competitor's public financial information - filed accounts, annual report extracts or key figures for at least two years - including notes if available. Say which years and the currency.
    type: text
    required: true
  - name: our_figures
    description: Your own comparable figures (revenue, gross margin, operating margin, headcount, cash) for a side-by-side comparison. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the filing covers, Key figures and ratios, What the numbers say, Comparison with us, Strategic implications, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read competitors' public accounts for strategic signals. Filed accounts are often late, abbreviated, and prepared under rules that differ by country and company size, so care is needed: small companies may file only a balance sheet; group accounts mix several businesses; one-off items distort a single year. Still, two or three years of figures reveal a lot: whether a rival is growing or shrinking, whether its margins let it sustain a price war, how much cash or debt it has, whether it is investing (capital spending, headcount, intangible assets), how fast it pays suppliers and collects from customers, and notes on going concern, related parties or new financing. The aim is to understand the rival's room to act, not to audit them.
</context>

<task>
Analyse these accounts:

<accounts>
{{accounts}}
</accounts>
{{#our_figures}}

<our_figures>
{{our_figures}}
</our_figures>
{{/our_figures}}

1. State what the filing covers: entity, period, currency, whether figures are full or abbreviated, group or single company, and any accounting points that limit comparison.
2. Compute key figures and ratios for each year available: revenue growth, gross and operating margin, profit, cash and net debt, working capital days (debtor, creditor, stock) where possible, capital spending, headcount and revenue per employee. Show the arithmetic, and mark anything not available.
3. Interpret: what changed and the likely reasons, using notes and directors' reports where provided. Flag one-off items, going-concern statements, new borrowing, ownership changes or related-party dealings.
4. If our figures are given, compare side by side and explain the differences that matter (scale, cost structure, cash strength).
5. Strategic implications: can the rival sustain lower prices, fund expansion or acquisitions, or is it under pressure? What moves become more or less likely?
6. Caveats: what the accounts cannot tell you, and which other public sources could fill the gaps.
</task>

<constraints>
- Use only the figures provided; never invent missing numbers or fill gaps from memory about the company.
- Show all calculations.
- Do not make allegations of wrongdoing; describe unusual items neutrally.
- Note that accounting standards differ by country and size; comparisons are approximate.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the filing covers
Bullets.

## Key figures and ratios
Table: Measure | Year 1 | Year 2 | Change; then working.

## What the numbers say
Short paragraphs with flags.

## Comparison with us
Table and notes, or "not provided".

## Strategic implications
Numbered.

## Caveats
Bullets.
</output_format>
