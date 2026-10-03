---
schema: 1
id: evaluate-stock-tip
kind: prompt
title: Evaluate a stock tip
description: Puts a stock tip from social media or a friend through a sceptical check of claims, incentives, valuation basics and red flags, and lists what to verify, without recommending a trade.
category: investing
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [text, message]
output: [report, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [stock-tips, pump-and-dump, due-diligence, finfluencers, insider-trading]
pairs_with:
  prompts: [spot-investment-scam, read-company-financials, summarize-earnings-call, explain-options-risks]
  personas: [investing-educator]
args:
  - name: tip
    description: The tip itself, pasted as written - the post, message or what your friend said - including any figures, targets or deadlines it mentions.
    type: text
    required: true
  - name: source
    description: Where it came from (a friend, a coworker, a social video, a paid newsletter, a chat group, an unsolicited message) and anything you know about the person. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The claim in one line, Claim check, Who benefits if you act, Red flags found, Numbers to look up yourself, How individual stocks usually behave, Questions before you act, Bottom line]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most stock tips fail one of three tests: the claim cannot be checked, the person sharing it benefits if you act (they already own it, are paid to promote it, or earn from your sign-up), or the good news is already reflected in the price. Pump-and-dump schemes add urgency, tiny or thinly traded companies, and coordinated hype in chat groups and social feeds. Even honest tips about good companies are a different question from "is this a good investment at this price, in this amount, for me". Evidence on individual shares is sobering: long-run studies of all listed shares find that a small minority of companies account for most of the market's gains, and the majority of individual shares underperform a simple broad index over their lifetimes. A careful check slows the decision down and replaces excitement with things the person can verify.

<tip>
{{tip}}
</tip>
{{#source}}Source: {{source}}{{/source}}
</context>

<task>
1. The claim in one line: what exactly is being promised or predicted, with any number, target or deadline.
2. Claim check: break the tip into individual claims. For each, say whether it is a verifiable fact, a forecast, or an opinion; how the person can check it (company filings and annual reports, the exchange's announcements, the regulator's register, reputable financial news); and its status from the text alone (supported, unsupported, cannot tell).
3. Who benefits if you act: the incentives of the source - holding the stock, paid promotion (look for disclosures), affiliate or referral links, selling a course or subscription, wanting to feel right. Note what the source did not disclose.
4. Red flags found: check against urgency or "before it's too late", guaranteed or huge returns, very small or thinly traded companies and over-the-counter listings, recent name or business-model changes, coordinated hype, "insider" information (which is also a legal risk), pressure to move off-platform or into private chats, and requests to send money to an individual. Mark only the ones actually present.
5. Numbers to look up yourself: market value, revenue and its growth, profit or loss, cash and debt, share count changes (dilution), and one or two valuation ratios (price to earnings or price to sales) compared with similar companies. Explain in one line what each tells them. Do not state these figures from memory.
6. How individual stocks usually behave: two or three sentences on concentration risk, volatility and the base rate above, without lecturing.
7. Questions before you act: 6-8 questions (What would make me sell? How much could I lose without it affecting my plans? Why is this information not already in the price? Would I buy this if a stranger pitched it?).
8. Bottom line: a sober summary of how strong the tip's case is on the evidence supplied - strong, weak, or unverifiable - and what would need to be true for it to deserve more research. Do not say buy, sell or hold, and do not suggest an amount.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend trading the stock or any alternative investment, and do not suggest position sizes or price targets.
- Do not state company figures, prices or news from memory as current facts; tell the person where to verify them.
- If the tip shows signs of a scam (unregistered seller, guaranteed returns, payment to an individual or a crypto wallet, recovery offers), say so first and point to the national financial regulator's warning list and reporting route.
- If the tip claims insider information, say that trading on it can be illegal.
- Be respectful about the friend or source; question the claim, not the person.
{{> output/uncertainty}}
</constraints>

<output_format>
## The claim in one line
One line.

## Claim check
Table: claim | fact, forecast or opinion | how to verify | status.

## Who benefits if you act
Bullets.

## Red flags found
Bullets, only those present.

## Numbers to look up yourself
Table: number | where to find it | what it tells you.

## How individual stocks usually behave
Two or three sentences.

## Questions before you act
Numbered.

## Bottom line
Two or three sentences, no buy or sell call.
</output_format>
