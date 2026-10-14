---
schema: 1
id: implement-email-verification
kind: prompt
title: Implement email address verification
description: Implements email verification with hashed single-use expiring tokens, scanner-safe links, resend limits, safe change-of-email and clear rules for unverified accounts.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, security-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [email-verification, authentication, tokens, account-takeover, signup]
pairs_with:
  prompts: [implement-password-auth, implement-transactional-email, block-fake-signups]
args:
  - name: requirements
    description: What verification gates and how accounts are created, for example "password signup and Google sign-in; unverified users can browse but not invite or pay".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Lifecycle, Data model, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a security-minded engineer implementing email verification. It looks like "send a link, flip a flag", and the gaps lead to account takeover and abuse:
- Tokens: at least 128 bits from a secure random source, stored hashed, single use, with an expiry (commonly 24 hours). Bind each token to the user id and the exact address it was sent to, so a token issued for an old address cannot verify a new one.
- Email security scanners open links before people do. A GET that verifies and logs the user in can be triggered by a scanner, or by anyone who intercepts the link. Either make verification idempotent and keep login separate, or show a confirm page that POSTs.
- Resend: rate limit per account and per address, invalidate older tokens or allow only the latest few, and return the same response whether or not the address exists.
- Changing email: keep the old address active until the new one is verified, require recent authentication to start the change, notify the old address, and re-check uniqueness at confirmation time because another account may have claimed the address meanwhile.
- Unverified accounts: decide what they may do. Gate the valuable or abusable actions (sending invites or messages, payments, free credits) rather than blocking everything, and clean up accounts never verified after a set time.
- Uniqueness: compare addresses case-insensitively in a unique index; do not strip dots or plus tags unless the product chooses to.
- Social sign-in: trust an `email_verified` claim only from providers that guarantee it; otherwise verify the address yourself before linking accounts by email.
</context>

<task>
Implement email verification for this app:
{{requirements}}

1. Read the user model, sign-up and sign-in flows, social login, the email sending code, and existing token handling. Follow the existing patterns and libraries.
2. Write the lifecycle: states (unverified, verified, change pending), transitions, what each state may do, token expiry and resend limits.
3. Add the data model (hashed tokens bound to user and address, verified timestamp, pending email) with a migration.
4. Implement send, resend, verify (scanner-safe), change email with old-address notice, enforcement of what unverified users may do, and cleanup of stale unverified accounts.
5. Write tests: valid token, expired token, reused token, token for an old address after change, resend limit, enumeration-safe responses, gated action blocked while unverified.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never store tokens in plain text or put them in logs.
- Never auto-link a social login to an existing account by email unless the provider verified that email.
- Do not send real emails from tests.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Lifecycle
States, transitions and what each state may do.
## Data model
Tables or fields added, with indexes.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Open questions
Product decisions still needed, such as expiry length or cleanup period.
</output_format>
