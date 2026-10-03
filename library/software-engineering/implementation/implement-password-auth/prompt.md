---
schema: 1
id: implement-password-auth
kind: prompt
title: Implement password sign-up and sign-in
description: Implements password sign-up, sign-in and reset securely with modern hashing, rate limits, enumeration-safe responses and sound session handling. Use when an app needs its own email and password login.
category: implementation
version: 1.0.1
status: incubating
stage: [build, design]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [none]
inputs: [spec, text, file]
output: [code, tests, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [authentication, password-hashing, argon2, sessions, password-reset, owasp]
pairs_with:
  prompts: [implement-oauth-login, add-rate-limiting, implement-transactional-email, review-pr-for-security]
  personas: [security-auditor, backend-engineer]
args:
  - name: stack
    description: Language, framework, database and how the frontend talks to the backend, for example "Express 5 + Postgres, React SPA on the same domain" or "Django 5 server-rendered".
    type: text
    required: true
  - name: requirements
    description: Anything specific, such as email verification, "remember me", multi-factor later, mobile clients, existing user table to keep, or compliance needs. Leave empty for a standard web app.
    type: text
output_contract:
  format: markdown
  sections: [Design decisions, Data model, Code, Security checklist, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Names the Rails options accurately, and password or email changes ask for the current password and end other sessions."}
---
<context>
You are an application security engineer who builds authentication. Password auth fails in well-known ways: fast or unsalted hashes, accounts discoverable through different error messages or timings, unlimited guessing, reset tokens that are guessable, reusable or stored in plain text, sessions that survive a password change, and cookies readable by scripts. Current guidance (OWASP Application Security Verification Standard and Password Storage Cheat Sheet, NIST SP 800-63B):
- Hash with Argon2id (OWASP minimum: 19 MiB memory, 2 iterations, parallelism 1), or scrypt, or bcrypt with cost 10 or more (bcrypt ignores input past 72 bytes, so reject or pre-handle longer passwords). Use the library's own verify function. Rehash on login when parameters are upgraded.
- Allow long passphrases (at least 64 characters) and all Unicode; require a minimum length (NIST asks for 15 characters when the password is the only factor, 8 with multi-factor) instead of composition rules; block passwords found in breach corpora; do not force periodic changes.
- Sign-in, sign-up and reset must not reveal whether an email has an account: same message, similar timing, and "check your email" for both cases.
- Throttle per account and per IP with growing delays rather than permanent lockouts, which let attackers lock users out.
- Reset tokens: at least 128 bits from a cryptographically secure generator, stored hashed, single use, expiring within about an hour, invalidating other sessions when used.
- Sessions: a new session id on sign-in, cookies `HttpOnly`, `Secure` and `SameSite=Lax` or stricter, server-side invalidation on sign-out and password change, CSRF protection for cookie-authenticated state changes.
- Sensitive account changes (password, email address) ask for the current password first, end the user's other sessions, and notify the old email address.

When the framework already ships a vetted auth system (Django auth, Rails 8's authentication generator, which builds on `has_secure_password`, or Devise, ASP.NET Core Identity, Spring Security, Laravel's starter kits, Phoenix `mix phx.gen.auth`), configuring it is safer than writing your own.
</context>

<task>
Implement password authentication for this stack:
{{stack}}

{{#requirements}}Requirements:
{{requirements}}{{/requirements}}

1. If the stack has a vetted built-in or de facto standard auth library, recommend it and implement on top of it, configured to the guidance above. Write custom code only for what it does not cover.
2. If the requirements conflict with the guidance (for example, storing passwords so they can be shown again, or emailing passwords), say why you will not do that and offer the secure alternative.
3. State the design decisions: hashing algorithm and parameters, session mechanism, token formats and lifetimes, throttling rules.
4. Define the data model: users, password hash, email verification state, reset tokens (hashed), sessions if server-side, and the indexes and constraints (case-insensitive unique email).
5. Write the code for: sign-up, email verification if required, sign-in, sign-out, password reset request, reset confirmation, password change for a signed-in user (current password required), and the session middleware.
6. Write the tests.
</task>

<constraints>
- Never log passwords, password hashes, reset tokens or session ids, including in error messages and analytics.
- Never compare secrets with ordinary string equality; use constant-time comparison or the library's verify.
- Never invent library functions or configuration options; if you are unsure of an API, say so and point to the place in its docs to check.
- Keep secrets (pepper, signing keys) in configuration or a secret manager, not in code.
{{> guardrails/verify-before-done}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Data model
Migration or schema code.
## Code
One code block per file, with its path as a heading.
## Security checklist
A checklist of each guidance item above, marked done in this code or left to configure, with where.
## Tests
Tests for: the same response for known and unknown emails on sign-in and reset, throttling after repeated failures, a reset token that works once and expires, a password change refused without the correct current password, sessions invalidated after a password change, and rehash on upgraded parameters.
</output_format>
