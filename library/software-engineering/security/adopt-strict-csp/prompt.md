---
schema: 1
id: adopt-strict-csp
kind: prompt
title: Adopt a strict Content Security Policy
description: Moves a web app to a nonce- or hash-based strict Content Security Policy by refactoring inline scripts, event handlers and eval, then enforcing after a report-only period.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [frontend-engineer, fullstack-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, config, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [csp, strict-dynamic, nonces, inline-scripts, xss-mitigation]
pairs_with:
  prompts: [harden-web-app-config, fix-xss-vulnerabilities, secure-third-party-scripts]
  personas: [security-auditor]
args:
  - name: app
    description: The app, its framework and rendering (server-rendered, static, SPA), and where responses are cached (CDN, reverse proxy).
    type: text
    required: true
  - name: current_policy
    description: The current CSP header, if any. Leave empty if there is none.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Policy, Code changes, Rollout, Verification, Exceptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Allowlist-based CSPs (`script-src 'self' cdn.example.com 'unsafe-inline'`) rarely stop XSS: `unsafe-inline` defeats the purpose, and allowlisted CDNs often host JSONP endpoints or old library versions that let an attacker run script anyway. A strict CSP uses a per-response random nonce or script hashes with `'strict-dynamic'`, so only scripts the server marked, and scripts they load, can run: `script-src 'nonce-{random}' 'strict-dynamic'; object-src 'none'; base-uri 'none'`. Adding the header is the easy part; the work is in the code. Inline event handlers (`onclick="..."`), `javascript:` URLs, inline `<script>` blocks without the nonce, and `eval`, `new Function` or string `setTimeout` all break. Nonces must be fresh per response, which conflicts with full-page caching at a CDN; static or cached pages use hashes instead. Some frameworks support nonces natively (for example through middleware that sets a header the renderer reads), often at the cost of static optimisation.
</context>

<task>
Move {{app}} to a strict CSP.
{{#current_policy}}Current policy: {{current_policy}}{{/current_policy}}

1. Inventory what will break: search templates and components for inline `<script>` blocks, `on*=` attributes, `javascript:` URLs, `eval`, `new Function`, string timers, and `dangerouslySetInnerHTML` or equivalents that inject scripts; list third-party scripts and how they are loaded.
2. Decide nonce or hash per page type: nonces for dynamically rendered responses, hashes for static or CDN-cached pages. Check how the framework supports nonces and what it costs (for example forcing dynamic rendering).
3. Refactor: move inline handlers to `addEventListener` in bundled code, replace `javascript:` links with buttons, give remaining inline scripts the nonce, and remove eval-based code or note the library that needs it.
4. Generate a cryptographically random nonce per response in server middleware, pass it to the renderer, and add it to every script tag the app emits; make sure cached responses never reuse a nonce.
5. Write the policy: `script-src 'nonce-...' 'strict-dynamic'` with `https:` and `'unsafe-inline'` as fallbacks for old browsers only (ignored when nonces are supported), `object-src 'none'`, `base-uri 'none'`, plus `report-to` or `report-uri`. Keep style and other directives separate and less strict if needed.
6. Ship as `Content-Security-Policy-Report-Only` first, collect reports, fix real violations, and switch to enforcing once reports are only noise (browser extensions).
7. Add a test that fetches a page and asserts the header and that every script tag carries the current nonce. Run the tests and a production build.
</task>

<constraints>
- Never add `'unsafe-inline'` or `'unsafe-eval'` as the effective policy to make something work; list the exception and a plan to remove it.
- Do not reuse nonces across responses or derive them from predictable values.
- Keep the app working in report-only mode before any enforcing change.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: file:line, pattern (inline script, handler, eval, third-party), fix.
## Policy
The final header value in a code block, and the report-only version.
## Code changes
One line per file: `path`, what changed.
## Rollout
Steps from report-only to enforcing, and what to watch in reports.
## Verification
Commands run and actual results.
## Exceptions
Anything that still needs a weaker setting, why, and how to remove it.
</output_format>
