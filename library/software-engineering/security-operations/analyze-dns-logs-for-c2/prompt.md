---
schema: 1
id: analyze-dns-logs-for-c2
kind: prompt
title: Analyse DNS logs for command and control
description: Analyses DNS query logs for beaconing, DGA domains, DNS tunnelling and rare new domains, with queries for your platform and the benign patterns to rule out first.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [code, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [dns-logs, beaconing, dga, dns-tunnelling, zeek, threat-hunting]
pairs_with:
  prompts: [analyze-packet-capture, write-siem-query, write-threat-hunt-plan, investigate-suspicious-domain]
  personas: [detection-engineer]
args:
  - name: log_source
    description: Where the DNS logs come from (Windows DNS server debug or analytical logs, Zeek dns.log, a resolver, a firewall or a cloud DNS service), the fields available and a few sample lines.
    type: text
    required: true
  - name: platform
    description: Where you will run the queries, such as Splunk, Microsoft Sentinel, Elastic, a SQL warehouse or command-line tools.
    type: string
    required: true
  - name: time_window
    description: The window to analyse and roughly how many queries per day the logs contain.
    type: string
    default: "the last 7 days"
output_contract:
  format: markdown
  sections: [Data check, Hunts, Queries, Benign patterns to exclude, Triage of results, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Malware still leans on DNS: to find its server, to beacon, and sometimes to carry data. Four hunts find most of it. Beaconing: the same client resolving the same domain at near-regular intervals, measured by the spread of inter-query gaps rather than the count. Algorithmically generated domains: many NXDOMAIN answers from one client, long random-looking labels with high character entropy and few vowels. Tunnelling: long subdomain labels, many unique subdomains under one parent, TXT or NULL queries, and high query volume to one domain from one client. Rarity: domains seen for the first time this week, or by only one or two clients across the organisation. Each has well-known benign twins: anti-virus and reputation services that encode hashes in subdomains, DNS blocklist lookups by mail servers, CDN and telemetry hostnames, ad-tech, Kerberos and service discovery records, and software update checks that run on a timer. Two data traps also mislead hunters: a forwarding resolver's logs show the forwarder, not the real client, and browsers or malware using DNS over HTTPS bypass these logs entirely.
</context>

<task>
Build a DNS hunt from this source:

<log_source>
{{log_source}}
</log_source>

Platform: {{platform}}
Time window: {{time_window}}

1. Data check: confirm the fields needed (timestamp, client IP or host, query name, query type, response code, answers) and whether the client field is the real endpoint or a forwarder. Say what each hunt loses if a field is missing.
2. Hunts: describe the four hunts (beaconing, DGA, tunnelling, rare or new domains) with the measure each uses and a starting threshold, labelled as a starting point to tune.
3. Queries: write one query per hunt for the stated platform, extracting the registered domain where possible, aggregating per client and domain, and outputting the measure. Comment non-obvious lines.
4. Benign patterns to exclude: list the common benign sources and show how to exclude them by allowlist, not by broad wildcards, so an attacker cannot hide under them.
5. Triage of results: for each hunt, the follow-up checks (domain age and reputation, process making the queries via EDR or Sysmon event 22, other clients hitting it, network traffic to the resolved IPs).
6. Limits: DNS over HTTPS, encrypted resolvers, cached answers, and what other telemetry closes the gap.
</task>

<constraints>
- Never invent field names for the platform's data model; use the names in the samples and state assumptions.
- Thresholds are starting points. Say how to tune them on a week of data.
- Do not call a result command and control without a second source of evidence.
- Defang any domains from the logs in the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
Field table and gaps.

## Hunts
Table: Hunt | Measure | Starting threshold | Why it works.

## Queries
One fenced block per hunt in the platform's language.

## Benign patterns to exclude
Bullets with the allowlist approach.

## Triage of results
Table: Hunt | First checks | Escalate when.

## Limits
Bullets.
</output_format>
