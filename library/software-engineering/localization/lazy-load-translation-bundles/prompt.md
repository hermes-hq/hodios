---
schema: 1
id: lazy-load-translation-bundles
kind: prompt
title: Lazy-load translation bundles
description: Splits translation catalogs by route or namespace and loads them on demand with long-lived caching, preloading and server-rendered payloads, without flashes of raw keys or a bloated first bundle.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, code, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [code-splitting, message-catalog, caching, web-performance, namespaces]
pairs_with:
  prompts: [reduce-bundle-size, set-up-react-i18next, configure-translation-fallbacks]
args:
  - name: project
    description: Framework, i18n library, build tool, rendering model (SPA, SSR, static), catalog sizes per locale, and how catalogs are loaded today.
    type: text
    required: true
  - name: locales
    description: Locales shipped.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline measurements, Split plan, Loading strategy, Caching, Language switching, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shipping every message for every locale in the main bundle is the default mistake; the opposite mistake is fetching one tiny file per component, creating request waterfalls. The workable middle is one catalog per locale and namespace (a shared `common` plus one per route or feature), loaded alongside the route's code. Messages must be ready before the component renders, or users see raw keys or the fallback language for a moment; that means loading in the route loader or Suspense boundary, not in an effect after first render. Server-rendered pages should embed the messages the page used in the HTML payload so hydration does not fetch them again. Content-hashed file names with long-lived cache headers let catalogs be cached until they change, and a small manifest maps locale and namespace to the hashed URL. Changing language must load the new catalogs first and then switch, so the screen never shows a mix of keys. Network failures need a defined fallback (the default language's catalog) rather than keys.
</context>

<task>
Split and lazy-load the translation catalogs in this project:

{{project}}

Locales: {{locales}}.

1. Measure the baseline: build the app, record the main and route bundle sizes, the size of message data in them, and the number of catalog requests on a cold load of two representative routes. Run the tests.
2. Read how catalogs are imported or fetched today and how the i18n library loads resources.
3. Split plan: group keys into a `common` namespace (layout, navigation, shared components, errors) and one namespace per route or feature, using existing key prefixes where possible. Do not rename keys; if a key is used by several features, keep it in `common`. Show the plan as a table with estimated sizes.
4. Loading strategy: load a route's namespaces in parallel with its code (in the router's loader, a Suspense boundary, or the library's backend), preload the next likely route's namespaces where the router supports it, keep the default locale's `common` namespace in the main bundle if first paint needs it, and for server rendering embed the used messages in the page payload.
5. Caching: emit catalogs with content-hashed file names and a manifest, and state the cache headers they need. If the app is offline-capable, include catalogs in the service worker's cache for the user's locale only.
6. Language switching: load the new locale's needed namespaces, then switch the active language in one step, and fall back to the default language's catalog on a load error, with the error logged.
7. Run the build and tests and repeat the measurements; check that no route renders raw keys on a cold load, a slow network profile and a failed catalog request.
</task>

<constraints>
- Do not rename or delete keys as part of the split.
- Do not change message content.
- No route may render raw keys, even briefly; verify rather than assume.
- Do not change server or CDN configuration directly; give the cache headers for the team to apply.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline measurements
Bundle sizes, message bytes and requests before changes.

## Split plan
| Namespace | Keys | Used by | Est. size |

## Loading strategy
Loader, preload and server payload code.

## Caching
File naming, manifest and required headers.

## Language switching
Switch sequence and error fallback.

## Verification
Measurements after, compared with the baseline, and the cold, slow and failure checks.
</output_format>
