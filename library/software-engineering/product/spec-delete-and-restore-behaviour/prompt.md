---
schema: 1
id: spec-delete-and-restore-behaviour
kind: prompt
title: Specify delete and restore behaviour
description: Specifies what delete means for a type of record, covering archive versus soft and hard delete, trash and restore windows, cascades to related items, shared copies and permanent erasure.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [soft-delete, data-lifecycle, undo, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, spec-roles-and-permissions, write-data-retention-schedule]
args:
  - name: record_type
    description: The kind of record that can be deleted (project, invoice, message, user account...) and what links to it.
    type: text
    required: true
  - name: context
    description: Who deletes it, why they delete it, regulatory or contract retention needs you know of, and any current behaviour.
    type: text
output_contract:
  format: markdown
  sections: [Delete options, Cascade table, Restore rules, Permanent deletion, Visibility after delete, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Delete" hides several different user intentions: getting something out of the way (archive), undoing a mistake (trash with restore), and making data gone for good (erasure, sometimes legally required). Specs that say only "users can delete X" leave engineers to guess what happens to the comments, files, invoices and reports that point at X, whether totals and history change, whether other people who had X shared with them are told, and whether a restore brings back links that were cut. They also collide with retention duties: some records, such as issued invoices or audit history, often must not be deleted at all, while personal data may have to be erased on request. A good spec names each option, the cascade for every related item, the restore window and its limits, and who decides permanent deletion.
</context>

<task>
<record>
{{record_type}}
</record>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Decide which delete options this record needs: archive, move to trash (soft delete), permanent delete, and erasure on request. For each, state the user intention it serves and who may use it.
2. List every related item (children, references, attachments, comments, history, reports, integrations, search index, caches, exports already sent) and specify per option whether it is deleted, kept and detached, kept with a "deleted item" placeholder, or blocks the delete.
3. Write restore rules: trash window, who can restore, what comes back and what does not, name conflicts on restore, restoring a child whose parent is gone, and restoring after a related item changed.
4. Specify permanent deletion: triggers (window expiry, manual empty, account closure, erasure request), what is kept for legal, financial or security reasons and in what form, backups, and confirmation steps proportional to the damage.
5. Specify visibility after delete for every place the record appears: lists, search, counts, totals and reports, notifications, shared links, API and webhooks.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never state a legal retention period or erasure deadline as fact; mark the need and name who should confirm it (legal, finance, data protection).
- Reports and totals for past periods must have an explicit rule; do not leave historical figures to change silently.
- Destructive actions need a confirmation proportional to impact; do not add confirmations to cheap, restorable actions.
- If the related items are unknown, ask for them rather than inventing a data model.
</constraints>

<output_format>
## Delete options
Table: option, user intention, who may use it, reversible (yes/no, until when).
## Cascade table
Table: related item, archive, trash, permanent delete.
## Restore rules
Numbered rules.
## Permanent deletion
Bullets: triggers, what is retained and why (to confirm), confirmation steps.
## Visibility after delete
Table: place, what is shown.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
