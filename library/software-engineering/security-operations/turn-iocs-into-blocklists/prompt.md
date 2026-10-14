---
schema: 1
id: turn-iocs-into-blocklists
kind: prompt
title: Turn indicators into blocks
description: Turns a set of indicators into blocks for firewall, DNS, proxy, email and EDR, with false-positive checks, a retro-hunt first, expiry dates, change records and rollback.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [text, dataset]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iocs, blocklists, threat-intel, edr, dns-filtering, change-control]
pairs_with:
  prompts: [write-threat-intel-brief, investigate-suspicious-domain, write-siem-query, review-firewall-rules]
  personas: [soc-analyst]
args:
  - name: indicators
    description: The indicators - IPs, domains, URLs, file hashes, email senders, certificates or other - with their source and date if known.
    type: text
    required: true
  - name: controls
    description: The controls you can push to, such as a firewall, DNS filter or RPZ, web proxy, mail gateway, EDR custom indicators, with any format or limit you know.
    type: text
    required: true
  - name: source_context
    description: Optional notes on where the indicators came from (your own incident, a vendor report, a sharing group) and how confident the source is.
    type: text
output_contract:
  format: markdown
  sections: [Indicator review, Dropped or downgraded, Retro-hunt first, Block plan, Change record, Expiry and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pushing every indicator from a report straight into every control is how teams block a cloud provider's shared IP, a CDN, a public file-sharing domain or a Microsoft binary hash, and then spend a day on rollback. Indicators also age at very different rates: attacker IPs change in days, domains in weeks, file hashes change with one rebuild, while behaviour lasts longer. Each type belongs in the control that can act on it: domains in DNS filtering and the proxy, full URLs in the proxy, IPs at the egress firewall only when they are dedicated infrastructure, SHA256 hashes in EDR, senders and attachment hashes in the mail gateway. Blocking before searching history also loses information: the more important question is who already talked to that infrastructure. Every block needs a source, an owner, an expiry and a way back.
</context>

<task>
Turn these indicators into blocks:

<indicators>
{{indicators}}
</indicators>

<controls>
{{controls}}
</controls>
{{#source_context}}

<source_context>
{{source_context}}
</source_context>
{{/source_context}}

1. Indicator review: normalise each indicator (refang only inside the final block lists, lowercase domains, SHA256 preferred, CIDR notation for ranges), identify its type and note its source and age.
2. Drop or downgrade indicators that would cause collateral damage or are weak: shared hosting, cloud and CDN IPs, popular legitimate domains or file-sharing services (block the specific URL instead, if the proxy allows), private address ranges, hashes of common legitimate files, and very old IPs. Say why for each.
3. Retro-hunt first: list the searches to run in DNS, proxy, firewall, mail and EDR logs for the past 30 to 90 days for every kept indicator, and say that hits become an investigation before or alongside the block.
4. Block plan: map each kept indicator to a control and an action (block, alert only, or monitor), with the reason. Alert-only is right where confidence is moderate or collateral is uncertain.
5. Produce the lists in a plain, importable shape per control (one value per line or a CSV with indicator, type, action, source, expiry, ticket), noting any vendor-specific format to check.
6. Change record: what changes, who approved, how to test (resolve a test domain, check a proxy log entry), and how to roll back.
7. Expiry and review: a default lifetime per type, for example 30 days for IPs and 90 days for domains, as starting points, plus who reviews.
</task>

<constraints>
- Never block an IP or domain without saying whether it is shared or legitimate infrastructure; if you do not know, flag it for checking rather than guess.
- Do not invent context about the indicators (malware family, actor) that is not in the input.
- Keep indicators defanged everywhere except the import lists, and label those lists clearly.
- Changes to production controls need the owner's approval; present the plan, do not imply it was applied.
{{> output/uncertainty}}
</constraints>

<output_format>
## Indicator review
Table: Indicator (defanged) | Type | Source | Age | Keep?

## Dropped or downgraded
Bullets with reasons.

## Retro-hunt first
Table: Log source | Search | Window.

## Block plan
Table: Indicator | Control | Action | Reason, followed by one fenced block per control with the import list.

## Change record
Bullets: summary, approver, test, rollback.

## Expiry and review
Table: Type | Default expiry | Reviewer.
</output_format>
