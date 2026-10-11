---
schema: 1
id: implement-tanstack-query-data-layer
kind: prompt
title: Implement a TanStack Query data layer
description: Implements server-state fetching with TanStack Query, with a query-key factory, one hook per resource, mutations with optimistic updates and rollback, and targeted invalidation.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
stack: [react, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tanstack-query, react-query, server-state, optimistic-updates, caching]
args:
  - name: resources
    description: The API resources and operations to cover, for example "projects list with filters, project detail, create, rename, archive".
    type: text
    required: true
  - name: api_client
    description: How the app calls the API today, for example "fetch wrapper in src/api", "generated OpenAPI client", "axios instance".
    type: string
output_contract:
  format: markdown
  sections: [Query keys, Hooks, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
TanStack Query removes most hand-written loading and caching code, but only if keys and invalidation are designed. Typical mistakes: query keys that omit a filter or page parameter, so different requests share one cache entry; string keys built ad hoc in components, so invalidation misses some; a `queryFn` built on `fetch` that never throws on 4xx or 5xx, so errors look like data; the default `staleTime` of 0 causing refetches on every mount and window focus; copying query data into `useState`, which goes stale; and optimistic updates that do not cancel in-flight queries or roll back on error.
</context>

<task>
Build the server-state layer for these resources:

{{resources}}

{{#api_client}}
API client: {{api_client}}
{{/api_client}}

1. Read `package.json` for the TanStack Query version (v5 uses the object signature, `isPending` and `gcTime`; v4 differs), the existing `QueryClient` setup, API client and any existing hooks. Follow what exists.
2. Write a query-key factory per resource, hierarchical so you can invalidate broadly or narrowly, for example `projectKeys.all`, `projectKeys.lists()`, `projectKeys.list(filters)`, `projectKeys.detail(id)`. Every input to the `queryFn` must appear in the key.
3. Write one custom hook per read (`useProjects(filters)`, `useProject(id)`) with `queryOptions` helpers so keys and functions are shared with prefetching. Make the `queryFn` throw on non-2xx responses and pass the `signal` for cancellation.
4. Set `staleTime` per resource from how often it changes, and use `enabled` for dependent queries. Use `placeholderData: keepPreviousData` for paginated or filtered lists so the UI does not flash.
5. Write one hook per mutation. On success, invalidate the narrowest keys that changed, or write the response into the cache with `setQueryData`.
6. For mutations that need instant feedback, implement optimistic updates: in `onMutate` cancel related queries, snapshot the previous data and apply the change; in `onError` restore the snapshot; in `onSettled` invalidate.
7. Replace existing ad hoc fetching in components only where the task asks; otherwise list them as follow-ups.
8. Write tests with a fresh `QueryClient` per test (retries off) and a mocked API (MSW or the project's mock): loading to success, error state, mutation invalidation, and optimistic rollback on failure. Run tests and the type check.
</task>

<constraints>
- Do not store server data in a global client-state store or `useState` copies.
- Do not set `staleTime: Infinity` globally to silence refetches; tune per resource.
- Do not add the library if the project already uses another server-state tool (SWR, RTK Query, Apollo); say so and stop.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Query keys
The key factory in a code block.

## Hooks
Table: Hook | Key | staleTime | Invalidates or updates.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
