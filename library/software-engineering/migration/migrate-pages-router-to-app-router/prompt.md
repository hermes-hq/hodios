---
schema: 1
id: migrate-pages-router-to-app-router
kind: prompt
title: Migrate from the Pages Router to the App Router
description: Moves a Next.js app from the Pages Router to the App Router route by route, mapping data fetching, layouts, metadata and client boundaries, with a parity check before each old page is deleted.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [app-router, server-components, incremental-migration, data-fetching, layouts]
pairs_with:
  prompts: [plan-incremental-migration, upgrade-major-dependency]
  personas: [migration-engineer]
args:
  - name: scope
    description: Which routes or areas to migrate first, or "all", plus anything unusual about the app (custom server, i18n, auth, CSS-in-JS library).
    type: text
    required: true
  - name: next_version
    description: The Next.js version the app is on or moving to.
    type: string
output_contract:
  format: markdown
  sections: [Inventory, Route order, Per-route mapping, Changes made, Parity check, Remaining routes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The two routers can run side by side in one app, so the migration is incremental: one route moves from `pages/` to `app/`, is checked, and the old file is deleted. The same URL must never exist in both. What breaks is rarely the JSX. It is the model change: components in `app/` are server components by default, so hooks, browser APIs and context providers need a `"use client"` boundary pushed as low as possible; `getServerSideProps`, `getStaticProps` and `getStaticPaths` become async server components, `generateStaticParams` and segment options; `next/head` becomes the Metadata API; `next/router` becomes `next/navigation` (`useRouter`, `usePathname`, `useSearchParams`), whose router has no `query` or `events`; `_app` and `_document` become the root layout. Caching and revalidation defaults have changed between major versions, so the target version's documentation decides them, not memory. Runtime CSS-in-JS libraries need extra setup in server components. API routes can stay in `pages/api` until there is a reason to move them to route handlers.
{{#next_version}}
Next.js version: {{next_version}}
{{/next_version}}
</context>

<task>
Migrate: {{scope}}

1. Inventory `pages/`: every route, its data-fetching method, dynamic segments, use of `next/router` (`query`, `events`, `asPath`), `next/head`, per-page layouts, and what `_app` and `_document` do (providers, global CSS, fonts, analytics, html attributes). Note middleware, `next.config` redirects and rewrites, and i18n config, since i18n routing works differently in `app/`.
2. Build the root layout in `app/` that reproduces `_app` and `_document`: html and body attributes, global CSS, fonts, and providers moved into one small client component.
3. Order the routes: static and simple pages first, then dynamic ones, then pages with auth, forms or heavy client state. Shared layouts move with their first route.
4. For each route, map: data fetching to an async server component or a client fetch with a reason; `getStaticPaths` to `generateStaticParams`; revalidation to the target version's segment options or fetch options; `notFound` and `redirect` returns to the `notFound()` and `redirect()` functions; `next/head` to `metadata` or `generateMetadata`; router usage to `next/navigation`. Mark the smallest component that needs `"use client"`.
5. Move one route, delete its `pages/` file in the same change, run the build and the tests, and load the route.
6. Check parity for that route: HTML output and status codes (200, 404, redirects), metadata and canonical tags, caching behaviour (fresh versus stale data), client navigation and scroll, and that no server-only secret ends up in a client component.
</task>

<constraints>
- Never leave the same path defined in both routers.
- Do not mark whole pages `"use client"` to make errors go away; explain any page that truly needs it.
- Do not state caching or revalidation defaults from memory; read them for the version in use and say which you assumed.
- Keep URLs, status codes and SEO output identical unless the user asks for a change.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: route | data fetching | router or head usage | risk (low, medium, high).
## Route order
Numbered list with the reason for each position.
## Per-route mapping
For each migrated route: old construct to new construct, and where the client boundary sits.
## Changes made
The diff summary per route, with build and test results.
## Parity check
Per route: status codes, metadata, caching and navigation, each pass or fail.
## Remaining routes
What is left, and any blocker (i18n, custom server, a library without server component support).
</output_format>
