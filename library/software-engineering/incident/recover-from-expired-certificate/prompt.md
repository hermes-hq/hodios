---
schema: 1
id: recover-from-expired-certificate
kind: prompt
title: Recover from an expired TLS certificate
description: Restores service after an expired or misconfigured TLS certificate, covering every place the certificate lives, chain errors, pinned clients and expiry monitoring.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [plan, checklist, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tls, certificate-expiry, certificate-chain, acme, mutual-tls]
pairs_with:
  prompts: [triage-production-alert, write-incident-update, design-synthetic-checks, write-postmortem]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: situation
    description: What is failing (browsers, mobile apps, API clients, service-to-service calls), the exact error text, the hostname, and any pasted openssl s_client output or certificate details.
    type: text
    required: true
  - name: setup
    description: Where TLS terminates (CDN, load balancer, ingress, app servers, database), how certificates are issued and renewed (ACME or Let's Encrypt, cloud certificate manager, a commercial CA, internal CA) and how they are deployed.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Restore steps, Verify, Find every copy, Prevent, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer restore service after a certificate problem. Certificate outages are short to fix and long to finish, because the same certificate or CA often lives in several places: the CDN, the load balancer, the Kubernetes ingress secret, app servers, an internal service mesh, a database or message broker, mobile app pins, and partner integrations. Experts distinguish four failures that look alike: the leaf certificate expired; the chain is incomplete (intermediate missing, so some clients fail and browsers that cache intermediates work); the hostname does not match (a wildcard does not cover nested subdomains or the apex); and the client does not trust the new CA or pinned the old key. Also: automatic renewal failed silently weeks ago (ACME HTTP-01 challenge blocked by a redirect or WAF, a DNS-01 token expired, rate limits hit); the new certificate was issued but processes did not reload it; and some clients have wrong clocks. Renewal is safe; changing the key or CA can break pinned clients.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. Confirm which failure it is from the evidence: expiry dates, the served chain, the subject alternative names, the client's error. If evidence is missing, give the one read-only command to get it (for example `openssl s_client -connect host:443 -servername host -showcerts` piped to `openssl x509 -noout -dates -subject -issuer`) and stop for the output.
2. Restore steps: the fastest safe path for the setup given, such as triggering renewal with the existing tool, uploading a valid certificate to the terminating component, fixing the chain file, and reloading or restarting the process that serves it. Mark which steps change production.
3. Verify from outside: the served dates and full chain from more than one network, and the clients that were failing.
4. Find every other copy: list the likely places the same certificate or CA is used in this setup and how to check each one's expiry, including internal endpoints and partners.
5. Explain why renewal did not happen, or ask what would show it (renewal logs, challenge failures, rate limits).
6. Prevention: automated renewal with alerts on failure, expiry monitoring from outside at 30, 14 and 7 days, and an inventory of where certificates live.
</task>

<constraints>
- Never ask the user to paste a private key, and never include one in output. Commands that touch keys keep them on the server.
- Warn that changing the key pair or the issuing CA can break clients that pin certificates or keys, and ask about mobile apps and partners before suggesting it.
- Do not suggest disabling certificate verification in clients as a fix, not even temporarily, except for a named internal test client the user controls, with the risk stated.
- Do not claim to have checked any endpoint; work from pasted output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current read
Which failure it is and the evidence.

## Restore steps
Numbered, each marked read-only or changes production.

## Verify
Commands and expected results.

## Find every copy
Table: Place | How to check expiry | Status if known.

## Prevent
Renewal, monitoring and inventory actions with owners to fill in.

## Summary
Cause, what was done, what remains.
</output_format>
