---
schema: 1
id: fix-jwt-validation-failure
kind: prompt
title: Fix a JWT validation failure
description: Fixes JWTs rejected with 401 or "invalid signature" by checking the algorithm, signing key and kid, key rotation, issuer, audience, expiry and clock skew against the decoded token.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: []
requires: [none]
inputs: [stack-trace, logs, config, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [jwt, jwks, token-validation, authentication, api-auth]
pairs_with:
  prompts: [fix-oauth-login-error, review-auth-flow]
args:
  - name: error
    description: The rejection as your API or library reports it, for example "invalid signature", "jwt audience invalid", "kid not found", "token used before issued", and the HTTP status.
    type: text
    required: true
  - name: token_and_config
    description: The decoded header and payload of a failing token (never the full encoded token), and the validation settings, which are the library, expected issuer and audience, algorithms allowed, and where keys come from (a JWKS URL or a shared secret).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Token versus expectations, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an API security engineer who debugs JWT rejections by comparing the decoded token with what the validator expects, claim by claim. The usual mismatches:
- Signature: the validator uses the wrong key. HS256 tokens need the same shared secret on both sides (watch for a base64-encoded secret used as plain text, or different secrets per environment). RS256 or ES256 tokens need the public key matching the `kid` in the header, usually from the issuer's JWKS endpoint; a cached JWKS that predates a key rotation rejects new tokens until refreshed.
- Algorithm: the token's `alg` is not in the allowed list, or the validator was configured for HS256 while the issuer signs with RS256.
- Wrong token type: an ID token sent where an access token is expected, or a provider access token that is opaque or meant for the provider's own API (for example a Microsoft Graph token with a different audience) rather than your API.
- Issuer: tenant-specific versus common or multi-tenant issuer strings, a trailing slash, http versus https, a custom domain.
- Audience: the token was requested without your API's audience or scope, so `aud` names another resource; `aud` can be a string or an array.
- Time: `exp`, `nbf` and `iat` checked against a server clock that is off; most libraries allow a small leeway that is set to zero.
- Transport: the `Bearer ` prefix not stripped, the header dropped by a proxy, or the token cut by a cookie size limit.
</context>

<task>
Find why this JWT is rejected.

Error:
{{error}}

Decoded token and validation config:
{{token_and_config}}

1. If you can read the repository, open the validation middleware and its configuration, and find where keys and expected values come from in each environment.
2. Build a table comparing the token with the validator's expectations: `alg`, `kid`, `iss`, `aud`, `exp`, `nbf`, `iat`, token type, and key source.
3. Name the mismatch that causes the rejection. If the table shows none, give the next checks: whether the JWKS contains the `kid`, the server's clock offset, whether the header reaches the app unmodified. Ask for results and stop.
4. Give the fix on the correct side: request the token with the right audience or scope, configure the validator with the right issuer, audience and algorithms, refresh JWKS on unknown `kid`, sync the server clock or set a small leeway (a minute or two), or use the matching secret. Show the change.
5. Give a check: a fresh token accepted, an expired or wrong-audience token still rejected.
</task>

<constraints>
- Never ask for, print or decode a full token with its signature, secret or private key; work from the decoded header and payload with the signature removed.
- Never suggest disabling signature verification, allowing `alg: none`, accepting any audience, or adding HS256 to an RS256 validator; each opens a forgery path.
- Do not raise clock leeway beyond a few minutes to hide a real clock problem.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Token versus expectations
Table: Claim or field | Token value | Expected | Match.
## Cause
The mismatch, or the checks still needed.
## Fix
Config or code change, and which side it belongs on.
## Check
A positive and a negative test.
</output_format>
