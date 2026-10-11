---
schema: 1
id: propagate-locale-through-services
kind: prompt
title: Propagate the user's locale through services
description: Carries the user's locale and time zone through API calls, background jobs, queues, events and microservices, with locale-aware cache keys, so every message, export and email uses the right language.
category: localization
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, architect]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff, code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [request-context, background-jobs, cache-keys, distributed-systems, time-zones]
pairs_with:
  prompts: [localize-server-sent-messages, design-localized-api-errors, design-locale-detection-and-routing]
args:
  - name: system
    description: Services and languages, how requests enter (gateway, BFF), queues and job systems, event bus, caches and CDN, and where user-facing text is generated today.
    type: text
    required: true
  - name: symptoms
    description: Bugs seen, for example emails in the wrong language or cached pages mixing languages.
    type: text
output_contract:
  format: markdown
  sections: [Baseline, Map, Rules, Context propagation, "Jobs, queues and events", Caches, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Locale bugs in distributed systems come from the locale being lost or replaced along the way. The edge resolves it, then an internal call drops the header, a worker renders with the process default (the JVM default locale, `LANG` in the container, or English), a thread pool or async boundary loses thread-local context, or a cache stores the German page under a key without the locale and serves it to everyone. The right source also depends on who will read the output: text shown back to the requester uses the request locale, while a message to another person (a notification to a seller, an email to an invitee, a scheduled report) must use the recipient's stored locale and time zone at send time, not the requester's. Locale must therefore travel explicitly: a normalised BCP 47 tag and IANA time zone in request context, in internal call headers or metadata, and in job and event payloads only where the job is about the requester. Caches and CDNs must vary on locale (or keep locale out of shared responses). Machine-readable outputs (APIs for other systems, CSV for import) should not be localised at all unless asked.
</context>

<task>
Make the user's locale reach every place that produces user-facing output in:

{{system}}

{{#symptoms}}Symptoms: {{symptoms}}{{/symptoms}}

1. Run the tests and record the baseline. Stop and report if they fail.
2. Map: trace where the locale is resolved, every hop (internal HTTP or gRPC calls, queues, scheduled jobs, event consumers), every place user-facing text, emails, notifications, PDFs or exports are generated, and every cache in the path. For each, note where the locale comes from today, or that it falls back to a process default.
3. Rules: write the rule per output type: requester-facing output uses the request locale; recipient-facing output uses the recipient's stored locale and time zone looked up at send time; machine-readable output is locale-neutral. Note any output where the right rule is unclear.
4. Context propagation: put the normalised locale and time zone in request context at the edge (the language's context mechanism: async-local storage, context variables, request-scoped beans, `context.Context`), forward them on internal calls in a header or metadata field, read them back in each service, and restore them across thread pools and async boundaries. Set every service's default locale explicitly so a missing value is visible, not silently English or German.
5. Jobs, queues and events: add the locale to job payloads only for requester-facing jobs; for recipient-facing jobs, pass the recipient ID and look up preferences at send time. Version the payload schema if needed so old messages still process.
6. Caches: add locale (and time zone where output depends on it) to cache keys for localised content, set `Vary` or separate cache keys at the CDN, and keep shared API responses locale-neutral where possible.
7. Implement for the highest-impact paths from the map (the ones matching the symptoms first), with the smallest changes.
8. Tests: an end-to-end or integration test per path that starts a request in a non-default locale and asserts the output language and time zone downstream, a recipient-locale test where requester and recipient differ, and a cache test where two locales request the same resource.
9. Run the tests and report results, including paths mapped but not yet changed.
</task>

<constraints>
- Never rely on a process or JVM default locale for user-facing output.
- Do not put locale in shared cache entries without including it in the key.
- Do not send personal data beyond locale and time zone in propagation headers or tracing baggage.
- Do not change deployment configuration directly; list required changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tests before changes.

## Map
| Hop or output | Locale source today | Risk | Rule |

## Rules
Requester, recipient and machine-readable rules, and unclear cases.

## Context propagation
Edge, internal calls, async boundaries and defaults.

## Jobs, queues and events
Payload and lookup changes.

## Caches
Key and Vary changes.

## Changes
The diff for the paths changed.

## Tests
Tests added.

## Verification
Commands, results and paths still to change.
</output_format>
