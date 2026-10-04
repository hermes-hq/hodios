---
schema: 1
id: replace-state-management-library
kind: prompt
title: Replace a state management library
description: Plans moving a frontend app to a new state approach, such as legacy Redux to server-state caching plus local state, by classifying state, migrating slice by slice and deleting the old store safely.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [frontend-engineer, tech-lead]
stack: []
requires: [none]
inputs: [text, file]
output: [plan, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [redux, server-state, url-state, form-state, global-store, incremental-rollout]
pairs_with:
  prompts: [convert-class-components-to-hooks, plan-incremental-migration]
  personas: [migration-engineer]
args:
  - name: current_setup
    description: The framework and current state library, the store shape or slice list, middleware (thunks, sagas, observables), how data is fetched and cached, persisted state, and the pain points. Paste a representative slice and a component that uses it.
    type: text
    required: true
  - name: target
    description: What you want to move to (for example "TanStack Query plus component state", "Zustand", "Pinia", "Signals", "framework loaders and URL state").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [State classification, Target per kind, Migration order, Worked slice, Coexistence rules, Deleting the old store, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A frontend team wants to replace its state management with {{target}}. Most of the code in an old global store is not really app state: it is a hand-written cache of server data (loading flags, error flags, refetch logic, normalisation), copies of URL parameters, form drafts and UI toggles. Moving all of it into a new global store reproduces the same problems with new syntax. The expert move is to classify every piece of state first, give each kind its natural home, migrate one slice or feature at a time while both systems coexist, and only then delete the old store. Common failures: two sources of truth for the same entity during the migration, lost cache invalidation after mutations, optimistic updates without rollback, and persisted state that breaks for returning users.
</context>

<task>
<current_setup>
{{current_setup}}
</current_setup>

1. Classify every slice or field into one kind: server state (owned by the backend, needs caching and invalidation), URL state (filters, tabs, pagination, selected id: shareable and survives reload), form state (drafts until submit), local UI state (open, hover, step of one component), and truly shared client state (auth session, theme, feature flags, a multi-step wizard, an offline queue). Mark derived data that should be computed, not stored.
2. Choose a home per kind with {{target}} in mind: a server-state cache with query keys and invalidation rules for server data; the router for URL state; a form library or component state for forms; component state or context for UI; a small store only for what is truly shared. Say if the target does not fit a kind.
3. Order the migration: start with a read-mostly feature with clear server data; leave cross-cutting state (auth, session) and complex middleware flows (sagas coordinating several requests) for later. Each step is shippable.
4. Work one slice end to end from the pasted code: the new query or store code, the component change, mutation and invalidation (or optimistic update with rollback), loading and error UI, and the tests.
5. Coexistence rules while both systems live: one owner per entity at any time; if old code still reads an entity the new cache owns, bridge it one way (for example a small adapter that dispatches into the old store on cache update) and track the bridge for removal; no new code goes into the old store (enforce with a lint rule or code owners).
6. Deleting the old store: remove the slice, its actions, selectors, middleware and tests in the same change; handle persisted state migration (versioned keys or clearing old keys) so returning users do not crash; remove the dependency once the last slice is gone; check bundle size before and after.
</task>

<constraints>
- Do not invent the store shape; if no slice or component code is given, ask for one representative slice and stop.
- Do not claim specific library APIs you are unsure of; mark them to verify in the library docs.
- Keep behaviour identical for users: same loading states, error messages and cache freshness unless a change is agreed.
- Recommend fewer moving parts, not more; a new global store is justified only for state that is truly shared and client-owned.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## State classification
Table: slice or field | kind (server, URL, form, UI, shared, derived) | evidence | new home.

## Target per kind
Bullets: each kind and where it lives now.

## Migration order
Numbered phases with exit criteria.

## Worked slice
Code blocks: new data code, component change, mutation handling, one test.

## Coexistence rules
Bullets.

## Deleting the old store
Checklist.

## Risks and open questions
Bullets.
</output_format>
