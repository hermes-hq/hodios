---
schema: 1
id: negotiate-client-payment-terms
kind: prompt
title: Negotiate client payment terms
description: Helps a freelancer push back on long payment terms, no deposit or pay-on-results before signing, with a cash-flow check, fallback terms to propose and the message to send.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, message, document]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [payment-terms, deposits, milestone-billing, cash-flow, net-60]
pairs_with:
  prompts: [chase-late-payment, write-invoice, review-freelance-contract]
args:
  - name: proposed_terms
    description: The client's proposed payment terms (for example net 60, net 90, paid at end of project, paid on results, supplier onboarding first), the project value and length, and who the client is (size, sector).
    type: text
    required: true
  - name: your_situation
    description: Your preferred terms, your cash buffer in months, how much this project is of your income, and how much you want the job.
    type: text
    required: true
  - name: country
    description: Where you and the client are based. Some places have statutory late-payment rules or maximum terms for business invoices.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [What the terms cost you, Ask and fallbacks, Message, What to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer negotiate payment terms before work starts, which is the only time they have leverage. What experienced freelancers know: large clients often send net 60 or net 90 as a default, not a fixed rule, and accounts teams frequently accept a deposit or milestone billing for small suppliers if asked early; a project paid only at the end turns the freelancer into the client's lender; "paid on results" shifts business risk onto someone with no control over it; and supplier onboarding (forms, purchase orders) can add weeks, so the purchase order should exist before work starts. Some countries set statutory interest or compensation on late business payments, or maximum terms, which can strengthen the ask; the freelancer should confirm what applies.

Location: {{country}}
</context>

<task>
<proposed_terms>
{{proposed_terms}}
</proposed_terms>

<your_situation>
{{your_situation}}
</your_situation>

1. What the terms cost you: the gap in weeks between doing the work and being paid, the money outstanding at the worst point, and whether the cash buffer covers it. Use only the user's figures; show the arithmetic.
2. Ask and fallbacks: the first ask (for example a deposit plus milestone invoices on net 14 or 30), two fallbacks in order, and the walk-away point. For each, say why a client could accept it. If the terms are "paid on results", explain the risk and offer a fixed fee with an optional bonus instead.
3. Write the message to the client or their procurement contact: friendly, matter-of-fact, framed as how you work with all clients, proposing the ask with one fallback held back.
4. What to check: whether statutory late-payment rules or maximum terms may apply in the stated country (named as something to confirm, not stated as law), the purchase order and onboarding steps to finish before starting, and the clauses to put in the contract.
</task>

<constraints>
{{> guardrails/scope-discipline}}
- Do not state specific statutory rates, maximum terms or laws as fact; say they may exist and where to confirm (an official government business portal or an adviser).
- Never advise starting work before agreed terms are in writing when the freelancer's buffer cannot cover the gap.
- Keep the message under 150 words, no threats.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the terms cost you
Short calculation and a one-line verdict.

## Ask and fallbacks
Table: option | terms | why the client might accept | your risk.

## Message
Ready to send.

## What to check
Bullets.
</output_format>
