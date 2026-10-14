---
schema: 1
id: speed-up-nextjs-page
kind: prompt
title: Speed up a slow Next.js page
description: Speeds up a slow Next.js App Router page by fixing accidental dynamic rendering, request waterfalls, missing caching, absent streaming and oversized client components.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [app-router, server-components, streaming, data-fetching, ttfb]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, fix-react-rerenders]
  personas: [frontend-engineer, performance-engineer]
args:
  - name: page
    description: The route that is slow (for example /products/[slug]), what is slow (time to first byte, blank screen, slow navigation, slow interaction), and any numbers you have.
    type: text
    required: true
  - name: next_version
    description: Next.js version and hosting, e.g. "15.3 on Vercel" or "14.2 self-hosted in Docker".
    type: string
output_contract:
  format: markdown
  sections: [Baseline, Diagnosis, Changes, Results, Not changed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most slow App Router pages have one of five causes, and generic advice ("use SSR", "add memo") misses all of them:
- **Accidental dynamic rendering.** Reading `cookies()`, `headers()` or `searchParams`, or an uncached `fetch`, anywhere in the tree turns the whole route dynamic, so every request renders on the server. `next build` prints each route as static (○), SSG (●) or dynamic (ƒ); that output is the first thing to read. Caching defaults changed between versions: in Next.js 14 `fetch` was cached by default, from 15 it is not, and newer versions add opt-in caching directives. Check the installed version before reasoning about caching.
- **Waterfalls.** Sequential `await`s in a server component, or layouts and pages that each fetch in turn, add their latencies. Independent requests should start together (`Promise.all`, or start the promise early and await late).
- **No streaming.** Without `loading.tsx` or `<Suspense>` boundaries the user sees nothing until the slowest query finishes. Streaming puts the shell on screen while slow parts load.
- **Client boundary too high.** `"use client"` at the top of a layout or page ships that whole subtree and its imports to the browser and hydrates it. Interactive leaves should be client components; the rest stays on the server.
- **Heavy client libraries** (charts, editors, maps, date libraries) imported eagerly instead of loaded with `next/dynamic` when needed.
Also common: the LCP image not using `next/image` with priority, fonts loaded without `next/font`, and middleware doing slow work on every request.
</context>

<task>
Speed up this page: {{page}}{{#next_version}} (Next.js {{next_version}}){{/next_version}}

1. Read `package.json` for the exact Next.js and React versions, then the route's `layout.tsx` files, `page.tsx`, `loading.tsx`, the data-fetching functions it calls, `middleware.ts` and `next.config.*`.
2. Get a baseline: run a production build (`next build`) and record how the route is classified and its first-load JS size. If the user gave TTFB or LCP numbers, record them; otherwise say how to measure (production build, server timing logs per fetch, browser Performance panel).
3. Diagnose in this order and cite file and line for each finding: what makes the route dynamic and whether it needs to be; fetch waterfalls and their per-call latency; missing Suspense or loading boundaries; where `"use client"` sits and what it pulls in; large client-side imports; LCP image and font handling; middleware cost.
4. Fix the top causes with the smallest correct change: parallelise independent fetches; cache or revalidate data that is not per-user, using the mechanism the installed version supports; move per-user reads below a Suspense boundary so the rest can be static or streamed; push `"use client"` down to the interactive leaves; lazy-load heavy client widgets.
5. Rebuild and compare route classification, first-load JS and any timing you can measure. Run the existing tests and type check.
</task>

<constraints>
- Never cache per-user or permission-dependent data in a shared cache. State, for each cache you add, who can see the cached value and how it is invalidated.
- Do not change caching semantics the product relies on (fresh prices, stock, auth state) without saying so in the report.
- Name APIs only as they exist in the installed version; mark anything you are unsure about [CHECK DOCS].
- Do not rewrite the page into a different architecture; fix the causes found.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Route classification, first-load JS and timings before the change.
## Diagnosis
Ranked causes, each with file:line and evidence.
## Changes
One line per file: `path`, what changed and why.
## Results
Before and after for the same measurements, plus tests and type check results.
## Not changed
Further options with their trade-offs.
</output_format>
