---
schema: 1
id: evaluate-creator-management-offer
kind: prompt
title: Evaluate a creator management offer
description: Evaluates a talent manager, agency or network's offer to represent a creator - commission and what it covers, term and exit, exclusivity, post-term commission and services - with checks and asks.
category: creator-business
version: 1.0.0
status: incubating
stage: [review]
role: [content-creator]
inputs: [document, message, notes]
output: [report, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [talent-management, agency-contract, commission, representation, due-diligence]
pairs_with:
  prompts: [plan-first-creator-hire, review-sponsorship-contract, evaluate-platform-exclusive-deal]
  personas: [creator-business-manager]
args:
  - name: offer
    description: The offer or contract terms as written or summarised - who they are, commission rate and on which income, term, exclusivity, notice and exit, post-term commission, who receives brand payments, and what services they promise.
    type: text
    required: true
  - name: situation
    description: Your audience and income by source, how many brand deals you handle now and how, what you struggle with (finding deals, negotiating, admin), and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The offer in plain words, What it would cost, What they should deliver, Red flags, Checks before signing, Asks, Recommendation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good manager or agency can bring better deals and save time; a bad contract can take a share of income they had no part in for years. The terms that matter most: what the commission applies to (only deals they bring, all brand deals, or all income including platform payouts, memberships and merch the creator built alone); the length of the term and whether it renews automatically; how either side can exit and with what notice; post-term or "sunset" commission on deals they started or on renewals; whether brand payments flow through them (and how fast the creator is paid and can see the brand's actual fee); exclusivity; who can sign deals on the creator's behalf; and what they will actually do, in writing. Multi-channel networks may also take a share of platform ad revenue or claim rights in content. Creators should talk to other clients, see examples of deals the manager has brought, and get any contract reviewed before signing.
</context>

<task>
<offer>
{{offer}}
</offer>

<situation>
{{situation}}
</situation>

1. **The offer in plain words:** each term restated, marking what is unclear or missing.
2. **What it would cost:** commission on the creator's current income under the terms as written (separately for income they would bring and income the creator already earns), over the full term and any post-term period. Use only the user's figures.
3. **What they should deliver:** what the creator needs (from the situation) and whether the offer commits to it; services to get in writing.
4. **Red flags:** commission on income they do not generate, long or auto-renewing terms without a performance exit, broad post-term commission, payments routed through them without transparency, authority to sign for the creator, rights in content, upfront fees.
5. **Checks before signing:** talk to current and former clients, ask for examples of deals and results, check who owns the company, ask how conflicts with their other clients are handled.
6. **Asks:** specific changes to request (commission only on deals they bring, a trial period, a performance exit, a short post-term window, direct payment or full brand-fee transparency, no signing authority).
7. **Recommendation:** sign, negotiate, or decline, and say that any contract should be reviewed by a lawyer or a creators' union or association before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what commission rate is "standard" as fact; say rates vary by market and type of representation and how to compare offers.
- Do not make claims about the specific company's reputation; list what to check.
- Do not predict legal outcomes or say a clause is unenforceable.
- If only a summary is given, say the written contract must be checked.
</constraints>

<output_format>
## The offer in plain words
Table: term | what it says | unclear or missing.

## What it would cost
Table: income source | yearly amount | commission under these terms.

## What they should deliver
## Red flags
## Checks before signing
Checkbox list.

## Asks
## Recommendation
</output_format>
