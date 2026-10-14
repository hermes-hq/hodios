---
schema: 1
id: evaluate-down-round-terms
kind: prompt
title: Evaluate a down round offer
description: Works through a down round offer - anti-dilution adjustments for earlier investors, pay-to-play, founder and employee dilution, option repricing - and the alternatives to weigh.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [document, dataset]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [down-round, anti-dilution, pay-to-play, recapitalisation, option-repricing]
pairs_with:
  prompts: [plan-bridge-round, model-exit-waterfall, explain-term-sheet]
args:
  - name: offer
    description: The new round's terms - amount, pre-money valuation, price per share, any pay-to-play, preference or other special terms.
    type: text
    required: true
  - name: cap_table
    description: Current cap table by class with original issue prices, preference terms and each series' anti-dilution clause (full ratchet, broad-based or narrow-based weighted average), plus the option pool and strike prices.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The offer in plain words, Anti-dilution adjustments, Cap table after, Employees and options, Alternatives to weigh, Questions for your lawyer and board]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders and boards understand a down round, where the new price per share is below an earlier round's. The headline dilution is only the start. Earlier preferred investors' anti-dilution clauses adjust their conversion price, which issues them effectively more shares at the expense of common holders; full ratchet is far harsher than weighted average. New investors may require pay-to-play, where existing investors who do not participate lose rights or convert to common. Employee options end up underwater, which damages retention unless the board considers repricing or new grants. Down rounds also need careful board process because insiders often sit on both sides.
</context>

<task>
Evaluate this down round.

<offer>
{{offer}}
</offer>

<cap_table>
{{cap_table}}
</cap_table>

1. The offer in plain words: amount, new price per share against each earlier series' price, and the percentage drop.
2. Anti-dilution adjustments: for each earlier series, apply its clause and show the new conversion price and the extra as-converted shares. For weighted average use NCP = OCP x (A + B) / (A + C), where A is shares outstanding before the issue on the clause's basis, B is the shares the new money would buy at the old price, and C is the new shares actually issued. Show the numbers. If the clause type is not given, show both full ratchet and broad-based weighted average and label them.
3. Cap table after: as-converted ownership of founders, employees, each series and the new investor, compared with today.
4. Employees and options: how many options are underwater at the new price, and the retention options for the board to consider (repricing, new grants, refreshed vesting), with the dilution each implies.
5. Alternatives to weigh: an insider-led bridge, structured terms at a flat price, cutting burn, a sale process; for each, what it avoids and what it costs.
6. Questions for your lawyer and board, including conflicts when insiders participate and the approvals the documents require.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the documents' own anti-dilution definitions where given; shares counted in A differ by clause and must be stated.
- Arithmetic exact, formulas shown, ownership sums to 100%.
- Do not recommend accepting or rejecting; set out the effects and alternatives.
- Option repricing and down rounds have tax and accounting consequences that differ by country; say so and refer to an accountant.
- Directors' duties apply when insiders are on both sides; recommend legal advice on process.
</constraints>

<output_format>
## The offer in plain words
## Anti-dilution adjustments
Per series: clause, formula with numbers, new conversion price, extra shares.
## Cap table after
Table: Holder | % as-converted today | % after.
## Employees and options
## Alternatives to weigh
Table: Alternative | Avoids | Costs.
## Questions for your lawyer and board
</output_format>
