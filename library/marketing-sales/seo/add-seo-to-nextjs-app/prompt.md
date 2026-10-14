---
schema: 1
id: add-seo-to-nextjs-app
kind: prompt
title: Add SEO to a Next.js app
description: Adds page metadata, canonical URLs, a sitemap, robots rules, Open Graph images and JSON-LD to a Next.js App Router project using its built-in APIs, then verifies the rendered HTML.
category: seo
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: [nextjs, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [app-router, metadata-api, sitemaps, canonical-urls, open-graph, json-ld]
pairs_with:
  prompts: [write-meta-tags, write-schema-markup, audit-javascript-seo]
  rules: [nextjs-rules]
args:
  - name: scope
    description: What to add or fix, for example "full SEO setup", "canonicals and sitemap for the blog", or "product page metadata and Product JSON-LD".
    type: text
    required: true
  - name: site_url
    description: The production origin, for example https://www.example.com, and whether trailing slashes are used. Leave empty to find it in the config or environment.
    type: string
  - name: indexing_rules
    description: Routes or environments that must not be indexed, for example "/account, /search, all preview deployments". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Findings, Changes, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The App Router has built-in SEO primitives, and most SEO bugs in Next.js projects come from not using them or using them inconsistently: a static `metadata` export or an async `generateMetadata` per route segment; `metadataBase` in the root layout so relative canonical and Open Graph URLs resolve to the production origin (a missing or wrong `metadataBase` produces localhost or preview URLs); `alternates.canonical` per page; title templates in layouts; `app/sitemap.ts` returning entries (with `generateSitemaps` for very large sites); `app/robots.ts`; and `opengraph-image` files or generated images. Metadata from nested layouts merges shallowly, so a child that sets `openGraph` replaces the parent's whole `openGraph` object.

Other common mistakes: canonicals that include query strings or differ in trailing slash from the real URL; preview and staging deployments indexable because robots rules ignore the environment; JSON-LD rendered with unescaped user content (escape `<` when serialising into a script tag); dynamic routes whose `generateMetadata` fetches data twice instead of sharing a cached fetch; and `notFound()` not called for missing records, so missing pages return 200. In recent versions, `params` in `generateMetadata` is a Promise that must be awaited.
</context>

<task>
Implement SEO in this Next.js project.

Scope: {{scope}}
{{#site_url}}Site URL: {{site_url}}{{/site_url}}
{{#indexing_rules}}Do not index: {{indexing_rules}}{{/indexing_rules}}

1. Read `package.json` for the Next.js version and router, the root layout, how routes fetch data, existing metadata, any `next-seo` or hand-written head tags, `next.config` (trailing slash, i18n, redirects), and how environments are told apart. Follow existing patterns.
2. **Root setup:** set `metadataBase` from an environment variable with the production origin as the source of truth; add a title template and default description; set default Open Graph and Twitter fields.
3. **Per route:** add `metadata` or `generateMetadata` with a unique title and description, `alternates.canonical` that matches the URL actually served (no tracking parameters, consistent trailing slash), and per-page Open Graph. For dynamic routes, reuse the page's data fetch through the framework's request caching, and call `notFound()` for missing records.
4. **Indexing controls:** add `robots` metadata (`index: false`) to private or utility routes in scope, and make `app/robots.ts` disallow everything on non-production environments while production allows crawling and lists the sitemap. A Disallow stops crawling, not indexing, so also check whether the host already sends `X-Robots-Tag: noindex` or password-protects preview deployments, and add a noindex header for them if not.
5. **Sitemap:** `app/sitemap.ts` listing canonical, indexable URLs only, with `lastModified` from real content dates; split with `generateSitemaps` if there could be more than 50,000 URLs.
6. **Structured data:** where in scope, render JSON-LD in a `<script type="application/ld+json">` in the page component, serialised with `JSON.stringify` and every `<` replaced with `\u003c` (for example `.replace(/</g, '\\u003c')`), built from the same data the page shows.
7. Remove duplicates: old head tags or a library that now conflicts with the Metadata API, once the replacement is in place.
8. Build the project and inspect the rendered HTML of a sample of routes (start the production server and fetch the pages): one title, one canonical with the production origin, correct robots tags, valid JSON. Fetch `/robots.txt` and `/sitemap.xml`. Run the existing tests, type check and lint.
</task>

<constraints>
- Do not change URLs, redirects or routing as part of this work; flag them instead.
- Never noindex or disallow production routes that are not in the user's indexing rules without asking.
- Do not hard-code the production origin in many files; keep one source of truth.
- Keep structured data true to visible content.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
What existed and what was missing or wrong, in bullets.

## Changes
One line per file: `path`, what changed.

## Verification
Commands run and real results, including a sample of rendered head tags.

## Follow-ups
Items flagged but not changed.
</output_format>
