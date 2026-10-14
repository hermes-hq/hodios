---
schema: 1
id: compare-term-sheets
kind: prompt
title: Compare competing term sheets
description: Compares two or more startup term sheets side by side - effective valuation after the pool, preferences, board control and other key terms - with founder payouts at several exit values.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [document, text]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [term-sheet, valuation, liquidation-preference, board-control, offer-comparison, venture-capital]
pairs_with:
  prompts: [explain-term-sheet, model-exit-waterfall, plan-term-sheet-negotiation, reference-check-investor]
  personas: [venture-capitalist]
args:
  - name: term_sheets
    description: The full text of each term sheet, labelled (A, B, C), and who each investor is in general terms.
    type: text
    required: true
  - name: cap_table
    description: The current fully diluted cap table and any SAFEs or notes that will convert.
    type: text
    required: true
  - name: priorities
    description: What matters most to you beyond money (for example board control, a specific partner, speed to close, follow-on capacity).
    type: text
output_contract:
  format: markdown
  sections: [Headline versus effective terms, Side by side, Payouts at exit, Control and flexibility, Non-financial factors, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders compare competing term sheets. The highest headline valuation is often not the best offer once the option pool shuffle, participating preferences, multiple-x preferences, ratchets or heavy protective provisions are counted. A fair comparison converts each offer to an effective pre-money (headline pre-money minus the value of any pool top-up founders pay for), computes founder ownership after each, and then compares payouts at realistic exit values, because preference terms matter most in modest outcomes. Control terms (board composition, vetoes) and the partner relationship often matter more over a decade than a few points of valuation.
</context>

<task>
Compare these term sheets.

<term_sheets>
{{term_sheets}}
</term_sheets>

<cap_table>
{{cap_table}}
</cap_table>

{{#priorities}}
<priorities>
{{priorities}}
</priorities>
{{/priorities}}

1. Headline versus effective terms: for each offer, headline pre-money, pool top-up and who pays for it, effective pre-money, founder fully diluted ownership after closing. Show formulas.
2. Side by side: every material term across offers (amount, security, preference multiple and participation, dividends, anti-dilution, board, protective provisions, pro rata, vesting changes, no-shop length, expenses, closing conditions). Mark each cell as common, more investor-favourable or more founder-favourable, in general terms.
3. Payouts at exit: founders' and investors' proceeds under each offer at four exit values: below the amount invested, around the post-money, three times post-money, and ten times. Show the calculation for at least one cell per offer.
4. Control and flexibility: what each offer lets the investor block, and what that means for the next round, a sale or a budget change.
5. Non-financial factors: list the factors from the user's priorities and what the documents say or do not say about them.
6. Questions for your lawyer and for each investor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the founder which offer to sign. Show the trade-offs; where one offer is better on every measure, you may say so factually.
- Use only terms in the documents; mark missing terms as "not stated" and do not assume market norms fill them.
- Arithmetic exact, with stated assumptions; ownership tables sum to 100%.
- Do not use one offer's terms to suggest misleading the other investor. Shopping terms is common, but recommend honesty about competing offers.
- Recommend a startup lawyer reviews the chosen term sheet before signing; binding clauses (exclusivity, confidentiality, expenses) take effect on signature.
</constraints>

<output_format>
## Headline versus effective terms
Table: Offer | Headline pre-money | Pool effect | Effective pre-money | Founders % after.
## Side by side
Table: Term | A | B | (C).
## Payouts at exit
Table: Exit value | Founders under A | Founders under B | Investor under A | Investor under B.
## Control and flexibility
## Non-financial factors
## Questions for your lawyer
</output_format>
