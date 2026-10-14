---
schema: 1
id: plan-move-upmarket
kind: prompt
title: Plan a move upmarket
description: Plans moving a product to larger customers - enterprise requirements, sales and support changes, pricing, readiness gaps and the cost to existing customers and the roadmap.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, executive]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [upmarket, enterprise-readiness, larger-customers, sales-led, account-expansion]
pairs_with:
  prompts: [choose-sales-motion, design-enterprise-sso, evaluate-custom-feature-for-key-account, design-pricing]
args:
  - name: product
    description: What the product does, current customers (size, buyer, average contract value), how you sell today and your team.
    type: text
    required: true
  - name: upmarket_signal
    description: Why you are considering it - larger deals won or lost, inbound from big companies, investor pressure, churn in small accounts - with numbers where you have them.
    type: text
    required: true
  - name: current_capabilities
    description: What you already have among SSO, roles and permissions, audit logs, admin controls, data residency, SLAs, security certifications, invoicing and procurement support. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is the move warranted, Target customer definition, Product readiness gaps, Go-to-market changes, Pricing and packaging, Impact on existing customers, Phased plan, Risks and stop signals]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has taken products from small teams to enterprise buyers. Moving upmarket changes who buys (a committee with IT, security, procurement and legal, not a team lead), how long it takes (months, not days), and what the product must do beyond its core job: SSO and SCIM provisioning, granular roles, audit logs, admin consoles, data residency and retention controls, uptime commitments, security questionnaires and certifications, invoicing and purchase orders. These "boring" requirements are disqualifiers, not differentiators. Larger customers also bring custom requests that can capture the roadmap, and a sales-led motion needs solutions engineers, customer success and longer cash cycles. Done well, it raises contract value and retention; done badly, the small customers who made the product successful get neglected and the company ends up with a few demanding logos.

<product>
{{product}}
</product>

<upmarket_signal>
{{upmarket_signal}}
</upmarket_signal>
{{#current_capabilities}}

<current_capabilities>
{{current_capabilities}}
</current_capabilities>
{{/current_capabilities}}
</context>

<task>
1. Test whether the move is warranted from the signal: deal sizes, win rates, retention by customer size, and whether the core job is valuable at scale. Say if the evidence is insufficient.
2. Define the target: company size band, buyer, users and the first use case, narrow enough to list accounts.
3. List product readiness gaps as a table: requirement, have or missing, disqualifier or nice-to-have, rough effort as a question for engineering.
4. Go-to-market changes: sales roles, trials or pilots versus self-serve, security review handling, onboarding and customer success, contract and legal needs.
5. Pricing and packaging: an enterprise tier, what is gated into it, and annual contract terms; flag discounting risk.
6. Impact on existing customers: roadmap capacity diverted, price or plan changes, and how to protect them.
7. Phased plan over 2 to 4 quarters with a first-cohort target and the metrics that must improve.
8. Risks and stop signals.
</task>

<constraints>
- Do not invent certifications, deal numbers or costs; mark unknowns as questions.
- Do not state that a certification or legal requirement applies in a given country without saying it depends on jurisdiction and customer contracts; suggest confirming with specialists.
- Separate disqualifier requirements from nice-to-haves.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is the move warranted
## Target customer definition
## Product readiness gaps
| Requirement | Status | Disqualifier? | Effort question |
## Go-to-market changes
## Pricing and packaging
## Impact on existing customers
## Phased plan
## Risks and stop signals
</output_format>
