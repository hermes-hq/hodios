---
schema: 1
id: fix-cookie-not-being-set
kind: prompt
title: Fix a cookie or session that does not persist
description: Fixes cookies or login sessions that are not set or not sent, by checking SameSite, Secure, Domain, Path, CORS credentials and proxy headers.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, frontend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [logs, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cookies, samesite, sessions, cors, authentication]
pairs_with:
  prompts: [debug-network-request, fix-redirect-loop, review-auth-flow]
args:
  - name: symptom
    description: "What happens: the Set-Cookie header is present but the browser ignores it, the cookie is stored but not sent, the user is logged out on refresh, or it works locally but not in production."
    type: text
    required: true
  - name: evidence
    description: "The Set-Cookie response header exactly as sent, the request and response URLs (scheme, domain, port), the frontend fetch or axios call, and the server cookie and CORS config. Redact cookie values."
    type: text
output_contract:
  format: markdown
  sections: [Where the cookie is lost, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a web engineer who fixes cookie problems by reading the exact Set-Cookie header and the browser's reason for rejecting it (Chrome and Firefox show a warning icon on the cookie in the Network tab). The causes, in rough order of frequency:
- Cross-site requests: a frontend on one site calling an API on another (different registrable domain, so `app.com` and `api.io`, but not `app.example.com` and `api.example.com`; hosting domains on the Public Suffix List, such as `vercel.app` or `herokuapp.com`, make every subdomain its own site) needs `SameSite=None; Secure`, `credentials: 'include'` (or `withCredentials`), and CORS with `Access-Control-Allow-Credentials: true` and an explicit origin, never `*`. Even then, Safari and Firefox block or partition third-party cookies by default, so a same-site setup (API under the same domain, or a proxy) is more robust.
- `Secure` cookies are rejected over plain HTTP (Chrome and Firefox treat `http://localhost` as secure; Safari and custom local hostnames may not). Behind a TLS-terminating proxy or load balancer, the app thinks the request is HTTP and either refuses to set Secure cookies or builds wrong URLs, unless it trusts `X-Forwarded-Proto` (Express `trust proxy`, Django `SECURE_PROXY_SSL_HEADER`, Spring `forward-headers-strategy`).
- `Domain` attribute: a cookie for `.example.com` cannot be set from `other.com`; leaving Domain off makes it host-only, so it is not sent to subdomains.
- `Path` set to the login route path, so other routes do not get it.
- Prefixes: a `__Host-` cookie is rejected unless it has `Secure`, `Path=/` and no `Domain`; a `__Secure-` cookie is rejected without `Secure`.
- Expiry: an `Expires` in the past from a server clock or time zone bug, or `Max-Age` in the wrong unit.
- Size over about 4 KB, or too many cookies for the domain.
- Session store problems on the server: an in-memory store with several instances behind a load balancer, or a secret that changes per instance or deploy so signatures fail.
- `fetch` from a server-side render does not carry the browser's cookies unless forwarded.
</context>

<task>
Fix this cookie or session problem.

Symptom:
{{symptom}}
{{#evidence}}

Evidence:
{{evidence}}
{{/evidence}}

1. Read the server code that sets the cookie (framework session config, auth library settings), the CORS config, the proxy or load balancer config if present, and the client call.
2. Decide where the cookie is lost: not set, rejected by the browser, stored but not sent, or sent but not accepted by the server. If the evidence does not show it, say exactly what to look at in devtools (the Set-Cookie header and its warning, the Application tab, the Cookie request header) and ask.
3. Name the cause from the list above, using the scheme, domains and attributes.
4. Fix it at the right layer: cookie attributes, CORS credentials, trusting the proxy's forwarded headers, a shared session store or stable secret, or moving the API to the same site. Keep cookies `HttpOnly` and `Secure` where they were.
5. Say how to verify locally and in the deployed environment.
</task>

<constraints>
- Do not weaken security to make it work: no `Access-Control-Allow-Origin: *` with credentials, no removing `HttpOnly` or `Secure` from session cookies, no storing session tokens in localStorage as the fix.
- Ask for redacted headers rather than real session values.
- Say when a browser's third-party cookie policy means the design must change rather than an attribute.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the cookie is lost
Whether the browser rejects the cookie, stores but does not send it, or the server never sets it, with the evidence.
## Cause
The attribute or setting responsible.
## Fix
The server, client or proxy change.
## Verification
How to confirm in browser devtools (Application and Network tabs) and in the deployed environment.
</output_format>
