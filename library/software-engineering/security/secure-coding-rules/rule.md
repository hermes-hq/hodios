---
schema: 1
id: secure-coding-rules
kind: rule
title: Secure coding rules
description: Makes the assistant write code that validates untrusted input, avoids injection, protects secrets and checks authorization by default. Use as always-on rules in any codebase.
category: security
version: 1.0.0
status: incubating
stage: [build, review]
role: [software-engineer, security-engineer]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: intermediate
tags: [owasp, secure-by-default]
pairs_with:
  personas: [security-auditor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code, apply these rules. If a rule conflicts with what the user asked for, say so and explain the risk instead of silently doing either.

Input and output
- Treat everything from outside the process as untrusted: request bodies, headers, query strings, cookies, files, environment, message queues, third-party API responses and LLM output. Validate type, length, format and range at the boundary, with an allowlist where possible.
- Encode output for the context it goes into: HTML, HTML attributes, JavaScript, URLs, CSV and shell each need their own encoding. Use the framework's auto-escaping and do not bypass it (`dangerouslySetInnerHTML`, `| safe`, `v-html`, `innerHTML`) without sanitising first.

Injection
- Use parameterised queries or the ORM's bound parameters for every database query. Never build SQL, NoSQL, LDAP or XPath queries by concatenating or formatting input.
- Run external programs with an argument array and no shell. Never pass input into a shell string, `eval`, `exec`, `Function()` or a template engine's raw mode.
- When a path comes from input, resolve it and check that it stays inside the allowed base directory. Reject absolute paths and `..` segments before resolving.
- When a URL comes from input and the server fetches it, allow only expected schemes and hosts, and block private, loopback and link-local addresses (server-side request forgery).
- Do not deserialise untrusted data with formats that can instantiate arbitrary types (Python pickle, Java native serialisation, YAML loaders that are not the safe loader).

Authentication and authorisation
- Check authorisation on the server for every request that reads or changes data, including object-level checks that the record belongs to the caller. Never rely on hidden fields, client-side checks or unguessable ids.
- Deny by default. A new route or handler must state who may call it.
- Use the framework's or a vetted library's session, password hashing (argon2id, scrypt or bcrypt) and token handling. Never write your own.

Secrets and data
- Never put secrets, keys, tokens or passwords in code, tests, fixtures, examples, logs, error messages or commit messages. Read them from the environment or the project's secret store, and use obvious placeholders in examples.
- Do not log personal data, credentials, full tokens or full request bodies. Log security-relevant events (logins, permission denials, admin actions) without sensitive values.
- Use vetted cryptography libraries with their recommended defaults. Use a cryptographically secure random generator for tokens, ids that must be unguessable, and nonces. Never invent an algorithm or reuse a nonce.
- Never disable TLS certificate verification, including in "temporary" code.

Dependencies and configuration
- Before adding a dependency, check that it is the real, maintained package (watch for typosquats), pin it through the lockfile, and prefer the standard library when it is enough. Tell the user about every new dependency.
- Keep secure defaults in configuration: debug off in production, strict CORS origins rather than `*` with credentials, security headers on, least-privilege database and cloud permissions.

Failure and reporting
- Fail closed: if validation, authorisation or a security check errors, deny the action.
- Return generic error messages to clients and keep details in server logs.
- When your change touches authentication, authorisation, input handling, cryptography, secrets or dependencies, say so in your summary so a human can review it.
