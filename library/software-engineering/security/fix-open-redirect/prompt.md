---
schema: 1
id: fix-open-redirect
kind: prompt
title: Fix open redirects
description: Fixes return-URL and redirect parameters so they only lead to allowlisted relative paths or hosts, covering login, logout, OAuth callbacks and link tracking.
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
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [open-redirect, url-validation, oauth, owasp]
pairs_with:
  prompts: [audit-input-handling, implement-protected-routes, review-auth-flow, write-exploit-regression-test]
  personas: [security-auditor]
args:
  - name: target
    description: The redirect parameters, endpoints or scanner findings to fix.
    type: text
    required: true
  - name: stack
    description: Framework and auth library. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Redirect points, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Open redirects make phishing links look trustworthy and, in OAuth and single sign-on flows, can leak authorization codes or tokens to an attacker's site. They hide in `next`, `returnTo`, `redirect_uri`, `continue` and `url` parameters on login and logout, in link tracking endpoints, in the `Referer`-based "go back" logic, and in client-side code that sets `window.location` from the query string. Naive checks fail in known ways: `startsWith('/')` accepts `//evil.example` and `/\evil.example` (browsers treat both as another host), `startsWith('https://app.example')` accepts `https://app.example.evil.example`, substring checks accept `evil.example/?app.example`, and parsers disagree about backslashes, tabs, newlines and `@`. The robust fix keeps redirects relative: parse with the platform's URL parser against your own origin, require the result's origin to equal yours, and redirect to the normalised path. Where external hosts are needed, compare the parsed host exactly against an allowlist. OAuth `redirect_uri` values need exact matching against registered values, never prefix matching.
</context>

<task>
Fix open redirects in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Find every redirect built from input: server redirects, `Location` headers, meta refresh, client-side `location` assignments, OAuth `redirect_uri` and `state` handling, and logout or post-payment return URLs.
2. Check whether the framework or auth library has a safe helper (`url_has_allowed_host_and_scheme`, Rails `redirect_to` with `allow_other_host: false`, the auth library's callback URL validation) and reuse it.
3. Add one shared `safeRedirectTarget(input, fallback)` helper: parse the input relative to the app's origin, reject anything whose origin differs (unless its host is in an exact allowlist), reject non-HTTP schemes, and return the fallback path when invalid.
4. Route every redirect point through the helper. For OAuth, enforce exact matching of `redirect_uri`, and keep the post-login return path in server-side state rather than a raw parameter where possible.
5. Add tests for `//evil.example`, `/\evil.example`, `https:evil.example`, `javascript:alert(1)`, a lookalike subdomain, an encoded newline or tab, and a valid deep link that must still work.
6. Run the tests and the linter.
</task>

<constraints>
- Never fix with `startsWith`, substring or regex checks on the raw string.
- Keep legitimate deep links working after login; list any that change.
- Fail closed to a safe default page, not to an error that loses the user's place without explanation.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Redirect points
Table: file:line, parameter, flow (login, logout, OAuth, tracking, client-side), status.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test with its payload.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
