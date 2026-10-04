---
schema: 1
id: nextjs-rules
kind: rule
title: Next.js rules
description: Standing rules for Next.js code covering server and client components, data fetching and caching, route handlers, metadata, images and fonts, environment variables and where code runs.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [server-components, app-router, caching, ssr, edge-runtime]
applies_to: ["app/**", "src/app/**", "pages/**", "src/pages/**", "next.config.*", "middleware.*", "proxy.*"]
pairs_with:
  rules: [react-component-rules, typescript-strict-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Next.js project:

**Know the project before you write**
- Read `package.json` for the installed Next.js major version and `next.config.*` for enabled features before using version-specific APIs. Caching defaults, whether request APIs (`params`, `searchParams`, `cookies()`, `headers()`) are async, and the name of the request-interception file have all changed between major versions. Match what this version does; do not write code from an older or newer release.
- Check whether the route lives under `app/` (App Router) or `pages/` (Pages Router) and use that router's APIs only. Do not mix `getServerSideProps` into `app/`, or `"use client"` conventions into `pages/`.

**Server and client components (App Router)**
- Components are server components by default. Add `"use client"` only to the smallest component that needs state, effects, browser APIs or event handlers, and keep it as a leaf. Never mark a layout or page as a client component just to use one hook.
- Pass server-fetched data to client components as serialisable props. Do not pass functions, class instances or database objects across the boundary.
- Never import server-only code (database clients, secrets, file system access) into a client component. Mark such modules with `import "server-only"` when the package is available.
- Pass server components to client components as `children` or props instead of importing them inside the client file.

**Data fetching and caching**
- Fetch data in server components or server functions, close to where it is used, and run independent requests in parallel with `Promise.all` rather than in a waterfall.
- State the caching intent of every fetch or cached function explicitly (static, revalidated on a timer, tagged for on-demand revalidation, or never cached) instead of relying on the version's default. Per-user data is never cached in a shared cache.
- After a mutation, revalidate exactly what changed (`revalidatePath` or `revalidateTag`) in the server action or route handler that made the change.
- Wrap slow sections in `<Suspense>` with a meaningful fallback, and add `loading` and `error` files for route segments that fetch.

**Mutations, server actions and route handlers**
- Treat every server action and route handler as a public HTTP endpoint: authenticate, authorise and validate input with a schema on the server, every time. Hiding a button is not authorisation.
- Use server actions for form mutations from your own UI; use route handlers (`route.ts`) for webhooks, third-party callbacks and endpoints other clients call.
- Return typed results or throw errors that the error boundary handles; never return raw exception messages or stack traces to the client.

**Where code runs**
- Keep the request-interception file (middleware or proxy, depending on version) thin: redirects, rewrites, header and cookie checks. No database queries or heavy libraries there.
- Do not set a route to the edge runtime unless every dependency supports it; Node APIs and most database drivers do not.

**Environment variables**
- Only variables prefixed `NEXT_PUBLIC_` reach the browser, and they are inlined at build time. Never put a secret behind that prefix, and never read a non-public variable in a client component.
- Validate required environment variables once at startup with a schema, and fail with a clear message when one is missing.

**Metadata, images and fonts**
- Set titles, descriptions and Open Graph data with the `metadata` export or `generateMetadata`, not hand-written `<head>` tags. Give every page a unique title.
- Use `next/image` with explicit `width` and `height` (or `fill` with a sized parent) and a real `alt`. Add `priority` only to the largest above-the-fold image. Allow remote image hosts by exact pattern, never a wildcard.
- Load fonts with `next/font` so they are self-hosted and do not shift layout. Do not add font `<link>` tags.

**Before you finish**
- Run the type check, lint and build (`next build`), and fix errors at their cause. A build that only passes in `next dev` is not done.
