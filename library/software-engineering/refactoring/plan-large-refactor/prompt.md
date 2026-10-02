---
schema: 1
id: plan-large-refactor
kind: prompt
title: Plan a large refactor in safe steps
description: Turns a large refactor into small, independently shippable steps that keep the build green, each with a rollback, using patterns like expand-contract. Use for refactors too big for one PR.
category: refactoring
version: 1.0.0
status: incubating
stage: [plan, design]
role: [tech-lead, architect, software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, spec]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [incremental-delivery, strangler-fig, expand-contract]
pairs_with:
  prompts: [write-characterization-tests, extract-module]
args:
  - name: goal
    description: The end state, for example "replace the hand-written ORM with SQLAlchemy" or "split the monolith's billing code into its own package".
    type: text
    required: true
  - name: constraints
    description: Limits such as deadlines, team size, freeze periods, or parts that must not change.
    type: text
output_contract:
  format: markdown
  sections: [Current state, Strategy, Steps, Risks, Done when]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Large refactors fail as long-lived branches: they drift from main, conflict with everyone, and land as one unreviewable change. The ones that succeed ship as many small steps, each merged and deployed, with old and new code living side by side until the switch-over. The plan matters more than the code.
</context>

<task>
Plan this refactor: {{goal}}
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}
1. **Map the current state.** Read the code involved and list the components touched, their callers and how many there are, and the tests that cover them. Count call sites rather than guessing.
2. **Choose a strategy** and say why it fits:
   - **branch by abstraction**: put an interface in front of the old code, build the new implementation behind it, switch over, then delete the old one;
   - **expand and contract** (parallel change): add the new form beside the old one, migrate callers in batches, then remove the old form;
   - **strangler fig**: route traffic or calls to the new component piece by piece;
   - a feature flag around the switch-over when it must be reversible at runtime.
3. **Write the steps.** Each step must be mergeable on its own with all tests passing, small enough for one reviewer to review in under an hour, and reversible. For each step give the change, how it is verified, and how it is rolled back.
4. Put the safety net first. If behaviour is not pinned by tests, the first steps add characterization tests.
5. Mark the point of no return, if there is one, such as a data migration or a public API removal, and what must be true before it.
</task>

<constraints>
- Plan only. Do not edit code.
- No step may leave main broken or depend on a later step to compile.
- Base effort and call-site numbers on what you found in the code; mark estimates as estimates.
- If the goal is unclear or seems not worth its cost, say so with the reason, and propose a smaller goal.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state
Bullets: the components, call-site counts and test coverage you found.
## Strategy
The chosen pattern and why, in a short paragraph.
## Steps
A numbered table: # | Change | Verified by | Rollback | Size (S, M, L).
## Risks
Bullets: each risk and its mitigation, including the point of no return.
## Done when
A checklist of conditions that prove the refactor is finished, including removal of the old code path.
</output_format>
