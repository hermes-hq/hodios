---
schema: 1
id: choose-funding-instrument
kind: prompt
title: Choose between a SAFE, note or priced round
description: Compares raising on SAFEs, convertible notes or a priced equity round for a specific startup - cost, speed, control, dilution and signalling - and lists what to ask a lawyer.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [notes, text]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [safe, convertible-note, priced-round, early-stage, deal-structure]
pairs_with:
  prompts: [calculate-safe-conversion, size-fundraising-round, explain-term-sheet]
  personas: [venture-capitalist]
args:
  - name: situation
    description: Your company and raise - stage, how much you plan to raise, from whom (angels, a lead fund, friends and family), any instruments already outstanding, and how soon you need the money.
    type: text
    required: true
  - name: country
    description: Where the company is incorporated and where most investors are. Instruments and their tax treatment differ by country.
    type: string
output_contract:
  format: markdown
  sections: [Your situation, The options, Comparison, What tips the balance for you, Risks to watch, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders understand the trade-offs between financing instruments before they talk to investors. SAFEs are fast and cheap to paper but postpone the price, so founders who stack several often underestimate their dilution. Convertible notes are debt with interest and a maturity date, which creates leverage for holders if the round never comes. A priced round costs more in legal fees and time, sets a valuation and usually brings board seats and investor rights, but gives everyone a clear cap table. Which one fits depends on the round size, who the investors are, whether a lead is setting terms, and local practice: SAFEs are common in the US and some other markets, while elsewhere advance subscription agreements, convertible loans or straight equity are the norm and tax incentives for investors may only apply to certain instruments.
</context>

<task>
Compare the options for this raise.

<situation>
{{situation}}
</situation>

{{#country}}Country of incorporation and investors: {{country}}{{/country}}

1. Your situation: restate the facts that matter for the choice in three to five bullets, and name what is missing.
2. The options: describe each instrument relevant in this country in plain words (SAFE or its local equivalent, convertible note or loan, priced equity round). If the country is not given, say which market you are assuming and that local instruments may differ.
3. Comparison table: legal cost and time, when the price is set, dilution visibility, investor rights and control, what happens if no next round comes, how investors in this situation tend to see it.
4. What tips the balance for you: tie the trade-offs to the user's facts (round size, lead or no lead, existing instruments, timeline). Present the considerations, not a verdict.
5. Risks to watch: stacking SAFEs, note maturity, MFN clauses, side letters, investor tax relief conditions, signalling of a very high cap.
6. Questions for your lawyer, specific to this raise.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the founder which instrument to use; lay out the trade-offs against their facts so they can decide with their lawyer.
- Do not cite specific legal fees, market statistics or tax rules as facts. Describe them in general terms and say they vary by country and over time.
- Do not assume US instruments are available or usual everywhere.
- If existing instruments are mentioned, point out how they interact with each new option (for example MFN or conversion order).
</constraints>

<output_format>
## Your situation
## The options
## Comparison
Table: Factor | SAFE (or local equivalent) | Convertible note | Priced round.
## What tips the balance for you
## Risks to watch
## Questions for your lawyer
Numbered.
</output_format>
