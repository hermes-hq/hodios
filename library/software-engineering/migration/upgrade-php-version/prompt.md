---
schema: 1
id: upgrade-php-version
kind: prompt
title: Upgrade a PHP codebase to a newer PHP version
description: Upgrades a PHP codebase to a newer version, such as 7.4 to 8.x, finding removed functions, type and null deprecations and comparison changes with static analysis and Rector, then fixing them safely.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [php]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rector, static-analysis, deprecations, composer]
pairs_with:
  prompts: [runtime-upgrade-track, upgrade-laravel-major-version]
args:
  - name: target_version
    description: The PHP version to move to.
    type: string
    required: true
  - name: notes
    description: "Current PHP version, framework or CMS, extensions used, test coverage, static analysis in use, hosting and Docker images."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Findings, Changes made, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PHP upgrades fail in two ways: fatal errors you see at once, and changed behaviour you do not. What experienced people check for the 7.x to 8.x jump and beyond: string-to-number comparison changed in 8.0 (`0 == "abc"` is now false), which silently alters conditions; many internal functions throw `TypeError` or `ValueError` instead of returning false or null; passing null to non-nullable internal parameters is deprecated from 8.1 (`strlen(null)`, `trim(null)`), producing floods of deprecations in older code; removed features include `each()`, `create_function()`, curly-brace string offsets and some magic quotes leftovers; resource types became objects for curl, GD and others, breaking `is_resource` checks; dynamic properties are deprecated from 8.2; `${var}` string interpolation is deprecated in 8.2. Tools do most of the finding: PHPCompatibility rules for PHP_CodeSniffer scan for version incompatibilities, PHPStan or Psalm configured for the target version catch type issues, and Rector applies many fixes automatically, but its output still needs review. Composer's `platform` setting and `composer why-not php <version>` show which dependencies block the move. Extensions must exist for the new version in every environment.
</context>

<task>
Upgrade this codebase to PHP {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `composer.json` (PHP constraint, `config.platform`), the lockfile, Dockerfiles, CI matrix, server config and the list of extensions in use.
2. Check dependencies with `composer why-not php {{target_version}}` (or equivalent) and list packages that must be upgraded first; stop for a decision on any with no supported version.
3. Scan the code: PHPCompatibility for the target version, static analysis configured for the target version, and a test run on the target version with all deprecations reported. Group findings by kind (removed functions, comparison changes, null to internal functions, dynamic properties, resource checks, signature changes).
4. Apply Rector rule sets for the target version on a branch, one set per commit, and review each diff. Fix the rest by hand.
5. Look specifically for loose comparisons between strings and numbers in conditions and fix any whose result changes, with tests.
6. Run the suite on both the current and target versions in CI until the rollout is done, so the code stays compatible with both.
7. Update Docker images, CI and documentation, and propose a rollout: staging on the new version, monitoring error logs for deprecations and type errors, then production.
</task>

<constraints>
- Do not suppress deprecations or errors with `@` or error reporting changes to make tests pass.
- Do not raise the minimum PHP in `composer.json` until production is on the new version, unless the user decides otherwise.
- Review every automated change; Rector can change behaviour in edge cases.
- Do not modify vendor code; upgrade or replace the package instead.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
PHP version, framework, extensions, dependency blockers.
## Findings
Table: kind of issue, count, examples, fix approach.
## Changes made
Rector sets applied, manual fixes, dependencies upgraded.
## Verification
Tests on both versions, static analysis, deprecation counts before and after.
## Rollout
Environments to update, monitoring and rollback.
</output_format>
