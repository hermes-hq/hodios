---
schema: 1
id: upgrade-nextjs-major-version
kind: prompt
title: Upgrade Next.js to a new major version
description: Upgrades a Next.js app across major versions, handling async request APIs, changed caching defaults, renamed config, the bundler switch and React version, with the official codemods.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [breaking-changes, codemods, caching-defaults, turbopack]
pairs_with:
  prompts: [migrate-pages-router-to-app-router, upgrade-react-major-version, fix-nextjs-app-router-caching]
args:
  - name: target_version
    description: The Next.js major version to move to.
    type: string
    default: "the latest stable major"
  - name: project
    description: Current Next.js version, App Router or Pages Router or both, hosting (Vercel, self-hosted, static export), custom webpack config, middleware use.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Breaking changes that apply, Changes made, Caching behaviour, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Next.js majors change behaviour more than they change syntax, and the behavioural changes do not fail the build. Version 15 made `cookies()`, `headers()`, `draftMode()`, `params` and `searchParams` asynchronous (a codemod handles most of it, and leaves `UnsafeUnwrapped` casts or comments where it could not), stopped caching `fetch` requests and GET route handlers by default, and set the client router cache to not reuse page segments; it also required React 19 for the App Router. Version 16 made Turbopack the default bundler for dev and build, renamed `middleware` to `proxy`, removed the temporary synchronous access to request APIs and removed `next lint`. A custom `webpack()` function in `next.config` is the usual reason the bundler switch fails. Config keys get renamed between majors (for example `experimental.serverComponentsExternalPackages` became `serverExternalPackages`). Because caching defaults change silently, an upgrade that passes every test can still serve stale data or hit the backend far more often in production, so the caching intent of each data fetch has to be checked by hand.
</context>

<task>
Upgrade Next.js to {{target_version}}.
{{#project}}
About the project:
{{project}}
{{/project}}

1. Record the current `next`, `react`, `react-dom` and `eslint-config-next` versions, the router(s) in use, `next.config` contents, middleware, custom webpack config, and the Node.js version used in CI and production.
2. Run `next build`, type check, lint and tests; record the results and the build output's route table (static, dynamic, ISR) as the baseline.
3. Get the official Next.js upgrade guide for each major between current and target. Fetch it if you can; otherwise ask the user to paste it and stop. Go one major at a time.
4. Run the official Next.js upgrade codemod for the target, then search for what it left behind (unwrapped casts, comments it inserted, sync uses of request APIs) and fix each properly with `await` or `use()`.
5. Upgrade React and the React types to the version the target requires; check the libraries that depend on them.
6. Migrate renamed or removed config keys. If the target changes the default bundler, check whether a custom `webpack()` function or webpack-only loaders exist; port them or opt out explicitly and say so.
7. Inventory every data fetch, route handler and server action, and state its intended caching (static, revalidated every N seconds, per request). Where the new defaults change that, set it explicitly (`cache`, `revalidate`, `dynamic`, or the target's caching directives).
8. Run the baseline checks again and compare the route table: any route that moved between static and dynamic must be explained.
9. Start the production build locally and check the main pages, auth, middleware or proxy behaviour, and images.
</task>

<constraints>
- Do not leave codemod placeholders (`UnsafeUnwrapped`, inserted TODO comments) in place and call the upgrade done.
- Do not assume caching is fine because tests pass; state the caching intent for each fetch you changed.
- Do not change hosting, routing architecture or data fetching patterns beyond what the upgrade needs. Moving from Pages to App Router is a separate job.
- If the deployment platform or Node.js version must change, say so and ask before changing CI or deploy config.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions, routers, config highlights, baseline results and route table summary.
## Breaking changes that apply
Table: change, where it hits this app, fix.
## Changes made
Codemod output reviewed, manual fixes, config changes, dependency bumps.
## Caching behaviour
Table: route or fetch, behaviour before, behaviour now, explicit setting added.
## Verification
Checks before and after, route table differences explained, manual checks done.
</output_format>
