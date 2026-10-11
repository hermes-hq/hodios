---
schema: 1
id: ruby-style-rules
kind: rule
title: Ruby style rules
description: Standing rules for plain Ruby an assistant writes, covering RuboCop-clean code, small objects, explicit errors, frozen string literals, safe metaprogramming limits and RSpec or Minitest tests.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, devops-engineer]
stack: [ruby]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [rubocop, rspec, metaprogramming, gems, idioms]
applies_to: ["**/*.rb", "**/*.rake", "Gemfile", "**/*.gemspec"]
pairs_with:
  rules: [rails-rules, error-handling-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Ruby code in this project:

**Know the project first**
- Check the Ruby version in `.ruby-version` or the `Gemfile` and use only features it supports. In a Rails app, Rails conventions come first.
- Follow the project's `.rubocop.yml` (or Standard). New code must pass it without new inline disables; if a disable is necessary, scope it to the line and say why.

**Style**
- Add `# frozen_string_literal: true` to new files if the project uses it.
- Name methods for what they return or do: predicates end in `?`, methods that mutate the receiver or can raise where a sibling does not end in `!`.
- Prefer guard clauses over nested conditionals, `each`, `map`, `select` and `each_with_object` over manual index loops, and keyword arguments for anything beyond two positional parameters.
- Keep methods short and classes focused. Extract a plain Ruby object before reaching for a module mixin.

**Errors**
- Raise specific error classes that inherit from `StandardError`, never from `Exception`. Do not `rescue Exception` or bare `rescue => e` around large blocks; rescue the narrowest class at the point you can handle it.
- Do not use exceptions for control flow, and do not swallow errors with `rescue nil`.
- Use `fetch` on hashes when a key must be present, so a missing key fails loudly.

**Metaprogramming**
- Avoid `method_missing`, `define_method` loops, `instance_variable_set` and monkey-patching core classes unless the project already relies on the pattern. If you use `method_missing`, also implement `respond_to_missing?`.
- Never call `eval`, `send` or `constantize` on user input. Prefer `public_send` with an allowlist.

**Safety**
- Use `Open3` or array-form `system` for shell commands, never string interpolation into backticks.
- Do not use `Marshal.load` or `YAML.load` on untrusted data; use `YAML.safe_load` or JSON.

**Dependencies and tests**
- Add gems with a pessimistic version constraint (`~>`) and only when the standard library cannot do the job in a few lines. Commit `Gemfile.lock` for applications; for gems, follow the project's existing practice.
- Write tests in the framework the project uses (RSpec or Minitest). One behaviour per example, descriptive names, `let` over instance variables in RSpec, and no `sleep` for synchronisation.
