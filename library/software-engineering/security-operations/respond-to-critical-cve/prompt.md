---
schema: 1
id: respond-to-critical-cve
kind: prompt
title: Respond to a newly disclosed critical vulnerability
description: Plans the first days after a critical, possibly exploited vulnerability is disclosed - find exposure, mitigate, patch, check for compromise before the patch, and keep people informed.
category: security-operations
version: 1.0.0
status: incubating
stage: [operate]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [vulnerability-response, emergency-patching, exposure-assessment, compromise-assessment, cve]
pairs_with:
  prompts: [prioritize-vulnerability-backlog, write-threat-hunt-plan, write-incident-update, write-siem-query]
  personas: [soc-analyst]
args:
  - name: vulnerability
    description: What is known - CVE id if any, product or library, affected versions, exploitation status and the vendor advisory text or summary. Paste the advisory; it is the source of truth.
    type: text
    required: true
  - name: environment
    description: Where the product or library might be in your estate - asset inventory or SBOM extracts, internet-facing services, cloud accounts, container images, vendors that may run it for you.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Exposure check, Mitigate now, Patch plan, Compromise assessment, Communication, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When a critical vulnerability lands in an edge appliance, a VPN, a file transfer product or a widely used library, the first question is "where do we run it", and the asset inventory is usually wrong. Libraries hide as transitive dependencies, inside container base images and inside vendor products. Scanner signatures arrive late. Patching closes the hole but does not remove an attacker who got in before the patch: for exploited edge devices the attacker often leaves web shells, new admin accounts or altered configuration, and some vendors ship an integrity check for exactly this. Teams also over-trust the CVSS score and under-trust the exploitation status, and they lose time when nobody owns the external messages.
</context>

<task>
Plan the response to this vulnerability.

<vulnerability>
{{vulnerability}}
</vulnerability>

<environment>
{{environment}}
</environment>

1. State assumptions and what the advisory actually says: affected versions and configurations, fixed versions, whether exploitation is reported, and what is still unclear. Quote the advisory rather than restating from memory.
2. Exposure check: list every place the product or library could be running and how to confirm it - inventory queries, SBOM or dependency tree searches including transitive dependencies, container image scans, external attack surface checks for internet-facing instances, and questions to vendors and hosting providers. Rank found instances by exposure (internet-facing, internal, not reachable) and criticality.
3. Mitigate now: the vendor's interim mitigations if any, network restrictions, disabling the vulnerable feature, WAF or IPS rules as a stopgap (say they are partial), and taking an internet-facing instance offline if exploitation is active and no mitigation exists. Give the decision owner for each.
4. Patch plan: order by exposure, test steps proportional to the risk, rollback, and the deadline you recommend with reasoning.
5. Compromise assessment for any instance that was exposed before mitigation: when exposure began, logs to preserve first, signs to look for that the advisory or trusted reports name, vendor integrity tools, and whether to rebuild instead of patch. If the advisory names no indicators, say what generic signs to check and that the list is generic.
6. Communication: a short internal update (what, exposure, actions, next update time), what to tell customers if they ask, and who owns external statements.
7. Open questions to close in the next 24 hours.
</task>

<constraints>
- Use only the advisory and environment supplied for versions, indicators and fixes. Never invent affected versions, patch numbers, IOCs or exploit details; mark anything not in the advisory as "verify with the vendor".
- Do not provide exploit code or steps to exploit the vulnerability, including "to test if we are vulnerable"; point to vendor or reputable scanner checks instead.
- Patched is not clean: never mark an exposed instance resolved without a compromise check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets, including what the advisory says and what it leaves open.

## Exposure check
Table: Where it might run | How to confirm | Exposure | Owner.

## Mitigate now
Numbered actions with decision owner.

## Patch plan
Ordered list with deadline and rollback.

## Compromise assessment
Checklist per exposed instance.

## Communication
The internal update text and notes for customer questions.

## Open questions
Bullets.
</output_format>
