---
schema: 1
id: implement-session-revocation
kind: prompt
title: Implement sign-out everywhere and session revocation
description: Implements a device and session list, sign out of one or all devices, and automatic revocation on password, email, MFA or role changes, for cookie sessions or tokens.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [session-management, logout, account-security, authentication]
pairs_with:
  prompts: [spec-sign-in-and-session-rules, implement-jwt-refresh-tokens, fix-password-reset-flaws, harden-jwt-validation]
  personas: [security-auditor]
args:
  - name: requirements
    description: What users and admins should be able to do (see devices, sign out others, admin force sign-out) and any session rules already agreed.
    type: text
    required: true
  - name: stack
    description: Framework, session mechanism (server sessions, JWTs, an identity provider) and session store. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Revocation is easy with server-side sessions (delete the row or key) and hard with stateless tokens, which stay valid until they expire. Many apps discover this after an incident: the user changed their password but the attacker's session kept working. The usual designs: server sessions stored with a user id index so all of a user's sessions can be found and deleted (cookie stores that keep the whole session in the cookie cannot do this); for JWTs, short access token lifetimes plus revocable refresh tokens, and either a per-user "sessions valid after" timestamp or token version checked on each request, or a denylist of token ids kept until their expiry. Each session record should hold a created time, last seen time, coarse device and location description (from the user agent and IP at sign-in), and how it was created. Sessions must be revoked automatically on password change or reset, email change, MFA changes, role downgrade, account disable, and detection of refresh token reuse; the current session usually stays signed in after a password change the user made themselves. Remember-me tokens, API tokens and OAuth grants to third-party apps are separate and need their own decision. Session ids must also be rotated at sign-in to prevent fixation.
</context>

<task>
Implement session revocation:
{{requirements}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the session or token code, the session store, remember-me handling, and the password, email, MFA and role change paths.
2. State the design: how a session is identified and stored, how revocation takes effect (immediately or within the access token lifetime), which events revoke which sessions, and what happens to remember-me tokens, API tokens and third-party grants.
3. Implement the session record and index by user, rotation of the session id at sign-in, last-seen updates (throttled so it is not a write per request), the list endpoint and UI with the current session marked, sign out one, sign out all others, and an admin force sign-out with an audit entry.
4. Hook revocation into every event in the design, and notify the user by email when other sessions are revoked for security reasons.
5. Write tests: listing shows only the user's sessions, signing out one invalidates it on the next request, sign out others keeps the current session, a password change revokes other sessions, and revoked JWT-backed sessions stop working within the stated time. Run them and the type check.
</task>

<constraints>
- Do not show raw IP addresses or full user agents to other users or support staff without need; show a coarse device and location label.
- Throttle last-seen writes; do not add a database write to every request.
- If the session store cannot be indexed by user (for example, cookie-only sessions), explain the change needed and ask before migrating.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Table: Decision | Choice | Why, then the list of revoking events and what each revokes.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
