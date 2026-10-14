---
schema: 1
id: set-up-gifts-and-hospitality-register
kind: prompt
title: Set up a gifts and hospitality register
description: Sets anti-bribery rules for gifts and hospitality given or received - approval thresholds, red flags like public officials or pending decisions - with a register template and a decision guide.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, legal-professional, sales-rep]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [anti-bribery, gifts-register, corporate-hospitality, conflicts-of-interest, public-officials]
pairs_with:
  prompts: [write-anti-bribery-policy, write-conflict-of-interest-policy, write-supplier-code-of-conduct, write-whistleblowing-policy, plan-staff-compliance-training]
args:
  - name: organisation
    description: The organisation - country, sector, size, who staff deal with (customers, suppliers, public officials, state-owned companies, foreign agents), typical gifts and hospitality given and received, and any tenders or permits pending.
    type: text
    required: true
  - name: examples
    description: Recent or planned gifts and hospitality you want assessed - who, what, value, when and why. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risk profile, Rules, Decision guide, Examples assessed, Register template, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation manage gifts and hospitality so they do not become bribery risk. Anti-bribery laws in many countries make it an offence to offer or accept an advantage intended to influence someone improperly, and some make organisations liable for failing to prevent bribery by their people or agents unless they have adequate procedures. Reasonable, proportionate hospitality is usually fine; risk rises with value, frequency, timing (during a tender, a permit decision or contract renewal), the recipient (public officials and employees of state-owned companies carry special rules in many places), cash or cash equivalents, family members, and secrecy. A register with approval thresholds and a quick decision guide is the core of "adequate procedures" for a small business, together with training and the willingness to say no politely.
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>
{{#examples}}

Examples to assess:
<examples>
{{examples}}
</examples>
{{/examples}}

1. Risk profile: where gifts and hospitality risk comes from in this organisation (counterparties, public officials, countries, tenders, agents), rated with reasons.
2. Rules: what is always allowed, what needs registering, what needs prior approval and by whom, and what is never allowed (cash or equivalents, anything during a live tender or decision with that party, anything secret, gifts to public officials beyond trivial items unless approved and lawful locally). Propose value thresholds as policy choices, not legal limits, in local currency placeholders.
3. Decision guide: a short set of questions an employee answers before giving or accepting (the purpose, the value, the timing, the recipient, would you be comfortable seeing it reported, is it recorded).
4. Examples assessed: for each example supplied, a verdict (fine, register, needs approval, decline) with reasons.
5. Register template: fields for date, giver, recipient, organisation, description, estimated value, given or received, business reason, approver, decision and notes.
6. Rollout: who owns the register, how often it is reviewed, training, how to decline politely, and how concerns are reported. If the organisation has no wider anti-bribery policy (third parties, facilitation payments, donations), say the register should sit under one.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not present value thresholds as legal limits; they are internal policy choices unless the user cites a rule. Do not invent statutes or official limits; mark local rules "verify".
- Never help disguise a payment, gift or hospitality as something else, or split it to stay under a threshold. Flag such requests.
- Recommend legal advice for dealings with public officials in high-risk countries, use of agents or intermediaries, or any facilitation payment request.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk profile
Bullets with a rating.

## Rules
Table: category | rule | approval needed from.

## Decision guide
Numbered questions.

## Examples assessed
Table: example | verdict | reason.

## Register template
Table with headers.

## Rollout
Checklist.
</output_format>
