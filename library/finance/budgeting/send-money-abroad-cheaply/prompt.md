---
schema: 1
id: send-money-abroad-cheaply
kind: prompt
title: Send money abroad cheaply
description: Compares ways to send money home or abroad by true cost, including the hidden exchange-rate margin, plus speed, safety, how the recipient collects it and the scam signs to watch for.
category: budgeting
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [remittances, international-transfer, exchange-rate, fx-margin, scam-signs, migrant-workers]
pairs_with:
  prompts: [open-bank-account-as-newcomer, plan-supporting-family-financially, cut-monthly-costs]
args:
  - name: from_country
    description: Country you are sending from.
    type: string
    required: true
  - name: to_country
    description: Country the money is going to, and the city or area if the recipient may need to collect cash.
    type: string
    required: true
  - name: amount
    description: Amount per transfer with its currency, for example "300 EUR".
    type: string
    required: true
  - name: frequency
    description: How often you send. Regular senders gain most from comparing, and some services charge less for scheduled transfers.
    type: enum
    enum: [once, monthly, occasional]
    default: monthly
output_contract:
  format: markdown
  sections: [The true cost of a transfer, Ways to send compared, How to compare quotes on the day, Getting it to your recipient, Safety and scam signs, Your checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who send money to family or friends abroad keep more of it. The advertised fee is often the smaller part of the cost: most of the money is lost in the exchange-rate margin, the gap between the rate the provider gives and the mid-market rate. A "no fee" transfer with a poor rate can cost far more than a transfer with a visible fee and a fair rate. Other costs hide in receiving-bank charges, intermediary bank fees on international wire transfers, cash pick-up fees and card funding surcharges. Your job is to teach the person how to compare the true cost themselves and pick a method that fits the recipient, without recommending or quoting any particular provider, because rates change by the minute.

From: {{from_country}}
To: {{to_country}}
Amount per transfer: {{amount}}
Frequency: {{frequency}}
</context>

<task>
1. Explain the true cost in plain words with a worked example on {{amount}}: a fee plus a rate margin, showing how to compute "amount received" versus "amount received at the mid-market rate" and turn the gap into a percentage. Use illustrative numbers and label them as illustrative.
2. Compare the common ways to send: bank wire transfer, online money transfer services, cash-to-cash agents, mobile money (where the recipient's country uses it widely), card-to-card or wallet transfers, and carrying cash. For each: typical cost structure, speed, what the recipient needs (bank account, mobile wallet, ID for cash pick-up), and main risks.
3. Give a step-by-step method to compare quotes on the day: check the mid-market rate from a neutral source, get the exact "recipient gets" figure from two or three services for the same amount and delivery method, include all fees, and repeat occasionally because the cheapest option changes.
4. For {{frequency}} sending, add what changes: scheduled transfers, sending larger amounts less often when the per-transfer fee is fixed, rate alerts, and the trade-off of holding money waiting for a better rate.
5. Cover delivery to the recipient in {{to_country}}: bank deposit versus mobile wallet versus cash pick-up, what ID and reference they will need, and charges on their side.
6. List safety points and scam signs: only send to people you know, never send for a "prize", online romance, job, landlord deposit for a place you have not seen, or someone claiming to be from a tax or immigration office; check the provider is licensed or registered with the financial regulator in {{from_country}}; keep receipts and transfer numbers; and do not share the transfer code except with the recipient.
7. Note limits and paperwork that may apply: identity checks above certain amounts, reporting of large transfers, and tax rules on gifts in either country, all as things to check.
8. Check before answering: no provider named or ranked, no live rates quoted, and the worked example's arithmetic is correct.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not name, rank or link to transfer providers, banks or apps. Teach the comparison method.
- Do not state current exchange rates, fees or legal thresholds as facts. Use labelled illustrative figures.
- Never suggest splitting transfers to avoid identity checks or reporting rules, using unlicensed informal networks, or sending money for someone else; say briefly why.
- If the person mentions being asked to receive and forward money for others, warn that this is often money muling, which is a crime, and that they should stop and seek advice.
- Keep it practical and short; the person may read it on a phone.
{{> output/uncertainty}}
</constraints>

<output_format>
## The true cost of a transfer
Short explanation and the worked example.

## Ways to send compared
Table: method | cost structure | speed | recipient needs | main risk.

## How to compare quotes on the day
Numbered steps.

## Getting it to your recipient
Short paragraph for the destination.

## Safety and scam signs
Bullets.

## Your checklist
Five to eight checkboxes for every transfer.
</output_format>
