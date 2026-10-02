# Security policy

## Report privately

Use GitHub private vulnerability reporting: **[Report a vulnerability](https://github.com/hermes-hq/hodios/security/advisories/new)**. Do not open a public issue, discussion or pull request for a security problem.

Include what you found, where (entry id, file or package and version), and how to reproduce it. We acknowledge reports within 3 working days.

## What to report

- **Unsafe content:** an entry that could make an agent leak secrets or environment variables, exfiltrate data, run untrusted code, or follow hidden instructions (prompt injection, hidden Unicode, encoded payloads).
- **Takedown requests:** text that was copied without permission, is a leaked proprietary system prompt, or contains personal data.
- **Tooling vulnerabilities:** in the `hodios` CLI, `@hermes-hq/hodios-*` packages, the release pipeline, signed manifests, or the install tree in `hermes-hq/hodios-dist`.

## How we respond

- **Content takedowns** ship within 24 hours of confirmation: the entry is removed from the next catalog release (a same-day patch release if needed), and clients drop it on their next update.
- **Code vulnerabilities** are fixed in the latest released version of each package and disclosed through a GitHub security advisory, crediting the reporter unless they prefer otherwise.

## Supported versions

Only the latest catalog release and the latest minor version of each package receive fixes.

## Defences already in place

Entries are text only. CI rejects scripts, tool grants, shell injection syntax, download-and-execute commands and hidden or bidirectional Unicode, and every content change is reviewed by a maintainer before it ships.
