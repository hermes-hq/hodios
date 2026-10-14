---
schema: 1
id: mitigate-abusive-traffic-surge
kind: prompt
title: Mitigate an abusive traffic surge at the edge
description: Mitigates a live surge of bots, scrapers or request floods with targeted blocks, rate limits and challenges at the edge, without locking out real users or partners.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, security-engineer]
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
level: expert
depth: advanced
tags: [bot-traffic, rate-limiting, waf-rules, ddos, scraping]
pairs_with:
  prompts: [analyze-web-attack-logs, add-rate-limiting, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: situation
    description: What the surge looks like - request rate versus normal, which paths, and pasted samples or aggregates of source IPs, ASNs, countries, user agents, and the impact on the service.
    type: text
    required: true
  - name: edge
    description: What sits in front of the app (CDN or WAF provider, cloud load balancer, NGINX or API gateway), what rules and rate limits exist, and known legitimate heavy users (partners, monitoring, search crawlers, mobile apps behind carrier NAT).
    type: text
output_contract:
  format: markdown
  sections: [Current read, Signature, Mitigation steps, Watch for false positives, Afterwards, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an on-call engineer stop abusive traffic that is hurting the service right now. The work is finding a signature that matches the bad traffic and not the good, then applying the narrowest control at the furthest-out layer. Signatures, from most to least precise: a specific path plus a parameter pattern, a user agent or TLS fingerprint, an API key or account, an ASN (hosting providers rarely carry real consumer traffic), a country, and IP addresses last because floods rotate through thousands of them. Controls, from gentlest to hardest: rate limit per key or per IP on the expensive path, a challenge (JavaScript or managed challenge, which breaks API clients and mobile apps), and a block. Experts know the traps: blocking a country or a big ASN also blocks real users and partners; carrier and corporate NAT put many real users behind one IP, so low per-IP limits hit them; blocking at the app server still costs connections and TLS work; caching or a static fallback for the targeted page can neutralise a flood on a cacheable URL; and attackers adapt within minutes, so watch after each change. Not every surge is an attack: a partner's bug, a retry loop in your own mobile app, or a marketing push look similar.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#edge}}
<edge>
{{edge}}
</edge>
{{/edge}}

1. Current read: whether this looks like abuse, a misbehaving legitimate client or real demand, and what evidence would settle it. If the data does not show which paths and sources dominate, ask for the top paths, user agents, ASNs and IPs by request count for the surge window and stop.
2. Signature: the narrowest pattern that captures most of the bad traffic, with an estimate of how much legitimate traffic it would also match and how to check that (run the rule in log or count mode first where the edge supports it).
3. Mitigation steps in order: log-only or count mode, then rate limit or challenge on the targeted path, then block if needed. For each, the rule in plain terms for the user's edge, where it applies, and how to undo it.
4. Protect the origin meanwhile: cache the targeted resource if possible, shed or degrade the expensive feature, and raise capacity only if the signature is unclear.
5. Watch for false positives: support tickets, partner errors, mobile app error rates, conversion; and attacker adaptation (traffic moving to new paths or sources).
6. Afterwards: permanent rate limits on expensive endpoints, bot management, alerting on request rate by path, and evidence to keep (log samples, rule changes with times).
</task>

<constraints>
- Defensive only. Do not help trace, retaliate against or attack the sources.
- Do not invent provider-specific rule syntax; describe the rule's logic and say to use the provider's documented syntax unless the user pasted examples of it.
- Warn before country or ASN-wide blocks and before challenges on API or mobile endpoints.
- Allow-list known partners and monitoring before tightening rules.
- If the traffic suggests an intrusion attempt (exploit payloads, credential stuffing), recommend involving security and keeping logs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current read
Abuse, misbehaving client or real demand, and why.

## Signature
The pattern, its estimated coverage and collateral, and how to check it.

## Mitigation steps
Numbered, gentlest first, each with how to undo.

## Watch for false positives
Signals and thresholds.

## Afterwards
Lasting controls and evidence to keep.

## Summary
What was applied and when.
</output_format>
