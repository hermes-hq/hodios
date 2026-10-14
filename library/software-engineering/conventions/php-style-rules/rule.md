---
schema: 1
id: php-style-rules
kind: rule
title: PHP style rules
description: Standing rules for modern PHP an assistant writes, covering strict types, typed properties and returns, PSR-12 and PSR-4, exceptions over error codes, prepared statements and Composer hygiene.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [php]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [strict-types, psr-12, composer, type-declarations, prepared-statements]
applies_to: ["**/*.php"]
pairs_with:
  rules: [laravel-rules, error-handling-rules, secure-coding-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change PHP code in this project:

**Know the project first**
- Check the PHP version in `composer.json` (`require.php`) and the platform config, and use only features that version supports. Follow the framework's conventions if one is in use; framework rules take precedence over these.
- Follow the project's coding standard and static analysis setup (PHP_CodeSniffer, PHP-CS-Fixer, PHPStan or Psalm level). New code must not add analyser errors or baseline entries.

**Types**
- Start every new file with `declare(strict_types=1);`.
- Declare parameter, return and property types everywhere, including `void`, `never`, nullable `?Type` and union types where they are honest. Use `mixed` only when a value really can be anything, and say why.
- Prefer small value objects and enums (`enum Status: string`) over magic strings and arrays with implicit keys. Document array shapes with PHPDoc (`array<string, int>`, `list<User>`) where a class would be overkill.
- Use `readonly` properties and constructor promotion for immutable data.

**Structure**
- Follow PSR-4 autoloading: one class per file, namespace matching the directory. Follow PSR-12 formatting unless the project's formatter says otherwise.
- Inject dependencies through constructors. No `new` of services inside business logic, no service locators, and no global state or `static` mutable properties.
- Keep functions short and side effects visible. Prefer early returns over nested conditionals.

**Errors**
- Throw specific exceptions (domain-specific classes extending SPL exceptions) instead of returning `false` or `null` for failure. Never use the `@` error-suppression operator.
- Catch only what you can handle, and rethrow with context using the `$previous` argument.
- Use strict comparisons (`===`, `!==`, `in_array($x, $list, true)`).

**Security**
- Use prepared statements or the query builder for every query; never interpolate input into SQL.
- Escape output for its context (HTML, attribute, URL, JavaScript); use the template engine's auto-escaping.
- Hash passwords with `password_hash` and `password_verify`. Never use `md5` or `sha1` for passwords, `unserialize` on untrusted data, or `eval`.
- Generate tokens with `random_bytes` or `random_int`, not `rand` or `uniqid`.

**Dependencies and tests**
- Add dependencies through Composer with a version constraint, commit `composer.lock` for applications, and do not add a package for something the standard library does in a few lines.
- Write PHPUnit or Pest tests for new behaviour, with data providers for input variations. Do not mock what you do not own; wrap it.
