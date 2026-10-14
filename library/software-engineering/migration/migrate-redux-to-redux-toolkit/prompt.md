---
schema: 1
id: migrate-redux-to-redux-toolkit
kind: prompt
title: Migrate hand-written Redux to Redux Toolkit
description: Converts hand-written Redux reducers, action creators and thunks to Redux Toolkit slices, and data-fetching thunks to RTK Query, one slice at a time with tests passing.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [redux, redux-toolkit, rtk-query, immer, incremental]
pairs_with:
  prompts: [replace-state-management-library, plan-incremental-migration, convert-class-components-to-hooks]
args:
  - name: scope
    description: What to migrate first, for example "the whole store" or "the cart and orders reducers".
    type: string
    required: true
  - name: notes
    description: "Redux and React-Redux versions, middleware in use (thunk, saga, custom), how data is fetched today, test setup, TypeScript or JavaScript."
    type: text
output_contract:
  format: markdown
  sections: [Current store, Migration order, Changes made, Verification, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moving to Redux Toolkit is a modernisation inside Redux, not a rewrite, and it can be done one reducer at a time because slices and old reducers live side by side in the same root reducer. What catches people out: `configureStore` turns on immutability and serializability checks in development, which immediately expose existing state mutations and non-serializable values (Dates, Promises, class instances, Maps) that were silently working; decide per case whether to fix the data or configure the check, not disable it wholesale. `createSlice` reducers use Immer: mutate the draft or return a new value, never both. Slice action types become `sliceName/caseName`, so other reducers, sagas, middleware or analytics that match on the old type strings break unless they listen via `extraReducers` or the old strings are kept. In RTK 2 the object form of `extraReducers` is gone (use the builder callback) and `createStore` is deprecated. `createAsyncThunk` dispatches pending, fulfilled and rejected actions and serialises errors. RTK Query replaces data-fetching thunks plus hand-written loading flags and cache, but the same server data must not also live in a slice. Selectors that return new objects cause re-renders; `createSelector` fixes that.
</context>

<task>
Migrate {{scope}} to Redux Toolkit.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the store setup, root reducer, middleware, each reducer in scope, its action creators, every place that dispatches or matches its action types (components, sagas, middleware, other reducers, tests), and its selectors.
2. Replace `createStore` with `configureStore`, keeping existing reducers and middleware. Run the app and tests; list every immutability or serializability warning with its cause, and fix mutations rather than turning checks off.
3. Plan the order: leaf reducers with few cross-dependencies first, data-fetching reducers last. Keep the state shape unchanged so selectors and components do not move.
4. Convert one reducer per commit to `createSlice`, export its action creators, update dispatch sites, and handle actions from other slices with the builder form of `extraReducers`. Keep or map old action type strings where sagas, middleware or other code depend on them.
5. Convert thunks to `createAsyncThunk`, or for server data, to an RTK Query API slice with tags for invalidation; then remove the duplicated loading, error and cache state.
6. Run the type check, tests and the app after each step; add reducer tests that dispatch the new action creators where coverage is missing.
</task>

<constraints>
- Do not change the shape of state in the same commit as a slice conversion.
- Do not disable the immutability or serializability middleware globally; scope any exception and explain it.
- Do not keep server data in both a slice and RTK Query.
- Do not rewrite components to hooks as part of this change unless asked.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current store
Reducers, middleware, cross-dependencies on action types, data fetching.
## Migration order
Ordered list with the reason for each position.
## Changes made
Per reducer: slice created, dispatch sites changed, type strings kept or mapped, state removed.
## Verification
Warnings found and fixed, type check, tests and manual checks.
## Next steps
Remaining reducers, RTK Query candidates, selector work.
</output_format>
