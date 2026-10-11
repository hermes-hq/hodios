---
schema: 1
id: design-content-versioning
kind: prompt
title: Design drafts and version history
description: Designs drafts, publishing, revision history, diffs and restore for user content such as documents, pages, product listings or configuration.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect]
requires: [none]
inputs: [spec, text, repo, schema]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [revision-history, drafts, publishing-workflow, diffs, restore, data-modeling]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [implement-audit-log, write-design-doc]
args:
  - name: content
    description: What is versioned (pages, documents, product listings, settings, templates), its shape, and who edits and publishes it.
    type: text
    required: true
  - name: requirements
    description: Drafts, scheduled publishing, approvals, how far back history goes, diff view, restore, and expected edit volume.
    type: text
  - name: stack
    description: Database and backend framework.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Data model, Lifecycle, Diff and restore, Related data, Retention and performance, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
User-facing versioning is different from an audit log: users need to edit a draft while the published version stays live, preview it, publish it, see what changed and roll back. The common designs are a separate immutable revisions table with a pointer to the current published and current draft revision, or a single row per entity plus a history table written on each save. Immutable revisions make restore trivial (restore creates a new revision copying an old one, never rewrites history) and diffs straightforward. The hard parts are elsewhere: related records (a page's blocks, a product's variants, linked images) must be versioned together or pinned, otherwise restoring a page brings back text pointing to deleted images; unique constraints and search indexes must apply to the published version, not every draft; two editors on one draft need conflict detection; and saving every keystroke as a revision floods history, so autosave should coalesce into revisions by time or explicit save. Scheduled publishing needs a job and idempotent publish. Large content may store diffs or compress old revisions, but full snapshots are simpler until storage proves otherwise.
</context>

<task>
<content>
{{content}}
</content>
{{#requirements}}
Requirements: {{requirements}}
{{/requirements}}
{{#stack}}
Stack: {{stack}}
{{/stack}}

1. If a repository is available, read the current model and save path, and note what already records history.
2. Choose a model (immutable revisions with draft and published pointers, or current row plus history), and give the reason for this content and edit volume.
3. Write the data model with key columns: entity, revision, author, created time, status, parent revision, and the pointers. Show how a read of the live version stays a single fast query.
4. Define the lifecycle and permissions for each transition, including scheduled publish and approval if required.
5. Define how autosave coalesces into revisions, how concurrent editing of one draft is detected (version number check), and what the user sees on conflict.
6. Define diffs: field-level for structured content, text diff for long fields, and restore as a new revision.
7. Define how related records and assets are versioned together or referenced immutably, and how uniqueness, search indexing and caching follow the published version.
8. Set retention rules and the storage growth estimate.
</task>

<constraints>
- Restore never deletes or rewrites history; it creates a new revision.
- Do not confuse this with a compliance audit log; mention if one is also needed and keep it separate.
- Keep the schema concrete for the given stack but do not invent ORM features; describe the mechanism if unsure.
- Keep the design proportional; no event sourcing unless the requirements justify it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The versioning model in at most five lines.
## Data model
Tables or collections with key columns, in a code block, and what each row means.
## Lifecycle
A Mermaid state diagram for draft, review, scheduled, published, archived, with transitions and who may trigger them.
## Diff and restore
How diffs are computed and shown, and what restore does.
## Related data
How references, assets and child records are versioned or pinned.
## Retention and performance
History limits, storage growth, indexes.
## Open questions
Bullets.
</output_format>
