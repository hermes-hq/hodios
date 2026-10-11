---
schema: 1
id: write-customer-security-advisory
kind: prompt
title: Write a security advisory for customers
description: Writes a security advisory for business customers about a fixed vulnerability in your product, with affected versions, severity, required action, exploitation status and what is not known.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [security-engineer, software-engineer, engineering-manager]
requires: [none]
inputs: [notes, ticket]
output: [docs, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [security-advisory, vulnerability-disclosure, cvss, customer-notice, patching]
pairs_with:
  prompts: [coordinate-security-release, write-public-incident-report]
args:
  - name: vulnerability
    description: What the flaw is, affected products and versions or deployment types, fixed version, severity score if computed, whether exploitation was observed, workaround, credit.
    type: text
    required: true
  - name: customers
    description: Who receives it (self-hosted admins, SaaS tenants, partners), and any contract or regulatory notice requirements the team has told you about.
    type: text
output_contract:
  format: markdown
  sections: [Advisory, Check before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A customer security advisory is read by security teams who must decide quickly whether they are affected and what to do. They look for: product and version ranges in a form they can match against their inventory, severity with the scoring vector, whether exploitation has been seen, the exact action (upgrade to which version, or a workaround), and whether SaaS customers need to do anything at all. Advisories go wrong by overstating ("no customer data was affected" when logs cannot prove it), giving exploit details before customers can patch, hiding the severity, or mixing a vulnerability notice with a data breach notification, which has separate legal requirements.
</context>

<task>
Write the security advisory.

<vulnerability>
{{vulnerability}}
</vulnerability>
{{#customers}}
<customers>
{{customers}}
</customers>
{{/customers}}

1. Write a title with product, flaw type and severity.
2. Summary: what the flaw allows an attacker to do, who is affected, and the action, in three sentences.
3. Affected and fixed versions, or deployment types, as a table; say explicitly who is not affected.
4. Severity: rating and score with vector if given; otherwise say it is not yet scored rather than inventing one.
5. Exploitation status, stated exactly as known ("we have no evidence of exploitation", "we are investigating"), and how customers can check their own logs if there are known indicators.
6. Required action: upgrade steps, workaround and its side effects, and what SaaS customers need to do (often nothing).
7. Enough technical detail for defenders, without a step-by-step exploit.
8. Timeline, credit if the reporter agreed, contact for questions, and a revision history line.
</task>

<constraints>
- Never invent CVE ids, scores, versions, dates or exploitation status.
- Do not say no data was accessed unless the input says it was verified; prefer "we have no evidence".
- If the input suggests customer data was actually accessed, stop and say this may be a breach requiring a separate notification reviewed by legal, and write only the vulnerability parts.
- Plain, calm language; no marketing.
</constraints>

<output_format>
## Advisory
Title, Summary, Affected versions, Severity, Exploitation status, What you need to do, Technical details, Timeline, Credit, Contact, Revision history.

## Check before publishing
Facts to verify and approvals needed.
</output_format>
