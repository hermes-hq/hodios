---
schema: 1
id: design-distributed-transaction
kind: prompt
title: Design a distributed transaction with a saga
description: Designs a business operation that spans several services as a saga, with step order, compensations, the pivot step, orchestration or choreography, idempotency and stuck-saga recovery.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [saga-pattern, compensating-actions, distributed-systems, orchestration, idempotency]
pairs_with:
  personas: [software-architect]
  prompts: [design-event-driven-system, find-service-boundaries, write-adr]
args:
  - name: operation
    description: The business operation and what must be true when it finishes, for example "place an order reserves stock, charges the card and books a courier, or none of them".
    type: text
    required: true
  - name: services
    description: The services or external systems involved, what each owns, and how they talk today (HTTP, queue, events), including any third parties you cannot roll back.
    type: text
    required: true
  - name: constraints
    description: Volumes, latency the user will wait for, existing message broker or workflow engine, and rules such as "never charge twice" or "stock may be oversold by at most 1%".
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Saga steps, Compensations and the pivot, Coordination, Failure handling, Observability and recovery, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When one business operation writes to several services, there is no shared database transaction, and two-phase commit across services is rarely available or wise. A saga replaces it: a sequence of local transactions, each with a compensating action that semantically undoes it. What novices miss: compensations are new business actions (a refund, a cancellation email), not rollbacks, and some steps cannot be compensated at all, so order matters. Put retryable and compensable steps before the pivot (the point of no return, often the payment capture or a third-party booking) and only steps that are guaranteed to eventually succeed after it. Sagas also give up isolation: other requests can see half-finished state, so the design needs semantic locks such as a PENDING status. Every step and compensation must be idempotent because messages are delivered at least once.
</context>

<task>
Design the saga for:

<operation>
{{operation}}
</operation>

<services>
{{services}}
</services>

{{#constraints}}
<constraints>
{{constraints}}
</constraints>
{{/constraints}}

1. If the operation's success condition, the services involved, or which steps touch third parties are unclear, ask up to four questions and stop. Otherwise continue and label assumptions.
2. Check first whether a saga is needed: if the data could live in one service and one transaction, or the steps could be reordered so only one service writes synchronously, say so and recommend that instead.
3. List the steps in order. For each: the service, the local transaction, its compensation (or "none, cannot be undone"), whether it is retryable, and the semantic lock it leaves on the record (for example order status PENDING_PAYMENT).
4. Identify the pivot step. Reorder so that compensable steps come before it and only retryable, must-succeed steps come after it. Explain the order.
5. Choose orchestration (a coordinator that owns the state machine, or a workflow engine) or choreography (services react to each other's events). Base the choice on the number of steps, who needs to see saga state, and the coupling each option creates; choreography past three or four steps is hard to follow and debug.
6. Specify failure handling: timeouts per step, retry policy with backoff, idempotency keys and deduplication, what happens if a compensation itself fails (retry until success, then park for a human), and how concurrent sagas on the same entity are prevented or ordered.
7. Specify the saga state record, how messages are published reliably with the state change (transactional outbox or the engine's guarantee), and how stuck sagas are detected, alerted and resumed or compensated by an operator.
8. Draw the happy path and one failure path as a Mermaid sequence diagram.
</task>

<constraints>
- Never call a compensation a rollback without explaining what the user or business sees, for example a charge followed by a refund shows on a card statement.
- Do not recommend two-phase commit or distributed locks across services unless you state why the usual objections do not apply here.
- Do not invent the behaviour of a third-party API (refund windows, cancellation rules, idempotency support); list it as a question to confirm.
- Name the isolation anomalies that remain (dirty reads of PENDING records, lost updates) and how the design limits them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Saga or not, orchestration or choreography, and why, in at most 5 lines.
## Saga steps
Table: order, service, local transaction, compensation, retryable, semantic lock.
## Compensations and the pivot
The pivot step and the reasoning for the order, plus steps that cannot be undone and how the design copes.
## Coordination
The state machine or event flow, with a Mermaid sequence diagram of the happy path and one failure path.
## Failure handling
Bullets: timeouts, retries, idempotency, failed compensations, concurrent sagas.
## Observability and recovery
Saga state, outbox, stuck-saga detection, the operator runbook in brief.
## Open questions
Numbered, each with what it affects.
</output_format>
