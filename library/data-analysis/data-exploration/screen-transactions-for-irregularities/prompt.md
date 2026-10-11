---
schema: 1
id: screen-transactions-for-irregularities
kind: prompt
title: Screen transactions for irregularities
description: Runs standard audit analytics tests on payments or journal entries (duplicates, round amounts, split payments, odd timing, Benford's law) and lists items to follow up, not accusations.
category: data-exploration
version: 1.0.0
status: incubating
stage: [review]
role: [financial-analyst, business-analyst, data-analyst, executive]
requires: [none]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [audit-analytics, duplicate-payments, benfords-law, journal-entry-testing, internal-audit]
pairs_with:
  prompts: [detect-anomalies, reconcile-datasets, deduplicate-records]
  personas: [data-analyst]
args:
  - name: transaction_data
    description: The transactions - payments, invoices, expenses or journal entries - with columns such as id, date and time, amount, supplier or account, user who posted or approved, description. Say the period, currency and row count.
    type: text
    required: true
  - name: controls_context
    description: Approval limits, who may post or approve, working days and hours, known recurring payments, and why you are screening (routine review, year-end audit support, a specific concern).
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Tests run, Results, Follow-up list, Limits of this screen, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an internal audit data analyst. Analytics tests find items that are unusual, not items that are wrong: most hits have ordinary explanations (a recurring rent payment is a "duplicate", a fee is a round amount, a month-end accrual is posted at night). The value is in running a standard set of tests completely, combining them so items hit by several tests rise to the top, and handing a short, explained follow-up list to someone who can check source documents. Benford's law applies only to naturally occurring amounts spanning several orders of magnitude, with enough records (roughly 500 or more); it says nothing about fixed fees, prices or capped amounts, and a deviation is a prompt to look, not evidence.
</context>

<task>
Screen these transactions.

<transaction_data>
{{transaction_data}}
</transaction_data>

{{#controls_context}}Controls context: {{controls_context}}{{/controls_context}}

1. Data checks: completeness (record count and total against a control total, if available), gaps in sequential ids, reversals and credit notes, currencies, and date formats.
2. Run these tests, stating parameters for each:
   - Exact duplicates (same supplier, amount, date) and near duplicates (same amount and supplier within a few days, or same invoice number with small differences such as leading zeros).
   - Round amounts (multiples of 1,000 or 100), with a comparison against the overall share.
   - Amounts just below approval limits, and splits: several payments to one supplier on the same or adjacent days that add up to more than a limit.
   - Timing: postings on weekends, public holidays or outside working hours, and backdated entries (entry date well after transaction date).
   - Segregation of duties: the same user creating and approving, or creating a supplier and paying it.
   - Unusual supplier or account patterns: new suppliers with large early payments, one-off suppliers, payments to accounts that changed bank details recently if that field exists.
   - Benford's first-digit test on eligible populations, with the chi-square or mean absolute deviation and the record count; skip it and say why if the data is not suitable.
3. Combine results: score each transaction by the number and weight of tests it hits, and list the highest-scoring items.
4. Follow-up list: for each item, why it was flagged, the likely innocent explanations, and the document or person that would resolve it.
5. Give runnable code (pandas or SQL) for every test so the screen can be repeated.
</task>

<constraints>
- Never state or imply that a person committed fraud or an error; flagged items are for follow-up only. Use neutral wording.
- Do not invent approval limits, holidays or working hours; ask, or state labelled assumptions.
- Keep personal data to what the review needs; refer to users by id where possible.
- If the user suspects fraud by a specific person, recommend involving the organisation's audit, legal or HR process before taking action, and preserving evidence; do not advise confronting anyone.
</constraints>

<output_format>
## Headline
How many items were screened, how many flagged, and the most notable pattern.

## Data checks
Bullets.

## Tests run
Table: Test | Parameters | Population | Hits.

## Results
Short commentary per test, including Benford results or why it was skipped.

## Follow-up list
Table: Item | Tests hit | Amount | Why flagged | Possible explanation | How to resolve.

## Limits of this screen
Bullets.

## Code
One code block.
</output_format>
