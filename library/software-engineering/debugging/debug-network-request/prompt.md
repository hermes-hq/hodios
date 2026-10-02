---
schema: 1
id: debug-network-request
kind: prompt
title: Debug a failing network request
description: Diagnoses a failing HTTP request layer by layer (DNS, TLS, proxy, CORS, auth, timeouts, payload) from error output and curl or browser traces, giving the next command at each step.
category: debugging
version: 1.0.0
status: experimental
stage: [maintain, verify]
role: [software-engineer, frontend-engineer, backend-engineer, devops-engineer]
requires: [none]
inputs: [logs, text, stack-trace]
output: [explanation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [http, cors, tls, dns, curl]
pairs_with:
  prompts: [explain-stack-trace, integrate-third-party-api, harden-web-app-config]
  personas: [debugger]
args:
  - name: error
    description: The exact error as shown - browser console message, client exception, curl output or HTTP status and body.
    type: text
    required: true
  - name: request_details
    description: Method, URL (with secrets removed), headers, body shape, where the request is made from (browser, server, mobile, CI), and whether it ever worked.
    type: text
  - name: client
    description: The client making the request (browser fetch, axios, Python requests, Java HttpClient, curl, Postman).
    type: string
output_contract:
  format: markdown
  sections: [Most likely layer, What the error tells us, Next commands, Fix, If that was not it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A failing request can break at any layer between the client and the handler: name resolution, the TCP connection, TLS, a proxy or corporate gateway, the browser's CORS and mixed-content rules, authentication, timeouts at any hop, or the server rejecting the payload. Error messages from clients often hide which layer failed ("Network Error", "Failed to fetch", "socket hang up"), and people fix the wrong layer: adding CORS headers to a request that actually failed on TLS, or retrying a 401. Walking the layers in order, with one command that proves or rules out each, finds the cause quickly.
</context>

<task>
Diagnose this failing request{{#client}} made with {{client}}{{/client}}:

<error>
{{error}}
</error>
{{#request_details}}

Request details: {{request_details}}
{{/request_details}}

1. Read the error precisely and decide which layer it points to: an HTTP status means the server (or a proxy in front of it) answered, so connection, DNS and TLS worked; a browser CORS message means the request may have succeeded server-side and the browser blocked the response; connection refused, reset or timed out, certificate and name-resolution errors point lower. Say what the error rules out as well as what it suggests.
2. Walk the layers from the one most likely at fault, and for each give one command or check, what output to expect if the layer is fine, and what output means it is the problem:
   - DNS: `dig` or `nslookup` from the same machine or container, split-horizon DNS, `/etc/hosts`, stale caches.
   - Connection: `curl -v` or `nc -vz host port`; firewalls, security groups, network policies, wrong port, IPv6 versus IPv4.
   - TLS: `openssl s_client -connect host:443 -servername host`; expired or incomplete certificate chain, SNI, hostname mismatch, client trust store (corporate proxies that re-sign traffic, runtimes with their own CA bundle).
   - Proxies and gateways: `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY`, API gateways, header and body size limits, redirects that change the method or drop headers.
   - Browser rules: the preflight `OPTIONS` request and its `Access-Control-Allow-*` response headers, credentials with a wildcard origin, mixed content, cookies' `SameSite` and `Secure` attributes. CORS is fixed on the server, never in the client.
   - Authentication: missing or expired token, wrong audience or scope, clock skew, header stripped by a redirect or proxy, 401 versus 403 meaning.
   - Timeouts: which hop timed out (client, load balancer idle timeout, gateway, upstream), and the configured values at each.
   - Payload: content type versus body format, encoding, size, schema validation errors in a 400 or 422 body.
3. Reproduce outside the client with `curl` when possible, copying the browser request ("Copy as cURL") or translating the client's request, so client-library behaviour is separated from the server's. Say what differences between the two would be meaningful.
4. When the cause is found, give the fix at the right layer and how to confirm it.

Ask for the specific output of the next command when you need it, one or two commands at a time, rather than requesting everything up front. If the error suggests several layers equally, start with the cheapest check.
</task>

<constraints>
- Never recommend disabling TLS verification, setting a wildcard CORS origin with credentials, or turning off browser security as a fix. If used to narrow down a cause locally, label it a temporary diagnostic and never for production.
- Tell the user to remove tokens, cookies and API keys from anything they paste; use placeholders in commands.
- Give commands for the platform where the request runs (inside the container or pod if that is where it fails).
{{> output/verbosity-spec}}
</constraints>

<output_format>
## Most likely layer
One sentence with the reason.

## What the error tells us
Two or three bullets: what it rules in and what it rules out.

## Next commands
Numbered. Each: the command in a code block, the healthy output, and the output that confirms the problem.

## Fix
Only once the cause is clear: the change, at which layer, and how to confirm it. Otherwise "Pending the output above."

## If that was not it
The next layer to check and why.
</output_format>
