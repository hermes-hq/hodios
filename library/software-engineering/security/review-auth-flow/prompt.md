---
schema: 1
id: review-auth-flow
kind: prompt
title: Review an authentication flow
description: Reviews an authentication or session design (OAuth or OIDC, tokens, cookies, MFA, password reset) for known flaws, with attack paths and fixes. Use before building or shipping login and session code.
category: security
version: 1.0.0
status: incubating
stage: [review, design]
role: [security-engineer, backend-engineer, fullstack-engineer, architect]
stack: []
requires: [none]
inputs: [spec, file, diff]
output: [report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [oauth, oidc, session-management, mfa, jwt]
pairs_with:
  personas: [security-auditor]
args:
  - name: design_or_code
    description: The design document, sequence diagram, configuration or code for login, sessions, tokens, MFA, password reset or account recovery.
    type: text
    required: true
  - name: app_type
    description: Client type, which decides token storage and flow rules.
    type: enum
    enum: [web, spa, mobile, api]
    default: web
output_contract:
  format: markdown
  sections: [Verdict, Findings, Verified safe, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication bugs are rarely in the cryptography. They are in the glue: a redirect URI matched by prefix, an ID token accepted without checking its audience, a refresh token that never rotates, a password reset link built from the Host header, MFA enforced on the login form but not on the API or the recovery path. Each has a well-known attack. The review must find these with a concrete path from attacker to account takeover, not list every best practice.
</context>

<task>
Review this authentication design for a {{app_type}} application:
{{design_or_code}}

Check each area that the material covers:
1. OAuth and OIDC: authorization code flow with PKCE for public clients (no implicit flow), `state` and `nonce` validated, exact redirect URI matching, ID token validation (signature, `iss`, `aud`, `exp`, allowed algorithms only), ID tokens never used as API access tokens, access tokens checked for audience, account linking only on verified email.
2. Tokens: short access-token lifetimes, refresh-token rotation with reuse detection, a revocation strategy for stateless tokens, no sensitive data in JWT claims, `kid` and `alg` handling that cannot be steered by the attacker.
3. Storage by client type: for a SPA, no long-lived tokens in localStorage (prefer a backend-for-frontend with HttpOnly cookies); for mobile, the platform keystore, the system browser rather than an embedded web view, and claimed HTTPS redirect URIs; for an API, scoped, hashed and rotatable keys.
4. Sessions and cookies: new session ID on login and privilege change, `Secure`, `HttpOnly`, `SameSite` and the `__Host-` prefix, idle and absolute timeouts, server-side invalidation on logout and password change, CSRF protection for cookie-authenticated state changes.
5. Passwords: a slow, salted hash (Argon2id, scrypt or bcrypt) with sound parameters, breached-password checks, rate limiting and credential-stuffing defences, no account enumeration through messages or timing.
6. Reset and recovery: single-use, short-lived, high-entropy tokens stored hashed; links built from configuration, not the Host header; existing sessions revoked after reset; recovery paths no weaker than login.
7. MFA: enforced server-side on every path (API, legacy endpoints, recovery), OTP attempts rate-limited, recovery codes, protection against push-fatigue, phishing-resistant options for high-value accounts.

Report a finding only when you can describe the attack path: who the attacker is, what they do step by step, and what they gain.
</task>

<constraints>
- Quote the line, setting or diagram step each finding is about. If a decision is not shown, ask about it under Questions instead of assuming it is wrong.
- Rank by impact: account takeover and token theft first, hardening last.
- Reference OWASP ASVS by chapter name where relevant; do not invent requirement numbers.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: ship | ship after fixes | redesign needed. Then one sentence why.
## Findings
Numbered. Each: severity, location, the attack path in steps, the impact, and the fix.
## Verified safe
Bullets of areas you checked and found sound.
## Questions
Decisions the material does not show that change the risk.
</output_format>
