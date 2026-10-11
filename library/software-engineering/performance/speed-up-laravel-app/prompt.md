---
schema: 1
id: speed-up-laravel-app
kind: prompt
title: Speed up a slow Laravel app
description: Speeds up a slow Laravel route or app with measured fixes, covering eager loading and withCount, chunked queries, config and route caching, OPcache, queued work and Debugbar or Telescope evidence.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, ship]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [laravel]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, config, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [eloquent, opcache, artisan-optimize, queues, eager-loading]
pairs_with:
  prompts: [fix-n-plus-one-queries, optimize-sql-query, plan-caching-strategy]
  personas: [performance-engineer]
args:
  - name: target
    description: The slow route, page, job or the whole app, with response times and when it is slow.
    type: text
    required: true
  - name: evidence
    description: Debugbar, Telescope, APM or slow query log output, and the deploy setup (PHP version, PHP-FPM or Octane, cache and queue drivers).
    type: text
output_contract:
  format: markdown
  sections: [Result, Where the time goes, Code changes, Deploy and runtime settings, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Laravel speed problems split into request work and framework overhead. Request work is mostly Eloquent: relations accessed in Blade loops or API resources without with() (Model::preventLazyLoading() in development makes these fail loudly), ->count() on relations per row instead of withCount, get() on huge tables instead of chunkById or lazyById, all columns when select would do, and Collection filtering of what the query should filter. Slow work that the user does not need to wait for (emails, PDFs, webhooks, image processing) belongs on a queue. Framework overhead in production comes from missing caches: config:cache, route:cache, view:cache and event:cache (or php artisan optimize), Composer's optimised autoloader, and OPcache enabled with validate_timestamps off and a reset on deploy. config:cache breaks code that calls env() outside config files, which must be checked first. Octane keeps the app in memory, which removes boot cost but makes static and singleton state leak between requests.
</context>

<task>
Speed up: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Measure on realistic data: query count and time, total response time, memory. Use Debugbar or Telescope locally, or DB::listen to count queries. Separate database, PHP and external-call time.
2. Fix Eloquent first: with() for relations used per row, withCount or withSum for aggregates, select for narrow reads, chunkById or lazyById for large batches, whereHas only where it is efficient on this data, and indexes (via a migration) for slow queries whose EXPLAIN shows a scan.
3. Move slow non-essential work to queued jobs, and say what the user sees instead (status, notification).
4. Check production settings: config, route, view and event caching in the deploy script; Composer --optimize-autoloader --no-dev; OPcache on with sensible memory and a reset on deploy; cache and session drivers not on the file system for multi-server setups. Grep for env() calls outside config/ before recommending config:cache.
5. Add caching of computed results only where staleness is acceptable, with explicit keys and invalidation.
6. Re-measure and run the test suite. If lazy loading was the issue, enable preventLazyLoading in non-production environments so it cannot come back unnoticed.
</task>

<constraints>
- Never change production server settings or run deploy commands yourself; give them to the user to apply.
- Do not enable Octane as a fix without listing the state-leak risks found in the code.
- Report measured numbers before and after.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Before and after numbers for the target.
## Where the time goes
Database, PHP, external calls and boot overhead, with offenders at `path:line`.
## Code changes
The diff with one sentence per change.
## Deploy and runtime settings
Commands and settings for the user to apply, each with its reason and any precondition.
## Verification
What was run and the results.
</output_format>
