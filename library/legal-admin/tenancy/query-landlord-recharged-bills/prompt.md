---
schema: 1
id: query-landlord-recharged-bills
kind: prompt
title: Query bills your landlord passes on
description: Checks utility, service or shared-cost bills a landlord passes on - what the lease allows, the split, estimated readings, markups - and writes a request for the breakdown and receipts.
category: tenancy
version: 1.0.0
status: incubating
stage: [review]
role: [individual, student]
subject: [law, real-estate]
requires: [none]
inputs: [text, document]
output: [report, message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [utility-bills, service-charges, bill-splitting, tenant-rights, overcharging]
pairs_with:
  prompts: [review-lease, split-rent-between-flatmates, check-nebenkostenabrechnung]
args:
  - name: bill
    description: What the landlord is charging - each item, the period, amounts, how they say it was calculated or split, and any readings or invoices they sent.
    type: text
    required: true
  - name: lease_terms
    description: What the lease says about bills, service charges or shared costs, word for word if possible, and what you pay (fixed amount, advance payments, actual share).
    type: text
    required: true
  - name: country
    description: Country and region. Optional; some places limit what landlords may charge for utilities.
    type: string
output_contract:
  format: markdown
  sections: [What the lease allows, Line by line, Questions and red flags, Request for breakdown, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check bills passed on by landlords the way a tenant adviser who has read many of them does. Recharged bills go wrong in predictable ways: costs the lease does not mention, shared meters split by a key that does not match the building (per flat versus per person versus floor area), estimated readings never trued up, periods outside the tenancy, the landlord's own usage or communal areas included, markups on top of the supplier's price where local rules may limit resale of energy or water, and missing invoices. Advance payment schemes need an annual reconciliation that tenants can usually ask to verify against the underlying invoices. A calm request for the calculation, the supplier invoices and the meter readings resolves most disputes. Country-specific schemes (for example annual service charge statements in Germany) have their own deadlines and rules.
{{#country}}

Location: {{country}}
{{/country}}
</context>

<task>
<bill>
{{bill}}
</bill>

<lease>
{{lease_terms}}
</lease>

1. What the lease allows: quote and explain the bills clause; say whether each charged item appears to be covered, not covered or unclear.
2. Line by line: recompute each item from the figures given where possible, showing the arithmetic, and flag mismatches, periods outside the tenancy, and splits that look wrong.
3. Questions and red flags: estimated readings, markups, communal or landlord usage, missing invoices, and local limits on reselling utilities to check `[CHECK locally]`.
4. Request for breakdown: a polite message asking for supplier invoices, meter readings with dates, the split method, and the period, and stating which amounts the tenant will pay now (undisputed) while the rest is checked.
5. Next steps: keep paying undisputed amounts, record readings yourself, and routes to check if the landlord will not explain (tenant advice, a utility or energy regulator, a tribunal).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show all arithmetic. Do not invent tariffs, prices or readings.
- Do not advise refusing to pay the whole bill; suggest paying undisputed parts.
- If the tenant is in Germany and the bill is an annual Betriebskostenabrechnung, mention that the dedicated check is a better fit.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the lease allows
Quoted clause and plain explanation.

## Line by line
Table: item | period | charged | your check | note.

## Questions and red flags
Bullets.

## Request for breakdown
Under 200 words.

## Next steps
Numbered steps.
</output_format>
