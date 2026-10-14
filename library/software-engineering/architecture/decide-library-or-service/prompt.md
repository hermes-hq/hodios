---
schema: 1
id: decide-library-or-service
kind: prompt
title: Decide library, service or sidecar
description: Decides whether shared functionality should be a library, a service or a sidecar, weighing versioning, latency, failure modes, ownership and deploy coupling.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, tech-lead, architect]
requires: [none]
inputs: [text, repo]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shared-code, service-design, sidecar, versioning, deploy-coupling, trade-offs]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [extract-shared-package, find-service-boundaries]
args:
  - name: capability
    description: The functionality to share (for example auth checks, pricing rules, PDF generation, feature flags, rate limiting), its consumers, languages, and how often it changes.
    type: text
    required: true
  - name: context
    description: Team ownership, current deployment setup, latency budget, and any past problems with the current approach.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Comparison, Design notes for the choice, Migration, Revisit when]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shared logic can live in three places, each with a different failure profile. A library runs in-process: no network hop, no new thing to operate, but every consumer must upgrade to get a fix, so versions drift and urgent changes (a pricing rule, a security fix) roll out slowly; it also needs one implementation per language. A service gives one deployed version and immediate rollout, at the cost of a network call on every use, a new dependency that can be down or slow, and an API contract to keep compatible. A sidecar runs next to each instance (common for proxies, auth, rate limiting and telemetry) and is language-neutral without a remote hop, but adds operational machinery and resource cost per instance. The deciding questions are: must every consumer change behaviour at the same moment; how hot is the call path; how many languages consume it; who owns it; and how does the caller behave when it fails. Pure functions and data transformations are usually libraries; things that need central state, secrets or immediate consistency are usually services. Sometimes the honest answer is that a little duplication is cheaper than either.
</context>

<task>
<capability>
{{capability}}
</capability>
{{#context}}
Context: {{context}}
{{/context}}

1. If a repository is available, find how the capability is implemented today and how many consumers and copies exist. State what you checked.
2. Answer the deciding questions: simultaneous rollout needed, call frequency and latency budget, number of consumer languages, need for central state or secrets, ownership, and failure behaviour for callers.
3. Compare library, service and sidecar on those factors, and consider keeping it duplicated if the logic is small and stable.
4. Recommend one with the reason.
5. Give design notes: for a library, a small public API, semantic versioning and an upgrade policy; for a service, the API, timeouts, retries, caching and fallback when it is down; for a sidecar, resource limits, rollout, and local interface.
6. Describe moving consumers over one at a time, and when to revisit.
</task>

<constraints>
- Always state what happens to callers when a service or sidecar is unavailable.
- Do not recommend a service for pure, rarely changing logic without a reason such as central state or immediate rollout.
- Do not invent tool or platform features; describe the mechanism.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Library, service, sidecar or keep duplicated, with the main reason, in at most five lines.
## Comparison
Table: factor (consistency of rollout, latency, failure modes, language support, ownership, versioning, operations), library, service, sidecar.
## Design notes for the choice
API shape, versioning or compatibility policy, and failure handling.
## Migration
How consumers move over, one at a time.
## Revisit when
Signals that would change the decision.
</output_format>
