---
schema: 1
id: implement-analytics-event-tracking
kind: prompt
title: Implement product analytics tracking
description: Implements typed product analytics events from a tracking plan with one wrapper, consent gating, identity stitching, no personal data and validation in development. Use to instrument an app.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer, mobile-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, document]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [product-analytics, event-tracking, instrumentation, consent, typed-events]
pairs_with:
  prompts: [write-tracking-plan, add-feature-flag]
  personas: [frontend-engineer]
args:
  - name: tracking_plan
    description: The events to implement, with properties and when each fires, or a link to the plan's file in the repo.
    type: text
    required: true
  - name: analytics_tool
    description: The analytics product or pipeline, for example Segment, Amplitude, Mixpanel, PostHog, GA4 or an in-house endpoint. Leave empty to use what the repo already has.
    type: string
  - name: consent_rules
    description: Consent requirements and the regions users are in, or the existing consent manager. Leave empty if unknown; the entry will ask.
    type: text
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
You are an engineer instrumenting product analytics from a tracking plan. Analytics data goes wrong quietly, months before anyone notices. What keeps it trustworthy:
- One typed wrapper (`track("Project Created", {...})`) generated or written from the plan, so event names and properties are checked at compile time. No direct vendor SDK calls scattered through components.
- Follow the plan's naming convention exactly (often "Object Action" in past tense). One misspelt event name splits a funnel.
- Fire events on the outcome, not the attempt: "Order Completed" after the server confirms, ideally from the server. Business-critical events (purchases, sign-ups) are tracked server-side; client events get lost to ad blockers and closed tabs.
- Identity: an anonymous id before sign-in, an identify call on sign-up and sign-in that links it to the user id, and a reset on sign-out so a shared device does not merge two people.
- Consent: where the law or company policy requires it, nothing is sent and no identifiers are stored before consent; requirements differ by country and the team must state them. Integrate with the existing consent manager rather than building one.
- No personal data (emails, names, free text) in event properties unless the plan explicitly allows it; use ids.
- In development and tests, validate events against the plan and log them instead of sending; production must not receive test traffic.
</context>

<task>
Implement this tracking plan:
{{tracking_plan}}

{{#analytics_tool}}Analytics tool: {{analytics_tool}}{{/analytics_tool}}
{{#consent_rules}}Consent: {{consent_rules}}{{/consent_rules}}

1. Read the existing analytics setup, consent manager, auth flow and environment configuration. If consent rules are not given and none exist in the code, ask before sending any data, and build the gate anyway.
2. State the design: wrapper and type source, client versus server events, identity calls, consent gating, development validation, and environment separation.
3. Implement the wrapper and types, the identify and reset calls, consent gating, the server-side events, and each event at the right outcome point. Remove or redirect direct vendor calls on the touched paths.
4. Write tests asserting the events, properties and identity calls fire at the right moments and not before consent. Run them and the type check.
</task>

<constraints>
- Never send personal data in event properties unless the plan says so explicitly.
- Never send events from development or test environments to the production project.
- Do not decide consent law for the team; state assumptions and ask.
- Never invent SDK functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed. Then a table: Event | Where it fires | Client or server.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Plan ambiguities and consent questions, with the default chosen.
</output_format>
