---
schema: 1
id: migrate-auth-provider
kind: prompt
title: Plan an authentication provider migration
description: Plans moving users from one authentication provider or in-house auth to another, covering password hashes, sessions, social logins, MFA, a dual-run period, a security review gate and rollback.
category: migration
version: 1.0.0
status: incubating
stage: [plan, design]
role: [backend-engineer, security-engineer]
requires: [none]
inputs: [spec, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [authentication, identity-provider, password-hashing, mfa, sso, user-migration]
pairs_with:
  prompts: [plan-incremental-migration, implement-oauth-login]
args:
  - name: current_setup
    description: How authentication works today. Include the password hash algorithm and parameters, session or token type and lifetime, social and enterprise logins, MFA methods, account recovery, and every app or service that validates sessions or tokens.
    type: text
    required: true
  - name: target
    description: Where users are moving, for example "a managed identity provider with OIDC", "our own service built on an open-source identity server", or a product name.
    type: string
    required: true
  - name: users
    description: Approximate number of active user accounts to migrate.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Summary, Inventory, Migration strategy, Credentials, Sessions and tokens, Federated logins and MFA, Dual-run plan, Security review gate, Cutover, Rollback, Communication, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Authentication migrations lock people out or open holes. The usual failures: forcing every user to reset their password because hashes were not portable; importing hashes in a format the target cannot verify; logging everyone out at cutover; social logins creating duplicate accounts because the provider's user identifier changed; MFA enrolments lost; account-recovery emails going to stale addresses; one forgotten service still validating old tokens; and no way back once the old user store is switched off. A sound plan chooses between bulk import and lazy (just-in-time) migration based on the hash format and risk, runs both systems side by side, and passes a security review before the cutover.
</context>

<task>
Plan the move of about {{users}} user accounts from the setup below to {{target}}.

<current_setup>
{{current_setup}}
</current_setup>

1. Inventory: user records and attributes, unique identifiers and every system that stores them as foreign keys, password hash algorithm and parameters, sessions and tokens (type, lifetime, signing keys, which services validate them), social and enterprise identity links, MFA factors, recovery flows, admin and service accounts, and audit or compliance requirements.
2. Choose the migration strategy and justify it with the numbers and hash format:
   - Bulk import of hashes, if the target can verify the existing algorithm and parameters.
   - Lazy migration: on each user's first login the target verifies the password against the old system (or old hash), then stores its own hash. Plan for the long tail that never logs in (a deadline, then a reset flow).
   - Forced reset only as the last resort, and say why it is unavoidable.
3. Credentials: never export plaintext passwords. Say how hashes move (encrypted, access-limited, deleted after import) and how weak legacy hashes are upgraded.
4. Identity mapping: keep a stable internal user id and map the new provider's subject id to it, so data and foreign keys do not change. Explain how social and enterprise logins are relinked without duplicate accounts, matching only on verified identifiers.
5. Sessions and tokens: how existing sessions survive or are re-issued without logging everyone out at once, how every relying service is updated to accept new tokens, and the date old tokens stop being accepted.
6. MFA and recovery: how each factor migrates (TOTP secrets can often move, WebAuthn credentials are usually bound to the origin and relying party and may need re-enrolment), and how to stop recovery from becoming an account-takeover path during the transition.
7. Dual-run plan: phases with entry and exit criteria (internal users, a small percentage, everyone), the metrics watched (login success rate, error rate, support tickets, duplicate accounts) and the thresholds that pause the rollout.
8. Security review gate: a checklist that must be signed off before general cutover, covering credential handling, token validation in every service, redirect URI and allowed-origin configuration, rate limiting and lockout on the new login, logging without secrets, and a tested rollback.
9. Cutover and rollback: ordered steps, and how to switch back while users are mid-migration without losing accounts created or changed in the new system.
10. Communication to users and support, written plainly.

Before answering, re-check that no step requires plaintext passwords, that every service from the inventory is covered, and that rollback is possible at each phase. If the hash algorithm, token type or the list of relying services is missing from the setup, list it under Open questions and state the assumption you made for each.
</task>

<constraints>
- Describe provider capabilities in general terms; when a step depends on whether {{target}} supports something (such as importing a specific hash format or custom lazy-migration hooks), say "confirm in the provider's documentation" rather than asserting it.
- Do not weaken security to simplify the migration (no disabling MFA, no extending token lifetimes indefinitely, no shared admin credentials).
- Size the plan to {{users}} accounts: a small user base does not need a multi-month phased rollout, and a large one should not cut over in one step.
</constraints>

<output_format>
A Markdown plan with these sections:
## Summary
Strategy in three to five sentences, and the main risks.
## Inventory
Table of components, current state and migration impact.
## Migration strategy
## Credentials
## Sessions and tokens
## Federated logins and MFA
## Dual-run plan
Phases as a table: phase, audience, entry criteria, exit criteria, pause thresholds.
## Security review gate
A checklist with an owner placeholder per item.
## Cutover
Numbered steps.
## Rollback
Per phase.
## Communication
Short draft messages for users and for support.
## Open questions
Missing information and the assumptions made.
</output_format>
