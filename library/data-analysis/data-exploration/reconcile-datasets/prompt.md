---
schema: 1
id: reconcile-datasets
kind: prompt
title: Reconcile two datasets
description: Reconciles two datasets that should agree, such as bank versus ledger or CRM versus billing, by matching records, listing mismatches and explaining likely causes. Use for month-end checks.
category: data-exploration
version: 1.0.0
status: experimental
stage: [verify]
role: [data-analyst, financial-analyst, operations-manager, business-analyst]
requires: [none]
inputs: [dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [reconciliation, record-matching, data-quality, month-end]
pairs_with:
  prompts: [write-dataframe-transformation, extract-tables-from-pdf]
args:
  - name: dataset_a
    description: The first dataset (for example the bank statement export), with its header row; say what system it comes from.
    type: text
    required: true
  - name: dataset_b
    description: The second dataset (for example the ledger or billing export), with its header row; say what system it comes from.
    type: text
    required: true
  - name: match_keys
    description: Columns that identify the same record in both, for example "invoice_id" or "date, amount, reference". Leave empty to have keys proposed.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Matching approach, Matched with differences, Only in A, Only in B, Likely causes, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reconciliation proves that two sources describe the same reality, and explains every difference that remains. The differences are usually ordinary: timing (an item recorded in one period in one system and the next period in the other), fees and charges recorded on one side only, currency conversion and rounding, duplicates, sign or debit-credit errors, transposed digits, partial payments, and several items batched into one entry. A useful reconciliation ties the totals, so that total A minus total B equals the sum of the explained differences plus a clearly stated unexplained remainder.
</context>

<task>
Reconcile these datasets:
<dataset_a>
{{dataset_a}}
</dataset_a>
<dataset_b>
{{dataset_b}}
</dataset_b>
{{#match_keys}}
Match on: {{match_keys}}
{{/match_keys}}

1. Profile each dataset: row count, total of each amount column, date range, and duplicates on the candidate key.
2. Normalise before matching, and list what you changed: trim and case-fold text keys, parse dates, align sign conventions (debit and credit, refunds), currencies and decimal places.
3. If no keys were given, propose them from the columns and explain the choice.
4. Match in passes, from strict to loose, and record which pass matched each pair:
   a. exact key match;
   b. same amount and date within a few days (say how many);
   c. same amount with a similar reference or description;
   d. one-to-many or many-to-one, where several records on one side sum exactly to one record on the other.
5. Classify every record: matched, matched with differences (say which fields differ), only in A, only in B, or duplicate.
6. For each difference, give the likely cause with the evidence (for example "difference of 270 is divisible by 9, suggesting transposed digits", or "dated 31 March in A and 1 April in B: timing").
7. Tie out: total A minus total B, broken down into explained differences and the unexplained remainder.
</task>

<constraints>
- Every number comes from the data provided; show your sums so they can be checked.
- Treat loose matches as proposals. Mark each with its pass and confidence; never force a match to make totals tie.
- Do not adjust or "correct" any record; report what would need to change and in which system.
- If either dataset has more than about 200 rows, or is truncated, do not attempt to match it by eye: reconcile the sample shown, say so, and provide a pandas script that performs the same passes and produces the same tables.
- If the datasets have no plausible common key or cover different periods, say so before matching and ask how to proceed.
</constraints>

<output_format>
## Summary
A table: | A | B | difference | for row count and each amount total, then one line on how much of the difference is explained.
## Matching approach
Normalisations, keys and the passes used, with counts matched per pass.
## Matched with differences
A table: A record | B record | field | A value | B value | likely cause.
## Only in A
A table of records with a likely cause for each.
## Only in B
A table of records with a likely cause for each.
## Likely causes
Total A minus total B broken into causes, ending with the unexplained remainder.
## Next steps
Bullets: what to check or correct, in which system, in order of amount.
</output_format>
