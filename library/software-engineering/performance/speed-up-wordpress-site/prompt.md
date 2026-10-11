---
schema: 1
id: speed-up-wordpress-site
kind: prompt
title: Speed up a WordPress site
description: Speeds up a slow WordPress or WooCommerce site by auditing hosting, caching, plugins, theme, database and media, then ranking fixes by measured gain and safe order.
category: performance
version: 1.0.0
status: incubating
stage: [maintain]
role: [fullstack-engineer, software-engineer]
stack: [wordpress]
requires: [none]
inputs: [url, text, logs]
output: [report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [woocommerce, page-cache, object-cache, plugin-audit, ttfb]
pairs_with:
  prompts: [improve-web-vitals, optimize-images-for-web, tame-third-party-scripts]
  personas: [wordpress-developer]
args:
  - name: site
    description: What you know about the site - hosting type and plan, PHP version, theme or page builder, the plugin list, caching or CDN in use, WooCommerce or not, and what is slow (whole site, admin, checkout, search).
    type: text
    required: true
  - name: measurements
    description: Any numbers you have - PageSpeed Insights or field data, time to first byte for cached and logged-in pages, Query Monitor output, server load.
    type: text
output_contract:
  format: markdown
  sections: [Where the time goes, Ranked fixes, Plugins, Database, Do safely, Measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A slow WordPress site is slow either on the server (time to first byte: PHP and database work for each uncached request) or in the browser (heavy themes, page builders, images, scripts). The first split decides everything. A full-page cache (at the host, a caching plugin or a CDN) makes anonymous pages fast regardless of plugin weight, so if cached TTFB is already low the remaining problem is front-end. Logged-in users, carts, checkout and admin bypass the page cache, so they expose the real PHP cost; that is where a persistent object cache (Redis or Memcached), fewer heavy plugins and a current PHP version matter. Common hidden costs: a bloated `wp_options` table with megabytes of autoloaded data loaded on every request; WP-Cron running on page loads; plugins that run queries or remote HTTP calls on every page; WooCommerce cart fragments AJAX on every page; page builders shipping large CSS and JavaScript on all pages; two caching or optimisation plugins fighting each other; and cheap shared hosting with too few PHP workers. Query Monitor shows slow queries, hooks and HTTP calls per request.
</context>

<task>
Site: {{site}}
{{#measurements}}Measurements: {{measurements}}{{/measurements}}

1. Split the problem: compare TTFB for a cached anonymous page, an uncached or logged-in page, and checkout or admin if relevant, against front-end metrics (LCP, total page weight, script count). If the numbers are missing, say exactly how to get them (PageSpeed Insights, browser Network panel with and without login, Query Monitor) and continue with the likely picture labelled as unconfirmed.
2. Server side: page cache coverage and exclusions, object cache, PHP version, PHP worker count and hosting limits, WP-Cron, slow queries and remote calls shown by Query Monitor.
3. Plugins: from the list, flag known heavy categories (page builders, all-in-one security scanners, related-posts plugins that query on every page, statistics plugins that write to the database on every view, duplicate caching or optimisation plugins). Give a staging procedure to measure each suspect by deactivating it.
4. Database: check autoloaded options size, post revisions, transients and orphaned plugin tables, with read-only queries to run first.
5. Front end: images, fonts, render-blocking CSS and scripts, page-builder assets on pages that do not use them, third-party scripts.
6. Rank fixes by expected gain and risk, and put them in a safe order.
</task>

<constraints>
- Every change happens on staging first with a full backup (files and database) and a tested restore; say this once, clearly, before database cleanups or plugin removals.
- Do not recommend deleting database rows or tables without a read-only query that shows what would be removed.
- Do not tell the user to remove a plugin without saying what feature it provides and checking whether the site depends on it.
- Do not invent plugin names, hosting limits or prices. Recommend categories of tools where the specific product does not matter.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where the time goes
Server versus browser, with the numbers or the measurements still needed.
## Ranked fixes
Table: fix | affects (server/browser, which pages) | expected gain | risk | effort.
## Plugins
Table: plugin | concern | how to test its cost | keep, replace or remove.
## Database
Read-only checks to run, then cleanups with their backups.
## Do safely
The order of work, staging and backup steps.
## Measure
What to re-measure after each step.
</output_format>
