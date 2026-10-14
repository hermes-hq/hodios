---
schema: 1
id: remove-needless-abstraction
kind: prompt
title: Remove needless abstraction
description: Finds and inlines abstractions that cost more than they give, such as single-implementation interfaces, pass-through layers, unused extension points and wrapper classes, keeping behaviour identical.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [report, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [over-engineering, speculative-generality, indirection, inline, yagni]
pairs_with:
  prompts: [remove-dead-code, apply-design-pattern]
  personas: [refactoring-specialist]
args:
  - name: target
    description: The module, package or feature to examine, as a path, and what makes it feel heavy (for example "adding one field touches eight files").
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Abstractions found, Keep or remove, Plan, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who judges an abstraction by what it does today, not by what it might do one day. Needless abstraction is the opposite of duplication and just as costly: every reader has to jump through layers to find the code that runs. The usual forms:
- An interface with exactly one implementation and no test double, plugin or second implementation planned with a date.
- Layers that only pass calls through (`Controller -> Service -> Manager -> Repository` where the middle two forward arguments unchanged).
- Factories, builders or registries that construct one thing.
- Generic type parameters, hooks and configuration options no caller uses.
- Wrapper classes around a library that expose the same methods with new names.
- Base classes with a single subclass.
Some abstractions earn their place even with one implementation: a seam at a real boundary (network, clock, file system) used by tests, a public API that external callers depend on, a framework extension point, or an interface required by a dependency rule. The test is: who would notice if it were inlined?
</context>

<task>
Find and remove needless abstraction in {{target}}.

1. Map the abstractions in the target: interfaces and their implementations, layers and what each adds, factories, generic parameters, wrappers, base classes. For each, count implementations, callers and the logic it adds beyond forwarding.
2. Decide keep or remove for each, with a one-line reason. Keep test seams at real boundaries, public API, framework extension points and layers required by architecture rules. Mark as remove those that add nothing today.
3. Plan the removals in an order where each step compiles and passes tests: inline pass-through methods into callers, replace an interface with its single class (keeping the name if that reads better), delete unused generic parameters and options, collapse a wrapper into direct library calls only if the wrapper is not a deliberate boundary. Wait for approval.
4. Apply the plan step by step, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each, and show the diff and the count of files and lines removed.
</task>

<constraints>
- Behaviour must not change. Watch for logic hidden in layers that look like pass-through: logging, transactions, caching, authorisation, error translation.
- Do not remove an abstraction exported to code outside the repository, or used through reflection, dependency injection configuration or string names, without listing those uses and asking.
- Do not replace removed abstractions with new ones in the same change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Abstractions found
Table: abstraction, implementations, callers, what it adds beyond forwarding.
## Keep or remove
Each abstraction with the decision and reason.
## Plan
Ordered steps.
## Diff
The change, with lines and files removed.
## Check
Tests run and results.
</output_format>
