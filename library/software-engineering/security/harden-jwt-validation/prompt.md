---
schema: 1
id: harden-jwt-validation
kind: prompt
title: Harden JWT verification
description: Audits and fixes how a service verifies JWTs, pinning algorithms and checking issuer, audience, expiry and key source, so forged, expired or misdirected tokens are rejected.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, config, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [jwt, token-validation, authentication, oidc]
pairs_with:
  prompts: [implement-jwt-refresh-tokens, fix-jwt-validation-failure, review-auth-flow, implement-session-revocation]
  personas: [security-auditor]
args:
  - name: target
    description: The service or middleware that accepts JWTs, and who issues them (your own auth server, an identity provider, another service).
    type: text
    required: true
  - name: stack
    description: Language and JWT library. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Verification checks, Changes, Tests, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most JWT vulnerabilities are verification code that accepts tokens it should reject. The known mistakes: calling `decode` instead of `verify`, or verifying with signature checks turned off; letting the token's `alg` header choose the algorithm, which enables `alg: none` and the RS256-to-HS256 confusion where the public key is used as an HMAC secret; not checking `aud`, so a token issued for another API or client in the same identity provider works here; not checking `iss`, which matters with multi-tenant providers where any tenant can mint tokens; trusting `jku`, `x5u` or an embedded `jwk` header to tell you where the key is; using `kid` unsanitised in a file path or database query; no `exp` check or a huge clock skew allowance; accepting ID tokens as access tokens; and fetching JWKS on every request or never refreshing it, so key rotation either overloads the provider or breaks login. Weak HMAC secrets can be brute-forced offline from a single token. Verification belongs in one shared middleware, not repeated per route.
</context>

<task>
Harden JWT verification in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Find every place tokens are decoded or verified, including websockets, background consumers, gateways and internal services, and the library and configuration each uses.
2. For each, check: signature verified, algorithms pinned to an explicit list, key source fixed in configuration (JWKS URL from the issuer's discovery document or a configured key, never from token headers), `iss` exact match, `aud` contains this service, `exp` and `nbf` enforced with small skew (seconds to a couple of minutes), token type correct (access, not ID token; check `typ` or a token-use claim where the issuer sets one), required claims present, and HMAC secret strength if symmetric.
3. Consolidate into one verification function or middleware configured from settings, and route every entry point through it.
4. Make JWKS handling robust: cache keys, refresh on unknown `kid` with a rate limit, and fail closed if keys cannot be loaded.
5. Add tests with tokens minted in the test: valid token accepted; `alg: none`, HS256 signed with the public key, wrong issuer, wrong audience, expired, not yet valid, unknown `kid`, an ID token, and a tampered payload all rejected.
6. Run the tests and the linter.
</task>

<constraints>
- Never use real production tokens or signing keys in tests; generate test keys.
- Do not log full tokens; log the `kid`, issuer and failure reason only.
- If an audience or issuer value is not known, ask rather than leaving the check off.
- Keep valid clients working; list any client that sends tokens the stricter checks will now reject.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Verification checks
Table: entry point, signature, algorithms pinned, key source, iss, aud, exp and nbf, token type, status before, status after.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test with the token it uses.
## Verification
Commands run and their actual results.
## Residual risk
What verification alone does not solve, such as revocation before expiry, and the options.
</output_format>
