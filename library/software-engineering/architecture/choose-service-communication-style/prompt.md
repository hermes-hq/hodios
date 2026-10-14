---
schema: 1
id: choose-service-communication-style
kind: prompt
title: Choose how services talk to each other
description: Decides for each interaction between services whether to use a synchronous call, an async command or a published event, with the coupling, latency and failure trade-offs of each.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document, repo]
output: [table, adr, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [synchronous-vs-asynchronous, async-messaging, service-coupling, integration-patterns, microservices]
pairs_with:
  personas: [software-architect]
  prompts: [design-event-driven-system, find-service-boundaries, design-distributed-transaction, choose-message-queue]
args:
  - name: interactions
    description: The interactions to decide, as "service A needs X from or wants Y done by service B", with the user journey each belongs to.
    type: text
    required: true
  - name: context
    description: Latency budgets, existing infrastructure (HTTP, gRPC, broker), team ownership of each service, and any reliability problems seen today.
    type: text
output_contract:
  format: markdown
  sections: [Decision table, Rationale per interaction, Failure behaviour, Coupling check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Should this be a REST call or an event?" is asked per interaction, and the answer is rarely the same for a whole system. Synchronous calls fit queries where the caller needs the answer now to respond to a user, and they couple availability: if the callee is down, the caller fails, and chains of synchronous calls multiply latency and failure probability. Asynchronous commands (a message telling one known service to do something) fit work that can finish later and must not be lost, such as sending email or generating a document. Events (a fact published for whoever cares) fit cases where the publisher should not know its consumers, and they add eventual consistency, duplicate delivery and debugging cost. Two smells experts watch for: a service making a synchronous call to fetch data it could own a copy of via events, and an event that is really a command to one specific service in disguise.
</context>

<task>
<interactions>
{{interactions}}
</interactions>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If a repository is available, read how services call each other today (clients, topics, queues) and say what you read.
2. For each interaction, classify it as query, command or notification of a fact, and decide whether the caller needs the result before it can respond.
3. Choose synchronous call, async command, published event, or a local copy of data maintained by events, per interaction, with the reason grounded in the user journey and latency budget.
4. For synchronous choices, state the timeout, retry and fallback behaviour and check the depth of synchronous chains in each journey. For async choices, state the delivery guarantee needed, idempotency of the receiver, ordering needs, and how the user sees the eventual result.
5. Describe failure behaviour per interaction: what happens to the user and the data when the other side is down for one minute and for one hour.
6. Run a coupling check: circular dependencies, synchronous chains longer than two hops, events that are commands in disguise, and services that cannot work without another team's service.
</task>

<constraints>
- Do not convert everything to events by default; justify each async choice against the cost of eventual consistency.
- Do not propose a synchronous call in a user-facing path without a timeout and a failure behaviour.
- Do not invent latency or availability numbers; ask or label assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decision table
Table: interaction, kind (query, command, fact), style chosen, guarantee, reason.
## Rationale per interaction
Short paragraphs for the non-obvious ones.
## Failure behaviour
Table: interaction, callee down 1 minute, callee down 1 hour.
## Coupling check
Bullets, with a Mermaid diagram of the resulting call and message flows.
## Open questions
Numbered.
</output_format>
