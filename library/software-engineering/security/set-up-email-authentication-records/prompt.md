---
schema: 1
id: set-up-email-authentication-records
kind: prompt
title: Set up SPF, DKIM and DMARC for a domain
description: Sets up SPF, DKIM and DMARC for a sending domain across every service that sends as it, staged from monitoring to reject, and explains how to read the reports.
category: security
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, security-engineer, founder]
stack: []
requires: [none]
inputs: [config, text]
output: [config, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [spf, dkim, dmarc, email-spoofing, dns]
pairs_with:
  prompts: [implement-transactional-email, audit-email-deliverability, set-up-domain-and-https]
args:
  - name: domain_setup
    description: The domain, its current DNS TXT records for SPF and DMARC (paste them), and every service that sends mail as the domain (mailbox provider, transactional email, marketing, CRM, helpdesk, invoicing).
    type: text
    required: true
  - name: goal
    description: What prompted this, such as spoofing reports, a provider's sender requirements, a security questionnaire, or launching a new sender. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Sender inventory, SPF, DKIM, DMARC rollout, Checks, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
DMARC is what stops others sending mail that claims to be from your domain, and large mailbox providers now expect SPF, DKIM and DMARC from bulk senders. Getting it wrong does not show up at once: it shows up weeks later when invoices or password resets from a forgotten sender start bouncing. What experts know: DMARC passes when SPF or DKIM passes and is aligned with the visible From domain, so a service that signs with its own domain and uses its own return path does not help until custom DKIM (and ideally a custom return path) is configured. SPF allows only one TXT record per name and a limit of 10 DNS lookups, so pasting every vendor's `include:` quickly breaks it; using subdomains per sender (for example `mail.` for marketing) avoids both the limit and reputation mixing. SPF breaks on forwarding; DKIM survives it, so DKIM alignment is the one to get right for every sender. The safe rollout is DMARC at `p=none` with aggregate reports (`rua`), reading them for a few weeks to find every legitimate sender, then `quarantine` with a percentage, then `reject`. Parked domains that never send should publish a reject-everything SPF and DMARC straight away.
</context>

<task>
Plan email authentication for {{domain_setup}}.
{{#goal}}Reason: {{goal}}{{/goal}}

1. Build the sender inventory: every service that sends as the domain or its subdomains, what it sends, and whether it supports custom DKIM and a custom return-path domain. Ask about senders commonly forgotten (helpdesk, invoicing, HR, calendar, monitoring alerts, website forms).
2. SPF: write the record, count the DNS lookups, and if it exceeds 10 or mixes unrelated senders, move senders to subdomains rather than flattening by hand. End with `~all` during rollout unless the inventory is certain.
3. DKIM: list each sender's setup step and the selector records it will ask for, using the exact values the provider's dashboard shows. Recommend 2048-bit keys where offered and note how each provider rotates keys.
4. DMARC: write the starting record at `p=none` with an aggregate report address (a mailbox or a report-processing service), and `sp=` for subdomains. Give the staged plan with criteria for each move: all legitimate sources pass aligned DKIM or SPF in the reports for at least two to four weeks, then `quarantine` (optionally `pct=`), then `reject`.
5. Explain how to read an aggregate report: source IPs, which pass or fail, and how to map an unknown source to a forgotten sender or to spoofing.
6. Add records for unused domains and subdomains that should never send.
7. Give checks after each change: look up the TXT records, send a test message to a mailbox and read the `Authentication-Results` header for spf, dkim and dmarc pass with alignment.
</task>

<constraints>
- Do not invent provider-specific include values, selectors or IP ranges; tell the user to copy them from each provider's setup page, and mark placeholders clearly.
- Never recommend jumping to `p=reject` before reports show every legitimate sender aligned.
- Keep a single SPF record per name; warn if the pasted records show duplicates.
- Do not ask for or repeat email contents or personal data from reports beyond what is needed.
</constraints>

<output_format>
## Sender inventory
Table: service, purpose, From domain, custom DKIM supported, custom return path, status.
## SPF
The record per domain or subdomain, with the lookup count.
## DKIM
One line per sender: setup step and record type to add.
## DMARC rollout
Records for each stage, with the criteria and suggested dates for moving on.
## Checks
How to verify each step.
## Risks
What could break and how to spot it early.
</output_format>
