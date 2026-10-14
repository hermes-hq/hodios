---
schema: 1
id: implement-field-level-encryption
kind: prompt
title: Implement field-level encryption
description: Implements application-level encryption of sensitive columns with envelope keys from a KMS, an AEAD cipher library, blind indexes for exact lookups, key rotation and a safe migration of existing rows.
category: security
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, security-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, tests, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [encryption, envelope-encryption, kms, blind-index, key-rotation]
pairs_with:
  prompts: [plan-data-encryption, review-cryptography-usage, rotate-credentials-without-downtime, plan-secrets-management]
  personas: [data-privacy-engineer]
args:
  - name: fields
    description: The columns to encrypt (for example national id, bank account, health notes), which ones must still be searchable by exact match, and roughly how many rows exist.
    type: text
    required: true
  - name: environment
    description: Language and framework, database, cloud or KMS available, and how the app runs, if the agent cannot read them.
    type: text
output_contract:
  format: markdown
  sections: [Design, Implementation, Migration of existing data, Key rotation, Check, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Field-level encryption protects specific values from anyone who reads the database without the application's keys: a leaked backup, a read replica given to analysts, a SQL injection. Done wrong, it adds cost and protects nothing. The proven shape is envelope encryption: a data encryption key (DEK) encrypts the values with an AEAD cipher (AES-256-GCM or XChaCha20-Poly1305) from a vetted library (Tink, libsodium, the cloud SDK's encryption client, or the framework's built-in encrypted attributes such as Rails' `encrypts`), and a key encryption key (KEK) in a KMS or HSM wraps the DEK. Hand-rolled crypto fails in predictable ways: reused GCM nonces, ECB or CBC without authentication, keys in environment variables next to the data. Binding the ciphertext to its row and column through associated data (row id, column name) stops an attacker from swapping encrypted values between rows. Each stored value needs a key id or version prefix so keys can rotate. Encrypted columns cannot be searched, sorted or indexed; exact-match lookups use a blind index (an HMAC of the normalised value with a separate key), which leaks equality and is weak for low-cardinality fields like gender or country. Deterministic encryption has the same leak. Range queries and LIKE do not work on encrypted data at all. Existing plaintext must be migrated in batches with a dual-read period, and backups made before the migration still hold plaintext.
</context>

<task>
Encrypt these fields: {{fields}}
{{#environment}}Environment: {{environment}}{{/environment}}

1. Read the models, the queries that filter, sort or join on the target columns, logging and serialisation that may print them, and existing crypto or secrets code. List every place each field is read or written.
2. Confirm the threat the user wants to stop, and say what this will not stop (an attacker with application access or the KMS role still reads data).
3. Design: library and cipher, DEK and KEK structure (per tenant or global), associated data, stored format with key version, and for each field whether it needs a blind index (state the equality leak) or no lookup at all. Flag any query that filters by range or pattern and cannot survive encryption.
4. Implement: an encrypt and decrypt module or the framework's encrypted attribute type, DEK caching with a bounded lifetime, a blind index column with its own key, model and query changes, and redaction in logs and error reports.
5. Plan and implement the migration: add new columns, write both, backfill in idempotent batches, switch reads, verify, then drop plaintext columns in a later release after the user confirms, and note backups still holding plaintext.
6. Implement key rotation: new KEK wraps DEKs without re-encrypting data; a DEK change re-encrypts in batches using the key version.
7. Write tests: round trip, tampered ciphertext fails, values swapped between rows fail, lookup by blind index, rotation reads old and new versions. Run them and report results.
</task>

<constraints>
- Never implement a cipher, mode or nonce scheme by hand; use a vetted library's AEAD API.
- Never store keys in the same database as the data or commit them; use the KMS or secret store.
- Do not drop plaintext columns or run the backfill against shared or production data yourself.
- Do not claim the design meets a specific regulation; say what it does technically.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Table: field, encryption, lookup support (blind index or none), leak accepted. Then key structure and stored format.
## Implementation
Changes per file with the core code in fenced blocks.
## Migration of existing data
Ordered steps with release boundaries and the verify step.
## Key rotation
KEK and DEK rotation steps.
## Check
Tests run with real results.
## Open questions
Numbered, or "None".
</output_format>
