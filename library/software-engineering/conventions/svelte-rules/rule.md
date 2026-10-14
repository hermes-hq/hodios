---
schema: 1
id: svelte-rules
kind: rule
title: Svelte and SvelteKit rules
description: Standing rules for Svelte and SvelteKit code covering runes or stores consistently, load functions, form actions, server-only code and secrets, progressive enhancement and accessible components.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [svelte]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [runes, load-functions, form-actions, progressive-enhancement]
applies_to: ["**/*.svelte", "src/**/*.ts", "src/**/*.js", "svelte.config.js"]
pairs_with:
  rules: [typescript-strict-rules, frontend-accessibility-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Svelte or SvelteKit code in this project:

**Know the project first**
- Check the Svelte and SvelteKit versions in `package.json`. In Svelte 5 projects use runes (`$state`, `$derived`, `$effect`, `$props`); in Svelte 4 projects use `let`, `$:` and stores. Do not mix the two models in one component, and follow the codebase if it is mid-migration.
- Keep TypeScript on (`lang="ts"`) where the project uses it, and pass `svelte-check` without new errors.

**Components**
- Keep components small, with props typed. Derive values with `$derived` (or `$:`) instead of syncing state in effects. Use `$effect` only for side effects that touch the outside world (DOM APIs, timers, subscriptions), and return a cleanup function when it sets something up.
- Key every `{#each}` block over data that can change with a stable id.
- Use semantic elements and fix every accessibility warning the compiler reports; do not silence them with ignore comments without a reason.

**Data loading**
- Load page data in `+page.ts` or `+page.server.ts` `load` functions, not in `onMount`. Use `+page.server.ts` for anything that needs secrets, the database or cookies.
- Fetch in universal load functions with the provided `fetch`, so requests are deduplicated and cookies are forwarded correctly.
- Return only the data the page needs; do not send whole database rows or sensitive fields to the client.

**Server code and secrets**
- Import secrets only from `$env/static/private` or `$env/dynamic/private`, and keep server-only modules in `$lib/server` so the build fails if the client imports them.
- Handle mutations with form actions and validate input on the server, so forms work without JavaScript. Add `use:enhance` to improve them when JavaScript is available.
- Return errors with `error()` and `fail()` with the right status codes; never expose stack traces or internal messages.

**Tests**
- Unit test logic with the project's runner (often Vitest) and test pages through user-visible behaviour with Playwright or the configured end-to-end tool.
