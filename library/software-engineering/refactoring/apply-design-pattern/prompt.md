---
schema: 1
id: apply-design-pattern
kind: prompt
title: Apply a design pattern where it removes complexity
description: Finds the complexity a design pattern would actually remove, such as a growing switch or tangled construction, applies it with identical behaviour, or says no pattern fits.
category: refactoring
version: 1.0.0
status: incubating
aliases: [refactor-patterns]
stage: [maintain, build]
role: [software-engineer, backend-engineer, tech-lead]
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
tags: [design-patterns, over-engineering, clean-code, trade-offs]
pairs_with:
  personas: [software-architect, code-reviewer]
  prompts: [simplify-function, reduce-duplication, add-characterization-tests]
args:
  - name: code
    description: The file, module or function to look at, as a path or pasted code.
    type: text
    required: true
  - name: pain
    description: What hurts today, if you know (for example "every new payment method means editing five switch statements").
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Pattern, Diff, Trade-offs, Behaviour check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A design pattern is a known shape for a recurring problem. Applied to the problem it solves, it removes branching, duplication or coupling. Applied because it is familiar, it adds interfaces, factories and indirection that the next reader has to unpick. The job here is to find the specific force in this code that a pattern would resolve, and to apply the smallest pattern that resolves it, or to say that the plain code is already the right shape.
</context>

<task>
Look at {{code}}.
{{#pain}}The pain reported: {{pain}}
{{/pain}}
1. Read the code and its callers. Name the concrete source of complexity: a type switch repeated in several places, a constructor with many optional parameters, conditional behaviour that keeps growing, an object that notifies others through hard-wired calls, an algorithm with interchangeable steps, an awkward interface to a third-party library, and so on. Quote the lines.
2. Decide whether a pattern helps. Consider the simplest options first: a plain function, a lookup table, a data structure or a language feature (first-class functions, enums with behaviour, pattern matching) often does the job of a classic pattern with less ceremony.
3. If a pattern clearly reduces complexity, name it (for example Strategy, State, Builder, Adapter, Observer, Template Method, Factory) and explain in two sentences why this code is the problem it solves. Count what changes: how many places a new variant touches before and after.
4. Check that tests cover the behaviour you are about to restructure. If they do not, write characterization tests first.
5. Apply the pattern in small steps, keeping the public interface and behaviour identical. Run the tests after the change.
6. If no pattern earns its place, say so and stop, or propose the plainer change that does.
</task>

<constraints>
- Apply at most one pattern per run, to the one problem you named. Do not sprinkle patterns across the codebase.
- Never add an abstraction with a single implementation and no concrete second variant in sight; say "not yet" instead.
- Keep the public API and observable behaviour unchanged. No new dependencies.
- Prefer the language's idiom over a textbook class diagram when both solve the problem.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
The source of complexity, with quoted lines, and how many places a new variant touches today.
## Pattern
The pattern chosen (or "none") and why it fits this force. If none, the plainer alternative.
## Diff
The change as a diff.
## Trade-offs
What the pattern costs (indirection, more files, harder navigation) and when it would stop paying off.
## Behaviour check
The tests run before and after, with results.
</output_format>
