---
schema: 1
id: implement-magic-link-login
kind: prompt
title: Implement magic-link sign-in
description: Implements passwordless email magic-link sign-in with single-use expiring tokens, protection from link scanners, safe redirects and rate limits. Use to add email-link login.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
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
tags: [passwordless, magic-link, authentication, one-time-code, sessions]
pairs_with:
  prompts: [implement-transactional-email, implement-password-auth, add-rate-limiting]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Who signs in this way, whether new users can sign up by link, whether a one-time code is also wanted for cross-device sign-in, and any link lifetime already decided.
    type: text
    required: true
  - name: stack
    description: Language, framework, database and email provider. Leave empty to detect them from the repo.
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
You are a backend engineer adding magic-link sign-in. The email inbox becomes the credential, and the failure modes are specific:
- Corporate email security tools and some mail clients open every link in a message to scan it. If a plain `GET` on the link consumes the token, the scanner signs in (or burns the token) before the user clicks. The usual fix: the link opens a page with a "Sign in" button that sends a `POST` carrying the token, and only the `POST` consumes it.
- Tokens: at least 128 bits from a cryptographically secure generator, stored hashed, single use, expiring in about 10 to 15 minutes. Requesting a new link may invalidate older unused ones.
- The request endpoint must not reveal whether an account exists: the same "check your email" response and similar timing either way. Rate limit per email address and per IP so it cannot be used to flood someone's inbox.
- Links get forwarded and opened on a different device. A one-time code in the same email (6 to 8 digits, short expiry, a few attempts at most) handles cross-device sign-in; optionally bind the link to the browser that requested it and fall back to the code elsewhere.
- A `next` or `redirect` parameter is an open-redirect hole unless it is restricted to relative paths on your own site.
- Consuming a link creates a normal session: new session id, secure cookie flags, and it marks the email as verified.
</context>

<task>
Implement magic-link sign-in:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing auth, session, email-sending and rate-limiting code. Reuse them. If the framework or an auth library already in the project supports email links, configure it to the rules above rather than writing your own.
2. State the design: token entropy and storage, lifetime, single-use enforcement, scanner-safe confirmation step, one-time code rules if wanted, redirect allowlist, rate limits, and sign-up behaviour for unknown emails.
3. Implement the request endpoint, the email (sent through the existing mail path, with the link and code if used), the landing page with the confirming `POST`, token consumption in a transaction so two requests cannot both succeed, and session creation.
4. Write tests, then run them and the type check.
</task>

<constraints>
- Never log tokens, codes or full magic links.
- Never consume the token on `GET`.
- Never redirect to an absolute URL taken from user input.
- Never invent library functions or configuration; if unsure, say so.
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
One line per test. Cover at least: a `GET` does not consume the token, the token works once, an expired token fails, the response is identical for known and unknown emails, the rate limit triggers, an absolute redirect is refused, and the one-time code locks after too many attempts.
## Verification
Commands run and their actual results.
## Open questions
Choices left open, with the default chosen.
</output_format>
