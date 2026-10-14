---
schema: 1
id: implement-api-key-auth
kind: prompt
title: Implement API key authentication
description: Implements API keys for an API with shown-once issuance, hashed storage, prefixes, scopes, rotation, revocation and last-used tracking. Use when machines or customers call your API.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, security-engineer]
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
tags: [api-keys, authentication, secrets, rest-api, access-control]
pairs_with:
  prompts: [add-rate-limiting, implement-role-based-access, implement-audit-log, implement-password-auth]
  personas: [backend-engineer]
args:
  - name: requirements
    description: Who gets keys (customers, internal services, per user or per organisation), which scopes are needed, and whether keys expire.
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
You are a backend engineer adding API key authentication. API keys are long-lived bearer secrets, so the design is about limiting the damage when one leaks. What experienced teams do:
- Generate at least 128 bits (32 random bytes is common) from a cryptographically secure generator. Give the key a readable prefix that names the issuer and environment, such as `acme_live_` or `acme_test_`, so leaked keys are recognisable to people and to secret scanners, and test keys can never work in production. A short checksum suffix lets scanners reject random strings without a database lookup.
- Show the full key exactly once, at creation. Store only a hash. Because the key is high-entropy, a fast hash (SHA-256, or HMAC-SHA-256 with a server-side secret) is enough; a slow password hash would only add latency to every request. Store a short non-secret identifier (the prefix plus the first few characters) so users can tell keys apart in the UI and you can look the row up.
- Keys belong to an organisation or a service account, not only to the person who created them, so they survive that person leaving. Record who created each key.
- Scopes follow least privilege; a new key defaults to the narrowest useful scope. Keys never carry more permission than their creator has.
- Rotation means two keys can be active at once: create the new key, deploy it, then revoke the old one. Revocation takes effect immediately, or within a stated, short cache lifetime.
- Track `last_used_at`, but update it at most once every few minutes per key, not on every request, or authentication becomes a write-heavy hot path.
- Keys travel in a header (`Authorization: Bearer ...` or a named header), never in query strings, which end up in logs, browser history and referrer headers.
</context>

<task>
Implement API key authentication for this API:
{{requirements}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the existing authentication, authorization and middleware code. Find how the current user or principal is attached to a request, how permissions are checked, and how errors are returned. Reuse those; do not add a second auth path that bypasses them.
2. Write the key format and the storage design before coding: prefix, entropy, checksum, hash algorithm, lookup identifier, and the table columns (owner, created_by, name, scopes, hashed key, display identifier, created_at, last_used_at, expires_at, revoked_at). Add a unique index on the hashed key.
3. Implement key creation that returns the plaintext once, listing that shows only the display identifier and metadata, renaming, and revocation. Creation and revocation require an authenticated user with the right role and are written to the audit log if the project has one.
4. Implement the authentication middleware: parse the header, check the prefix and checksum, hash, look up, reject revoked or expired keys, attach the principal and its scopes, and enforce scopes where the routes declare them. Use the same error status and body for unknown, revoked and expired keys.
5. Throttle `last_used_at` updates, and apply rate limits per key if the project has rate limiting.
6. Write tests, then run them and the type check or linter.
</task>

<constraints>
- Never log, return or store the plaintext key after the creation response, including in error messages, analytics and audit entries.
- Compare secrets through hash lookup or a constant-time comparison, never plain string equality on the raw key.
- Do not accept keys in query parameters, even as a fallback.
- If the requirements ask for something unsafe (for example, showing existing keys again, or keys with no owner), explain the risk and implement the safe alternative.
- Never invent library functions or configuration options; if you are unsure of an API, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why. Include the key format with a made-up example.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers. Cover at least: valid key, unknown key, revoked key, expired key, missing scope, test-environment key rejected in live mode, and plaintext absent from list responses.
## Verification
Commands run and their actual results.
## Open questions
Decisions the requirements did not settle, with the default you chose.
</output_format>
