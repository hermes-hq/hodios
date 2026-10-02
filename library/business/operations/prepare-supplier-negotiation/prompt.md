---
schema: 1
id: prepare-supplier-negotiation
kind: prompt
title: Prepare a supplier negotiation
description: Prepares a buyer-side negotiation with a supplier or landlord - benchmarks to check, leverage, asks and trades, BATNA, walk-away point and scripts. For small business owners and buyers.
category: operations
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, manager]
inputs: [text, document]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [batna, procurement, purchasing, lease-renewal, price-increase, concessions]
pairs_with:
  prompts: [compare-vendors, write-rfp, plan-inventory]
  personas: [small-business-advisor]
args:
  - name: supplier_situation
    description: Who the supplier or landlord is to you, what you buy and spend, the current terms, what they are proposing (for example a price rise or renewal), the relationship history, and deadlines.
    type: text
    required: true
  - name: goals
    description: What you want out of the negotiation - price, terms, service levels, flexibility - and what matters most.
    type: text
    required: true
  - name: alternatives
    description: Other suppliers, quotes, or options you have (switching, splitting volume, doing it in-house, moving premises). Leave empty if you have not looked yet.
    type: text
output_contract:
  format: markdown
  sections: [Situation summary, Benchmarks to check, BATNA and walk-away, Leverage, Asks and trades, Opening and scripts, Objections, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare small business owners and buyers for negotiations with suppliers and landlords, in the principled-negotiation tradition: know your best alternative before you talk, separate interests from positions, trade rather than concede, and keep the relationship workable. Small buyers often believe they have no leverage; in practice they usually have some (payment reliability, commitment length, volume consolidation, flexibility on timing, referrals) and they lose most by negotiating without preparation or by accepting the first number.
</context>

<task>
Prepare this negotiation.

<supplier_situation>
{{supplier_situation}}
</supplier_situation>

<goals>
{{goals}}
</goals>
{{#alternatives}}
<alternatives>
{{alternatives}}
</alternatives>
{{/alternatives}}

1. Situation summary: what is at stake per year, the supplier's likely interests (cash flow, volume, predictability, reducing their own cost increases, keeping a reliable customer, filling a vacant unit) and the user's interests behind their stated goals.
2. Benchmarks to check before the meeting: the specific comparisons to gather (competitor quotes, published price indices for the input, local rents for similar premises, what the supplier charges others), where to find them, and how many quotes to get. Do not state benchmark figures you do not have.
3. BATNA and walk-away: the user's best alternative if no deal is reached, how to strengthen it before the meeting, its real cost including switching costs, and the walk-away point that follows from it. Estimate the supplier's alternative too.
4. Leverage: what the user can credibly offer or withhold.
5. Asks and trades: a ranked list of asks (price, phased increase, payment terms, volume discounts, rebates, delivery, quality or service levels, minimum order, contract length, break clauses, rent-free periods, repairs) with an ideal, a target and a minimum for each, and trades the user can give in return. Pair each concession with something received ("if… then…").
6. Opening and scripts: the opening statement, the first offer or counter with justification, and short scripts for anchoring, asking for the reason behind a price rise, proposing a trade, pausing, and closing with a written summary.
7. Objections: the supplier's likely responses and how to answer each.
8. Next steps: preparation tasks with dates, who should be in the meeting, and what to get in writing.
</task>

<constraints>
- Never invent market prices, competitor quotes or rents. Name what to check and mark any figure not from the input as an assumption.
- No deception: do not suggest bluffing about quotes or offers that do not exist. Honest leverage only.
- Keep scripts short and natural, in the user's voice.
- For leases and long contracts, recommend a solicitor reviews the final terms (rent reviews, repair obligations, personal guarantees, break clauses) before signing; this is negotiation preparation, not legal advice.
</constraints>

<output_format>
## Situation summary
## Benchmarks to check
Checklist with sources.
## BATNA and walk-away
## Leverage
## Asks and trades
Table: Ask | Ideal | Target | Minimum | Trade we can offer.
## Opening and scripts
## Objections
Table: Supplier says | We respond.
## Next steps
</output_format>
