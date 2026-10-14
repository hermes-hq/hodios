---
schema: 1
id: build-react-server-component-page
kind: prompt
title: Build a Next.js App Router page with Server Components
description: Builds a Next.js App Router page that fetches data in Server Components, keeps client components to the interactive leaves, streams with Suspense and makes deliberate caching choices.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs, typescript]
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
depth: specific
tags: [server-components, app-router, suspense, streaming, caching]
args:
  - name: page
    description: "The route and what it shows, for example: /dashboard/orders/[id] with order details, line items, a status timeline and a cancel button."
    type: text
    required: true
  - name: freshness
    description: How fresh the data must be, for example "real time per user", "can be up to 5 minutes old", "changes only on publish".
    type: text
output_contract:
  format: markdown
  sections: [Component tree, Data and caching, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
App Router pages go wrong in a few repeatable ways. `'use client'` at the top of the page turns the whole tree into client code, shipping data-fetching libraries to the browser and losing server data access. Sequential `await`s in nested components create request waterfalls. Server-only modules (database clients, secrets) get imported into a client component and leak or break the build. Caching defaults changed between versions (Next.js 15 stopped caching `fetch` by default), and calling `cookies()` or `headers()` makes a route dynamic, so the "cached" page someone expected is rendered on every request, or a per-user page is cached for everyone.
</context>

<task>
Build this page:

{{page}}

{{#freshness}}
Freshness: {{freshness}}
{{/freshness}}

1. Read `package.json` for Next.js and React versions, `next.config`, the layouts above this route, and one or two similar pages. Follow their data-access layer, auth helper and styling.
2. Sketch the component tree: Server Components by default; mark `'use client'` only on the smallest leaves that need state, effects, event handlers or browser APIs. Pass them serializable props only.
3. Fetch data in Server Components through the project's data layer, close to where it is used. On Next.js 15 and later, `params`, `searchParams`, `cookies()` and `headers()` are async and must be awaited. Start independent requests in parallel (`Promise.all`, or start promises early and await late) to avoid waterfalls. Mark server-only modules with `import 'server-only'`.
4. Stream slow parts: wrap them in `<Suspense>` with skeleton fallbacks shaped like the content, and add `loading.tsx` if the route needs a whole-page fallback.
5. Decide caching per data source from the freshness need and the Next.js version: static with `revalidate`, tagged with `revalidateTag`, or fully dynamic. If the project has Cache Components enabled (Next.js 16 `cacheComponents`), use `'use cache'` with `cacheLife` and `cacheTag` instead of route segment config, and keep request-time data (`cookies()`, `headers()`, `searchParams`) inside Suspense boundaries. Never cache per-user data in a shared cache. State the decision.
6. Handle missing and failing data: call `notFound()` for missing records, add `error.tsx` for the segment if absent, and check authorization on the server before rendering.
7. Add `generateMetadata` if the page has a title or social preview that depends on data.
8. Write or update tests the project supports (component tests for client leaves, Playwright for the page). Run the build (`next build`) to confirm which routes are static or dynamic, plus type check and lint.
</task>

<constraints>
- Do not put `'use client'` on the page or layout to "make it work".
- Do not fetch the page's own API routes from Server Components; call the data layer directly.
- Do not expose secrets or full database records to client components; pass only the fields they render.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Component tree
Indented tree, each node marked server or client, with Suspense boundaries.

## Data and caching
Table: Data | Fetched in | Cache strategy | Why.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results, including the route's static or dynamic status from the build output.
</output_format>
