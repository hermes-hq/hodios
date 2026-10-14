---
schema: 1
id: review-cryptography-usage
kind: prompt
title: Review cryptography usage in code
description: Reviews how code uses cryptography, catching misuse like ECB mode, reused nonces, unauthenticated encryption, fast password hashes, weak randomness, disabled TLS checks and hard-coded keys.
category: security
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer, software-engineer, backend-engineer]
stack: []
requires: [repo-read]
inputs: [repo, file, diff]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [cryptography, crypto-misuse, password-hashing, randomness, tls-verification]
pairs_with:
  prompts: [plan-data-encryption, review-auth-flow, review-pr-for-security]
  personas: [security-auditor]
args:
  - name: code
    description: The code, files or repository area that encrypts, signs, hashes, generates tokens or configures TLS, plus the language and libraries.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Crypto inventory, Findings, Safer patterns, Migration notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cryptography usually fails through misuse of sound primitives, not broken algorithms. The recurring mistakes: ECB mode, or CBC without a MAC, so ciphertext can be read in patterns or tampered with; a fixed or reused nonce with AES-GCM or ChaCha20-Poly1305, which breaks both confidentiality and integrity; keys and IVs hard-coded or derived from a password with a single fast hash; passwords stored with a fast hash (MD5, SHA-1, SHA-256, even salted) instead of a slow password hash such as Argon2id, scrypt, bcrypt or PBKDF2 with suitable parameters; tokens and reset codes from a non-cryptographic random generator; MACs or signatures compared with ordinary string equality; JWT verification that accepts `none` or lets the token choose the algorithm; TLS certificate or hostname verification turned off "temporarily"; and home-made constructions. The fix is nearly always a high-level, misuse-resistant API (for example libsodium-style sealed boxes, an AEAD with library-managed nonces, the platform's password hashing module) rather than tuning low-level calls.
</context>

<task>
Code:
{{code}}

1. Inventory every cryptographic operation: purpose (encrypt data, sign, MAC, hash for integrity, password storage, token generation, key derivation, TLS), algorithm and mode, library, where keys come from, and where outputs are stored.
2. Check each against the misuse list above and against its purpose: right primitive for the job, authenticated encryption, nonce and IV generation and uniqueness, key source and storage, randomness source, constant-time comparisons, parameter strength for password hashing, algorithm pinning for signatures and JWTs, TLS verification.
3. Report findings with `path:line`, what an attacker can do (read, forge, tamper, brute-force offline), severity, and the fix using a high-level API in the same language.
4. Give safer patterns for the operations this code needs, as short code snippets.
5. Migration notes: how to move existing data (re-hash passwords on next login with a hash version marker, re-encrypt or rotate keys, accept old tokens for a bounded period).
</task>

<constraints>
- Do not recommend inventing a construction; recommend vetted library APIs.
- Do not claim compliance with a standard (such as FIPS) unless asked and sure; say what would need checking.
- Do not report a theoretical weakness as critical without an attack path in this code.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Counts by severity and the most urgent fix.
## Crypto inventory
Table: operation | purpose | algorithm and mode | library | key source.
## Findings
Per finding: title, severity, `path:line`, attack, fix.
## Safer patterns
Code snippets.
## Migration notes
Bullets.
</output_format>
