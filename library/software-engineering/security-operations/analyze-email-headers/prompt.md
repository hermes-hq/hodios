---
schema: 1
id: analyze-email-headers
kind: prompt
title: Analyse raw email headers
description: Analyses raw email headers for the delivery path, SPF, DKIM and DMARC results, alignment, spoofing signs and relay anomalies, explaining each finding in plain words for analysts and support staff.
category: security-operations
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer, support-agent]
requires: [none]
inputs: [message, text]
output: [report, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [email-headers, spf, dkim, dmarc, spoofing]
pairs_with:
  prompts: [investigate-reported-phishing, triage-soc-alert]
  personas: [soc-analyst]
args:
  - name: headers
    description: The full raw headers of one message, copied with the "show original" or "view source" option of the mail client, not a forwarded copy.
    type: text
    required: true
  - name: claimed_sender
    description: Who the message claims to be from, if that differs from or adds to the From header, such as "our CFO" or "the bank we use".
    type: string
    default: ""
  - name: recipient_domain
    description: Your own mail domain, so the analysis can tell which Received headers your servers added and can be trusted.
    type: string
    default: ""
output_contract:
  format: markdown
  sections: [Bottom line, Identities, Delivery path, Authentication, Findings, What headers cannot tell you, Next checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Email headers answer "where did this really come from?" better than anything in the body, but they are easy to misread. Each server prepends its own `Received` line, so the path reads bottom to top, and only the lines added by the recipient's own infrastructure can be trusted; anything below them can be forged by the sender. SPF checks the envelope sender (`Return-Path`), not the visible `From`; DKIM proves a domain signed the message, which may not be the `From` domain; DMARC passes only when SPF or DKIM passes **and** aligns with the `From` domain. Forwarding and mailing lists break SPF legitimately, and ARC headers may explain that. A careful reading separates spoofing from ordinary misconfiguration.
</context>

<task>
Analyse these headers:

<headers>
{{headers}}
</headers>
{{#claimed_sender}}
Claimed sender: {{claimed_sender}}
{{/claimed_sender}}
{{#recipient_domain}}
Recipient's own domain: {{recipient_domain}}
{{/recipient_domain}}

1. If the input is a forwarded message or a body without `Received` and `Authentication-Results` lines, say that the original headers are needed, explain how to get them, and stop.
2. Identities: list `From` (display name and address), `Reply-To`, `Return-Path`, `Sender` if present, the DKIM `d=` domain(s) and the `Message-ID` domain. Flag mismatches and lookalike domains (character swaps, extra words, different top-level domain, punycode `xn--`).
3. Delivery path: parse every `Received` header from bottom (origin) to top (final delivery). For each hop give the from-host, by-host, IP, timestamp and delay from the previous hop. Mark which hops were added by the recipient's own servers (trusted) and which are claimed by earlier servers (untrusted). Note private IP origins, HELO names that do not match the IP's host, large delays and time-zone oddities.
4. Authentication: read the `Authentication-Results` header added by the recipient's own server (ignore any copy inserted earlier). Report SPF, DKIM and DMARC results, the domains each was evaluated against, and whether each aligns with the `From` domain. If ARC headers are present, say what they claim about earlier authentication and whether the sealer is a forwarder the recipient trusts.
5. Findings: each finding with a severity (red flag, worth checking, benign explanation likely) and a one-sentence plain-language explanation that a support colleague could repeat to the user.
6. Give the bottom line: consistent with the claimed sender, spoofed, sent from a lookalike domain, sent from a compromised legitimate account (passes everything but the content or path is unusual), or inconclusive, with the evidence.
7. Before answering, re-check the hop order and that every authentication claim cites the exact header text it came from.
</task>

<constraints>
- Headers alone cannot prove intent, and passing SPF, DKIM and DMARC does not mean the message is safe (compromised accounts and newly registered lookalike domains pass). Say so where relevant.
- Do not look up IPs or domains unless a tool is available; when you cannot, say which lookups would help (reverse DNS, WHOIS registration date, the domain's published DMARC policy).
- Defang every domain, IP and URL you repeat outside a quoted header (`mail[.]example[.]com`, `203.0.113[.]5`).
- Do not include the message body content or personal data beyond what the analysis needs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Bottom line
Two or three sentences: the verdict and the strongest evidence.

## Identities
Table: Field | Value (defanged) | Note.

## Delivery path
Table, origin first: Hop | From host / IP | By host | Time (UTC) | Delay | Trusted? | Note.

## Authentication
Table: Check | Result | Evaluated domain | Aligned with From? | Source header.

## Findings
Bullets, red flags first, each with a plain-language explanation.

## What headers cannot tell you
Two or three bullets.

## Next checks
Numbered, such as searching mail logs for the same sender or subject, checking the domain's registration date, or asking the claimed sender through a known channel.
</output_format>
