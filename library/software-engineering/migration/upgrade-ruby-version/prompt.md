---
schema: 1
id: upgrade-ruby-version
kind: prompt
title: Upgrade an app to a newer Ruby version
description: Moves a Ruby app or gem to a newer Ruby, fixing keyword-argument, frozen-string and Psych changes, gems leaving the default set, native gem builds, Bundler and CI.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [ruby]
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
tags: [bundler, keyword-arguments, deprecations, end-of-life]
pairs_with:
  prompts: [upgrade-rails-major-version, runtime-upgrade-track, fix-breakage-after-dependency-upgrade]
args:
  - name: target_version
    description: The Ruby version to move to, for example "3.4".
    type: string
    required: true
  - name: notes
    description: "Current Ruby version, framework (Rails, Sinatra, plain gem), native gems in use, version manager, Docker images, CI and hosting."
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
A Ruby upgrade is a language upgrade, separate from a Rails upgrade, and the two should not be done in one step; the framework version also limits which Ruby versions are supported. The known breakpoints: Ruby 3.0 separated positional and keyword arguments, so passing a hash where keywords are expected (or the reverse) raises `ArgumentError`; 2.7 warns about every such call when deprecation warnings are on (`RUBYOPT=-W:deprecated`). Ruby 3.1 ships Psych 4, where `YAML.load` behaves like `safe_load`, so YAML with aliases or custom classes stops loading. Ruby 3.2 removed `File.exists?`, `Dir.exists?` and the taint methods. From 3.3 to 3.4 several default gems became bundled gems (`base64`, `bigdecimal`, `csv`, `mutex_m`, `drb`, `observer` and others), so they must be listed in the Gemfile or `require` fails under Bundler. Ruby 3.4 makes string literals without the magic comment "chilled" and, with deprecation warnings enabled, warns when they are mutated, ahead of frozen string literals by default; it also changed `Hash#inspect` output and backtrace quoting, which breaks snapshot and error-message tests. Later releases continue these moves, so read the notes for every version you skip. Gems with native extensions (nokogiri, pg, mysql2, ffi, grpc) need versions with precompiled builds or a working toolchain for the new version.
</context>

<task>
Upgrade this app to Ruby {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find where the version is set: `.ruby-version`, `.tool-versions`, the `ruby` line in the Gemfile, `RUBY VERSION` in `Gemfile.lock`, gemspec `required_ruby_version`, Dockerfiles and CI. List the versions skipped and check the framework's supported Ruby range.
2. On the current version, run the suite with deprecation warnings enabled and collect them; fix keyword-argument and other warnings first, while the old version still runs.
3. Check gems: run `bundle outdated`, find gems that need a release supporting the target (native extensions especially), and add gems that left the default set. Stop for a decision on gems with no supported version.
4. Install the target Ruby, run `bundle install` and the full suite. Group failures by cause: argument handling, YAML loading, removed methods, bundled gems, string mutation, output format changes.
5. Fix each cause in small commits. For YAML, use `permitted_classes` or a reviewed `unsafe_load` only for trusted files. For frozen strings, use `+""` or `.dup` where mutation is intended.
6. Run CI on both versions until production moves, then update the version files, the lockfile's Ruby and Bundler versions, Docker images and docs. Optionally evaluate enabling YJIT as a separate change.
7. Propose a rollout through staging with logs watched for warnings and native gem errors.
</task>

<constraints>
- Do not combine the Ruby upgrade with a framework major upgrade in the same change.
- Do not switch YAML loading to `unsafe_load` for user-supplied input.
- Do not silence warnings with `Warning` overrides to make the suite look clean.
- Only cite behaviour changes confirmed in the release notes or seen in a failing run.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current version, versions skipped, framework support range, native gems.
## Findings
Table: cause, count, example, fix.
## Changes made
Gem changes, code fixes, version file updates.
## Verification
Suite results on both versions, warnings before and after.
## Rollout
Environments in order, monitoring, rollback.
</output_format>
