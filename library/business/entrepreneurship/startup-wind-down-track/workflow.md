---
schema: 1
id: startup-wind-down-track
kind: workflow
title: Startup wind-down track
description: Winds down a startup or small company in gated steps - confirm the decision, cash and creditors, staff, customers and assets, then the closing paperwork to verify with professionals.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan, operate, ship]
role: [founder, executive]
advice_risk: [legal, financial]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [shutdown, company-closure, creditors, insolvency-check, orderly-exit]
pairs_with:
  prompts: [evaluate-pivot, plan-cofounder-breakup, write-investor-update, plan-layoff-conversation]
  personas: [startup-mentor, small-business-advisor]
args:
  - name: company
    description: The company - what it does, country of registration, legal form, staff and contractors, customers and contracts, investors, and why you are considering closing.
    type: text
    required: true
  - name: finances
    description: Cash in the bank, monthly burn, money owed to the company, debts and money owed to others (suppliers, tax, staff, loans, leases), and any personal guarantees.
    type: text
    required: true
steps:
  - {id: decision, file: steps/01-decision.md, stage: plan, gate: approve}
  - {id: cash-and-creditors, file: steps/02-cash-and-creditors.md, stage: plan, gate: approve}
  - {id: people, file: steps/03-people.md, stage: operate, gate: approve}
  - {id: customers-and-assets, file: steps/04-customers-and-assets.md, stage: operate, gate: approve}
  - {id: closing, file: steps/05-closing.md, stage: ship, gate: none}
output_contract:
  format: markdown
  sections: [Confirm the decision, Cash and creditors, Staff and contractors, "Customers, contracts and assets", Closing paperwork, Running checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a founder through closing a company in an orderly, honest way. Each step stops for approval.

<company>
{{company}}
</company>

<finances>
{{finances}}
</finances>

Rules for every step:
{{> guardrails/professional-limits}}
- The order in which debts are paid, directors' duties once a company may be insolvent, staff entitlements and the formal closure route depend on the country. Present them as checks with an accountant, an insolvency practitioner or a lawyer; never state the rule.
- If the company may not be able to pay its debts in full, say early that directors' duties can change and that advice should come before paying any creditor, founder or investor.
- Never suggest moving assets out, favouring some creditors, or hiding the closure from people owed money.
- Keep a running checklist (Item | Owner | Deadline | Status), reprinted at the end of each step.
