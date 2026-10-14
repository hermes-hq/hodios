---
schema: 1
id: review-caching-change
kind: prompt
title: Review a caching change
description: Reviews code that adds or changes a cache for wrong keys, missing invalidation, data leaking across users, stampedes, stale reads and caching of errors.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer, frontend-engineer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [caching, invalidation, cache-keys, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [plan-caching-strategy, fix-stale-cache-bug]
args:
  - name: diff
    description: The change, with file paths, plus the code that writes the cached data if it lives elsewhere.
    type: text
    required: true
  - name: context
    description: Cache layer (in-process, Redis, CDN, HTTP headers, client query cache), how fresh the data must be, and whether responses vary by user, tenant, locale or permissions.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Cache inventory, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A cache turns a correctness question into a timing question, and the worst caching bugs are security bugs. The key must include everything the value depends on: user or tenant, permissions or role, locale, currency, feature flags, query parameters, API version. Leave one out and one user sees another's data, often only behind a CDN or shared proxy where `Cache-Control: public` or a missing `Vary` header serves a personalised page to everyone. Other common defects: invalidation only on the write path the author remembered (bulk updates, admin edits, background jobs and other services also write); delete-then-write races where a slow reader repopulates the old value after invalidation; caching errors, empty results or partial data as if they were real; TTLs with no jitter that expire together and stampede the database; unbounded in-process caches that grow until the process runs out of memory; mutable cached objects that callers modify in place; and serialisation changes that make old entries unreadable after a deploy.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Build a cache inventory: each cache the change adds or touches, its layer, key format, value, TTL, size bound and who reads and writes it.
2. Check the key against everything the value depends on: identity, tenant, permissions, locale, flags, parameters, version. Name any dependency missing from the key and who would see whose data.
3. Check HTTP and CDN caching if present: `Cache-Control` public versus private, `Vary`, `Set-Cookie` on cacheable responses, authenticated responses cached at the edge.
4. Check invalidation: list every code path that writes the underlying data (search the repository if you can) and mark which ones invalidate or update the cache. Check for invalidate-then-reload races and for write-through that commits the cache before the database.
5. Check what gets cached: errors, timeouts, nulls, empty lists, partial pages; negative caching without a short TTL.
6. Check load behaviour: synchronised expiry, missing request coalescing or locking on a hot key, cold-start after deploy, unbounded memory.
7. Check safety of values: mutable objects shared across callers, serialisation format changes across deploys, cached secrets or tokens.
8. For each finding, give the sequence of requests that produces the wrong result and the smallest fix.
</task>

<constraints>
- Cross-user or cross-tenant leakage is always critical and listed first.
- Every finding includes the triggering sequence (who requests what, in what order); no generic "consider invalidation".
- Do not assume freshness requirements; if they are not given, ask and state the assumption.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Cache inventory
Table: cache, layer, key, TTL, bound, writers that invalidate, writers that do not.
## Findings
Numbered: severity, `path:line`, triggering sequence, wrong result, fix.
## Tests to add
Bullets: tests for key isolation, invalidation per writer and error caching.
</output_format>
