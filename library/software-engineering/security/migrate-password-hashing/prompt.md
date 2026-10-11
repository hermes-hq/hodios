---
schema: 1
id: migrate-password-hashing
kind: prompt
title: Migrate stored passwords to a stronger hash
description: Moves stored password hashes from MD5, SHA or weak bcrypt to Argon2id or stronger bcrypt by wrapping old hashes at once and rehashing on login, with no forced reset.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [code, tests, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [password-hashing, argon2, bcrypt, authentication]
pairs_with:
  prompts: [implement-password-auth, review-cryptography-usage, review-auth-flow, defend-against-credential-stuffing]
  personas: [security-auditor]
args:
  - name: current_scheme
    description: How passwords are hashed today (algorithm, salt, iterations or cost, pepper) and roughly how many users.
    type: text
    required: true
  - name: stack
    description: Language, framework and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Current state, Target scheme, Migration plan, Changes, Tests, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Fast hashes (MD5, SHA-1, SHA-256, even salted) can be guessed at billions per second on a GPU, so a leaked table is effectively plaintext for common passwords. The target is a memory-hard or tuned slow hash: Argon2id with parameters from current OWASP guidance (for example 19 MiB memory, 2 iterations, 1 lane as a minimum), scrypt, or bcrypt with cost 10 or more and awareness of its 72-byte input limit; PBKDF2-HMAC-SHA256 with a high iteration count when FIPS compliance requires it. Rehash-on-login alone leaves every inactive user's weak hash in the database for years. The standard approach does two things: wrap every existing hash immediately (store `argon2id(old_hash)` and mark the scheme) so the whole table is strong today, then on each successful login verify through the wrapper and replace it with a direct hash of the password. Each stored value needs a scheme marker so verification picks the right path. Compare in constant time, keep the pepper (if any) in a secret store, and tune parameters on production-like hardware so a login stays around a few hundred milliseconds.
</context>

<task>
Migrate password hashing from: {{current_scheme}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the sign-up, sign-in, password change and reset code, and the user table. Find every place a password hash is written or compared, including admin tools, imports and other services that read the same table.
2. Choose the target scheme and parameters, preferring the framework's built-in password hasher if it supports the target (many frameworks already support upgrades with rehash on login). Benchmark verification time in the test environment and state the result.
3. Design the storage format: a self-describing encoded hash (such as the PHC string format) or a scheme column, so legacy, wrapped and new hashes can coexist.
4. Implement verification that handles all three: legacy (only until the wrap job finishes), wrapped (apply the old hash function, then verify with the new one), and new. On a successful login with a legacy or wrapped hash, store a new direct hash.
5. Write the wrap job: batch through users, wrap each legacy hash in a transaction, resumable, idempotent, with progress logging and no password material in logs. Do not run it against production; give the command and expected duration.
6. Write tests: each hash type verifies the correct password and rejects a wrong one, login upgrades the stored hash, the wrap job is idempotent, and every comparison goes through the library's constant-time verify function rather than `==` on hash strings.
7. Run the tests and the type check.
</task>

<constraints>
- Never force all users to reset passwords as the main plan, and never email or log passwords or hashes.
- Do not run the wrap job, migrations or any bulk update against a real database; provide the commands for the team.
- Do not invent parameter values; take them from current OWASP guidance or the framework defaults and say which.
- Keep the old verification path only until the wrap job is confirmed complete; put its removal in the rollout.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current state
Scheme, where hashes are written and read, and the risk if the table leaked.
## Target scheme
Algorithm, parameters, storage format, measured verification time.
## Migration plan
Numbered steps from deploy to removing the legacy path.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Rollout
Order of deploys, running the wrap job, monitoring login errors and latency, and the date to remove legacy code.
</output_format>
