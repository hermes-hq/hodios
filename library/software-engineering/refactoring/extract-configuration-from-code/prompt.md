---
schema: 1
id: extract-configuration-from-code
kind: prompt
title: Extract configuration from code
description: Finds hard-coded URLs, limits, credentials and feature switches, moves them into typed configuration with defaults and validation, and updates usages and docs without committing secrets.
category: refactoring
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [configuration, environment-variables, twelve-factor, hard-coded-values, secrets]
pairs_with:
  prompts: [add-feature-flag]
args:
  - name: scope
    description: Files, directories or the service to work on, for example "services/billing/" or "the whole repo".
    type: text
    required: true
  - name: config_style
    description: "env-vars: environment variables read into one typed settings object. config-file: a checked-in config file per environment. both: file for defaults, environment variables override."
    type: enum
    enum: [env-vars, config-file, both]
    default: env-vars
  - name: test_command
    description: The command that runs the tests, for example "make test" or "go test ./...".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Found, Configuration schema, Changes, Secrets, Left in code, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Hard-coded values make a service impossible to run in a second environment and hide decisions in random files. Extracting them carelessly creates worse problems: configuration read with `getenv` in forty places with no validation, so a typo in a variable name silently becomes an empty string; defaults that point production at a staging URL; secrets copied into a committed `.env.example`; and true constants (HTTP status codes, unit conversions, protocol values) turned into knobs nobody should turn. Good extraction gives one typed, validated configuration object, loaded once at startup, that fails loudly on missing required values.
</context>

<task>
Extract configuration from {{scope}} using the {{config_style}} style.

1. Run `{{test_command}}` and record the baseline. If it fails, stop and report.
2. Find candidate values: base URLs and hostnames, ports, credentials, tokens and keys, timeouts, retry counts, rate and size limits, batch sizes, queue and bucket names, feature switches, email addresses and paths that differ by environment.
3. Classify each one:
   - Configuration: differs between environments or operators need to change it without a code change.
   - Secret: a credential or key. It becomes required configuration with no default, ever.
   - Constant: never changes per environment (protocol values, maths, business rules owned by code). Leave it in code, but give magic numbers a named constant if that is clearly in scope.
4. Look for an existing configuration mechanism first (a settings module, a config library, a typed options class) and extend it. Create a new one only if none exists, using the language's established tool, and place it where the project keeps infrastructure code.
5. Define each setting once with: a clear name following the project's convention, a type, a safe default for non-secret values that is correct for local development (never a production endpoint), validation (required, range, URL format, allowed values) and a one-line description. Load and validate it once at startup and fail with a message naming the missing or invalid setting.
6. Replace every usage with a read from the configuration object, passed in or injected the way the codebase already does it. Do not scatter direct environment reads.
7. Update the documentation: an example file (such as `.env.example` or a sample config) listing every setting with placeholder values for secrets, and the README or deployment docs if they list settings.
8. If a real secret is currently committed in the repository, do not just move it: replace it with configuration, flag it under Secrets as needing rotation, and note that it remains in git history.
9. Run `{{test_command}}` again, plus the build and type check. Tests that relied on hard-coded values get configuration supplied through the test setup, not production defaults.
</task>

<constraints>
- Never write a real secret value into any file, example, test fixture or your report. Use placeholders such as `change-me`.
- Do not change behaviour: with the defaults (or the current production values supplied), the program behaves as before.
- Do not rename existing environment variables that deployments already set; if a rename is worthwhile, support the old name and list it as a follow-up.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Baseline
Test command and result before changes.

## Found
| Value (redacted if secret) | File:line | Class: configuration, secret or constant | Setting name |

## Configuration schema
The settings definition as code, with types, defaults and validation.

## Changes
A unified diff.

## Secrets
Committed secrets found and the rotation needed, or "None found".

## Left in code
Values deliberately kept as constants, with a reason.

## Verification
Commands run and their real results, and what happens when a required setting is missing.
</output_format>
