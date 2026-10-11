---
schema: 1
id: implement-cucumber-step-definitions
kind: prompt
title: Implement Cucumber step definitions
description: Implements Cucumber, SpecFlow/Reqnroll or Behave step definitions for Gherkin scenarios with reusable parameterised steps, per-scenario shared context and no step sprawl.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [qa-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo, spec]
output: [tests, code]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bdd, gherkin, cucumber, step-definitions, acceptance-tests]
pairs_with:
  prompts: [write-gherkin-scenarios, write-integration-tests, write-page-objects-for-e2e]
  personas: [test-engineer]
args:
  - name: scenarios
    description: The feature files or Gherkin scenarios to automate, or their path in the repo.
    type: text
    required: true
  - name: framework
    description: The BDD framework and language, for example Cucumber with TypeScript, Cucumber-JVM, Reqnroll or SpecFlow with C#, Behave with Python - and what the steps drive (API, UI, domain code).
    type: text
output_contract:
  format: markdown
  sections: [Step inventory, Step definitions, Shared context, Verification, Scenario feedback]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
BDD suites rot in the glue code. Typical failures: one step definition per sentence variant ("I add 1 item", "I add 2 items", "the user adds an item"), so hundreds of near-duplicates; steps that click through the UI when the scenario describes a business rule that could be checked through the API or domain layer; state passed between steps through globals or static fields, which breaks parallel runs; and "Then" steps that assert nothing meaningful. Good glue uses parameterised steps (Cucumber expressions with typed parameters and custom parameter types for domain terms), keeps step definitions thin by delegating to helpers or page objects, keeps per-scenario state in the framework's scenario context (the World in Cucumber JS, dependency-injected context in Cucumber-JVM and Reqnroll, the context object in Behave), and drives the system at the lowest level that still gives the scenario meaning. When a scenario is phrased in UI terms, that is feedback for the scenario, not a reason to write UI glue.
</context>

<task>
Implement step definitions for:
{{scenarios}}
{{#framework}}

Framework: {{framework}}
{{/framework}}

1. Read the feature files, existing step definitions, hooks, support code and configuration. Run the framework's dry-run or undefined-step report to list missing steps.
2. Build a step inventory: group the step phrases that mean the same thing and decide one parameterised definition per group. Reuse existing definitions where they match, and propose small wording alignments in the feature files when two phrasings mean the same thing (show them; do not change scenario meaning).
3. Decide what each step drives: domain code or API for business rules, UI (through page objects) only for scenarios about the interface.
4. Write the definitions with Cucumber expressions or the framework's equivalent, custom parameter types for repeated domain terms (currencies, roles, dates), thin bodies that call helpers, and state kept in the per-scenario context object. Use hooks for setup and teardown of data the scenario creates.
5. Make every Then step assert something specific, with a failure message that names the expected and actual business values.
6. Run the scenarios. If a scenario fails because the system behaves differently from the scenario, report it as a possible defect or scenario error; do not bend the step to pass.
7. Check for leftovers: undefined steps, unused definitions and ambiguous matches.
</task>

<constraints>
- No global or static mutable state between steps; use the scenario context.
- No duplicated definitions differing only in literal values.
- Do not change the meaning of scenarios; propose wording changes for the user to approve.
- No sleeps; wait on conditions.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Step inventory
Table: step pattern | used in scenarios | drives (domain, API, UI) | new or reused.

## Step definitions
Diffs of step files, parameter types, helpers and hooks.

## Shared context
How scenario state is held and reset.

## Verification
Run results, including undefined, unused and ambiguous steps.

## Scenario feedback
Wording alignments proposed, and any scenarios phrased in UI terms that should describe behaviour.
</output_format>
