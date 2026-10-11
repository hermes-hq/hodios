---
schema: 1
id: design-notification-system
kind: prompt
title: Design a notification system
description: Designs a multi-channel notification backend with event triggers, user preferences, templates, batching and digests, dedupe, delivery tracking and retries.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text, repo]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [notifications, email-delivery, push-notifications, user-preferences, digests, idempotency]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [implement-in-app-notifications, implement-push-notifications, design-event-driven-system]
args:
  - name: requirements
    description: What triggers notifications, which channels (email, push, SMS, in-app, chat), expected volume and any urgency or quiet-hour needs.
    type: text
    required: true
  - name: current_state
    description: How notifications are sent today and what goes wrong (duplicates, spam complaints, missing sends, slow sends).
    type: text
  - name: constraints
    description: Providers already contracted, compliance needs, budget, or team size.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Pipeline, Data model, Preferences and routing, "Batching, dedupe and rate limits", "Delivery, retries and tracking", Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Notification systems fail in three predictable ways: they spam (every event becomes a message), they duplicate (retries without idempotency send the same email twice), and they drop silently (a provider error with no tracking). A sound design separates the domain event ("comment added") from the notification decision (who should hear about it, on which channel, now or in a digest) and from delivery (calling the email, push or SMS provider). The decision step reads user preferences per notification type and channel, quiet hours and time zone, and distinguishes transactional messages users cannot opt out of (password reset, receipts) from engagement ones they can. Each delivery needs an idempotency key derived from the event and recipient. Batching collapses "12 people liked your post" into one message, which matters more for user trust than throughput. Providers bounce, rate limit and expire push tokens, so invalid addresses and tokens must feed back into the user record. Email deliverability depends on sender authentication and unsubscribe handling, which the backend has to support.
</context>

<task>
<requirements>
{{requirements}}
</requirements>
{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. If a repository is available, find where notifications are sent today (direct provider calls inside request handlers are the usual smell) and list them before designing.
2. List notification types with: trigger event, audience, channels, transactional or engagement, urgency, and whether it can be batched.
3. Design the pipeline: domain events published after the transaction commits (outbox or equivalent), a decision worker that resolves recipients and preferences, per-channel delivery workers on a queue, and a delivery log.
4. Define preferences: per type and channel, global unsubscribe, quiet hours in the user's time zone, and the short list of mandatory messages that bypass opt-outs.
5. Define batching and dedupe: idempotency key per recipient and event, collapse windows for noisy types, digest schedules, and per-user rate caps.
6. Define delivery: retries with backoff for transient errors, no retry on permanent failures, handling of bounces, complaints and invalid push tokens, and a status per attempt that support staff can query.
7. Give a rollout path from the current state, starting with the highest-volume or most-complained-about type.
</task>

<constraints>
- Do not send from inside the request transaction; a rollback must not leave a sent message, and a slow provider must not slow the request.
- Do not invent provider limits or pricing; say what to confirm with the provider.
- SMS and marketing email rules differ by country (consent, sender registration, unsubscribe). Flag them as checks, not settled facts.
- Keep the design proportional to the stated volume; do not add a stream processor for a few thousand messages a day.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Five lines: the pipeline shape and the two most important decisions.
## Pipeline
A Mermaid flowchart from domain event to delivery, then one line per stage.
## Data model
Table: record, key fields, purpose (notification, preferences, delivery attempt, template).
## Preferences and routing
Rules for channel selection, opt-outs, quiet hours and mandatory messages.
## Batching, dedupe and rate limits
Concrete rules with windows and keys.
## Delivery, retries and tracking
Retry policy per channel, bounce and invalid token handling, status tracking.
## Rollout
Numbered steps to move from the current state, or "Greenfield".
</output_format>
