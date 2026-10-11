---
schema: 1
id: astro-rules
kind: rule
title: Astro rules
description: Standing rules for Astro sites covering zero JavaScript by default, islands with the right client directive, content collections with schemas, images, routing and static versus server output.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [astro]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [islands, content-collections, static-site, client-directives, partial-hydration]
applies_to: ["src/**/*.astro", "src/content/**", "astro.config.*", "src/**/*.ts"]
pairs_with:
  rules: [typescript-strict-rules, css-rules]
  personas: [frontend-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Astro project:

**Know the setup first**
- Check the Astro version, `astro.config.*` (`output`, adapter, integrations) and which UI framework integrations are installed before writing code. APIs for content collections, actions and server output changed between majors; use what this version documents.
- Follow the existing `src/` layout: pages in `src/pages`, shared layouts in `src/layouts`, components in `src/components`, content in the configured collections.

**Ship no JavaScript unless needed**
- Write components as `.astro` files by default. They render to HTML at build or request time and ship no JavaScript.
- Use a framework component (React, Vue, Svelte and so on) only for parts that need interactivity, and pick the least eager client directive: `client:visible` or `client:idle` for most widgets, `client:media` for responsive-only UI, `client:load` only for above-the-fold controls the user needs at once. Never add `client:only` unless the component cannot render on the server, and say why.
- Keep islands small. Pass only serialisable props; do not hydrate a whole page section to make one button work.
- For small behaviour (toggle, copy button), a `<script>` in the `.astro` component is often enough. Astro bundles and deduplicates it.

**Content**
- Put Markdown and MDX content in content collections with a schema defined with `z` from the content config. Required fields are required in the schema, dates are `z.coerce.date()`, images use the `image()` helper.
- Query with `getCollection` and `getEntry`; filter drafts out in production. Do not import content files with globs when a collection exists.
- Generate dynamic routes for content with `getStaticPaths` in static output, returning `params` and `props` together.

**Images and assets**
- Use the `<Image />` and `<Picture />` components from `astro:assets` for local images so they get sizes, formats and dimensions. Every image has meaningful `alt` text or `alt=""` if decorative.
- Put files that must keep their exact name and path in `public/`; everything processed goes in `src/`.

**Static versus server**
- Keep pages static unless they need per-request data. Opt single routes out of prerendering with `export const prerender = false` and an adapter (Astro 5 static output; `output: 'hybrid'` in Astro 4). Do not switch the whole site to server output for one dynamic page.
- In server routes and endpoints, validate input, read secrets only from server-side environment variables (never `PUBLIC_` ones), and set cache headers deliberately.

**Styling and layout**
- Use scoped `<style>` in components; use `is:global` only for content you do not control (rendered Markdown). Follow the project's CSS approach if it uses Tailwind or a global stylesheet.
- Put `<head>` tags, SEO metadata and canonical URLs in a shared layout with props, not repeated per page.

**Before you finish**
- Run `astro check` and `astro build` (and tests if present). Fix type errors and broken links the build reports. Say what you ran.
