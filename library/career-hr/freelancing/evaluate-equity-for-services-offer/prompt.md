---
schema: 1
id: evaluate-equity-for-services-offer
kind: prompt
title: Evaluate an offer of equity instead of fees
description: Helps a freelancer weigh a startup client's offer to pay in equity, deferred fees or revenue share instead of cash, with the cash gap, terms to ask about, a counter-offer and the reply.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan]
role: [consultant, software-engineer, designer, marketer]
advice_risk: [financial, legal]
requires: [none]
inputs: [message, text]
output: [report, questions, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sweat-equity, startup-clients, deferred-fees, revenue-share, payment-terms]
pairs_with:
  prompts: [negotiate-client-payment-terms, explain-equity-compensation, price-services, screen-freelance-inquiry]
  personas: [freelance-business-advisor]
args:
  - name: offer
    description: What the client offered (percentage or number of shares or options, vesting, deferred fee, revenue share, mix of cash and equity) in their words, plus what they asked you to do and over what period.
    type: text
    required: true
  - name: startup
    description: What you know about the company - stage, funding raised, runway, founders, traction, and what the documents say (if you have seen any).
    type: text
    required: true
  - name: your_position
    description: Your normal fee for this work, how many months of cash you could go without, how much of your capacity it would take, and your country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Read of the offer, Cash gap, Questions before deciding, Options, Recommended reply, See a professional about]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer decide on a "we can't pay much, but we'll give you equity" offer. What experienced freelancers know: most early-stage equity ends up worth nothing, so it should be treated as a lottery ticket on top of a fee the freelancer can live on, not a replacement for it. The headline percentage means little without the share count, the type of instrument (shares, options, a future-equity agreement, a revenue share), vesting and what happens if the engagement ends, dilution in later rounds, and whether anything is actually documented. Deferred fees are only as good as the company's ability to pay. Being paid in equity can also create a tax event and a cash need before any value exists, depending on the country. And a freelancer who takes equity may be treated differently as a contractor; that is a question for an adviser.

<offer>
{{offer}}
</offer>

<startup>
{{startup}}
</startup>

<your_position>
{{your_position}}
</your_position>
</context>

<task>
1. Say once what you can help with here and that tax and legal points need an accountant or lawyer in the freelancer's country.
2. Read of the offer: what is actually being offered, what is missing, and the instrument type if identifiable. Mark unknowns.
3. Cash gap: the freelancer's normal fee for the work versus the cash offered, and how long they could carry that gap from their own numbers. Do not put a value on the equity; say why it cannot be valued from this information.
4. Questions before deciding: the specific questions to ask the founders (share count and fully diluted total, instrument, vesting and cliff, what happens if the work ends early, runway, who else is paid this way, the written agreement).
5. Options: decline; full fee in cash; reduced cash plus equity; cash with a deferred portion and a trigger date; a short paid phase first. For each, risk and when it suits.
6. Recommend one using the freelancer's cash runway and capacity, and draft a counter-offer and reply under 180 words.
7. See a professional about: tax on receiving equity, contract and status questions, reviewing the documents.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never estimate what the equity will be worth or call the offer a good investment.
- Do not state tax treatment as fact; list it as a question for an accountant.
- Never recommend a deal that leaves the freelancer unable to cover their stated costs.
- Recommend getting any equity or deferral in writing before starting work.
{{> output/uncertainty}}
</constraints>

<output_format>
## Read of the offer
Bullets.

## Cash gap
Short calculation.

## Questions before deciding
Numbered.

## Options
Table: Option | Cash now | Risk | Suits when.

## Recommended reply
Ready to send.

## See a professional about
Bullets.
</output_format>
