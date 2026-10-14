---
schema: 1
id: harden-express-app
kind: prompt
title: Harden an Express app for production
description: Hardens an Express app with security headers, body size limits, rate limits, trust proxy, safe error output, cookie and session settings and dependency checks, verified with tests.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [express]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [hardening, nodejs-security, security-headers, middleware, owasp]
pairs_with:
  prompts: [harden-web-app-config, add-rate-limiting, fix-prototype-pollution, audit-dependencies]
  rules: [express-rules]
  personas: [security-auditor]
args:
  - name: app
    description: The Express app, how it is deployed (behind a load balancer, proxy or CDN, in a container, serverless), and whether it serves an API, server-rendered pages or both.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Changes, Verification, Needs a decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Express ships almost nothing secure by default, and most issues are missing middleware or wrong order. The usual list: `x-powered-by` left on; no security headers (helmet sets sensible ones, but its CSP default can break apps and needs tuning); body parsers with no size limit set deliberately, or `express.urlencoded({ extended: true })` turning query and body input into nested objects that feed prototype pollution and NoSQL operator injection (`{"$gt": ""}` reaching a Mongo query); the default error handler printing stack traces when `NODE_ENV` is not `production`; `trust proxy` either unset behind a load balancer (so `req.ip`, `req.secure` and rate limiting see the proxy) or set to `true`, which lets any client spoof `X-Forwarded-For` and bypass IP-based limits; `express-session` with the default MemoryStore (leaks memory, breaks with several instances), a hardcoded secret, and cookies without `secure`, `httpOnly` and `sameSite`; CORS with `origin: true` or a reflected origin together with `credentials: true`; `res.sendFile` or `express.static` with user paths; and no rate limit on login, signup and password reset. Async route errors before Express 5 escape the error handler and can crash the process. Middleware order matters: headers and limits before routes, the error handler last.
</context>

<task>
Harden {{app}}.

1. Read the app entry point and middleware chain in order, the router setup, session and auth config, CORS config, error handlers, the Express version and the deployment files. Note what each middleware does and where it sits.
2. List findings against the points above, plus any route that reads files, redirects to user input, or passes request objects straight into a database query.
3. Fix what is safe to fix in code: disable `x-powered-by`; add helmet with a CSP tuned to what the app loads (report-only first if it serves pages); explicit body size limits per parser; input validation at the routes that reach databases; `trust proxy` set to the exact hop count or proxy addresses; a production error handler that logs details and returns a generic message with a request id; session and cookie flags with the secret from the environment and a shared store; a CORS allowlist; and a rate limiter on auth routes keyed correctly behind the proxy.
4. On Express 4, make sure async errors reach the error handler (a wrapper or upgrade note).
5. Run the dependency audit for the project's package manager and list high and critical findings with the fixed version, without upgrading majors silently.
6. Add or update tests that check the headers, the body limit, the generic error response and the rate limit, then run the test suite and report results.
</task>

<constraints>
- Never put real secrets in code, examples or test output.
- Do not set `trust proxy` to `true` unless the only way in is through a proxy that overwrites the header, and say why.
- Do not enforce a strict CSP on pages without a report-only phase; it can break the app.
- Do not change production environment values or deploy; list them for the team.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: issue, location, risk, fix, status (fixed, needs decision, fine).
## Changes
One line per file: `path`, what changed.
## Verification
Tests and audit run, with real results.
## Needs a decision
Items for the team, with the recommended choice and its impact.
</output_format>
