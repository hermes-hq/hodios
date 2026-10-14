---
schema: 1
id: assess-vendor-breach-impact
kind: prompt
title: Assess the impact of a vendor's breach
description: Works out what a supplier's security breach means for you - the access and data they held, secrets to rotate, activity to hunt for, questions to ask them and obligations to check.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, operations-manager]
requires: [none]
inputs: [text, message]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [third-party-risk, supply-chain-attack, credential-rotation, breach-response, vendor-management]
pairs_with:
  prompts: [respond-to-leaked-secret, investigate-cloud-audit-logs, plan-data-breach-response, write-incident-update]
  personas: [soc-analyst]
args:
  - name: notice
    description: The vendor's notice or public statement as written, and anything else you know (news, their status page).
    type: text
    required: true
  - name: relationship
    description: What the vendor does for you - data you share, accounts or API keys they hold, integrations, single sign-on trust, network or remote access, software they ship into your estate.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What we know, Our exposure, Do now, Hunt, Questions for the vendor, Obligations to check, Decision log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A vendor's first breach notice is usually incomplete and careful about liability: "unauthorised access to a limited number of systems". Waiting for the full story is the common mistake. What matters is what the vendor held of yours: API keys and OAuth tokens for your systems, service accounts, single sign-on trust, remote support access, your data in their platform, and software or updates they push into your estate. Anything they held should be treated as exposed until proven otherwise: rotate it, then look for use of it from unusual places since well before the date they gave. Your own notification duties to customers or regulators may follow if personal data was involved, and they depend on your country, sector and contracts.
</context>

<task>
Assess this vendor breach.

<notice>
{{notice}}
</notice>

<relationship>
{{relationship}}
</relationship>

1. Summarise what is known from the notice, quoting it, and what it does not say (dates, systems, data types, whether credentials or customer tokens were taken).
2. Map your exposure in four areas: credentials and tokens they hold for your systems, network or remote access paths, your data they store or process, and software or updates they deliver to you. Rate each high, medium or low with the reason.
3. Do now: rotate or revoke every credential and token they held (in an order that will not break production unannounced), restrict or suspend their remote access and integrations if exposure is high, and raise monitoring on their access paths. Give owner roles.
4. Hunt: what to search for and where - use of the vendor's keys or service accounts from new IPs or at odd times, data exports through their integration, new OAuth grants, changes made through their access - starting from a date well before the one in the notice, and say why.
5. Questions for the vendor: specific ones that decide your exposure (dates of first and last access, whether customer secrets or data of yours were accessed, indicators they can share, what they have rotated on their side, contact for coordination).
6. Obligations to check: contract notification and audit clauses, your own possible notification duties if personal data was involved, insurer notice requirements. Route each to its owner rather than deciding it.
7. Start a decision log with the first entries.
</task>

<constraints>
- Do not invent details of the vendor's breach or say whether your data was taken; only the vendor's evidence or your own can show that.
- Do not state legal deadlines or duties as fact; name them as items for legal, privacy or the contract owner.
- Do not recommend publicly blaming the vendor or making external statements before the facts and the communication owner are clear.
{{> output/uncertainty}}
</constraints>

<output_format>
## What we know
Bullets quoting the notice, then "Not stated" bullets.

## Our exposure
Table: Area | What they hold | Rating | Reason.

## Do now
Numbered actions with owner role.

## Hunt
Table: Search | Where | From date.

## Questions for the vendor
Numbered.

## Obligations to check
Bullets with owner.

## Decision log
Table: Time | Decision | By | Reason.
</output_format>
