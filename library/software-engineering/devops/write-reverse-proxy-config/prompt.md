---
schema: 1
id: write-reverse-proxy-config
kind: prompt
title: Write a reverse proxy config
description: Writes an nginx, Caddy or Traefik config for routing, TLS, forwarded headers, caching, compression and websockets, with test commands. Use when putting one or more services behind a proxy.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, backend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [text, config]
output: [config, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [reverse-proxy, nginx, caddy, traefik, tls, websockets]
pairs_with:
  prompts: [harden-web-app-config, deploy-to-vps]
args:
  - name: services
    description: Each upstream service - hostname or path it should serve, internal address and port, whether it uses websockets or server-sent events, upload sizes, static assets, and how the proxy runs (bare metal, Docker Compose, Kubernetes).
    type: text
    required: true
  - name: proxy
    description: Which proxy to write the configuration for.
    type: enum
    enum: [nginx, caddy, traefik]
    default: nginx
output_contract:
  format: markdown
  sections: [Assumptions, Config, What each block does, Test it, Pitfalls checked]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most reverse proxy bugs come from a handful of details: nginx `proxy_pass` with and without a trailing slash rewrites paths differently; an `add_header` inside a `location` drops every header set at server level; websockets need the `Upgrade` and `Connection` headers passed through and longer read timeouts; server-sent events break when the proxy buffers responses; apps generate `http://` redirects when `X-Forwarded-Proto` is missing; and rate limits or logs key on the proxy's own address when the real client address is not forwarded or is trusted from anyone. Caddy and Traefik obtain certificates automatically; nginx needs certbot or another ACME client.
</context>

<task>
Write a {{proxy}} configuration for:
<services>
{{services}}
</services>

1. If a service's internal address, its public hostname or path, or how the proxy is deployed is missing, ask and stop.
2. Routing: one server block, site or router per hostname, path routing where asked, and an explicit default that returns 404 or closes the connection for unknown hosts.
3. TLS: HTTP redirects to HTTPS; certificates via ACME (built in for Caddy and Traefik, certbot with the webroot or nginx plugin for nginx); TLS 1.2 and 1.3 only. Add HSTS with a modest max-age first and explain when to raise it or add `includeSubDomains`.
4. Headers to upstream: `Host`, `X-Forwarded-For`, `X-Forwarded-Proto`, `X-Real-IP` or the proxy's equivalent. Tell the user which setting in their app makes it trust these only from the proxy.
5. Websockets and streaming, per service that needs them: upgrade headers (in nginx a `map` on `$http_upgrade`), read timeouts longer than the idle period, buffering off for server-sent events.
6. Request limits: body size per service, sensible connect and read timeouts.
7. Caching and compression: long `Cache-Control` with `immutable` only for fingerprinted static assets, no caching of HTML or authenticated responses, gzip or zstd or brotli where the proxy supports it.
8. Security headers: `X-Content-Type-Options`, `Referrer-Policy`, frame protection, and a note that the Content-Security-Policy belongs to the app unless the user wants it here.
9. Access and error logs with the real client address.
</task>

<constraints>
- Use only directives that exist in the chosen proxy's current stable release; if unsure of a directive, say so rather than guessing.
- For Traefik, match the provider the user runs (Docker labels, file provider or Kubernetes CRDs).
- Do not enable rate limiting, IP allow lists or authentication unless asked; suggest them in one line if they look needed.
- Never disable certificate verification to upstreams that use TLS.
</constraints>

<output_format>
## Assumptions
Bullets, each one the user should confirm.
## Config
Fenced blocks with file paths (and Docker labels or Compose snippets for Traefik if used).
## What each block does
Short bullets keyed to the blocks.
## Test it
Commands: config validation (`nginx -t`, `caddy validate`, Traefik dashboard or logs), `curl -I` for redirects and headers, a websocket check, and an SSL Labs or `openssl s_client` check.
## Pitfalls checked
Bullets naming the pitfalls from above that apply and how the config avoids them.
</output_format>
