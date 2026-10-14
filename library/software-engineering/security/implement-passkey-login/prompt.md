---
schema: 1
id: implement-passkey-login
kind: prompt
title: Add passkey sign-in (WebAuthn)
description: Adds passkey registration and sign-in next to existing login, with server-side challenge checks, credential storage, autofill UI, multiple passkeys per account and safe recovery.
category: security
version: 1.0.0
status: incubating
stage: [design, build]
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
level: expert
depth: advanced
tags: [passkeys, webauthn, passwordless, authentication]
pairs_with:
  prompts: [implement-password-auth, implement-two-factor-auth, implement-session-revocation, review-auth-flow]
  personas: [security-auditor]
args:
  - name: requirements
    description: Whether passkeys are an extra option, a second factor or the main login, which clients (web, iOS, Android), and how recovery works today.
    type: text
    required: true
  - name: stack
    description: Backend and frontend frameworks. Leave empty to detect it from the repo.
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
Passkeys are WebAuthn credentials synced by the platform (iCloud Keychain, Google Password Manager, password managers). They resist phishing because the browser binds each signature to the site's origin. The cryptography should come from a maintained server library (for example SimpleWebAuthn, py_webauthn, webauthn4j, go-webauthn, the framework's own support); hand-written CBOR or attestation parsing is a common source of bugs. What the app must still get right: a fresh random challenge per ceremony stored server-side and used once; checking origin and RP ID (the registrable domain, which cannot change later without breaking every credential); storing credential id, public key, sign count, transports, backup flags and a user-chosen name; resident keys with user verification preferred for passwordless sign-in; conditional UI (`autocomplete="username webauthn"`) so passkeys appear in the username field; several passkeys per account with list, rename and delete; and step-up re-authentication before adding or removing one. Synced passkeys usually report a sign count of zero, so a non-increasing count must not lock users out. Recovery is the weak point: an email link that lets anyone add a new passkey reduces the account to inbox security. Native apps need associated domains (iOS) or Digital Asset Links (Android) for the same RP ID.
</context>

<task>
Add passkey sign-in:
{{requirements}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing sign-in, session, user model and account settings code. Check for a WebAuthn library already in the stack or the auth framework.
2. State the design: RP ID and allowed origins, library, attestation (usually `none`), user verification and resident key settings, credential table, how passkeys combine with passwords and MFA, and recovery.
3. Implement registration (options endpoint with a stored challenge, browser call, verification, save credential), sign-in (options, conditional UI and button, verification, session creation, sign count and last-used update), and the settings page to list, rename and remove passkeys with step-up.
4. Implement recovery that matches the requirements without an email-only bypass, and email notifications when a passkey is added or removed.
5. If native apps are in scope, list the associated-domain or asset-links files and app settings required.
6. Write tests for the server ceremonies using the library's test helpers or recorded fixtures: reused challenge rejected, wrong origin rejected, unknown credential rejected, removal requires step-up. Run them and the type check.
</task>

<constraints>
- Never implement WebAuthn verification by hand when a maintained library exists for the stack.
- Never trust anything from the client as proof without server verification of challenge, origin and signature.
- Do not remove password or existing login methods unless the requirements say so.
- Never invent library function names; if unsure of an API, say so and check the library's docs in the repo's dependencies.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
