---
schema: 1
id: define-security-incident-severity
kind: prompt
title: Define security incident severity levels
description: Defines security incident severity levels with criteria, worked examples, response times, who is paged, and when legal, leadership, communications and insurers must be told.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [security-engineer, engineering-manager]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [incident-severity, escalation, notification, security-governance, response-targets]
pairs_with:
  prompts: [write-ir-playbook, write-incident-response-plan, plan-security-tabletop, plan-data-breach-response]
args:
  - name: organisation
    description: Size, industry, countries of operation, the data you hold (customer personal data, payment, health), on-call setup and who handles security incidents.
    type: text
    required: true
  - name: existing_process
    description: Optional current severity scheme (for outages or security), escalation paths and pain points such as over-paging or late legal involvement.
    type: text
  - name: obligations
    description: Optional regulatory, contractual or insurance notification duties you already know apply.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Severity matrix, Examples, Notification triggers, Escalation and change rules, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outage severity scales measure user impact right now; security severity has to measure something different: what the attacker can reach, how sensitive the data is, how far the compromise has spread, how sure you are, and whether a legal or contractual clock has started. A phishing email that nobody clicked and a confirmed domain admin compromise must land far apart, and a suspected exposure of personal data needs legal involvement early even when nothing is down. Clocks for regulators, customers and insurers typically start from when the organisation becomes aware, and some are short, so the scale must say who is told at each level and by when. Severity should be set on the reasonable worst case from current evidence, raised quickly as facts arrive, and lowered only with evidence. Teams that reuse their outage scale end up paging everyone for a commodity malware detection or treating a quiet data leak as low priority because the site is up.
</context>

<task>
Define security incident severity levels for:

<organisation>
{{organisation}}
</organisation>
{{#existing_process}}

<existing_process>
{{existing_process}}
</existing_process>
{{/existing_process}}
{{#obligations}}

<obligations>
{{obligations}}
</obligations>
{{/obligations}}

1. Principles: five or six short rules (set on reasonable worst case, raise fast, lower with evidence, one incident lead, record the time of awareness, the scale complements rather than replaces the outage scale).
2. Severity matrix: four levels. For each: criteria across attacker access (none, user, privileged, domain or cloud admin), data (none, internal, personal, special category or payment), scope (single asset, multiple, organisation-wide), business impact, and confidence; the response target to start; who is paged; and who leads.
3. Examples: at least two realistic examples per level relevant to this organisation, including tricky ones (a lost encrypted laptop, a researcher report of an exposed bucket, a vendor breach affecting your data).
4. Notification triggers: for each level, when legal or privacy counsel, leadership, communications, customers under contract and the cyber insurer must be told, internally, and by when. For external notification duties, list the ones the user named and examples that commonly apply in their countries and sector, all marked `[VERIFY]` with the reminder that counsel decides.
5. Escalation and change rules: who can set and change severity, how upgrades are announced, the evidence needed to downgrade, and how to handle disagreement.
6. Open decisions: the choices the organisation must confirm (paging out of hours at each level, who approves external notices, insurer contact path).
</task>

<constraints>
- Never state notification deadlines or regulations as definitive for this organisation; list them as items to verify with counsel.
- Keep criteria observable so an on-call engineer can apply them at 3am.
- Do not copy the outage scale's criteria for security levels.
{{> output/uncertainty}}
</constraints>

<output_format>
## Principles
Numbered list.

## Severity matrix
Table: Level | Criteria | Response target | Paged | Lead.

## Examples
Table: Example | Level | Why.

## Notification triggers
Table: Level | Legal or privacy | Leadership | Communications | Customers | Insurer | Regulators (to verify).

## Escalation and change rules
Bullets.

## Open decisions
Checklist.
</output_format>
