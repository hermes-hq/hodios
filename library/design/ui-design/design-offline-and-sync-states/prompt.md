---
schema: 1
id: design-offline-and-sync-states
kind: prompt
title: Design offline and sync states
description: Designs how an app shows being offline, syncing, out of date and in conflict, with queued changes, per-item status, conflict resolution screens and recovery messages.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, mobile-engineer, frontend-engineer, product-manager]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [offline-first, sync-status, conflicts, connectivity, stale-data]
pairs_with:
  prompts: [implement-offline-sync, design-empty-and-error-states, design-two-way-data-sync, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: app_context
    description: What the app does, what users create or edit, where they lose connection (field work, travel, poor signal), what works offline today and what does not, how sync works if known (queue, last write wins, merge), and problems seen (lost edits, duplicates, confusion).
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [mobile-app, web, desktop]
    default: mobile-app
output_contract:
  format: markdown
  sections: [Capability map, Connection indicator, Per-item sync status, Queued actions, Conflicts, Stale data, Recovery and errors, Copy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Users do not care about connectivity; they care whether their work is safe and whether what they see is current. The failures that destroy trust: an offline edit that looks saved but disappears, a full-screen "No connection" blocking content that was already loaded, duplicates after a retry, silent overwrites when two people edit, and a permanent spinner instead of a clear state. Good design decides what works offline, shows sync status where it matters (per item for things the user created, globally only when it affects everything), queues actions with a visible pending state, and turns conflicts into a choice the user understands.
</context>

<task>
<app_context>
{{app_context}}
</app_context>

Design for {{platform}}. If what users create or edit is unknown, ask and stop. If the sync behaviour is unknown, design for the states and mark rules that depend on engineering [confirm].

1. **Capability map.** List main actions and mark each available offline, available with queueing, read-only from cache, or unavailable, with the reason.
2. **Connection indicator.** When and how to show offline globally (subtle banner, not a blocking screen), when it hides, and how reconnection is announced without noise.
3. **Per-item sync status.** States for created or edited items: saved locally, syncing, synced, failed; where the status appears (row, detail header) and when it fades.
4. **Queued actions.** How pending actions look, an outbox or pending list if useful, ordering, cancelling a queued action, and what happens with actions that need a server answer (payments, submissions).
5. **Conflicts.** Detection moments, the conflict screen with both versions side by side or field-level differences, choices (keep mine, keep theirs, merge), and defaults that never discard data silently.
6. **Stale data.** Last-updated timestamps, when cached data must carry a warning (prices, availability, balances), and pull to refresh.
7. **Recovery and errors.** Sync failed after retries, storage full, signed out while offline with unsynced changes, item deleted on server, app update needed.
8. **Copy.** Exact text for each state.
</task>

<constraints>
- Never show an item as saved or synced unless that is true; local save and server sync are different states.
- Do not block already-loaded content because the device is offline.
- Do not design flows that silently discard a user's unsynced changes; any discard needs an explicit choice.
- Do not invent sync guarantees; mark engineering-dependent rules [confirm].
{{> output/uncertainty}}
</constraints>

<output_format>
## Capability map
| Action | Offline behaviour | Reason |
## Connection indicator
## Per-item sync status
| State | Visual | Where shown |
## Queued actions
## Conflicts
## Stale data
## Recovery and errors
| Situation | Message (exact copy) | Recovery |
## Copy
</output_format>
