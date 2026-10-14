---
schema: 1
id: implement-two-factor-auth
kind: prompt
title: Add TOTP two-factor authentication
description: Adds authenticator-app two-factor sign-in with QR enrolment, recovery codes, remember-device and a safe reset path. Use when an app with password login needs a second factor.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer, security-engineer]
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
level: intermediate
depth: specific
tags: [two-factor-auth, totp, mfa, recovery-codes, authentication]
pairs_with:
  prompts: [implement-password-auth, implement-audit-log, add-rate-limiting]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Optional or required for some roles, whether remember-device is wanted, and how support handles locked-out users today.
    type: text
    required: true
  - name: stack
    description: Language, framework and database. Leave empty to detect it from the repo.
    type: string
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
You are a backend engineer adding time-based one-time passwords (TOTP, RFC 6238) as a second factor. The code is simple; the account-recovery and edge cases are where most implementations fail:
- Use the defaults every authenticator app supports: SHA-1, 6 digits, 30-second step, and accept one step either side for clock drift. Store the last accepted time step per user so a code cannot be replayed within its window. Rate limit code attempts.
- The shared secret (at least 160 bits, base32-encoded) must be readable by the server to verify codes, so it is encrypted at rest with a key from configuration or a key management service, not hashed.
- Enrolment shows a QR code of the `otpauth://` URI plus the secret as text for manual entry, and only turns 2FA on after the user enters a valid code. Generate the QR image on your own server or in the browser; never send the secret to a third-party QR service.
- After the password step, the user is in a partial state that can only submit a second factor; it is not a session.
- Recovery codes: 8 to 10 random single-use codes, stored hashed, shown once, regenerable (which invalidates the old set).
- Remember-device: a random token in a secure cookie, stored hashed with an expiry (often 30 days), listed and revocable by the user, and revoked on password change.
- Disabling 2FA, regenerating recovery codes or changing the email address requires a fresh second factor. Notify the user by email when 2FA settings change.
- A reset path that only needs email access reduces 2FA to the strength of the inbox. Support-assisted resets need an identity check and an audit trail.
- Passkeys (WebAuthn) are phishing-resistant and stronger than TOTP; mention them as a later option, but do not expand scope.
</context>

<task>
Add TOTP two-factor authentication:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing sign-in flow, session handling, user model and audit logging. If the framework's auth system or an installed library supports TOTP, build on it.
2. State the design: TOTP parameters, secret encryption, partial-auth state, recovery codes, remember-device, step-up rules, reset path, and enforcement for roles that require 2FA.
3. Implement enrolment (start, QR and manual key, confirm), sign-in with a code or a recovery code, remember-device, disable and regenerate with step-up, the settings page, email notifications through the existing mail path, and audit entries.
4. Write tests with a fixed clock, then run them and the type check.
</task>

<constraints>
- Never log secrets, codes, recovery codes or remember-device tokens.
- Never create a full session before the second factor succeeds.
- Do not build an email-only bypass of the second factor; if the requirements ask for one, explain the risk and propose a support-assisted reset with identity checks.
- Never invent library functions; if unsure of an API, say so.
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
One line per test. Cover at least: enrolment not active until confirmed, valid code, code from the previous step accepted, replayed code rejected, attempt throttling, recovery code works once, remember-device skips the prompt and is revoked on password change, and disabling requires a fresh code.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
