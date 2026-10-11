---
schema: 1
id: configure-cdn-caching
kind: prompt
title: Configure CDN caching rules
description: Writes CDN cache rules and origin Cache-Control headers per route, with cache keys, stale-while-revalidate, personalised-content safety, a purge strategy and a hit-ratio check.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, backend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, table]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cdn, cache-control, cache-keys, cache-purging, edge-caching]
pairs_with:
  prompts: [plan-caching-strategy, deploy-static-site-to-cdn, fix-stale-cache-bug]
args:
  - name: site
    description: The site or API behind the CDN (routes, which are personalised or logged-in, how often content changes), the CDN in use and the current hit ratio if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Route policy, Origin headers, CDN rules, Purging, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CDN caching goes wrong in two directions. Too cautious, and every request reaches the origin because the cache key includes every query string, cookies or the full `Vary` header, so the hit ratio sits near zero. Too eager, and one user's personalised page or `Set-Cookie` response is served to everyone, which is a data leak, not a performance bug. Getting it right means classifying routes: immutable assets, public pages that can be stale for a short time, public API responses, and anything personalised or authenticated, which must not be shared-cached. `s-maxage` lets the CDN cache longer than browsers; `stale-while-revalidate` and `stale-if-error` keep pages fast and up during origin trouble. Long lifetimes need a purge plan: purge by tag or surrogate key where the CDN supports it, by URL otherwise, and never rely on purge-everything as the normal release step.
</context>

<task>
Configure CDN caching for:
<site>
{{site}}
</site>

1. Read the code and config: framework routing, where responses set `Cache-Control`, `Vary` and `Set-Cookie`, authentication middleware, existing CDN configuration files, and static asset hashing.
2. Classify every route group: immutable asset, public HTML, public API, personalised or authenticated, never cache (writes, checkout, admin). Flag routes whose classification is unclear and ask.
3. Set origin headers per class: long `max-age` with `immutable` for hashed assets; `s-maxage` with `stale-while-revalidate` and `stale-if-error` for public HTML and API; `private, no-store` or `no-cache` for personalised responses. Make the app send these headers, so the policy lives with the code.
4. Cache key: include only the query parameters that change the response; strip tracking parameters; never key on all cookies; keep `Vary` minimal (for example `Accept-Encoding`).
5. Guardrails: the CDN must bypass the cache for requests with session cookies or `Authorization`, and must not cache responses that set cookies.
6. Purging: tag or surrogate-key purges on content changes where supported, URL purges otherwise, and what the release process purges.
7. Write the CDN configuration in its native form (rules file, infrastructure code or worker) and the header changes in the app.
8. Run the app's tests and any config validation available. Give the commands to check headers and cache status on sample routes, and how to measure hit ratio before and after.
</task>

<constraints>
- Never allow shared caching of authenticated or personalised responses.
- Do not invent CDN rule syntax; use the CDN's documented feature names and say when unsure.
- Do not claim a hit-ratio improvement without measurement.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Route policy
A table: route pattern, class, browser lifetime, CDN lifetime, stale settings, cache key.

## Origin headers
The code changes that set headers, as diffs.

## CDN rules
The CDN configuration with path and contents.

## Purging
What gets purged when, and how.

## Verify
Test results, header checks and how to measure hit ratio.

## Follow-ups
Routes left unclassified and origin changes needed. "None" if empty.
</output_format>
