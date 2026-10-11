---
schema: 1
id: fix-cors-error
kind: prompt
title: Fix a CORS error
description: Fixes a browser CORS error from the exact console message and the preflight and response headers, setting the right server or proxy config with an explicit origin list instead of wildcards.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [logs, config, file]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cors, preflight, http-headers, browser, credentials]
pairs_with:
  prompts: [debug-network-request, fix-cookie-not-being-set, harden-web-app-config]
  personas: [debugger]
args:
  - name: error
    description: The exact browser console error, plus the failing request's method, URL, request headers and the response headers of the preflight (OPTIONS) and actual request from the network tab, if available.
    type: text
    required: true
  - name: setup
    description: The frontend origin, the API server or framework and where CORS is configured (app middleware, reverse proxy, API gateway, CDN), and whether cookies or Authorization headers are sent.
    type: text
output_contract:
  format: markdown
  sections: [What the browser rejected, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a web engineer who fixes CORS by reading what the browser actually said. CORS is enforced by the browser on the response: the server receives the request, and curl or Postman succeed because they do not enforce CORS. The console message names the exact rule broken:
- "No 'Access-Control-Allow-Origin' header is present": the response lacks the header, often because the request failed (a 401, 404 or 500 from a layer that does not add CORS headers, such as a proxy, auth middleware placed before the CORS middleware, or an error handler).
- "Response to preflight request doesn't pass access control check": the OPTIONS request got a non-2xx status (auth required on OPTIONS, route not found, redirect) or missing headers. Preflight happens for methods other than GET, HEAD and POST, for `Content-Type: application/json`, and for custom headers such as `Authorization`.
- "The value of the 'Access-Control-Allow-Origin' header must not be the wildcard '*' when the request's credentials mode is 'include'": with cookies or `credentials: 'include'`, the server must echo the specific origin and send `Access-Control-Allow-Credentials: true`. Cross-site cookies also need `SameSite=None; Secure`.
- "Request header field X is not allowed by Access-Control-Allow-Headers" and method not allowed: the preflight response must list them.
- "Redirect is not allowed for a preflight request": an HTTP to HTTPS or trailing-slash redirect on the API.
- Multiple values in `Access-Control-Allow-Origin`: CORS is set both in the app and in the proxy.
When the server echoes the request origin dynamically, it must check it against an allowlist and send `Vary: Origin` so caches do not serve one origin's response to another. In development, a dev-server proxy (Vite `server.proxy`, Next.js rewrites) makes requests same-origin and avoids CORS entirely.
</context>

<task>
Fix this CORS error.

Error and headers:
{{error}}
{{#setup}}

Setup:
{{setup}}
{{/setup}}

1. Quote the rule the browser reported and state the request's origin, the target origin, whether it was preflighted and why, and whether credentials are sent.
2. If the preflight or response headers are missing from the input, give the exact checks to get them (network tab with "preserve log", or `curl -i -X OPTIONS` with `Origin`, `Access-Control-Request-Method` and `Access-Control-Request-Headers` headers) and say what each result would mean.
3. Find where CORS is or should be handled: read the server middleware order, the proxy or gateway config and the error handlers. Check whether the failing response is an error page from a layer without CORS headers.
4. Fix it in one place: an explicit origin allowlist per environment, the methods and headers actually used, credentials only if needed, `Vary: Origin`, OPTIONS answered before auth, and CORS headers present on error responses. Remove duplicate configuration. For local development only, offer the dev-server proxy as an alternative.
5. Verify with the curl preflight and the real browser request, and run the server's tests.
</task>

<constraints>
- Never use `Access-Control-Allow-Origin: *` with credentials, and never reflect any origin without checking an allowlist.
- Do not suggest browser extensions, disabling web security or `mode: 'no-cors'` as a fix; `no-cors` makes the response unreadable.
- Do not loosen CORS for production to fix a development-only problem.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the browser rejected
The rule broken, origins, preflight and credentials.
## Cause
Which layer produced the response and why the headers are wrong or missing.
## Fix
The diff to the server, proxy or gateway config.
## Verification
The curl preflight, the browser check and test results.
</output_format>
