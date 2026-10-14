---
schema: 1
id: write-custom-lint-rule
kind: prompt
title: Write a custom lint rule for a team convention
description: Writes a custom lint rule (ESLint, Semgrep, Roslyn, golangci-lint, RuboCop and similar) that enforces a team convention, with a safe autofix where possible and passing and failing tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, tech-lead, maintainer]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [linting, static-analysis, ast, codemod, eslint-plugin]
pairs_with:
  prompts: [fix-lint-violations-repo-wide, write-team-coding-standards]
args:
  - name: convention
    description: The convention to enforce, with a correct and an incorrect example, for example "Never import from another feature's internal folder; only from its index".
    type: text
    required: true
  - name: tool
    description: The lint tool to write the rule for, if decided, for example ESLint, Ruff, Semgrep, Roslyn analyzer, golangci-lint plugin, RuboCop or detekt.
    type: string
    default: the linter already used in the repository
  - name: severity
    description: Whether the rule should start as an error or a warning.
    type: string
    default: warn
output_contract:
  format: markdown
  sections: [Approach, Rule, Tests, Registration, Repository impact, Limitations]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A convention that lives only in a document gets enforced by whoever happens to review the pull request. A custom lint rule makes it automatic, but custom rules fail in their own ways: a regex over source text that matches comments and strings, an AST check that misses aliased imports or re-exports, an autofix that changes behaviour, or a rule so noisy that people disable it in a week. Before writing a plugin, check whether a built-in rule with options already does the job (ESLint `no-restricted-imports`, `no-restricted-syntax` with a selector, Ruff banned-api settings, import-boundary plugins). Some tools have no plugin API at all: Ruff cannot load custom rules, so a Python convention it cannot express goes to Semgrep or a Pylint or Flake8 plugin. When a custom rule is needed, it should work on the syntax tree, have tests for every valid and invalid shape, offer an autofix only when the fix is provably equivalent, and give an error message that tells the developer what to do.
</context>

<task>
Enforce this convention with a lint rule, using {{tool}}:

<convention>
{{convention}}
</convention>

1. Read the repository's lint setup: tool and version, config files, any existing local plugins or custom rules and how they are registered and tested. Follow that structure.
2. Restate the convention as a precise check: which syntax shapes are violations, which are allowed, and the edge cases (aliases, re-exports, dynamic imports, type-only imports, generated files, tests). Ask if the convention is ambiguous rather than guessing.
3. Check for an existing rule or configuration that already enforces it. If one does, configure it and stop there, explaining why no custom code is needed.
4. Otherwise write the rule against the AST (or the tool's pattern language for Semgrep and similar), not regex over text. Include a clear message with the reason and the fix, and metadata (docs description, rule id under the project's plugin prefix).
5. Add an autofix only if the replacement is always behaviour-preserving; otherwise offer a suggestion (ESLint `hasSuggestions`) or no fix, and say why.
6. Write tests with the tool's rule tester: at least five valid cases including the tricky allowed ones, and at least five invalid cases with expected messages and, where there is a fix, the expected output.
7. Register the rule in the config at `{{severity}}` level, scoped to the right files and excluding generated code.
8. Run the rule tests, then run the linter on the repository and report the number of violations by directory. If there are many, recommend keeping it at warn and fixing them in a separate change; do not mass-suppress.
</task>

<constraints>
- Use only APIs of the installed tool version. If unsure of an API name or option, check the tool's types or docs in the installed package and say what you checked.
- Never ship an autofix that can change runtime behaviour.
- Do not add inline suppressions to existing code to make the new rule pass.
- Keep the rule focused on one convention.
</constraints>

<output_format>
## Approach
Built-in configuration or custom rule, and why. The precise definition of a violation.

## Rule
The rule code or configuration, with file paths.

## Tests
The test file with valid and invalid cases.

## Registration
Config changes and severity.

## Repository impact
Violations found by directory, and the suggested follow-up.

## Limitations
Shapes the rule cannot catch and known false positives.
</output_format>
