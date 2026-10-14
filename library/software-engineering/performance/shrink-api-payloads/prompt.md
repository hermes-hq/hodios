---
schema: 1
id: shrink-api-payloads
kind: prompt
title: Shrink slow API responses
description: Cuts API response size and time per endpoint by removing over-fetching, adding field selection and pagination limits, fixing serialization cost and enabling compression, measured on real requests.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [backend-engineer, fullstack-engineer, mobile-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [rest-api, payload-size, compression, serialization, pagination]
pairs_with:
  prompts: [configure-cdn-caching, fix-n-plus-one-queries, improve-web-vitals]
  personas: [performance-engineer]
args:
  - name: target
    description: The endpoints that are slow or heavy, with response sizes and times if known, and the clients that call them (web, mobile, other services).
    type: text
    required: true
  - name: evidence
    description: Sample responses, size measurements, APM traces or client complaints.
    type: text
output_contract:
  format: markdown
  sections: [Result, Findings per endpoint, Changes, Compatibility, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Large responses cost server time to build and serialise, network time (much worse on mobile), and client time to parse. The usual causes: returning whole database models when the screen needs a few fields, nesting full related objects instead of ids or summaries, unbounded list endpoints, embedding base64 images or large text blobs, duplicated data repeated in every item, and verbose serialization (nulls, pretty-printing in production). Compression (gzip or brotli) typically shrinks JSON several times, but it is often missing between proxy and app or disabled for small responses, and it does not fix server-side build time. Field selection (sparse fieldsets, a fields parameter or separate summary and detail endpoints), cursor pagination with a maximum page size, and moving binaries to URLs fix the root causes. Any change to a public API must stay backward compatible for existing clients.
</context>

<task>
Target: {{target}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. For each endpoint, measure on realistic data: uncompressed and compressed response size, time to first byte, serialization time, number of items, and which fields the main clients actually use (read the client code if available).
2. List what is wasted: unused fields, full nested objects, unbounded lists, binary blobs, repeated data, nulls and formatting.
3. Fix in order of size and time saved: trim the default representation or add a summary representation, return ids or compact references for nested objects with an include or expand option, enforce pagination with a maximum page size, move blobs to separate URLs, and select only needed columns in the query that feeds the response.
4. Check compression end to end (the Content-Encoding header the client receives) and enable it at the right layer with a minimum size threshold.
5. Keep compatibility: additive changes or a new parameter or version for anything existing clients depend on; list each breaking risk.
6. Re-measure and run the tests, including contract or schema tests if the project has them.
</task>

<constraints>
- Do not remove or rename fields that existing clients use without a versioning or deprecation plan agreed with the user.
- Report measured sizes and times, both uncompressed and compressed.
- Keep authorization the same: field selection must not expose fields the caller could not see before.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Per endpoint: size and time before and after.
## Findings per endpoint
Waste found, with `path:line` for where the response is built.
## Changes
The diff with one sentence per change.
## Compatibility
What existing clients see, and any deprecation needed.
## Verification
Tests and measurements.
</output_format>
