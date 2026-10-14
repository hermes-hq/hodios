---
schema: 1
id: upgrade-rails-major-version
kind: prompt
title: Upgrade Rails to a new version
description: Upgrades a Rails app one minor version at a time with dual booting, rails app:update, new framework defaults flipped one by one, Zeitwerk, deprecations and gem compatibility.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [rails]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: expert
depth: advanced
tags: [dual-boot, framework-defaults, zeitwerk, gems, breaking-changes]
pairs_with:
  prompts: [runtime-upgrade-track, upgrade-major-dependency, review-rails-change]
args:
  - name: target_version
    description: The Rails version to reach.
    type: string
    default: "the latest stable release"
  - name: notes
    description: "Current Rails and Ruby versions, key gems (Devise, Sidekiq, Paperclip, Sprockets or other asset tooling), test suite and coverage, deploy setup."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Upgrade path, Gem blockers, Changes per step, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Rails upgrade guide recommends moving one minor version at a time (for example 6.1, 7.0, 7.1, 7.2, 8.0), and teams that do upgrades well add two habits: dual booting, so the suite runs against the current and next version from one branch with a second Gemfile lock, and flipping new framework defaults one at a time. What experienced people know: `rails app:update` regenerates config and creates a `new_framework_defaults` initializer whose settings should be enabled one by one, deployed, and only then folded into `config.load_defaults`; some defaults are risky to flip without a transition plan, such as cookie serialization and key generator digest changes that can log every user out, or cache format changes that need old and new readers during a rolling deploy. Zeitwerk is the only autoloader since 7.0, and `bin/rails zeitwerk:check` finds files whose names do not match their constants. Setting deprecation behaviour to raise in tests surfaces next-version breakage early. Each Rails version has a minimum Ruby, and gems are the usual blockers (abandoned gems like Paperclip need replacing). Asset pipeline defaults also changed across recent versions, but existing apps can keep their current asset setup.
</context>

<task>
Upgrade this Rails app to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the Gemfile and lockfile, `config/application.rb` (current `load_defaults`), initializers, the Ruby version in development, CI and production, and the test setup.
2. Build the path one minor at a time to the target, with the Ruby minimum for each and where Ruby must be upgraded first.
3. Check gems for each step (`bundle outdated`, gem changelogs); list blockers and replacements, and stop for a decision on any gem without a path.
4. Record the baseline: full test suite, deprecation warnings, `zeitwerk:check`, and boot time.
5. Set up dual booting for the next version if the user agrees. For each step: fix deprecations on the current version, bump Rails and gems, run `rails app:update` and review each config diff by hand, fix failures, and commit.
6. Enable `new_framework_defaults` settings one at a time, flagging risky ones (cookies, encryption, cache format, key generation) with a rollout plan, and move to the new `load_defaults` only when all are on.
7. After the final step, run the full suite with deprecations raising, `zeitwerk:check`, and a staging deploy with real-like traffic before production.
</task>

<constraints>
- One minor version per step; do not jump majors.
- Do not accept `rails app:update` overwrites blindly; existing config choices must survive unless deliberately changed.
- Do not flip session, cookie, encryption or cache defaults without a plan for live sessions and rolling deploys.
- Do not guess version requirements or default names; read the official upgrade guide for each step.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Rails, Ruby, key gems, current load_defaults, baseline results.
## Upgrade path
Table: step, Rails version, Ruby minimum, notable changes.
## Gem blockers
Table: gem, status per step, replacement, decision.
## Changes per step
Deprecations fixed, config diffs, defaults flipped and their rollout notes.
## Verification
Tests, zeitwerk check, staging results.
</output_format>
