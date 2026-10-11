---
schema: 1
id: investigate-suspicious-domain
kind: prompt
title: Investigate a suspicious domain or URL
description: Investigates a domain or URL with registration, DNS, certificate transparency, hosting and reputation data plus internal sightings, and decides block, monitor or benign.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate, review]
role: [security-engineer]
requires: [none]
inputs: [text, url, logs]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [domain-reputation, whois, certificate-transparency, passive-dns, lookalike-domain, ioc-enrichment]
pairs_with:
  prompts: [investigate-reported-phishing, analyze-email-headers, write-threat-intel-brief, triage-soc-alert]
  personas: [soc-analyst]
args:
  - name: indicator
    description: The domain or URL to investigate, defanged if you like, and where it came from.
    type: string
    required: true
  - name: lookup_results
    description: Results you have gathered from WHOIS or RDAP, DNS records, passive DNS, certificate transparency, hosting ASN, URL scan services and reputation feeds.
    type: text
  - name: internal_sightings
    description: Proxy, DNS, email or EDR records showing who in your organisation resolved, visited or received it, and when.
    type: text
output_contract:
  format: markdown
  sections: [Indicator, Evidence, Internal exposure, Benign explanations, Verdict, Actions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A domain's metadata tells you more than its home page. Registration a few days ago, privacy-protected registrant, a cheap or abused top-level domain, and a registrar or host often seen in abuse raise suspicion. Certificate transparency logs show when certificates were issued and which sibling subdomains exist (for example `login-microsoft` style names under the same parent). Passive DNS shows how often it moved and what else shared the IP. Lookalikes use character swaps, extra words, hyphens or punycode (`xn--`) to imitate a brand. URL scan services give a screenshot and page resources without anyone visiting from the corporate network. The common errors are blocking a shared hosting or CDN IP and breaking hundreds of legitimate sites, calling a new marketing or SaaS domain malicious because it is young, and forgetting to check who already visited it, which matters more than the block.
</context>

<task>
Investigate:

Indicator: {{indicator}}
{{#lookup_results}}

<lookup_results>
{{lookup_results}}
</lookup_results>
{{/lookup_results}}
{{#internal_sightings}}

<internal_sightings>
{{internal_sightings}}
</internal_sightings>
{{/internal_sightings}}

1. Restate the indicator defanged, its registered domain, and any brand it imitates. Check for punycode and lookalike patterns.
2. Evidence: summarise each data source given (age, registrar, name servers, MX, hosting ASN and whether the IP is shared or CDN-fronted, certificate history and sibling names, passive DNS changes, page content from scan services, reputation). For any source not given, say what to look up and why, without making up the result.
3. Internal exposure: who resolved, visited, submitted data to or received it, and when. Flag anyone who may have entered credentials or downloaded a file.
4. Benign explanations: new vendor or marketing domain, SaaS tenant subdomain, parked domain, security vendor sinkhole.
5. Verdict: malicious, suspicious or benign with confidence.
6. Actions: block at DNS or proxy (domain, not shared IP), search for and purge related email, reset credentials for anyone who submitted them, investigate hosts that downloaded files, report the lookalike to the registrar or brand owner if appropriate, and set an expiry for the block.
</task>

<constraints>
- Never tell the user to visit the URL from a normal workstation. Use scan services or an isolated browser.
- Do not invent WHOIS, DNS or reputation results. Unknowns stay unknown.
- Defang every domain, URL and IP in the output.
- Do not recommend blocking IP addresses of shared hosting or CDNs without stating the collateral impact.
{{> output/uncertainty}}
</constraints>

<output_format>
## Indicator
Defanged value, registered domain, imitated brand if any.

## Evidence
Table: Source | Finding | Signal (benign, neutral, suspicious).

## Internal exposure
Table or "none seen", with people needing follow-up.

## Benign explanations
Bullets, each ruled in or out.

## Verdict
One line plus reasoning.

## Actions
Ordered checklist with owner suggestions and block expiry.
</output_format>
