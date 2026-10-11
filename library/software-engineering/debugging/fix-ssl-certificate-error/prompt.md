---
schema: 1
id: fix-ssl-certificate-error
kind: prompt
title: Fix an SSL certificate verification error
description: Fixes CERTIFICATE_VERIFY_FAILED and similar TLS verification errors from missing chains, corporate proxies, self-signed certs or stale CA bundles, without disabling verification.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [logs, stack-trace, config]
output: [explanation, diff, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [tls, certificates, ca-bundle, corporate-proxy, openssl]
pairs_with:
  prompts: [debug-network-request, fix-package-install-failure, recover-from-expired-certificate]
  personas: [debugger]
args:
  - name: error
    description: The full error message and where it happens (language or tool, command, URL or host being called).
    type: text
    required: true
  - name: environment
    description: OS, runtime version, container or CI, and whether a corporate proxy, VPN or TLS-inspecting firewall is involved.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes TLS verification errors by finding which link of the chain the client cannot validate. Errors look different per tool (`CERTIFICATE_VERIFY_FAILED` in Python, `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` or `SELF_SIGNED_CERT_IN_CHAIN` in Node, `PKIX path building failed` in Java, `x509: certificate signed by unknown authority` in Go, curl error 60) but the causes are few:
- The server sends an incomplete chain (leaf without intermediates). Browsers often cope by fetching or caching intermediates; libraries do not. `openssl s_client -connect host:443 -servername host -showcerts` shows what is sent.
- A corporate proxy or TLS-inspecting firewall re-signs traffic with the company root CA, which the OS may trust but the runtime does not. Each runtime has its own store: Python `requests` uses `certifi` (`REQUESTS_CA_BUNDLE`, `SSL_CERT_FILE`), Node uses its bundled store (`NODE_EXTRA_CA_CERTS`, or `--use-system-ca` in recent Node versions), Java uses its `cacerts` keystore (`keytool -importcert`), and Docker images have their own `/etc/ssl/certs` (`update-ca-certificates`). Git, pip, npm and Maven each read their own setting.
- A self-signed or private-CA certificate on an internal service: trust that CA explicitly for that client.
- An outdated CA bundle in an old image or runtime that lacks a newer root, or a wrong system clock making valid certificates look expired or not yet valid.
- A hostname mismatch (connecting by IP or an alias not in the certificate's SAN) is a different error and must be fixed on the certificate or the URL.
The fix is to add the right CA to the right trust store, or to fix the server's chain. Turning verification off (`verify=False`, `NODE_TLS_REJECT_UNAUTHORIZED=0`, `-k`, `sslVerify false`) removes protection against interception and tends to stay in code forever.
</context>

<task>
Fix this certificate verification error.

Error:
{{error}}
{{#environment}}

Environment:
{{environment}}
{{/environment}}

1. Identify the client (runtime and library) and its trust store, and the host being called.
2. Run or ask for the read-only checks: `openssl s_client -connect <host>:443 -servername <host> -showcerts` from the same machine or container, the issuer of the presented chain, the system date, and the same request from another machine or network. Say what each result would mean.
3. Name the cause: incomplete chain, intercepting proxy, private CA, stale bundle, clock, or hostname mismatch. If the data does not settle it, list what is missing and stop.
4. Give the smallest correct fix for this client: add the CA to the runtime's store or point its variable at a bundle that includes it (and do the same in the Dockerfile or CI image if it runs there), update the CA bundle or base image, fix the server chain, or fix the hostname. Name every tool in the workflow that needs the same setting.
5. Verify with the original command and the `openssl` check, and remove any verification bypass added earlier.
</task>

<constraints>
- Never recommend disabling verification, as a fix or as a temporary workaround; use `openssl s_client` and the client's CA settings to diagnose instead. If a bypass already exists in the code or config, flag it for removal.
- Do not ask for or handle private keys; only CA certificates are needed on the client.
- Do not guess the corporate CA; get it from IT or the OS trust store.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Diagnosis
Client, trust store, host, and what the checks show.
## Cause
The broken link in the chain.
## Fix
Commands, config or Dockerfile changes, per tool.
## Verification
The commands that now succeed.
</output_format>
