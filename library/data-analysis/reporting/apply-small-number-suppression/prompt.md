---
schema: 1
id: apply-small-number-suppression
kind: prompt
title: Apply small-number suppression to tables
description: Protects people in published tables by finding small cells, applying primary and secondary suppression or rounding, and checking that totals and other tables cannot be used to recover them.
category: reporting
version: 1.0.0
status: incubating
stage: [verify]
role: [data-analyst, researcher, business-analyst]
subject: [statistics, public-sector]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [disclosure-control, small-cell-suppression, privacy, data-release]
pairs_with:
  prompts: [write-statistical-bulletin, write-data-methodology-note, check-report-figures]
args:
  - name: tables
    description: "The tables to be published or shared, with row and column totals, and what each count represents (people, households, patients, employees)."
    type: text
    required: true
  - name: rules
    description: "The disclosure rule the organisation uses (for example suppress counts below a threshold, round to base 5), and who the output is for. Optional; if absent, propose a rule and mark it for approval."
    type: text
  - name: related_outputs
    description: Other tables, dashboards or earlier releases from the same data that a reader could combine with these. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Rule applied, Primary suppression, Secondary suppression, Protected tables, Residual risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Publishing counts about people can identify them even without names: a cell of 2 in "staff aged 60+ in the finance team who left" points at someone. Statistical disclosure control is the set of practices that prevent this. Primary suppression hides the small cells; but if row and column totals are published, a hidden cell can be recovered by subtraction, so secondary (complementary) suppression hides enough other cells that no single hidden value can be derived. Zeros and cells equal to the total can disclose too (everyone in a group shares an attribute). Differencing between tables, or between this release and an earlier one, is a common leak. Alternatives to suppression include rounding, banding categories, or merging rows. Thresholds vary by organisation, sector and law; the analyst applies the organisation's rule consistently and documents it, and the privacy or information governance owner approves any rule that does not yet exist.
</context>

<task>
<tables>
{{tables}}
</tables>
{{#rules}}

<rules>
{{rules}}
</rules>
{{/rules}}
{{#related_outputs}}

<related_outputs>
{{related_outputs}}
</related_outputs>
{{/related_outputs}}

1. State the rule to apply: the organisation's rule if given; otherwise propose a common threshold-based rule, mark it as a proposal needing approval, and explain the choice.
2. Mark primary suppressions: every cell below the threshold, plus any cell whose value equals its row or column total where that would reveal an attribute of everyone in the group.
3. Apply secondary suppression so no suppressed value can be recovered from totals within the table: in every row and column with a suppressed cell, ensure at least two cells are hidden, choosing the smallest cells to hide. Check the result by trying to solve for each hidden cell, and check that the possible range for a hidden cell is not so narrow that it reveals a small value anyway.
4. Consider alternatives that lose less information (merging small categories, banding, rounding) and recommend one where it is better than heavy suppression.
5. Check differencing against related outputs and earlier releases; flag combinations that would reveal hidden cells.
6. Produce the protected tables with a consistent symbol and a footnote explaining it.
</task>

<constraints>
- Do not invent a legal threshold or claim compliance with a specific law; the rule is the organisation's to approve.
- Show the protected tables in full and prove each hidden cell cannot be recovered from the published totals.
- Never output the suppressed values in any explanation intended for publication.
- Flag residual risks rather than declaring the release safe.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
How many cells were suppressed, by which step, and the recommended alternative if any.

## Rule applied
The rule, its source or "proposal - needs approval".

## Primary suppression
Table: Table | Cell | Reason.

## Secondary suppression
Table: Table | Cell | Protects which primary cell.

## Protected tables
The tables as they would be published, with the footnote.

## Residual risks
Bullets: differencing, related outputs, small populations.
</output_format>
