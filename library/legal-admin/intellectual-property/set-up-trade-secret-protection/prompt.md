---
schema: 1
id: set-up-trade-secret-protection
kind: prompt
title: Set up trade secret protection
description: Identifies a small business's confidential know-how such as recipes, formulas, pricing and code, and sets up proportionate protection - access, marking, agreements, onboarding and leaver steps.
category: intellectual-property
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [trade-secrets, confidential-information, know-how, employee-leavers, access-control]
pairs_with:
  prompts: [audit-small-business-ip, review-nda, choose-invention-protection-route]
args:
  - name: business
    description: What the business does, team size including contractors, and where it operates.
    type: text
    required: true
  - name: secrets
    description: The information you think gives you an edge (recipes, formulas, supplier terms, customer lists, pricing models, source code, processes), where it lives today and who can see it.
    type: text
    required: true
  - name: concern
    description: Any trigger - a key employee leaving, a new manufacturer, an investor asking, a suspected leak. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What counts as a secret here, Secrets register, Protection measures, People and agreements, If a leak is suspected, First 30 days]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses protect know-how the way an IP-savvy operations consultant does. In many legal systems, information is only protected as a trade secret if it has value because it is not generally known and the owner took reasonable steps to keep it secret. That last condition is where small businesses lose: the recipe on a shared drive anyone can open, the customer list exported freely, no confidentiality clause in contractor agreements, nothing said when people leave. Courts generally look for proportionate, documented measures, not perfect security. What is general skill and experience a former employee may usually take with them, and what is a protectable secret, is a common dispute; a clear register helps. Restrictive covenants and their enforceability vary widely by country.
{{#concern}}

Current concern: {{concern}}
{{/concern}}
</context>

<task>
<business>
{{business}}
</business>

<secrets>
{{secrets}}
</secrets>

1. What counts as a secret here: sort the listed items into likely protectable secrets, information that is probably public or general know-how, and unclear, with reasons.
2. Secrets register: a table with item, owner, where it lives, who has access, value if leaked, and protection level (high, medium, low).
3. Protection measures: proportionate steps by level - need-to-know access, separate storage, marking documents confidential, splitting recipes or processes across suppliers, logging access, controlled sharing with manufacturers.
4. People and agreements: confidentiality terms for employees, contractors, manufacturers and investors to check with a lawyer; onboarding briefing; a leaver checklist (return of devices, access removal, reminder letter); and a note that non-compete and non-solicit terms vary widely and need local advice.
5. If a leak is suspected: preserve evidence, stop further access, do not accuse publicly, contact a lawyer quickly because remedies can be time-sensitive.
6. First 30 days: a short dated action list.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that anything is legally a trade secret or that a covenant is enforceable; describe the general test and mark local rules `[CHECK locally]`.
- Do not draft monitoring of employees beyond what is proportionate, and note that privacy and employment law limit monitoring.
- Do not advise accusing a named person; keep leak steps evidential.
{{> output/uncertainty}}
</constraints>

<output_format>
## What counts as a secret here
Three short lists.

## Secrets register
Table.

## Protection measures
Bullets grouped by level.

## People and agreements
Bullets and a leaver checklist.

## If a leak is suspected
Numbered steps.

## First 30 days
Table: week | action | who.
</output_format>
