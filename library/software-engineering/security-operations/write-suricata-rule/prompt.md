---
schema: 1
id: write-suricata-rule
kind: prompt
title: Write a Suricata or Snort rule
description: Writes a Suricata or Snort network detection rule from traffic samples or a threat description, with sticky buffers, flow options, thresholds, false-positive notes and a pcap test plan.
category: security-operations
version: 1.0.0
status: incubating
stage: [build]
role: [security-engineer]
requires: [none]
inputs: [logs, text]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [suricata, snort, ids-signature, network-detection, pcap, mitre-attack]
pairs_with:
  prompts: [write-sigma-rule, analyze-packet-capture, write-yara-rule, map-detection-coverage]
  personas: [detection-engineer]
args:
  - name: threat
    description: What to detect on the wire - the protocol, the request or response that is distinctive, ports, direction and the ATT&CK technique if known.
    type: text
    required: true
  - name: traffic_samples
    description: Sanitised packet details, Zeek or Suricata eve.json records, HTTP requests, TLS handshake fields or a hex dump showing the malicious traffic and similar benign traffic.
    type: text
  - name: engine
    description: Engine and version, such as Suricata 7, Snort 3 or Snort 2.9, and whether it runs as passive IDS or inline IPS.
    type: string
    default: "Suricata 7, IDS mode"
  - name: environment
    description: Optional notes on HOME_NET and EXTERNAL_NET, the ruleset already loaded (for example ET Open), local sid range, traffic volume and whether TLS is decrypted anywhere.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Rule, How it works, False positives and performance, Test plan, Before you deploy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Network signatures fail in predictable ways. A rule with only a `pcre` and no `content` cannot use the fast pattern matcher and hurts the whole sensor. A rule without `flow:established,to_server` fires on scans and half-open connections. A rule that matches raw payload where a sticky buffer exists (`http.uri`, `http.host`, `http.user_agent`, `tls.sni`, `dns.query`, `ja3.hash` or `ja4.hash`) breaks on chunked encoding, compression or a different port. Encrypted traffic exposes only handshake metadata, so a rule that looks for an HTTP path on port 443 will never fire unless TLS is decrypted. Suricata, Snort 3 and Snort 2.9 differ in buffer and option syntax, so a rule must be written for the engine that will run it. Good rules anchor on something the operator of the malicious infrastructure cannot cheaply change, use a selective `content` as the fast pattern, and come with a way to prove they fire and stay quiet.
</context>

<task>
Write a network detection rule for this threat:

<threat>
{{threat}}
</threat>
{{#traffic_samples}}

<traffic_samples>
{{traffic_samples}}
</traffic_samples>
{{/traffic_samples}}
{{#environment}}

<environment>
{{environment}}
</environment>
{{/environment}}

Target engine: {{engine}}

1. If the threat gives no protocol or no observable you can match on the wire (for example "detect ransomware"), ask for a traffic sample or a specific network behaviour and stop.
2. State assumptions: engine and syntax, IDS or IPS action, the variables used (`$HOME_NET`, `$EXTERNAL_NET`, `$HTTP_PORTS`), whether the traffic is cleartext or TLS, and a local sid in the 1000000 to 1999999 range unless the user gave one.
3. Choose the protocol keyword (`http`, `tls`, `dns`, `tcp`, `udp`) so app-layer parsing works on any port. Put matches in the right sticky buffer for this engine. Use the longest, rarest `content` as the `fast_pattern`; add `nocase`, `startswith`, `endswith`, `depth`, `offset`, `distance` or `within` only where the sample justifies them. Use `pcre` only after a `content` has narrowed the candidates.
4. Add `flow` (direction and state). If the behaviour is a rate (beaconing, brute force, scanning), use `threshold` or `detection_filter` with a stated count and window, and explain why that number.
5. Fill `msg` with a clear prefix (for example `LOCAL`), `classtype`, `reference` only if supplied or well known, `metadata` with ATT&CK ids if certain, `sid` and `rev:1`.
6. If one rule cannot be both precise and complete, write a high-fidelity rule and a broader hunting rule and label each.
7. Trace each line of the samples against the rule and say whether it matches. If there are no samples, describe the exact traffic a test pcap must contain.
8. Re-read the rule for syntax: semicolons, quoted strings, escaped `|`, `;` and `"` inside content, hex bytes inside `|..|`, and options that exist in the stated engine.
</task>

<constraints>
- Defensive use only. Describe malicious traffic only to the depth needed to match it. Do not write exploit traffic or show how to slip past the rule.
- Never invent sids of public rulesets, CVE numbers, ATT&CK ids or references. Mark anything uncertain `[VERIFY]`.
- Do not claim the rule was tested. Say how to test it.
- Prefer `alert` for a new rule. Suggest `drop` in IPS mode only after the rule has run in alert mode without false positives.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets: engine, mode, variables, encryption, sid.

## Rule
One fenced code block with the complete rule or rules, one per line.

## How it works
One bullet per option group: what it matches, why it is there, how an attacker could change it.

## False positives and performance
Known benign traffic that could match, the fast pattern chosen and why, and any cost concern.

## Test plan
Sample trace table (sample | expected | matches) or the pcap contents needed. Then the commands, for example `suricata -T -S local.rules` to check syntax and `suricata -r test.pcap -S local.rules -l ./out` then read `eve.json` or `fast.log`, or the Snort 3 equivalent.

## Before you deploy
Checklist: syntax test, replay positive and negative pcaps, run on a day of real traffic in alert mode, record owner, sid and review date.
</output_format>
