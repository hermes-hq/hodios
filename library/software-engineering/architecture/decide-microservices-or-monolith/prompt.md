---
schema: 1
id: decide-microservices-or-monolith
kind: prompt
title: Decide between microservices and a monolith
description: Decides whether a system should be a monolith, a modular monolith or microservices from team size, deploy pain, scaling and domain clarity, with the evidence that would change the answer.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [architect, tech-lead, engineering-manager, founder]
requires: [none]
inputs: [text, spec, notes]
output: [report, table, adr]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [microservices, modular-monolith, service-decomposition, team-topology, conways-law]
pairs_with:
  personas: [software-architect, staff-engineer]
  prompts: [find-service-boundaries, plan-monolith-extraction, write-adr, review-codebase-architecture]
args:
  - name: situation
    description: The product, current architecture (if any), what is hurting today and why the question came up, for example "deploys take a day and two teams keep breaking each other".
    type: text
    required: true
  - name: organisation
    description: Number of engineers and teams, how teams are split, on-call and platform maturity (CI/CD, observability, container platform).
    type: text
    required: true
  - name: load_profile
    description: Traffic, data volumes and any component with very different scaling, availability or compliance needs from the rest.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, The real problem, Options compared, What would change the answer, Next steps, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Should we move to microservices?" is usually a proxy for a different problem: slow or risky deploys, teams blocking each other, one hot component that needs to scale, or a tangled codebase. Microservices solve team autonomy and independent scaling at a steep, permanent price: network failures, distributed data and transactions, versioned contracts, per-service pipelines and on-call, and harder debugging. A small team usually pays that price without collecting the benefit. A modular monolith, with enforced module boundaries and owned data inside one deployable, fixes most coupling problems and keeps the option to extract services later along proven seams. Conway's law cuts both ways: service boundaries that do not match team boundaries create constant cross-team coordination.
</context>

<task>
<situation>
{{situation}}
</situation>

<organisation>
{{organisation}}
</organisation>

{{#load_profile}}
<load_profile>
{{load_profile}}
</load_profile>
{{/load_profile}}

1. If team size, the current pain or platform maturity is missing, ask up to four questions and stop. Otherwise continue and label assumptions.
2. Name the real problem behind the question and test whether it is architectural at all (a slow CI pipeline, missing tests or unclear ownership are not fixed by splitting services).
3. Compare a monolith, a modular monolith and microservices (or a monolith plus one or two extracted services) on: the stated pain, team autonomy, deploy independence, scaling the hot path, data consistency, operational load per service, debugging, and cost to change direction later.
4. Check the preconditions for microservices and say which are met: stable domain boundaries, teams that can own services end to end, automated deploys, centralised logs, metrics and tracing, and the ability to run on-call per service.
5. Recommend one option and the smallest move toward it. If extraction is warranted, name the first candidate and why (different scaling, different change rate, a clear data boundary), not a full decomposition.
6. State the measurable signals that would change the recommendation, for example "more than about three teams regularly blocked on the same deploy" or "one component needs ten times the instances of the rest". Present such numbers as rules of thumb, not laws.
</task>

<constraints>
- Do not recommend microservices because they are modern, or a monolith because it is simpler, without tying it to the stated pain and team.
- Do not cite figures about other companies' architectures as evidence.
- If the stated pain is not architectural, say so plainly and point to the actual fix.
- Keep the recommendation reversible where possible and say what it would cost to reverse.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The option and the first step, in at most 5 lines.
## The real problem
What is actually hurting and whether architecture is the fix.
## Options compared
Table: criterion, monolith, modular monolith, microservices, with the winner per row.
## What would change the answer
Bullets of measurable signals.
## Next steps
Numbered, the first two weeks in detail.
## Assumptions
Numbered, each with what it affects.
</output_format>
