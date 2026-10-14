---
schema: 1
id: move-site-off-gatsby
kind: prompt
title: Move a Gatsby site to another framework
description: Moves a Gatsby site to Astro or Next.js, replacing the GraphQL data layer, plugins and image handling while keeping every URL, SEO tag and removing the old service worker safely.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [frontend-engineer, fullstack-engineer]
stack: [astro, nextjs]
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
tags: [gatsby, static-site, url-parity, service-worker, content-collections]
pairs_with:
  prompts: [switch-build-tool, upgrade-nextjs-major-version, plan-incremental-migration]
  personas: [frontend-engineer]
args:
  - name: site
    description: Site type (blog, docs, marketing), content sources (Markdown, MDX, CMS), Gatsby plugins in use, page count, and hosting.
    type: text
    required: true
  - name: target
    description: Astro or Next.js, if already chosen.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Inventory, Target mapping, URL parity, Changes made, Launch checks, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gatsby sites are hard to move because so much happens in plugins and the GraphQL data layer. Source plugins load files and CMS content into one GraphQL schema, transformer plugins turn Markdown and images into nodes, and `gatsby-node` creates pages from queries. In Astro, content collections with typed schemas replace file sources; in Next.js, data is read directly at build time with static params. `gatsby-plugin-image` has equivalents in each target but different markup and props. Head management, `wrapRootElement` and other browser and SSR APIs move into layouts. The search value of a site lives in its URLs, so the old URL list (from the sitemap or build output) must map one to one, including trailing slashes, which Gatsby adds by default, plus RSS feeds and canonical tags. The trap people miss is `gatsby-plugin-offline`: it installed a service worker in visitors' browsers that keeps serving the old cached site after the move, so the new site must ship a self-unregistering service worker at the same path. A CMS source plugin may hide preview or incremental build features the team relies on.
</context>

<task>
Site: {{site}}
{{#target}}Target: {{target}}{{/target}}

1. Read `gatsby-config`, `gatsby-node`, `gatsby-browser`, `gatsby-ssr`, page templates and GraphQL queries. Build the inventory, and export the full URL list from the current build or sitemap.
2. If the target is not chosen, recommend Astro or Next.js for this site and say why (content-heavy and mostly static suits Astro; heavy app-like interactivity suits Next.js).
3. Map each plugin and API to the target and list anything without an equivalent.
4. Port content loading first, then layouts and head tags, then page templates, keeping slugs generated the same way. Port images with the target's image component.
5. Keep URL parity: match the trailing slash policy, add redirects for any change, and keep RSS, sitemap, canonical and Open Graph tags.
6. If the old site used an offline plugin, add a service worker at the same path that unregisters itself and clears caches. Diff the old and new URL lists and spot-check pages, then check analytics and performance before switching hosting.
</task>

<constraints>
- Do not change URLs or slugs unless the user asks; when they do, add redirects for each.
- Do not delete the old site or hosting configuration; the user switches traffic.
- Keep the visual design unchanged during the move unless asked.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Pages, data sources and GraphQL queries, plugins, gatsby-node and browser or SSR APIs in use.
## Target mapping
Table: Gatsby feature or plugin | target equivalent | notes.
## URL parity
How every old URL maps to a new one, trailing slash policy, redirects.
## Changes made
Content, layouts, images, data loading, head tags.
## Launch checks
URL diff, service worker removal, SEO tags, analytics, performance.
## Remaining risks
Bullets, or "None".
</output_format>
