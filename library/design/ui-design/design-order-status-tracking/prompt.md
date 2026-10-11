---
schema: 1
id: design-order-status-tracking
kind: prompt
title: Design an order status tracking screen
description: Designs a status tracking screen for an order, delivery, claim, application or repair, with plain-language stages, estimates, delays, notifications and the next action at each stage.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [status-tracking, order-tracking, progress-stages, delays, where-is-my-order]
pairs_with:
  prompts: [spec-record-status-lifecycle, spec-order-cancellation-and-refunds, design-notification-strategy, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: process_context
    description: What is tracked (order, delivery, insurance claim, application, repair, refund), the internal statuses that exist today, typical durations and variance, what can go wrong, what the customer can do at each stage, and the "where is my..." contacts support receives.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, both]
    default: both
output_contract:
  format: markdown
  sections: [Stage map, Status screen layout, Estimates, Delays and exceptions, Notifications, Actions by stage, Copy, Metrics]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Where is my order?" contacts are usually a design problem: internal statuses ("PENDING_FULFILMENT", "In review L2") leak to customers, long stages show no movement so people assume something is broken, estimates are a single date that silently passes, and delays are discovered by the customer before the company says anything. A good status screen translates the internal process into a few stages the customer understands, shows when the current stage started and what normally happens next, gives a range and updates it, explains delays proactively with a reason and new estimate, and puts the one useful action at each stage on the screen.
</context>

<task>
<process_context>
{{process_context}}
</process_context>

Design for {{platform}}. If the process and its statuses are unknown, ask and stop. Other gaps become assumptions marked [confirm].

1. **Stage map.** Map each internal status to one of four to six customer-facing stages, named from the customer's point of view. Show which internal statuses are hidden and which become exceptions.
2. **Status screen layout.** Top to bottom: current stage in plain words, estimate, progress indicator with completed and upcoming stages, the item summary, the timeline of events with times, next action, and help. How the screen is reached without logging in (link with token, order number plus email) if relevant.
3. **Estimates.** Range versus date, how confidence is shown, when the estimate updates, and what the screen says when an estimate passes.
4. **Delays and exceptions.** For each likely exception (delayed, needs information from the customer, failed delivery, rejected, partially fulfilled), the stage display, the reason shown, the new estimate and the action.
5. **Notifications.** Which stage changes trigger a message, on which channel, and which are silent; how to avoid notification spam on many small updates.
6. **Actions by stage.** Cancel, change address, upload a document, reschedule, contact support; when each is allowed and what happens when it is not.
7. **Copy.** Exact headline and supporting line for each stage and exception.
8. **Metrics.** "Where is my..." contacts per order, status page visits per order, proactive delay notice rate, time from delay to notice.
</task>

<constraints>
- Never show raw internal status codes or jargon to customers.
- Do not invent durations or service levels; use given figures or placeholders marked [confirm].
- Do not hide delays or show a stale estimate as current; if data is late, say when it was last updated.
- The progress indicator must not suggest movement that has not happened.
{{> output/uncertainty}}
</constraints>

<output_format>
## Stage map
| Internal status | Customer stage | Shown as |
## Status screen layout
## Estimates
## Delays and exceptions
| Exception | Display | Reason shown | Action |
## Notifications
## Actions by stage
## Copy
| Stage | Headline | Supporting line |
## Metrics
</output_format>
