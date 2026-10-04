---
schema: 1
id: find-service-boundaries
kind: prompt
title: Find bounded contexts and service boundaries
description: Maps a domain into bounded contexts from its language, data ownership and change patterns, and proposes module or service boundaries that minimise cross-boundary calls, with how they communicate.
category: architecture
version: 1.0.0
status: incubating
aliases: [arch-decompose]
stage: [design, plan]
role: [architect, tech-lead, backend-engineer]
stack: []
requires: [none]
inputs: [repo, spec, text]
output: [report, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [domain-driven-design, bounded-context, microservices, modular-monolith, data-ownership]
pairs_with:
  personas: [software-architect]
  prompts: [plan-monolith-extraction, review-codebase-architecture, design-event-driven-system, write-adr]
args:
  - name: system
    description: The system to decompose, as a repository, a domain description, or both.
    type: text
    required: true
  - name: drivers
    description: Why boundaries are wanted now (team autonomy, independent scaling, deploy speed, compliance isolation).
    type: text
output_contract:
  format: markdown
  sections: [Domain map, Proposed boundaries, Communication, Boundary checks, Should these be services]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good boundaries follow the domain: each context owns its data and its language, and most changes stay inside one context. Bad boundaries follow technical layers or nouns ("user service", "database service") and produce chatty calls, shared tables and coordinated deploys, a distributed monolith. Boundaries can be enforced as modules inside one deployable long before, or instead of, separate services. This entry finds the boundaries for the whole system; extracting one capability from a monolith is a separate, later step.
</context>

<task>
Find the bounded contexts in {{system}}.
{{#drivers}}Drivers: {{drivers}}
{{/drivers}}
1. Map the domain: the main business capabilities, the key entities and events, and the language each area uses. Note where one word means different things in different areas (an "account" in billing versus in identity); those are context seams.
2. If code is available, gather evidence: which modules read and write which tables, which modules change together, and which call each other on the request path.
3. Propose bounded contexts. For each: its responsibility in one sentence, the data it owns (and is the only writer of), the commands and queries it exposes, and the events it publishes.
4. Check each boundary: count the synchronous calls a typical user flow makes across it, list data that would need to be shared, and find transactions that span contexts. Move the boundary when a flow needs many cross-boundary calls or a cross-context transaction.
5. Choose communication per relationship: synchronous query, asynchronous event, or a local read model fed by events, and say how consistency is handled.
6. Say whether each context should be a separate service now, a module in a modular monolith, or left as it is, based on the drivers.
</task>

<constraints>
- Name contexts after business capabilities, not technical layers or single entities.
- Each piece of data has exactly one owning context; other contexts read through its interface or a replicated read model.
- Do not recommend splitting into services just because boundaries exist; separate deployment must be justified by the drivers.
- Label anything inferred without code evidence as an assumption.
{{> output/uncertainty}}
</constraints>

<output_format>
## Domain map
Capabilities, key entities and events, and terms that mean different things in different areas.
## Proposed boundaries
Per context: responsibility, owned data, exposed commands and queries, published events. Then a diagram in text or Mermaid.
## Communication
Table: from, to, interaction, sync or async, consistency approach.
## Boundary checks
Cross-boundary calls per key flow, shared data, and cross-context transactions, with the adjustments made.
## Should these be services
Per context: separate service, module or leave, and why.
</output_format>
