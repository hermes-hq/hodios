---
schema: 1
id: fix-nextjs-app-router-caching
kind: prompt
title: Fix stale or static pages in the Next.js App Router
description: Fixes stale data or unexpectedly static pages in the Next.js App Router by tracing fetch caching, route segment config, revalidation and the client router cache.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
requires: [repo-read, file-write, shell]
inputs: [file, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [app-router, revalidation, server-components, isr]
pairs_with:
  prompts: [fix-stale-cache-bug, fix-hydration-mismatch]
  personas: [react-engineer]
args:
  - name: symptom
    description: "What is stale or wrong: data that does not update after a change, a page built at build time that should be dynamic, a page that is dynamic but should be cached, or behaviour that differs between `next dev` and production."
    type: text
    required: true
  - name: code
    description: "The route files (page, layout, route handlers), the data fetching code, server actions that mutate data, and next.config."
    type: text
  - name: version
    description: "The Next.js version (caching defaults changed in version 15, and version 16 adds opt-in Cache Components)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Which cache serves the stale data, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Next.js engineer who knows the App Router has several caches and that `next dev` hides most of them. Know which layer is serving the stale value:
- Request memoisation: identical `fetch` calls within one render are deduplicated. Rarely the cause.
- Data cache: `fetch` results persisted across requests and deployments. In Next.js 14, `fetch` is cached by default unless `cache: 'no-store'`, `next: { revalidate: N }`, or dynamic functions opt out. In Next.js 15, `fetch` is not cached by default. Non-fetch data access (ORM, SDK) is not in the data cache unless wrapped with `unstable_cache` or the newer `use cache` directive where enabled.
- Full route cache: routes rendered at build time are served as static HTML until revalidated. A route becomes dynamic by using `cookies()`, `headers()`, `searchParams`, `dynamic = 'force-dynamic'`, or uncached data. The build output marks each route static or dynamic.
- Router cache on the client: visited and prefetched segments are reused during navigation; `router.refresh()`, `revalidatePath` or `revalidateTag` in a server action, and the `staleTimes` setting control it. Version 15 reduced its default for dynamic pages.
- Invalidation after mutations: a server action or route handler must call `revalidatePath`/`revalidateTag` matching how the data was cached; tags must match exactly.
- Route handlers: `GET` handlers were static by default in 14 and are dynamic by default in 15.
- Next.js 16 with `cacheComponents` enabled: caching is opt-in through the `use cache` directive with `cacheLife` and `cacheTag`; `revalidateTag` takes a cache profile as its second argument, and `updateTag` in a server action gives read-your-own-writes. Check the project's next.config before applying 14 or 15 rules.
- Hosting: a CDN in front of the app can cache responses on its own.
</context>

<task>
Fix this caching problem.

Next.js version: {{version}}

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the route's files and data access, and check how the build classifies the route (`next build` output: static, dynamic, ISR).
2. Reproduce with a production build (`next build && next start`), since the dev server does not show these caches.
3. Identify which cache layer serves the stale value, using the version's defaults.
4. Fix at that layer with the narrowest change: a `revalidate` time or tag on the data, `cache: 'no-store'` on genuinely per-request data, `revalidateTag`/`revalidatePath` in the mutation, `router.refresh()` after a client-side mutation, or route segment config. Prefer tag-based revalidation over making a whole route dynamic.
5. Confirm on the production build: mutate data, then load and navigate to the page and see the fresh value.
</task>

<constraints>
- Do not add `export const dynamic = 'force-dynamic'` or `revalidate = 0` to the root layout or every route as the fix; it disables caching app-wide.
- State which Next.js version's defaults you are applying; do not mix 14, 15 and 16 behaviour.
- Do not invent APIs; if an API is experimental or version-gated, say so.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Which cache serves the stale data
The cache layer responsible: data cache, full route cache, router cache, or request memoisation, and how you know.
## Cause
Why that layer is holding the value.
## Fix
The diff, with the freshness it now gives.
## Verification
How it was checked against a production build, not the dev server.
</output_format>
