---
schema: 1
id: separate-php-templates-from-logic
kind: prompt
title: Separate legacy PHP templates from logic
description: Splits legacy PHP pages that mix HTML, SQL queries and request handling into a handler, data-access functions and a template, producing byte-identical output and fixing nothing silently.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
stack: [php]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [legacy-php, templates, separation-of-concerns, characterization-tests]
pairs_with:
  prompts: [move-logic-out-of-controllers, decouple-for-testability]
  personas: [php-laravel-engineer, legacy-code-steward]
  rules: [php-style-rules]
args:
  - name: page
    description: The PHP file to split, as a path or pasted code, the PHP version, and what it includes (config, header and footer files, database helpers).
    type: text
    required: true
  - name: test_command
    description: How to run tests or render the page locally, if available.
    type: string
output_contract:
  format: markdown
  sections: [What the page does, Target layout, Golden output, Diff, Security notes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a PHP engineer working on legacy pages: one `.php` file that reads `$_GET` and `$_POST`, opens a database connection, runs queries (sometimes built by string concatenation), sets session values, decides redirects, and echoes HTML with loops and conditionals interleaved. Nobody dares touch it because there are no tests.

The incremental target, before any framework migration: a handler section at the top (or a separate function) that reads input, calls data-access functions and prepares plain variables; data-access functions in their own file that take parameters and return arrays; and a template file that only displays the prepared variables, escaping each with `htmlspecialchars` (or the project's helper) at output.

Behaviour traps: output already sent (even whitespace before `<?php` or after `?>` in an included file) breaks later `header()` and `session_start()` calls, so moving code can surface or hide "headers already sent"; included files share variables, so a template that read a variable set three includes away must now receive it explicitly; `extract()` and `global` hide data flow; output buffering may be on or off per server; and a template that echoes unescaped values today is an XSS hole, but escaping it changes output, so it is reported and fixed with consent, not silently. Golden-master testing fits here: capture the full HTML and headers for representative requests before refactoring and compare after.
</context>

<task>
Split {{page}}.

1. Read the page and its includes, and list what it does in order: input read, session use, queries, decisions, redirects and headers, output regions. Note every variable the HTML uses and where it is set, and any SQL built from input or unescaped output.
2. Propose the target layout (handler, data-access file, template, and where they live following the project's existing structure). Wait for approval.
3. Capture golden output: for representative requests (GET, POST valid, POST invalid, not logged in, empty data), record status, headers and full HTML{{#test_command}} using `{{test_command}}`{{/test_command}}. Use a local or test database, never production.
4. Move code in steps: data access first, then the handler, then the template. After each step, compare against the golden output byte for byte.
5. Report the diff and, separately, the security issues found (SQL injection, unescaped output, missing CSRF checks) with the proposed fix for each, applied only with consent.
</task>

<constraints>
- Output, headers, redirects and session effects stay identical; compare against golden output after each step.
- Security fixes that change output are proposed separately and applied only with consent; SQL injection fixes with prepared statements do not change output and may be included if agreed.
- Never run golden captures against a production database.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the page does
Ordered list of steps, with variables and where they are set.
## Target layout
Files and responsibilities.
## Golden output
Requests captured and how they are compared.
## Diff
The change.
## Security notes
Issues found and proposed fixes.
## Check
Golden comparison results per step.
</output_format>
