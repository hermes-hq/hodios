---
schema: 1
id: implement-redis-cache-aside
kind: prompt
title: Add Redis cache-aside to a read path
description: Adds cache-aside caching with Redis to one slow read path, with key design, TTLs, invalidation on write, stampede protection and fallback. Use when a hot query or call needs caching.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [redis]
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [caching, cache-aside, cache-invalidation, cache-stampede, ttl]
pairs_with:
  prompts: [plan-caching-strategy, fix-stale-cache-bug]
  personas: [backend-engineer]
args:
  - name: read_path
    description: The endpoint, query or call to cache, how often it is read, how often the data changes, and how stale it may be.
    type: text
    required: true
  - name: stack
    description: Language, framework and Redis client. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer adding cache-aside caching with Redis. Read: try the cache, on a miss load from the source and store with a TTL. Write: update the source of truth, then invalidate. The bugs are in the details:
- Keys: a namespace, a schema version and every input that changes the result, such as `app:v2:product:{tenant}:{id}:{locale}`. Missing the tenant or the user's permissions in the key leaks one user's data to another. Bumping the version segment invalidates everything when the cached shape changes.
- After a write, delete the key rather than writing the new value; concurrent writers setting values can leave the older one last. A reader that loaded stale data just before the delete can still repopulate it, so keep TTLs as the backstop, and for strict paths use versioned keys or a short delayed second delete.
- Add random jitter to TTLs so keys written together do not expire together.
- Stampede: when a hot key expires, many requests hit the database at once. Use a short lock (`SET key NX PX`) so one request rebuilds while others wait briefly or serve stale data, or refresh early before expiry.
- Cache not-found results briefly, so missing ids do not always hit the database.
- Redis is not the source of truth. Use short client timeouts, and if Redis is slow or down, fall back to the database (with a circuit breaker if the database cannot take full load) instead of failing requests.
- Invalidate by exact key or versioned namespace; never use `KEYS` in production, which blocks Redis. Check the eviction policy (`maxmemory-policy`) suits a cache.
- Measure hit rate and latency before and after, or you cannot tell whether caching helped.
</context>

<task>
Add cache-aside caching for:
{{read_path}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the read path and every write path that changes its data, including jobs, admin tools and other services if visible. Find any existing cache helper, Redis client and configuration.
2. State the design: what is cached (the final value, not an ORM object), key format, serialisation, TTL and jitter, invalidation points, stampede protection, negative caching, failure behaviour, metrics.
3. Implement it through the existing cache helper or a small one in the project's style, add invalidation to every write path, and add hit, miss and error metrics if the project has metrics.
4. Write tests for hits, misses, invalidation and Redis failure, then run them and the type check.
</task>

<constraints>
- Never cache per-user or permission-dependent data under a key that omits the user or tenant.
- Do not flush or delete keys in a shared or production Redis.
- If a write path cannot be found or changed (another service writes the data), say so and rely on a TTL the requester accepts.
- Never invent client library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why. Include the key format with an example.
## Changes
One line per file: `path`, what changed. List every write path that now invalidates.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, such as acceptable staleness, with the default chosen.
</output_format>
