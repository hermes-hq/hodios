---
schema: 1
id: upgrade-laravel-major-version
kind: prompt
title: Upgrade Laravel to a new major version
description: Upgrades a Laravel app one major version at a time, covering PHP requirements, the upgrade guide's breaking changes, package compatibility, Carbon and config, and the optional new app structure.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [laravel]
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
tags: [composer, breaking-changes, third-party-packages, carbon]
pairs_with:
  prompts: [upgrade-php-version, upgrade-major-dependency, review-laravel-change]
args:
  - name: target_version
    description: The Laravel major version to reach.
    type: string
    default: "the latest major"
  - name: notes
    description: "Current Laravel and PHP versions, first-party packages (Sanctum, Horizon, Nova, Livewire, Inertia), key third-party packages, test suite, hosting."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Upgrade path, Package compatibility, Changes per step, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Laravel releases a major version roughly once a year, and each has an official upgrade guide that sorts changes by likely impact. What experienced people know: go one major at a time, because each guide assumes the previous version; check the PHP minimum first, since several majors raised it and hosting may need to move; Composer is where most failures show up, and `composer why-not laravel/framework <version>` names the packages holding you back. First-party packages (Sanctum, Horizon, Nova, Livewire, Inertia adapters) have their own major versions and upgrade guides. Laravel 11 introduced a slimmer application skeleton (no HTTP and console kernels, configuration in `bootstrap/app.php`, fewer published config files), but existing apps are not required to adopt it, and doing so mid-upgrade mixes two changes. Laravel 11 allows Carbon 3 and later majors require it; Carbon 3 changed `diffIn*` methods to return floats that can be negative, which breaks date arithmetic quietly. Model `$dates` was removed in favour of casts, and type declarations were added across the framework, which matters if you extend framework classes. Paid automated upgrade services exist, but their output still needs review.
</context>

<task>
Upgrade this Laravel app to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read `composer.json`, `composer.lock`, config files, service providers, kernels or `bootstrap/app.php`, and the PHP version in development, CI and production.
2. Build the path one major at a time with the PHP minimum for each; if PHP must move first, plan that as its own step.
3. Check each package for support of each step (`composer why-not`, package changelogs). List blockers and replacements, and stop for a decision on any package with no path.
4. Record the baseline: test suite, static analysis if present (PHPStan or Larastan), and a list of critical flows (auth, payments, queues, scheduled tasks).
5. For each major step: work through that version's upgrade guide from high to low impact, checking each item against this codebase and noting which apply; update `composer.json` constraints, run `composer update` with the framework and related packages, fix failures, and commit.
6. Check date handling for Carbon changes, casts replacing `$dates`, and classes that extend framework classes for signature changes.
7. Keep the existing application structure unless the user asks to adopt the new skeleton; if they do, do it as a separate change afterwards.
8. After the final step, run tests and static analysis, then exercise queues, scheduled tasks and the critical flows in a staging environment.
</task>

<constraints>
- One major version per step; do not skip guides.
- Do not use `--ignore-platform-reqs` to install packages on an unsupported PHP version.
- Do not restructure the app to the new skeleton as part of the version upgrade unless asked.
- Do not guess guide contents; read the official upgrade guide for each version.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Laravel, PHP and package versions; baseline results.
## Upgrade path
Table: step, Laravel version, PHP minimum, high-impact changes.
## Package compatibility
Table: package, version per step, blockers and decisions.
## Changes per step
Guide items that applied and how each was handled.
## Verification
Tests, static analysis, staging checks of queues, schedules and flows.
</output_format>
