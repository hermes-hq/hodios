---
schema: 1
id: set-up-nextjs-i18n
kind: prompt
title: Set up i18n in a Next.js App Router app
description: Sets up internationalisation in a Next.js App Router app with locale routing, middleware, server and client component messages, localized metadata and static rendering kept intact.
category: localization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [nextjs]
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
depth: specific
tags: [app-router, next-intl, locale-routing, server-components, static-rendering]
pairs_with:
  prompts: [design-locale-detection-and-routing, extract-ui-strings, choose-i18n-library]
args:
  - name: project
    description: Next.js version, router (App Router, or a mix with Pages Router), deployment target, and any i18n code already present.
    type: text
    required: true
  - name: locales
    description: Locales to support as BCP 47 tags, with the default locale first, for example "en, de, pt-BR".
    type: string
    required: true
  - name: url_strategy
    description: How the locale appears in URLs.
    type: enum
    enum: [prefix-all, prefix-except-default, domains, no-prefix]
    default: prefix-except-default
  - name: library
    description: The i18n library to use if already decided, for example next-intl. If empty, use the one already installed, or next-intl.
    type: string
output_contract:
  format: markdown
  sections: [Baseline, Setup, Routing and middleware, Messages in server and client components, Metadata and static rendering, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The App Router has no built-in i18n routing: the `i18n` key in `next.config` only works for the Pages Router, and copying it into an App Router project silently does nothing. Locale routing is done with a dynamic `[locale]` segment at the top of `app/` plus middleware (renamed `proxy` in recent Next.js versions; check the installed version) that negotiates the locale and redirects or rewrites. The common failures: a middleware matcher that also catches `/_next`, `/api` and static files, which breaks assets and API routes; reading `headers()` or cookies to find the locale inside pages, which turns every route dynamic and loses static rendering; no `generateStaticParams` for the locale segment; shipping the whole catalog to the browser by wrapping the app in a client provider with every message; `<html lang>` left as the default; plain `next/link` and `redirect` that drop the locale prefix; server and client rendering dates in different time zones, which causes hydration mismatches; and unknown locales in the URL rendering the default language instead of a 404. Libraries such as next-intl handle most of this when wired correctly (request config, locale-aware navigation helpers, a request-level locale setter for static rendering).
</context>

<task>
Set up internationalisation for this Next.js project:

{{project}}

Locales: {{locales}}. URL strategy: {{url_strategy}}.
{{#library}}Library: {{library}}.{{/library}}

1. Run the build and tests and record the baseline, including which routes are static and which are dynamic in the build output. If the build fails, stop and report.
2. Read the existing layout tree, any middleware, `next.config`, and any i18n code. Reuse an installed i18n library rather than adding a second one. If the project still uses the Pages Router for some routes, say how those routes get their locale and do not convert them.
3. Add the library and a single routing config (locales, default locale, prefix mode) that middleware, navigation helpers and request config all import, so the locale list is defined once.
4. Move routes under `app/[locale]/`, set `<html lang>` (and `dir` for right-to-left locales) in the locale layout, call `notFound()` for unsupported locales, and add `generateStaticParams` for the locale segment.
5. Add middleware that negotiates the locale from the URL, then a stored cookie, then `Accept-Language`, using the library's helper. Give it a matcher that excludes `/api`, `/_next`, `/_vercel` if relevant, and any path with a file extension. Do not redirect bots or API calls into a locale.
6. Messages: one catalog per locale (JSON or the library's format), loaded on the server in the request config. In server components use the server API. In client components pass only the namespaces those components need to the client provider; do not send the whole catalog to the browser.
7. Use the library's locale-aware `Link`, `redirect`, `useRouter` and `usePathname` everywhere links are built, and add a language switcher that keeps the current path.
8. Static rendering: set the request locale in each layout and page that should stay static, and set an explicit time zone and `now` handling so server and client format dates identically.
9. Metadata: localize titles and descriptions in `generateMetadata`, and add `alternates.languages` (hreflang) and a canonical URL per locale.
10. Move a small, representative set of strings (the root layout, one page, one client component) into the catalogs to prove the setup. List the remaining hard-coded strings for a later extraction pass; do not extract everything now.
11. Run the build and tests again. Compare the static and dynamic route list with the baseline, request a few URLs per locale (prefixed, unprefixed, unknown locale, an asset, an API route) and report the results.
</task>

<constraints>
- Do not use the Pages Router `i18n` config in an App Router project.
- Do not read `headers()` or cookies in pages or layouts to detect the locale; detection belongs in middleware.
- No route that was static in the baseline may become dynamic without a stated reason.
- Do not invent translations; new locale catalogs start as copies of the default with keys marked untranslated, or empty with fallback, whichever the library supports.
- Check the installed library's documentation and version for exact API names before writing code; APIs changed between major versions.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Build, tests and the static or dynamic route list before changes.

## Setup
Library, version, the routing config and the request config.

## Routing and middleware
The `[locale]` layout, middleware and matcher, and navigation helpers.

## Messages in server and client components
How catalogs load, and which namespaces reach the client.

## Metadata and static rendering
`generateMetadata`, hreflang alternates, `generateStaticParams` and request-locale calls.

## Verification
Commands and URLs tried, with real results, and the route list compared with the baseline.

## Follow-ups
Remaining hard-coded strings, Pages Router routes, and decisions for the team.
</output_format>
