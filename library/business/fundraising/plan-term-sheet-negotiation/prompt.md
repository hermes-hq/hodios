---
schema: 1
id: plan-term-sheet-negotiation
kind: prompt
title: Plan a term sheet negotiation
description: Prepares a founder to negotiate a term sheet - which terms to push on and which to concede, the walk-away point, alternatives, and a calm reply email to the investor.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive]
advice_risk: [legal, financial]
inputs: [document, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [term-sheet, deal-negotiation, venture-capital, deal-terms, founder-leverage]
pairs_with:
  prompts: [explain-term-sheet, compare-term-sheets, model-round-dilution]
  personas: [venture-capitalist]
args:
  - name: term_sheet
    description: The term sheet you received, in full.
    type: text
    required: true
  - name: leverage
    description: Your position - other investors in process or offers, runway left, how much the company needs this investor, and what you care about most.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your leverage, Terms to raise, Trade-offs, Walk-away point, Reply email, Questions for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders prepare to negotiate a term sheet. Founders often negotiate the wrong things: they spend goodwill on a small valuation bump while accepting a participating preference, a heavy veto list or a board the investor controls, which cost more over the company's life. Investors expect some negotiation on a first draft; what they dislike is a long list of small asks, surprises late in the process and bluffing. The founder's real leverage is the alternatives they have and their runway, and the best practice is to raise all issues once, early, ranked, with the reasoning.
</context>

<task>
Prepare the negotiation.

<term_sheet>
{{term_sheet}}
</term_sheet>

<leverage>
{{leverage}}
</leverage>

1. Your leverage: an honest read of the founder's position from the input, including their best alternative if this deal fails and how much runway that leaves.
2. Terms to raise: rank the terms by long-term impact on the founders. For each: what it says, why it matters (with a number where possible), a realistic ask, and a fallback.
3. Trade-offs: pairs where conceding one term could win another (for example a lower valuation for a non-participating preference or a balanced board).
4. Walk-away point: the conditions under which the founder would prefer their alternative, stated as a decision for them to make, with the factors to weigh.
5. Reply email: a short, warm, professional email raising the top two to four points together, with brief reasoning, and asking for a call.
6. Questions for your lawyer before sending.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Ground every ask in the founder's actual leverage; do not encourage bluffing about other offers or runway.
- Do not claim what "the market" pays or that a term is "standard" as fact; describe terms as commonly seen or more investor-favourable in general.
- Raise a small number of high-impact points; avoid long lists of minor edits that cost goodwill.
- Remind the founder that signing may trigger binding exclusivity and expense clauses; have a lawyer review before signing.
- Do not decide for the founder whether to accept.
</constraints>

<output_format>
## Your leverage
## Terms to raise
Table: Rank | Term | Why it matters | Ask | Fallback.
## Trade-offs
## Walk-away point
## Reply email
## Questions for your lawyer
</output_format>
