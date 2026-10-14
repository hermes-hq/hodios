---
schema: 1
id: write-what-changed-summary
kind: prompt
title: Write a what-changed summary for readers
description: Writes a reader-facing summary of what changed between two versions of a policy, guide, terms or procedure, ordered by impact on readers, with what they must do differently and by when.
category: editing
version: 1.0.0
status: incubating
stage: [ship]
role: [operations-manager, manager, technical-writer, legal-professional]
requires: [none]
inputs: [document]
output: [summary, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [change-notice, policy-updates, version-changes, terms-update, communication]
pairs_with:
  prompts: [compare-documents, check-summary-matches-document, write-internal-announcement]
  personas: [editor]
args:
  - name: old_version
    description: The previous version of the document.
    type: text
    required: true
  - name: new_version
    description: The new version of the document.
    type: text
    required: true
  - name: readers
    description: "Who must be told, for example \"all staff\", \"customers on the monthly plan\" or \"contractors on site\"."
    type: text
    required: true
  - name: effective_date
    description: When the new version takes effect, if known.
    type: string
output_contract:
  format: markdown
  sections: [Reader summary, Changes table, Unchanged but often asked, Checks for the author]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a policy, handbook, set of terms or procedure is updated, readers do not want a diff; they want to know what affects them and what they must do. Weak change notices say "we have updated our policy to better reflect…" and list nothing, or list every comma. Strong ones lead with the changes that change behaviour or money, say what to do and by when, group cosmetic edits into one line, and say what has not changed when readers are likely to worry. A change notice must also be honest: burying a fee increase or a reduced entitlement under "improvements" damages trust and, for consumer terms in many countries, may breach notice rules. Wording that a law or contract requires (notice periods, rights to cancel) should come from whoever owns the legal text.
</context>

<task>
Write a reader-facing summary of what changed.

Readers: {{readers}}
{{#effective_date}}Takes effect: {{effective_date}}{{/effective_date}}

<old_version>
{{old_version}}
</old_version>

<new_version>
{{new_version}}
</new_version>

1. If either version is missing, ask for it and stop.
2. Compare the versions and list every substantive change: added, removed or changed rules, entitlements, fees, deadlines, steps, contacts and definitions. Note cosmetic changes (wording, layout) as a group.
3. For each substantive change, decide who among the readers it affects, whether it is better, worse or neutral for them, and what they must do (nothing, act once, act differently from now on) and by when.
4. Order by impact on readers: changes requiring action or affecting money, rights or safety first.
5. Write the summary in plain language, stating worse changes as plainly as better ones.
6. Add the unchanged points readers are likely to worry about, but only where the new version clearly keeps them.
7. List anything the author should check: ambiguous changes, a missing effective date, or wording that may need legal or HR review.
</task>

<constraints>
- Report only changes that are in the documents. Do not speculate about reasons for changes unless the new version states them.
- Do not downplay changes that are worse for readers or describe them as improvements.
- Quote exact figures, dates and deadlines from the new version.
- Do not give legal advice about whether the change or its notice is lawful; flag it for review where relevant.
</constraints>

<output_format>
## Reader summary
A short message ready to send: one opening line, the changes in impact order as bullets with what to do and by when, and where to read the full document.
## Changes table
A table: Change | Old | New | Who it affects | Action needed.
## Unchanged but often asked
Bullets. "None" if none.
## Checks for the author
Bullets. "None" if none.
</output_format>
