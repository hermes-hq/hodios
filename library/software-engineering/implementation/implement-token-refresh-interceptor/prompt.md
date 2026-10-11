---
schema: 1
id: implement-token-refresh-interceptor
kind: prompt
title: Implement an access-token refresh interceptor
description: Implements an HTTP client interceptor that attaches access tokens, refreshes once on 401 with a single shared request, queues concurrent calls, retries them and logs out cleanly on failure.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, mobile-engineer, fullstack-engineer]
stack: [typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [jwt, refresh-token, axios, fetch-wrapper, auth, race-conditions]
args:
  - name: client
    description: The HTTP client and platform, for example "axios in a React SPA", "fetch wrapper in React Native", "Angular HttpClient".
    type: string
    required: true
  - name: token_flow
    description: How tokens are issued and stored, for example "access token in memory, refresh token in httpOnly cookie, rotation on each refresh".
    type: text
output_contract:
  format: markdown
  sections: [Flow, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Refresh interceptors break under concurrency. When five requests get 401 at once, a naive interceptor fires five refresh calls; with refresh-token rotation, the second one uses an already-spent token, the server treats it as reuse and revokes the session, and the user is logged out at random. Other classic bugs: the refresh call itself goes through the interceptor and loops forever; a request is retried repeatedly instead of once; 403 is treated like 401; tokens are refreshed in one browser tab while another tab still holds the old one; and refresh tokens are put in `localStorage`, where any XSS can read them.
</context>

<task>
Implement token refresh for this client: {{client}}

{{#token_flow}}
Token flow: {{token_flow}}
{{/token_flow}}

1. Read the existing HTTP client setup, auth store or context, the login and logout code, and the refresh endpoint's contract (request, response, error codes, rotation). Ask if the refresh contract is unknown and cannot be found.
2. Attach the access token in a request interceptor (or wrapper) from the in-memory store, skipping the refresh and login endpoints.
3. On a 401 response (not 403, not network errors):
   - If the request is the refresh call or already marked as retried, do not refresh; go to logout.
   - Otherwise start a refresh if none is in flight, storing one shared promise; all other failing requests await the same promise (single flight).
   - When it resolves, update the store and retry each queued request once with the new token, marked as retried.
   - When it rejects, clear the store, reject the queued requests, and log out once (navigate to login, clear cached user data).
4. Optionally refresh proactively a little before expiry (using `exp` minus a skew margin), still through the same single-flight function.
5. Handle multiple tabs if the platform has them: share new tokens or logout events via `BroadcastChannel` or a storage event, or use a Web Locks lock around refresh.
6. Store the refresh token as the flow requires: httpOnly cookie on the web (the request just sends credentials), Keychain or Keystore on mobile. Keep the access token in memory.
7. Write tests with a mocked server: one 401 refreshes then retries; five concurrent 401s cause exactly one refresh call and five retries; refresh failure logs out once; a retried request returning 401 again does not loop; 403 does not trigger refresh. Run tests and the type check.
</task>

<constraints>
- Never store refresh tokens in `localStorage` or `sessionStorage` on the web.
- Never log tokens or put them in URLs.
- Do not retry non-idempotent requests more than once.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
Numbered sequence from 401 to retry or logout, including the concurrency case.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test.

## Verification
Commands run and their real results.
</output_format>
