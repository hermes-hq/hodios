---
schema: 1
id: fix-insecure-deserialization
kind: prompt
title: Fix insecure deserialization
description: Finds deserialization of untrusted data with pickle, Java ObjectInputStream, unsafe YAML loaders, PHP unserialize or BinaryFormatter, and replaces it with safe formats or loaders.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [deserialization, remote-code-execution, owasp]
pairs_with:
  prompts: [audit-input-handling, triage-sast-findings, write-fuzz-harness, write-exploit-regression-test]
  personas: [security-auditor]
  rules: [secure-coding-rules]
args:
  - name: target
    description: The code, endpoints, queues or scanner findings involved.
    type: text
    required: true
  - name: stack
    description: Language, frameworks and where serialized data travels. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Deserialization points, Changes, Migration, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Native object serialization formats can run code while they rebuild objects. Loading attacker-controlled bytes with Python `pickle`, `shelve`, `joblib` or `torch.load` with `weights_only=False` (the default before PyTorch 2.6), Java `ObjectInputStream` or XMLDecoder, .NET `BinaryFormatter`, `NetDataContractSerializer` or Json.NET with `TypeNameHandling` other than `None`, PHP `unserialize`, Ruby `Marshal.load` or `YAML.load` on old Psych, and PyYAML `yaml.load` without `SafeLoader` is usually remote code execution, not a data bug. The untrusted bytes hide in cookies, hidden form fields, cache entries an attacker can write, message queues fed by other services, uploaded files and machine learning model files. Signing the data with an HMAC stops tampering only if the key never leaks and every reader verifies before loading. The lasting fix is a data-only format (JSON, Protocol Buffers, MessagePack) with schema validation, or the library's safe loader. Java look-ahead filters (`ObjectInputFilter`) and .NET type binders are mitigations when a format cannot change yet.
</context>

<task>
Fix insecure deserialization in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Search for every native deserialization call and unsafe loader in the codebase and its configuration (session serializers, cache backends, queue consumers, RPC frameworks, model loading).
2. For each, find where the bytes come from and who can influence them, including other services, shared caches and stored files.
3. Fix each one:
   - switch to a data-only format with schema validation, or the safe loader (`yaml.safe_load`, `json`, `torch.load(weights_only=True)`, `safetensors`, Json.NET with `TypeNameHandling.None`);
   - where the format cannot change in this change, verify an HMAC with a constant-time comparison before loading and add a type allowlist filter, and record the format change as follow-up.
4. Plan the migration for data already stored in the old format: dual-read (new format first, old format only from trusted storage) with a cutover date, or a one-off conversion job.
5. Add tests: legitimate data round-trips, unexpected types are rejected, tampered signed data is rejected. Use a harmless marker payload; never one that runs real commands.
6. Run the tests and the linter.
</task>

<constraints>
- Do not write working remote code execution payloads; describe the gadget class and use inert markers in tests.
- Never treat base64 encoding, compression or encryption without authentication as protection.
- Do not delete or rewrite stored data without asking; propose the migration.
- Name every place where you could not prove the source is trusted.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Deserialization points
Table: file:line, format or loader, data source, attacker influence (yes, no, unknown), fix chosen, status.
## Changes
One line per file: `path`, what changed.
## Migration
How existing stored data moves to the new format, and when the old path is removed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
