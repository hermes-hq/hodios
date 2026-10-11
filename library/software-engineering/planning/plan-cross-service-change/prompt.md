---
schema: 1
id: plan-cross-service-change
kind: prompt
title: Plan a change across services
description: Sequences a breaking change that spans several services, repos or clients into backward-compatible steps with deploy order, compatibility windows, owners and a check at each step.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, backend-engineer, architect]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [expand-contract, backward-compatibility, deploy-order, microservices, api-contract]
pairs_with:
  prompts: [plan-zero-downtime-schema-change, plan-incremental-migration, map-cross-team-dependencies]
args:
  - name: change
    description: The change to make, such as renaming a field, splitting an event, changing an ID format or an auth scheme, and why.
    type: text
    required: true
  - name: landscape
    description: The services, repos, queues, mobile or third-party clients involved, who owns each, and how each is deployed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Who touches the contract, Step sequence, Compatibility windows, Verification, Rollback, Coordination]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A change to a shared contract (an API field, an event schema, an ID format, a token) cannot be deployed everywhere at once. Services deploy independently, messages already in queues or stored in caches carry the old shape, and mobile apps and external clients stay on old versions for months. The safe pattern is expand and contract: add the new form alongside the old, make producers write both or consumers read both, move every consumer, prove nothing still uses the old form, and only then remove it. Getting the order wrong (removing before all readers moved, or a consumer requiring a field before producers send it) is how a two-line change becomes an outage. Each step must be deployable and reversible on its own.
</context>

<task>
<change>
{{change}}
</change>
<landscape>
{{landscape}}
</landscape>

1. List every producer, consumer and store of the contract, including queued and cached messages, logs or analytics that parse it, old mobile versions and third parties. Mark ones you are guessing at as questions.
2. Write the step sequence using expand and contract: each step names the service, the change, the deploy it needs and the precondition before it starts. Consumers learn to read the new form before producers send it; the old form is removed last.
3. Set compatibility windows: how long both forms must coexist, driven by message retention, cache lifetimes, client release and adoption cycles, and third-party notice periods.
4. For each step, define how to verify it before moving on: metrics or logs showing old-form usage falling to zero, contract tests, and canaries.
5. Give rollback per step, and mark the point after which rollback needs a forward fix.
6. Assign owners and a coordination plan: tracking issue, order of reviews and the announcement to consumers outside the team.
7. Draw the sequence as a Mermaid sequence or flowchart diagram.
</task>

<constraints>
- No step may require two services to deploy at the same moment.
- Never remove the old form without evidence that nothing still reads or writes it.
- Do not assume a schema registry, gateway or tool that was not mentioned; suggest it as an option.
- Do not invent retention periods or client adoption numbers; ask or use placeholders.
</constraints>

<output_format>
## Who touches the contract
Table: component | role (producer, consumer, store) | owner | deploy cadence.
## Step sequence
Table: step | component | change | precondition.
## Compatibility windows
Bullets with what drives each window.
## Verification
Per step, the evidence needed to continue.
## Rollback
Per step, plus the point of no simple rollback.
## Coordination
Bullets, then a mermaid code block of the sequence.
</output_format>
