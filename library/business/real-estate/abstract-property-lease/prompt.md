---
schema: 1
id: abstract-property-lease
kind: prompt
title: Abstract a signed property lease
description: Turns a signed lease into a lease abstract for a property manager - term, rent and reviews, critical dates, obligations, options and clause references - with gaps and conflicts flagged.
category: real-estate
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, legal-professional]
subject: [real-estate]
requires: [none]
inputs: [document]
output: [table, summary, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [lease-abstract, critical-dates, rent-review, portfolio-admin]
pairs_with:
  prompts: [review-commercial-lease]
  personas: [property-manager]
args:
  - name: lease
    description: The full lease text, including schedules, side letters, variations and any rent review memoranda that change it.
    type: text
    required: true
  - name: perspective
    description: Whose records this is for - landlord, managing agent or tenant - and anything to focus on, such as service charge or alterations. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key terms, Critical dates, Rent and charges, Obligations, Options and rights, Gaps and conflicts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write lease abstracts the way an experienced lease administrator does for a property portfolio. An abstract is used daily by people who will not reread the lease: it must be accurate, cite the clause for every point, and put dates where they can be diarised. The costly misses are predictable: a break option or renewal notice deadline that passes unnoticed, a rent review mechanism read wrongly (upward-only, index-linked with a cap or collar, open market), a "time is of the essence" provision, repair and reinstatement duties that decide the end-of-lease claim, and side letters or variations that quietly change the main document. When documents conflict, the abstract flags it rather than picking a winner.

<lease>
{{lease}}
</lease>
{{#perspective}}

Perspective and focus: {{perspective}}
{{/perspective}}
</context>

<task>
1. Extract the key terms with clause references: parties and guarantors, premises and what is included or excluded, permitted use, term start and end, rent commencement, rent-free periods, deposit or security.
2. Build the critical dates list: every date or deadline in the lease, including notice windows for breaks, renewals, rent reviews, insurance renewals, service charge statements and expiry. Give the trigger, the deadline, how notice must be served, and whether time is of the essence. Where a date must be calculated, show how.
3. Summarise rent and charges: rent, payment dates, review mechanism and its basis, any cap, collar or index, service charge and insurance contributions, interest on late payment, and VAT or sales tax points if stated.
4. Set out obligations by party: repair, decoration, insurance, compliance, alterations consent, assignment and subletting, reinstatement and yield-up.
5. List options and rights: break options and their conditions, renewal or extension options, rights of first refusal, landlord access, and any security of tenure exclusion.
6. Flag gaps and conflicts: missing schedules, blanks, inconsistent dates, side letters changing terms, and ambiguous drafting worth a lawyer's view.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote or cite the clause for every item. If something is not in the text, write "Not stated" rather than filling it from typical leases.
- Do not interpret ambiguous clauses as settled; flag them for legal review.
- Do not compute legal deadlines that depend on statute or local notice rules; show the lease's own wording and mark `[CHECK with solicitor or attorney]`.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key terms
Table: item, detail, clause.

## Critical dates
Table: event, date or calculation, notice requirement, time of the essence, clause.

## Rent and charges
Table: item, detail, clause.

## Obligations
Table: obligation, landlord, tenant, clause.

## Options and rights
Bullets with conditions and clauses.

## Gaps and conflicts
Bullets, each with why it matters.
</output_format>
