---
schema: 1
id: compare-cash-vs-money-market-funds
kind: prompt
title: Compare savings accounts and money market funds
description: Compares holding cash in savings accounts with money market funds and short-term government bills on yield after fees, protection, access, price risk and tax, with the numbers on your own balance.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [money-market-funds, cash-management, treasury-bills, deposit-protection]
pairs_with:
  prompts: [compare-savings-accounts, explain-bonds-and-interest-rates, explain-fund-document, build-emergency-fund-plan]
  personas: [investing-educator]
args:
  - name: situation
    description: How much cash, what it is for and when you might need it, where it is now and at what rate, and the options you are comparing with their yields and fees.
    type: text
    required: true
  - name: country
    description: Country, so deposit protection and tax points can be framed as checks. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The options in plain words, Side by side, The numbers on your balance, What could go wrong with each, Tax and wrappers, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When interest rates are meaningful, people holding large cash balances start comparing bank savings with money market funds (MMFs) and short-term government bills. They are close but not the same. A bank deposit is a loan to the bank, covered up to a limit by the country's deposit guarantee scheme. An MMF is an investment fund holding very short-term debt; it is not covered by deposit protection, its yield moves quickly with policy rates, it charges a fund fee and possibly a platform fee, and in severe stress some funds have restricted withdrawals or fallen slightly in value. Government money market funds and bills carry less credit risk than funds holding bank or company paper. Short-term government bills held directly have a known return to maturity but are bought through a broker and may have dealing costs. Many platforms quietly pay a low rate on uninvested cash. Yield comparisons must use the same basis (after all fees, before tax, annualised) and tax treatment differs between interest and fund returns in some countries.

<situation>
{{situation}}
</situation>
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. The options in plain words: easy-access savings, fixed-term savings, MMF (government and non-government), and short-term government bills, each in two lines.
2. Side by side: a table across yield basis, fees, protection, access speed, price risk, minimums and how to buy.
3. The numbers on your balance: using the rates they gave (or labelled illustrative rates), the yearly income in money for each option after fees, and the difference. Show how much of the balance exceeds the deposit protection limit if that is relevant, as a figure to check.
4. What could go wrong with each: bank failure above the protection limit, fund suspension or small loss, rates falling quickly for variable options, a fixed term locking money, platform cash rates being low.
5. Tax and wrappers: whether interest and fund returns are taxed differently, and tax-advantaged accounts, as questions to check for their country.
6. Questions to check with the provider or platform, and why emergency money usually stays in protected, instant-access savings.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific bank, fund or platform, or tell them which option to choose.
- Do not state current interest rates or protection limits from memory as fact; use theirs or label as illustrative and to check.
- Do not predict interest rates.
{{> output/uncertainty}}
</constraints>

<output_format>
## The options in plain words
Bullets.

## Side by side
Table: feature | easy-access savings | fixed-term savings | money market fund | government bills.

## The numbers on your balance
Table: option | rate after fees | yearly income | note.

## What could go wrong with each
Bullets.

## Tax and wrappers
Bulleted questions.

## Questions to check
Bullets.
</output_format>
