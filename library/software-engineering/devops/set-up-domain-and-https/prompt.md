---
schema: 1
id: set-up-domain-and-https
kind: prompt
title: Set up a domain and HTTPS
description: Walks through pointing a domain at an app, with the exact DNS records, HTTPS certificates, redirects and a check after every step. Use when launching a site or moving it to a new host.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [fullstack-engineer, founder, devops-engineer, individual]
stack: []
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [dns, https, tls, custom-domain, lets-encrypt]
pairs_with:
  prompts: [write-reverse-proxy-config, deploy-to-vps]
args:
  - name: domain
    description: The domain to use, including whether the site should live on the bare domain, on www, or on a subdomain such as app.
    type: string
    required: true
  - name: hosting
    description: Where the app runs and where DNS is managed today - for example "Vercel, domain bought at Namecheap" or "my own VPS at 203.0.113.10, DNS on Cloudflare". Mention any email already on the domain.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Plan, DNS records, Steps, Verify, If something is wrong]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Domain setups go wrong in predictable ways: changing nameservers without first copying the existing records, which silently breaks email; putting a CNAME on the bare domain, which DNS does not allow (providers offer ALIAS, ANAME or CNAME flattening instead); waiting on a long TTL after a mistake; requesting a certificate before DNS points at the server, or with port 80 closed so the HTTP challenge fails; and on Cloudflare's proxy, using the "Flexible" SSL mode, which causes redirect loops and leaves the last hop unencrypted. The reader may not do this often, so every step needs a way to check it worked before moving on.
</context>

<task>
Set up {{domain}} for an app hosted as follows: {{hosting}}.

1. If you cannot tell where DNS is managed, where the app runs, or whether the bare domain or www is the main address, ask those questions first and stop.
2. Start with a safety step: export or screenshot every existing DNS record, and note any MX, SPF, DKIM or DMARC records, which must survive the change.
3. If records will change, lower their TTL (for example to 300 seconds) a day ahead when the site is already live.
4. Give the exact records to create: type, name, value, TTL and, on Cloudflare, proxy on or off. Use the host's documented values; if you do not know the host's current target address or verification record, tell the reader where in the host's dashboard to find it instead of inventing one. Add a CAA record allowing the certificate authority in use, and explain it in one line.
5. HTTPS:
   - On a managed platform (Vercel, Netlify, Cloudflare Pages, Render, Fly and similar), add the domain in the dashboard and let the platform issue the certificate; list what the dashboard should show when it is done.
   - On a server, use automatic HTTPS from the proxy (Caddy, Traefik) or certbot with nginx or Apache. Port 80 must be open for the HTTP challenge; wildcard certificates need the DNS challenge. Confirm automatic renewal is scheduled.
   - Behind Cloudflare's proxy, use "Full (strict)" with a valid origin certificate.
6. Pick one canonical address and redirect the other (www to bare, or the reverse) with a permanent redirect, and HTTP to HTTPS.
7. Only once HTTPS works on every address, suggest HSTS starting with a short max-age.
</task>

<constraints>
- After each step, give a check the reader can run: a `dig` command against a public resolver (for example `dig +short A example.com @1.1.1.1`), a `curl -I` command, or what to look for in the dashboard.
- Explain DNS propagation honestly: changes are usually visible within minutes to the TTL, and old TTLs can delay it; do not promise "up to 48 hours" as a fixed rule.
- Never tell the reader to delete records they did not mention without confirming what they are for.
- Use plain language and define each record type the first time it appears.
</constraints>

<output_format>
## Plan
Three to five sentences: what will point where, and the final canonical address.
## DNS records
Table: type, name, value, TTL, proxy (if relevant), purpose.
## Steps
Numbered, each with "Check:" on its own line.
## Verify
A final checklist: every address loads over HTTPS, redirects go to the canonical address, the certificate is valid and renews, email still works.
## If something is wrong
Table: symptom, likely cause, fix.
</output_format>
