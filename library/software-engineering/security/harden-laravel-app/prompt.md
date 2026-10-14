---
schema: 1
id: harden-laravel-app
kind: prompt
title: Harden a Laravel application
description: Hardens a Laravel app for production, covering debug mode and APP_KEY, mass assignment, Blade escaping, policies, signed URLs, rate limiting and exposed tooling routes.
category: security
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [laravel]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hardening, mass-assignment, authorization-policies, blade, rate-limiting]
pairs_with:
  prompts: [review-laravel-change, audit-app-security, harden-web-app-config]
  rules: [laravel-rules]
  personas: [security-auditor]
args:
  - name: app
    description: What the app does, who its users are, and how it is deployed (Forge, Vapor, Docker, shared hosting).
    type: text
    required: true
  - name: concerns
    description: Anything specific to look at first, such as a scanner report or an admin panel. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Findings, Changes, Config to set outside the repo, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most Laravel compromises come from a short list. `APP_DEBUG=true` in production shows the Ignition error page with environment values and has had remote code execution bugs. A leaked `APP_KEY` lets an attacker forge encrypted cookies and signed URLs, and on apps that unserialize cookie payloads it leads to code execution, so a key that was ever committed must be rotated. `$guarded = []` or `Model::unguard()` combined with `$request->all()` lets users set `is_admin` or `tenant_id`. `{!! !!}` in Blade prints raw HTML. Controllers that call `Model::find($id)` without a policy or `authorize()` give object-level access to anyone logged in. Tooling such as Telescope, Horizon, Debugbar, phpMyAdmin or a public `/storage` symlink with private files gets left reachable. Raw queries (`DB::raw`, `whereRaw`) with interpolated input and file uploads stored under `public/` with user-chosen names round it off.
</context>

<task>
Harden this Laravel app: {{app}}
{{#concerns}}Look first at: {{concerns}}{{/concerns}}

1. Read `composer.json` and `composer.lock` for the Laravel and package versions, and run `composer audit` if available.
2. Config: check `.env.example`, `config/app.php` and deployment files for debug mode, `APP_ENV`, session cookie flags (`secure`, `http_only`, `same_site`), trusted proxies and hosts, and whether `.env` or keys are committed (check git history for `APP_KEY`, report by file only).
3. Models: list models with `$guarded = []`, missing `$fillable`, or `unguard()`, and controllers that pass `$request->all()` or `->input()` straight to `create`, `update` or `fill`. Switch them to `$request->validated()` from a Form Request and explicit `$fillable`.
4. Authorization: for every route that takes a model id or route-model binding, confirm a policy, gate or `authorize()` call checks ownership. Add missing policies following the app's pattern.
5. Output and queries: find `{!! !!}`, `DB::raw`, `whereRaw`, `orderByRaw` and `selectRaw` with user input. Escape or sanitise output, and use bindings or allowlisted column names.
6. Routes and tooling: run `php artisan route:list` and flag debug, Telescope, Horizon, log viewer and admin routes without an auth gate; check `TelescopeServiceProvider` gates and that dev packages are in `require-dev` only.
7. Abuse controls: rate limiting on login, password reset, registration and API routes; signed URLs (`signed` middleware) for email links and downloads; uploads validated by MIME and size and stored outside the public disk unless meant to be public.
8. Make the code changes, run the test suite and `php artisan config:cache` locally to catch config errors, and list config that must be set on the server.
</task>

<constraints>
- Never print the value of `APP_KEY`, database passwords or other secrets; name the file and line.
- Do not rotate `APP_KEY` yourself; explain the impact (sessions, encrypted columns, signed URLs) and the steps.
- Keep existing behaviour for legitimate users; list any change users will notice.
- Do not run migrations or commands against production.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Ranked table: severity, area, file:line, impact, fix.
## Changes
One line per file: `path`, what changed.
## Config to set outside the repo
Checklist of environment and server settings with the exact value.
## Verification
Commands run and their actual results.
## Residual risk
What still needs a decision or a server change.
</output_format>
