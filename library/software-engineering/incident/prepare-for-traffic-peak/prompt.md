---
schema: 1
id: prepare-for-traffic-peak
kind: prompt
title: Prepare a service for a known traffic peak
description: Prepares a service for a predictable peak such as a launch, sale or broadcast, with a traffic estimate, capacity headroom, pre-scaling, limits, load-shedding, a change freeze and on-call cover.
category: incident
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sre, devops-engineer, backend-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [text, dataset]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [peak-traffic, capacity-planning, load-shedding, change-freeze, launch-readiness]
pairs_with:
  prompts: [plan-load-test, define-slos, design-service-dashboard, write-runbook]
  personas: [site-reliability-engineer, incident-commander]
args:
  - name: event
    description: The event, its date and time zone, and what you expect, for example "Black Friday sale, marketing expects 5x normal sessions, peak in the first hour after the email at 09:00 UTC".
    type: text
    required: true
  - name: current_capacity
    description: Normal and past peak traffic, current utilisation of the main components, autoscaling settings and limits, and known bottlenecks such as the database, a third-party API or quotas.
    type: text
    required: true
  - name: architecture
    description: The main components in the request path and their dependencies, including anything third-party.
    type: text
---
<context>
You help a team get ready for a peak they can see coming. Peaks rarely fail on the component everyone scales; they fail on the one with a fixed limit: database connections, a third-party API rate limit, cloud account quotas, a cache that cold-starts, a single-threaded job, or autoscaling that reacts in minutes when the spike arrives in seconds. Marketing estimates are often off by a factor of two or more, and the first minutes after an email or broadcast are far steeper than the hourly average. The best preparation combines headroom for a credible worst case, pre-scaling rather than relying on autoscaling, a way to degrade gracefully (queueing, turning off non-essential features, a waiting room), a change freeze, and people on hand.

<event>
{{event}}
</event>

<current_capacity>
{{current_capacity}}
</current_capacity>

{{#architecture}}
<architecture>
{{architecture}}
</architecture>
{{/architecture}}
</context>

<task>
1. Turn the expectation into a traffic estimate: expected and worst-case peak requests per second at the busiest minute, with the multipliers and assumptions shown. If the inputs only give daily or hourly numbers, explain how you derived the peak minute.
2. Walk the request path and, for each component, compare the worst-case load with its current limit: compute, database connections and throughput, caches, queues, third-party APIs and their rate limits, account quotas, CDN. Mark each as fine, needs action or unknown.
3. For each component needing action: pre-scale (how much, by when), raise a quota or limit (with lead time, since some take days), warm caches, or add a fallback.
4. Design graceful degradation: which features to turn off first and how (flags), rate limits per client, queueing, a waiting room, and the trigger for each.
5. Recommend a load test against the worst case before the event if none is planned, with what it must prove.
6. Write the event plan: change freeze dates, who is on call and on hand, a war room or channel, a dashboard of the few signals that matter, decision triggers, and the communication path to marketing and support.
7. Write a timeline from now to after the event, including scaling back down and a short review.
</task>

<constraints>
- Show every traffic and capacity calculation; label assumptions and do not invent current limits or quota values. Mark unknown limits as items to look up.
- Do not rely on autoscaling alone for a spike that rises faster than instances start; say how long scale-out takes or that it must be measured.
- Name third-party limits as risks the team must confirm with the provider; do not assume they will scale.
- If the inputs are too vague to estimate a peak, ask for the specific numbers needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Traffic estimate
Expected and worst-case peak with arithmetic and assumptions.
## Capacity by component
Table: component | worst-case load | current limit | status | action.
## Lead-time items
Bullets: quotas, contracts or orders that take days.
## Graceful degradation
Table: step | how | trigger.
## Load test
What to run and what it must prove.
## Event plan
Bullets: freeze, people, dashboard, triggers, comms.
## Timeline
Table: date or time | action | owner role.
</output_format>
