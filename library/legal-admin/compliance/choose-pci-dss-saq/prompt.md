---
schema: 1
id: choose-pci-dss-saq
kind: prompt
title: Work out your PCI DSS scope
description: Maps how a small merchant takes card payments to find which PCI DSS self-assessment questionnaire likely applies, what is in scope, and how to shrink scope before filling it in.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, software-engineer]
subject: [law, ecommerce, retail]
requires: [none]
inputs: [text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pci-dss, card-payments, payment-security, self-assessment, merchant-compliance]
pairs_with:
  prompts: [answer-security-questionnaire, build-compliance-checklist, run-vendor-due-diligence]
args:
  - name: payment_setup
    description: Every way you take card payments - online checkout (hosted payment page, embedded fields, iframe, or your own form), card terminals (standalone, integrated with a till), phone or mail orders, payment links - with the provider names, and whether card numbers ever touch your systems, emails or paper.
    type: text
    required: true
  - name: business
    description: The business, roughly how many card transactions a year, and who asked you for PCI compliance (bank, acquirer, payment provider). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Card data flow, Likely questionnaire, Scope reducers, Common gaps, Questions for your provider, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small merchant make sense of PCI DSS, the card industry's security standard. Most small merchants validate with a self-assessment questionnaire (SAQ), and the right one depends almost entirely on how card data flows: fully outsourced e-commerce where the payment page is hosted by the provider is much lighter than a site whose own scripts could tamper with the payment page, and standalone terminals are lighter than tills that handle card data. Which SAQ applies, and the merchant level, are set by the acquirer or payment provider, and the questionnaires change between versions of the standard, so the provider's confirmation matters. Merchants often enlarge their scope by accident: staff writing card numbers on paper for phone orders, customers emailing card details, call recordings that capture card numbers, or a website that loads many third-party scripts on the checkout page.
</context>

<task>
Payment setup:

<setup>
{{payment_setup}}
</setup>
{{#business}}

Business:
<business>
{{business}}
</business>
{{/business}}

1. Card data flow: for each payment channel, describe where card data is entered, which systems and people could see or affect it, and whether it is stored, processed or transmitted by the merchant.
2. Likely questionnaire: name the SAQ type that commonly fits each channel, explain why, and say that the provider or acquirer must confirm it. If channels differ, explain that the combined set may need a broader SAQ.
3. Scope reducers: concrete changes that would reduce scope (switch to a hosted payment page or provider-hosted fields, stop taking card numbers by email or paper, use payment links or a provider's phone payment service, pause call recording during card entry, segment the terminal network, limit and monitor scripts on payment pages).
4. Common gaps for this setup: practical controls small merchants often miss (default passwords on terminals or routers, staff access, terminal tamper checks, policy and training records, quarterly external scans where required, script inventory on payment pages).
5. Questions for your provider.
6. Next steps: an ordered list to get to a completed SAQ and attestation, with who does what.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state the SAQ as final; the acquirer or provider confirms it. Name the version of the standard only if the user supplied it, otherwise say "check the current version".
- Do not invent requirement numbers, fees or deadlines.
- If the merchant stores full card numbers or security codes anywhere, say clearly to stop and securely delete them now, and that storing security codes after authorisation is generally prohibited.
- Recommend a qualified security assessor or the provider's compliance team for high volumes, custom payment integrations, or after a suspected card data breach.
{{> output/uncertainty}}
</constraints>

<output_format>
## Card data flow
Table: channel | where card data is entered | who or what can see or affect it | stored, processed or transmitted.

## Likely questionnaire
Per channel, with the reason and "confirm with provider".

## Scope reducers
Table: change | effect on scope | effort.

## Common gaps
Checklist.

## Questions for your provider
Numbered list.

## Next steps
Ordered list with owners.
</output_format>
