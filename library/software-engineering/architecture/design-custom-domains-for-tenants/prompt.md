---
schema: 1
id: design-custom-domains-for-tenants
kind: prompt
title: Design custom domains for SaaS customers
description: Designs customer custom domains for a SaaS at scale, with DNS ownership verification, on-demand TLS certificates, routing to the right tenant, apex domains and failure handling.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, devops-engineer, architect]
subject: [saas]
requires: [none]
inputs: [spec, text, config]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [custom-domains, tls-certificates, dns-verification, multi-tenant-routing, domain-takeover]
pairs_with:
  personas: [software-architect]
  prompts: [design-multi-tenancy, set-up-domain-and-https, design-tenant-provisioning, review-api-security]
args:
  - name: product
    description: What customers will serve on their own domains (storefronts, help centres, status pages, link shorteners), expected number of custom domains, and the hosting stack.
    type: text
    required: true
  - name: edge
    description: The load balancer, CDN or edge platform in use, and any provider features for custom hostnames already considered.
    type: text
  - name: requirements
    description: Apex domain support, wildcard subdomains, customer-provided certificates, regions, and time from setup to live.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Customer setup flow, Verification, Certificates, Routing, Failure and removal, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Letting customers use shop.theirbrand.com instead of theirbrand.yourapp.com sounds like a DNS record, and turns into certificate management for thousands of domains you do not control. Two approaches dominate: a managed custom-hostname feature of a CDN or edge provider, which handles certificates and routing for a per-hostname cost, or your own edge proxy that issues certificates on demand through ACME (with HTTP-01 or TLS-ALPN-01 validation) the first time a verified hostname is requested, storing them centrally. Customers point a CNAME at a stable target you control; apex domains cannot use a CNAME at most DNS providers, so they need A records to stable addresses, ALIAS or flattening support, or a redirect from the apex to www. Ownership must be verified (a TXT record or the CNAME itself) before a hostname is attached, or someone can claim a domain they do not own; and domains whose DNS still points at you after a customer leaves are a takeover risk if another tenant can claim them. Certificate authorities enforce rate limits, so on-demand issuance must be gated to verified hostnames only.
</context>

<task>
<product>
{{product}}
</product>

{{#edge}}
<edge>
{{edge}}
</edge>
{{/edge}}

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

1. Choose the approach (managed custom hostnames at the edge provider versus own proxy with on-demand ACME certificates) from the number of domains, the existing edge, team capacity and cost model. Do not quote prices or rate limits as facts; say how to check.
2. Design the customer setup flow: where they enter the domain, the exact DNS records shown (CNAME target, TXT verification, apex options), live status checking, clear error messages for common DNS mistakes, and expected time to go live.
3. Design verification: ownership proof before attaching, re-verification periodically, and protection against claiming a domain already attached to another tenant.
4. Design certificates: issuance trigger gated to verified hostnames, validation method, storage and sharing across edge nodes, renewal ahead of expiry, handling issuance failures and CA rate limits, CAA records that can block issuance, and optional customer-provided certificates.
5. Design routing: mapping hostname to tenant at the edge and in the application, caching of that mapping, canonical URLs and redirects, cookies and authentication on a custom domain, and HSTS considerations.
6. Design failure and removal: what visitors see when DNS is wrong or a certificate is missing, alerts on expiring or failing certificates, and removal when a customer leaves (detach, stop renewing, keep a takeover-safe state).
</task>

<constraints>
- Never issue certificates or attach hostnames before ownership is verified.
- Do not let one tenant claim a hostname attached to another.
- Do not assume DNS providers support CNAME at the apex; give the alternatives.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Choice and reason in at most 6 lines.
## Customer setup flow
Numbered steps, with an example DNS record table.
## Verification
## Certificates
## Routing
## Failure and removal
## Open questions
Numbered.
</output_format>
