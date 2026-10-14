---
schema: 1
id: fix-password-reset-flaws
kind: prompt
title: Fix password reset vulnerabilities
description: Fixes the common password reset flaws, such as guessable or reusable tokens, host header poisoning, account enumeration and sessions left alive, with a test for each.
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
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [password-reset, account-takeover, authentication, owasp]
pairs_with:
  prompts: [implement-password-auth, review-auth-flow, implement-session-revocation, add-rate-limiting]
  personas: [security-auditor]
args:
  - name: target
    description: The reset flow to fix, or the pentest or scanner findings about it.
    type: text
    required: true
  - name: stack
    description: Framework and mail setup. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Flaws found, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Password reset is the easiest account takeover path in most apps because it bypasses the password entirely. Penetration tests keep finding the same flaws: tokens from a non-cryptographic random source, timestamps or user ids; tokens stored in plain text so a database read gives takeover; tokens that never expire, survive use, or stay valid after a newer one is issued; reset links built from the request `Host` or `X-Forwarded-Host` header, so an attacker can make the victim's email link point at their own server (host header poisoning); different responses or timings for known and unknown emails (account enumeration); the token in the URL leaking through `Referer` to third-party scripts on the reset page; no rate limit on requests or attempts; the email address taken from the request body on the confirm step; and existing sessions and remember-me tokens left alive after the password changes. MFA should still be required after a reset if the account has it.
</context>

<task>
Fix the password reset flow in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the whole flow: request endpoint, token generation and storage, email sending, the reset page, the confirm endpoint, and what happens to sessions afterwards. Check whether the framework's built-in reset is used and how it is configured.
2. Check each known flaw and record it as present, absent or not applicable, with file and line.
3. Fix what is present, following the framework's built-in mechanism where possible:
   - at least 128 bits from a cryptographic random source, stored hashed, single use, expiring in about an hour, invalidated when a new one is issued or the password changes;
   - links built from a configured base URL, never request headers;
   - the same response and similar timing whether or not the account exists (send the email asynchronously);
   - `Referrer-Policy: no-referrer` (or same-origin) on the reset page and no third-party scripts there;
   - rate limits per account and per IP on requests and confirm attempts;
   - the account taken from the token, not the request body;
   - revoke other sessions and remember-me tokens on success, notify the user by email, and keep MFA required at next sign-in.
4. Add a test per fix: token reuse, expiry, an older token after a newer one, a spoofed `Host` header, identical responses for known and unknown emails, session revocation after reset.
5. Run the tests and the linter.
</task>

<constraints>
- Do not send real emails in tests; use the framework's test mailer.
- Never log tokens or full reset links.
- Keep the user-facing flow familiar; list any wording or UX change.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flaws found
Table: flaw, status (present, absent, not applicable), file:line, severity.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
