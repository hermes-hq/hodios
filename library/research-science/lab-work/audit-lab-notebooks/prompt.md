---
schema: 1
id: audit-lab-notebooks
kind: prompt
title: Audit lab notebook entries
description: Audits lab notebook entries for completeness, traceability and data integrity before publication, a patent filing or an inspection, with fixes going forward and dated addenda, never rewrites.
category: lab-work
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [notes, document]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lab-notebooks, data-integrity, alcoa, reproducibility, record-keeping]
pairs_with:
  prompts: [write-lab-notebook-entry, assess-reproducibility]
  personas: [lab-manager]
args:
  - name: entries
    description: The notebook entries to audit, pasted or transcribed, with dates, authors and any references to raw data files.
    type: text
    required: true
  - name: purpose
    description: Why you are auditing - routine supervision, before submitting a paper, before a patent filing, a regulated inspection (for example GLP) - and any institutional notebook policy. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Findings by entry, Patterns, Fixes going forward, Addenda needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notebooks are judged against data integrity principles often summarised as ALCOA+: records should be attributable, legible, contemporaneous, original and accurate, and also complete, consistent, enduring and available. In practice auditors look for entries without dates or authors, missing reagent lot numbers and instrument IDs, deviations from the protocol not recorded, calculations without the inputs, raw data referred to but not located, results that do not match figures in a draft paper, and edits that hide the original (overwriting rather than a single line strike-through with initials and date, or edited electronic entries with no history). Past entries must never be rewritten or backdated; what was missed is added as a dated addendum that says when and why it was added. For patents, the dates and any witnessing rules of the institution matter.

Entries:
<entries>
{{entries}}
</entries>
{{#purpose}}Purpose: {{purpose}}{{/purpose}}
</context>

<task>
1. Scope: what was audited, the standard applied, and the limits of a text-only review (for example, the auditor cannot verify handwriting, signatures or raw files).
2. Findings by entry: for each entry, check attribution, date, aim, materials with lot numbers and instrument IDs, method or protocol reference with deviations, raw data location, calculations, results, conclusions supported by the data, and edits. Rate each finding as critical (affects whether results can be trusted or defended), major or minor.
3. Patterns: recurring gaps across entries and people, and their likely cause (template, training, time pressure, tool).
4. Fixes going forward: template changes, habits, and supervision steps, sized to the lab{{#purpose}} and the audit purpose{{/purpose}}.
5. Addenda needed: for each critical or major gap that can still be truthfully documented, the dated addendum to write now, stating what is added, why, and the source of the information. Where the information cannot be recovered honestly, say it must be recorded as unknown and what that means for the results.
</task>

<constraints>
- Never suggest backdating, rewriting, or filling past entries with information that was not recorded at the time. If asked, refuse and explain the integrity and legal risk, then offer dated addenda.
- Do not invent missing lot numbers, dates or values.
- Keep feedback specific and non-punitive; the aim is better records, not blame.
</constraints>

<output_format>
Use the contract's section headings in order. Findings as a table: Entry | Finding | Severity | Fix. Addenda as fenced blocks per entry.
</output_format>
