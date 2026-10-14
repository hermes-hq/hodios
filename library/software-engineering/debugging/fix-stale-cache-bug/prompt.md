---
schema: 1
id: fix-stale-cache-bug
kind: prompt
title: Fix a stale cache bug
description: Finds which cache layer serves old data after an update, from browser and CDN to app, ORM and memoized values, and fixes its invalidation or headers. Use when users still see the old value.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, frontend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [text, file, config, logs]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [caching, cache-invalidation, http-headers, cdn, stale-data]
pairs_with:
  prompts: [debug-network-request, plan-caching-strategy]
args:
  - name: symptom
    description: What stays stale and for how long, for example "after editing a product price, the product page shows the old price for up to 10 minutes; the admin page is correct".
    type: text
    required: true
  - name: stack_description
    description: The path a read takes, with every cache you know of, for example "browser, Cloudflare, Nginx, Django view with per-view cache, Redis, Postgres". Include cache config, response headers and the code that writes and reads the value if you can.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cache layers on the read path, Which layer is stale, Fix, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who debugs stale data by locating the layer, not by lowering every TTL. A read can pass through many caches, often more than the team listed: the browser HTTP cache, a service worker, a client data library (React Query, SWR, Apollo), a CDN or reverse proxy, a framework page or fragment cache, an application cache such as Redis or Memcached, an in-process memo or `lru_cache` that survives across requests, an ORM session or identity map, a database read replica with lag, and a DNS or connection cache. Each has its own key, lifetime and purge path.

Typical causes: invalidation written for one key while the read uses another (different query parameters, locale, user or version in the key); invalidation that runs before the database commit, so the next read repopulates the cache with old data; `Cache-Control` missing, so browsers and CDNs apply heuristic freshness; a `Vary` header missing or too broad; purge called for one region or one URL variant; a per-process cache in a multi-instance service where only the instance that handled the write is cleared; read-your-writes broken by a lagging replica.

Response headers such as `Age`, `Cache-Control`, `ETag`, `Last-Modified`, `Vary` and the CDN's cache status header tell you which layer answered.
</context>

<task>
Find and fix the stale cache.

Symptom:
{{symptom}}

Read path and caches:
{{stack_description}}

1. List every cache layer on the read path, including the ones the user did not mention but that the stack implies. For each, give its key, its lifetime and how it is invalidated, as far as the input shows; mark unknowns.
2. If the stale layer is not obvious, give the checks that isolate it, cheapest first: compare a request with cache-busting headers or a private window, read `Age` and the CDN cache status header, query the application cache key directly, read from the primary database instead of the replica. Ask for the results and stop.
3. Name the stale layer and the exact reason: wrong key, invalidation before commit, missing purge path, missing headers, per-instance cache, replica lag.
4. Fix it at that layer: invalidate after commit with the same key builder used for reads, purge all URL variants, set explicit `Cache-Control` and `Vary`, use versioned keys or asset fingerprints, move a per-process cache to a shared one or give it a short lifetime, or read from the primary after a write. Show a diff when code or config was given.
5. Give a test that writes, then reads through the real path, and asserts the new value; for HTTP layers, give the header checks to run.
</task>

<constraints>
- Do not propose disabling caching or lowering every TTL as the fix unless the data truly must never be cached; name the trade-off in load and latency if you do.
- Do not invent header values, CDN products or config keys the user did not show; say what to check.
- Watch for caches holding personal data: if the fix touches keys or `Vary`, check that one user's response cannot be served to another.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Cache layers on the read path
Table: Layer | Key | Lifetime | Invalidated by | Known or assumed.
## Which layer is stale
The layer and the reason, or the checks to run if it is not yet known.
## Fix
The change, as a diff or config.
## Test
An automated test and any manual header checks.
</output_format>
