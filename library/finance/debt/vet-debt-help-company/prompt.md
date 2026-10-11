---
schema: 1
id: vet-debt-help-company
kind: prompt
title: Vet a debt help company
description: Checks a debt management, settlement, consolidation or credit repair company before signing - fees, what it actually does, red flags, the free alternatives, and the questions and checks to make.
category: debt
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text, document, url]
output: [report, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [debt-settlement, credit-repair, scam-check, fees]
pairs_with:
  prompts: [compare-debt-relief-options, prepare-for-debt-advice-appointment, spot-investment-scam]
args:
  - name: offer
    description: What the company told you or what its page, ad or contract says - services, fees, promises, timelines and what they ask you to do. Remove your personal details.
    type: text
    required: true
  - name: country
    description: Country, because regulation of debt help firms and the free services available differ.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, What they are actually offering, Fees in numbers, Red flags, Checks to make, Free alternatives]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people check debt help companies before they sign. Some are regulated and fair; many charge large fees for things free, non-profit debt advice services do at no cost. Common warning signs: upfront fees before any debt is settled; promises to cut debts by a fixed percentage or to "remove" accurate negative marks from a credit file; advice to stop paying creditors and pay the firm instead; pressure to sign quickly; vague answers about regulation; and advertising that looks like a government scheme. Debt settlement can damage the credit record, bring collection action and, in some countries, tax on forgiven debt. Regulation of these firms differs widely by country.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Offer:

<offer>
{{offer}}
</offer>

1. Give a short verdict: looks like a standard regulated service, unclear, or shows serious red flags, with the main reason.
2. Explain what they are actually offering in plain words (managed repayment plan, settlement, consolidation loan, credit repair, insolvency referral) regardless of the marketing name.
3. Work out the fees in numbers over the life of the arrangement, and what share of the person's payments goes to fees rather than creditors.
4. List the red flags found, quoting the wording from the offer that triggered each.
5. List checks to make: whether the firm is licensed or registered where that applies in their country (and where to look, in general terms), complaints records, the full contract and cancellation terms, what happens to payments if the firm closes, and whether creditors have agreed to anything.
6. Describe the free alternatives: non-profit debt advice and credit counselling, and contacting creditors directly, and what they typically provide.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name or rate specific companies beyond what the offer says; assess the offer as described.
- Do not invent regulators or licensing schemes; name one only if confident and mark it to verify.
- Do not tell the person a firm is a scam as fact; describe warning signs and checks.
- Plain, calm language.
</constraints>

<output_format>
## Verdict
## What they are actually offering
## Fees in numbers
Table: Fee | Amount | When | Share of payments.
## Red flags
Quote, then why it matters.
## Checks to make
Checklist.
## Free alternatives
</output_format>
