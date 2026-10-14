---
schema: 1
id: add-csrf-protection
kind: prompt
title: Add CSRF protection
description: Adds cross-site request forgery protection to a cookie-authenticated app with SameSite cookies, framework tokens or origin checks, covering forms, fetch calls and exempt webhooks.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [csrf, cookies, samesite, owasp]
pairs_with:
  prompts: [harden-web-app-config, review-auth-flow, build-webhook-handler, fix-cookie-not-being-set]
  personas: [security-auditor]
args:
  - name: app
    description: The app, how users authenticate (session cookie, JWT in a cookie) and the clients that call it.
    type: text
    required: true
  - name: stack
    description: Backend and frontend frameworks. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Exposure, Design, Changes, Tests, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CSRF matters whenever the browser attaches credentials automatically: session cookies, JWTs stored in cookies, and HTTP basic auth. APIs that only accept a bearer token from an `Authorization` header are not exposed. `SameSite=Lax` (the default only in Chromium-based browsers, so set it explicitly) blocks most cross-site POSTs but not top-level GET navigations, so any GET that changes state stays vulnerable; it also treats sibling subdomains as same-site, so a compromised or user-content subdomain can still attack. Defence in depth combines: no state changes on GET, `SameSite=Lax` or `Strict` on the session cookie, and either the framework's synchronizer token or a check that the `Origin` (or `Sec-Fetch-Site`) header matches the app. Single-page apps usually use the double-submit pattern the framework supports (a readable token cookie echoed in a header). Common mistakes: disabling CSRF globally to make an API work, exempting whole route prefixes, accepting a missing token when the header is absent, CORS with credentials and a reflected origin, and forgetting login, logout and file upload forms. Webhooks from other services need signature verification instead of CSRF tokens.
</context>

<task>
Add CSRF protection to {{app}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read how authentication works and whether the framework's CSRF protection exists but is disabled or partially exempted. Find the session cookie settings and the CORS config.
2. Decide if the app is exposed: list which credentials the browser sends automatically. If the API only uses `Authorization` headers and no cookies, say so and stop at a short report.
3. List every state-changing route, including any GET that changes state, login, logout, uploads, and routes currently exempt.
4. Implement:
   - move state changes off GET;
   - set `SameSite=Lax` (or `Strict` where the UX allows), `Secure` and `HttpOnly` on session cookies;
   - enable the framework's CSRF middleware, or add an `Origin` and `Sec-Fetch-Site` check that rejects cross-site state-changing requests and requests with neither header;
   - wire the token into server-rendered forms and the frontend's HTTP client (header on every unsafe method);
   - keep exemptions only for routes authenticated another way (webhooks with signature checks, token-only APIs) and list each;
   - make sure CORS does not reflect arbitrary origins with credentials.
5. Add tests: a cross-origin POST without a token is rejected, a same-origin request with the token succeeds, a GET no longer changes state, and each exemption is limited to its route.
6. Run the tests and the type check.
</task>

<constraints>
- Never disable CSRF protection globally to make a client work; fix the client.
- Do not exempt route prefixes wholesale.
- Keep all existing clients working; list any client that needs a change.
- Do not rely on custom headers alone unless CORS is confirmed to block them cross-origin.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Exposure
Which credentials are sent automatically, and which routes were exposed.
## Design
The defences chosen and why, as a short list.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Rollout
Client changes, cache or session impact, and how to monitor rejected requests after release.
</output_format>
