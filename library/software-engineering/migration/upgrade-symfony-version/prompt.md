---
schema: 1
id: upgrade-symfony-version
kind: prompt
title: Upgrade a Symfony app to a new major version
description: Upgrades a Symfony app across a major version by reaching the last minor, clearing the deprecation log with Rector and manual fixes, updating Flex recipes and bundles, then bumping the major.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [symfony]
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
depth: specific
tags: [deprecations, rector, symfony-flex, composer, lts]
pairs_with:
  prompts: [upgrade-php-version, upgrade-major-dependency, upgrade-laravel-major-version]
args:
  - name: target_version
    description: The Symfony version to reach, for example "7.4".
    type: string
    required: true
  - name: notes
    description: "Current Symfony and PHP versions, third-party bundles, Doctrine version, authentication setup, use of annotations, test coverage and hosting."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Path, Deprecations, Changes made, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Symfony's release process makes major upgrades predictable if you follow it. The last minor of a major (X.4, the LTS) has the same features as the next X+1.0, which only removes what X.4 deprecated. So the safe path is: upgrade to the latest X.4, make the deprecation log empty, then bump to X+1.0, which should then mostly just work. Deprecations show in the profiler, the logs and the PHPUnit bridge output (`SYMFONY_DEPRECATIONS_HELPER`); the debug class loader also reports missing return types on classes that extend Symfony ones, because new majors add native return types to interfaces. `extra.symfony.require` in `composer.json` controls which Symfony version Flex installs, and must change with the target. Recipes change between versions; `composer recipes` lists outdated ones and `composer recipes:update` applies them one at a time as reviewable diffs. Rector's Symfony sets automate many changes, such as annotations to attributes, which matters because newer majors dropped annotation support for routing and other components. Each major raises the PHP minimum (Symfony 7 needs PHP 8.2). Third-party bundles are the common blocker: `composer why-not symfony/framework-bundle <version>` shows which packages hold you back. Security config changed heavily across 5 to 6 (the authenticator system replaced Guard).
</context>

<task>
Upgrade this app to Symfony {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `composer.json` (including `extra.symfony.require`), `symfony.lock`, `config/`, the security config, bundles in `config/bundles.php`, the PHP version in every environment and the test setup.
2. Write the path: each step from the current version to the latest minor of the current major, then each major up to the target. Check the PHP minimum for each step.
3. Check bundles and libraries with `composer why-not` for each step and list blockers with an upgrade, replacement or decision needed.
4. Upgrade to the latest minor of the current major. Collect deprecations from the test suite with the PHPUnit bridge, the logs and the profiler while exercising the main pages and commands. Group them by source (own code, bundles, config).
5. Fix deprecations: apply Rector's Symfony and Doctrine sets one at a time and review each diff, then fix the rest by hand, including return types on extended classes and security config changes. Update recipes one by one with `composer recipes:update`, reviewing every diff against local changes.
6. When the deprecation log is clean for your code, bump `extra.symfony.require` and the constraints to the next major, run `composer update "symfony/*"` with dependencies, and run the suite. Repeat per major.
7. Clear caches, warm them in the production environment, and run the full suite and a smoke test of key pages, commands, messenger consumers and scheduled jobs.
</task>

<constraints>
- Do not skip the step of clearing deprecations on the last minor before bumping the major.
- Do not apply recipe updates blindly over customised config; review each diff.
- Do not suppress deprecations to reach a clean log.
- Do not cite removed features or config keys without confirming them in the upgrade notes (`UPGRADE-X.0.md`) or a failing run.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current Symfony and PHP versions, bundles, blockers.
## Path
Numbered steps with the PHP requirement for each.
## Deprecations
Table: source, count, example, fix (Rector set or manual).
## Changes made
Per step: dependency changes, code and config changes, recipes updated.
## Verification
Test results per step, deprecation count per step, smoke test results.
</output_format>
