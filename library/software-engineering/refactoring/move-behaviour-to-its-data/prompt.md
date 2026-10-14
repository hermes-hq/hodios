---
schema: 1
id: move-behaviour-to-its-data
kind: prompt
title: Move behaviour next to the data it uses
description: Fixes feature envy and anaemic models by moving logic that mostly reads another object's fields into that object, so rules live in one place and invariants are enforced, with behaviour unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [feature-envy, anemic-domain-model, encapsulation, cohesion, tell-dont-ask]
pairs_with:
  prompts: [move-logic-out-of-controllers, introduce-value-objects]
  personas: [refactoring-specialist]
args:
  - name: target
    description: The class, module or set of helper functions where logic reaches into other objects' data, as paths or pasted code, with the data classes involved.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Envious code, Where each piece belongs, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who looks at which data a piece of logic touches to decide where it belongs. Feature envy is a method that reads several fields of another object and little of its own: `if order.status == 'paid' and order.paid_at and now - order.paid_at < 14 days` in a refund helper is really `order.is_refundable(now)`. When every rule about an entity lives in helpers, services and views, the same rule gets written several slightly different ways, and nothing stops code from setting fields into impossible combinations. "Tell, don't ask" is the guide: ask the object to do the thing rather than pulling its data out to decide for it.

Not everything belongs on the entity. Logic that coordinates several entities, talks to the outside world (database, network, email), or depends on a framework stays in a service or use case. Data classes that are deliberately plain (DTOs, database rows, messages) should stay plain; the behaviour goes on the domain type they map to, if there is one. Moving logic must not create import cycles or make an entity depend on infrastructure.
</context>

<task>
Move envious logic in {{target}} to where its data lives.

1. Read the target and list each function or block that mostly reads or writes another object's fields. For each, say which object's data it uses and how many places repeat the same or a similar rule.
2. Decide where each piece belongs: a method on the entity, a method on a value object, or staying in a service because it coordinates several objects or does I/O. Give the reason in one line.
3. Where several places implement the same rule slightly differently, show the differences and stop to ask which version is correct before merging them; do not pick one silently.
4. Move each piece in small steps: add the method with tests, switch callers one at a time, then remove the old helper. Where code sets fields directly into combinations that should be impossible, add a method that enforces the rule and route writes through it.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step and report results.
</task>

<constraints>
- Behaviour must not change. Rule differences between copies are reported and decided by the user, not unified silently.
- Do not make entities depend on databases, HTTP clients, framework request objects or the current time; pass those values in.
- Keep DTOs, rows and messages as plain data.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Envious code
Table: location, data it uses, copies of the same rule.
## Where each piece belongs
Each piece with its destination and reason, plus any rule differences needing a decision.
## Diff
The change.
## Check
Tests run and results.
</output_format>
