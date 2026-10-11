---
schema: 1
id: map-external-attack-surface
kind: prompt
title: Map your external attack surface
description: Maps an organisation's internet-facing assets from DNS, certificates, cloud accounts and code, finds forgotten or risky exposures such as dangling DNS, and assigns owners and fixes.
category: security-operations
version: 1.0.0
status: incubating
stage: [discover, review]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [attack-surface, asset-inventory, subdomain-takeover, certificate-transparency, exposure-management]
pairs_with:
  prompts: [review-firewall-rules, respond-to-critical-cve, prioritize-vulnerability-backlog, investigate-suspicious-domain]
args:
  - name: organisation
    description: Company names and brands, known primary domains, cloud providers and accounts, hosting, acquisitions, and teams that run public services.
    type: text
    required: true
  - name: known_assets
    description: Optional existing inventory - domain list, DNS zone exports, public IP ranges, load balancers, SaaS with custom domains.
    type: text
  - name: data
    description: Optional discovery output already gathered, such as certificate transparency results, DNS records, cloud listings or internet scan data for your own addresses.
    type: text
output_contract:
  format: markdown
  sections: [Scope and authorisation, Discovery sources, Inventory, Risky exposures, Owners and actions, Keep it current]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Attackers find forgotten internet-facing systems faster than their owners do: the staging site from a 2021 project, the acquired company's VPN, an admin panel on a cloud VM a contractor created, a database port opened for a migration. Most of an organisation's external footprint can be mapped from sources it already controls or that are public: DNS zones and registrar accounts, certificate transparency logs (which list every hostname a public certificate was issued for), cloud provider inventories across every account and region (public IPs, load balancers, API gateways, storage endpoints, CDN distributions), infrastructure-as-code repositories, SaaS custom domains, and internet scan databases queried for your own addresses. The most commonly missed exposures are dangling DNS records (a CNAME or alias pointing at a deprovisioned cloud resource or SaaS tenant, which someone else can claim to take over the subdomain), management interfaces and remote access on the internet, non-production environments, and expired or self-signed certificates that hint at unmaintained systems. An inventory without owners does not get fixed.
</context>

<task>
Map the external attack surface for:

<organisation>
{{organisation}}
</organisation>
{{#known_assets}}

<known_assets>
{{known_assets}}
</known_assets>
{{/known_assets}}
{{#data}}

<data>
{{data}}
</data>
{{/data}}

1. Scope and authorisation: list the entities, brands and accounts in scope, and state that active scanning applies only to assets the organisation owns and is authorised to test, respecting cloud provider and hosting policies; third-party hosted services need the provider's rules or permission. Passive sources are fine for discovery.
2. Discovery sources: for each source (registrar and zones, certificate transparency, cloud inventories per provider, IP ranges and ASNs, repositories and infrastructure-as-code, SaaS custom domains, acquisitions, internet scan data on own IPs), say what it reveals and how to query it, with read-only CLI or console steps where useful.
3. Inventory: if data is provided, normalise it into an inventory; otherwise give the inventory columns and how to fill them. Resolve each hostname to where it points (cloud resource, SaaS, on-premises) and mark whether that target still exists.
4. Risky exposures: flag dangling DNS, exposed admin interfaces and remote access (RDP, SSH, database and management ports), non-production environments, unknown or unowned hosts, outdated software banners, expired or mismatched certificates, and public storage. Rate each by likelihood of abuse and impact.
5. Owners and actions: assign an owner team for each risky item (or say how to find one), the action (remove, restrict behind VPN or identity-aware proxy, patch, delete the DNS record, claim or remove the dangling target), and a priority.
6. Keep it current: a recurring process (for example weekly certificate transparency and DNS diff, monthly cloud inventory reconciliation), alerts for new public exposures, and a rule that new public services are registered with an owner.
</task>

<constraints>
- Do not recommend scanning or probing assets the organisation does not own or is not authorised to test.
- Never invent hostnames, IPs or findings. Work from given data and say what to collect.
- Do not attempt to claim or exploit a dangling resource as proof; report it and fix it on your own side.
- Deleting DNS records or closing services are changes; mark them for owner approval.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and authorisation
Bullets.

## Discovery sources
Table: Source | Reveals | How to query.

## Inventory
Table: Asset | Type | Points to | Exists? | Owner | Notes. Or the template if no data.

## Risky exposures
Table: Asset | Issue | Likelihood | Impact | Priority.

## Owners and actions
Numbered actions with owner and "(approval)" where changes are needed.

## Keep it current
Bullets with cadence.
</output_format>
