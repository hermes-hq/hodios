---
schema: 1
id: set-up-sveltekit-i18n
kind: prompt
title: Set up i18n in a SvelteKit app
description: Sets up i18n in a SvelteKit app with locale-prefixed routes, per-request locale in server hooks, html lang, prerendering for every locale and typed, tree-shaken messages.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [svelte]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [paraglide, server-hooks, prerendering, locale-routing]
pairs_with:
  prompts: [design-locale-detection-and-routing, extract-ui-strings, generate-typed-translation-keys]
args:
  - name: project
    description: SvelteKit and Svelte versions, adapter, which routes are prerendered or server-rendered, and any i18n code already present.
    type: text
    required: true
  - name: locales
    description: Locales to support, default first, for example "en, de, ar".
    type: string
    required: true
  - name: library
    description: The library if already chosen, for example Paraglide JS or svelte-i18n. If empty, use the installed one, or recommend one with reasons before installing.
    type: string
output_contract:
  format: markdown
  sections: [Baseline, Library choice, Locale resolution, Routes and prerendering, Messages, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SvelteKit has no built-in i18n, and the server side is where setups break. Libraries built around a global writable store for the current locale are fine in a browser but on the server that store is shared by every concurrent request, so one user can get another user's language; the locale must be resolved per request in `hooks.server` and kept in `event.locals` or the library's request-scoped mechanism. `app.html` has a fixed `<html lang>`, so it needs a placeholder that `transformPageChunk` replaces per request. Duplicating route folders per language is unmaintainable; the `reroute` hook (or an optional `[[lang]]` segment) maps `/de/about` to the same route. Prerendered pages only exist for URLs the crawler reaches, so other locales need explicit `entries` or links to them. Compiled-message libraries such as Paraglide JS turn each message into a typed function that is tree-shaken per page, while runtime libraries such as svelte-i18n load JSON and format at runtime; the choice affects bundle size, type safety and how translators' files look.
</context>

<task>
Set up i18n in this SvelteKit project:

{{project}}

Locales: {{locales}}.
{{#library}}Library: {{library}}.{{/library}}

1. Run the build, `svelte-check` and tests and record the baseline. Stop and report if they fail.
2. Read `svelte.config`, `hooks.server`, `hooks` (universal), `app.html`, root layouts and any i18n code. Record which routes are prerendered.
3. Library choice: use the installed library, or the one given. If none, recommend one in two sentences (compiled typed messages versus runtime JSON) and use it. Check its current documentation for the setup API; it has changed between major versions.
4. Locale resolution: in `hooks.server`, resolve the locale per request from the URL prefix, then a cookie, then `Accept-Language`, store it in `event.locals` (typed in `app.d.ts`) or the library's request context, and replace an `%lang%` placeholder in `app.html` through `transformPageChunk`, setting `dir` too for right-to-left locales. Never keep the server-side locale in module-level state.
5. Routing: use the `reroute` hook or an optional locale segment so one route tree serves every locale; add a helper that builds localized hrefs, and a language switcher that keeps the current path. Redirect only the bare root by preference, never deep links.
6. Prerendering: make every locale's prerendered pages reachable through `prerender.entries` or crawlable links, and confirm they appear in the build output.
7. Messages: one catalog per locale, loaded or compiled so each page gets only its messages; plurals in the library's ICU or plural syntax for each locale's CLDR categories; dates and numbers through `Intl` with the resolved locale.
8. SEO: in the root layout's `svelte:head`, add hreflang alternates and a canonical link per locale.
9. Convert a small representative slice (layout, one page, one component with a plural) to prove the setup and list remaining hard-coded strings for later.
10. Run the build, `svelte-check` and tests again; request each locale's root and one deep link, check `html lang`, and fire two concurrent requests with different locales against the server build to confirm there is no cross-request leak.
</task>

<constraints>
- No module-level mutable locale on the server.
- Do not duplicate route folders per language.
- Do not invent translations; other locales start untranslated or fall back.
- No route that was prerendered in the baseline may stop being prerendered without a stated reason.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, checks, tests and prerendered routes before changes.

## Library choice
The library, version and reason.

## Locale resolution
`hooks.server`, `app.d.ts`, `app.html` changes.

## Routes and prerendering
Reroute or segment, href helper, switcher, prerender entries.

## Messages
Catalog layout, plural examples and formatting.

## Verification
Commands and requests with real results, including the concurrency check.

## Follow-ups
Remaining strings and decisions.
</output_format>
