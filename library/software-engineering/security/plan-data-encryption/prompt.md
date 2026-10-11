---
schema: 1
id: plan-data-encryption
kind: prompt
title: Plan data encryption for a system
description: Plans which data to encrypt where (in transit, at rest, field level), with envelope encryption, key management and rotation, and the attacker each layer stops, plus search and deletion trade-offs.
category: security
version: 1.0.0
status: incubating
stage: [design, plan]
role: [security-engineer, architect, backend-engineer]
stack: []
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [encryption, key-management, envelope-encryption, field-level-encryption, crypto-shredding]
pairs_with:
  prompts: [review-cryptography-usage, plan-secrets-management, threat-model-feature]
  personas: [data-privacy-engineer, security-auditor]
args:
  - name: system
    description: The system's data stores, the sensitive data types (personal data, health, payment, secrets, documents), who needs to read them, how data is searched, and any customer or regulatory requirements you were given.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data classes, Threats each layer stops, Encryption plan, Key management, Trade-offs, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Encrypt everything at rest" is usually satisfied by a checkbox that stops a narrow threat: disk or volume encryption protects against stolen disks and decommissioned hardware, not against anyone who can query the database, read a backup through the application role, or steal application credentials. Each layer should be chosen by the attacker it stops. Transport encryption covers networks, including internal ones. Database or storage-level encryption covers media and some backup exposure. Application or field-level encryption, with keys the database cannot reach, covers database dumps, over-privileged staff and leaked backups, at a cost: encrypted fields cannot be searched, sorted or indexed normally (deterministic encryption or blind indexes allow equality search but leak equality). Envelope encryption, where data keys encrypt data and a key in a managed KMS or HSM encrypts the data keys, makes rotation and access control manageable; per-tenant or per-user keys make deletion by destroying the key (crypto-shredding) possible, though copies in logs and analytics still need handling. Tokenization can be simpler when only a few systems need the real value.
</context>

<task>
System: {{system}}

1. Classify the data: each class, where it lives (primary stores, replicas, backups, caches, search indexes, logs, analytics, files), who and what needs plaintext.
2. For each layer (transport, storage or volume, database-level, application or field-level, tokenization), say which attackers it stops and which it does not, for this system.
3. Write the encryption plan per data class and location: the layer, algorithm family through a vetted library or managed service, key scope (global, per tenant, per user, per record), and how search and reporting still work.
4. Key management: envelope encryption with a managed KMS or HSM, who and which services can use which key, separation between those who administer keys and those who access data, audit logging of key use, rotation (re-wrapping data keys versus re-encrypting data), backup and recovery of keys, and what happens if a key is lost.
5. Trade-offs and side effects: performance, search limits, migration of existing data, logs and analytics that would leak plaintext, and deletion through crypto-shredding.
6. Questions that need answers from compliance, legal or customers before the design is final.
</task>

<constraints>
- Do not claim a design satisfies a specific regulation or standard; list what would need confirming with compliance or legal staff.
- Recommend vetted libraries and managed key services; never a custom scheme.
- Make the threat each layer addresses explicit; do not present encryption at rest as protecting against application-level access.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data classes
Table: class | locations | who needs plaintext.
## Threats each layer stops
Table: layer | stops | does not stop.
## Encryption plan
Table: data class and location | layer | key scope | search and reporting approach.
## Key management
Bullets.
## Trade-offs
Bullets.
## Open questions
Bullets.
</output_format>
