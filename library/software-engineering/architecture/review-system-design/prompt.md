---
schema: 1
id: review-system-design
kind: prompt
title: Review a system design
description: Reviews a design document or proposal for failure modes, scaling limits, data and consistency risks and operability gaps, and returns ranked findings. Use before a design review or before building.
category: architecture
version: 1.0.0
status: experimental
stage: [review, design]
role: [architect, tech-lead, software-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [document, spec, text]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [design-review, failure-modes, scalability, reliability]
pairs_with:
  personas: [software-architect]
  prompts: [write-adr, compare-design-options]
args:
  - name: design
    description: The design document, RFC or proposal to review, pasted or as a file path.
    type: text
    required: true
  - name: requirements
    description: Requirements the design must meet if they are not in the document (load, latency, availability, budget, deadline).
    type: text
  - name: focus
    description: Area to weight most heavily.
    type: enum
    enum: [all, reliability, scalability, data, security, cost, operability]
    default: all
output_contract:
  format: markdown
  sections: [Verdict, Design in brief, Findings, Questions for the author, What works]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are reviewing a design before the team builds it. The goal is to find what will fail in production or block the team later, while it is still cheap to change. Generic advice ("consider caching", "think about security") wastes the author's time; every finding must point to a part of this design and a concrete way it goes wrong.
</context>

<task>
Review this design:
{{design}}
{{#requirements}}
Requirements it must meet:
{{requirements}}
{{/requirements}}
Weight your attention toward: {{focus}}.

1. Restate the design in at most 5 lines: the components, the main request or data flow, and the requirements it targets. List any non-functional requirement that is missing and would change the design (load, latency, availability, durability, data size, cost).
2. Walk each critical path step by step. For every component and dependency on it, ask: what happens when it is slow, down, returns an error, returns duplicates, or delivers out of order? What retries, and is the retried operation idempotent?
3. Check the data: the source of truth for each entity, who writes it, consistency between stores, schema migrations, retention and personal data.
4. Check scale with back-of-the-envelope maths, using only the numbers given. Show the arithmetic. Find the first component to saturate.
5. Check operability: deploy and rollback, backward compatibility during rollout, observability (what alert would fire, which dashboard shows it) and the on-call burden.
6. Note security boundaries only at design level: trust boundaries, authentication between components, secrets.
7. Keep only findings you can tie to a specific part of the design and a concrete scenario. Rank them by impact times likelihood.
</task>

<constraints>
- At most 12 findings. Each one quotes or names the section of the design it is about.
- Do not redesign the system. Recommend the smallest change that removes the risk, and say when a bigger rethink is needed.
- Do not push complexity the requirements do not justify (extra services, queues, caches, sharding). Say so when the simple design is right.
- Do not invent numbers, product limits or prices. Label any figure you did not get from the input as an assumption.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: ready | ready with changes | needs another pass, plus the single most important reason.
## Design in brief
At most 5 lines, then missing requirements as bullets.
## Findings
Numbered, most severe first. Each: **[blocker | major | minor]** title — where in the design — the scenario that triggers it — the impact — the recommended change.
## Questions for the author
Questions whose answers would change a finding or the verdict.
## What works
Up to 3 bullets on choices worth keeping, so they survive the revision.
</output_format>
