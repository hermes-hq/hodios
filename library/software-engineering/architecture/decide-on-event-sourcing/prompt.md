---
schema: 1
id: decide-on-event-sourcing
kind: prompt
title: Decide whether to use event sourcing
description: Decides whether a domain should be event-sourced and, if so, specifies the event store, aggregates, snapshots, projections, event schema evolution and personal data handling.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document]
output: [adr, docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [event-sourcing, aggregates, snapshots, crypto-shredding, domain-driven-design]
pairs_with:
  personas: [software-architect]
  prompts: [design-cqrs-read-models, design-event-driven-system, write-adr, review-event-schema-change]
args:
  - name: domain
    description: The domain or bounded context, its main entities and operations, and why event sourcing is being considered (audit, history, temporal queries, a team member's suggestion).
    type: text
    required: true
  - name: context
    description: Team experience, existing database and stack, data volumes, regulatory needs such as erasure requests, and reporting needs.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Fit assessment, Alternatives, Design if adopted, Risks and costs, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Event sourcing stores the sequence of business events as the source of truth and derives current state by replaying them. It pays off where the history itself is the business (ledgers, bookings, claims, workflows with audit and "what did we know when" questions) and where many read models of the same facts are needed. Its costs are routinely underestimated: every query needs a projection, projections lag, events are immutable so a bad event schema lives forever and must be versioned and upcast, aggregates must be designed to keep event streams short or snapshotted, and the erasure of personal data clashes with immutable logs (crypto-shredding, storing personal data outside events, or tombstoning are the usual answers). Many teams who only need an audit trail are better served by a normal database plus an append-only audit or change-history table, or change data capture. Event sourcing is a per-bounded-context decision, never a system-wide one.
</context>

<task>
<domain>
{{domain}}
</domain>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Restate the actual needs behind the proposal: audit, full history, temporal queries, rebuilding views, integration events, or none of these.
2. Assess fit against concrete criteria: is the history business-critical, are there many read models, how complex are the invariants, how much does the team know about the pattern, what do reporting and erasure requirements demand. Score each as favouring or against.
3. Name the simpler alternatives that meet the stated needs (audit table, temporal tables, change data capture, an outbox for integration events) and what each gives up.
4. Give a verdict: adopt, adopt for a specific part only, or do not adopt. Be willing to say no.
5. If adopted, specify the design: aggregate boundaries and expected stream lengths, event naming in past tense business language, event schema and versioning (upcasting or new types), event store choice (dedicated store versus a table in the existing database) with optimistic concurrency on stream version, snapshot policy, projections and how they are rebuilt, how other services receive events (separate integration events, not internal ones), and personal data handling.
6. List risks and costs with mitigations: projection lag visible to users, replay time growth, debugging, team onboarding, and how to back out if it goes badly.
</task>

<constraints>
- Do not recommend event sourcing for a whole system; decide per bounded context.
- Do not ignore erasure or retention obligations for personal data in immutable events.
- Do not present internal domain events as the public integration contract for other services.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Adopt, adopt in part, or do not adopt, with the reason, in at most 5 lines.
## Fit assessment
Table: criterion, finding, favours or against.
## Alternatives
Table: alternative, needs it meets, what it gives up.
## Design if adopted
Subsections as in step 5, or "Not applicable" with the reason.
## Risks and costs
## Open questions
Numbered.
</output_format>
