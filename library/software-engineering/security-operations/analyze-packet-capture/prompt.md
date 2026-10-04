---
schema: 1
id: analyze-packet-capture
kind: prompt
title: Analyse a packet capture summary
description: Analyses a packet capture summary from a tool's output to identify protocols, suspicious connections, beaconing and data transfer patterns, and suggests filters and checks to inspect next.
category: security-operations
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [packet-analysis, network-forensics, beaconing, dns-analysis, exfiltration]
pairs_with:
  prompts: [build-forensic-timeline, review-firewall-rules, triage-soc-alert]
  personas: [soc-analyst]
args:
  - name: capture_summary
    description: Text output from your analysis tool - conversation and protocol statistics, DNS query lists, TLS handshake details (server names, certificates, fingerprints), HTTP request lines, or decoded excerpts - with timestamps.
    type: text
    required: true
  - name: question
    description: What you need to know, such as "is host 10.1.4.22 talking to a command-and-control server?" or "was data exfiltrated during the incident window?".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Answer, Protocol overview, Notable connections, Patterns, Benign explanations, Inspect next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Raw captures are too large to paste, so analysts work from summaries: conversation statistics, DNS query lists, TLS server names, HTTP request lines. Those summaries hide the answer in patterns rather than single packets: connections at near-regular intervals with similar sizes (beaconing), more bytes going out than coming in (exfiltration), long random-looking subdomains or bursts of failed lookups (DNS tunnelling or generated domains), TLS to a bare IP or with a server name that does not fit the certificate, and cleartext protocols carrying credentials. Each pattern has innocent look-alikes, such as update checks, telemetry, backups and video calls, so conclusions need the evidence and the alternative side by side.
</context>

<task>
Answer this question: {{question}}

<capture_summary>
{{capture_summary}}
</capture_summary>

1. If the summary has no timestamps, hosts or byte counts relevant to the question, say what output to generate (for example conversation statistics, DNS query names, TLS handshake server names) and stop.
2. Answer first, in two or three sentences, with a confidence level.
3. Protocol overview: the protocols and their share, and anything unexpected for the network (cleartext protocols, uncommon ports, protocols on non-standard ports).
4. Notable connections: hosts and destinations worth attention, with timing, volume, direction and why each stands out.
5. Patterns, where the data supports them:
   - Beaconing: interval regularity (mean, spread, jitter), consistent request and response sizes, persistence across the capture.
   - Data transfer: outbound versus inbound byte ratio, large uploads to unusual destinations, transfers outside working hours.
   - DNS: long or high-entropy subdomains, many unique subdomains under one domain, TXT-heavy traffic, bursts of non-existent domain responses, newly seen domains.
   - TLS and HTTP: server name versus certificate mismatches, self-signed certificates, rare client fingerprints if given, unusual user agents, POST requests to bare IPs.
6. Benign explanations for each suspicious pattern and how to tell them apart.
7. Inspect next: specific display filters or tool commands phrased for common analysers (for example `dns.qry.name contains "example"`, `tls.handshake.type == 1`, `http.request.method == "POST"`, `ip.addr == 10.1.4.22`), and which host or log data to correlate (endpoint process for the connection, proxy logs, DNS server logs).
8. Before answering, check that every claim cites values present in the summary and that interval or ratio calculations are shown.
</task>

<constraints>
- You only see the summary, not the packets; never describe payload content that is not in the input.
- Do not attribute traffic to a named threat actor or malware family; describe the behaviour.
- Defang external IPs and domains in the narrative (`198.51.100[.]14`, `cdn-sync[.]example`).
- Analysis covers traffic the user is authorised to capture on their own network; do not suggest probing external hosts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Answer
Two or three sentences with confidence.

## Protocol overview
Short table or bullets.

## Notable connections
Table: Source | Destination (defanged) | Protocol/port | Count | Bytes out/in | Timing | Why notable.

## Patterns
Subsections only for patterns found, each with the numbers.

## Benign explanations
Bullets paired with the suspicious pattern.

## Inspect next
Numbered list of filters, commands and correlations, each with what it would confirm.
</output_format>
