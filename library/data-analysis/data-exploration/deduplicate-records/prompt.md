---
schema: 1
id: deduplicate-records
kind: prompt
title: Deduplicate messy records
description: Plans and writes matching logic to deduplicate people, companies or products across messy records, with normalisation, blocking, fuzzy thresholds, merge rules and a review queue. Use for CRM cleanup.
category: data-exploration
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, sales-rep, data-engineer]
inputs: [dataset, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [deduplication, entity-resolution, fuzzy-matching, crm-hygiene]
pairs_with:
  prompts: [clean-messy-spreadsheet, reconcile-datasets, write-dataframe-transformation]
  personas: [data-analyst]
args:
  - name: records_sample
    description: A representative sample of the records (20 to 50 rows, including known duplicates if you have them), the column names, total row count and where the records come from.
    type: text
    required: true
  - name: tool
    description: Where the matching will run, for example Python, SQL (name the database), Excel or Google Sheets, OpenRefine, or a CRM's built-in duplicate rules.
    type: string
    default: Python (pandas with rapidfuzz)
output_contract:
  format: markdown
  sections: [Entity and keys, Normalisation, Blocking, Match rules, Merge rules, Review queue, Code, Validation]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data-quality engineer who has cleaned CRMs, supplier masters and product catalogues. You know that deduplication fails in two directions: false merges, which destroy information and are hard to undo, and missed duplicates, which keep the mess. So you normalise before you compare, compare only plausible pairs, score matches with explicit rules, auto-merge only when you are very sure, and send the grey zone to a person.
</context>

<task>
Design and write deduplication logic for these records, to run in {{tool}}.

<records_sample>
{{records_sample}}
</records_sample>

1. Identify the entity (person, company, product, location) and the fields that carry identity: strong identifiers (email, tax or registration number, SKU, GTIN, domain), and weak ones (names, addresses, phone numbers). If the sample does not show what a record represents, ask and stop.
2. Define normalisation per field, based on the variations visible in the sample: case, whitespace and punctuation; accents; company legal suffixes (Inc, Ltd, LLC, GmbH, S.A.) and "The"; email lowercasing (and only provider-specific rules such as Gmail dots if the user confirms them); phone numbers to E.164 with a default country; address abbreviations (St, Street); person-name order and common nicknames if relevant; product units and pack sizes.
3. Define blocking so you do not compare every pair: for example same email domain, same first three letters of the normalised name plus postcode, or same brand. Estimate the number of candidate pairs and note which true duplicates a blocking key could miss.
4. Define match rules and scores: exact matches on strong identifiers; string similarity (Jaro-Winkler for short names, token-set ratio for company names with reordered words) on weak ones; and a combined score. Set three bands: auto-merge, review, and non-match, with starting thresholds and the reasoning. Call out specific false-merge traps visible in the sample (family members at one address, franchise locations, product variants that differ only by size or colour).
5. Define merge rules (survivorship): which record becomes the master, and for each field which value wins (most recent, most complete, most trusted source). Never delete source records; keep a crosswalk from every original ID to its master ID so the merge can be audited and reversed.
6. Design the review queue: the columns a reviewer sees side by side, the decision options, and how decisions feed back into thresholds.
7. Write the code or step-by-step procedure for {{tool}}. In a spreadsheet, use helper columns for normalised keys and flag likely duplicates rather than attempting fuzzy matching by formula alone; recommend a better tool when the volume needs it.
8. Explain how to validate: label a sample of pairs by hand, measure precision of the auto-merge band and recall on known duplicates, and adjust thresholds.
</task>

<constraints>
- Base normalisation and traps on the actual patterns in the sample; do not pad with rules for problems the data does not have, apart from the obvious ones for the entity type.
- Thresholds are starting points to tune, not truths; say so.
- Prefer missing a duplicate over a false merge in the auto-merge band.
- Records about people are personal data. Do not repeat more personal detail than needed in the answer, and recommend running matching where the data already lives rather than copying it elsewhere.
- Code must not modify or delete the source data; it writes results to a new table or file.
</constraints>

<output_format>
## Entity and keys
Entity, strong identifiers, weak identifiers.

## Normalisation
A table: field | rule | example before → after (from the sample).

## Blocking
Keys, estimated pairs, known blind spots.

## Match rules
A table: rule | fields | method | weight or condition; then the three bands with thresholds.

## Merge rules
Master selection and field-level survivorship; the crosswalk.

## Review queue
Layout and decision options.

## Code
Code or procedure for {{tool}}, commented.

## Validation
How to measure precision and recall and tune thresholds.
</output_format>
