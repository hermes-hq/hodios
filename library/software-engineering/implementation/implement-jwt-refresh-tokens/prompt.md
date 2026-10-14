---
schema: 1
id: implement-jwt-refresh-tokens
kind: prompt
title: Implement access and refresh tokens
description: Implements short-lived JWT access tokens with rotating refresh tokens, reuse detection, revocation and safe client storage. Use when an API or mobile app needs token-based sessions.
category: implementation
version: 1.0.0
status: incubating
stage: [build, design]
role: [backend-engineer, fullstack-engineer, mobile-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [jwt, refresh-tokens, authentication, sessions, token-rotation]
pairs_with:
  prompts: [implement-password-auth, implement-oauth-login, add-rate-limiting]
  personas: [backend-engineer]
args:
  - name: clients
    description: Which clients use the tokens, for example "React SPA on app.example.com and an iOS app", and whether the API is on the same site as the web app.
    type: text
    required: true
  - name: stack
    description: Backend language, framework and database. Leave empty to detect it from the repo.
    type: string
  - name: constraints
    description: Anything fixed, such as an existing JWT library, a key management service, or required token lifetimes.
    type: text
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer building a token session layer. A signed JWT cannot be revoked before it expires, so the design keeps access tokens short-lived and puts control in the refresh token. The known pitfalls:
- Verification must pin the accepted algorithms, reject `none`, and check signature, `exp`, `nbf`, `iss` and `aud`, with a small clock-skew leeway. Never decide the algorithm from the token header alone (algorithm confusion attacks). Include a `kid` so signing keys can rotate; asymmetric keys (EdDSA, ES256 or RS256) let other services verify without holding the signing secret.
- Access tokens live minutes (5 to 15 is typical) and carry only what authorization needs: subject, scopes or roles, expiry. No personal data: the payload is only encoded, not encrypted.
- Refresh tokens are opaque random strings (at least 128 bits), stored hashed on the server, and rotated on every use: each refresh returns a new refresh token and invalidates the old one. Tokens from one sign-in form a family. If an already-used refresh token is presented again, assume theft and revoke the whole family (OAuth 2.0 Security Best Current Practice, RFC 9700). Allow a short grace window, a few seconds, for the same token arriving twice from parallel tabs or retries, or users get logged out randomly.
- Sign-out, password change and admin "sign out everywhere" revoke refresh tokens server-side. Sessions also have an absolute lifetime regardless of refreshes.
- Browser storage: keep the access token in memory and the refresh token in an `HttpOnly`, `Secure`, `SameSite` cookie scoped to the refresh path. `localStorage` is readable by any injected script. A cookie-based refresh endpoint needs CSRF protection. Mobile apps keep the refresh token in the Keychain or Android Keystore.
- For a single server-rendered or same-site web app, ordinary server-side cookie sessions are simpler and revocable; JWTs earn their cost when several services or native clients verify tokens.
</context>

<task>
Implement access and refresh tokens for these clients:
{{clients}}

{{#stack}}Stack: {{stack}}{{/stack}}
{{#constraints}}Fixed constraints: {{constraints}}{{/constraints}}

1. Read the existing sign-in, session and middleware code. If the only client is a same-site web app, say that server-side sessions would be simpler and ask before proceeding, unless the request already justifies tokens.
2. State the design: signing algorithm and key handling, `kid` and rotation, access and refresh lifetimes, absolute session lifetime, claims, refresh token storage and family model, reuse grace window, and client storage per client type.
3. Implement token issuance at sign-in, the refresh endpoint with rotation and reuse detection, sign-out, revoke-all for a user, and the verification middleware with pinned algorithms and claim checks. Use a maintained JWT library already in the project, or the most widely used one for the stack.
4. Implement the client side for each client type named: where tokens are kept, how a 401 triggers one refresh and a retry, and how concurrent refreshes are coalesced into a single request.
5. Add a cleanup job or TTL for expired refresh tokens.
6. Write tests, then run them and the type check.
</task>

<constraints>
- Never log tokens, refresh tokens or signing keys. Keep keys in configuration or a secret manager, not in code.
- Never store refresh tokens in plaintext on the server, or tokens of any kind in `localStorage`.
- Never invent library functions or options; if unsure of an API, say so and name where to check.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: expired access token rejected, wrong `aud` or `iss` rejected, `alg: none` rejected, refresh rotates the token, reuse of a rotated token revokes the family, the grace window, sign-out revokes, and the absolute lifetime.
## Verification
Commands run and their actual results.
## Open questions
Decisions left to the team, with the default chosen.
</output_format>
